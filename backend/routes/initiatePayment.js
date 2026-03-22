import express from 'express';
import https from 'https';
import PaytmChecksum from 'paytmchecksum';

const router = express.Router();

// Initiate Paytm Payment using new Initiate Transaction API v1
router.post('/initiate-payment', async (req, res) => {
  try {
    const { orderId, amount, customerId, customerEmail, customerPhone } = req.body;

    // Validate input
    if (!orderId || !amount || !customerId || !customerPhone) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: orderId, amount, customerId, customerPhone'
      });
    }

    // Paytm Configuration from environment variables
    const MID = process.env.PAYTM_MID;
    const MERCHANT_KEY = process.env.PAYTM_MERCHANT_KEY;
    const WEBSITE = process.env.PAYTM_WEBSITE || 'DEFAULT';
    const CALLBACK_URL = process.env.PAYTM_CALLBACK_URL || 'https://mv-traders-0007.onrender.com/api/payment-callback';

    // Validate Paytm credentials
    if (!MID || !MERCHANT_KEY) {
      console.error('Missing Paytm credentials in environment variables');
      return res.status(500).json({
        success: false,
        message: 'Paytm credentials not configured'
      });
    }

    // Prepare body for Initiate Transaction API v1
    const paytmBody = {
      requestType: 'Payment',
      mid: MID,
      websiteName: WEBSITE,
      orderId: orderId,
      callbackUrl: CALLBACK_URL,
      txnAmount: {
        value: amount,
        currency: 'INR',
      },
      userInfo: {
        custId: customerId,
        mobile: customerPhone,
        email: customerEmail || '',
      },
    };

    // Generate checksum (signature) on the body
    console.log('Generating checksum for order:', orderId);
    console.log('Amount:', amount);
    console.log('Customer:', customerId);

    const checksum = await PaytmChecksum.generateSignature(
      JSON.stringify(paytmBody),
      MERCHANT_KEY
    );

    const paytmParams = {
      body: paytmBody,
      head: {
        signature: checksum,
      },
    };

    const postData = JSON.stringify(paytmParams);

    // Determine hostname based on environment
    // Production: secure.paytmpayments.com
    // Staging: securestage.paytmpayments.com
    const isProduction = process.env.PAYTM_ENVIRONMENT !== 'staging';
    const hostname = isProduction
      ? 'secure.paytmpayments.com'
      : 'securestage.paytmpayments.com';

    const path = `/theia/api/v1/initiateTransaction?mid=${MID}&orderId=${orderId}`;

    console.log(`Calling Paytm Initiate Transaction API: https://${hostname}${path}`);

    // Call Paytm Initiate Transaction API
    const paytmResponse = await new Promise((resolve, reject) => {
      const options = {
        hostname: hostname,
        port: 443,
        path: path,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData),
        },
      };

      let responseData = '';
      const postReq = https.request(options, (postRes) => {
        postRes.on('data', (chunk) => {
          responseData += chunk;
        });
        postRes.on('end', () => {
          try {
            resolve(JSON.parse(responseData));
          } catch (e) {
            reject(new Error(`Invalid JSON response: ${responseData}`));
          }
        });
      });

      postReq.on('error', (error) => {
        reject(error);
      });

      postReq.write(postData);
      postReq.end();
    });

    console.log('Paytm API Response:', JSON.stringify(paytmResponse));

    // Check if initiate transaction was successful
    if (
      paytmResponse.body &&
      paytmResponse.body.resultInfo &&
      paytmResponse.body.resultInfo.resultStatus === 'S'
    ) {
      const txnToken = paytmResponse.body.txnToken;
      console.log('✅ txnToken received successfully');

      res.json({
        success: true,
        txnToken: txnToken,
        orderId: orderId,
        mid: MID,
        amount: amount,
        isProduction: isProduction,
        message: 'Transaction initiated successfully',
      });
    } else {
      const resultMsg =
        paytmResponse.body?.resultInfo?.resultMsg || 'Unknown error from Paytm';
      const resultCode =
        paytmResponse.body?.resultInfo?.resultCode || 'UNKNOWN';
      console.error('❌ Paytm Initiate Transaction failed:', resultMsg);

      res.status(400).json({
        success: false,
        message: `Paytm error: ${resultMsg}`,
        resultCode: resultCode,
      });
    }
  } catch (error) {
    console.error('Payment initiation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to initiate payment',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

export default router;

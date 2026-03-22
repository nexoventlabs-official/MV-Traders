import express from 'express';
import https from 'https';
import PaytmChecksum from 'paytmchecksum';

const router = express.Router();

// Verify Transaction Status using new Paytm Order Status API
router.post('/verify-transaction', async (req, res) => {
  try {
    const { orderId } = req.body;

    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: 'Order ID is required'
      });
    }

    const MID = process.env.PAYTM_MID;
    const MERCHANT_KEY = process.env.PAYTM_MERCHANT_KEY;

    if (!MID || !MERCHANT_KEY) {
      return res.status(500).json({
        success: false,
        message: 'Paytm credentials not configured'
      });
    }

    // Prepare body for Order Status API
    const paytmBody = {
      mid: MID,
      orderId: orderId,
    };

    // Generate checksum for verification
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
    const isProduction = process.env.PAYTM_ENVIRONMENT !== 'staging';
    const hostname = isProduction
      ? 'secure.paytmpayments.com'
      : 'securestage.paytmpayments.com';

    const path = `/v2/order/status`;

    console.log('Verifying transaction for order:', orderId);

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

    console.log('Verification response:', JSON.stringify(paytmResponse));

    const resultInfo = paytmResponse.body?.resultInfo;
    const txnStatus = resultInfo?.resultStatus;

    // Return transaction status
    res.json({
      success: txnStatus === 'TXN_SUCCESS',
      status: txnStatus || 'UNKNOWN',
      data: paytmResponse.body || {},
      message: resultInfo?.resultMsg || 'Transaction verification completed'
    });

  } catch (error) {
    console.error('Transaction verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to verify transaction',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

export default router;

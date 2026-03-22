import express from 'express';
import PaytmChecksum from 'paytmchecksum';

const router = express.Router();

// Initiate Paytm Payment using JSCheckout
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
    const CHANNEL_ID = process.env.PAYTM_CHANNEL_ID || 'WEB';
    const INDUSTRY_TYPE_ID = process.env.PAYTM_INDUSTRY_TYPE || 'Retail';
    const CALLBACK_URL = process.env.PAYTM_CALLBACK_URL || 'https://mv-traders-0007.onrender.com/api/payment-callback';

    // Validate Paytm credentials
    if (!MID || !MERCHANT_KEY) {
      console.error('Missing Paytm credentials in environment variables');
      return res.status(500).json({
        success: false,
        message: 'Paytm credentials not configured'
      });
    }

    // Prepare parameters for Paytm JSCheckout
    const paytmParams = {
      MID: MID,
      WEBSITE: WEBSITE,
      CHANNEL_ID: CHANNEL_ID,
      INDUSTRY_TYPE_ID: INDUSTRY_TYPE_ID,
      ORDER_ID: orderId,
      CUST_ID: customerId,
      TXN_AMOUNT: amount,
      EMAIL: customerEmail || 'customer@paytm.com',
      MOBILE_NO: customerPhone,
      CALLBACK_URL: CALLBACK_URL,
      // Additional security fields
      PAYMENT_TYPE_ID: 'CC', // Credit Card, will be handled by Paytm gateway
    };

    // Generate checksum on the server side (SECURE METHOD)
    console.log('Generating checksum for order:', orderId);
    console.log('Amount:', amount);
    console.log('Customer:', customerId);

    // Generate the checksum using Paytm SDK
    const checksum = await PaytmChecksum.generateSignature(
      JSON.stringify(paytmParams),
      MERCHANT_KEY
    );

    // Add checksum to parameters
    paytmParams.CHECKSUMHASH = checksum;

    // Log for debugging (remove in production for security)
    console.log('✅ Checksum generated successfully');

    // Return all parameters needed for JSCheckout
    res.json({
      success: true,
      data: paytmParams,
      message: 'Payment parameters generated successfully'
    });

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

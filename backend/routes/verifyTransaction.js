import express from 'express';
import axios from 'axios';
import PaytmChecksum from 'paytmchecksum';

const router = express.Router();

// Verify Transaction Status
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

    // Prepare verification parameters
    const verifyParams = {
      MID: MID,
      ORDERID: orderId
    };

    // Generate checksum for verification
    const checksum = await PaytmChecksum.generateSignature(
      JSON.stringify(verifyParams),
      MERCHANT_KEY
    );

    verifyParams.CHECKSUMHASH = checksum;

    // Call Paytm API to verify transaction
    const verificationUrl = process.env.PAYTM_VERIFY_URL ||
      'https://securegw.paytm.in/merchant-status/getTxnStatus';

    console.log('Verifying transaction for order:', orderId);

    const response = await axios.post(verificationUrl, verifyParams, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    const txnStatus = response.data;

    // Return transaction status
    res.json({
      success: txnStatus.STATUS === 'TXN_SUCCESS' || txnStatus.STATUS === 'COMPLETE',
      status: txnStatus.STATUS,
      data: txnStatus,
      message: txnStatus.RESPMSG || 'Transaction verification completed'
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

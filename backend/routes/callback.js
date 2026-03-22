import express from 'express';
import PaytmChecksum from 'paytmchecksum';

const router = express.Router();

// Paytm Callback Handler - POST
router.post('/payment-callback', async (req, res) => {
  try {
    console.log('📥 Received Paytm callback');

    const paytmParams = req.body;
    const receivedChecksum = paytmParams.CHECKSUMHASH;

    // Remove checksum from params for verification
    delete paytmParams.CHECKSUMHASH;

    const MERCHANT_KEY = process.env.PAYTM_MERCHANT_KEY;

    if (!MERCHANT_KEY) {
      return res.status(500).json({
        success: false,
        message: 'Merchant key not configured'
      });
    }

    // Verify checksum
    const isValidChecksum = PaytmChecksum.verifySignature(
      JSON.stringify(paytmParams),
      MERCHANT_KEY,
      receivedChecksum
    );

    if (!isValidChecksum) {
      console.error('❌ Invalid checksum received');
      return res.status(400).json({
        success: false,
        message: 'Invalid payment signature. Payment verification failed.',
        verified: false
      });
    }

    console.log('✅ Checksum verified successfully');

    // Check payment status
    const status = paytmParams.STATUS;
    const orderId = paytmParams.ORDERID;
    const transactionId = paytmParams.TXNID;
    const bankName = paytmParams.BANKNAME || 'N/A';
    const paymentMode = paytmParams.PAYMENTMODE || 'N/A';
    const amount = paytmParams.TXNAMOUNT;

    console.log('Payment Status:', status);
    console.log('Order ID:', orderId);
    console.log('Transaction ID:', transactionId);

    // Prepare response data
    const paymentResponse = {
      success: status === 'TXN_SUCCESS',
      orderId,
      transactionId,
      status,
      amount,
      bankName,
      paymentMode,
      timestamp: new Date().toISOString(),
      message: status === 'TXN_SUCCESS'
        ? 'Payment successful'
        : 'Payment failed or pending'
    };

    if (status === 'TXN_SUCCESS') {
      console.log('✅ Payment successful for order:', orderId);
      // TODO: Update order status in database
      // TODO: Send confirmation email
      // TODO: Update inventory
    } else {
      console.log('❌ Payment failed for order:', orderId);
      // TODO: Log failed payment
    }

    // Return success response
    res.json(paymentResponse);

  } catch (error) {
    console.error('Callback processing error:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing payment callback',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// GET endpoint for callback (some payment gateways use GET)
router.get('/payment-callback', async (req, res) => {
  try {
    console.log('📥 Received Paytm callback (GET)');
    // Convert query params to body format for reuse
    req.body = req.query;
    // Reuse POST handler logic
    const middleware = router._router.stack.find(
      layer => layer.route && layer.route.path === '/payment-callback' && layer.route.methods.post
    );
    if (middleware) {
      // For GET requests, create a basic response
      const paytmParams = req.query;
      const orderId = paytmParams.ORDERID;

      res.json({
        success: paytmParams.STATUS === 'TXN_SUCCESS',
        orderId,
        status: paytmParams.STATUS,
        message: 'Please check your email for order confirmation'
      });
    }
  } catch (error) {
    console.error('GET Callback error:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing payment callback'
    });
  }
});

export default router;

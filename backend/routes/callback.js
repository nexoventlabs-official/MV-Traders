import express from 'express';
import PaytmChecksum from 'paytmchecksum';

const router = express.Router();

// Frontend URL for redirect after payment
const FRONTEND_URL = process.env.FRONTEND_URL || 'https://mv-traders-iota.vercel.app';

// Paytm Callback Handler - POST (Paytm sends form-urlencoded data here)
router.post('/payment-callback', async (req, res) => {
  try {
    console.log('📥 Received Paytm callback');
    console.log('Callback body:', JSON.stringify(req.body));

    const paytmParams = { ...req.body };
    const receivedChecksum = paytmParams.CHECKSUMHASH;

    // Remove checksum from params for verification
    delete paytmParams.CHECKSUMHASH;

    const MERCHANT_KEY = process.env.PAYTM_MERCHANT_KEY;

    if (!MERCHANT_KEY) {
      console.error('❌ Merchant key not configured');
      return res.redirect(`${FRONTEND_URL}/payment-callback?STATUS=TXN_FAILURE&RESPMSG=${encodeURIComponent('Server configuration error')}`);
    }

    // Verify checksum
    const isValidChecksum = PaytmChecksum.verifySignature(
      paytmParams,
      MERCHANT_KEY,
      receivedChecksum
    );

    console.log('Checksum valid:', isValidChecksum);

    // Extract payment details
    const status = paytmParams.STATUS || 'TXN_FAILURE';
    const orderId = paytmParams.ORDERID || '';
    const transactionId = paytmParams.TXNID || '';
    const amount = paytmParams.TXNAMOUNT || '';
    const respMsg = paytmParams.RESPMSG || '';

    console.log('Payment Status:', status);
    console.log('Order ID:', orderId);
    console.log('Transaction ID:', transactionId);

    if (status === 'TXN_SUCCESS') {
      console.log('✅ Payment successful for order:', orderId);
    } else {
      console.log('❌ Payment failed for order:', orderId);
    }

    // Redirect user to frontend payment callback page with status
    const redirectUrl = `${FRONTEND_URL}/payment-callback?ORDERID=${encodeURIComponent(orderId)}&STATUS=${encodeURIComponent(status)}&TXNID=${encodeURIComponent(transactionId)}&TXNAMOUNT=${encodeURIComponent(amount)}&RESPMSG=${encodeURIComponent(respMsg)}`;

    console.log('Redirecting to:', redirectUrl);
    res.redirect(redirectUrl);

  } catch (error) {
    console.error('Callback processing error:', error);
    res.redirect(`${FRONTEND_URL}/payment-callback?STATUS=TXN_FAILURE&RESPMSG=${encodeURIComponent('Error processing payment')}`);
  }
});

// GET endpoint for callback (fallback)
router.get('/payment-callback', async (req, res) => {
  try {
    console.log('📥 Received Paytm callback (GET)');
    const paytmParams = req.query;
    const orderId = paytmParams.ORDERID || '';
    const status = paytmParams.STATUS || 'TXN_FAILURE';
    const transactionId = paytmParams.TXNID || '';
    const amount = paytmParams.TXNAMOUNT || '';
    const respMsg = paytmParams.RESPMSG || '';

    const redirectUrl = `${FRONTEND_URL}/payment-callback?ORDERID=${encodeURIComponent(orderId)}&STATUS=${encodeURIComponent(status)}&TXNID=${encodeURIComponent(transactionId)}&TXNAMOUNT=${encodeURIComponent(amount)}&RESPMSG=${encodeURIComponent(respMsg)}`;

    res.redirect(redirectUrl);
  } catch (error) {
    console.error('GET Callback error:', error);
    res.redirect(`${FRONTEND_URL}/payment-callback?STATUS=TXN_FAILURE&RESPMSG=${encodeURIComponent('Error processing payment')}`);
  }
});

export default router;

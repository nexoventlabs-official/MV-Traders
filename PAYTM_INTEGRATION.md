# Paytm Payment Gateway Integration

## Overview
This project integrates Paytm payment gateway for secure online payments.

## Configuration

### Environment Variables
Create a `.env.local` file in the root directory with your Paytm credentials:

```env
VITE_PAYTM_MID=ZkCPzp89071287715186
VITE_PAYTM_MERCHANT_KEY=zoovHN@%Y%swC3iX
VITE_PAYTM_WEBSITE=DEFAULT
VITE_PAYTM_INDUSTRY_TYPE=Retail
VITE_PAYTM_CHANNEL_ID=WEB
VITE_PAYTM_CALLBACK_URL=http://localhost:5173/payment-callback
```

**Important:** Never commit `.env.local` to version control. It's already in `.gitignore`.

## How It Works

1. **Checkout Flow:**
   - User fills shipping details on `/checkout`
   - Clicks "Pay with Paytm" button
   - Order data is stored in localStorage
   - Payment form is auto-submitted to Paytm

2. **Payment Processing:**
   - User completes payment on Paytm's secure page
   - Paytm redirects back to `/payment-callback`
   - Payment status is displayed

3. **Order Confirmation:**
   - Successful payments show order details
   - Failed payments allow retry

## Security Notes

### ⚠️ CRITICAL: Production Requirements

The current implementation has a **SECURITY LIMITATION** for demonstration purposes:

**Checksum Generation MUST be done on server-side in production!**

Currently, the checksum is generated client-side (placeholder). This is **NOT SECURE** for production.

### Production Setup Required:

1. **Create a Backend API** (Node.js/Express, Python/Flask, PHP, etc.)
2. **Install Paytm SDK** on your backend
3. **Generate Checksum Server-Side:**

```javascript
// Example: Node.js Backend
const PaytmChecksum = require('paytmchecksum');

app.post('/api/initiate-payment', async (req, res) => {
  const paytmParams = {
    MID: process.env.PAYTM_MID,
    WEBSITE: process.env.PAYTM_WEBSITE,
    INDUSTRY_TYPE_ID: process.env.PAYTM_INDUSTRY_TYPE,
    CHANNEL_ID: process.env.PAYTM_CHANNEL_ID,
    ORDER_ID: req.body.orderId,
    CUST_ID: req.body.customerId,
    TXN_AMOUNT: req.body.amount,
    CALLBACK_URL: process.env.PAYTM_CALLBACK_URL,
    EMAIL: req.body.email,
    MOBILE_NO: req.body.phone,
  };

  const checksum = await PaytmChecksum.generateSignature(
    JSON.stringify(paytmParams),
    process.env.PAYTM_MERCHANT_KEY
  );

  res.json({
    ...paytmParams,
    CHECKSUMHASH: checksum,
  });
});
```

4. **Update Frontend** to call your backend API instead of generating checksum locally

### Payment Verification

Always verify payment status on your backend:

```javascript
app.post('/api/payment-callback', async (req, res) => {
  const receivedChecksum = req.body.CHECKSUMHASH;
  delete req.body.CHECKSUMHASH;

  const isValid = PaytmChecksum.verifySignature(
    JSON.stringify(req.body),
    process.env.PAYTM_MERCHANT_KEY,
    receivedChecksum
  );

  if (isValid) {
    // Update order status in database
    // Send confirmation email
  }
});
```

## Testing

### Test Mode
To test with Paytm staging environment:

1. Change the form action URL in `src/lib/paytm.ts`:
   ```typescript
   form.action = 'https://securegw-stage.paytm.in/order/process';
   ```

2. Use Paytm test credentials from your dashboard

### Test Cards
Paytm provides test cards in staging mode. Check their documentation for details.

## Files Modified/Created

- `src/lib/paytm.ts` - Paytm integration utilities
- `src/pages/CheckoutPage.tsx` - Updated with Paytm payment
- `src/pages/PaymentCallback.tsx` - Payment response handler
- `src/App.tsx` - Added payment callback route
- `.env.local` - Environment configuration

## Next Steps

1. ✅ Set up backend API for checksum generation
2. ✅ Implement payment verification on backend
3. ✅ Store orders in database
4. ✅ Send order confirmation emails
5. ✅ Add order tracking functionality
6. ✅ Test thoroughly in staging environment
7. ✅ Deploy to production

## Support

For Paytm integration issues:
- Paytm Developer Docs: https://developer.paytm.com/
- Paytm Support: https://dashboard.paytm.com/support

## License

This integration follows Paytm's terms of service and your application's license.

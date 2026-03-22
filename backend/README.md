# M V Traders Backend - Paytm Payment Gateway

Complete backend implementation for Paytm JSCheckout payment integration.

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Paytm Merchant Account with credentials

## 🔧 Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

```bash
# Copy .env.example to .env
cp .env.example .env

# Edit .env and add your Paytm credentials
PAYTM_MID=ZkCPzp89071287715186
PAYTM_MERCHANT_KEY=zoovHN@%Y%swC3iX
PAYTM_WEBSITE=DEFAULT
PAYTM_INDUSTRY_TYPE=Retail
PAYTM_CHANNEL_ID=WEB
```

### 3. Run the Backend Server

**Development Mode (with auto-reload):**
```bash
npm run dev
```

**Production Mode:**
```bash
npm start
```

The backend will start on `http://localhost:10000`

## 🔌 API Endpoints

### 1. Health Check
```
GET /health
```
**Response:**
```json
{
  "status": "Backend is running",
  "timestamp": "2024-01-20T10:30:00.000Z"
}
```

### 2. Initiate Payment
```
POST /api/initiate-payment
```

**Request:**
```json
{
  "orderId": "ORD1705750200000",
  "amount": "100.00",
  "customerId": "9876543210",
  "customerEmail": "customer@example.com",
  "customerPhone": "9876543210"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "MID": "ZkCPzp89071287715186",
    "WEBSITE": "DEFAULT",
    "CHANNEL_ID": "WEB",
    "ORDER_ID": "ORD1705750200000",
    "CUST_ID": "9876543210",
    "TXN_AMOUNT": "100.00",
    "CALLBACK_URL": "http://localhost:5173/payment-callback",
    "CHECKSUMHASH": "generated_checksum_hash"
  },
  "message": "Payment parameters generated successfully"
}
```

### 3. Verify Transaction
```
POST /api/verify-transaction
```

**Request:**
```json
{
  "orderId": "ORD1705750200000"
}
```

**Response:**
```json
{
  "success": true,
  "status": "TXN_SUCCESS",
  "data": {...},
  "message": "Transaction verification completed"
}
```

### 4. Payment Callback
```
POST /api/payment-callback
```
Paytm sends callback data to this endpoint after payment.

## 🔐 Security Features

✅ **Server-Side Checksum Generation** - Checksum is generated securely on the backend
✅ **Checksum Verification** - All callbacks are verified for authenticity
✅ **CORS Protection** - Only allowed origins can access the API
✅ **Environment Variable Protection** - Credentials are not exposed
✅ **Error Handling** - Comprehensive error handling and logging

## 📝 Payment Flow

1. **Frontend** → User completes checkout form
2. **Frontend → Backend** → POST `/api/initiate-payment` with order details
3. **Backend** → Generates secure checksum using Paytm SDK
4. **Backend → Frontend** → Returns payment parameters
5. **Frontend** → Submits form to Paytm gateway
6. **Paytm** → User completes payment
7. **Paytm → Backend** → Callback to `/api/payment-callback`
8. **Backend** → Verifies checksum and updates order status
9. **Paytm → Frontend** → Redirects to success/failure page

## 🧪 Testing

### Test Mode
Change the Paytm URLs in `.env` for testing:
```env
PAYTM_PAYMENT_URL=https://securegw-stage.paytm.in/order/process
PAYTM_VERIFY_URL=https://securegw-stage.paytm.in/merchant-status/getTxnStatus
```

Use test credentials from your Paytm Dashboard.

### cURL Examples

**Test Health:**
```bash
curl http://localhost:10000/health
```

**Test Payment Initiation:**
```bash
curl -X POST http://localhost:10000/api/initiate-payment \
  -H "Content-Type: application/json" \
  -d '{
    "orderId": "ORD123456789",
    "amount": "100.00",
    "customerId": "test123",
    "customerEmail": "test@example.com",
    "customerPhone": "9876543210"
  }'
```

## 📂 Project Structure

```
backend/
├── server.js                  # Main Express server
├── routes/
│   ├── initiatePayment.js     # Payment initiation endpoint
│   ├── verifyTransaction.js   # Transaction verification endpoint
│   └── callback.js            # Paytm callback handler
├── .env                       # Environment variables (production)
├── .env.example              # Example environment variables
├── package.json              # Dependencies and scripts
└── README.md                 # This file
```

## 🚀 Deployment

### On Render/Heroku

1. Set environment variables in platform dashboard
2. Ensure `FRONTEND_URL` matches your deployed frontend
3. Update `PAYTM_CALLBACK_URL` to your deployed backend URL
4. Deploy and test the payment flow

### Example Deployment URLs
```env
FRONTEND_URL=https://yourdomain.vercel.app
PAYTM_CALLBACK_URL=https://your-backend.onrender.com/api/payment-callback
```

## 📖 Paytm Documentation

- [Paytm Developer Docs](https://developer.paytm.com/)
- [JSCheckout Integration](https://www.paytmpayments.com/docs/jscheckout-initiate-payment)
- [Payment Status Check](https://developer.paytm.com/?target=paytmposition)

## 🐛 Troubleshooting

**Issue: "Merchant credentials not configured"**
- Check if `.env` file exists and contains valid credentials
- Verify `PAYTM_MID` and `PAYTM_MERCHANT_KEY` are correct

**Issue: "Checksum generation failed"**
- Verify `paytmchecksum` package is installed
- Check if merchant key is properly URL encoded if needed

**Issue: CORS errors**
- Ensure `FRONTEND_URL` in `.env` matches your frontend URL
- Check browser console for specific CORS error messages

**Issue: Payment not redirecting**
- Verify `PAYTM_CALLBACK_URL` is correctly set
- Check Paytm merchant settings for callback URL

## 📞 Support

For issues:
1. Check the Paytm Documentation
2. Verify all environment variables are set correctly
3. Enable development mode for detailed error logs
4. Check backend console logs for errors

## 📄 License

This project is part of M V Traders e-commerce platform.

---

**Last Updated:** January 2025
**Backend Version:** 1.0.0

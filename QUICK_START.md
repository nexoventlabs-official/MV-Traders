# 🚀 Quick Start Guide - MV Traders Full Stack

## ⚠️ Frontend .env.local - NOT NEEDED ❌

The frontend has **default values** built-in:
- Backend automatically connects to `http://localhost:10000`
- Payment credentials are on backend (more secure!)
- **You can skip creating any .env files for frontend**

## Prerequisites
- Node.js (v14 or higher)
- npm or yarn installed

## 📁 Project Structure
```
.
├── backend/                 # Express.js backend
│   ├── server.js
│   ├── routes/
│   ├── .env                 # ✅ ONLY THIS needs config
│   └── package.json
├── src/                     # React frontend
│   ├── data/products.ts
│   ├── pages/
│   ├── components/
│   └── App.tsx
└── vite.config.ts
```

## ⚡ Quick Start (2 Steps ONLY)

### Step 1: Start Backend (Terminal 1)
```bash
cd backend
npm install        # First time only
npm run dev        # Development with auto-reload
```
✅ Backend runs on: http://localhost:10000

### Step 2: Start Frontend (Terminal 2)
```bash
npm install        # First time only
npm run dev        # Starts on http://localhost:8080 or http://localhost:5173
```
✅ Frontend runs on the port shown in terminal

✅ **That's it! No .env files needed for frontend!**

### Step 3: Test the Payment Flow
1. Open frontend URL in browser
2. Click "Shop Pure Oils" or browse shop
3. Add 1 rupee "Sample Pure Oil" to cart (or any product)
4. Go to checkout
5. Fill in shipping details
6. Click "Pay with Paytm"
7. ✅ Should redirect to Paytm (test/staging mode)

## 📋 Configuration Files

### Backend Configuration ONLY (backend/.env)
```env
PORT=10000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
PAYTM_MID=ZkCPzp89071287715186
PAYTM_MERCHANT_KEY=zoovHN@%Y%swC3iX
PAYTM_CALLBACK_URL=http://localhost:8080/payment-callback
```

**Frontend**: No .env needed! Everything has defaults ✅

## 🧪 Test Endpoints

### Health Check
```bash
curl http://localhost:10000/health
```

### Test Payment Initiation
```bash
curl -X POST http://localhost:10000/api/initiate-payment \
  -H "Content-Type: application/json" \
  -d '{
    "orderId": "TEST1234",
    "amount": "1.00",
    "customerId": "test",
    "customerEmail": "test@example.com",
    "customerPhone": "9876543210"
  }'
```

## ✅ Verification Checklist

- [ ] Backend starts without errors
- [ ] Frontend starts without errors
- [ ] `/health` endpoint responds (green)
- [ ] Can add 1 rupee sample oil to cart
- [ ] Checkout form submits without CORS errors
- [ ] Payment redirects to Paytm (or test page)
- [ ] Console shows no CORS warnings

## 🐛 Troubleshooting

### Backend won't start
```bash
# If port 10000 is busy:
# On Windows: netstat -ano | findstr :10000
# On Mac/Linux: lsof -i :10000
# Kill the process and try again
```

### CORS errors in browser
✅ Already fixed! Check browser console - should show no CORS errors
- Backend now allows http://localhost:5173, 8080, and 127.0.0.1 variants

### 1 rupee product not showing
- Check that you're on the "Shop Pure Oils" page
- Refresh the page (Ctrl+Shift+R for hard refresh)
- Check browser console for any errors

## 📊 API Endpoints Overview

| Endpoint | Method | Purpose | CORS |
|----------|--------|---------|------|
| **GET** /health | GET | Health check | ✅ |
| **POST** /api/initiate-payment | POST | Generate checksum | ✅ |
| **POST** /api/verify-transaction | POST | Verify payment | ✅ |
| **POST** /api/payment-callback | POST | Paytm callback | ✅ |

## 🎯 Production Deployment

### Environment Variables for Production (Backend only!)
```env
# backend/.env (Production)
NODE_ENV=production
PORT=10000
FRONTEND_URL=https://yourdomain.com
PAYTM_CALLBACK_URL=https://yourdomain.com/payment-callback
```

Frontend has no env needed - uses defaults!

## 📱 Products Available

- **Sample Pure Oil - ₹1** (NEW!) - Trial 10ml
- Pure Sesame Oil - ₹450 (500ml)
- Virgin Coconut Oil - ₹380 (1L)
- Cold-Pressed Groundnut Oil - ₹320 (1L)
- Sunflower Oil - ₹280 (1L)
- Traditional Mango Pickle - ₹180 (500g)
- Spicy Lime Pickle - ₹150 (300g)
- And more...

## 📞 Support

For issues, check:
1. START_HERE.md - Copy-paste quick start
2. backend/README.md - Backend API docs
3. PAYTM_INTEGRATION.md - Original Paytm setup guide

---

**Status**: ✅ Backend tested and CORS configured
**Frontend Env**: ❌ NOT needed - has defaults!
**Backend Port**: 10000
**Ready for**: Testing the full payment flow! 🎉

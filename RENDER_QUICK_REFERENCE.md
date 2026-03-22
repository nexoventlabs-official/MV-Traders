# 🚀 Render Deployment - Quick Reference Card

## Copy-Paste Values for Render Dashboard

### 1. Create New Web Service
```
Go to: https://dashboard.render.com
Click: New + → Web Service
Select: Your GitHub repository (nexoventlabs-official/MV-Traders)
```

---

## 2. Form Fields - What to Enter

### General Settings
```
Name:           mv-traders-backend
Environment:    Node
Region:         Virginia (US East)
Branch:         main
```

### Build & Deploy Settings
```
Root Directory:     backend
Build Command:      npm install
Start Command:      npm start
Instance Type:      Free (or Starter if paid)
```

---

## 3. Environment Variables - Copy All of These

Click "Advanced" → "Environment Variables" and add:

```
PAYTM_MID=ZkCPzp89071287715186
PAYTM_MERCHANT_KEY=zoovHN@%Y%swC3iX
PAYTM_WEBSITE=DEFAULT
PAYTM_INDUSTRY_TYPE=Retail
PAYTM_CHANNEL_ID=WEB
PAYTM_PAYMENT_URL=https://securegw.paytm.in/order/process
PAYTM_VERIFY_URL=https://securegw.paytm.in/merchant-status/getTxnStatus
NODE_ENV=production
PORT=10000
FRONTEND_URL=https://your-frontend-domain.com
PAYTM_CALLBACK_URL=https://mv-traders-backend.onrender.com/api/payment-callback
```

---

## 4. Deploy Settings
```
Auto-Deploy:        Yes
Deploy on Push:     Yes
```

---

## 5. Click "Create Web Service"

Then:
1. Wait 2-3 minutes for build
2. Check build logs if errors
3. Get your URL (like `https://mv-traders-backend-xxxxx.onrender.com`)
4. Go to Settings → Environment to update `PAYTM_CALLBACK_URL` with actual URL

---

## ✅ After Getting Your URL

### Update PAYTM_CALLBACK_URL

In Render dashboard settings, update:
```
PAYTM_CALLBACK_URL=https://mv-traders-backend-xxxxx.onrender.com/api/payment-callback
```

Replace `xxxxx` with your actual Render service ID.

### Update Frontend

If frontend is on Vercel/Netlify, add environment variable:
```
VITE_BACKEND_URL=https://mv-traders-backend-xxxxx.onrender.com
```

---

## 🧪 Test Your Deployment

### Test 1: Health Check
```bash
curl https://mv-traders-backend-xxxxx.onrender.com/health
```

Expected response:
```json
{"status":"Backend is running","timestamp":"..."}
```

### Test 2: Payment Initiation
```bash
curl -X POST https://mv-traders-backend-xxxxx.onrender.com/api/initiate-payment \
  -H "Content-Type: application/json" \
  -d '{
    "orderId": "TEST001",
    "amount": "1.00",
    "customerId": "test",
    "customerEmail": "test@example.com",
    "customerPhone": "9876543210"
  }'
```

Expected response:
```json
{
  "success": true,
  "data": {
    "MID": "ZkCPzp89071287715186",
    "CHECKSUMHASH": "...",
    ...
  }
}
```

---

## 📋 Checklist

- [ ] Repository connected: nexoventlabs-official/MV-Traders
- [ ] Branch selected: main
- [ ] Root Directory: backend
- [ ] Build Command: npm install
- [ ] Start Command: npm start
- [ ] All environment variables added
- [ ] Build successful (check logs)
- [ ] Health endpoint works
- [ ] Payment endpoint works
- [ ] PAYTM_CALLBACK_URL updated with real Render URL
- [ ] Frontend updated with backend URL

---

## ⚠️ Important Notes

### Root Directory is CRITICAL
- Without it: Build fails
- With it: Render uses `backend/package.json`
- Value: `backend` (exact)

### Environment Variables Storage
- Sensitive data (credentials) stored on Render
- Not in code, not in git
- Looks them up at runtime

### Auto-Deploy on Git Push
- Push to `main` branch
- Render automatically rebuilds and deploys
- Check build logs in dashboard

### Paytm Credentials
- These are your live/test credentials
- Keep them secret!
- Only store on Render (not in code)

---

## 🎯 Final Result

After completion:
```
✅ Backend deployed to Render
✅ Available at: https://mv-traders-backend-xxxxx.onrender.com
✅ Auto-deploys on git push to main
✅ CORS configured for your frontend
✅ Ready for payment testing!
```

---

**Next**: Deploy frontend to Vercel/Netlify with `VITE_BACKEND_URL` pointing to your Render backend! 🚀

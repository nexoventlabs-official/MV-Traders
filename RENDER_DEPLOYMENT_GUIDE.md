# 🚀 Render Deployment Configuration Guide

## 📋 What to Deploy on Render

You have 2 options:

### Option 1: Deploy Backend Only (RECOMMENDED for Paytm)
- Deploy Express.js backend that handles payments
- Frontend stays on Vercel/Netlify (or local)
- Benefits: Secure credentials, proper CORS handling

### Option 2: Deploy Both (Monorepo)
- More complex setup with root directory configuration
- Not recommended unless you need same service

---

## ✅ **Setup for Backend Deployment (Option 1 - RECOMMENDED)**

### Step 1: Create New Web Service on Render

1. Go to https://dashboard.render.com
2. Click "New +" → "Web Service"
3. Connect GitHub repository: `nexoventlabs-official/MV-Traders`
4. Select branch: `main`

### Step 2: Configure Deployment Settings

| Setting | Value | Notes |
|---------|-------|-------|
| **Name** | mv-traders-backend | Service name |
| **Environment** | Node | Select Node.js |
| **Region** | Virginia (US East) | ✅ Keep default |
| **Branch** | main | ✅ Correct |
| **Root Directory** | `backend` | ⚠️ IMPORTANT - tells Render to use backend folder |
| **Build Command** | `npm install` | Will auto-detect, or leave blank |
| **Start Command** | `npm start` | Important - must match your npm script |
| **Instance Type** | Free (for testing) | Upgrade later if needed |

### Step 3: Add Environment Variables

Click "Advanced" → "Environment"

Add these variables:

```env
# Paytm Configuration
PAYTM_MID=ZkCPzp89071287715186
PAYTM_MERCHANT_KEY=zoovHN@%Y%swC3iX
PAYTM_WEBSITE=DEFAULT
PAYTM_INDUSTRY_TYPE=Retail
PAYTM_CHANNEL_ID=WEB

# Backend Configuration
NODE_ENV=production
PORT=10000

# CORS - Update with your frontend URL
FRONTEND_URL=https://your-frontend-domain.com

# Paytm Callback URL (Important!)
PAYTM_CALLBACK_URL=https://your-backend-domain.com/api/payment-callback

# Paytm URLs (Production)
PAYTM_PAYMENT_URL=https://securegw.paytm.in/order/process
PAYTM_VERIFY_URL=https://securegw.paytm.in/merchant-status/getTxnStatus
```

---

## 📝 **Form Values to Enter on Render**

### Build Command
```
npm install
```

### Start Command
```
npm start
```

### Root Directory
```
backend
```

### Environment Variables
```
See section above - copy all PAYTM_* variables
```

---

## 🔑 Step-by-Step on Render Form

### 1. General Settings
- ✅ Name: `mv-traders-backend`
- ✅ Environment: `Node`
- ✅ Region: `Virginia` (or your preference)
- ✅ Branch: `main`
- ✅ Auto-deploy: `Yes` (auto-redeploy on git push)

### 2. Build & Start Commands
- ✅ Root Directory: `backend` ← **IMPORTANT!**
- ✅ Build Command: `npm install` (can be blank)
- ✅ Start Command: `npm start`

### 3. Advanced Settings
- Add all environment variables (see above)
- Free tier is fine for testing

### 4. Deploy
- Click "Create Web Service"
- Render will start building and deploying

---

## ✅ Post-Deployment Setup

### 1. Get Your Backend URL
After deployment, Render gives you:
```
https://mv-traders-backend.onrender.com
```

### 2. Update Frontend Backend URL

If frontend is on Vercel, add environment variable:
```env
VITE_BACKEND_URL=https://mv-traders-backend.onrender.com
```

### 3. Update Render Environment Variables

Go back to Render backend service → Settings → Environment Variables

Update:
```env
FRONTEND_URL=https://your-frontend-url.com
PAYTM_CALLBACK_URL=https://mv-traders-backend.onrender.com/api/payment-callback
```

### 4. Test Health Endpoint
```bash
curl https://mv-traders-backend.onrender.com/health
```

Should return:
```json
{"status":"Backend is running","timestamp":"..."}
```

---

## 🎯 Complete Render Configuration Preview

```
╔════════════════════════════════════════╗
║   RENDER DEPLOYMENT CONFIGURATION      ║
╠════════════════════════════════════════╣
║ Name: mv-traders-backend               ║
║ Environment: Node                      ║
║ Region: Virginia (US East)             ║
║ Repository: nexoventlabs.../MV-Traders ║
║ Branch: main                           ║
╠════════════════════════════════════════╣
║ Root Directory: backend                ║
║ Build Command: npm install             ║
║ Start Command: npm start               ║
╠════════════════════════════════════════╣
║ Environment Variables:                 ║
║ • PAYTM_MID                            ║
║ • PAYTM_MERCHANT_KEY                   ║
║ • NODE_ENV=production                  ║
║ • FRONTEND_URL                         ║
║ • PAYTM_CALLBACK_URL                   ║
║ (+ all others from list above)         ║
╠════════════════════════════════════════╣
║ Instance Type: Free (or Paid)          ║
║ Auto-Deploy: Yes                       ║
╚════════════════════════════════════════╝
```

---

## 🚀 Deployment Process

1. ✅ Add Root Directory: `backend`
2. ✅ Set Build Command: `npm install`
3. ✅ Set Start Command: `npm start`
4. ✅ Add Environment Variables (copy from above)
5. ✅ Click "Create Web Service"
6. ✅ Wait for build (2-3 minutes)
7. ✅ Get your URL like `https://mv-traders-backend-xxxxx.onrender.com`

---

## 📖 What Each Setting Does

### Root Directory: `backend`
- Tells Render to ignore files outside `backend/` folder
- Renders will go to `backend/package.json`
- Builds and runs from `backend/` directory
- **Without this**: Build will fail looking for wrong package.json

### Build Command: `npm install`
- Installs dependencies from `backend/package.json`
- Can be left blank (Render auto-detects)
- Could also be: `npm ci` (cleaner for production)

### Start Command: `npm start`
- Runs your `npm start` script from `backend/package.json`
- Which runs: `node server.js`
- Starts Express server on port 10000
- Render will expose it to the web

### Environment Variables
- Store sensitive data (credentials)
- Not hardcoded in code
- Loaded at runtime

---

## ⚠️ Common Mistakes to Avoid

❌ **Don't forget Root Directory: `backend`**
- If you set this wrong, build will fail
- Error: "Cannot find module paytmchecksum"

❌ **Don't hardcode credentials**
- Use Environment Variables always
- Never put credentials in code

❌ **Don't use wrong Start Command**
- Must match your npm script
- `npm start` runs `node server.js` (correct)

❌ **Don't deploy frontend and backend to same service**
- Deploy separately
- Frontend to Vercel/Netlify
- Backend to Render

---

## ✅ After Deployment

### Test the Backend

```bash
# Test health endpoint
curl https://your-backend-url.onrender.com/health

# Test payment initiation
curl -X POST https://your-backend-url.onrender.com/api/initiate-payment \
  -H "Content-Type: application/json" \
  -d '{
    "orderId": "TEST001",
    "amount": "1.00",
    "customerId": "test",
    "customerEmail": "test@example.com",
    "customerPhone": "9876543210"
  }'
```

### Update Frontend

If frontend is on Vercel, add:
```env
VITE_BACKEND_URL=https://your-backend-url.onrender.com
```

---

## 📞 Render Support

If deployment fails:
1. Check build logs in Render dashboard
2. Verify Root Directory is `backend`
3. Check environment variables are set
4. Ensure dependencies install correctly

---

**Summary**:
- ✅ Root Directory: `backend`
- ✅ Build Command: `npm install`
- ✅ Start Command: `npm start`
- ✅ Add all PAYTM environment variables
- ✅ Deploy and test!

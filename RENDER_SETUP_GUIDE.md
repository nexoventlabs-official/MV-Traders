# Render Setup - Step by Step

## The Problem
Render is running `npm start` from the project root instead of the `backend-example` folder.

## ✅ SOLUTION: Update Root Directory in Render

### Step 1: Go to Render Dashboard
1. Open https://dashboard.render.com/
2. Find your service: **mv-traders-backend**
3. Click on it to open

### Step 2: Update Settings
1. Click **"Settings"** tab (left sidebar)
2. Scroll down to **"Build & Deploy"** section
3. Find **"Root Directory"** field
4. Type: `backend-example`
5. Scroll down and click **"Save Changes"** button

### Step 3: Manual Deploy
1. Click **"Manual Deploy"** button (top right)
2. Select **"Deploy latest commit"**
3. Wait for deployment to complete

### Step 4: Verify Deployment
Once deployed, test these URLs:

**Health Check:**
```
https://mv-traders-backend.onrender.com/
```
Should return:
```json
{
  "status": "ok",
  "message": "Paytm Payment Gateway API",
  "timestamp": "2026-03-20T..."
}
```

**Health Status:**
```
https://mv-traders-backend.onrender.com/health
```
Should return:
```json
{
  "status": "healthy"
}
```

---

## Alternative: Delete and Recreate Service

If updating settings doesn't work, delete and recreate:

### Step 1: Delete Current Service
1. Go to service settings
2. Scroll to bottom
3. Click **"Delete Web Service"**
4. Confirm deletion

### Step 2: Create New Service
1. Click **"New +"** → **"Web Service"**
2. Connect repository: `tmisgowthaamand/mv-traders`
3. Configure:

```
Name: mv-traders-backend
Environment: Node
Root Directory: backend-example    ← CRITICAL!
Build Command: npm install
Start Command: npm start
Instance Type: Free
```

4. Click **"Create Web Service"**

### Step 3: Add Environment Variables

After service is created, go to **Environment** tab and add:

```
PAYTM_MID=ZkCPzp89071287715186
PAYTM_MERCHANT_KEY=zoovHN@%Y%swC3iX
PAYTM_WEBSITE=DEFAULT
PAYTM_INDUSTRY_TYPE=Retail
PAYTM_CHANNEL_ID=WEB
PAYTM_ENV=production
NODE_ENV=production
```

Click **"Save Changes"** - service will redeploy.

### Step 4: Add Callback URLs

After successful deployment, add these variables:

```
PAYTM_CALLBACK_URL=https://mv-traders-backend.onrender.com/api/payment-callback
FRONTEND_URL=https://mv-traders.vercel.app
```

Click **"Save Changes"** again.

---

## Screenshot Guide

### Where to find Root Directory setting:

```
Render Dashboard
  └─ Your Service (mv-traders-backend)
      └─ Settings (left sidebar)
          └─ Build & Deploy section
              └─ Root Directory: [backend-example]  ← Type here
              └─ Build Command: npm install
              └─ Start Command: npm start
              └─ [Save Changes] button
```

---

## Troubleshooting

### Still getting "Missing script: start"?
- Root Directory is NOT set correctly
- Double-check it says exactly: `backend-example`
- No leading/trailing spaces
- Case-sensitive!

### Service won't start after setting Root Directory?
- Check Render logs for actual error
- Verify `backend-example/package.json` exists in your repo
- Verify it has `"start": "node server.js"` in scripts

### How to check logs?
1. Go to your service in Render
2. Click **"Logs"** tab (left sidebar)
3. Look for errors in red

---

## Expected Log Output (Success)

When deployment succeeds, you should see:

```
==> Building...
==> Running 'npm install'
added 50 packages...
==> Build successful 🎉
==> Deploying...
==> Running 'npm start'
🚀 Server running on port 10000
Environment: production
Frontend URL: https://mv-traders.vercel.app
```

---

## After Successful Deployment

### Update Frontend
1. Go to Vercel dashboard
2. Your project: **mv-traders**
3. Settings → Environment Variables
4. Add:
```
VITE_BACKEND_URL=https://mv-traders-backend.onrender.com
```
5. Redeploy frontend

### Update Paytm Dashboard
1. Login to https://dashboard.paytm.com/
2. Developer Settings → API Keys
3. Update Callback URL:
```
https://mv-traders-backend.onrender.com/api/payment-callback
```

### Test Payment Flow
1. Visit: https://mv-traders.vercel.app
2. Add items to cart
3. Go to checkout
4. Fill details
5. Click "Pay with Paytm"
6. Complete test payment
7. Verify redirect back to your site

---

## Need More Help?

Share your Render logs and I can help debug further!

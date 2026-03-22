# 🎯 Render Deployment - Exact Form Values

## Copy-Paste These Values Into Render Dashboard

### ✅ Connection Settings
```
GitHub Repository:  nexoventlabs-official/MV-Traders
Branch:            main
```

### ✅ Service Name
```
mv-traders-backend
```

### ✅ Environment
```
Node.js
```

### ✅ Region
```
Virginia (US East)  ← Keep default
```

---

## ⚠️ CRITICAL - Root Directory

**This is the most important:**

```
Root Directory: backend
```

**Why**: Your backend code is in the `backend/` folder, not root.
Without this, Render will fail to find `package.json`.

---

## 🔧 Build & Start Commands

### Build Command
```
npm install
```

### Start Command
```
npm start
```

---

## 🔐 Environment Variables

Click: **Advanced** → **Environment**

Add these exact variables:

### Copy and Paste Block:
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
PAYTM_CALLBACK_URL=UPDATE_THIS_AFTER_DEPLOY
```

### One-by-One if Preferred:
```
Key: PAYTM_MID              │ Value: ZkCPzp89071287715186
Key: PAYTM_MERCHANT_KEY     │ Value: zoovHN@%Y%swC3iX
Key: PAYTM_WEBSITE          │ Value: DEFAULT
Key: PAYTM_INDUSTRY_TYPE    │ Value: Retail
Key: PAYTM_CHANNEL_KEY      │ Value: WEB
Key: PAYTM_PAYMENT_URL      │ Value: https://securegw.paytm.in/order/process
Key: PAYTM_VERIFY_URL       │ Value: https://securegw.paytm.in/merchant-status/getTxnStatus
Key: NODE_ENV               │ Value: production
Key: PORT                   │ Value: 10000
Key: FRONTEND_URL           │ Value: https://your-frontend-domain.com
Key: PAYTM_CALLBACK_URL     │ Value: (update after deploy with actual URL)
```

---

## 🖥️ Visual Form Layout

```
╔═══════════════════════════════════════════════════════╗
║             RENDER WEB SERVICE                        ║
╠═══════════════════════════════════════════════════════╣
║                                                       ║
║ Name         │ mv-traders-backend                    ║
║              │                                        ║
║ Environment  │ Node                                  ║
║              │                                        ║
║ Region       │ Virginia (US East)                    ║
║              │                                        ║
║ Repository   │ nexoventlabs-official/MV-Traders      ║
║              │                                        ║
║ Branch       │ main                                  ║
║              │                                        ║
╠═══════════════════════════════════════════════════════╣
║ ROOT DIRECTORY: backend                              ║
╠═══════════════════════════════════════════════════════╣
║ BUILD COMMAND:  npm install                          ║
╠═══════════════════════════════════════════════════════╣
║ START COMMAND:  npm start                            ║
╠═══════════════════════════════════════════════════════╣
║ INSTANCE TYPE:  Free                                 ║
║                 (or Starter if you want paid)        ║
╠═══════════════════════════════════════════════════════╣
║ [+ Advanced] ← Click to add Environment Variables    ║
╠═══════════════════════════════════════════════════════╣
║ [ Create Web Service ]                               ║
╚═══════════════════════════════════════════════════════╝
```

---

## 📋 Step-by-Step Instructions

### 1️⃣ Go to Render Dashboard
```
https://dashboard.render.com
```

### 2️⃣ Click "New +" → "Web Service"
```
Select your repository: nexoventlabs-official/MV-Traders
Branch: main
```

### 3️⃣ Fill Basic Info
```
Name:           mv-traders-backend
Environment:    Node
Region:         Virginia (US East)
```

### 4️⃣ Fill Build & Deploy
```
Root Directory:  backend
Build Command:   npm install
Start Command:   npm start
```

### 5️⃣ Click "Advanced"
```
→ Add all environment variables from list above
```

### 6️⃣ Click "Create Web Service"
```
Render will start building (takes 2-5 minutes)
```

### 7️⃣ Wait for Build to Complete
```
Check the build logs
If successful, you'll get a URL like:
https://mv-traders-backend-abc123.onrender.com
```

### 8️⃣ Update PAYTM_CALLBACK_URL
```
In Render dashboard:
Settings → Environment Variables
Update PAYTM_CALLBACK_URL to your actual Render URL
```

---

## ✅ Checklist Before Clicking "Create"

- [ ] Root Directory = `backend`
- [ ] Build Command = `npm install`
- [ ] Start Command = `npm start`
- [ ] All environment variables added
- [ ] Branch = `main`
- [ ] Repository = `nexoventlabs-official/MV-Traders`

---

## 🧪 Test After Deployment

Once deployed, test these:

### Test 1: Health Check
```bash
curl https://mv-traders-backend-xxxxx.onrender.com/health
```

Should respond:
```
{"status":"Backend is running","timestamp":"..."}
```

### Test 2: Payment Setup
```bash
curl -X POST https://mv-traders-backend-xxxxx.onrender.com/api/initiate-payment \
  -H "Content-Type: application/json" \
  -d '{"orderId":"TEST","amount":"1.00","customerId":"test","customerEmail":"test@example.com","customerPhone":"9876543210"}'
```

Should respond with payment parameters and checksum.

---

## 📝 Notes

- **Free Tier**: Includes one free web service
- **Auto-Deploy**: Enabled by default (redeploys on git push)
- **Logs**: Available in Render dashboard
- **Build Time**: Usually 2-5 minutes

---

## 🚨 If Build Fails

Common reasons:
1. ❌ Wrong Root Directory → Use `backend`
2. ❌ Wrong Build Command → Use `npm install`
3. ❌ Wrong Start Command → Use `npm start`
4. ❌ Missing env var → Check all listed above
5. ❌ Paytm SDK fail → Check paytmchecksum in npm

Check build logs in Render dashboard for exact error!

---

## 🎉 Success Indicators

✅ Build succeeds (green checkmark)
✅ Service is live
✅ URL is accessible
✅ Health endpoint returns 200 OK
✅ Payment endpoint generates checksum
✅ Auto-deploys on git push

---

**You're ready to deploy!** 🚀

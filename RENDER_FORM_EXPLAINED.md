# 📊 Render Deployment - Form Fields Explained

## The Render Form You Saw - Explained for MV Traders

### Your Original Form Shows:
```
Branch: main ✅ (Correct)
Region: Virginia (US East) ✅ (Keep default)
Root Directory: (Optional)
Build Command: bun install (Need to change)
Start Command: yarn start (Need to change)
```

---

## 🔴 What Needs to Change

### ❌ Build Command: `bun install`
**Current**: `bun install`
**Should be**: `npm install`
**Why**: Your backend uses npm, not bun

```
bun install   ❌ WRONG
npm install   ✅ CORRECT
```

### ❌ Start Command: `yarn start`
**Current**: `yarn start`
**Should be**: `npm start`
**Why**: Your package.json uses npm scripts

```
yarn start    ❌ WRONG
npm start     ✅ CORRECT
```

### ❌ Root Directory: (empty/optional)
**Current**: Empty
**Should be**: `backend`
**Why**: Your backend is in a subfolder

```
(empty)       ❌ WRONG
backend       ✅ CORRECT
```

---

## ✅ Corrected Render Form

After your changes, the form should look like:

```
┌─ Deployment Configuration ─────────────────┐
│                                            │
│ Branch:          main                      │
│ Region:          Virginia (US East)        │
│                                            │
│ Root Directory:  backend          ← NEW   │
│ Build Command:   npm install      ← FIXED │
│ Start Command:   npm start        ← FIXED │
│ Instance Type:   Free (or Paid)           │
│                                            │
│ [+ Advanced Settings - Add Env Vars]      │
│                                            │
│ [Create Web Service] button                │
│                                            │
└────────────────────────────────────────────┘
```

---

## 📋 Side-by-Side Comparison

| Field | Original (Wrong) | Corrected (Right) | Why |
|-------|-----------------|-------------------|-----|
| Branch | main | main | ✅ Already correct |
| Region | Virginia | Virginia | ✅ Already correct |
| Root Dir | (empty) | `backend` | 🔴 MUST ADD THIS |
| Build Cmd | `bun install` | `npm install` | 🔴 CHANGE THIS |
| Start Cmd | `yarn start` | `npm start` | 🔴 CHANGE THIS |

---

## 🎯 Step-by-Step to Fix on Render Dashboard

### Step 1: Root Directory Field
```
Click in "Root Directory" field
Type: backend
(This tells Render to use the backend folder)
```

### Step 2: Build Command Field
```
Clear the current: bun install
Type: npm install
```

### Step 3: Start Command Field
```
Clear the current: yarn start
Type: npm start
```

### Step 4: Click "Advanced"
```
Add Environment Variables (see list below)
```

### Step 5: Click "Create Web Service"
```
Render will start building
Check logs for success
```

---

## 🔐 Environment Variables to Add

In Advanced → Environment section:

```
PAYTM_MID                    = ZkCPzp89071287715186
PAYTM_MERCHANT_KEY           = zoovHN@%Y%swC3iX
PAYTM_WEBSITE                = DEFAULT
PAYTM_INDUSTRY_TYPE          = Retail
PAYTM_CHANNEL_ID             = WEB
PAYTM_PAYMENT_URL            = https://securegw.paytm.in/order/process
PAYTM_VERIFY_URL             = https://securegw.paytm.in/merchant-status/getTxnStatus
NODE_ENV                     = production
PORT                         = 10000
FRONTEND_URL                 = https://your-frontend-domain.com
PAYTM_CALLBACK_URL           = https://mv-traders-backend-xxxxx.onrender.com/api/payment-callback
```

---

## 📋 Example Filled Form

```
Service Name:           mv-traders-backend
Environment:            Node
Region:                 Virginia (US East)
Repository:             nexoventlabs-official/MV-Traders
Branch:                 main

Build & Deploy:
├─ Root Directory:      backend
├─ Build Command:       npm install
└─ Start Command:       npm start

Advanced:
├─ Environment:         (all env vars above)
├─ Auto-Deploy:         Yes
└─ Build on Push:       Yes

Instance Type:          Free (Starter+ if paid)

[CREATE WEB SERVICE]
```

---

## ⚡ What Happens After You Click "Create Web Service"

```
1. Render checks out your GitHub repository ✅
2. Navigates to "backend" directory (because of Root Directory setting) ✅
3. Runs "npm install" to install dependencies ✅
4. Runs "npm start" to start the server ✅
5. Serves on a public URL 🚀
```

### If any step fails:
- Check build logs in Render dashboard
- Most common: Wrong Root Directory, Build/Start commands
- Or: Missing dependencies in package.json

---

## 🧪 Test After Deployment

Once deployed, you get a URL like:
```
https://mv-traders-backend-abc123.onrender.com
```

### Test it:
```bash
curl https://mv-traders-backend-abc123.onrender.com/health
```

Should return:
```json
{"status":"Backend is running","timestamp":"2026-03-22T..."}
```

---

## 📱 Connect Frontend to Backend

Once you have your Render URL, use it in:

### If Frontend on Vercel:
```env
VITE_BACKEND_URL=https://mv-traders-backend-abc123.onrender.com
```

### If Frontend Local:
Update `.env`:
```env
VITE_BACKEND_URL=https://mv-traders-backend-abc123.onrender.com
```

---

## ✅ Summary of Changes Needed

| What | From | To |
|------|------|-----|
| Root Directory | (leave blank) | `backend` |
| Build Command | `bun install` | `npm install` |
| Start Command | `yarn start` | `npm start` |
| Env Variables | (none) | (add all Paytm vars) |

---

## 🎉 That's It!

Once you make these changes and click "Create Web Service":

```
✅ Backend deployed to Render
✅ Accessible at public URL
✅ Auto-deploys on git push
✅ Ready for payment processing!
```

---

**Remember**: The original form you showed had `bun` and `yarn` which are different package managers. Your project uses `npm`, so changed them accordingly!

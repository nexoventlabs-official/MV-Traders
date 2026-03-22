# Fix Render Deployment

## The Problem
Render is trying to run `npm start` from the root directory instead of the `backend-example` folder.

## Solution: Update Render Settings

### Option 1: Update Existing Service (Recommended)

1. Go to your Render dashboard: https://dashboard.render.com/
2. Click on your service: `mv-traders-backend`
3. Go to **Settings** tab
4. Scroll down to **Build & Deploy** section
5. Update these fields:
   - **Root Directory**: `backend-example`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
6. Click **Save Changes**
7. Go to **Manual Deploy** → Click **Deploy latest commit**

### Option 2: Delete and Recreate Service

If Option 1 doesn't work:

1. Delete the existing service
2. Create a new Web Service
3. Connect GitHub: `tmisgowthaamand/mv-traders`
4. Configure:
   - **Name**: `mv-traders-backend`
   - **Root Directory**: `backend-example` ← IMPORTANT!
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

5. Add Environment Variables:
```
PAYTM_MID=ZkCPzp89071287715186
PAYTM_MERCHANT_KEY=zoovHN@%Y%swC3iX
PAYTM_WEBSITE=DEFAULT
PAYTM_INDUSTRY_TYPE=Retail
PAYTM_CHANNEL_ID=WEB
PAYTM_ENV=production
NODE_ENV=production
```

6. Click **Create Web Service**

7. After deployment succeeds, add these variables:
```
PAYTM_CALLBACK_URL=https://mv-traders-backend.onrender.com/api/payment-callback
FRONTEND_URL=https://mv-traders.vercel.app
```

### Option 3: Use render.yaml (Automatic)

I've added a `render.yaml` file to your repository. To use it:

1. Go to Render Dashboard
2. Click **New +** → **Blueprint**
3. Connect your repository: `tmisgowthaamand/mv-traders`
4. Render will automatically read `render.yaml` and configure everything
5. You'll still need to add the secret environment variables:
   - `PAYTM_MID`
   - `PAYTM_MERCHANT_KEY`
   - `PAYTM_CALLBACK_URL`
   - `FRONTEND_URL`

## Verify Deployment

Once deployed successfully, test these endpoints:

1. **Health Check**: https://mv-traders-backend.onrender.com/
   - Should return: `{ "status": "ok", "message": "Paytm Payment Gateway API" }`

2. **Health Status**: https://mv-traders-backend.onrender.com/health
   - Should return: `{ "status": "healthy" }`

## Update Frontend

After backend is deployed, update your Vercel environment variables:

1. Go to Vercel Dashboard
2. Select your project: `mv-traders`
3. Go to **Settings** → **Environment Variables**
4. Add:
```
VITE_BACKEND_URL=https://mv-traders-backend.onrender.com
```
5. Redeploy your frontend

## Common Issues

### "Missing script: start"
- Root Directory is not set to `backend-example`
- Fix: Update Root Directory in Render settings

### "Module not found"
- Dependencies not installed
- Fix: Ensure Build Command is `npm install`

### Service keeps crashing
- Check Render logs for errors
- Verify all environment variables are set
- Ensure Node version is 18+

### CORS errors
- Verify `FRONTEND_URL` matches your Vercel URL exactly
- Check it includes `https://` and no trailing slash

## Need Help?

Check Render logs:
1. Go to your service in Render dashboard
2. Click **Logs** tab
3. Look for error messages

The logs will show exactly what's going wrong.

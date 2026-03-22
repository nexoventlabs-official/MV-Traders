# Deployment Guide - Paytm Payment Integration

## Architecture

- **Frontend**: Vercel (React + Vite)
- **Backend**: Render (Node.js + Express)
- **Payment Gateway**: Paytm

## Step 1: Deploy Backend to Render

### 1.1 Prepare Backend Repository

```bash
cd backend-example
git init
git add .
git commit -m "Initial backend setup"
```

Push to GitHub (create a new repository first):
```bash
git remote add origin https://github.com/yourusername/paytm-backend.git
git branch -M main
git push -u origin main
```

### 1.2 Create Render Web Service

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `paytm-payment-api`
   - **Environment**: `Node`
   - **Region**: Choose closest to your users
   - **Branch**: `main`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free (or Starter for production)

### 1.3 Add Environment Variables in Render

In the Render dashboard, go to **Environment** tab and add:

```
PAYTM_MID=ZkCPzp89071287715186
PAYTM_MERCHANT_KEY=zoovHN@%Y%swC3iX
PAYTM_WEBSITE=DEFAULT
PAYTM_INDUSTRY_TYPE=Retail
PAYTM_CHANNEL_ID=WEB
PAYTM_ENV=production
NODE_ENV=production
```

**Important**: Leave `PAYTM_CALLBACK_URL` and `FRONTEND_URL` empty for now. We'll add them after deployment.

### 1.4 Deploy Backend

Click **"Create Web Service"**. Render will:
- Clone your repository
- Install dependencies
- Start your server

You'll get a URL like: `https://paytm-payment-api.onrender.com`

### 1.5 Update Backend Environment Variables

Go back to **Environment** tab and add:

```
PAYTM_CALLBACK_URL=https://paytm-payment-api.onrender.com/api/payment-callback
FRONTEND_URL=https://your-app.vercel.app
```

(We'll update `FRONTEND_URL` after deploying frontend)

Click **"Save Changes"** - Render will redeploy automatically.

## Step 2: Deploy Frontend to Vercel

### 2.1 Update Frontend Environment Variables

Create `.env.production` in your project root:

```env
VITE_PAYTM_MID=ZkCPzp89071287715186
VITE_PAYTM_MERCHANT_KEY=zoovHN@%Y%swC3iX
VITE_PAYTM_WEBSITE=DEFAULT
VITE_PAYTM_INDUSTRY_TYPE=Retail
VITE_PAYTM_CHANNEL_ID=WEB
VITE_BACKEND_URL=https://paytm-payment-api.onrender.com
```

**Note**: Replace `paytm-payment-api.onrender.com` with your actual Render URL.

### 2.2 Push to GitHub

```bash
git add .
git commit -m "Add Paytm payment integration"
git push
```

### 2.3 Deploy to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

5. Add Environment Variables:
   ```
   VITE_PAYTM_MID=ZkCPzp89071287715186
   VITE_PAYTM_MERCHANT_KEY=zoovHN@%Y%swC3iX
   VITE_PAYTM_WEBSITE=DEFAULT
   VITE_PAYTM_INDUSTRY_TYPE=Retail
   VITE_PAYTM_CHANNEL_ID=WEB
   VITE_BACKEND_URL=https://paytm-payment-api.onrender.com
   ```

6. Click **"Deploy"**

You'll get a URL like: `https://your-app.vercel.app`

### 2.4 Update Backend with Frontend URL

Go back to Render dashboard → Your service → Environment:

Update:
```
FRONTEND_URL=https://your-app.vercel.app
```

Click **"Save Changes"** to redeploy.

## Step 3: Configure Paytm Dashboard

1. Log into [Paytm Dashboard](https://dashboard.paytm.com/)
2. Go to **Developer Settings** → **API Keys**
3. Update **Callback URL**:
   ```
   https://paytm-payment-api.onrender.com/api/payment-callback
   ```
4. Add your domain to **Allowed Domains**:
   ```
   https://your-app.vercel.app
   ```

## Step 4: Test the Integration

1. Visit your Vercel URL: `https://your-app.vercel.app`
2. Add items to cart
3. Go to checkout
4. Fill in shipping details
5. Click "Pay with Paytm"
6. Complete test payment
7. Verify redirect back to your site

## Troubleshooting

### Backend Issues

**Service not responding:**
- Check Render logs: Dashboard → Your Service → Logs
- Verify all environment variables are set
- Free tier: Service sleeps after 15 min inactivity (first request takes ~30s)

**CORS errors:**
- Verify `FRONTEND_URL` matches your Vercel URL exactly
- Check browser console for specific error

### Frontend Issues

**Payment not initiating:**
- Check browser console for errors
- Verify `VITE_BACKEND_URL` is correct
- Test backend endpoint directly: `https://your-backend.onrender.com/health`

**Payment callback not working:**
- Check Render logs for callback requests
- Verify `PAYTM_CALLBACK_URL` in Render environment variables
- Ensure Paytm dashboard has correct callback URL

### Payment Issues

**Checksum mismatch:**
- Verify `PAYTM_MERCHANT_KEY` is correct in Render
- Check Render logs for detailed error

**Payment successful but not redirecting:**
- Verify `FRONTEND_URL` in Render environment
- Check Render logs for redirect URL

## Production Checklist

### Backend (Render)
- [ ] All environment variables set correctly
- [ ] `PAYTM_ENV=production`
- [ ] `NODE_ENV=production`
- [ ] Health check endpoint working
- [ ] Logs are clean (no errors)
- [ ] Consider upgrading to paid plan (no cold starts)

### Frontend (Vercel)
- [ ] All environment variables set
- [ ] `VITE_BACKEND_URL` points to Render
- [ ] Build successful
- [ ] No console errors
- [ ] Test payment flow end-to-end

### Paytm Dashboard
- [ ] Callback URL updated
- [ ] Domain whitelisted
- [ ] Production credentials active
- [ ] Test transaction successful

### Security
- [ ] Merchant key never exposed in frontend
- [ ] HTTPS enabled (automatic on Vercel/Render)
- [ ] CORS properly configured
- [ ] Environment variables secured

## Monitoring

### Render
- Monitor service health: Dashboard → Metrics
- Check logs regularly: Dashboard → Logs
- Set up alerts for downtime

### Vercel
- Monitor deployments: Dashboard → Deployments
- Check function logs: Dashboard → Functions
- Set up error tracking (Sentry, etc.)

## Costs

### Render Free Tier
- 750 hours/month free
- Service sleeps after 15 min inactivity
- Upgrade to Starter ($7/month) for always-on

### Vercel Free Tier
- 100 GB bandwidth/month
- Unlimited deployments
- Hobby plan is free for personal projects

## Support

- **Render**: https://render.com/docs
- **Vercel**: https://vercel.com/docs
- **Paytm**: https://developer.paytm.com/

## Next Steps

1. Set up database for order storage (MongoDB, PostgreSQL)
2. Implement email notifications (SendGrid, Resend)
3. Add order tracking functionality
4. Set up monitoring and alerts
5. Implement proper error handling
6. Add rate limiting
7. Set up automated backups

# Backend Deployment Instructions

## Option 1: Separate Repository (Recommended)

### Step 1: Create New GitHub Repository
1. Go to https://github.com/new
2. Create a new repository named `mv-traders-backend`
3. Don't initialize with README (we already have files)

### Step 2: Push Backend to New Repository
```bash
cd backend-example
git remote add origin https://github.com/tmisgowthaamand/mv-traders-backend.git
git branch -M main
git push -u origin main
```

### Step 3: Deploy to Render
1. Go to https://dashboard.render.com/
2. Click "New +" → "Web Service"
3. Connect GitHub repository: `mv-traders-backend`
4. Configure:
   - **Name**: `mv-traders-backend`
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

6. Click "Create Web Service"

7. After deployment, get your Render URL (e.g., `https://mv-traders-backend.onrender.com`)

8. Go back to Environment tab and add:
```
PAYTM_CALLBACK_URL=https://mv-traders-backend.onrender.com/api/payment-callback
FRONTEND_URL=https://your-vercel-app.vercel.app
```

---

## Option 2: Monorepo (Single Repository)

If you want to keep backend and frontend in the same repository:

### Step 1: Push Everything to GitHub
```bash
# From project root (not backend-example)
git add .
git commit -m "Add Paytm payment integration with backend"
git push
```

### Step 2: Deploy Backend to Render
1. Go to https://dashboard.render.com/
2. Click "New +" → "Web Service"
3. Connect GitHub repository: `mv-traders`
4. Configure:
   - **Name**: `mv-traders-backend`
   - **Environment**: Node
   - **Root Directory**: `backend-example`  ← Important!
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

5. Add same environment variables as Option 1

---

## After Backend Deployment

### Update Frontend Environment Variables

**Local Development** (`.env.local`):
```env
VITE_BACKEND_URL=http://localhost:10000
```

**Production** (Vercel Environment Variables):
```env
VITE_BACKEND_URL=https://mv-traders-backend.onrender.com
```

### Deploy Frontend to Vercel
1. Push changes to GitHub
2. Vercel will auto-deploy
3. Or manually deploy from Vercel dashboard

### Update Paytm Dashboard
1. Login to https://dashboard.paytm.com/
2. Go to Developer Settings → API Keys
3. Update Callback URL:
   ```
   https://mv-traders-backend.onrender.com/api/payment-callback
   ```

---

## Testing

1. Visit your Vercel app
2. Add items to cart
3. Go to checkout
4. Fill shipping details
5. Click "Pay with Paytm"
6. Complete payment
7. Verify redirect back to your site

---

## Troubleshooting

### Backend not responding
- Check Render logs
- Verify environment variables
- Free tier: First request after sleep takes ~30 seconds

### CORS errors
- Verify `FRONTEND_URL` matches your Vercel URL exactly
- Check Render logs for CORS errors

### Payment callback not working
- Verify `PAYTM_CALLBACK_URL` in Render
- Check Paytm dashboard callback URL
- Check Render logs for incoming requests

---

## Quick Commands Reference

### Backend (from backend-example folder)
```bash
# Install dependencies
npm install

# Run locally
npm start

# Run with auto-reload
npm run dev
```

### Frontend (from project root)
```bash
# Install dependencies
npm install

# Run locally
npm run dev

# Build for production
npm run build
```

---

## Support
- Render: https://render.com/docs
- Paytm: https://developer.paytm.com/
- GitHub Issues: https://github.com/tmisgowthaamand/mv-traders/issues

# 🎯 RUN THIS TO START EVERYTHING

## ⚡ Frontend .env.local - NOT NEEDED ❌

The frontend has **default values** that work perfectly for local development:
- Backend URL defaults to `http://localhost:10000` ✅
- Paytm credentials are handled by backend (not frontend) ✅
- **Result**: Just start and it works! No .env files needed for frontend

## Copy & Paste Commands

### Step 1: Start Backend (New Terminal/Command Prompt)
```bash
cd backend
npm install
npm start
```

**Expected output:**
```
🚀 Backend Server running on http://localhost:10000
📊 Health check: http://localhost:10000/health
```

### Step 2: Start Frontend (New Terminal/Command Prompt)
```bash
npm install
npm run dev
```

**Expected output:**
```
  ➜  Local:   http://localhost:5173
  ➜  or press h to show help
```

### Step 3: Test (Optional - Verify in 3rd Terminal)
```bash
curl http://localhost:10000/health
```

**Expected output:**
```
{"status":"Backend is running","timestamp":"2026-03-22T..."}
```

## ✅ What to Check

1. **Backend Terminal** - Should show:
   - ✅ "Backend Server running on http://localhost:10000"
   - ✅ Request logs like "📨 GET /health"

2. **Frontend Terminal** - Should show:
   - ✅ No errors
   - ✅ URL like "http://localhost:5173" or "http://localhost:8080"

3. **Browser Console** (Press F12)
   - ✅ No red errors
   - ✅ No "CORS" warnings

4. **Shop Page**
   - ✅ "Sample Pure Oil - ₹1 Trial" visible at top
   - ✅ Price shows "₹1"

## 🧪 Quick Test Payment

1. Go to frontend URL (http://localhost:5173 or 8080)
2. Navigate to "Shop" → "Pure Oils"
3. Add "Sample Pure Oil - ₹1 Trial" to cart
4. Click "View Cart"
5. Click "Proceed to Checkout"
6. Fill in shipping details:
   - Name: Test User
   - Email: test@example.com
   - Phone: 9876543210
   - Address: 123 Test St
   - City: Test City
   - Pincode: 123456
7. Click "Place Order"
8. Click "Pay with Paytm"
9. ✅ Should redirect to Paytm payment page

## 🛑 Troubleshooting

### Backend won't start - "Port already in use"
```bash
# Kill the process:
# Windows:
taskkill /PID [process_id] /F

# Mac/Linux:
lsof -i :10000
kill -9 [pid]

# Then try again
npm start
```

### Frontend shows CORS errors
✅ Already fixed! Backend handles all CORS
- [ ] Backend is running on port 10000
- [ ] Frontend on 5173 or 8080
- [ ] Check browser console for details

### 1 rupee product not showing
✅ Refresh page with Ctrl+Shift+R (hard refresh)
✅ Check "Shop → Pure Oils" section
✅ Check browser console for errors

### Backend showing "Error: listen EADDRINUSE"
= Port 10000 is already in use
✅ Close other terminals or kill the process (see above)
✅ Wait 10 seconds and try again

## 📊 Ports Summary

| Component | Port | URL | Env Needed |
|-----------|------|-----|-----------|
| Backend | 10000 | http://localhost:10000 | ✅ backend/.env |
| Frontend | 5173/8080 | http://localhost:5173 | ❌ Not needed - has defaults |

## ✨ That's It!

You now have a **fully functional** payment system with:
- ✅ Secure server-side checksum generation (backend)
- ✅ CORS properly configured (backend)
- ✅ 1 rupee sample product added
- ✅ Full payment flow ready to test
- ✅ NO frontend .env needed! Uses defaults

All CORS errors have been fixed! 🎉


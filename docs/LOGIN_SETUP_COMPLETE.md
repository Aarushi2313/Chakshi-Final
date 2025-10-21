# 🔐 Complete Login Setup & Testing Guide

## Your Login Credentials
```
Email: aryakumari3953@gmail.com
Password: Test@1234
```

---

## 📋 Step-by-Step Setup (From Beginning)

### STEP 1: Check if User Exists in Database

1. **Prisma Studio is now open at: http://localhost:5555**
   - Open this URL in your browser
   - Click on "**users**" table on the left
   - Look for user with email: `aryakumari3953@gmail.com`

**If User EXISTS:**
- Note the **role** field (should be ADVOCATE, STUDENT, or CLERK)
- Note the **id** field
- Go to STEP 2

**If User DOES NOT EXIST:**
- You need to register first! Go to STEP 3 (Registration)

---

### STEP 2: Check if User Exists in Supabase

1. **Open Supabase Dashboard:**
   - Go to: https://supabase.com
   - Login to your account
   - Open your project: `vqiusxnxarixuemhyiuz`

2. **Check Authentication:**
   - Click **Authentication** in left sidebar
   - Click **Users**
   - Look for: `aryakumari3953@gmail.com`

**If User EXISTS in Supabase:**
- Great! User is registered
- Go to STEP 4 (Test Login)

**If User DOES NOT EXIST in Supabase:**
- User needs to be created
- Go to STEP 3 (Registration)

---

### STEP 3: Register the User (If Doesn't Exist)

#### Option A: Register via Frontend

1. **Start Backend** (if not running):
```powershell
cd C:\Users\admin\OneDrive\Desktop\Documents\GitHub\Chakshi-Final\backend\lawAgent
npm run dev
```
Should show:
```
✅ Database connection established
🚀 Server running on http://0.0.0.0:5000
```

2. **Start Frontend**:
```powershell
cd C:\Users\admin\OneDrive\Desktop\Documents\GitHub\Chakshi-Final\frontend
npm start
```
Should open browser at http://localhost:3000

3. **Register New User**:
   - Go to: http://localhost:3000/register
   - Fill in:
     - **Name:** Arya Kumari
     - **Email:** aryakumari3953@gmail.com
     - **Password:** Test@1234
     - **Confirm Password:** Test@1234
     - **Role:** Select ADVOCATE (or STUDENT/CLERK)
   - Click "Create Account"
   - Should redirect to dashboard

#### Option B: Create User in Supabase Manually

1. **Go to Supabase Dashboard:**
   - https://app.supabase.com/project/vqiusxnxarixuemhyiuz/auth/users

2. **Create User:**
   - Click "Add user" button
   - Select "Create new user"
   - Email: `aryakumari3953@gmail.com`
   - Password: `Test@1234`
   - Turn OFF "Auto Confirm User" if testing
   - Click "Create user"

3. **Register with Backend:**
   - After creating in Supabase, you need to call backend
   - Go to http://localhost:5000/api-docs (Swagger)
   - Find `/api/auth/register` endpoint
   - Click "Try it out"
   - You'll need the Supabase token (see next step)

---

### STEP 4: Test Login (Frontend Running)

#### Prerequisites Check:
```powershell
# Check Backend is running (should be on port 5000)
netstat -ano | findstr :5000

# Check Frontend is running (should be on port 3000)
netstat -ano | findstr :3000
```

Both should show `LISTENING` status.

#### Test Login:

1. **Open Frontend:**
   - Go to: http://localhost:3000/login

2. **Enter Credentials:**
   ```
   Email: aryakumari3953@gmail.com
   Password: Test@1234
   ```

3. **Click "Sign In"**

4. **Check Browser Console (F12):**
   - Press F12 to open DevTools
   - Click "Console" tab
   - Look for any error messages

5. **Expected Result:**
   - ✅ Should redirect to `/advocate/dashboard` (or `/student/dashboard` or `/clerk/dashboard`)
   - ✅ User info should display
   - ✅ Can navigate around

---

### STEP 5: Troubleshooting Common Issues

#### Issue 1: "User not found" Error

**Cause:** User exists in Supabase but NOT in PostgreSQL database

**Solution:**
1. Login to Supabase to get a token first
2. Call backend register endpoint with the token
3. OR re-register via frontend

#### Issue 2: "Invalid credentials" Error

**Cause:** Wrong password or user doesn't exist in Supabase

**Solution:**
1. Check Supabase dashboard for the user
2. If user exists, try password reset
3. If user doesn't exist, register first

#### Issue 3: White Screen / Nothing Happens

**Cause:** Frontend not loaded or JavaScript error

**Solution:**
1. Check browser console (F12) for errors
2. Check frontend terminal for compilation errors
3. Restart frontend: `Ctrl+C` then `npm start`

#### Issue 4: "Network Error" or "Failed to fetch"

**Cause:** Backend not running or CORS issue

**Solution:**
1. Check backend is running on port 5000
2. Check backend `.env` has `CORS_ORIGIN=http://localhost:3000`
3. Restart backend after changing `.env`

#### Issue 5: "Invalid or expired token"

**Cause:** Supabase keys mismatch or wrong configuration

**Solution:**
1. Verify Supabase keys in both `.env` files match
2. Frontend should use `ANON_KEY`
3. Backend should use `SERVICE_ROLE_KEY`

---

## 🔍 Debug Checklist

Run these checks:

### 1. Backend Health Check
```powershell
# Should return "OK"
curl http://localhost:5000/health
```

### 2. Check User in Database
```powershell
# Prisma Studio should be at:
# http://localhost:5555
```
- Open in browser
- Click "users" table
- Search for your email

### 3. Check User in Supabase
- Dashboard: https://app.supabase.com
- Authentication → Users
- Look for your email

### 4. Test Backend API Directly
```powershell
# Test login endpoint (after getting Supabase token)
curl -X POST http://localhost:5000/api/auth/login `
  -H "Content-Type: application/json" `
  -d '{"token": "YOUR_SUPABASE_TOKEN_HERE"}'
```

### 5. Check Environment Variables

**Backend** (`backend/lawAgent/.env`):
```env
PORT=5000
DATABASE_URL=postgresql://postgres:...@db.vqiusxnxarixuemhyiuz.supabase.co:5432/postgres
SUPABASE_URL=https://vqiusxnxarixuemhyiuz.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci... (service_role)
SUPABASE_ANON_KEY=eyJhbGci... (anon)
CORS_ORIGIN=http://localhost:3000
```

**Frontend** (`frontend/.env`):
```env
REACT_APP_SUPABASE_URL=https://vqiusxnxarixuemhyiuz.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJhbGci... (anon only!)
REACT_APP_BACKEND_URL=http://localhost:5000
```

---

## 🎯 Quick Start Commands

### Start Everything Fresh:

```powershell
# Terminal 1 - Backend
cd C:\Users\admin\OneDrive\Desktop\Documents\GitHub\Chakshi-Final\backend\lawAgent
npm run dev

# Terminal 2 - Frontend  
cd C:\Users\admin\OneDrive\Desktop\Documents\GitHub\Chakshi-Final\frontend
npm start

# Terminal 3 - Database Studio (optional)
cd C:\Users\admin\OneDrive\Desktop\Documents\GitHub\Chakshi-Final\backend\lawAgent
npm run db:studio
```

---

## 📝 What to Check RIGHT NOW:

1. **Open Prisma Studio:** http://localhost:5555
   - Does user `aryakumari3953@gmail.com` exist in `users` table?
   - If YES → Note the role → Proceed to login test
   - If NO → Need to register first

2. **Open Supabase Dashboard:** https://app.supabase.com
   - Authentication → Users
   - Does user `aryakumari3953@gmail.com` exist?
   - If YES → User registered in Supabase
   - If NO → Need to create in Supabase first

3. **Check Both Servers Running:**
   ```powershell
   netstat -ano | findstr ":5000 :3000"
   ```
   - Port 5000 = Backend ✅
   - Port 3000 = Frontend ✅

4. **Try Login Again:**
   - http://localhost:3000/login
   - Email: aryakumari3953@gmail.com
   - Password: Test@1234
   - **Open Browser Console (F12) → Check for errors!**

---

## 💡 Most Likely Issue

Based on typical scenarios:

**If user doesn't exist:**
- Register first at http://localhost:3000/register

**If user exists in Supabase but not in PostgreSQL:**
- This happens if registration was incomplete
- Solution: Try registering again, or manually insert into database

**If login shows error:**
- Check browser console (F12) for the exact error
- Share that error message for specific fix

---

## 🆘 Next Steps for You:

1. ✅ **Prisma Studio is open** - Check if user exists
2. ✅ **Check Supabase** - See if user is there
3. ✅ **Start both servers** if not running
4. ✅ **Try login** - Note any error messages
5. ✅ **Share the error** from browser console (F12)

**I'll wait for your findings and provide exact fix!** 🔧

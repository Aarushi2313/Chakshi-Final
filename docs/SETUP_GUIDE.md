# 🚀 Chakshi - Complete Setup & Testing Guide

## ✅ What Has Been Updated

### Backend (Already Implemented - No Changes Needed)
- ✅ Full authentication system with Supabase
- ✅ Complete database schema with Prisma
- ✅ All API endpoints (auth, cases, clients, documents, etc.)
- ✅ Role-based access control
- ✅ Payment integration (Razorpay)

### Frontend (Just Updated)
- ✅ Supabase client configuration (`src/lib/supabase.js`)
- ✅ API service layer (`src/services/api.js`)
- ✅ Updated `AuthContext.js` with real authentication
- ✅ Updated `Login.js` component with Supabase integration
- ✅ Updated `Register.js` component with Supabase signup
- ✅ Environment configuration template (`.env.example`)

---

## 📋 Prerequisites

Before starting, ensure you have:

1. **Node.js** (v18 or higher)
2. **PostgreSQL** database
3. **Supabase account** (https://supabase.com)
4. **Git** installed
5. **VS Code** or similar editor

---

## 🔧 Step-by-Step Setup

### Step 1: Supabase Project Setup

1. **Create a Supabase Project**:
   - Go to https://supabase.com
   - Click "New Project"
   - Fill in:
     - Project Name: `chakshi-legal` (or your choice)
     - Database Password: (save this!)
     - Region: Choose closest to you
   - Click "Create new project"
   - Wait for project to be ready (~2 minutes)

2. **Get Your Credentials**:
   - In Supabase Dashboard, go to **Settings** → **API**
   - Copy these values:
     - **Project URL** (looks like: `https://xxxxx.supabase.co`)
     - **anon public key** (starts with `eyJhbGc...`)
     - **service_role key** (starts with `eyJhbGc...`) - Keep this SECRET!

3. **Enable Email Authentication**:
   - Go to **Authentication** → **Providers**
   - Enable **Email** provider
   - Configure email settings (or use default)
   - Optional: Disable email confirmation for testing:
     - Go to **Authentication** → **Settings**
     - Turn OFF "Enable email confirmations"

### Step 2: Backend Configuration

1. **Navigate to Backend Directory**:
```powershell
cd backend\lawAgent
```

2. **Install Dependencies**:
```powershell
npm install
```

3. **Configure Environment Variables**:
   - Copy `.env.example` to `.env`:
   ```powershell
   cp .env.example .env
   ```
   
   - Edit `.env` file with your values:
   ```env
   # Server Configuration
   NODE_ENV=development
   PORT=5000

   # Database Configuration
   DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/chakshi_db

   # Supabase Configuration (GET FROM SUPABASE DASHBOARD)
   SUPABASE_URL=https://xxxxx.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGc... (service_role key)
   SUPABASE_ANON_KEY=eyJhbGc... (anon key)

   # JWT Configuration
   JWT_SECRET=your_random_secret_here_make_it_long_and_complex
   SESSION_SECRET=another_random_secret_here

   # Razorpay Configuration (optional for now)
   RAZORPAY_KEY_ID=rzp_test_xxxx
   RAZORPAY_KEY_SECRET=xxxx

   # CORS
   CORS_ORIGIN=http://localhost:3000
   ```

4. **Setup Database**:
```powershell
# Generate Prisma client
npm run db:generate

# Run migrations to create tables
npm run migrate

# Seed database with sample data (optional)
npm run seed
```

5. **Start Backend Server**:
```powershell
npm run dev
```

You should see:
```
✅ Database connected successfully
🚀 Server running on http://localhost:5000
📚 API Docs available at http://localhost:5000/api-docs
```

### Step 3: Frontend Configuration

1. **Navigate to Frontend Directory** (new terminal):
```powershell
cd frontend
```

2. **Install Dependencies**:
```powershell
npm install
```

3. **Configure Environment Variables**:
   - Create `.env` file from `.env.example`:
   ```powershell
   cp .env.example .env
   ```
   
   - Edit `.env` file:
   ```env
   # Supabase Configuration (SAME AS BACKEND)
   REACT_APP_SUPABASE_URL=https://xxxxx.supabase.co
   REACT_APP_SUPABASE_ANON_KEY=eyJhbGc... (anon key only)

   # Backend API URL
   REACT_APP_BACKEND_URL=http://localhost:5000
   REACT_APP_API_PREFIX=/api

   # Environment
   REACT_APP_ENV=development
   ```

4. **Start Frontend Server**:
```powershell
npm start
```

Frontend should open at `http://localhost:3000`

---

## 🧪 Testing the Authentication Flow

### Test 1: User Registration

1. **Open Browser**: Navigate to `http://localhost:3000/register`

2. **Fill Registration Form**:
   - **Name**: Test User
   - **Email**: test@example.com
   - **Password**: Test123!
   - **Confirm Password**: Test123!
   - **Role**: Select "Advocate" (or Student/Clerk)

3. **Click "Create Account"**

4. **Expected Result**:
   - ✅ Loading spinner appears
   - ✅ User is created in Supabase
   - ✅ User is created in PostgreSQL database
   - ✅ Redirected to `/advocate/dashboard` (or role-specific route)
   - ✅ User data stored in localStorage

5. **Verify in Database**:
```powershell
# In backend directory
npm run db:studio
```
   - Open Prisma Studio (http://localhost:5555)
   - Check `users` table - should see your new user

6. **Verify in Supabase**:
   - Go to Supabase Dashboard
   - **Authentication** → **Users**
   - Should see your test user

### Test 2: User Login

1. **Logout** (if logged in):
   - Click on user menu
   - Click "Logout"

2. **Navigate to Login**: `http://localhost:3000/login`

3. **Fill Login Form**:
   - **Email**: test@example.com
   - **Password**: Test123!

4. **Click "Sign In"**

5. **Expected Result**:
   - ✅ Loading spinner appears
   - ✅ Token verified with Supabase
   - ✅ User data fetched from backend
   - ✅ Redirected to role-specific dashboard
   - ✅ User remains logged in on page refresh

### Test 3: Protected Routes

1. **While Logged In**:
   - Try navigating to different pages
   - Check that data loads from backend
   - Verify user info displays correctly

2. **While Logged Out**:
   - Try accessing `/advocate/dashboard`
   - Should redirect to login page

### Test 4: Role-Based Routing

1. **Register 3 Different Users**:
   - User 1: Email: `advocate@test.com`, Role: **ADVOCATE**
   - User 2: Email: `student@test.com`, Role: **STUDENT**
   - User 3: Email: `clerk@test.com`, Role: **CLERK**

2. **Login with Each**:
   - Advocate should go to `/advocate/dashboard`
   - Student should go to `/student/dashboard`
   - Clerk should go to `/clerk/dashboard`

---

## 🔍 Troubleshooting

### Backend Won't Start

**Error**: "Database connection failed"
```powershell
# Make sure PostgreSQL is running
# Create database manually:
psql -U postgres
CREATE DATABASE chakshi_db;
\q

# Then run migrations again
npm run migrate
```

**Error**: "Supabase configuration invalid"
- Check that SUPABASE_URL and keys are correct
- Make sure no trailing slashes in URL
- Verify keys from Supabase Dashboard → Settings → API

### Frontend Issues

**Error**: "REACT_APP_SUPABASE_URL is undefined"
- Make sure `.env` file exists in `frontend/` directory
- Restart frontend server after creating `.env`
- Check that variables start with `REACT_APP_`

**Error**: "Network Error" when calling APIs
- Check backend is running on port 5000
- Verify CORS_ORIGIN in backend `.env` is `http://localhost:3000`
- Check browser console for actual error

### Authentication Issues

**Registration fails with "Invalid token"**
- Check Supabase keys match between frontend and backend
- Verify email confirmation is disabled in Supabase
- Check browser console for error details

**Login shows "User not found"**
- User was created in Supabase but not in backend database
- Try registering again
- Check backend logs for errors

**Token expired errors**
- Supabase session expired (default 1 hour)
- Logout and login again
- Check `AuthContext.js` token refresh logic

---

## 📊 API Testing

### Using Swagger UI

1. **Open API Documentation**:
   ```
   http://localhost:5000/api-docs
   ```

2. **Test Endpoints**:
   - Try `/api/auth/verify-token`
   - Test protected routes with Authorization header

### Using curl/Postman

**Register User**:
```powershell
# First, get Supabase token by signing up manually
# Then use that token:

curl -X POST http://localhost:5000/api/auth/register `
  -H "Content-Type: application/json" `
  -d '{
    "token": "YOUR_SUPABASE_TOKEN",
    "role": "ADVOCATE",
    "name": "Test User"
  }'
```

**Login User**:
```powershell
curl -X POST http://localhost:5000/api/auth/login `
  -H "Content-Type: application/json" `
  -d '{
    "token": "YOUR_SUPABASE_TOKEN"
  }'
```

---

## ✅ Success Checklist

Before considering setup complete, verify:

- [ ] Backend server starts without errors
- [ ] Frontend server starts without errors
- [ ] Can register new user
- [ ] User appears in Supabase Authentication
- [ ] User appears in PostgreSQL database
- [ ] Can login with credentials
- [ ] Token persists on page refresh
- [ ] Role-based routing works
- [ ] Logout clears session
- [ ] Protected routes redirect when not authenticated
- [ ] API calls include Authorization header
- [ ] Swagger documentation loads

---

## 🎯 Next Steps

After successful setup:

1. **Connect More Features**:
   - Update dashboard to fetch real data from backend
   - Integrate cases management with API
   - Connect client management
   - Add document upload functionality

2. **Enhance Security**:
   - Add password reset flow
   - Implement email verification
   - Add 2FA (optional)
   - Set up RLS policies in Supabase

3. **Production Preparation**:
   - Set up proper environment variables
   - Configure production database
   - Enable email confirmations
   - Set up proper CORS origins
   - Add rate limiting
   - Set up monitoring and logging

---

## 📞 Support

If you encounter issues:

1. Check browser console for errors
2. Check backend terminal logs
3. Verify all environment variables
4. Make sure both servers are running
5. Check Supabase Dashboard for auth logs

---

## 🔐 Security Notes

⚠️ **IMPORTANT**:

- **Never commit `.env` files** to Git
- **Keep service_role key secret** - only use in backend
- **Use anon key** in frontend only
- **Change JWT secrets** in production
- **Enable email verification** in production
- **Use HTTPS** in production
- **Set proper CORS origins** in production

---

**Last Updated**: October 19, 2025
**Status**: ✅ Frontend-Backend Integration Complete
**Version**: 1.0.0

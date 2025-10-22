# Frontend and Backend Separation Guide

## 🎯 Overview

This document ensures that the **Frontend** and **Backend** of Chakshi remain **completely separate and independent**, each running on their own ports with proper routing and configuration.

---

## 📁 Project Architecture

```
Chakshi-Final/
├── frontend/              # React Application (Port 3000)
│   ├── src/              # React source code with client-side routing
│   ├── package.json      # Frontend dependencies only
│   └── .env              # Frontend environment variables
│
├── backend/              # Node.js/TypeScript API (Port 5000)
│   ├── lawAgent/        # TypeScript API server
│   │   ├── src/         # Backend source code with API routes
│   │   ├── package.json # Backend dependencies only
│   │   └── .env         # Backend environment variables
│   └── server/          # Express payment server
│
└── package.json         # Root orchestration scripts ONLY
```

---

## 🚀 How They Work Independently

### Frontend (React - Port 3000)

**Technology Stack:**
- React 18.3.1
- React Router DOM v7.8.2 (Client-side routing)
- Supabase Client (for auth and database)
- Axios (for backend API calls)

**Key Features:**
- ✅ Runs independently on `http://localhost:3000`
- ✅ Has its own routing via React Router
- ✅ Communicates with backend via REST APIs
- ✅ Has separate environment variables
- ✅ Can be deployed independently to Vercel/Netlify

**Frontend Routing:**
```javascript
// Client-side routes (in src/App.js)
/                        → Landing page
/login                   → Login page
/register                → Registration page
/dashboard               → General dashboard
/advocate/*              → Advocate routes
  ├── /advocate/dashboard
  ├── /advocate/cases
  ├── /advocate/clients
  └── /advocate/settings
/student/*               → Student routes
  ├── /student/dashboard
  ├── /student/courses
  └── /student/library
/clerk/*                 → Clerk routes
  ├── /clerk/dashboard
  ├── /clerk/cases
  └── /clerk/sms-log
```

---

### Backend (Node.js/TypeScript - Port 5000)

**Technology Stack:**
- Node.js + TypeScript
- Express.js
- Prisma ORM
- Supabase (server-side)
- Razorpay integration

**Key Features:**
- ✅ Runs independently on `http://localhost:5000`
- ✅ Has its own API routes via Express
- ✅ Provides REST API endpoints
- ✅ Has separate environment variables
- ✅ Can be deployed independently to Railway/Heroku/AWS

**Backend API Routes:**
```typescript
// API routes (in src/app.ts)
/health                  → Health check endpoint
/api/docs                → Swagger API documentation

/auth/*                  → Authentication endpoints
  ├── POST /auth/register
  ├── POST /auth/login
  └── POST /auth/logout

/dashboard/*             → Dashboard data endpoints
/cases/*                 → Case management endpoints
/clients/*               → Client management endpoints
/documents/*             → Document management endpoints
/notifications/*         → Notification endpoints
/schedule/*              → Schedule/calendar endpoints
/activity/*              → Activity log endpoints
/templates/*             → Template endpoints
```

---

## 🔧 Configuration Setup

### Frontend Environment Variables (.env in frontend/)

```bash
# Supabase Configuration (Frontend uses ANON key)
REACT_APP_SUPABASE_URL=https://your-project-id.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-supabase-anon-key-here

# Backend API Configuration
REACT_APP_BACKEND_URL=http://localhost:5000
REACT_APP_API_PREFIX=/api

# Environment
REACT_APP_ENV=development
```

### Backend Environment Variables (.env in backend/lawAgent/)

```bash
# Server Configuration
NODE_ENV=development
PORT=5000

# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/chakshi_db

# Supabase Configuration (Backend uses SERVICE_ROLE key)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
SUPABASE_ANON_KEY=your_anon_key_here

# JWT Configuration
JWT_SECRET=your_jwt_secret_here
SESSION_SECRET=your_session_secret_here

# Razorpay Configuration
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# CORS Configuration (Allow frontend)
CORS_ORIGIN=http://localhost:3000

# Storage Configuration
SUPABASE_STORAGE_BUCKET=uploads
```

---

## 🏃 Running the Applications

### Option 1: Run Separately (Recommended for Development)

**Terminal 1 - Frontend:**
```powershell
# Navigate to frontend directory
cd frontend

# Install dependencies (first time only)
npm install

# Start the development server
npm start

# Frontend will run on: http://localhost:3000
```

**Terminal 2 - Backend:**
```powershell
# Navigate to backend directory
cd backend/lawAgent

# Install dependencies (first time only)
npm install

# Run database migrations (first time only)
npm run migrate

# Start the development server
npm run dev

# Backend will run on: http://localhost:5000
```

### Option 2: Run Both Using Root Scripts

**From the root directory:**
```powershell
# Install all dependencies
npm run install:all

# Terminal 1 - Start Frontend
npm run dev:frontend

# Terminal 2 - Start Backend
npm run dev:backend
```

---

## 🔗 Communication Between Frontend and Backend

### Frontend → Backend Communication

The frontend communicates with the backend using **HTTP requests** via Axios:

```javascript
// Example: Frontend making API call to backend
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

// Get cases from backend
const fetchCases = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/cases`, {
      headers: {
        'Authorization': `Bearer ${userToken}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching cases:', error);
  }
};
```

### Backend CORS Configuration

The backend allows requests from the frontend via CORS:

```typescript
// In backend/lawAgent/src/app.ts
app.use(cors({
  origin: config.server.corsOrigin, // http://localhost:3000
  credentials: true,
}));
```

---

## 📋 Key Separation Principles

### ✅ DO's

1. **Keep Dependencies Separate:**
   - Frontend dependencies in `frontend/package.json`
   - Backend dependencies in `backend/lawAgent/package.json`

2. **Separate Environment Variables:**
   - Frontend: `frontend/.env` (use REACT_APP_ prefix)
   - Backend: `backend/lawAgent/.env`

3. **Independent Routing:**
   - Frontend: React Router handles client-side routing
   - Backend: Express handles API endpoints

4. **API Communication:**
   - Frontend calls backend via HTTP/HTTPS
   - Use environment variables for backend URL

5. **Independent Deployment:**
   - Frontend: Deploy to Vercel, Netlify, or S3
   - Backend: Deploy to Railway, Heroku, or AWS

### ❌ DON'Ts

1. **Don't Mix Dependencies:**
   - Never install backend packages in frontend
   - Never install frontend packages in backend

2. **Don't Share Code Directly:**
   - Use API calls, not direct imports across projects
   - Each should be self-contained

3. **Don't Use Same Port:**
   - Frontend: Port 3000
   - Backend: Port 5000 (or different)

4. **Don't Couple Deployments:**
   - Each should deploy independently
   - Backend changes shouldn't require frontend rebuild

5. **Don't Mix Routing:**
   - Frontend routes are client-side only
   - Backend routes are API endpoints only

---

## 🧪 Testing the Separation

### Test Frontend (Without Backend)

```powershell
cd frontend
npm start
# Should load the landing page at http://localhost:3000
# Auth and API features will need backend running
```

### Test Backend (Without Frontend)

```powershell
cd backend/lawAgent
npm run dev
# Should start server at http://localhost:5000
# Test with: http://localhost:5000/health
# API docs: http://localhost:5000/api/docs
```

### Test Communication

1. Start both servers
2. Visit `http://localhost:3000`
3. Login/Register → Frontend sends request to `http://localhost:5000/auth/login`
4. Check browser Network tab to see API calls

---

## 📦 Deployment Strategy

### Frontend Deployment (Vercel Example)

```bash
# In frontend directory
npm run build

# Deploy to Vercel
vercel deploy

# Set environment variables in Vercel:
REACT_APP_SUPABASE_URL=your-production-supabase-url
REACT_APP_SUPABASE_ANON_KEY=your-production-anon-key
REACT_APP_BACKEND_URL=https://your-backend-api.com
```

### Backend Deployment (Railway Example)

```bash
# In backend/lawAgent directory
npm run build

# Deploy to Railway
railway up

# Set environment variables in Railway:
DATABASE_URL=your-production-database-url
SUPABASE_URL=your-production-supabase-url
CORS_ORIGIN=https://your-frontend-app.vercel.app
```

---

## 🚨 Common Issues and Solutions

### Issue 1: CORS Errors

**Problem:** Frontend can't access backend API

**Solution:**
```typescript
// In backend/lawAgent/src/app.ts
app.use(cors({
  origin: 'http://localhost:3000', // or your frontend URL
  credentials: true,
}));
```

### Issue 2: API Not Found (404)

**Problem:** Frontend getting 404 from backend

**Solution:**
- Check `REACT_APP_BACKEND_URL` in frontend/.env
- Verify backend is running on correct port
- Check API endpoint paths match

### Issue 3: Environment Variables Not Loading

**Problem:** Variables showing as undefined

**Solution:**
- Restart development server after changing .env
- Frontend: Use `REACT_APP_` prefix
- Backend: No prefix needed
- Check `.env` files are in correct directories

---

## 📚 Directory Structure for Separation

```
Chakshi-Final/
│
├── frontend/                    # ← INDEPENDENT FRONTEND
│   ├── src/
│   │   ├── components/         # React components
│   │   ├── contexts/           # React contexts
│   │   ├── App.js              # React Router setup
│   │   └── index.js            # React entry point
│   ├── package.json            # Frontend dependencies
│   ├── .env                    # Frontend environment
│   └── README.md
│
├── backend/                     # ← INDEPENDENT BACKEND
│   └── lawAgent/
│       ├── src/
│       │   ├── modules/        # API modules
│       │   ├── app.ts          # Express app setup
│       │   └── server.ts       # Server entry point
│       ├── package.json        # Backend dependencies
│       ├── .env                # Backend environment
│       └── README.md
│
├── package.json                 # ← ROOT (Orchestration only)
│   # Contains scripts to run both projects
│   # NO shared dependencies
│
└── docs/                        # Documentation
    └── BACKEND_FRONTEND_SEPARATION.md  # This file
```

---

## ✅ Verification Checklist

Use this checklist to ensure proper separation:

- [ ] Frontend has its own `package.json` with React dependencies
- [ ] Backend has its own `package.json` with Express dependencies
- [ ] Frontend has `.env` with `REACT_APP_` prefixed variables
- [ ] Backend has `.env` with server configuration
- [ ] Frontend can start independently on port 3000
- [ ] Backend can start independently on port 5000
- [ ] Frontend uses React Router for client-side routing
- [ ] Backend uses Express routes for API endpoints
- [ ] CORS is configured in backend to allow frontend
- [ ] Frontend makes HTTP requests to backend API
- [ ] No direct file imports between frontend and backend
- [ ] Each can be deployed to different platforms

---

## 🎓 Summary

**Frontend:**
- React application with client-side routing
- Runs on port 3000
- Uses Supabase client and backend API
- Deployed independently (Vercel/Netlify)

**Backend:**
- Node.js/TypeScript API server
- Runs on port 5000
- Provides REST API endpoints
- Deployed independently (Railway/Heroku)

**Communication:**
- Frontend → Backend via HTTP requests
- Backend allows Frontend via CORS
- Completely decoupled and independent

---

## 📞 Need Help?

If you need to verify the separation is working:

1. **Check Frontend Routing:**
   ```powershell
   cd frontend
   npm start
   # Visit http://localhost:3000
   ```

2. **Check Backend API:**
   ```powershell
   cd backend/lawAgent
   npm run dev
   # Visit http://localhost:5000/health
   # Visit http://localhost:5000/api/docs
   ```

3. **Check Communication:**
   - Open browser DevTools → Network tab
   - Login from frontend
   - See API calls to `http://localhost:5000`

---

**Last Updated:** October 22, 2025  
**Status:** ✅ Frontend and Backend are completely separate and independent

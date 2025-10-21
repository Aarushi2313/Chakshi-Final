# 🚀 Quick Start Guide - Chakshi Legal Platform

## ⚡ Ultra-Fast Setup (5 Minutes)

### 1. Clone & Install (1 min)
```powershell
# Backend
cd backend\lawAgent
npm install

# Frontend (new terminal)
cd frontend
npm install
```

### 2. Setup Supabase (2 min)
1. Go to https://supabase.com → New Project
2. Get credentials from Settings → API
3. Disable email confirmation: Authentication → Settings

### 3. Configure Environment (1 min)

**Backend** (`backend/lawAgent/.env`):
```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/chakshi_db
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
SUPABASE_ANON_KEY=eyJhbGc...
JWT_SECRET=random_secret_here
CORS_ORIGIN=http://localhost:3000
PORT=5000
```

**Frontend** (`frontend/.env`):
```env
REACT_APP_SUPABASE_URL=https://xxxxx.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJhbGc...
REACT_APP_BACKEND_URL=http://localhost:5000
```

### 4. Setup Database (1 min)
```powershell
cd backend\lawAgent
npm run db:generate
npm run migrate
```

### 5. Start Both Servers
```powershell
# Terminal 1 - Backend
cd backend\lawAgent
npm run dev

# Terminal 2 - Frontend
cd frontend
npm start
```

---

## 🧪 Quick Test

1. Open `http://localhost:3000/register`
2. Register with:
   - Email: test@example.com
   - Password: Test123!
   - Role: Advocate
3. Should redirect to `/advocate/dashboard`
4. Logout and login again to verify

---

## 📋 What Was Changed

### ✅ Files Created
```
frontend/
  ├── .env.example                 # Environment template
  ├── src/
  │   ├── lib/
  │   │   └── supabase.js         # Supabase client setup
  │   └── services/
  │       └── api.js              # Backend API service

docs/
  ├── BACKEND_ANALYSIS.md         # Complete backend analysis
  └── SETUP_GUIDE.md              # Full setup instructions
```

### ✅ Files Modified
```
frontend/src/
  ├── contexts/
  │   └── AuthContext.js          # Real Supabase auth integration
  └── components/
      ├── Login.js                # Connected to Supabase + Backend
      └── Register.js             # Connected to Supabase + Backend
```

---

## 🔍 Authentication Flow

### Registration
```
User → Supabase.signUp() → Get Token
    → Backend /api/auth/register (token, role, name)
    → Create User in PostgreSQL
    → Return User Data
    → Redirect to Dashboard
```

### Login
```
User → Supabase.signIn() → Get Token
    → Backend /api/auth/login (token)
    → Fetch User from PostgreSQL
    → Return User Data
    → Redirect to Dashboard
```

---

## 🛠 Backend API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/verify-token` - Verify token
- `GET /api/auth/me` - Get current user

### Protected Routes (Require Auth)
- `GET /api/dashboard` - Dashboard stats
- `GET /api/cases` - List cases
- `POST /api/cases` - Create case
- `GET /api/clients` - List clients
- `POST /api/clients` - Create client
- `GET /api/documents` - List documents
- `POST /api/documents/upload` - Upload file
- `GET /api/notifications` - Get notifications
- `GET /api/schedule` - Get calendar events

---

## 🎯 User Roles

| Role | Frontend Route | Backend Role | Description |
|------|---------------|--------------|-------------|
| Advocate | `/advocate/dashboard` | `ADVOCATE` | Legal professionals |
| Student | `/student/dashboard` | `STUDENT` | Law students |
| Clerk | `/clerk/dashboard` | `CLERK` | Court clerks |

---

## 🔐 Environment Variables

### Required
```env
# Supabase (GET FROM DASHBOARD)
REACT_APP_SUPABASE_URL=https://xxxxx.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJhbGc...

# Backend URL
REACT_APP_BACKEND_URL=http://localhost:5000
```

### Backend Required
```env
DATABASE_URL=postgresql://...
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
SUPABASE_ANON_KEY=eyJhbGc...
JWT_SECRET=random_secret
CORS_ORIGIN=http://localhost:3000
```

---

## ❌ Common Issues & Fixes

### "REACT_APP_SUPABASE_URL is undefined"
```powershell
# Make sure .env exists in frontend directory
# Restart frontend after creating .env
npm start
```

### "Database connection failed"
```powershell
# Create database
psql -U postgres
CREATE DATABASE chakshi_db;
\q

# Run migrations
npm run migrate
```

### "Invalid or expired token"
- Check Supabase keys match frontend & backend
- Disable email confirmation in Supabase
- Try registering a new user

### "User not found" on login
- User exists in Supabase but not in backend DB
- Register again with same credentials
- Check backend terminal for errors

---

## 📊 Verify Setup

### Check Backend
```powershell
# Should show:
✅ Database connected successfully
🚀 Server running on http://localhost:5000
📚 API Docs available at http://localhost:5000/api-docs
```

### Check Frontend
```powershell
# Should open browser at:
http://localhost:3000

# No console errors
# Can navigate to /login and /register
```

### Check Database
```powershell
cd backend\lawAgent
npm run db:studio
# Opens http://localhost:5555
# Check if tables exist
```

---

## 🎓 How to Use API Service

### In Your Components
```javascript
import { casesAPI, clientsAPI, dashboardAPI } from '../services/api';

// Get all cases
const { data } = await casesAPI.getAll();

// Create new case
const newCase = await casesAPI.create({
  title: 'Case Title',
  category: 'Civil',
  clientId: 'client-uuid'
});

// Get dashboard stats
const stats = await dashboardAPI.getStats();
```

### Authentication is Automatic
- Token automatically added to requests
- Auto-refresh on expiry
- Auto-redirect to login if unauthorized

---

## 🔄 Next Steps

1. **Test Authentication** ✅
   - Register → Login → Logout → Login

2. **Connect Dashboard Data**
   - Update dashboard components to use `dashboardAPI.getStats()`
   
3. **Connect Cases Management**
   - Update cases list to use `casesAPI.getAll()`
   - Add create/edit functionality

4. **Connect Client Management**
   - Update clients to use `clientsAPI`

5. **Add Document Upload**
   - Use `documentsAPI.upload(formData)`

---

## 📞 Quick Links

- **Backend API Docs**: http://localhost:5000/api-docs
- **Prisma Studio**: http://localhost:5555 (run `npm run db:studio`)
- **Frontend**: http://localhost:3000
- **Supabase Dashboard**: https://app.supabase.com

---

## 🎯 Success Criteria

- [ ] Both servers start without errors
- [ ] Can register new user
- [ ] Can login with credentials
- [ ] Redirected to correct dashboard based on role
- [ ] Session persists on page refresh
- [ ] Can logout successfully
- [ ] Protected routes require login

---

**Status**: ✅ Ready for Testing
**Time to Setup**: ~5 minutes
**Last Updated**: October 19, 2025

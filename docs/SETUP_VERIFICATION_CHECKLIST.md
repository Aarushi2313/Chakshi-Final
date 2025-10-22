# ✅ Setup Verification Checklist

Use this checklist to verify your frontend and backend are properly separated and configured.

## 📋 Pre-Flight Checklist

### 1. Directory Structure ✓

```powershell
# Verify directories exist
Test-Path frontend          # Should return True
Test-Path backend\lawAgent  # Should return True
```

Expected structure:
```
✅ frontend/
   ├── src/
   ├── package.json
   └── .env

✅ backend/lawAgent/
   ├── src/
   ├── package.json
   └── .env
```

---

### 2. Environment Files ✓

#### Frontend (.env)
```powershell
cd frontend
Get-Content .env
```

**Required variables:**
```bash
REACT_APP_SUPABASE_URL=https://your-project.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key
REACT_APP_BACKEND_URL=http://localhost:5000  # ← Must match backend PORT
```

#### Backend (.env)
```powershell
cd backend\lawAgent
Get-Content .env
```

**Required variables:**
```bash
PORT=5000                                     # ← Backend port
DATABASE_URL=postgresql://...
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-key
JWT_SECRET=your-secret
CORS_ORIGIN=http://localhost:3000             # ← Must match frontend port!
```

**🚨 IMPORTANT:** Verify `CORS_ORIGIN` matches frontend port (default: 3000)

---

### 3. Dependencies Installed ✓

#### Frontend
```powershell
cd frontend
npm install
```

Check key packages:
```powershell
npm list react react-router-dom axios @supabase/supabase-js
```

#### Backend
```powershell
cd backend\lawAgent
npm install
```

Check key packages:
```powershell
npm list express prisma @supabase/supabase-js razorpay
```

---

### 4. Database Setup ✓ (Backend)

```powershell
cd backend\lawAgent

# Generate Prisma client
npm run db:generate

# Run migrations
npm run migrate

# (Optional) Seed database
npm run seed
```

---

### 5. Port Configuration ✓

**Verify ports are correct:**

| Service  | Port | Check Command |
|----------|------|---------------|
| Frontend | 3000 | Default for `react-scripts start` |
| Backend  | 5000 | Check `PORT` in `backend/lawAgent/.env` |

**Test for port conflicts:**
```powershell
# Check if ports are available
netstat -ano | findstr :3000
netstat -ano | findstr :5000
# If results appear, ports are in use
```

---

## 🚀 Startup Verification

### Step 1: Start Backend First

```powershell
cd backend\lawAgent
npm run dev
```

**Expected output:**
```
✅ Database connection established
🚀 Chakshi Backend server running on http://0.0.0.0:5000
📚 API Documentation available at http://0.0.0.0:5000/api/docs
🔍 Health check available at http://0.0.0.0:5000/health
🌍 Environment: development
```

**Verify backend:**
```powershell
# Test health endpoint
curl http://localhost:5000/health

# Or open in browser:
# http://localhost:5000/health
# http://localhost:5000/api/docs
```

**Expected response:**
```json
{
  "success": true,
  "message": "Chakshi Backend is running!",
  "timestamp": "2025-10-22T...",
  "environment": "development"
}
```

---

### Step 2: Start Frontend (New Terminal)

```powershell
cd frontend
npm start
```

**Expected output:**
```
Compiled successfully!

You can now view chakshi-frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000
```

**Verify frontend:**
- Browser automatically opens to `http://localhost:3000`
- Landing page loads without errors
- Check browser console for errors (F12)

---

## 🧪 Integration Testing

### Test 1: CORS Configuration

Open browser to `http://localhost:3000`, then:

**In Browser Console (F12 → Console):**
```javascript
fetch('http://localhost:5000/health')
  .then(res => res.json())
  .then(data => console.log('✅ CORS working:', data))
  .catch(err => console.error('❌ CORS error:', err));
```

**Expected:** ✅ CORS working with backend response

**If error:** Check `CORS_ORIGIN` in backend `.env` matches `http://localhost:3000`

---

### Test 2: API Communication

From frontend, try to login or make an API call.

**Check Network Tab (F12 → Network):**
- Look for requests to `http://localhost:5000/auth/login`
- Status should be 200 (success) or 401 (invalid credentials)
- **NOT** CORS error

---

### Test 3: React Router (Frontend)

Navigate through the app:
- ✅ Click "Login" → URL changes to `/login`
- ✅ Browser back button works
- ✅ Direct URL `http://localhost:3000/login` works

---

### Test 4: Backend Routes

Test backend endpoints directly:

```powershell
# Health check
curl http://localhost:5000/health

# API documentation
# Open in browser: http://localhost:5000/api/docs
```

---

## ✅ Verification Checklist

### Environment Setup
- [ ] Frontend `.env` file exists with correct variables
- [ ] Backend `.env` file exists with correct variables
- [ ] `REACT_APP_BACKEND_URL` points to `http://localhost:5000`
- [ ] `CORS_ORIGIN` in backend is `http://localhost:3000`
- [ ] Database URL is configured in backend `.env`

### Dependencies
- [ ] Frontend dependencies installed (`npm install` in frontend/)
- [ ] Backend dependencies installed (`npm install` in backend/lawAgent/)
- [ ] Prisma client generated (`npm run db:generate` in backend/)
- [ ] Database migrations run (`npm run migrate` in backend/)

### Running Services
- [ ] Backend starts successfully on port 5000
- [ ] Backend health check responds at `/health`
- [ ] Backend API docs visible at `/api/docs`
- [ ] Frontend starts successfully on port 3000
- [ ] Frontend landing page loads without errors
- [ ] No console errors in browser

### Integration
- [ ] CORS allows frontend to call backend
- [ ] Frontend can make API requests to backend
- [ ] React Router handles client-side navigation
- [ ] Backend routes respond to API calls
- [ ] Authentication flow works (login/register)

### Separation Verification
- [ ] Frontend and backend have separate `package.json`
- [ ] Frontend and backend have separate `.env` files
- [ ] Frontend can run without backend (shows pages)
- [ ] Backend can run without frontend (responds to API calls)
- [ ] No shared code/imports between projects

---

## 🚨 Common Issues and Fixes

### Issue 1: CORS Error
```
Access to fetch at 'http://localhost:5000/...' from origin 'http://localhost:3000' 
has been blocked by CORS policy
```

**Fix:**
```bash
# In backend/lawAgent/.env
CORS_ORIGIN=http://localhost:3000  # ← Must match frontend URL exactly
```

Then restart backend server.

---

### Issue 2: Backend API Not Found (404)
```
GET http://localhost:5000/cases 404 (Not Found)
```

**Fix:**
1. Check backend is running: `http://localhost:5000/health`
2. Check API routes in backend: `http://localhost:5000/api/docs`
3. Verify `REACT_APP_BACKEND_URL` in frontend `.env`

---

### Issue 3: Environment Variables Not Loading
```
undefined or null when accessing process.env.REACT_APP_*
```

**Fix:**
1. Restart frontend dev server after changing `.env`
2. Ensure variables have `REACT_APP_` prefix (frontend only)
3. No spaces around `=` in `.env` file

---

### Issue 4: Database Connection Error
```
❌ Failed to start server: PrismaClientInitializationError
```

**Fix:**
```powershell
cd backend\lawAgent

# Check DATABASE_URL in .env
# Run migrations
npm run migrate

# Generate Prisma client
npm run db:generate
```

---

### Issue 5: Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Fix:**
```powershell
# Find process using port
netstat -ano | findstr :5000

# Kill the process (replace PID with actual number)
taskkill /PID <PID> /F
```

---

## 📊 Quick Status Check

Run this PowerShell script to check everything:

```powershell
Write-Host "=== Chakshi Setup Verification ===" -ForegroundColor Cyan

# Check directories
Write-Host "`n📁 Directories:" -ForegroundColor Yellow
if (Test-Path frontend) { Write-Host "  ✅ Frontend exists" -ForegroundColor Green } else { Write-Host "  ❌ Frontend missing" -ForegroundColor Red }
if (Test-Path backend\lawAgent) { Write-Host "  ✅ Backend exists" -ForegroundColor Green } else { Write-Host "  ❌ Backend missing" -ForegroundColor Red }

# Check .env files
Write-Host "`n🔧 Environment Files:" -ForegroundColor Yellow
if (Test-Path frontend\.env) { Write-Host "  ✅ Frontend .env exists" -ForegroundColor Green } else { Write-Host "  ❌ Frontend .env missing" -ForegroundColor Red }
if (Test-Path backend\lawAgent\.env) { Write-Host "  ✅ Backend .env exists" -ForegroundColor Green } else { Write-Host "  ❌ Backend .env missing" -ForegroundColor Red }

# Check node_modules
Write-Host "`n📦 Dependencies:" -ForegroundColor Yellow
if (Test-Path frontend\node_modules) { Write-Host "  ✅ Frontend dependencies installed" -ForegroundColor Green } else { Write-Host "  ⚠️  Run 'cd frontend && npm install'" -ForegroundColor Yellow }
if (Test-Path backend\lawAgent\node_modules) { Write-Host "  ✅ Backend dependencies installed" -ForegroundColor Green } else { Write-Host "  ⚠️  Run 'cd backend\lawAgent && npm install'" -ForegroundColor Yellow }

# Check running services
Write-Host "`n🚀 Running Services:" -ForegroundColor Yellow
$port3000 = netstat -ano | findstr :3000
$port5000 = netstat -ano | findstr :5000
if ($port3000) { Write-Host "  ✅ Frontend running on port 3000" -ForegroundColor Green } else { Write-Host "  ⚠️  Frontend not running" -ForegroundColor Yellow }
if ($port5000) { Write-Host "  ✅ Backend running on port 5000" -ForegroundColor Green } else { Write-Host "  ⚠️  Backend not running" -ForegroundColor Yellow }

Write-Host "`n=== End of Verification ===" -ForegroundColor Cyan
```

---

## 📚 Next Steps

Once all checks pass:

1. **Development:**
   - Read: [BACKEND_FRONTEND_SEPARATION.md](./BACKEND_FRONTEND_SEPARATION.md)
   - Read: [ARCHITECTURE_OVERVIEW.md](./ARCHITECTURE_OVERVIEW.md)

2. **Testing:**
   - Test all user flows (login, cases, etc.)
   - Check browser console for errors
   - Monitor backend logs

3. **Deployment:**
   - See deployment section in [BACKEND_FRONTEND_SEPARATION.md](./BACKEND_FRONTEND_SEPARATION.md)

---

**Last Updated:** October 22, 2025  
**Status:** Use this checklist before starting development

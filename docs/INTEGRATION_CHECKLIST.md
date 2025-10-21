# ✅ Integration Checklist - Chakshi Legal Platform

Use this checklist to ensure everything is set up correctly.

---

## 📋 Pre-Setup Checklist

- [ ] Node.js v18+ installed
- [ ] PostgreSQL installed and running
- [ ] Git installed
- [ ] Code editor (VS Code) installed
- [ ] Supabase account created (https://supabase.com)

---

## 🔧 Backend Setup Checklist

### Environment Configuration
- [ ] Navigated to `backend/lawAgent/` directory
- [ ] Ran `npm install` successfully
- [ ] Created `.env` file from `.env.example`
- [ ] Added Supabase URL
- [ ] Added Supabase Service Role Key
- [ ] Added Supabase Anon Key
- [ ] Added database connection string
- [ ] Added JWT secret (random, complex string)
- [ ] Set CORS_ORIGIN to `http://localhost:3000`
- [ ] Set PORT to `5000`

### Database Setup
- [ ] Created PostgreSQL database `chakshi_db`
- [ ] Ran `npm run db:generate` (no errors)
- [ ] Ran `npm run migrate` (tables created)
- [ ] Optional: Ran `npm run seed` (sample data added)
- [ ] Verified tables in database (use `npm run db:studio`)

### Server Start
- [ ] Ran `npm run dev`
- [ ] Saw "✅ Database connected successfully"
- [ ] Saw "🚀 Server running on http://localhost:5000"
- [ ] No error messages in terminal
- [ ] Can access http://localhost:5000 in browser
- [ ] Can access http://localhost:5000/api-docs (Swagger)

---

## 🎨 Frontend Setup Checklist

### Environment Configuration
- [ ] Navigated to `frontend/` directory
- [ ] Ran `npm install` successfully
- [ ] Created `.env` file from `.env.example`
- [ ] Added `REACT_APP_SUPABASE_URL`
- [ ] Added `REACT_APP_SUPABASE_ANON_KEY` (NOT service_role!)
- [ ] Added `REACT_APP_BACKEND_URL=http://localhost:5000`
- [ ] Saved `.env` file

### Server Start
- [ ] Ran `npm start`
- [ ] Browser opened to http://localhost:3000
- [ ] No console errors in browser
- [ ] Can navigate to homepage
- [ ] Can navigate to `/login`
- [ ] Can navigate to `/register`

---

## 🔐 Supabase Configuration Checklist

### Project Setup
- [ ] Created new Supabase project
- [ ] Waited for project to be ready (~2 min)
- [ ] Noted project URL
- [ ] Copied API keys from Settings → API

### Authentication Settings
- [ ] Enabled Email provider (Authentication → Providers)
- [ ] Disabled email confirmations (for testing):
  - [ ] Go to Authentication → Settings
  - [ ] Turn OFF "Enable email confirmations"
- [ ] Saved settings

### Verification
- [ ] Can access Supabase dashboard
- [ ] Can see Authentication tab
- [ ] Can see Database tab
- [ ] SQL Editor is accessible

---

## 🧪 Testing Checklist

### Test 1: User Registration
- [ ] Opened http://localhost:3000/register
- [ ] Filled in registration form:
  - [ ] Name: Test User
  - [ ] Email: test@example.com
  - [ ] Password: Test123!
  - [ ] Confirm Password: Test123!
  - [ ] Selected Role: Advocate
- [ ] Clicked "Create Account"
- [ ] Saw loading spinner
- [ ] Was redirected to `/advocate/dashboard`
- [ ] No errors in browser console
- [ ] No errors in backend terminal

### Verification After Registration
- [ ] User appears in Supabase (Authentication → Users)
- [ ] User appears in PostgreSQL database:
  - [ ] Run `npm run db:studio` in backend
  - [ ] Open http://localhost:5555
  - [ ] Check `users` table
  - [ ] See new user with correct role
- [ ] User data saved in localStorage (check DevTools → Application)

### Test 2: User Logout
- [ ] Found logout button/link
- [ ] Clicked logout
- [ ] Redirected to home or login page
- [ ] User data cleared from localStorage
- [ ] Cannot access protected routes

### Test 3: User Login
- [ ] Opened http://localhost:3000/login
- [ ] Entered credentials:
  - [ ] Email: test@example.com
  - [ ] Password: Test123!
- [ ] Clicked "Sign In"
- [ ] Saw loading spinner
- [ ] Redirected to `/advocate/dashboard`
- [ ] No errors in console
- [ ] User data in localStorage

### Test 4: Session Persistence
- [ ] Logged in successfully
- [ ] Refreshed page (F5)
- [ ] Still logged in
- [ ] Still on dashboard
- [ ] User info still displays

### Test 5: Protected Routes
While logged in:
- [ ] Can access `/advocate/dashboard`
- [ ] Can navigate to different pages
- [ ] User info displays correctly

While logged out:
- [ ] Try accessing `/advocate/dashboard`
- [ ] Should redirect to `/login`
- [ ] Cannot access protected routes

### Test 6: Role-Based Routing
Create 3 users with different roles:
- [ ] User 1: `advocate@test.com`, Role: ADVOCATE
  - [ ] Redirects to `/advocate/dashboard`
- [ ] User 2: `student@test.com`, Role: STUDENT
  - [ ] Redirects to `/student/dashboard`
- [ ] User 3: `clerk@test.com`, Role: CLERK
  - [ ] Redirects to `/clerk/dashboard`

---

## 🔍 Verification Checklist

### Backend Health
- [ ] Backend runs without crashes
- [ ] Database connection successful
- [ ] Swagger docs accessible
- [ ] API endpoints respond
- [ ] Logs show no critical errors

### Frontend Health
- [ ] Frontend runs without crashes
- [ ] No console errors
- [ ] All pages load correctly
- [ ] Supabase client initialized
- [ ] API service working

### Database Health
- [ ] All tables created
- [ ] Users can be created
- [ ] Data persists correctly
- [ ] Can query in Prisma Studio

### Supabase Health
- [ ] Auth users created successfully
- [ ] Can see users in dashboard
- [ ] Email provider working
- [ ] API keys valid

---

## 🐛 Troubleshooting Checklist

### If Backend Won't Start
- [ ] Check PostgreSQL is running
- [ ] Verify DATABASE_URL is correct
- [ ] Check all env variables are set
- [ ] Run `npm install` again
- [ ] Check for port conflicts (5000)
- [ ] Read error messages carefully

### If Frontend Won't Start
- [ ] Check `.env` file exists
- [ ] Verify all REACT_APP_ variables set
- [ ] Run `npm install` again
- [ ] Clear npm cache: `npm cache clean --force`
- [ ] Check for port conflicts (3000)
- [ ] Restart terminal

### If Registration Fails
- [ ] Check Supabase keys match
- [ ] Verify email confirmation disabled
- [ ] Check backend is running
- [ ] Check backend logs for errors
- [ ] Verify CORS_ORIGIN setting
- [ ] Check network tab in DevTools

### If Login Fails
- [ ] Verify user exists in Supabase
- [ ] Verify user exists in PostgreSQL
- [ ] Check credentials are correct
- [ ] Check backend running
- [ ] Check backend logs
- [ ] Clear browser cache/cookies

### If Token Errors
- [ ] Check Supabase keys match frontend/backend
- [ ] Verify anon key in frontend (not service_role)
- [ ] Check token expiration settings
- [ ] Try logging out and in again
- [ ] Check Supabase dashboard for issues

---

## 📊 API Testing Checklist

### Using Browser DevTools
- [ ] Open DevTools (F12)
- [ ] Go to Network tab
- [ ] Perform login
- [ ] See POST to `/api/auth/login`
- [ ] Check response has user data
- [ ] See Authorization header in requests

### Using Swagger UI
- [ ] Open http://localhost:5000/api-docs
- [ ] See all API endpoints listed
- [ ] Try "Try it out" on `/auth/verify-token`
- [ ] Enter a valid token
- [ ] Get successful response

### Using curl/PowerShell
```powershell
# Test backend health
curl http://localhost:5000

# Test API endpoint (after getting token)
curl http://localhost:5000/api/auth/me `
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 🎯 Success Criteria

### Must Have (Critical)
- [ ] Backend starts without errors
- [ ] Frontend starts without errors
- [ ] Can register new user
- [ ] Can login with credentials
- [ ] Session persists on refresh
- [ ] Can logout successfully
- [ ] Role-based routing works

### Should Have (Important)
- [ ] Protected routes redirect when not authenticated
- [ ] Error messages display correctly
- [ ] Loading states work
- [ ] API calls include auth headers
- [ ] Token auto-refreshes

### Nice to Have (Optional)
- [ ] Swagger documentation accessible
- [ ] Prisma Studio accessible
- [ ] Sample data seeded
- [ ] All three roles tested

---

## 📈 Next Steps Checklist

After basic auth is working:

### Phase 1: Core Features
- [ ] Connect dashboard to real API
- [ ] Implement case listing
- [ ] Implement case creation
- [ ] Implement client listing
- [ ] Implement client creation

### Phase 2: Advanced Features
- [ ] Add document upload
- [ ] Add notifications
- [ ] Add calendar integration
- [ ] Add search functionality
- [ ] Add filters

### Phase 3: Polish
- [ ] Add loading skeletons
- [ ] Improve error handling
- [ ] Add success messages
- [ ] Add form validation
- [ ] Optimize performance

### Phase 4: Production Ready
- [ ] Enable email verification
- [ ] Add password reset
- [ ] Set up proper environment variables
- [ ] Configure production database
- [ ] Set up monitoring
- [ ] Add analytics
- [ ] Security audit

---

## 🔐 Security Checklist

### Development
- [ ] `.env` files not committed to Git
- [ ] `.gitignore` includes `.env`
- [ ] Service role key only in backend
- [ ] Anon key in frontend
- [ ] CORS set to localhost

### Production (Future)
- [ ] Environment variables in hosting platform
- [ ] Email verification enabled
- [ ] HTTPS only
- [ ] Proper CORS origins
- [ ] Rate limiting configured
- [ ] SQL injection prevention
- [ ] XSS protection
- [ ] CSRF tokens
- [ ] Security headers
- [ ] Regular security audits

---

## 📞 Support Checklist

If stuck, check in this order:

1. [ ] Read error message carefully
2. [ ] Check browser console
3. [ ] Check backend terminal logs
4. [ ] Check Supabase dashboard logs
5. [ ] Verify all environment variables
6. [ ] Restart both servers
7. [ ] Check documentation:
   - [ ] QUICK_START.md
   - [ ] SETUP_GUIDE.md
   - [ ] BACKEND_ANALYSIS.md
8. [ ] Search for error online
9. [ ] Check Supabase docs
10. [ ] Ask for help with specific error

---

## ✅ Final Sign-Off

Once all critical items are checked:

- [ ] Backend operational ✅
- [ ] Frontend operational ✅
- [ ] Supabase configured ✅
- [ ] Database set up ✅
- [ ] Registration working ✅
- [ ] Login working ✅
- [ ] Logout working ✅
- [ ] Role routing working ✅
- [ ] Documentation reviewed ✅

**Integration Status**: 🎉 COMPLETE

---

**Last Updated**: October 19, 2025
**Version**: 1.0.0
**Status**: Ready for Development

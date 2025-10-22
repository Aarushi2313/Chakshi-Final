# 🚀 How to Run Chakshi Project from Scratch

This guide will help you set up and run both the frontend and backend of the Chakshi Legal Management System from a fresh start.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Project Overview](#project-overview)
3. [Initial Setup](#initial-setup)
4. [Backend Setup](#backend-setup)
5. [Frontend Setup](#frontend-setup)
6. [Running the Application](#running-the-application)
7. [Troubleshooting](#troubleshooting)
8. [Useful Commands](#useful-commands)

---

## Prerequisites

Before you begin, ensure you have the following installed on your system:

### Required Software

- **Node.js** (v18.0.0 or higher)
  - Download from: https://nodejs.org/
  - Verify installation: `node --version`

- **npm** (comes with Node.js)
  - Verify installation: `npm --version`

- **PostgreSQL** (v12 or higher)
  - Download from: https://www.postgresql.org/download/
  - Or use a cloud provider like Supabase (recommended)

- **Git**
  - Download from: https://git-scm.com/
  - Verify installation: `git --version`

### Optional Software

- **VS Code** (recommended code editor)
- **Postman** or **Thunder Client** (for API testing)
- **PostgreSQL GUI** (e.g., pgAdmin, TablePlus, or DBeaver)

---

## Project Overview

The Chakshi project consists of two main parts:

```
Chakshi-Final/
├── frontend/              # React application (Port 3000)
└── backend/
    └── lawAgent/         # Node.js + TypeScript API (Port 5000)
```

**Tech Stack:**
- **Frontend**: React 18, React Router, Axios, Chart.js
- **Backend**: Node.js, TypeScript, Express, Prisma, Supabase
- **Database**: PostgreSQL (via Supabase)
- **Payments**: Razorpay integration

---

## Initial Setup

### Step 1: Clone the Repository

```powershell
# Navigate to your desired directory
cd C:\Users\admin\OneDrive\Desktop\Documents\GitHub

# Clone the repository
git clone https://github.com/Aarushi2313/Chakshi-Final.git

# Navigate into the project
cd Chakshi-Final
```

### Step 2: Verify Project Structure

```powershell
# List directories to ensure everything is there
ls
```

You should see:
- `frontend/` folder
- `backend/` folder
- `docs/` folder
- `README.md`
- `package.json`

---

## Backend Setup

### Step 1: Navigate to Backend Directory

```powershell
cd backend\lawAgent
```

### Step 2: Install Dependencies

```powershell
# Install all required packages (this may take a few minutes)
npm install
```

**What gets installed:**
- Express (web framework)
- Prisma (database ORM)
- TypeScript compiler
- Supabase client
- Razorpay SDK
- JWT for authentication
- And many more dependencies...

### Step 3: Configure Environment Variables

1. **Copy the example environment file:**

```powershell
copy .env.example .env
```

2. **Edit the `.env` file** with your actual credentials:

```bash
# Server Configuration
NODE_ENV=development
PORT=5000

# Database Configuration (Supabase PostgreSQL URL)
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-ID].supabase.co:5432/postgres

# Supabase Configuration
# Get these from: https://app.supabase.com/project/[your-project]/settings/api
SUPABASE_URL=https://[your-project-id].supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
SUPABASE_ANON_KEY=your_anon_key_here

# JWT Configuration (generate secure random strings)
JWT_SECRET=your_very_secure_jwt_secret_minimum_32_characters
SESSION_SECRET=your_very_secure_session_secret_minimum_32_characters

# Razorpay Configuration (for payments)
# Get these from: https://dashboard.razorpay.com/app/keys
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_razorpay_secret

# Storage Configuration
SUPABASE_STORAGE_BUCKET=uploads

# CORS Configuration
CORS_ORIGIN=http://localhost:3000

# Optional
LOG_LEVEL=info
API_PREFIX=/api
```

**Where to get credentials:**

- **Supabase**: 
  1. Create account at https://supabase.com
  2. Create a new project
  3. Go to Settings > API to get URL and keys
  4. Go to Settings > Database to get connection string

- **Razorpay**:
  1. Create account at https://razorpay.com
  2. Go to Dashboard > Settings > API Keys
  3. Generate test keys for development

### Step 4: Set Up the Database

```powershell
# Generate Prisma Client
npm run db:generate

# Run database migrations (creates tables)
npm run migrate

# Seed the database with initial data
npm run seed
```

**What this does:**
- `db:generate`: Creates TypeScript types for your database
- `migrate`: Creates all database tables and relationships
- `seed`: Populates the database with sample data (users, cases, etc.)

### Step 5: Build the Backend

```powershell
# Compile TypeScript to JavaScript
npm run build
```

This creates a `dist/` folder with compiled JavaScript files.

### Step 6: Verify Backend Setup

```powershell
# Check if everything is configured correctly
npm run lint
```

---

## Frontend Setup

### Step 1: Navigate to Frontend Directory

```powershell
# From the root directory
cd ..\..\frontend

# Or from backend
cd ..\..\frontend
```

### Step 2: Install Dependencies

```powershell
# Install all required packages (this may take a few minutes)
npm install
```

**What gets installed:**
- React and React DOM
- React Router for navigation
- Axios for API calls
- Chart.js for analytics
- Supabase client
- UI components and icons

### Step 3: Configure Environment Variables

1. **Copy the example environment file:**

```powershell
copy .env.example .env
```

2. **Edit the `.env` file** with your configuration:

```bash
# Supabase Configuration (same as backend)
REACT_APP_SUPABASE_URL=https://[your-project-id].supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-supabase-anon-key-here

# Backend API Configuration
REACT_APP_BACKEND_URL=http://localhost:5000
REACT_APP_API_PREFIX=/api

# Environment
REACT_APP_ENV=development
```

**Important Notes:**
- All environment variables in React MUST start with `REACT_APP_`
- Use the same Supabase credentials as your backend
- The `REACT_APP_BACKEND_URL` should point to your backend server (default: http://localhost:5000)

### Step 4: Verify Frontend Setup

```powershell
# Optional: Check for any issues
npm run build
```

If the build succeeds, your frontend is ready to run!

---

## Running the Application

You'll need **TWO terminal windows** - one for backend and one for frontend.

### Terminal 1: Start the Backend

```powershell
# Navigate to backend directory
cd C:\Users\admin\OneDrive\Desktop\Documents\GitHub\Chakshi-Final\backend\lawAgent

# Start the backend in development mode (with auto-reload)
npm run dev
```

**Expected output:**
```
[INFO] Server starting...
[INFO] Database connected successfully
[INFO] Server running on http://localhost:5000
[INFO] API docs available at http://localhost:5000/api-docs
```

**Backend will run on:** http://localhost:5000

### Terminal 2: Start the Frontend

```powershell
# Navigate to frontend directory
cd C:\Users\admin\OneDrive\Desktop\Documents\GitHub\Chakshi-Final\frontend

# Start the frontend development server
npm start
```

**Expected output:**
```
Compiled successfully!

You can now view chakshi-frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000

Note that the development build is not optimized.
To create a production build, use npm run build.

webpack compiled with 0 warnings
```

**Frontend will automatically open in your browser at:** http://localhost:3000

---

## Testing the Application

### 1. Access the Application

Open your browser and navigate to: http://localhost:3000

### 2. Default Test Accounts

After seeding the database, you should have these test accounts:

**Admin Account:**
- Email: `admin@chakshi.com`
- Password: `Admin@123`
- Role: Administrator

**Advocate Account:**
- Email: `advocate@chakshi.com`
- Password: `Advocate@123`
- Role: Advocate

**Clerk Account:**
- Email: `clerk@chakshi.com`
- Password: `Clerk@123`
- Role: Clerk

**Student Account:**
- Email: `student@chakshi.com`
- Password: `Student@123`
- Role: Student

### 3. Test Key Features

- **Login/Signup**: Test authentication flows
- **Dashboard**: Check role-based dashboards
- **Case Management**: Create and view cases
- **Analytics**: View charts and statistics
- **Payments**: Test Razorpay integration
- **Admin Panel**: Manage users and system settings

### 4. API Testing

You can test the backend API directly:

**Health Check:**
```powershell
curl http://localhost:5000/api/health
```

**API Documentation:**
Open in browser: http://localhost:5000/api-docs

---

## Troubleshooting

### Common Issues and Solutions

#### 1. Port Already in Use

**Problem:** `Error: listen EADDRINUSE: address already in use :::3000`

**Solution:**
```powershell
# Find the process using the port
netstat -ano | findstr :3000

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

#### 2. Database Connection Failed

**Problem:** `Error: P1001: Can't reach database server`

**Solutions:**
- Verify your `DATABASE_URL` in `.env`
- Check if PostgreSQL is running
- Test Supabase connection in browser
- Ensure no firewall blocking the connection

#### 3. Module Not Found Errors

**Problem:** `Error: Cannot find module 'xyz'`

**Solution:**
```powershell
# Delete node_modules and package-lock.json
rm -r node_modules
rm package-lock.json

# Reinstall dependencies
npm install
```

#### 4. Prisma Client Not Generated

**Problem:** `Error: @prisma/client did not initialize yet`

**Solution:**
```powershell
cd backend\lawAgent
npm run db:generate
```

#### 5. Environment Variables Not Loading

**Problem:** Variables showing as `undefined`

**Solutions:**
- Ensure `.env` file exists in the correct directory
- Check variable names (frontend vars must start with `REACT_APP_`)
- Restart the development server after changing `.env`
- No spaces around `=` in `.env` file

#### 6. CORS Errors

**Problem:** `Access-Control-Allow-Origin` errors

**Solution:**
- Verify `CORS_ORIGIN` in backend `.env` matches frontend URL
- Default should be: `CORS_ORIGIN=http://localhost:3000`

#### 7. TypeScript Compilation Errors

**Problem:** TypeScript errors during build

**Solution:**
```powershell
# Backend
cd backend\lawAgent
npx tsc --noEmit

# Fix errors, then rebuild
npm run build
```

#### 8. React Build Warnings

**Problem:** Build warnings about unused variables

**Solution:**
```powershell
# Build with CI flag to ignore warnings
$env:CI='false'; npm run build
```

---

## Useful Commands

### Backend Commands

```powershell
cd backend\lawAgent

# Development with auto-reload
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Database commands
npm run migrate          # Run migrations
npm run migrate:deploy   # Deploy migrations
npm run seed            # Seed database
npm run db:generate     # Generate Prisma Client
npm run db:studio       # Open Prisma Studio (database GUI)

# Code quality
npm run lint            # Check for linting errors
npm run lint:fix        # Auto-fix linting errors
npm run format          # Format code with Prettier

# Testing
npm test                # Run tests
npm run test:watch      # Run tests in watch mode
npm run test:coverage   # Generate coverage report
```

### Frontend Commands

```powershell
cd frontend

# Development server
npm start               # Start dev server (port 3000)

# Build
npm run build          # Create production build
$env:CI='false'; npm run build  # Build ignoring warnings

# Testing
npm test               # Run tests
npm run test:watch     # Run tests in watch mode
```

### Database Management

```powershell
cd backend\lawAgent

# Open Prisma Studio (visual database editor)
npm run db:studio

# Create new migration
npx prisma migrate dev --name your_migration_name

# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# View migration status
npx prisma migrate status

# Format Prisma schema
npx prisma format
```

### Useful PowerShell Commands

```powershell
# Check Node/npm versions
node --version
npm --version

# Check running processes on a port
netstat -ano | findstr :3000
netstat -ano | findstr :5000

# Clear npm cache (if having issues)
npm cache clean --force

# Update npm to latest version
npm install -g npm@latest

# List globally installed packages
npm list -g --depth=0

# Check for outdated packages
npm outdated
```

---

## Project Structure Reference

```
Chakshi-Final/
│
├── frontend/                          # React Application
│   ├── public/                        # Static files
│   ├── src/
│   │   ├── Admin components/          # Admin UI components
│   │   ├── Admin pages/               # Admin pages
│   │   ├── Advocate components/       # Advocate UI
│   │   ├── Clerk components/          # Clerk UI
│   │   ├── Student components/        # Student UI
│   │   ├── components/                # Shared components
│   │   ├── contexts/                  # React Context API
│   │   ├── lib/                       # Utility functions
│   │   ├── styles/                    # Global styles
│   │   ├── App.js                     # Main app component
│   │   └── index.js                   # Entry point
│   ├── .env                           # Frontend environment variables
│   ├── .env.example                   # Example env file
│   └── package.json                   # Frontend dependencies
│
├── backend/
│   └── lawAgent/                      # Main Backend API
│       ├── src/
│       │   ├── controllers/           # Request handlers
│       │   ├── routes/                # API routes
│       │   ├── middleware/            # Express middleware
│       │   ├── services/              # Business logic
│       │   ├── utils/                 # Utility functions
│       │   ├── types/                 # TypeScript types
│       │   └── server.ts              # Main server file
│       ├── prisma/
│       │   ├── schema.prisma          # Database schema
│       │   ├── migrations/            # Database migrations
│       │   └── seed.ts                # Database seeder
│       ├── .env                       # Backend environment variables
│       ├── .env.example               # Example env file
│       ├── package.json               # Backend dependencies
│       └── tsconfig.json              # TypeScript configuration
│
└── docs/                              # Documentation
    ├── README.md                      # Documentation index
    ├── HOW_TO_RUN.md                 # This file
    ├── admin/                         # Admin docs
    ├── clerk/                         # Clerk docs
    ├── features/                      # Feature docs
    └── guides/                        # Setup guides
```

---

## Next Steps

After successfully running the application:

1. **Explore the Documentation**
   - Check the `docs/` folder for detailed feature guides
   - Read `docs/README.md` for documentation index

2. **Configure Payment Gateway**
   - See `docs/guides/PAYMENT_SETUP_GUIDE.md`
   - Test Razorpay integration

3. **Customize for Your Needs**
   - Modify the Prisma schema for your database needs
   - Update UI components in `frontend/src/`
   - Add custom API routes in `backend/lawAgent/src/routes/`

4. **Deploy to Production**
   - Frontend: Deploy to Vercel, Netlify, or similar
   - Backend: Deploy to Railway, Render, or similar
   - Database: Use Supabase production instance

---

## Getting Help

If you encounter issues not covered in this guide:

1. **Check Existing Documentation**
   - Review files in the `docs/` folder
   - Check `docs/TROUBLESHOOT_WHITE_SCREEN.md`
   - Review `docs/QUICK_START.md`

2. **Check Logs**
   - Backend logs: `backend/lawAgent/logs/`
   - Browser console: Press F12 in browser
   - Terminal output for error messages

3. **Common Resources**
   - Node.js docs: https://nodejs.org/docs/
   - React docs: https://react.dev/
   - Prisma docs: https://www.prisma.io/docs/
   - Supabase docs: https://supabase.com/docs/

4. **Contact**
   - Check the main `README.md` for contact information
   - Open an issue on GitHub repository

---

## Summary Checklist

Before running the application, ensure you've completed:

### Backend Setup
- [ ] Node.js installed (v18+)
- [ ] PostgreSQL/Supabase account created
- [ ] Navigated to `backend/lawAgent/`
- [ ] Ran `npm install`
- [ ] Created `.env` file with all required variables
- [ ] Ran `npm run db:generate`
- [ ] Ran `npm run migrate`
- [ ] Ran `npm run seed`
- [ ] Ran `npm run build` (optional but recommended)

### Frontend Setup
- [ ] Navigated to `frontend/`
- [ ] Ran `npm install`
- [ ] Created `.env` file with Supabase and backend URL
- [ ] Verified build with `npm run build` (optional)

### Running
- [ ] Backend running on http://localhost:5000
- [ ] Frontend running on http://localhost:3000
- [ ] Can access login page
- [ ] Can log in with test credentials
- [ ] Dashboard loads correctly

---

## Quick Start Commands (TL;DR)

For experienced developers, here's the quick version:

```powershell
# Clone and install
git clone https://github.com/Aarushi2313/Chakshi-Final.git
cd Chakshi-Final

# Backend setup
cd backend\lawAgent
npm install
copy .env.example .env
# Edit .env with your credentials
npm run db:generate
npm run migrate
npm run seed
npm run dev  # Keep this running

# In a new terminal - Frontend setup
cd ..\..\frontend
npm install
copy .env.example .env
# Edit .env with your credentials
npm start  # Opens browser automatically
```

Access: http://localhost:3000

---

**Last Updated:** October 22, 2025  
**Version:** 1.0  
**Maintained by:** Chakshi Team

---

Happy Coding! 🚀

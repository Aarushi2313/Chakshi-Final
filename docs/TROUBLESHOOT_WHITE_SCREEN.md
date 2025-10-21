# 🔍 Frontend White Screen - Troubleshooting Guide

## Problem
Frontend shows white screen after starting.

## Common Causes & Solutions

### 1. **Check Browser Console**
Open browser DevTools (F12) and check Console tab for errors.

Common errors:
- Module not found
- Unexpected token
- Cannot read property of undefined

### 2. **Clear Cache & Restart**
```powershell
# Stop all servers
# Ctrl+C in all terminals

# Clear npm cache
cd frontend
rm -rf node_modules package-lock.json
npm install

# Restart
npm start
```

### 3. **Check for Compilation Errors**
The React compiler should show errors in the terminal.  
If it says "Compiled successfully" but shows white screen, it's a runtime error.

### 4. **Test with Minimal App.js**
Temporarily replace App.js content to test if imports are the issue:

```javascript
import React from 'react';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Test - If you see this, React is working!</h1>
    </div>
  );
}

export default App;
```

If this works, the issue is in your actual App.js or its imports.

### 5. **Check Package Installations**
```powershell
cd frontend
npm list @supabase/supabase-js
npm list axios
npm list react-router-dom
```

Make sure all packages are installed.

### 6. **Common Fixes**

**Issue: Supabase client error**
```javascript
// In src/lib/supabase.js
// Make sure environment variables are set
console.log('Supabase URL:', process.env.REACT_APP_SUPABASE_URL);
console.log('Has Anon Key:', !!process.env.REACT_APP_SUPABASE_ANON_KEY);
```

**Issue: API service error**
Check that axios is installed:
```powershell
npm install axios
```

**Issue: React Router error**
Check package version:
```powershell
npm list react-router-dom
```

### 7. **Manual Test Steps**

1. **Kill all Node processes**:
```powershell
taskkill /F /IM node.exe
```

2. **Delete build artifacts**:
```powershell
cd frontend
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
Remove-Item -Recurse -Force .cache (if exists)
```

3. **Fresh install**:
```powershell
npm install
```

4. **Start with verbose logging**:
```powershell
$env:DEBUG="*"
npm start
```

### 8. **Check .env File**
Make sure `frontend/.env` exists and has:
```env
REACT_APP_SUPABASE_URL=https://vqiusxnxarixuemhyiuz.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
REACT_APP_BACKEND_URL=http://localhost:5000
```

**IMPORTANT**: Restart React after changing `.env`!

### 9. **Alternative: Check Original App**
If the white screen persists, temporarily revert our changes:

1. Comment out Supabase import in AuthContext.js
2. Use the old demo authentication temporarily
3. See if app loads
4. Then add our changes back one by one

### 10. **Check Network Tab**
In Browser DevTools → Network tab:
- Are JavaScript bundles loading?
- Any 404 errors?
- Any failed requests?

## Quick Diagnostic Script

Run this in frontend directory:
```powershell
# Check environment
Write-Host "=== Environment Check ==="
Get-Content .env 2>$null
if (-not $?) { Write-Host "❌ .env file missing!" }

# Check node_modules
Write-Host "`n=== Packages Check ==="
Test-Path node_modules
npm list --depth=0 2>&1 | Select-String "supabase|axios|react-router"

# Check ports
Write-Host "`n=== Port Check ==="
netstat -ano | findstr ":3000"
netstat -ano | findstr ":5000"
```

## Most Likely Issue
Based on your situation, the white screen is probably caused by:

1. **Missing package** - Run `npm install` in frontend
2. **Runtime error in new files** - Check browser console
3. **Environment variables not loaded** - Restart React after creating .env
4. **Syntax error in our new files** - Check compilation output

## Quick Fix to Try Now
```powershell
# Kill everything
taskkill /F /IM node.exe

# Go to frontend
cd C:\Users\admin\OneDrive\Desktop\Documents\GitHub\Chakshi-Final\frontend

# Check .env exists
ls .env

# Reinstall if needed
npm install

# Start fresh
npm start

# Watch terminal for errors!
```

Then check browser console (F12) for actual error message.

---

**Need more help?** Share the:
1. Browser console error (F12 → Console)
2. Terminal compilation error
3. Network tab errors (F12 → Network)

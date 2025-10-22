# Quick Reference: Independent Frontend & Backend

## 🚀 Starting the Applications

### Frontend Only
```powershell
cd frontend
npm install        # First time only
npm start          # Runs on http://localhost:3000
```

### Backend Only
```powershell
cd backend/lawAgent
npm install        # First time only
npm run migrate    # First time only
npm run dev        # Runs on http://localhost:5000
```

### Check Backend Health
```powershell
# Open in browser or curl:
http://localhost:5000/health
http://localhost:5000/api/docs
```

---

## 📂 File Structure

```
frontend/          ← React App (Port 3000)
├── src/
│   ├── App.js            # React Router (client-side)
│   └── components/
├── package.json          # React dependencies
└── .env                  # REACT_APP_* variables

backend/lawAgent/  ← API Server (Port 5000)
├── src/
│   ├── app.ts            # Express routes (server-side)
│   └── modules/
├── package.json          # Express dependencies
└── .env                  # Server variables
```

---

## 🔑 Environment Variables

### Frontend (.env in frontend/)
```bash
REACT_APP_SUPABASE_URL=https://xxx.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key
REACT_APP_BACKEND_URL=http://localhost:5000
```

### Backend (.env in backend/lawAgent/)
```bash
PORT=5000
DATABASE_URL=postgresql://user:pass@localhost:5432/db
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-key
JWT_SECRET=your-secret
CORS_ORIGIN=http://localhost:3000
```

---

## 🛣️ Routing

### Frontend (Client-Side)
```
/                    → Landing
/login               → Login
/advocate/dashboard  → Advocate Dashboard
/student/courses     → Student Courses
/clerk/cases         → Clerk Cases
```

### Backend (API Endpoints)
```
/health              → Health Check
/api/docs            → Swagger Docs
/auth/login          → Login API
/cases               → Cases API
/clients             → Clients API
```

---

## 🔗 Communication

```javascript
// Frontend → Backend
const response = await axios.get(
  `${process.env.REACT_APP_BACKEND_URL}/cases`,
  { headers: { 'Authorization': `Bearer ${token}` }}
);
```

---

## ✅ Verification

- [ ] Frontend runs on port 3000
- [ ] Backend runs on port 5000
- [ ] Each has separate package.json
- [ ] Each has separate .env file
- [ ] Frontend uses React Router
- [ ] Backend uses Express routes
- [ ] CORS allows frontend origin
- [ ] No direct imports between projects

---

## 🚨 Troubleshooting

**CORS Error?**
→ Check `CORS_ORIGIN` in backend/.env matches frontend URL

**API 404?**
→ Check `REACT_APP_BACKEND_URL` in frontend/.env

**Env vars not loading?**
→ Restart dev server after changing .env

---

**Full Guide:** [BACKEND_FRONTEND_SEPARATION.md](./BACKEND_FRONTEND_SEPARATION.md)

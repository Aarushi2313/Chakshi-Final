# Architecture Overview: Frontend & Backend Separation

## 🏗️ System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER BROWSER                            │
│                     http://localhost:3000                        │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                    FRONTEND (React App)                          │
│                        Port: 3000                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  📁 Client-Side Routing (React Router)                          │
│  ├── /                     → Landing Page                        │
│  ├── /login                → Login Page                          │
│  ├── /register             → Register Page                       │
│  ├── /advocate/*           → Advocate Dashboard & Pages          │
│  ├── /student/*            → Student Dashboard & Pages           │
│  └── /clerk/*              → Clerk Dashboard & Pages             │
│                                                                   │
│  📦 Dependencies:                                                │
│  ├── React 18.3.1                                               │
│  ├── React Router DOM 7.8.2                                     │
│  ├── Axios (HTTP Client)                                        │
│  ├── @supabase/supabase-js (Auth & DB Client)                  │
│  └── Chart.js, Recharts (Visualization)                         │
│                                                                   │
│  🔧 Environment Variables:                                       │
│  ├── REACT_APP_SUPABASE_URL                                     │
│  ├── REACT_APP_SUPABASE_ANON_KEY                                │
│  └── REACT_APP_BACKEND_URL                                      │
│                                                                   │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            │ HTTP Requests (Axios)
                            │ GET /cases, POST /auth/login, etc.
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│              BACKEND (Node.js/TypeScript API)                    │
│                        Port: 5000                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  🛣️ API Routes (Express)                                         │
│  ├── /health               → Health Check                        │
│  ├── /api/docs             → Swagger Documentation              │
│  ├── /auth/*               → Authentication APIs                 │
│  │   ├── POST /auth/register                                    │
│  │   ├── POST /auth/login                                       │
│  │   └── POST /auth/logout                                      │
│  ├── /cases/*              → Case Management APIs               │
│  ├── /clients/*            → Client Management APIs             │
│  ├── /documents/*          → Document Management APIs           │
│  ├── /notifications/*      → Notification APIs                  │
│  ├── /schedule/*           → Calendar/Schedule APIs             │
│  └── /templates/*          → Template APIs                      │
│                                                                   │
│  📦 Dependencies:                                                │
│  ├── Express.js 4.21.2                                          │
│  ├── TypeScript                                                  │
│  ├── Prisma ORM 5.22.0                                          │
│  ├── @supabase/supabase-js (Server Client)                      │
│  ├── JWT (jsonwebtoken)                                         │
│  ├── Razorpay 2.9.6                                             │
│  └── CORS (for frontend access)                                 │
│                                                                   │
│  🔧 Environment Variables:                                       │
│  ├── PORT=5000                                                   │
│  ├── DATABASE_URL                                                │
│  ├── SUPABASE_URL                                                │
│  ├── SUPABASE_SERVICE_ROLE_KEY                                  │
│  ├── JWT_SECRET                                                  │
│  ├── RAZORPAY_KEY_ID                                            │
│  ├── RAZORPAY_KEY_SECRET                                        │
│  └── CORS_ORIGIN=http://localhost:3000                          │
│                                                                   │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
              ┌─────────────────────────────┐
              │   EXTERNAL SERVICES         │
              ├─────────────────────────────┤
              │                             │
              │  🗄️  PostgreSQL Database    │
              │  (via Prisma ORM)           │
              │                             │
              │  ☁️  Supabase               │
              │  - Authentication           │
              │  - Storage                  │
              │  - Real-time                │
              │                             │
              │  💳 Razorpay                │
              │  - Payment Processing       │
              │                             │
              └─────────────────────────────┘
```

## 🔄 Request Flow Example

### User Login Flow

```
1. USER enters credentials on frontend
   └─> http://localhost:3000/login

2. FRONTEND sends login request
   └─> axios.post('http://localhost:5000/auth/login', {email, password})

3. BACKEND receives request
   ├─> Validates credentials
   ├─> Checks Supabase auth
   ├─> Generates JWT token
   └─> Returns: {success: true, token: "...", user: {...}}

4. FRONTEND receives response
   ├─> Stores token in localStorage
   ├─> Updates AuthContext
   └─> Redirects to /advocate/dashboard (React Router)

5. FRONTEND makes authenticated requests
   └─> axios.get('http://localhost:5000/cases', {
         headers: { 'Authorization': 'Bearer <token>' }
       })
```

## 📊 Data Flow

```
┌────────────┐                ┌────────────┐                ┌────────────┐
│            │   HTTP/HTTPS   │            │   SQL/Prisma   │            │
│  Frontend  │ ──────────────→│  Backend   │ ──────────────→│  Database  │
│  (React)   │                │  (Express) │                │ (Postgres) │
│            │←────────────── │            │←────────────── │            │
└────────────┘   JSON/REST    └────────────┘    Data        └────────────┘
                Response
```

## 🔐 Security Layers

```
Frontend                Backend                 Database
────────────────────────────────────────────────────────────
                        │
ANON KEY               │ SERVICE ROLE KEY       PROTECTED
(Client Auth)          │ (Server Auth)          (No Direct Access)
                       │
React Guards           │ JWT Verification        Prisma Schema
Protected Routes       │ Route Middleware        Row Level Security
                       │
LocalStorage Token     │ CORS Whitelist          Encrypted Connections
                       │
```

## 🚀 Development vs Production

### Development
```
Frontend:  http://localhost:3000
Backend:   http://localhost:5000
Database:  localhost:5432
```

### Production
```
Frontend:  https://chakshi.vercel.app
Backend:   https://api.chakshi.com
Database:  Production PostgreSQL (Supabase/Railway)

Changes:
- REACT_APP_BACKEND_URL → https://api.chakshi.com
- CORS_ORIGIN → https://chakshi.vercel.app
- All production credentials
```

## 📦 Deployment Independence

```
┌──────────────────┐              ┌──────────────────┐
│   Frontend       │              │   Backend        │
│                  │              │                  │
│   Build: ✅      │              │   Build: ✅      │
│   npm run build  │              │   npm run build  │
│                  │              │                  │
│   Deploy to:     │              │   Deploy to:     │
│   • Vercel       │              │   • Railway      │
│   • Netlify      │              │   • Heroku       │
│   • AWS S3       │              │   • AWS EC2      │
│                  │              │   • DigitalOcean │
│                  │              │                  │
│   Can deploy     │              │   Can deploy     │
│   independently  │              │   independently  │
│   at any time    │              │   at any time    │
└──────────────────┘              └──────────────────┘
```

## 🎯 Key Principles

### ✅ Separation Benefits

1. **Independent Development**
   - Frontend team can work without waiting for backend
   - Backend team can develop APIs independently

2. **Independent Deployment**
   - Deploy frontend without touching backend
   - Deploy backend without rebuilding frontend

3. **Technology Flexibility**
   - Swap frontend framework (React → Next.js)
   - Swap backend (Express → NestJS)
   - No impact on the other side

4. **Scalability**
   - Scale frontend and backend independently
   - Different hosting solutions per need

5. **Testing**
   - Unit test components without API
   - Integration test APIs without UI
   - Use mock data for isolation

### ❌ What to Avoid

```
❌ Importing backend code in frontend
✅ Make HTTP requests instead

❌ Shared package.json dependencies
✅ Separate dependencies per project

❌ Same port for both
✅ Different ports (3000 & 5000)

❌ Tightly coupled deployment
✅ Independent deployment pipelines

❌ Mixed routing strategies
✅ React Router (client) + Express (server)
```

## 🛠️ Tools & Technologies

### Frontend Stack
```javascript
{
  "framework": "React 18.3.1",
  "routing": "React Router DOM 7.8.2",
  "http": "Axios",
  "state": "React Context API",
  "styling": "Tailwind CSS",
  "icons": "Lucide React, React Icons",
  "charts": "Chart.js, Recharts"
}
```

### Backend Stack
```typescript
{
  "runtime": "Node.js",
  "language": "TypeScript",
  "framework": "Express 4.21.2",
  "orm": "Prisma 5.22.0",
  "database": "PostgreSQL",
  "auth": "JWT + Supabase",
  "payments": "Razorpay 2.9.6",
  "docs": "Swagger UI"
}
```

## 📝 Summary

- **Frontend**: Self-contained React app with client-side routing
- **Backend**: Self-contained API server with Express routes
- **Communication**: HTTP/REST via Axios
- **Security**: CORS, JWT, separate auth keys
- **Deployment**: Completely independent
- **Development**: Can run and test separately

---

**Complete Guide**: See [BACKEND_FRONTEND_SEPARATION.md](./BACKEND_FRONTEND_SEPARATION.md)

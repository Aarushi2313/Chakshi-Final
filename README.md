# Chakshi - Legal Management System

A comprehensive legal management system built with React (Frontend) and Node.js/TypeScript (Backend).

## 📁 Project Structure

```
Chakshi-Final/
├── frontend/              # React application
│   ├── src/              # React source code
│   │   ├── Admin components/    # Admin dashboard
│   │   ├── Admin pages/         # Admin pages
│   │   ├── Advocate components/ # Advocate interface
│   │   ├── Advocate pages/      # Advocate pages
│   │   ├── Clerk components/    # Clerk interface
│   │   ├── Student components/  # Student interface
│   │   ├── Student pages/       # Student pages
│   │   ├── components/          # Shared components
│   │   ├── contexts/            # React contexts
│   │   ├── lib/                 # Utilities
│   │   └── styles/              # Global styles
│   ├── public/           # Static assets
│   ├── package.json      # Frontend dependencies
│   └── README.md         # Frontend documentation
│
├── backend/              # Backend services
│   ├── lawAgent/        # Primary TypeScript API (Prisma + Supabase)
│   │   ├── src/         # TypeScript source
│   │   ├── prisma/      # Database schema
│   │   └── docker/      # Docker config
│   ├── server/          # Express payment server
│   │   ├── routes/      # API routes
│   │   ├── middleware/  # Middleware
│   │   └── utils/       # Utilities
│   └── README.md        # Backend documentation
│
├── docs/                 # 📚 All Documentation
│   ├── admin/           # Admin documentation
│   ├── clerk/           # Clerk documentation
│   ├── features/        # Feature documentation
│   ├── implementation/  # Implementation guides
│   ├── guides/          # Setup & configuration guides
│   ├── setup-guides/    # Detailed setup instructions
│   └── README.md        # Documentation index
│
├── .env.example         # Environment variables template
└── package.json         # Root package.json for scripts
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL (for backend database)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Aarushi2313/Chakshi-Final.git
cd Chakshi-Final
```

2. **Configure environment variables**
```bash
# Copy the example file and fill in your values
copy .env.example .env
```

3. **Install Frontend Dependencies**
```bash
cd frontend
npm install
```

4. **Install Backend Dependencies**
```bash
cd backend/lawAgent
npm install

# Setup database
npm run migrate
npm run seed
```

5. **Run the application**

**Frontend (Terminal 1):**
```bash
# From root directory
npm run frontend

# Or directly
cd frontend
npm start
```

**Backend (Terminal 2):**
```bash
# From root directory
npm run backend

# Or directly
cd backend/lawAgent
npm run dev
```

## 📖 Documentation

### Main Documentation
- [📚 Complete Documentation Index](./docs/README.md) - **Start here for all documentation**
- [Frontend Documentation](./frontend/README.md) - React app details
- [Backend Documentation](./backend/README.md) - API and backend services

### Quick Guides
- [🔗 Backend & Frontend Separation Guide](./docs/BACKEND_FRONTEND_SEPARATION.md) - **How they work independently**
- [Payment Integration Guide](./docs/guides/PAYMENT_SETUP_GUIDE.md)
- [Setup Guides](./docs/setup-guides/) - Detailed setup instructions

### Feature Documentation
- [Admin Panel Documentation](./docs/admin/ADMIN_PANEL_DOCUMENTATION.md)
- [Clerk Documentation](./docs/clerk/) - Clerk interface guides
- [Features Documentation](./docs/features/) - All feature guides
- [Implementation Guides](./docs/implementation/) - Implementation details

## 🛠 Available Scripts

### Root Level Commands
```bash
# Frontend
npm run frontend              # Start frontend dev server
npm run frontend:build        # Build frontend for production
npm run frontend:test         # Run frontend tests
npm run frontend:install      # Install frontend dependencies

# Backend (Main API)
npm run backend               # Start backend dev server
npm run backend:build         # Build backend for production
npm run backend:start         # Start production backend
npm run backend:install       # Install backend dependencies
npm run backend:migrate       # Run database migrations
npm run backend:seed          # Seed database
npm run backend:studio        # Open Prisma Studio

# Install Everything
npm run install:all           # Install both frontend and backend
```

### Frontend (cd frontend/)
```bash
npm start                     # Start development server (http://localhost:3000)
npm run build                 # Build for production
npm test                      # Run tests
```

### Backend (cd backend/main-api/)
```bash
npm run dev                   # Start development server with hot reload
npm run build                 # Compile TypeScript to JavaScript
npm start                     # Start production server
npm run migrate               # Run Prisma migrations
npm run seed                  # Seed database with initial data
npm run db:generate           # Generate Prisma client
npm run db:studio             # Open Prisma Studio (database GUI)
npm test                      # Run tests
npm run lint                  # Lint code
npm run docker:dev            # Run in Docker (development)
```

## 🏗 Tech Stack

### Frontend
- **React 18** - UI library
- **React Router v7** - Routing
- **Axios** - HTTP client
- **Chart.js & Recharts** - Data visualization
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **React Icons** - Additional icons

### Backend
- **Node.js & Express** - Server framework
- **TypeScript** - Type safety
- **Prisma ORM** - Database toolkit
- **Supabase** - Backend-as-a-Service
- **PostgreSQL** - Database
- **Razorpay** - Payment gateway
- **JWT** - Authentication
- **Helmet** - Security
- **Winston** - Logging

## 📝 License

ISC

## 👥 Contributors

- Aarushi2313
 -->

# Chakshi - Legal Management System

A comprehensive legal management system built with React (Frontend) and Node.js/TypeScript (Backend).

## 📁 Project Structure

```
Chakshi-Final/
├── frontend/              # React application
│   ├── src/              # React source code
│   ├── public/           # Static assets
│   ├── package.json      # Frontend dependencies
│   └── README.md         # Frontend documentation
│
├── backend/              # Backend services
│   ├── lawagent-ts/     # TypeScript backend with Prisma
│   ├── node-payment/    # Payment integration service
│   ├── server/          # Express API server
│   └── README.md        # Backend documentation
│
├── setup-guides/         # Setup and deployment guides
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

2. **Install all dependencies**
```bash
npm run install:all
```

Or install individually:
```bash
npm run install:frontend
npm run install:backend:lawagent
npm run install:backend:server
npm run install:backend:payment
```

3. **Configure environment variables**
```bash
# Copy the example file and fill in your values
copy .env.example .env
```

4. **Run the application**

**Frontend (in one terminal):**
```bash
npm run frontend
```

**Backend Server (in another terminal):**
```bash
npm run backend:server
```

**Additional Services:**
```bash
# TypeScript backend
npm run backend:lawagent

# Payment service
npm run backend:payment
```

## 📖 Documentation

- [Frontend Documentation](./frontend/README.md)
- [Backend Documentation](./backend/README.md)
- [Payment Integration Guide](./PAYMENT_SETUP_GUIDE.md)
- [Admin Panel Documentation](./ADMIN_PANEL_DOCUMENTATION.md)

## 🛠 Available Scripts

### Root Level
- `npm run frontend` - Start frontend development server
- `npm run frontend:build` - Build frontend for production
- `npm run backend:server` - Start Express API server
- `npm run backend:lawagent` - Start TypeScript backend
- `npm run backend:payment` - Start payment service
- `npm run install:all` - Install all dependencies

### Frontend (cd frontend/)
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests

### Backend Services (cd backend/*)
See [Backend Documentation](./backend/README.md) for detailed instructions.

## 🏗 Tech Stack

### Frontend
- React 18
- React Router v7
- Axios
- Chart.js & Recharts
- Tailwind CSS
- Lucide React Icons

### Backend
- Node.js & Express
- TypeScript
- Prisma ORM
- PostgreSQL
- Razorpay (Payment Gateway)

## 📝 License

ISC

## 👥 Contributors

- Aarushi2313


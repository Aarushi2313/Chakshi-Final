# Backend - Chakshi Legal Management System

Backend services for the Chakshi Legal Management System.

## 📁 Structure

```
backend/
├── lawAgent/           # Primary TypeScript backend service
│   ├── src/           # TypeScript source code
│   ├── prisma/        # Database schema and migrations
│   ├── docker/        # Docker configuration
│   ├── scripts/       # Utility scripts
│   └── package.json   # Dependencies
│
└── server/            # Express.js payment server
    ├── routes/        # API routes
    ├── middleware/    # Express middleware
    ├── utils/         # Utility functions
    └── index.js       # Entry point
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL
- npm or yarn

### lawAgent Service (Primary Backend)

```bash
cd backend/lawAgent

# Install dependencies
npm install

# Setup database
npm run migrate
npm run seed

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Payment Server

```bash
cd backend/server

# Install dependencies
npm install

# Start server
node index.js
```

## 🛠 Tech Stack

### lawAgent
- **TypeScript** - Type safety
- **Express.js** - Web framework
- **Prisma ORM** - Database toolkit
- **Supabase** - Backend-as-a-Service
- **PostgreSQL** - Database
- **JWT** - Authentication
- **Razorpay** - Payment integration
- **Winston** - Logging
- **Jest** - Testing

### Payment Server
- **Node.js** - Runtime
- **Express.js** - Web framework
- **Razorpay** - Payment gateway

## 🌐 Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/chakshi

# Supabase
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_KEY=your_supabase_service_key

# JWT
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d

# Razorpay
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Server
PORT=5000
NODE_ENV=development
```

## 📊 Database Management

### Prisma Commands (lawAgent)

```bash
cd backend/lawAgent

# Generate Prisma client
npm run db:generate

# Create migration
npm run migrate

# Deploy migrations
npm run migrate:deploy

# Seed database
npm run seed

# Open Prisma Studio (Database GUI)
npm run db:studio
```

## 🐳 Docker Support

```bash
cd backend/lawAgent

# Development
npm run docker:dev

# Production
npm run docker:prod
```

## 🧪 Testing

```bash
cd backend/lawAgent

# Run tests
npm test

# Watch mode
npm run test:watch

# Coverage
npm run test:coverage
```

## 📝 API Documentation

Once the server is running, API documentation is available at:
- Swagger UI: `http://localhost:5000/api-docs`

## 🔧 Development

### Code Quality

```bash
cd backend/lawAgent

# Lint code
npm run lint

# Fix lint errors
npm run lint:fix

# Format code
npm run format
```

## 📦 Project Structure Details

### lawAgent/src/
- `config/` - Configuration files
- `middleware/` - Express middleware (auth, validation, etc.)
- `modules/` - Feature modules
- `services/` - Business logic
- `types/` - TypeScript type definitions
- `utils/` - Helper utilities
- `server.ts` - Main server file

### server/
- `routes/` - Payment API routes
- `middleware/` - Authentication and validation
- `utils/` - Helper functions
- `index.js` - Server entry point

## 🚀 Deployment

See the deployment guides in `/setup-guides/` for:
- Production deployment
- Environment configuration
- Database setup
- Docker deployment

## 📝 Notes

- Make sure PostgreSQL is running before starting the backend
- Configure all environment variables before running
- Use Prisma Studio for easy database management
- Check logs in the console for debugging

# Backend - Chakshi

This folder contains the backend services for the Chakshi legal management system.

## Structure

### `lawagent-ts/`
TypeScript-based backend service with Prisma ORM
- `src/` - Source code
- `prisma/` - Database schema and migrations
- `docker/` - Docker configuration

### `node-payment/`
Payment integration service (Razorpay)
- `routes/` - Payment API routes
- `middleware/` - Authentication and validation
- `utils/` - Helper utilities

### `server/`
Express.js API server
- `routes/` - API routes
- `middleware/` - Express middleware
- `utils/` - Utility functions

## Getting Started

### LawAgent TypeScript Service
```bash
cd lawagent-ts
npm install
npm run dev
```

### Payment Service
```bash
cd node-payment
npm install
node index.js
```

### Express Server
```bash
cd server
npm install
node index.js
```

## Environment Variables
Configure environment variables in `.env` file at the root directory. See `.env.example` for required variables.

## Database
The `lawagent-ts` service uses Prisma ORM. To set up the database:

```bash
cd lawagent-ts
npx prisma generate
npx prisma migrate dev
```

## Docker Support
Docker configuration is available in `lawagent-ts/docker/` for containerized deployment.

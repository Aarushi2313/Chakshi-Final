# Frontend - Chakshi Legal Management System

React-based frontend application for the Chakshi Legal Management System.

## 📁 Structure

```
frontend/
├── src/
│   ├── Admin components/     # Admin dashboard components
│   ├── Admin pages/          # Admin pages
│   ├── Advocate components/  # Advocate interface components
│   ├── Advocate pages/       # Advocate pages
│   ├── Clerk components/     # Clerk interface components
│   ├── Student components/   # Student interface components
│   ├── Student pages/        # Student pages
│   ├── components/           # Shared components
│   ├── contexts/             # React contexts
│   ├── lib/                  # Utility libraries
│   ├── styles/               # Global styles
│   ├── App.js                # Main app component
│   └── index.js              # Entry point
├── public/                   # Static assets
└── package.json              # Dependencies
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm start
```

The application will open at `http://localhost:3000`

### Available Scripts

```bash
npm start       # Start development server
npm run build   # Build for production
npm test        # Run tests
```

## 🛠 Tech Stack

- **React 18** - UI library
- **React Router v7** - Routing
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **Chart.js & Recharts** - Data visualization
- **Lucide React** - Icons
- **Supabase** - Backend integration

## 🎨 Features

### User Roles
- **Admin**: Complete system management
- **Advocate**: Case management, client handling, document management
- **Clerk**: Case processing, scheduling, notifications
- **Student**: Learning resources, assignments, research tools

### Key Features
- Role-based authentication and routing
- Real-time notifications
- Document management
- Case tracking
- Analytics dashboards
- Legal research tools
- Contract comparison
- AI-powered legal assistance

## 🌐 Environment Variables

Create a `.env` file in the root directory (not in frontend folder):

```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_key
```

## 📦 Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

## 🔧 Configuration

- **Tailwind CSS**: `tailwind.config.js`
- **PostCSS**: `postcss.config.js`
- **Vercel**: `vercel.json`

## 📝 Notes

- The frontend is designed to work with the backend API
- Make sure the backend is running before starting the frontend
- Check the root README.md for complete setup instructions

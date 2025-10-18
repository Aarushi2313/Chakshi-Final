# Frontend - Chakshi

This folder contains the React frontend application for the Chakshi legal management system.

## Structure
- `src/` - React source code
  - `Admin components/` & `Admin pages/` - Admin dashboard
  - `Advocate components/` & `Advocate pages/` - Advocate interface
  - `Clerk components/` - Clerk interface
  - `Student components/` & `Student pages/` - Student interface
  - `components/` - Shared components
  - `contexts/` - React contexts
  - `lib/` - Utility libraries
  - `styles/` - Global styles
- `public/` - Static assets
- `build/` - Production build output

## Getting Started

### Install dependencies
```bash
npm install
```

### Run development server
```bash
npm start
```

### Build for production
```bash
npm run build
```

## Configuration
- Environment variables: Create a `.env` file based on `.env.example` in the root directory
- Tailwind CSS configuration: `tailwind.config.js`
- PostCSS configuration: `postcss.config.js`

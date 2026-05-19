# Getting Started

## Quick Start Guide

### 1. Prerequisites
- Node.js 18.x or higher
- MongoDB 6.0 or higher
- Git
- npm or yarn

### 2. Clone Repository
```bash
git clone https://github.com/harshatejsape07-sape/road-side-assitance.git
cd road-side-assitance
```

### 3. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env with your credentials
# Add:
# - MONGODB_URI
# - JWT_SECRET
# - STRIPE_SECRET_KEY
# - GOOGLE_MAPS_API_KEY
# - Etc.

# Start development server
npm run dev
```

**Backend runs on:** `http://localhost:5000`

### 4. Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local

# Edit .env.local with your configuration
# Add:
# - NEXT_PUBLIC_API_URL=http://localhost:5000
# - NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
# - Etc.

# Start development server
npm run dev
```

**Frontend runs on:** `http://localhost:3000`

### 5. Database Setup

```bash
# Option 1: Local MongoDB
mongosh

# Option 2: Docker MongoDB
docker run -d -p 27017:27017 --name mongodb -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=password mongo:latest

# Seed database (from backend directory)
cd backend
npm run seed
```

### 6. Test Login Credentials

After running seed script:

**Customer:**
- Email: `customer1@example.com`
- Password: `Password@123`

**Mechanic:**
- Email: `mechanic1@example.com`
- Password: `Password@123`

## Using Docker Compose

```bash
# Build and start all services
docker-compose up --build

# Services will be available at:
# - Frontend: http://localhost:3000
# - Backend API: http://localhost:5000
# - MongoDB: localhost:27017
# - Adminer: http://localhost:8080

# Stop services
docker-compose down

# View logs
docker-compose logs -f backend
docker-compose logs -f frontend
```

## Environment Variables Required

### Backend (.env)
```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/roadside-assistance
JWT_SECRET=your_jwt_secret_key_here_min_32_chars
CORS_ORIGIN=http://localhost:3000
GOOGLE_MAPS_API_KEY=your_key
STRIPE_SECRET_KEY=your_key
CLOUDINARY_CLOUD_NAME=your_name
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_key
```

## Verify Installation

1. **Check Backend Health**
   ```bash
   curl http://localhost:5000/health
   ```
   Expected response:
   ```json
   {
     "status": "OK",
     "timestamp": "2026-05-19T...",
     "uptime": 12.345
   }
   ```

2. **Check API**
   ```bash
   curl http://localhost:5000/api/v1
   ```

3. **Frontend should load at**
   ```
   http://localhost:3000
   ```

## Available Scripts

### Backend
```bash
npm run dev          # Start development server
npm run build        # Build TypeScript
npm start            # Run production build
npm test             # Run tests
npm run lint         # Lint code
npm run seed         # Seed database
```

### Frontend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm test             # Run tests
npm run lint         # Lint code
```

## Project Structure

```
road-side-assitance/
├── backend/
│   ├── src/
│   │   ├── config/       # Configuration
│   │   ├── controllers/  # Route handlers
│   │   ├── middleware/   # Express middleware
│   │   ├── models/       # MongoDB schemas
│   │   ├── routes/       # API routes
│   │   ├── services/     # Business logic
│   │   ├── types/        # TypeScript types
│   │   ├── utils/        # Utilities
│   │   └── index.ts      # Entry point
│   ├── .env.example
│   ├── tsconfig.json
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── app/          # Next.js app directory
│   │   ├── components/   # React components
│   │   ├── hooks/        # Custom hooks
│   │   ├── lib/          # Utilities
│   │   ├── store/        # Zustand stores
│   │   ├── styles/       # Global styles
│   │   └── types/        # TypeScript types
│   ├── .env.example
│   ├── tsconfig.json
│   └── package.json
├── docker-compose.yml
├── README.md
└── ENVIRONMENT_SETUP.md
```

## Troubleshooting

### MongoDB Connection Error
```bash
# Check if MongoDB is running
mongosh

# Start MongoDB (if using Docker)
docker start mongodb

# Check connection string in .env
```

### Port Already in Use
```bash
# Change port in .env
PORT=5001

# For frontend, check next.config.js
```

### CORS Errors
- Check `CORS_ORIGIN` in backend `.env`
- Ensure frontend URL matches exactly
- Clear browser cache and restart

### Module Not Found Errors
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## Next Steps

1. Read [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for API endpoints
2. Read [ENVIRONMENT_SETUP.md](./ENVIRONMENT_SETUP.md) for service integration
3. Check [README.md](./README.md) for project overview
4. Start implementing features based on the roadmap

## Support

For issues:
1. Check existing GitHub issues
2. Create a new issue with details
3. Include error messages and steps to reproduce
4. Contact: support@roadsideassistance.com

---

Happy coding! 🚀

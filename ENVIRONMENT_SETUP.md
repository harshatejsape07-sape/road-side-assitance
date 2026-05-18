# 🔧 Environment Setup Guide

Complete guide for configuring the Road-Side Assistance Platform.

## Backend Configuration

### Prerequisites
- Node.js 18.x or higher
- MongoDB 6.0 or higher
- Cloudinary account (for image uploads)
- Stripe or Razorpay account (for payments)
- Google Maps API key (for location services)

### Backend .env File

Create `backend/.env` file with the following variables:

```env
# Server Configuration
NODE_ENV=development
PORT=5000
HOST=localhost

# Database
MONGODB_URI=mongodb://localhost:27017/roadside-assistance
MONGODB_DB_NAME=roadside-assistance

# JWT Authentication
JWT_SECRET=your_jwt_secret_key_here_min_32_chars
JWT_REFRESH_SECRET=your_refresh_secret_key_here_min_32_chars
JWT_EXPIRE=7d
JWT_REFRESH_EXPIRE=30d

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
EMAIL_FROM=noreply@roadsideassistance.com

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Payment Integration
STRIPE_SECRET_KEY=sk_test_your_stripe_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret

# Google Maps
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
GOOGLE_GEOCODING_API_KEY=your_geocoding_key

# AWS Configuration (Optional - for production)
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_S3_BUCKET=your_bucket_name

# Socket.IO
SOCKET_TIMEOUT=60000
MAX_CONNECTIONS=1000

# Security
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX_REQUESTS=100
BCRYPT_ROUNDS=10

# API Configuration
API_VERSION=v1
API_PREFIX=/api/v1

# CORS Configuration
CORS_ORIGIN=http://localhost:3000,http://localhost:3001
ALLOWED_ORIGINS=localhost:3000,localhost:3001

# Logging
LOG_LEVEL=debug
LOG_FORMAT=json

# OTP Configuration
OTP_EXPIRY=600
OTP_ATTEMPTS=3

# File Upload
MAX_FILE_SIZE=5242880
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/webp,application/pdf
```

## Frontend Configuration

### Frontend .env.local File

Create `frontend/.env.local` file with the following variables:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_API_VERSION=v1

# Maps Configuration
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
NEXT_PUBLIC_MAP_DEFAULT_LAT=40.7128
NEXT_PUBLIC_MAP_DEFAULT_LNG=-74.0060

# Payment Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key

# Socket.IO
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000

# Environment
NODE_ENV=development

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=your_google_analytics_id

# Feature Flags
NEXT_PUBLIC_ENABLE_BETA_FEATURES=false
NEXT_PUBLIC_ENABLE_AI_CHATBOT=true
NEXT_PUBLIC_ENABLE_PUSH_NOTIFICATIONS=true

# App Configuration
NEXT_PUBLIC_APP_NAME=Road-Side Assistance
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SUPPORT_EMAIL=support@roadsideassistance.com

# Image Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
```

## Docker Setup

### Docker Compose Configuration

If using Docker, the `docker-compose.yml` handles environment variable injection.

**Run with Docker:**
```bash
docker-compose up --build
```

**Services Started:**
- Backend API: `http://localhost:5000`
- Frontend: `http://localhost:3000`
- MongoDB: `localhost:27017`
- Adminer (DB UI): `http://localhost:8080` (optional)

## Service Integrations

### Google Maps API Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable APIs:
   - Maps JavaScript API
   - Places API
   - Geocoding API
   - Distance Matrix API
4. Create API key credentials
5. Add to both backend and frontend `.env` files

### Stripe Integration

1. Create account at [Stripe](https://stripe.com)
2. Get API keys from Dashboard
3. Add to `backend/.env`:
   - `STRIPE_SECRET_KEY`
   - `STRIPE_PUBLISHABLE_KEY`
4. Add publishable key to `frontend/.env.local`

### Razorpay Integration

1. Create account at [Razorpay](https://razorpay.com)
2. Get API keys from Settings
3. Add to `backend/.env`:
   - `RAZORPAY_KEY_ID`
   - `RAZORPAY_KEY_SECRET`
4. Add to `frontend/.env.local`:
   - `NEXT_PUBLIC_RAZORPAY_KEY_ID`

### Cloudinary Setup

1. Create account at [Cloudinary](https://cloudinary.com)
2. Get credentials from Dashboard
3. Add to `backend/.env`:
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`
4. Add to `frontend/.env.local`:
   - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`

### Email Configuration (Gmail)

1. Enable 2FA on your Gmail account
2. Generate App Password: https://myaccount.google.com/apppasswords
3. Add to `backend/.env`:
   - `SMTP_USER` = your email
   - `SMTP_PASS` = generated app password

## Database Setup

### Local MongoDB Setup

**Option 1: Using MongoDB Community Edition**
```bash
# macOS with Homebrew
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community

# Linux (Ubuntu)
sudo apt-get install -y mongodb

# Windows
# Download from https://www.mongodb.com/try/download/community
```

**Option 2: Using Docker**
```bash
docker run -d \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=password \
  --name mongodb \
  mongo:latest
```

### Database Initialization

After MongoDB is running:

```bash
cd backend
npm run seed  # Run seed script to populate initial data
```

## Development vs Production

### Development Environment
```env
NODE_ENV=development
LOG_LEVEL=debug
RATE_LIMIT_MAX_REQUESTS=1000
```

### Production Environment
```env
NODE_ENV=production
LOG_LEVEL=error
RATE_LIMIT_MAX_REQUESTS=100
JWT_EXPIRE=1d
MONGODB_URI=your_production_mongodb_uri
```

## Verification Checklist

- [ ] Backend `.env` file created with all required variables
- [ ] Frontend `.env.local` file created with all required variables
- [ ] MongoDB is running and accessible
- [ ] Google Maps API key is valid
- [ ] Payment gateway credentials are correct
- [ ] Cloudinary credentials are configured
- [ ] Email SMTP credentials work
- [ ] JWT secrets are strong (minimum 32 characters)
- [ ] CORS origins match your frontend URL
- [ ] API rate limits are set appropriately

## Troubleshooting

### MongoDB Connection Issues
```bash
# Check if MongoDB is running
mongosh

# If using Docker
docker logs mongodb
```

### API Connection Issues
```bash
# Check if backend is running
curl http://localhost:5000/api/health

# Check logs
npm run logs
```

### Environment Variable Not Loaded
- Restart development server: `npm run dev`
- Check `.env` file syntax (no spaces around `=`)
- Ensure variables are properly exported in code

### CORS Errors
- Check `CORS_ORIGIN` in backend `.env`
- Ensure frontend URL matches exactly
- Add trailing slash if needed

## Security Best Practices

1. **Never commit `.env` files** to git
2. Use `.env.example` as template (without sensitive values)
3. Rotate secrets regularly in production
4. Use strong, unique JWT secrets
5. Store secrets in secure vault (e.g., HashiCorp Vault)
6. Use environment-specific configurations
7. Audit API keys and revoke unused ones
8. Enable 2FA on all service accounts

## Production Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for production deployment instructions.

---

For issues or questions, please open a GitHub issue or contact support.

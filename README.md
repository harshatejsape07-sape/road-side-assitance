# 🚗 Road-Side Assistance Platform

A comprehensive emergency roadside assistance platform connecting vehicle owners with verified nearby mechanics and service providers. Featuring real-time tracking, live chat, secure payments, and emergency support 24/7.

## 🌟 Features

### Core Features
- **Real-time Mechanic Discovery** - Find verified mechanics nearby instantly
- **Emergency SOS System** - One-tap emergency assistance request
- **Live Tracking** - Real-time location tracking of mechanics
- **Verified Providers** - All service providers are verified and rated
- **Temporary Vehicle Service** - Book replacement vehicles during repairs
- **Secure Payments** - Stripe & Razorpay integration
- **User Reviews & Ratings** - Community-driven quality assurance
- **Admin Dashboard** - Comprehensive management system

### Supported Issues
- Flat or punctured tyres
- Battery failure
- Engine overheating
- Fuel issues
- Starter or ignition problems
- Brake failures
- Clutch or gearbox issues
- Electrical faults
- Accident-related damage
- Locked keys inside vehicle

## 🏗️ Technology Stack

### Frontend
- **Framework**: Next.js 15 with React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS + ShadCN UI
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod
- **State**: Zustand
- **Maps**: Google Maps API / OpenStreetMap
- **HTTP**: Axios

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB + Mongoose
- **Auth**: JWT + bcrypt
- **Real-time**: Socket.IO
- **Files**: Cloudinary
- **Payments**: Stripe & Razorpay
- **API Docs**: Swagger/OpenAPI

### DevOps
- **Containerization**: Docker & Docker Compose
- **Environment Config**: dotenv
- **API Architecture**: REST

## 📋 User Roles

### 1. Customer
- Register/Login
- Add vehicle details
- Request roadside assistance
- Share live location
- Track mechanic in real-time
- Chat with mechanic
- Make secure payments
- Rate and review services
- Book temporary replacement vehicle

### 2. Mechanic / Service Provider
- Register with verification documents
- Update availability status
- Accept/reject requests
- Navigate to customer location
- Update repair progress
- Upload repair proof/images
- Track earnings

### 3. Temporary Vehicle Provider
- Add rental vehicles
- Manage availability
- Approve vehicle requests
- Track rental history

### 4. Admin
- Manage all users
- Verify mechanics and providers
- View analytics and reports
- Handle customer complaints
- Monitor active requests
- Manage payments

## 🚀 Quick Start

### Prerequisites
- Node.js 18.x or higher
- MongoDB 6.0 or higher
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/harshatejsape07-sape/road-side-assitance.git
cd road-side-assitance
```

2. **Setup Backend**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your credentials
npm run dev
```

3. **Setup Frontend**
```bash
cd ../frontend
npm install
cp .env.example .env.local
# Edit .env.local with your configuration
npm run dev
```

### Using Docker Compose

```bash
docker-compose up --build
```

Access:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- MongoDB: localhost:27017
- Adminer: http://localhost:8080

## 📁 Project Structure

```
road-side-assitance/
├── backend/
│   ├── src/
│   │   ├── config/          # Configuration files
│   │   ├── middleware/      # Express middleware
│   │   ├── models/          # MongoDB schemas
│   │   ├── controllers/     # Route handlers
│   │   ├── services/        # Business logic
│   │   ├── routes/          # API routes
│   │   ├── types/           # TypeScript types
│   │   ├── utils/           # Helper functions
│   │   └── index.ts         # Entry point
│   ├── .env.example
│   ├── tsconfig.json
│   ├── Dockerfile
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── app/             # Next.js app directory
│   │   ├── components/      # React components
│   │   ├── pages/           # Page routes (if using pages router)
│   │   ├── hooks/           # Custom React hooks
│   │   ├── store/           # Zustand stores
│   │   ├── lib/             # Utilities and helpers
│   │   ├── types/           # TypeScript interfaces
│   │   └── styles/          # Global styles
│   ├── public/              # Static assets
│   ├── .env.example
│   ├── tsconfig.json
│   ├── Dockerfile
│   ├── next.config.js
│   └── package.json
│
├── docker-compose.yml
├── ENVIRONMENT_SETUP.md
├── README.md
└── LICENSE
```

## 📚 API Documentation

See [ENVIRONMENT_SETUP.md](./ENVIRONMENT_SETUP.md) for detailed configuration instructions.

API endpoints will include:
- `/api/v1/auth` - Authentication
- `/api/v1/users` - User management
- `/api/v1/requests` - Assistance requests
- `/api/v1/mechanics` - Mechanic data
- `/api/v1/vehicles` - Vehicle management
- `/api/v1/payments` - Payment processing
- `/api/v1/reviews` - Ratings and reviews

## 🔐 Security Features

- JWT-based authentication
- Bcrypt password hashing
- CORS configuration
- Rate limiting
- Helmet security headers
- Input validation (Joi/Zod)
- Protected API routes
- Role-based authorization
- Secure payment integration

## 🗺️ Location Features

- Real-time GPS location tracking
- Nearby mechanic search using geolocation
- Distance calculation
- Estimated arrival time (ETA)
- Live movement updates via Socket.IO
- Interactive maps with markers

## 💳 Payment Integration

- Stripe payment gateway
- Razorpay integration
- Secure payment processing
- Invoice generation
- Refund handling
- Payment status tracking

## 📊 Admin Analytics

- Total assistance requests
- Active mechanics count
- Revenue charts
- User growth metrics
- Issue category breakdown
- Service ratings analysis
- Request completion rates

## 🧪 Testing

```bash
# Backend
cd backend
npm test
npm run test:watch
npm run test:cov

# Frontend
cd frontend
npm test
npm run test:watch
```

## 🎨 Design

UI inspired by:
- Uber (emergency response, tracking)
- Rapido (quick service booking)
- Urban Company (service provider quality)

Features:
- Modern, clean design
- Dark/light mode support
- Emergency-focused color palette (red accents)
- Responsive mobile-first design
- Smooth animations and transitions
- Interactive maps

## 🚀 Bonus Features

- AI-based mechanic recommendation
- Fraud detection system
- Real-time traffic ETA
- Voice emergency assistance
- Predictive breakdown analysis
- Multi-language support
- PWA capabilities
- Offline fallback

## 📖 Environment Setup

See [ENVIRONMENT_SETUP.md](./ENVIRONMENT_SETUP.md) for:
- Detailed configuration guide
- Service integration instructions
- Database setup
- API credentials setup
- Production deployment guide

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see LICENSE file for details.

## 📧 Support

For issues, questions, or suggestions:
- Open a GitHub issue
- Email: support@roadsideassistance.com
- Contact: [Your Contact Info]

## 🙏 Acknowledgments

- ShadCN UI for component library
- Tailwind CSS for styling
- MongoDB for database
- Stripe & Razorpay for payment processing
- Google Maps API for location services

---

**Made with ❤️ for safer roads**

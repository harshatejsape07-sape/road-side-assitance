# API Documentation

## Base URL
```
http://localhost:5000/api/v1
```

## Authentication

All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <token>
```

## Endpoints

### Authentication

#### Register
```
POST /auth/register
Body: {
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
  confirmPassword: string
  role?: 'customer' | 'mechanic' | 'temporary_vehicle_provider'
}
Response: {
  success: boolean
  message: string
  data: {
    user: User
    tokens: { accessToken, refreshToken }
  }
}
```

#### Login
```
POST /auth/login
Body: {
  email: string
  password: string
}
Response: {
  success: boolean
  message: string
  data: {
    user: User
    tokens: { accessToken, refreshToken }
  }
}
```

#### Refresh Token
```
POST /auth/refresh-token
Body: {
  refreshToken: string
}
Response: {
  success: boolean
  message: string
  data: { accessToken, refreshToken }
}
```

#### Logout
```
POST /auth/logout
Authorization: Bearer <token>
Response: {
  success: boolean
  message: string
}
```

### Mechanics

#### Get Nearby Mechanics
```
GET /mechanics/nearby?lat=40.7128&lng=-74.0060&radius=10
Authorization: Bearer <token>
```

#### Get Available Mechanics
```
GET /mechanics/available
Authorization: Bearer <token>
```

#### Accept Request
```
POST /mechanics/:id/accept
Authorization: Bearer <token>
Body: { requestId: string }
```

### Vehicles

#### Get User Vehicles
```
GET /vehicles
Authorization: Bearer <token>
```

#### Create Vehicle
```
POST /vehicles
Authorization: Bearer <token>
Body: {
  make: string
  model: string
  year: number
  licensePlate: string
  registrationNumber: string
  color?: string
  fuelType: 'petrol' | 'diesel' | 'hybrid' | 'electric'
}
```

### Assistance Requests

#### Create Request
```
POST /requests
Authorization: Bearer <token>
Body: {
  vehicleId: string
  issueCategory: string
  description: string
  location: {
    lat: number
    lng: number
    address: string
  }
}
```

#### Get Request Details
```
GET /requests/:id
Authorization: Bearer <token>
```

#### Update Request Status
```
PUT /requests/:id/status
Authorization: Bearer <token>
Body: {
  status: 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled' | 'failed'
}
```

### Payments

#### Create Payment
```
POST /payments
Authorization: Bearer <token>
Body: {
  requestId: string
  amount: number
  paymentMethod: 'stripe' | 'razorpay'
}
```

#### Get Payment Details
```
GET /payments/:id
Authorization: Bearer <token>
```

### Reviews

#### Create Review
```
POST /reviews
Authorization: Bearer <token>
Body: {
  requestId: string
  mechanicId: string
  rating: number (1-5)
  comment: string
}
```

#### Get Mechanic Reviews
```
GET /reviews/mechanic/:mechanicId
```

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Validation failed",
  "error": [
    {
      "field": "email",
      "message": "Please provide a valid email"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "No token provided"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "Insufficient permissions"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Route not found",
  "path": "/api/v1/unknown",
  "method": "GET"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal Server Error"
}
```

## Response Codes

- `200` - OK
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `429` - Too Many Requests
- `500` - Internal Server Error

## Rate Limiting

- Default: 100 requests per 15 minutes
- Auth endpoints: 5 login attempts per 15 minutes
- Headers returned:
  - `X-RateLimit-Limit`: Total requests allowed
  - `X-RateLimit-Remaining`: Remaining requests
  - `X-RateLimit-Reset`: Reset time (Unix timestamp)

## Data Models

### User
```typescript
{
  _id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  role: 'customer' | 'mechanic' | 'temporary_vehicle_provider' | 'admin'
  profileImage?: string
  isEmailVerified: boolean
  isPhoneVerified: boolean
  isBlocked: boolean
  verificationStatus: 'pending' | 'approved' | 'rejected'
  lastLogin?: Date
  createdAt: Date
  updatedAt: Date
}
```

### Vehicle
```typescript
{
  _id: string
  userId: string
  make: string
  model: string
  year: number
  licensePlate: string
  registrationNumber: string
  color?: string
  fuelType: 'petrol' | 'diesel' | 'hybrid' | 'electric'
  status: 'available' | 'in_use' | 'maintenance'
  createdAt: Date
  updatedAt: Date
}
```

### AssistanceRequest
```typescript
{
  _id: string
  customerId: string
  vehicleId: string
  issueCategory: string
  description: string
  status: 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled' | 'failed'
  location: {
    type: 'Point'
    coordinates: [number, number]
    address: string
  }
  assignedMechanicId?: string
  estimatedArrivalTime?: number
  createdAt: Date
  updatedAt: Date
}
```

### Payment
```typescript
{
  _id: string
  requestId: string
  userId: string
  amount: number
  currency: string
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded'
  paymentMethod: 'stripe' | 'razorpay'
  transactionId: string
  createdAt: Date
  updatedAt: Date
}
```

---

For more information, visit the GitHub repository or contact support@roadsideassistance.com

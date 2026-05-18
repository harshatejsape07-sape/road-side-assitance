import { ReactNode } from 'react';

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: 'customer' | 'mechanic' | 'temporary_vehicle_provider' | 'admin';
  profileImage?: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  isBlocked: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IVehicle {
  id: string;
  userId: string;
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  registrationNumber: string;
  color?: string;
  fuelType: string;
  createdAt: string;
  updatedAt: string;
}

export interface IAssistanceRequest {
  id: string;
  customerId: string;
  vehicleId: string;
  issueCategory: string;
  description: string;
  status: 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled' | 'failed';
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  assignedMechanicId?: string;
  estimatedArrivalTime?: number;
  createdAt: string;
  updatedAt: string;
}

export interface IPayment {
  id: string;
  requestId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded';
  paymentMethod: 'stripe' | 'razorpay';
  transactionId: string;
  createdAt: string;
  updatedAt: string;
}

export interface IReview {
  id: string;
  requestId: string;
  userId: string;
  mechanicId: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}

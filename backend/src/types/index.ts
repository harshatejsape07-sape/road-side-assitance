// User roles
export enum UserRole {
  CUSTOMER = 'customer',
  MECHANIC = 'mechanic',
  TEMPORARY_VEHICLE_PROVIDER = 'temporary_vehicle_provider',
  ADMIN = 'admin',
}

// Request status
export enum RequestStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  FAILED = 'failed',
}

// Payment status
export enum PaymentStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
  REFUNDED = 'refunded',
}

// Verification status
export enum VerificationStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

// Issue categories
export enum IssueCategory {
  FLAT_TYRE = 'flat_tyre',
  BATTERY_FAILURE = 'battery_failure',
  ENGINE_OVERHEATING = 'engine_overheating',
  FUEL_ISSUES = 'fuel_issues',
  STARTER_IGNITION = 'starter_ignition',
  BRAKE_FAILURE = 'brake_failure',
  CLUTCH_GEARBOX = 'clutch_gearbox',
  ELECTRICAL_FAULT = 'electrical_fault',
  ACCIDENT_DAMAGE = 'accident_damage',
  LOCKED_KEYS = 'locked_keys',
  OTHER = 'other',
}

// Vehicle status
export enum VehicleStatus {
  AVAILABLE = 'available',
  IN_USE = 'in_use',
  MAINTENANCE = 'maintenance',
}

// JWT payload
export interface JwtPayload {
  id: string;
  email: string;
  role: UserRole;
  iat?: number;
  exp?: number;
}

// API Response
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  timestamp?: string;
}

// Pagination
export interface PaginationQuery {
  page?: number;
  limit?: number;
  sort?: string;
  search?: string;
}

// Location
export interface Location {
  type: 'Point';
  coordinates: [number, number]; // [longitude, latitude]
}

export interface GeolocationData {
  lat: number;
  lng: number;
  accuracy?: number;
  timestamp?: number;
}

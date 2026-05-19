import mongoose, { Document, Schema } from 'mongoose';
import { VehicleStatus } from '@/types';

interface IVehicle extends Document {
  userId: mongoose.Types.ObjectId;
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  registrationNumber: string;
  color?: string;
  fuelType: string;
  status: VehicleStatus;
  createdAt: Date;
  updatedAt: Date;
}

const vehicleSchema = new Schema<IVehicle>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
    },
    make: {
      type: String,
      required: [true, 'Vehicle make is required'],
      trim: true,
    },
    model: {
      type: String,
      required: [true, 'Vehicle model is required'],
      trim: true,
    },
    year: {
      type: Number,
      required: [true, 'Vehicle year is required'],
      min: 1900,
      max: new Date().getFullYear() + 1,
    },
    licensePlate: {
      type: String,
      required: [true, 'License plate is required'],
      unique: true,
      uppercase: true,
      trim: true,
    },
    registrationNumber: {
      type: String,
      required: [true, 'Registration number is required'],
      unique: true,
      uppercase: true,
      trim: true,
    },
    color: String,
    fuelType: {
      type: String,
      enum: ['petrol', 'diesel', 'hybrid', 'electric'],
      required: [true, 'Fuel type is required'],
    },
    status: {
      type: String,
      enum: Object.values(VehicleStatus),
      default: VehicleStatus.AVAILABLE,
    },
  },
  {
    timestamps: true,
  }
);

vehicleSchema.index({ userId: 1 });
vehicleSchema.index({ licensePlate: 1 });

export const Vehicle = mongoose.model<IVehicle>('Vehicle', vehicleSchema);
export type { IVehicle };

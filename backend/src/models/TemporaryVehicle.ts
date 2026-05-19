import mongoose, { Document, Schema } from 'mongoose';
import { VehicleStatus } from '@/types';

interface ITemporaryVehicle extends Document {
  providerId: mongoose.Types.ObjectId;
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  registrationNumber: string;
  status: VehicleStatus;
  rentalPrice: number;
  available: boolean;
  images: string[];
  features: string[];
  createdAt: Date;
  updatedAt: Date;
}

const temporaryVehicleSchema = new Schema<ITemporaryVehicle>(
  {
    providerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Provider ID is required'],
    },
    make: {
      type: String,
      required: [true, 'Vehicle make is required'],
    },
    model: {
      type: String,
      required: [true, 'Vehicle model is required'],
    },
    year: {
      type: Number,
      required: [true, 'Vehicle year is required'],
    },
    licensePlate: {
      type: String,
      required: [true, 'License plate is required'],
      unique: true,
    },
    registrationNumber: {
      type: String,
      required: [true, 'Registration number is required'],
      unique: true,
    },
    status: {
      type: String,
      enum: Object.values(VehicleStatus),
      default: VehicleStatus.AVAILABLE,
    },
    rentalPrice: {
      type: Number,
      required: [true, 'Rental price is required'],
      min: 0,
    },
    available: {
      type: Boolean,
      default: true,
    },
    images: {
      type: [String],
      default: [],
    },
    features: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

temporaryVehicleSchema.index({ providerId: 1, available: 1 });

export const TemporaryVehicle = mongoose.model<ITemporaryVehicle>(
  'TemporaryVehicle',
  temporaryVehicleSchema
);
export type { ITemporaryVehicle };

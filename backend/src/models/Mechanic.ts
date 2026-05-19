import mongoose, { Document, Schema } from 'mongoose';
import { VerificationStatus } from '@/types';

interface IMechanic extends Document {
  userId: mongoose.Types.ObjectId;
  licenseNumber: string;
  certifications: string[];
  yearsOfExperience: number;
  specializations: string[];
  verificationStatus: VerificationStatus;
  averageRating: number;
  totalJobs: number;
  responseTime: number; // in minutes
  isAvailable: boolean;
  documents: {
    license: string;
    insurance: string;
    certification: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const mechanicSchema = new Schema<IMechanic>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
      unique: true,
    },
    licenseNumber: {
      type: String,
      required: [true, 'License number is required'],
      unique: true,
    },
    certifications: {
      type: [String],
      default: [],
    },
    yearsOfExperience: {
      type: Number,
      required: [true, 'Years of experience is required'],
      min: 0,
    },
    specializations: {
      type: [String],
      default: [],
    },
    verificationStatus: {
      type: String,
      enum: Object.values(VerificationStatus),
      default: VerificationStatus.PENDING,
      index: true,
    },
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    totalJobs: {
      type: Number,
      default: 0,
    },
    responseTime: {
      type: Number,
      default: 30,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    documents: {
      license: String,
      insurance: String,
      certification: String,
    },
  },
  {
    timestamps: true,
  }
);

mechanicSchema.index({ verificationStatus: 1, isAvailable: 1 });

export const Mechanic = mongoose.model<IMechanic>('Mechanic', mechanicSchema);
export type { IMechanic };

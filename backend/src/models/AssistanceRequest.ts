import mongoose, { Document, Schema } from 'mongoose';
import { RequestStatus, IssueCategory, Location } from '@/types';

interface IAssistanceRequest extends Document {
  customerId: mongoose.Types.ObjectId;
  vehicleId: mongoose.Types.ObjectId;
  issueCategory: IssueCategory;
  description: string;
  status: RequestStatus;
  location: Location & { address: string };
  assignedMechanicId?: mongoose.Types.ObjectId;
  estimatedArrivalTime?: number;
  actualArrivalTime?: Date;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const assistanceRequestSchema = new Schema<IAssistanceRequest>(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Customer ID is required'],
    },
    vehicleId: {
      type: Schema.Types.ObjectId,
      ref: 'Vehicle',
      required: [true, 'Vehicle ID is required'],
    },
    issueCategory: {
      type: String,
      enum: Object.values(IssueCategory),
      required: [true, 'Issue category is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      minlength: 10,
      maxlength: 1000,
    },
    status: {
      type: String,
      enum: Object.values(RequestStatus),
      default: RequestStatus.PENDING,
      index: true,
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: [true, 'Location coordinates are required'],
        validate: {
          validator: function (v: number[]) {
            return v.length === 2 && v[0] >= -180 && v[0] <= 180 && v[1] >= -90 && v[1] <= 90;
          },
          message: 'Invalid coordinates',
        },
      },
      address: {
        type: String,
        required: [true, 'Address is required'],
      },
    },
    assignedMechanicId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    estimatedArrivalTime: Number,
    actualArrivalTime: Date,
    completedAt: Date,
  },
  {
    timestamps: true,
  }
);

// Create 2dsphere index for geospatial queries
assistanceRequestSchema.index({ 'location.coordinates': '2dsphere' });
assistanceRequestSchema.index({ customerId: 1, createdAt: -1 });
assistanceRequestSchema.index({ assignedMechanicId: 1, status: 1 });

export const AssistanceRequest = mongoose.model<IAssistanceRequest>(
  'AssistanceRequest',
  assistanceRequestSchema
);
export type { IAssistanceRequest };

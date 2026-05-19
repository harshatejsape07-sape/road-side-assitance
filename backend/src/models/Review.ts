import mongoose, { Document, Schema } from 'mongoose';

interface IReview extends Document {
  requestId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  mechanicId: mongoose.Types.ObjectId;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new Schema<IReview>(
  {
    requestId: {
      type: Schema.Types.ObjectId,
      ref: 'AssistanceRequest',
      required: [true, 'Request ID is required'],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
    },
    mechanicId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Mechanic ID is required'],
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: [true, 'Comment is required'],
      minlength: 10,
      maxlength: 500,
    },
  },
  {
    timestamps: true,
  }
);

reviewSchema.index({ mechanicId: 1 });
reviewSchema.index({ requestId: 1 });
reviewSchema.index({ userId: 1, createdAt: -1 });

export const Review = mongoose.model<IReview>('Review', reviewSchema);
export type { IReview };

import mongoose, { Schema, models, Model } from "mongoose";

export interface ISubscription {
  _id?: string;
  icon: string;
  name: string;
  renewalCycle: "yearly" | "quarterly" | "monthly";
  price: number;
  currency: string;
  nextRenewalDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

const SubscriptionSchema = new Schema<ISubscription>(
  {
    icon: {
      type: String,
      required: [true, "Icon is required"],
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    renewalCycle: {
      type: String,
      required: [true, "Renewal cycle is required"],
      enum: {
        values: ["yearly", "quarterly", "monthly"],
        message: "{VALUE} is not a valid renewal cycle",
      },
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price must be non-negative"],
    },
    currency: {
      type: String,
      required: [true, "Currency is required"],
      trim: true,
      uppercase: true,
    },
    nextRenewalDate: {
      type: Date,
      required: [true, "Next renewal date is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Subscription: Model<ISubscription> =
  models.Subscription || mongoose.model<ISubscription>("Subscription", SubscriptionSchema);

export default Subscription;

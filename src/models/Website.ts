import mongoose from "mongoose";

const websiteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    url: { type: String, required: true },
    timeOfCheckUrl: { type: Number, default: 30 },
    alertMethod: {
      type: String,
      enum: ["email", "telegram"],
      default: "telegram",
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);
export const Website = mongoose.model('Website',websiteSchema)
import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    chatId: {
      type: String,
      unique: true,
      required: true
    },

  },

  { timestamps: true },
);
export const User = mongoose.model('User', userSchema)
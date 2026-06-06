import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    chatId: {
      type: String,
      unique: true,
      sparse: true, // مهم
    },

  },

  { timestamps: true },
);
export const User = mongoose.model('User', userSchema)
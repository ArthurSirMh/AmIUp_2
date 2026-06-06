import mongoose from "mongoose";
import { env } from "./env";
export const connectDB = async () => {
  try {
    await mongoose.connect(env.MONGO_URL);
    console.log('database connected')
  } catch (err) {
    console.log(err)
  }
};

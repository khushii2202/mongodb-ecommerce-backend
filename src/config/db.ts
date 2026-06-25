import mongoose from "mongoose";
import { ENV } from "./config";

export const connectDB = async (): Promise<void> => {
  console.log("ENV.MONGO_URI =", ENV.MONGO_URI);
  try {
    await mongoose.connect(ENV.MONGO_URI as string);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

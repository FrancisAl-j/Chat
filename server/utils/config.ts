import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL!);
    console.log("Connected to database.");
  } catch (error) {
    console.log("Failed to connect to database.");
  }
};

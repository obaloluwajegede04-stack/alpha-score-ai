import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  throw new Error("MONGO_URI environment variable is required.");
}

mongoose.set("strictQuery", true);

export async function connectDb() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected.");
  } catch (error) {
    console.error("MongoDB connection failed.", error);
    process.exit(1);
  }
}

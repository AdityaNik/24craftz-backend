import express from "express";
import cors from "cors";
import userRouter from "./routes/userRoutes";
import authRouter from "./routes/auth";
import mongoose from "mongoose";
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", userRouter);
app.use("/auth", authRouter);

const port = process.env.PORT || 5000;

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/24craftz-backend",
      {
        dbName: "24Cratz",
      },
    );
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

// Connect to database
connectDB();

app.listen(3000, "0.0.0.0", () => {
  console.log(`Backend started on port ${port}`);
});

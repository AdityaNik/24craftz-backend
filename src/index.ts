import express from "express";
import cors from "cors";
import userRouter from "./routes/userRoutes";
import talentAuthRouter from "./routes/talentAuth";
import industryAuthRouter from "./routes/industryProfessionalAuth";
import talentSideRouter from "./routes/talentSideRoutes";
import industrySideRouter from "./routes/industrySideRoutes";
import mongoose from "mongoose";
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", userRouter);
app.use("/talentAuth", talentAuthRouter);
app.use("/industryAuth", industryAuthRouter);
app.use("/talent", talentSideRouter);
app.use("/industry", industrySideRouter);

const port = process.env.PORT || 3000;

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

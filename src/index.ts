import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import uploadRoute from "./routes/uploadRoute";
import campaignRoutes from "./routes/campaigns";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoute);
app.use("/api/campaigns", campaignRoutes);

// MongoDB connect
mongoose.connect(process.env.MONGO_URI!)
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
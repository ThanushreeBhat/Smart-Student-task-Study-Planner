import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/smartplanner");

app.use("/", authRoutes);
app.use("/", taskRoutes);

app.listen(5000, () => console.log("Server running"));
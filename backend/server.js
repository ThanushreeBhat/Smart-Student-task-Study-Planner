import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://thanubhats60_db_user:<MPLfDjZbL9Uy3bJ3>@cluster0.rafb4kt.mongodb.net/");

app.use("/", authRoutes);
app.use("/", taskRoutes);

app.listen(5000, () => console.log("Server running"));
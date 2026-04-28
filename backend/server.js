import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import dotenv from "dotenv";

const app = express();

app.use(cors());
app.use(express.json());
dotenv.config();
const db_password = process.env.db_password;
mongoose.connect(`mongodb://thanubhats60_db_user:${db_password}@ac-k6bu3qm-shard-00-00.rafb4kt.mongodb.net:27017,ac-k6bu3qm-shard-00-01.rafb4kt.mongodb.net:27017,ac-k6bu3qm-shard-00-02.rafb4kt.mongodb.net:27017/?ssl=true&replicaSet=atlas-9wj7m6-shard-0&authSource=admin&appName=Cluster0`);

app.use("/", authRoutes);
app.use("/", taskRoutes);

app.listen(5000, () => console.log("Server running"));
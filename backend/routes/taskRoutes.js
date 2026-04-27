import express from "express";
import { createTask, getTasks, updateTask, deleteTask, getStats } from "../controllers/taskController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/tasks", protect, createTask);
router.get("/tasks", protect, getTasks);
router.put("/tasks/:id", protect, updateTask);
router.delete("/tasks/:id", protect, deleteTask);
router.get("/stats", protect, getStats);

export default router;
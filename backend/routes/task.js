// routes/task.js
import express from "express";
import Task from "../models/Task.js";

const router = express.Router();

router.post("/tasks", async (req, res) => {
  const task = await Task.create(req.body);
  res.json(task);
});

router.get("/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

export default router;
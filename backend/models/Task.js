import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: String,
  deadline: Date,
  priority: String,
  completed: { type: Boolean, default: false }
});

export default mongoose.model("Task", taskSchema);
import { useState } from "react";
import API from "../services/api";

export default function TaskForm() {
  const [task, setTask] = useState({
    title: "",
    deadline: "",
    priority: "low",
  });

  const createTask = async () => {
    await API.post("/tasks", task);
    window.location.reload();
  };

  return (
    <div className="card">
      <h3>Add Task</h3>

      <input placeholder="Title"
        onChange={e => setTask({...task, title: e.target.value})} />

      <input type="date"
        onChange={e => setTask({...task, deadline: e.target.value})} />

      <select
        onChange={e => setTask({...task, priority: e.target.value})}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <button className="btn-primary" onClick={createTask}>
        Add
      </button>
    </div>
  );
}
import { useEffect, useState } from "react";
import API from "../services/api";
import TaskCard from "../components/TaskCard";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({});

  useEffect(() => {
    API.get("/tasks").then(res => setTasks(res.data));
    API.get("/stats").then(res => setStats(res.data));
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>

      <p>Total: {stats.total}</p>
      <p>Completed: {stats.completed}</p>
      <p>Pending: {stats.pending}</p>

      {tasks.map(task => (
        <TaskCard key={task._id} task={task} />
      ))}
    </div>
  );
}
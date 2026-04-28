import { useEffect, useState } from "react";
import API from "../services/api";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({});

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const t = await API.get("/tasks");
    const s = await API.get("/stats");

    setTasks(t.data);
    setStats(s.data);
  };

  return (
    <div className="container">

      <div className="stats">
        <div className="stat-box">📊 {stats.total}</div>
        <div className="stat-box">✅ {stats.completed}</div>
        <div className="stat-box">⏳ {stats.pending}</div>
      </div>

      <TaskForm />
      <TaskList tasks={tasks} />

    </div>
  );
}
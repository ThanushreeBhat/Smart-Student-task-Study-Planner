import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/tasks")
      .then(res => setTasks(res.data));
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      {tasks.map((t, i) => (
        <div key={i}>
          <p>{t.title}</p>
        </div>
      ))}
    </div>
  );
}
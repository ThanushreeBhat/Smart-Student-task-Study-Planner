export default function TaskCard({ task }) {
  return (
    <div className={`card ${task.priority || "low"}`}>
      <h3>{task.title}</h3>
      <p>{task.completed ? "✅ Done" : "⏳ Pending"}</p>
      <p>📅 {task.deadline?.slice(0,10)}</p>

      <button className="btn-success">Done</button>
      <button className="btn-primary">Edit</button>
      <button className="btn-danger">Delete</button>
    </div>
  );
}
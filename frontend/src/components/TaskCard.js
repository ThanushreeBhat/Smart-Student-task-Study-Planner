export default function TaskCard({ task }) {
  return (
    <div style={{
      border: "1px solid",
      margin: "10px",
      padding: "10px",
      background: task.priority === "high" ? "#ffcccc" :
                  task.priority === "medium" ? "#fff3cd" : "#ccffcc"
    }}>
      <h4>{task.title}</h4>
      <p>{task.completed ? "✅ Done" : "❌ Pending"}</p>
    </div>
  );
}
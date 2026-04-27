export default function ReminderPopup({ task }) {
  if (!task) return null;

  return (
    <div style={{ position: "fixed", top: 20, right: 20, background: "yellow" }}>
      ⏰ Reminder: {task.title}
    </div>
  );
}
import TaskCard from "./TaskCard";
import { motion } from "framer-motion";

export default function TaskList({ tasks, load }) {
  // Sort tasks: Incomplete first, then by priority (high to low)
  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1;
    const priorityMap = { high: 0, medium: 1, low: 2 };
    return priorityMap[a.priority] - priorityMap[b.priority];
  });

  return (
    <div className="grid grid-cols-1 gap-4">
      {sortedTasks.map((t, i) => (
        <motion.div
          key={t._id}
          layout
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.05 }}
        >
          <TaskCard task={t} load={load} />
        </motion.div>
      ))}
    </div>
  );
}
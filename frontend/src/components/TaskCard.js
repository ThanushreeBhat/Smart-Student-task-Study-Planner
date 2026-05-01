import API from "../services/api";
import { Check, Trash2, Calendar, AlertCircle, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";
import { clsx } from "clsx";

export default function TaskCard({ task, load }) {
  const toggleComplete = async () => {
    try {
      await API.put(`/tasks/${task._id}`, { completed: !task.completed });
      load(!task.completed); // Celebrate if we just finished it
    } catch (err) {
      console.error(err);
    }
  };

  const deleteMe = async () => {
    if (!window.confirm("Delete this task?")) return;
    try {
      await API.delete(`/tasks/${task._id}`);
      load();
    } catch (err) {
      console.error(err);
    }
  };

  const isOverdue = !task.completed && task.deadline && new Date(task.deadline) < new Date();
  
  const priorityColors = {
    high: "bg-red-400 font-bold",
    medium: "bg-amber-400 font-bold",
    low: "bg-zinc-400",
  };

  return (
    <div className={clsx(
      "glass-card p-5 group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all",
      task.completed && "opacity-60",
      isOverdue && "border-red-500/50 bg-red-500/5 shadow-[0_0_20px_rgba(239,68,68,0.1)]"
    )}>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-1">
          <span className={clsx(
            "w-2 h-2 rounded-full",
            task.completed ? "bg-zinc-600" : (
              task.priority === 'high' ? 'bg-red-400' : 
              task.priority === 'medium' ? 'bg-amber-400' : 'bg-green-400'
            )
          )} />
          <h3 className={clsx(
            "text-lg font-semibold truncate",
            task.completed && "line-through text-zinc-500"
          )}>
            {task.title}
          </h3>
          {isOverdue && (
            <span className="flex items-center gap-1 text-[10px] bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full font-bold uppercase tracking-widest">
              <AlertCircle size={10} /> Overdue
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-4 text-xs text-zinc-500">
          <p className="flex items-center gap-1">
            <Calendar size={14} />
            {task.deadline ? new Date(task.deadline).toLocaleDateString() : "No Date"}
          </p>
          <p className="flex items-center gap-1 uppercase font-bold tracking-tighter">
            <span className={clsx(
              "px-1.5 py-0.5 rounded text-[10px] text-zinc-900",
              priorityColors[task.priority] || priorityColors.low
            )}>
              {task.priority || "low"}
            </span>
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto">
        <button 
          onClick={toggleComplete}
          className={clsx(
            "flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-xl border transition-all font-medium text-sm",
            task.completed 
              ? "border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-white"
              : "border-green-500/30 text-green-400 hover:bg-green-500/10 hover:border-green-500"
          )}
        >
          {task.completed ? <RotateCcw size={16} /> : <Check size={16} />}
          <span>{task.completed ? "Undo" : "Done"}</span>
        </button>
        
        <button 
          onClick={deleteMe}
          className="p-2.5 rounded-xl border border-red-500/20 text-red-500/60 hover:text-red-500 hover:bg-red-500/10 transition-all"
          title="Delete Task"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}
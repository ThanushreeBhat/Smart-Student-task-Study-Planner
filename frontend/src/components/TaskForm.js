import { useState } from "react";
import API from "../services/api";
import { Plus, Loader2, Calendar, Flag } from "lucide-react";

export default function TaskForm({ load }) {
  const [task, setTask] = useState({
    title: "",
    deadline: "",
    priority: "low",
  });
  const [loading, setLoading] = useState(false);

  const createTask = async (e) => {
    e.preventDefault();
    if (!task.title) return;
    
    setLoading(true);
    try {
      await API.post("/tasks", task);
      setTask({ title: "", deadline: "", priority: "low" });
      load();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={createTask} className="glass-card p-6 space-y-4">
      <div className="space-y-2">
        <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider ml-1">Task Title</label>
        <input 
          placeholder="e.g. Finish Calculus Homework"
          className="input-glass w-full text-sm"
          value={task.title}
          onChange={e => setTask({...task, title: e.target.value})} 
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider ml-1 flex items-center gap-1">
            <Calendar size={12} /> Deadline
          </label>
          <input 
            type="date"
            className="input-glass w-full text-sm [color-scheme:dark]"
            value={task.deadline}
            onChange={e => setTask({...task, deadline: e.target.value})} 
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider ml-1 flex items-center gap-1">
            <Flag size={12} /> Priority
          </label>
          <select
            className="input-glass w-full text-sm"
            value={task.priority}
            onChange={e => setTask({...task, priority: e.target.value})}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      <button 
        type="submit" 
        disabled={loading || !task.title}
        className="btn-gradient w-full mt-2 flex items-center justify-center gap-2"
      >
        {loading ? <Loader2 className="animate-spin" size={18} /> : (
          <>
            <Plus size={18} />
            <span>Create Task</span>
          </>
        )}
      </button>
    </form>
  );
}
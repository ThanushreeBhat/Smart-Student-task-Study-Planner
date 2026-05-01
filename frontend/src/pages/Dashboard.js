import { useEffect, useState } from "react";
import API from "../services/api";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart3, CheckCircle2, Clock, Sparkles, Search, Filter, Calendar } from "lucide-react";
import confetti from "canvas-confetti";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [filterDate, setFilterDate] = useState("");

  useEffect(() => {
    load();
  }, []);

  const load = async (celebrate = false) => {
    try {
      const t = await API.get("/tasks");
      const s = await API.get("/stats");
      setTasks(t.data);
      setStats(s.data);

      if (celebrate) {
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#818cf8', '#60a5fa', '#ffffff']
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredTasks = tasks.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || t.priority === filter;
    const matchesDate = !filterDate || (t.deadline && t.deadline.startsWith(filterDate));
    return matchesSearch && matchesFilter && matchesDate;
  });

  const getSmartSummary = () => {
    const highPriority = tasks.filter(t => !t.completed && t.priority === 'high').length;
    const overdue = tasks.filter(t => !t.completed && t.deadline && new Date(t.deadline) < new Date()).length;

    if (overdue > 0) return `⚠️ You have ${overdue} overdue task${overdue > 1 ? 's' : ''}! Focus on those first.`;
    if (highPriority > 0) return `🔥 Focus on your ${highPriority} high-priority goal${highPriority > 1 ? 's' : ''} today.`;
    if (stats.pending > 0) return `✨ You've got ${stats.pending} task${stats.pending > 1 ? 's' : ''} to crush today. Let's go!`;
    return "✅ All clear! You're ahead of the curve. Time for a break? ☕";
  };

  return (
    <div className="max-w-7xl mx-auto px-6 pb-20">
      {/* Enhanced Header with Smart Briefing & Streak */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 mt-8 p-6 glass-card border-none bg-gradient-to-br from-primary/10 via-background to-secondary/10"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-4xl font-extrabold tracking-tight">My Workspace</h1>
              <div className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30 flex items-center gap-1.5 animate-pulse">
                <span className="text-sm font-bold">🔥 {localStorage.getItem("streak") || 0} Day Streak</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-zinc-300">
              <Sparkles size={20} className="text-yellow-500" />
              <p className="text-lg font-medium">{getSmartSummary()}</p>
            </div>
          </div>
          <div className="hidden md:block text-right">
            <p className="text-zinc-500 text-xs font-bold uppercase tracking-[0.2em] mb-1">Productivity</p>
            <p className="text-3xl font-black text-primary">
              {stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}%
              <span className="text-sm font-normal text-zinc-500 ml-1">Score</span>
            </p>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        {[
          { label: "Total Tasks", value: stats.total, icon: BarChart3, color: "text-blue-400", bg: "bg-blue-400/10" },
          { label: "Completed", value: stats.completed, icon: CheckCircle2, color: "text-green-400", bg: "bg-green-400/10" },
          { label: "Pending", value: stats.pending, icon: Clock, color: "text-amber-400", bg: "bg-amber-400/10" },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6 flex items-center justify-between"
          >
            <div>
              <p className="text-zinc-400 text-sm font-medium mb-1">{item.label}</p>
              <h3 className="text-3xl font-bold">{item.value}</h3>
            </div>
            <div className={`p-3 rounded-xl ${item.bg} ${item.color}`}>
              <item.icon size={24} />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column: Form */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Sparkles className="text-primary" size={20} />
                New Goal
              </h2>
              <TaskForm load={load} />
            </section>
          </div>
        </div>

        {/* Right Column: List & Filters */}
        <div className="lg:col-span-2">
          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
              <input
                type="text"
                placeholder="Search tasks..."
                className="input-glass w-full pl-12"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className="flex flex-row gap-4">
              <div className="relative">
                <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                <select
                  className="input-glass pl-12 pr-8 appearance-none min-w-[140px]"
                  value={filter}
                  onChange={e => setFilter(e.target.value)}
                >
                  <option value="all">All Priorities</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                <input
                  type="date"
                  className="input-glass pl-12 pr-4 [color-scheme:dark]"
                  value={filterDate}
                  onChange={e => setFilterDate(e.target.value)}
                />
              </div>
            </div>
          </div>

          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-zinc-300">
            <Clock className="text-secondary" size={20} />
            Tasks {filter !== 'all' && `(${filter})`}
          </h2>

          <AnimatePresence mode="popLayout">
            {loading ? (
              <p className="text-zinc-500 italic">Synchronizing...</p>
            ) : filteredTasks.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-card p-12 text-center"
              >
                <p className="text-zinc-400">No tasks match your criteria.</p>
              </motion.div>
            ) : (
              <TaskList tasks={filteredTasks} load={load} />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
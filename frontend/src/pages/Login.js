import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import { LogIn, Mail, Lock, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("/login", data);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("streak", res.data.streak || 0);
      navigate("/dashboard");
    } catch (err) {
      alert("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card w-full max-w-md p-8 sm:p-10"
      >
        <div className="flex justify-center mb-6">
          <div className="p-3 rounded-2xl bg-primary/20 text-primary">
            <LogIn size={32} />
          </div>
        </div>
        
        <h2 className="text-3xl font-bold text-center mb-2">Welcome Back</h2>
        <p className="text-zinc-400 text-center mb-8">Login to manage your study goals</p>

        <form onSubmit={login} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300 ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
              <input 
                type="email"
                required
                placeholder="you@example.com"
                className="input-glass w-full pl-12"
                onChange={e => setData({...data, email: e.target.value})} 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
              <input 
                type="password"
                required
                placeholder="••••••••"
                className="input-glass w-full pl-12"
                onChange={e => setData({...data, password: e.target.value})} 
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="btn-gradient w-full mt-4 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : "Login"}
          </button>
        </form>

        <p className="text-center mt-8 text-zinc-400">
          Don't have an account?{" "}
          <Link to="/register" className="text-primary hover:underline font-medium">
            Register now
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
import { useState, useEffect } from "react";
import API from "../services/api";
import { User, Mail, Lock, Loader2, Save, ArrowLeft, ShieldCheck, Flame, Camera } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Account() {
  const [data, setData] = useState({ name: "", email: "", password: "", profileImage: "", streak: 0 });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await API.get("/profile");
      setData({
        ...data,
        name: res.data.name,
        email: res.data.email,
        profileImage: res.data.profileImage || "",
        streak: res.data.streak || 0
      });
    } catch (err) {
      console.error(err);
    } finally {
      setFetching(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 1024 * 1024) {
        setMessage("Image size should be less than 1MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setData({ ...data, profileImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const update = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      await API.put("/profile", data);
      setMessage("Profile updated successfully! ✅");
      setData({ ...data, password: "" }); // Clear password field
    } catch (err) {
      setMessage("Update failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Loader2 className="animate-spin text-primary" size={40} />
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-8"
      >
        <Link to="/dashboard" className="text-zinc-500 hover:text-white flex items-center gap-2 mb-4 transition-colors">
          <ArrowLeft size={18} /> Back to Dashboard
        </Link>
        <h1 className="text-4xl font-bold">Account Settings</h1>
        <p className="text-zinc-400 mt-2">Manage your profile and security preferences</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-4">
          {/* Streak Card - Duolingo Style */}
          <div className="glass-card p-6 border-l-4 border-l-orange-500 overflow-hidden relative group">
            <div className="absolute -right-4 -bottom-4 text-orange-500/10 group-hover:scale-110 transition-transform duration-500">
              <Flame size={120} />
            </div>
            <div className="relative z-10 flex items-center gap-4">
              <div className="p-3 bg-orange-500/20 rounded-2xl text-orange-500 shadow-lg shadow-orange-500/20">
                <Flame size={32} fill="currentColor" />
              </div>
              <div>
                <h3 className="text-3xl font-black text-orange-500">{data.streak}</h3>
                <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Day Streak</p>
              </div>
            </div>
            <p className="mt-4 text-xs text-zinc-500 leading-relaxed">
              You're on fire! Keep completing tasks to maintain your momentum.
            </p>
          </div>

          {/* Merged Profile & Security Card */}
          <div className="glass-card p-6 border-l-4 border-l-indigo-500">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
                <ShieldCheck size={20} />
              </div>
              <h3 className="font-bold">Account & Security</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-1 p-1 bg-blue-500/10 rounded text-blue-400">
                  <User size={14} />
                </div>
                <p className="text-xs text-zinc-400">Your personal details are kept private and secure.</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 p-1 bg-purple-500/10 rounded text-purple-400">
                  <Lock size={14} />
                </div>
                <p className="text-xs text-zinc-400">Use a unique password to protect your workspace.</p>
              </div>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:col-span-2"
        >
          <form onSubmit={update} className="glass-card p-8 space-y-6">
            {message && (
              <div className={`p-4 rounded-xl text-center font-medium ${message.includes('success') ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                {message}
              </div>
            )}

            {/* Profile Image Upload */}
            <div className="flex flex-col items-center justify-center pb-6 border-b border-white/5">
              <div className="relative group">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/10 bg-zinc-800 flex items-center justify-center shadow-2xl transition-transform group-hover:scale-105">
                  {data.profileImage ? (
                    <img src={data.profileImage} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User size={48} className="text-zinc-600" />
                  )}
                  <label className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center cursor-pointer transition-opacity duration-300">
                    <Camera className="text-white mb-1" size={24} />
                    <span className="text-[10px] font-bold text-white uppercase">Change</span>
                    <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                  </label>
                </div>
                <div className="absolute -bottom-2 -right-2 p-2 bg-primary rounded-full shadow-lg border-2 border-zinc-900">
                  <Camera size={14} className="text-white" />
                </div>
              </div>
              <p className="mt-4 text-sm font-semibold text-zinc-300">Profile Picture</p>
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mt-1">Click to update</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300 ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                  <input
                    type="text"
                    required
                    value={data.name}
                    className="input-glass w-full pl-12"
                    onChange={e => setData({ ...data, name: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300 ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                  <input
                    type="email"
                    required
                    value={data.email}
                    className="input-glass w-full pl-12"
                    onChange={e => setData({ ...data, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2 pt-4 border-t border-white/5">
                <label className="text-sm font-medium text-zinc-300 ml-1">Change Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                  <input
                    type="password"
                    placeholder="Enter new password to change"
                    className="input-glass w-full pl-12"
                    value={data.password}
                    onChange={e => setData({ ...data, password: e.target.value })}
                  />
                </div>
                <p className="text-[10px] text-zinc-500 ml-1 uppercase tracking-wider font-bold">Leave blank to keep current password</p>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-gradient w-full flex items-center justify-center gap-2 py-3"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : (
                <>
                  <Save size={20} />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

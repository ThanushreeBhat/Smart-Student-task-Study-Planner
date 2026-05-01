import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, CheckCircle2, User, Settings, ShieldQuestion } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const token = localStorage.getItem("token");

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  const confirmLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("streak");
    navigate("/");
    setShowLogoutModal(false);
  };

  return (
    <>
      <nav className="sticky top-0 z-40 w-full px-6 py-4 mb-4 backdrop-blur-md bg-background/60 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to={token ? "/dashboard" : "/"} className="flex items-center gap-2 group">
            <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400 group-hover:scale-110 transition-transform">
              <CheckCircle2 size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-indigo-300 bg-clip-text text-transparent">
              SmartPlanner
            </span>
          </Link>

          {token && (
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 p-1.5 pr-3 rounded-full bg-white/5 border border-white/5 hover:border-indigo-500/30 transition-all group"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center text-white">
                  <User size={18} />
                </div>
                <span className="text-sm font-medium text-zinc-300 group-hover:text-white hidden sm:inline">Profile</span>
              </button>

              <AnimatePresence>
                {showDropdown && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-3 w-48 glass-card border-none bg-slate-900/95 shadow-2xl p-2 z-50 overflow-hidden"
                  >
                    <Link 
                      to="/account" 
                      onClick={() => setShowDropdown(false)}
                      className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-zinc-300 hover:bg-white/5 hover:text-white transition-all"
                    >
                      <Settings size={16} />
                      Account
                    </Link>
                    <button 
                      onClick={() => {
                        setShowDropdown(false);
                        setShowLogoutModal(true);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition-all"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </nav>

      {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {showLogoutModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLogoutModal(false)}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="glass-card w-full max-w-sm p-8 text-center relative z-10"
            >
              <div className="w-16 h-16 rounded-2xl bg-red-500/10 text-red-500 mx-auto flex items-center justify-center mb-6">
                <ShieldQuestion size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-2">Confirm Logout</h3>
              <p className="text-zinc-400 mb-8">Do you really want to sign out of your account?</p>
              
              <div className="flex gap-4">
                <button 
                  onClick={() => setShowLogoutModal(false)}
                  className="flex-1 px-6 py-3 rounded-xl bg-white/5 text-zinc-300 hover:bg-white/10 transition-all font-medium"
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmLogout}
                  className="flex-1 px-6 py-3 rounded-xl bg-red-500 text-white hover:bg-red-600 transition-all font-medium"
                >
                  Logout
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
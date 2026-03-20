import React, { useState, useEffect } from "react";
import { useAuth } from "@/components/AuthContext";
import { Navigate } from "react-router-dom";
import { LogOut, Sun, Moon, X } from "lucide-react";

const Dashboard: React.FC = () => {
  const { user, loading, logout } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") setDarkMode(true);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="w-10 h-10 border-4 border-gray-800 dark:border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 transition-colors duration-300">

      {/* Header */}
      <header className="sticky top-0 z-10 backdrop-blur-md bg-white/70 dark:bg-gray-900/70 border-b border-gray-200 dark:border-gray-800 px-8 py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
          Dashboard
        </h1>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:scale-105 transition"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            onClick={() => setShowLogoutDialog(true)}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition shadow-md"
          >
            <LogOut size={16} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-5xl mx-auto px-6 py-12">

        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 p-8">

          {/* Top Section */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-8">

            {/* Avatar */}
            <div className="relative">
              <img
                src={user.avatar || "https://ui-avatars.com/api/?name=" + user.name}
                alt="avatar"
                className="w-28 h-28 rounded-full object-cover shadow-lg border-4 border-white dark:border-gray-800"
              />
            </div>

            <div className="mt-6 sm:mt-0">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                {user.name}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                {user.email}
              </p>
              <span className="inline-block mt-3 px-3 py-1 text-xs font-semibold bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full">
                User ID: {user.id}
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="my-8 h-px bg-gray-200 dark:bg-gray-800"></div>

          {/* Info Grid */}
          <div className="grid md:grid-cols-2 gap-6">

            <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:shadow-md transition">
              <h3 className="text-sm text-gray-500 dark:text-gray-400 normal tracking-wide">
                Account Status
              </h3>
              <p className="text-xl font-semibold mt-2 text-gray-900 dark:text-white">
                Active
              </p>
            </div>

            <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:shadow-md transition">
              <h3 className="text-sm text-gray-500 dark:text-gray-400 normaltracking-wide">
                Authentication
              </h3>
              <p className="text-xl font-semibold mt-2 text-gray-900 dark:text-white">
                Google OAuth 2.0
              </p>
            </div>

          </div>

        </div>
      </main>

      {/* Logout Confirmation Dialog */}
      {showLogoutDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-[90%] max-w-md p-6 relative animate-fadeIn">

            <button
              onClick={() => setShowLogoutDialog(false)}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-800 dark:hover:text-white"
            >
              <X size={18} />
            </button>

            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Confirm Logout
            </h2>

            <p className="text-gray-600 dark:text-gray-400 mt-3">
              Are you sure you want to logout from your account?
            </p>

            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setShowLogoutDialog(false)}
                className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition"
              >
                Cancel
              </button>

              <button
                onClick={logout}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-500 transition"
              >
                Logout
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
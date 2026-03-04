import React, { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { useAuth } from "@/components/AuthContext";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const { user, loading } = useAuth();
  const navigate = useNavigate();

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

  useEffect(() => {
    if (!loading && user) {
      navigate("/dashboard");
    }
  }, [user, loading, navigate]);

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
  };

  return (
    <div className="min-h-screen flex flex-col transition-all duration-500
      bg-gray-100 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-black">

      {/* Top Bar */}
      <div className="flex justify-end p-6">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="flex items-center gap-2 px-4 py-2 
          bg-white shadow-md text-gray-700 
          dark:bg-white/20 dark:text-white dark:backdrop-blur-md
          rounded-full hover:shadow-lg transition"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          <span className="hidden sm:inline">
            {darkMode ? "Light" : "Dark"}
          </span>
        </button>
      </div>

      {/* Centered Auth Card */}
      <div className="flex flex-1 items-center justify-center px-6 relative">

        {/* Subtle light background glow */}
        <div className="absolute w-[500px] h-[500px] bg-gray-200 rounded-full blur-3xl opacity-40 dark:hidden"></div>

        <div className="relative w-full max-w-md 
          bg-white dark:bg-gray-900/90 
          backdrop-blur-xl 
          rounded-2xl shadow-2xl p-10">

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Sign in
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Use your Google account to continue
            </p>
          </div>

          {/* Google Button */}
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 
            border border-gray-300 dark:border-gray-700 
            bg-white dark:bg-gray-800 
            text-gray-700 dark:text-gray-200 
            font-medium py-3 rounded-lg 
            hover:shadow-md hover:bg-gray-50 
            dark:hover:bg-gray-700
            active:scale-[0.98] transition-all duration-200"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center my-8">
            <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700"></div>
            <span className="px-4 text-sm text-gray-500 dark:text-gray-400">
              Secure Authentication
            </span>
            <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700"></div>
          </div>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            Protected with OAuth 2.0
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-6 text-gray-500 dark:text-gray-400 text-sm">
        © {new Date().getFullYear()} BrianKerio.Dev
      </div>
    </div>
  );
};

export default Home;
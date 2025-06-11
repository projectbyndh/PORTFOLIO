// src/admin/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAdminStore from "../Store/AdminStore";
import React from "react";

export default function Login() {
  const { login } = useAdminStore();
  const [inputPassword, setInputPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const adminData = { name: "Admin" }; // Mock admin data
    const token = "mock-token"; // Mock token; replace with backend token if applicable
    const success = login(adminData, token, inputPassword);
    if (success) {
      navigate("/admin");
    } else {
      setError("Invalid password");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5FAFF] to-[#EAF5FF] font-sans text-[#1A2A44] relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-[#4A8EBC]/10 animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-[#3B5488]/10 animate-pulse-slow"></div>
      </div>

      <div className="max-w-md mx-auto p-6 py-16 relative z-10">
        <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#1A2A44] to-[#4A8EBC] text-center mb-6 animate-pulse-slow">
          Admin Login
        </h1>

        {error && (
          <p className="text-red-500 text-lg bg-white/50 backdrop-blur-sm p-4 rounded-xl shadow mb-4 text-center">
            {error}
          </p>
        )}

        <div className="p-6 bg-white/50 backdrop-blur-sm rounded-xl shadow-lg">
          <form onSubmit={handleLogin} className="space-y-6">
            <h2 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#1A2A44] to-[#4A8EBC] mb-4">
              Enter Password
            </h2>
            <div>
              <label className="block text-sm font-medium text-[#2B4066]/80">
                Password
              </label>
              <input
                type="password"
                value={inputPassword}
                onChange={(e) => setInputPassword(e.target.value)}
                className="w-full p-3 border border-[#4A8EBC]/20 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#4A8EBC] transition-all duration-300"
                placeholder="Enter admin password"
                required
              />
            </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#4A8EBC] to-[#3B5488] text-white font-semibold py-3 px-6 rounded-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                Login
              </button>
          </form>
        </div>
      </div>
    </div>
  );
}
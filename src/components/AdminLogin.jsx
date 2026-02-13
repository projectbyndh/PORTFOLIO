import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import useAuthStore from '../Store/useAuthStore';

export default function AdminLogin() {
  const navigate = useNavigate();
  const { login, verifyToken } = useAuthStore();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Check if user is already logged in by verifying with backend
  useEffect(() => {
    const checkAuthentication = async () => {
      const result = await verifyToken();
      if (result.success) {
        // User is already logged in, redirect to dashboard
        navigate('/admin/dashboard', { replace: true });
      }
      setIsCheckingAuth(false);
    };
    
    checkAuthentication();
  }, [navigate, verifyToken]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await login(formData.email, formData.password);

      if (result.success) {
        // Redirect to dashboard with replace to prevent going back to login
        navigate('/admin/dashboard', { replace: true });
      } else {
        setError(result.message || 'Invalid credentials');
        setIsLoading(false);
      }
    } catch (error) {
      setError('Login failed. Please try again.');
      setIsLoading(false);
    }
  };

  // Show loading while checking authentication
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F5FAFF] via-white to-[#F0F7FF] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#26a8df] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#26a8df] font-semibold">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-[#F5FAFF] via-white to-[#F0F7FF] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-[#26a8df]/10 animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-[#26a8df]/10 animate-pulse"></div>
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(#26a8df 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
          }}
        ></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        {/* Logo/Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-linear-to-r from-[#26a8df] to-[#26a8df] mb-3 sm:mb-4 shadow-xl">
            <ShieldCheck className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold bg-linear-to-r from-[#26a8df] to-[#26a8df] bg-clip-text text-transparent mb-1 sm:mb-2">
            Admin Login
          </h1>
          <p className="text-xs sm:text-sm text-[#26a8df]/70">Enter your credentials to access the admin panel</p>
        </div>

        {/* Login Card */}
        <div className="bg-white/70 backdrop-blur-sm border border-white/50 shadow-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 lg:space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-xs sm:text-sm font-semibold text-[#26a8df] mb-1.5 sm:mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-2.5 sm:pl-3 flex items-center pointer-events-none">
                  <User className="h-4 w-4 sm:h-5 sm:w-5 text-[#26a8df]/50" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full pl-8 sm:pl-10 pr-2.5 sm:pr-3 py-2 sm:py-2.5 lg:py-3 text-sm sm:text-base border border-[#26a8df]/20 rounded-lg focus:ring-2 focus:ring-[#26a8df] focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-300"
                  placeholder="Enter admin email"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-xs sm:text-sm font-semibold text-[#26a8df] mb-1.5 sm:mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-2.5 sm:pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-[#26a8df]/50" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full pl-8 sm:pl-10 pr-10 sm:pr-12 py-2 sm:py-2.5 lg:py-3 text-sm sm:text-base border border-[#26a8df]/20 rounded-lg focus:ring-2 focus:ring-[#26a8df] focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-300"
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-2.5 sm:pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 sm:h-5 sm:w-5 text-[#26a8df]/50 hover:text-[#26a8df]" />
                  ) : (
                    <Eye className="h-4 w-4 sm:h-5 sm:w-5 text-[#26a8df]/50 hover:text-[#26a8df]" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 sm:px-4 sm:py-3 rounded-lg text-xs sm:text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-linear-to-r from-[#26a8df] to-[#26a8df] hover:from-[#26a8df] hover:to-[#26a8df] text-white py-2 sm:py-2.5 lg:py-3 px-3 sm:px-4 text-sm sm:text-base rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-xs sm:text-sm lg:text-base">Logging in...</span>
                </span>
              ) : (
                <span className="text-xs sm:text-sm lg:text-base">Login to Dashboard</span>
              )}
            </button>
          </form>

          {/* Info Note */}
          <div className="mt-6 pt-6 border-t border-[#26a8df]/10">
            <p className="text-xs text-[#26a8df]/60 text-center">
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate('/')}
            className="text-[#26a8df] hover:text-[#26a8df] font-semibold transition-colors duration-300"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

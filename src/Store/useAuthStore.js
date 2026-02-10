import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axiosInstance from '../api/axios';

const useAuthStore = create(
  persist(
    (set, get) => ({
      // State
      isAuthenticated: false,
      user: null,
      token: null,

      // Actions
      login: async (username, password) => {
        try {
          const response = await axiosInstance.post('/api/auth/login', { username, password });

          if (response.data.success) {
            const { token, user } = response.data;
            localStorage.setItem('token', token);

            set({
              isAuthenticated: true,
              user,
              token,
            });
            return { success: true };
          }
          return { success: false, message: response.data.message || 'Login failed' };
        } catch (error) {
          console.error('Login error:', error);
          return {
            success: false,
            message: error.response?.data?.message || 'Login failed. Please try again.'
          };
        }
      },

      logout: () => {
        // Clear token from localStorage
        localStorage.removeItem('token');

        set({
          isAuthenticated: false,
          user: null,
          token: null,
        });
      },

      // Check if user is authenticated
      checkAuth: () => {
        return get().isAuthenticated;
      },

      // Initialize auth state from localStorage
      initializeAuth: () => {
        const token = localStorage.getItem('token');
        if (token) {
          // Verify token with backend
          axiosInstance.post('/api/auth/verify')
            .then(response => {
              if (response.data.success) {
                set({
                  isAuthenticated: true,
                  user: response.data.user,
                  token: token,
                });
              } else {
                // Token invalid, clear it
                localStorage.removeItem('token');
              }
            })
            .catch(() => {
              // Token verification failed, clear it
              localStorage.removeItem('token');
            });
        }
      },
    }),
    {
      name: 'ndh-auth-storage', // unique name for localStorage key
      getStorage: () => localStorage, // use localStorage
    }
  )
);

export default useAuthStore;

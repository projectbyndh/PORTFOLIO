import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import apiClient from '../api/apiClient';

const useAuthStore = create(
  persist(
    (set, get) => ({
      // State
      isAuthenticated: false,
      user: null,
      token: null,

      // Actions
      login: async (email, password) => {
        try {
          const response = await apiClient('/auth/login', {
            method: 'POST',
            body: { email, password }
          });

          if (response.success) {
            const { token, user } = response;

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            set({
              isAuthenticated: true,
              user,
              token,
            });
            return { success: true };
          }
          return { success: false, message: response.message || 'Login failed' };
        } catch (error) {
          console.error('Login error:', error);
          return {
            success: false,
            message: error.data?.message || 'Login failed. Please check your credentials.'
          };
        }
      },

      logout: () => {
        // Clear token and user from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        set({
          isAuthenticated: false,
          user: null,
          token: null,
        });

        // Redirect to login if on admin page
        if (window.location.pathname.includes('admin')) {
          window.location.href = '/admin/login';
        }
      },

      // Check if user is authenticated
      checkAuth: () => {
        return get().isAuthenticated;
      },

      // Verify token with backend
      verifyToken: async () => {
        const token = localStorage.getItem('token');
        if (!token) {
          set({ isAuthenticated: false, user: null, token: null });
          return { success: false };
        }

        try {
          const response = await apiClient('/auth/verify', {
            method: 'POST',
            body: {} // Send empty body to prevent read errors
          });
          if (response.success) {
            // Token is valid
            set({ isAuthenticated: true });
            return { success: true };
          }
        } catch (error) {
          // Verification failed
          get().logout();
          return { success: false };
        }
      },

      // Initialize auth state from localStorage (Optimistic)
      initializeAuth: () => {
        const token = localStorage.getItem('token');
        const userStr = localStorage.getItem('user');

        if (token && userStr) {
          try {
            const user = JSON.parse(userStr);
            set({
              isAuthenticated: true,
              user: user,
              token: token,
            });
          } catch (error) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            set({ isAuthenticated: false, user: null, token: null });
          }
        }
      },
    }),
    {
      name: 'ndh-auth-storage', // unique name for localStorage key
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (!str) return null;
          try {
            return JSON.parse(str);
          } catch {
            return null;
          }
        },
        setItem: (name, value) => localStorage.setItem(name, JSON.stringify(value)),
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
);

export default useAuthStore;

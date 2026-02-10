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
      login: async (username, password) => {
        try {
          // ofetch returns data directly
          const data = await apiClient('/auth/login', {
            method: 'POST',
            body: { username, password }
          });

          if (data.success) {
            const { token, user } = data;
            localStorage.setItem('token', token);

            set({
              isAuthenticated: true,
              user,
              token,
            });
            return { success: true };
          }
          return { success: false, message: data.message || 'Login failed' };
        } catch (error) {
          console.error('Login error:', error);
          const errorMessage = error.data?.message || 'Login failed. Please try again.';
          return {
            success: false,
            message: errorMessage
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

        // Optional: Redirect to login
        if (window.location.pathname.includes('admin')) {
          window.location.href = '/ndh-admin/login';
        }
      },

      // Check if user is authenticated
      checkAuth: () => {
        return get().isAuthenticated;
      },

      // Verify token with backend (returns promise)
      verifyToken: async () => {
        const token = localStorage.getItem('token');
        if (!token) {
          set({
            isAuthenticated: false,
            user: null,
            token: null,
          });
          return { success: false, message: 'No token found' };
        }

        try {
          const data = await apiClient('/auth/verify', { method: 'POST' });
          if (data.success) {
            set({
              isAuthenticated: true,
              user: data.user,
              token: token,
            });
            return { success: true, user: data.user };
          } else {
            // Token invalid, clear it
            localStorage.removeItem('token');
            set({
              isAuthenticated: false,
              user: null,
              token: null,
            });
            return { success: false, message: 'Invalid token' };
          }
        } catch (error) {
          // Token verification failed, clear it
          localStorage.removeItem('token');
          set({
            isAuthenticated: false,
            user: null,
            token: null,
          });
          return { success: false, message: error.data?.message || 'Token verification failed' };
        }
      },

      // Initialize auth state from localStorage
      initializeAuth: () => {
        const token = localStorage.getItem('token');
        if (token) {
          // Verify token with backend
          apiClient('/auth/verify', { method: 'POST' })
            .then(data => {
              if (data.success) {
                set({
                  isAuthenticated: true,
                  user: data.user,
                  token: token,
                });
              } else {
                localStorage.removeItem('token');
              }
            })
            .catch(() => {
              localStorage.removeItem('token');
            });
        }
      },
    }),
    {
      name: 'ndh-auth-storage', // unique name for localStorage key
      storage: {
        getItem: (name) => localStorage.getItem(name) ? JSON.parse(localStorage.getItem(name)) : null,
        setItem: (name, value) => localStorage.setItem(name, JSON.stringify(value)),
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
);

export default useAuthStore;

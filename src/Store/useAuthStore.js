import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Hardcoded admin credentials
const ADMIN_CREDENTIALS = {
  email: "admin.ndh@gmail.com",
  password: "Manigram@ndh@123#"
};

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
          // Validate against hardcoded credentials
          if (username === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
            const token = btoa(`${username}:${Date.now()}`); // Generate a simple token
            const user = {
              email: username,
              name: 'NDH Admin',
              role: 'admin'
            };

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            set({
              isAuthenticated: true,
              user,
              token,
            });
            return { success: true };
          }
          return { success: false, message: 'Invalid email or password' };
        } catch (error) {
          console.error('Login error:', error);
          return {
            success: false,
            message: 'Login failed. Please try again.'
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

        // Optional: Redirect to login
        if (window.location.pathname.includes('admin')) {
          window.location.href = '/ndh-admin/login';
        }
      },

      // Check if user is authenticated
      checkAuth: () => {
        return get().isAuthenticated;
      },

      // Verify token from localStorage (synchronous check)
      verifyToken: async () => {
        const token = localStorage.getItem('token');
        const userStr = localStorage.getItem('user');
        
        if (!token || !userStr) {
          set({
            isAuthenticated: false,
            user: null,
            token: null,
          });
          return { success: false, message: 'No token found' };
        }

        try {
          const user = JSON.parse(userStr);
          set({
            isAuthenticated: true,
            user: user,
            token: token,
          });
          return { success: true, user: user };
        } catch (error) {
          // Token verification failed, clear it
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          set({
            isAuthenticated: false,
            user: null,
            token: null,
          });
          return { success: false, message: 'Invalid token' };
        }
      },

      // Initialize auth state from localStorage
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
          }
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

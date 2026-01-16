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
      
      // Admin credentials (in production, verify against backend)
      ADMIN_USERNAME: 'admin',
      ADMIN_PASSWORD: 'admin',

      // Actions
      login: async (username, password) => {
        console.log('Login attempt:', { username, password });
        
        // Simple admin login validation
        if (username === 'admin' && password === 'admin') {
          console.log('Login successful');
          
          // Set mock token for backend auth
          const mockToken = 'mock-admin-token-' + Date.now();
          localStorage.setItem('token', mockToken);
          
          set({
            isAuthenticated: true,
            user: { username: 'admin', role: 'admin' },
            token: mockToken,
          });
          return { success: true };
        }
        
        console.log('Login failed - invalid credentials');
        return { success: false, message: 'Invalid credentials' };
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

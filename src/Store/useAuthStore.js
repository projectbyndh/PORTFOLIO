import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      // State
      isAuthenticated: false,
      user: null,
      
      // Admin credentials (in production, verify against backend)
      ADMIN_USERNAME: 'admin',
      ADMIN_PASSWORD: 'NDH@2024',

      // Actions
      login: (username, password) => {
        // In production, this should call an API endpoint
        const ADMIN_USERNAME = 'admin';
        const ADMIN_PASSWORD = 'NDH@2024';
        
        if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
          set({
            isAuthenticated: true,
            user: { username, role: 'admin' },
          });
          return { success: true };
        }
        return { success: false, message: 'Invalid credentials' };
      },

      logout: () => {
        set({
          isAuthenticated: false,
          user: null,
        });
      },

      // Check if user is authenticated
      checkAuth: () => {
        return useAuthStore.getState().isAuthenticated;
      },
    }),
    {
      name: 'ndh-auth-storage', // unique name for localStorage key
      getStorage: () => localStorage, // use localStorage
    }
  )
);

export default useAuthStore;

// src/Store/useAdminStore.js
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const FIXED_PASSWORD = 'Manigram@ndh@123@#';

const useAdminStore = create(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      admin: null,
      token: null,

      // Login with fixed password check
      login: (adminData, token, inputPassword) => {
        if (inputPassword === FIXED_PASSWORD) {
          set({
            isAuthenticated: true,
            admin: adminData,
            token,
          });
          return true;
        }
        return false;
      },

      // Logout clears authentication
      logout: () => {
        set({
          isAuthenticated: false,
          admin: null,
          token: null,
        });
      },

      // Update admin data
      updateAdmin: (updatedAdmin) => {
        set((state) => ({
          admin: { ...state.admin, ...updatedAdmin },
        }));
      },

      // Check authentication status
      checkAuth: () => {
        const { isAuthenticated } = get();
        if (!isAuthenticated) {
          return false;
        }
        return true;
      },
    }),
    {
      name: 'admin-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAdminStore;
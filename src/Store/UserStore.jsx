import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useUserStore = create(
  persist(
    (set, get) => ({
      users: [],
      // Add a new user
      addUser: (user) => {
        set((state) => ({ users: [...state.users, user] }));
      },
      // Find user by name (case-insensitive)
      findUserByName: (name) => {
        const { users } = get();
        return users.find(u => u.name.toLowerCase() === name.toLowerCase());
      },
      // Remove user by name
      removeUser: (name) => {
        set((state) => ({ users: state.users.filter(u => u.name.toLowerCase() !== name.toLowerCase()) }));
      },
      // Update user by name
      updateUser: (name, updatedUser) => {
        set((state) => ({
          users: state.users.map(u => u.name.toLowerCase() === name.toLowerCase() ? { ...u, ...updatedUser } : u)
        }));
      },
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useUserStore;

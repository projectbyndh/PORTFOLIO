import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useMessageStore = create(
  persist(
    (set, get) => ({
      messages: [],
      addMessage: (msg) => {
        set((state) => ({ messages: [msg, ...state.messages] }));
      },
      getMessages: () => {
        return get().messages;
      },
      clearMessages: () => {
        set({ messages: [] });
      },
    }),
    {
      name: 'messages-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useMessageStore;

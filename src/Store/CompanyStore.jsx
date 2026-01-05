import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useCompanyStore = create(
  persist(
    (set, get) => ({
      companies: [],
      setCompanies: (companies) => set({ companies }),
      addCompany: (company) => set((state) => ({ companies: [company, ...state.companies] })),
      deleteCompany: (id) => set((state) => ({ companies: state.companies.filter(c => c.id !== id) })),
      clearCompanies: () => set({ companies: [] }),
    }),
    {
      name: 'companies-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCompanyStore;

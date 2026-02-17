import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const usePartnerStore = create(
  persist(
    (set, get) => ({
      partners: [],
      loading: false,
      error: null,

      setPartners: (partners) => set({ partners }),
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),

      addPartner: (partner) => set((state) => ({
        partners: [...state.partners, partner]
      })),

      updatePartner: (updatedPartner) => set((state) => ({
        partners: state.partners.map(partner =>
          (partner.id || partner._id) === (updatedPartner.id || updatedPartner._id) ? updatedPartner : partner
        )
      })),

      removePartner: (partnerId) => set((state) => ({
        partners: state.partners.filter(partner => (partner.id || partner._id) !== partnerId)
      })),

      clearError: () => set({ error: null })
    }),
    {
      name: 'partner-store',
      partialize: (state) => ({
        partners: state.partners
      })
    }
  )
);

export default usePartnerStore;
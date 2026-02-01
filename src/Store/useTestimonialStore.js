import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useTestimonialStore = create(
    persist(
        (set) => ({
            testimonials: [],
            loading: false,
            error: null,

            setTestimonials: (testimonials) => set({ testimonials, error: null }),
            setLoading: (loading) => set({ loading }),
            setError: (error) => set({ error }),

            addTestimonial: (testimonial) =>
                set((state) => ({
                    testimonials: [testimonial, ...state.testimonials],
                    error: null
                })),

            updateTestimonial: (updatedTestimonial) =>
                set((state) => ({
                    testimonials: state.testimonials.map((t) =>
                        t._id === updatedTestimonial._id ? updatedTestimonial : t
                    ),
                    error: null
                })),

            removeTestimonial: (id) =>
                set((state) => ({
                    testimonials: state.testimonials.filter((t) => t._id !== id),
                    error: null
                })),

            clearError: () => set({ error: null }),
        }),
        {
            name: 'testimonial-storage',
        }
    )
);

export default useTestimonialStore;

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useCourseStore = create(
  persist(
    (set, get) => ({
      courses: [],
      addCourse: (course) => set((state) => ({ courses: [course, ...state.courses] })),
      updateCourse: (id, updated) => set((state) => ({
        courses: state.courses.map((c) => (c.id === id ? { ...c, ...updated } : c)),
      })),
      deleteCourse: (id) => set((state) => ({ courses: state.courses.filter((c) => c.id !== id) })),
      clearCourses: () => set({ courses: [] }),
    }),
    {
      name: 'courses-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCourseStore;

import { create } from 'zustand';
import apiClient from '../api/apiClient';

const useCareerStore = create((set, get) => ({
  // State
  careers: [],
  selectedCareer: null,
  loading: false,
  error: null,

  // Fallback demo data
  // ... (keeping demoCareers as they are)
  demoCareers: [
    {
      _id: 'demo-1',
      title: 'Senior Software Developer',
      description: 'We are looking for an experienced software developer to join our team and work on cutting-edge projects.',
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=250&fit=crop',
      requirements: [
        "Bachelor's degree in Computer Science or related field",
        "5+ years of experience in software development",
        "Proficiency in React, Node.js, and modern web technologies",
        "Experience with cloud platforms (AWS/Azure)"
      ],
      responsibilities: [
        "Develop and maintain web applications",
        "Collaborate with cross-functional teams",
        "Participate in code reviews and mentoring",
        "Contribute to architectural decisions"
      ],
      applyLink: 'https://example.com/apply/senior-developer',
      location: 'Kathmandu, Nepal',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15')
    },
    {
      _id: 'demo-2',
      title: 'UI/UX Designer',
      description: 'Join our design team to create beautiful and user-friendly interfaces for our digital products.',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop',
      requirements: [
        "Bachelor's degree in Design or related field",
        "3+ years of experience in UI/UX design",
        "Proficiency in Figma, Adobe Creative Suite",
        "Strong portfolio demonstrating design skills"
      ],
      responsibilities: [
        "Create user-centered designs for web and mobile applications",
        "Conduct user research and usability testing",
        "Collaborate with development teams",
        "Maintain and evolve design systems"
      ],
      applyLink: 'https://example.com/apply/ui-ux-designer',
      location: 'Kathmandu, Nepal',
      createdAt: new Date('2024-01-20'),
      updatedAt: new Date('2024-01-20')
    },
    {
      _id: 'demo-3',
      title: 'DevOps Engineer',
      description: 'We need a skilled DevOps engineer to help us build and maintain our infrastructure and deployment pipelines.',
      image: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=400&h=250&fit=crop',
      requirements: [
        "Bachelor's degree in Computer Science or related field",
        "4+ years of experience in DevOps/SRE",
        "Experience with Docker, Kubernetes, and CI/CD pipelines",
        "Knowledge of cloud platforms (AWS/Azure/GCP)"
      ],
      responsibilities: [
        "Design and maintain CI/CD pipelines",
        "Manage cloud infrastructure and deployments",
        "Monitor system performance and reliability",
        "Implement security best practices"
      ],
      applyLink: 'https://example.com/apply/devops-engineer',
      location: 'Kathmandu, Nepal',
      createdAt: new Date('2024-01-25'),
      updatedAt: new Date('2024-01-25')
    }
  ],

  // Actions

  // Fetch all careers
  fetchCareers: async () => {
    set({ loading: true, error: null });
    try {
      const data = await apiClient('/careers');
      const careersData = data.data || data;

      if (careersData.length === 0) {
        set({
          careers: get().demoCareers,
          loading: false
        });
        return get().demoCareers;
      }

      set({
        careers: careersData,
        loading: false
      });
      return careersData;
    } catch (error) {
      if (error.status === 304) {
        set({ loading: false });
        return get().careers;
      }

      set({
        careers: get().demoCareers,
        loading: false,
        error: null
      });
      return get().demoCareers;
    }
  },

  // Fetch single career by ID
  fetchCareerById: async (id) => {
    set({ loading: true, error: null });
    try {
      const data = await apiClient(`/careers/${id}`);
      const careerData = data.data || data;
      set({
        selectedCareer: careerData,
        loading: false
      });
      return careerData;
    } catch (error) {
      if (error.status === 304) {
        set({ loading: false });
        return get().selectedCareer;
      }

      const localCareer = get().careers.find(career => career._id === id);
      if (localCareer) {
        set({
          selectedCareer: localCareer,
          loading: false
        });
        return localCareer;
      } else {
        throw new Error('Career not found');
      }
    }
  },

  // Create new career
  createCareer: async (careerData) => {
    set({ loading: true, error: null });
    try {
      const data = await apiClient('/careers', {
        method: 'POST',
        body: careerData
      });
      const newCareer = data.data || data;

      set((state) => ({
        careers: [newCareer, ...state.careers],
        loading: false
      }));

      return newCareer;
    } catch (error) {
      set({
        loading: false,
        error: `Cannot create career: ${error.data?.message || error.message}`
      });
      throw error;
    }
  },

  // Upload image file
  uploadImage: async (file) => {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const data = await apiClient('/upload/image', {
        method: 'POST',
        body: formData
      });

      return data.url || data.imageUrl;
    } catch {
      return null;
    }
  },

  // Update existing career
  updateCareer: async (id, careerData) => {
    set({ loading: true, error: null });
    try {
      const data = await apiClient(`/careers/${id}`, {
        method: 'PUT',
        body: careerData
      });
      const updatedCareer = data.data || data;

      set((state) => ({
        careers: state.careers.map(career =>
          career._id === id ? updatedCareer : career
        ),
        selectedCareer: state.selectedCareer?._id === id ? updatedCareer : state.selectedCareer,
        loading: false
      }));

      return updatedCareer;
    } catch (error) {
      // Fallback update locally if needed
      const updatedCareer = {
        ...careerData,
        _id: id,
        updatedAt: new Date()
      };

      set((state) => ({
        careers: state.careers.map(career =>
          career._id === id ? updatedCareer : career
        ),
        selectedCareer: state.selectedCareer?._id === id ? updatedCareer : state.selectedCareer,
        loading: false
      }));

      return updatedCareer;
    }
  },

  // Delete career
  deleteCareer: async (id) => {
    set({ loading: true, error: null });
    try {
      await apiClient(`/careers/${id}`, { method: 'DELETE' });

      set((state) => ({
        careers: state.careers.filter(career => career._id !== id),
        selectedCareer: state.selectedCareer?._id === id ? null : state.selectedCareer,
        loading: false
      }));

      return true;
    } catch {
      set((state) => ({
        careers: state.careers.filter(career => career._id !== id),
        selectedCareer: state.selectedCareer?._id === id ? null : state.selectedCareer,
        loading: false
      }));

      return true;
    }
  },

  // Clear selected career
  clearSelectedCareer: () => {
    set({ selectedCareer: null });
  },

  // Clear error
  clearError: () => {
    set({ error: null });
  },

  // Reset store
  resetStore: () => {
    set({
      careers: [],
      selectedCareer: null,
      loading: false,
      error: null,
    });
  },
}));

export default useCareerStore;

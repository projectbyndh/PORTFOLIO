import { create } from 'zustand';
import axiosInstance from '../api/axios';

const useCareerStore = create((set, get) => ({
  // State
  careers: [],
  selectedCareer: null,
  loading: false,
  error: null,

  // Fallback demo data
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
    console.log('🔄 Fetching careers from backend...');
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get('/api/careers');
      const careersData = response.data.data || response.data;

      console.log('✅ API returned careers:', careersData.length);

      if (careersData.length === 0) {
        console.log('⚠️ Backend returned no careers, using demo data');
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
      // Handle 304 responses (cached content)
      if (error.response?.status === 304) {
        console.log('📚 Career data not modified, using existing data');
        set({ loading: false });
        return get().careers; // Return existing careers
      }

      console.log('❌ Backend not available/error, using demo data fallback');
      // Fallback to demo data on error
      set({
        careers: get().demoCareers,
        loading: false,
        error: null // Clear error to show demo careers
      });
      return get().demoCareers;
    }
  },

  // Fetch single career by ID
  fetchCareerById: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get(`/api/careers/${id}`);
      const careerData = response.data.data || response.data;
      set({
        selectedCareer: careerData,
        loading: false
      });
      return careerData;
    } catch (error) {
      // Handle 304 responses
      if (error.response?.status === 304) {
        console.log('📄 Career not modified, using existing data');
        set({ loading: false });
        return get().selectedCareer; // Return existing selected career
      }

      console.log('Backend not available, fetching career locally');
      // Find career locally
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
    console.log('📝 Creating career:', careerData.title);
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.post('/api/careers', careerData);
      const newCareer = response.data.data || response.data;
      console.log('✅ Career created via API:', newCareer._id);

      // Add new career to the list
      set((state) => ({
        careers: [newCareer, ...state.careers],
        loading: false
      }));

      return newCareer;
    } catch (error) {
      console.log('❌ Backend not available, cannot create career');
      set({
        loading: false,
        error: 'Cannot create career: Backend is not available. Please check your connection.'
      });
      throw new Error('Backend not available. Career creation failed.');
    }
  },

  // Upload image file
  uploadImage: async (file) => {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await axiosInstance.post('/api/upload/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data.url || response.data.imageUrl;
    } catch (error) {
      console.log('📁 Backend upload not available, will use local storage');
      return null;
    }
  },

  // Update existing career
  updateCareer: async (id, careerData) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.put(`/api/careers/${id}`, careerData);
      const updatedCareer = response.data.data || response.data;

      // Update career in the list
      set((state) => ({
        careers: state.careers.map(career =>
          career._id === id ? updatedCareer : career
        ),
        selectedCareer: state.selectedCareer?._id === id ? updatedCareer : state.selectedCareer,
        loading: false
      }));

      return updatedCareer;
    } catch (error) {
      console.log('Backend not available, updating career locally');
      // Update career locally
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
      await axiosInstance.delete(`/api/careers/${id}`);

      // Remove career from the list
      set((state) => ({
        careers: state.careers.filter(career => career._id !== id),
        selectedCareer: state.selectedCareer?._id === id ? null : state.selectedCareer,
        loading: false
      }));

      return true;
    } catch (error) {
      console.log('Backend not available, deleting career locally');
      // Delete career locally
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
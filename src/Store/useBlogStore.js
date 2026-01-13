import { create } from 'zustand';
import axiosInstance from '../api/axios';

const useBlogStore = create((set, get) => ({
  // State
  blogs: [],
  selectedBlog: null,
  loading: false,
  error: null,

  // Fallback demo data
  demoBlogs: [
    {
      _id: 'demo-1',
      title: 'Welcome to NDH Technologies',
      author: 'NDH Technologies',
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=250&fit=crop',
      description: 'Discover how NDH Technologies is revolutionizing digital solutions with cutting-edge technology and innovative approaches. Our team of experts delivers exceptional results.',
      content: 'Discover how NDH Technologies is revolutionizing digital solutions with cutting-edge technology and innovative approaches. Our team of experts delivers exceptional results.\n\nWe specialize in:\n- Web Development\n- Mobile Applications\n- Cloud Solutions\n- Digital Marketing\n- Consulting Services',
      date: new Date('2024-01-15'),
      createdAt: new Date('2024-01-15')
    },
    {
      _id: 'demo-2',
      title: 'The Future of Web Development',
      author: 'Tech Team',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop',
      description: 'Exploring the latest trends and technologies shaping the future of web development. From AI integration to modern frameworks.',
      content: 'Exploring the latest trends and technologies shaping the future of web development. From AI integration to modern frameworks.\n\nKey trends include:\n- Artificial Intelligence\n- Progressive Web Apps\n- Serverless Architecture\n- Headless CMS\n- Jamstack',
      date: new Date('2024-01-20'),
      createdAt: new Date('2024-01-20')
    },
    {
      _id: 'demo-3',
      title: 'Digital Transformation Success Stories',
      author: 'NDH Technologies',
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=250&fit=crop',
      description: 'Real-world examples of successful digital transformation projects that delivered measurable business results.',
      content: 'Real-world examples of successful digital transformation projects that delivered measurable business results.\n\nOur case studies demonstrate:\n- 300% increase in online sales\n- 50% reduction in operational costs\n- Improved customer satisfaction\n- Enhanced brand visibility',
      date: new Date('2024-01-25'),
      createdAt: new Date('2024-01-25')
    }
  ],

  // Actions

  // Fetch all blogs
  fetchBlogs: async () => {
    console.log('🔄 Fetching blogs from backend only...');
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get('/api/blogs');
      const blogsData = Array.isArray(response.data) ? response.data : [];
      console.log('✅ API returned blogs:', blogsData.length);

      // Only use backend data, no local merging
      set({
        blogs: blogsData,
        loading: false
      });
      return blogsData;
    } catch (error) {
      // Handle 304 responses (cached content)
      if (error.response?.status === 304) {
        console.log('📚 Blog data not modified, using existing data');
        set({ loading: false });
        return get().blogs; // Return existing blogs
      }

      console.log('❌ Backend not available, showing empty list');
      // No fallback data - only show backend data
      set({
        blogs: [],
        loading: false,
        error: 'Unable to connect to backend. Please check your connection.'
      });
      return [];
    }
  },

  // Fetch single blog by ID
  fetchBlogById: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get(`/api/blogs/${id}`);
      set({ 
        selectedBlog: response.data, 
        loading: false 
      });
      return response.data;
    } catch (error) {
      // Handle 304 responses
      if (error.response?.status === 304) {
        console.log('📄 Blog not modified, using existing data');
        set({ loading: false });
        return get().selectedBlog; // Return existing selected blog
      }

      console.log('Backend not available, fetching blog locally');
      // Find blog locally
      const localBlog = get().blogs.find(blog => blog._id === id);
      if (localBlog) {
        set({ 
          selectedBlog: localBlog, 
          loading: false 
        });
        return localBlog;
      } else {
        throw new Error('Blog not found');
      }
    }
  },

  // Create new blog
  createBlog: async (blogData) => {
    console.log('📝 Creating blog:', blogData.title);
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.post('/api/blogs', blogData);
      const newBlog = response.data;
      console.log('✅ Blog created via API:', newBlog._id);

      // Add new blog to the list
      set((state) => ({
        blogs: [newBlog, ...state.blogs],
        loading: false
      }));

      return newBlog;
    } catch (error) {
      console.log('❌ Backend not available, cannot create blog');
      set({
        loading: false,
        error: 'Cannot create blog: Backend is not available. Please check your connection.'
      });
      throw new Error('Backend not available. Blog creation failed.');
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

  // Update existing blog
  updateBlog: async (id, blogData) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.put(`/api/blogs/${id}`, blogData);
      const updatedBlog = response.data;
      
      // Update blog in the list
      set((state) => ({ 
        blogs: state.blogs.map(blog => 
          blog._id === id ? updatedBlog : blog
        ),
        selectedBlog: state.selectedBlog?._id === id ? updatedBlog : state.selectedBlog,
        loading: false 
      }));
      
      return updatedBlog;
    } catch (error) {
      console.log('Backend not available, updating blog locally');
      // Update blog locally
      const updatedBlog = {
        ...blogData,
        _id: id,
        updatedAt: new Date()
      };
      
      set((state) => ({ 
        blogs: state.blogs.map(blog => 
          blog._id === id ? updatedBlog : blog
        ),
        selectedBlog: state.selectedBlog?._id === id ? updatedBlog : state.selectedBlog,
        loading: false 
      }));
      
      return updatedBlog;
    }
  },

  // Delete blog
  deleteBlog: async (id) => {
    set({ loading: true, error: null });
    try {
      await axiosInstance.delete(`/api/blogs/${id}`);
      
      // Remove blog from the list
      set((state) => ({ 
        blogs: state.blogs.filter(blog => blog._id !== id),
        selectedBlog: state.selectedBlog?._id === id ? null : state.selectedBlog,
        loading: false 
      }));
      
      return true;
    } catch (error) {
      console.log('Backend not available, deleting blog locally');
      // Delete blog locally
      set((state) => ({ 
        blogs: state.blogs.filter(blog => blog._id !== id),
        selectedBlog: state.selectedBlog?._id === id ? null : state.selectedBlog,
        loading: false 
      }));
      
      return true;
    }
  },

  // Clear selected blog
  clearSelectedBlog: () => {
    set({ selectedBlog: null });
  },

  // Clear error
  clearError: () => {
    set({ error: null });
  },

  // Reset store
  resetStore: () => {
    set({
      blogs: [],
      selectedBlog: null,
      loading: false,
      error: null,
    });
  },
}));

export default useBlogStore;

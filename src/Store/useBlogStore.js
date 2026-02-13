import { create } from 'zustand';
import apiClient from '../api/apiClient';

const useBlogStore = create((set, get) => ({
  // State
  blogs: [],
  selectedBlog: null,
  loading: false,
  error: null,

  // Fallback demo data
  demoBlogs: [
    {
      id: 'demo-1',
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
      id: 'demo-2',
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
      id: 'demo-3',
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
    set({ loading: true, error: null });
    try {
      const data = await apiClient('/blogs');
      const blogsData = data?.data || [];

      if (blogsData.length === 0) {
        set({
          blogs: get().demoBlogs,
          loading: false
        });
        return get().demoBlogs;
      }

      set({
        blogs: blogsData,
        loading: false
      });
      return blogsData;
    } catch (error) {
      // Handle potential 304 or other errors
      if (error.status === 304) {
        set({ loading: false });
        return get().blogs;
      }
      set({
        blogs: get().demoBlogs,
        loading: false,
        error: null
      });
      return get().demoBlogs;
    }
  },

  // Fetch single blog by ID
  fetchBlogById: async (id) => {
    set({ loading: true, error: null });
    try {
      const data = await apiClient(`/blogs/${id}`);
      const blogData = data?.data || data;
      set({
        selectedBlog: blogData,
        loading: false
      });
      return blogData;
    } catch (error) {
      if (error.status === 304) {
        set({ loading: false });
        return get().selectedBlog;
      }
      const localBlog = get().blogs.find(blog =>
        String(blog.id) === String(id) || String(blog._id) === String(id)
      );
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
    const isFormData = blogData instanceof FormData;
    set({ loading: true, error: null });
    try {
      const data = await apiClient('/blogs', {
        method: 'POST',
        body: blogData
      });
      const newBlog = data?.data || data;

      set((state) => ({
        blogs: [newBlog, ...state.blogs],
        loading: false
      }));

      return newBlog;
    } catch (error) {
      const errorMessage = error.data?.message || error.message || 'Unknown error';
      set({
        loading: false,
        error: `Cannot create blog: ${errorMessage}`
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

  // Update existing blog
  updateBlog: async (id, blogData) => {
    set({ loading: true, error: null });

    try {
      const data = await apiClient(`/blogs/${id}`, {
        method: 'PUT',
        body: blogData
      });
      const updatedBlog = data?.data || data;

      set((state) => ({
        blogs: state.blogs.map(blog =>
          blog._id === id ? updatedBlog : blog
        ),
        selectedBlog: state.selectedBlog?._id === id ? updatedBlog : state.selectedBlog,
        loading: false
      }));

      return updatedBlog;
    } catch (error) {
      const errorMessage = error.data?.message || error.message || 'Unknown error';
      set({
        loading: false,
        error: `Cannot update blog: ${errorMessage}`
      });
      throw error;
    }
  },

  // Delete blog
  deleteBlog: async (id) => {
    set({ loading: true, error: null });
    try {
      await apiClient(`/blogs/${id}`, { method: 'DELETE' });

      set((state) => ({
        blogs: state.blogs.filter(blog => blog._id !== id),
        selectedBlog: state.selectedBlog?._id === id ? null : state.selectedBlog,
        loading: false
      }));

      return true;
    } catch {
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

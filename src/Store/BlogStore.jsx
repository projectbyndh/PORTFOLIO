
import { create } from 'zustand';

const useBlogStore = create((set) => ({
  blogs: [],
  selectedBlog: null,
  loading: false,
  error: null,
  fetchBlogs: async () => {
    set({ loading: true });
    try {
      const response = await fetch('/api/blogs');
      if (!response.ok) throw new Error('Failed to fetch blogs');
      const data = await response.json();
      set({ blogs: data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },
  fetchBlogById: async (id) => {
    set({ loading: true });
    try {
      const response = await fetch(`/api/blogs/${id}`);
      if (!response.ok) throw new Error('Failed to fetch blog');
      const data = await response.json();
      set({ selectedBlog: data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },
  addBlog: async (formData) => {
    try {
      const response = await fetch('/api/blogs', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('Failed to add blog');
      const newBlog = await response.json();
      set((state) => ({ blogs: [...state.blogs, newBlog] }));
    } catch (err) {
      set({ error: err.message });
    }
  },
  updateBlog: async (id, formData) => {
    try {
      const response = await fetch(`/api/blogs/${id}`, {
        method: 'PUT',
        body: formData,
      });
      if (!response.ok) throw new Error('Failed to update blog');
      const updatedBlog = await response.json();
      set((state) => ({
        blogs: state.blogs.map((blog) => (blog._id === id ? updatedBlog : blog)),
        selectedBlog: state.selectedBlog?._id === id ? updatedBlog : state.selectedBlog,
      }));
    } catch (err) {
      set({ error: err.message });
    }
  },
  deleteBlog: async (id) => {
    try {
      const response = await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete blog');
      set((state) => ({
        blogs: state.blogs.filter((blog) => blog._id !== id),
        selectedBlog: state.selectedBlog?._id === id ? null : state.selectedBlog,
      }));
    } catch (err) {
      set({ error: err.message });
    }
  },
}));

export default useBlogStore;
// This code defines a Zustand store for managing blog data in a React application.
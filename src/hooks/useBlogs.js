import { useState, useCallback } from 'react';
import axiosInstance from '../api/axios';
import toast from 'react-hot-toast';

/**
 * Custom hook for blog management operations
 * Handles all CRUD operations for blogs with proper error handling and loading states
 */
export const useBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetch all blogs from the API
   */
  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get('/api/blogs');
      const blogData = response.data?.data || [];
      setBlogs(blogData);
      return blogData;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to fetch blogs';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Fetch a single blog by ID
   */
  const fetchBlogById = useCallback(async (id) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get(`/api/blogs/${id}`);
      return response.data?.data || response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to fetch blog';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Create a new blog
   */
  const createBlog = useCallback(async (blogData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post('/api/blogs', blogData);
      const newBlog = response.data?.data || response.data;

      // Add to local state
      setBlogs(prev => [newBlog, ...prev]);

      toast.success('Blog created successfully!');
      return newBlog;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to create blog';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Update an existing blog
   */
  const updateBlog = useCallback(async (id, blogData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.put(`/api/blogs/${id}`, blogData);
      const updatedBlog = response.data?.data || response.data;

      // Update local state
      setBlogs(prev => prev.map(blog =>
        blog._id === id ? updatedBlog : blog
      ));

      toast.success('Blog updated successfully!');
      return updatedBlog;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to update blog';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Delete a blog
   */
  const deleteBlog = useCallback(async (id) => {
    setLoading(true);
    setError(null);

    try {
      await axiosInstance.delete(`/api/blogs/${id}`);

      // Remove from local state
      setBlogs(prev => prev.filter(blog => blog._id !== id));

      toast.success('Blog deleted successfully!');
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to delete blog';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Upload an image to the server
   */
  const uploadImage = useCallback(async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axiosInstance.post('/api/upload/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data?.success) {
        toast.success('Image uploaded successfully!');
        return response.data;
      } else {
        throw new Error('Upload failed');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to upload image';
      toast.error(errorMessage);
      throw err;
    }
  }, []);

  return {
    blogs,
    loading,
    error,
    fetchBlogs,
    fetchBlogById,
    createBlog,
    updateBlog,
    deleteBlog,
    uploadImage,
  };
};
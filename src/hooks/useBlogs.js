import { useState, useCallback } from 'react';
import apiClient from '../api/apiClient';
import toast from 'react-hot-toast';

/**
 * Custom hook for blog management operations
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
      const data = await apiClient('/blogs');
      const blogsData = data?.data || [];
      setBlogs(blogsData);
      return blogsData;
    } catch (err) {
      const errorMessage = err.data?.message || 'Failed to fetch blogs';
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
      const data = await apiClient(`/blogs/${id}`);
      return data?.data || data;
    } catch (err) {
      const errorMessage = err.data?.message || 'Failed to fetch blog';
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
      const data = await apiClient('/blogs', {
        method: 'POST',
        body: blogData
      });
      const newBlog = data?.data || data;

      setBlogs(prev => [newBlog, ...prev]);
      toast.success('Blog created successfully!');
      return newBlog;
    } catch (err) {
      const errorMessage = err.data?.message || 'Failed to create blog';
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
      const data = await apiClient(`/blogs/${id}`, {
        method: 'PUT',
        body: blogData
      });
      const updatedBlog = data?.data || data;

      setBlogs(prev => prev.map(blog =>
        (blog.id || blog._id) === id ? updatedBlog : blog
      ));

      toast.success('Blog updated successfully!');
      return updatedBlog;
    } catch (err) {
      const errorMessage = err.data?.message || 'Failed to update blog';
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
      await apiClient(`/blogs/${id}`, { method: 'DELETE' });
      setBlogs(prev => prev.filter(blog => (blog.id || blog._id) !== id));
      toast.success('Blog deleted successfully!');
    } catch (err) {
      const errorMessage = err.data?.message || 'Failed to delete blog';
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
      const data = await apiClient('/upload/image', {
        method: 'POST',
        body: formData
      });

      if (data?.success) {
        toast.success('Image uploaded successfully!');
        return data;
      } else {
        throw new Error('Upload failed');
      }
    } catch (err) {
      const errorMessage = err.data?.message || 'Failed to upload image';
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
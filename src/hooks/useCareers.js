import { useState, useCallback } from 'react';
import axiosInstance from '../api/axios';
import toast from 'react-hot-toast';

/**
 * Custom hook for career management operations
 * Handles all CRUD operations for careers with proper error handling and loading states
 */
export const useCareers = () => {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetch all careers from the API
   */
  const fetchCareers = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get('/api/careers');
      const careerData = response.data?.data || [];
      setCareers(careerData);
      return careerData;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to fetch careers';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Fetch a single career by ID
   */
  const fetchCareerById = useCallback(async (id) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get(`/api/careers/${id}`);
      return response.data?.data || response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to fetch career';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Create a new career
   */
  const createCareer = useCallback(async (careerData) => {
    setLoading(true);
    setError(null);
    try {
      let data = careerData;
      let headers = {};

      // If it's not already FormData, convert it to FormData to support file upload
      if (!(careerData instanceof FormData)) {
        data = new FormData();
        Object.keys(careerData).forEach(key => {
          if (Array.isArray(careerData[key])) {
            data.append(key, JSON.stringify(careerData[key]));
          } else if (careerData[key] !== undefined && careerData[key] !== null) {
            data.append(key, careerData[key]);
          }
        });
        headers = { 'Content-Type': 'multipart/form-data' };
      }

      const response = await axiosInstance.post('/api/careers', data, { headers });
      const newCareer = response.data?.data || response.data;

      // Add to local state
      setCareers(prev => [newCareer, ...prev]);

      toast.success('Career created successfully!');
      return newCareer;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to create career';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Update an existing career
   */
  const updateCareer = useCallback(async (id, careerData) => {
    setLoading(true);
    setError(null);

    try {
      let data = careerData;
      let headers = {};

      // If it's not already FormData, convert it to FormData to support file upload
      if (!(careerData instanceof FormData)) {
        data = new FormData();
        Object.keys(careerData).forEach(key => {
          if (Array.isArray(careerData[key])) {
            data.append(key, JSON.stringify(careerData[key]));
          } else if (careerData[key] !== undefined && careerData[key] !== null) {
            data.append(key, careerData[key]);
          }
        });
        headers = { 'Content-Type': 'multipart/form-data' };
      }

      const response = await axiosInstance.put(`/api/careers/${id}`, data, { headers });
      const updatedCareer = response.data?.data || response.data;

      // Update local state
      setCareers(prev => prev.map(career =>
        (career.id || career._id) === id ? updatedCareer : career
      ));

      toast.success('Career updated successfully!');
      return updatedCareer;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to update career';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Delete a career
   */
  const deleteCareer = useCallback(async (id) => {
    setLoading(true);
    setError(null);

    try {
      await axiosInstance.delete(`/api/careers/${id}`);

      // Remove from local state
      setCareers(prev => prev.filter(career => (career.id || career._id) !== id));

      toast.success('Career deleted successfully!');
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to delete career';
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

      // Check if response has imageUrl (backend format)
      if (response.data?.imageUrl || response.data?.url) {
        toast.success('Image uploaded successfully!');
        return {
          imageUrl: response.data.imageUrl || response.data.url,
          url: response.data.url || response.data.imageUrl
        };
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to upload image';
      toast.error(errorMessage);
      throw err;
    }
  }, []);

  return {
    careers,
    loading,
    error,
    fetchCareers,
    fetchCareerById,
    createCareer,
    updateCareer,
    deleteCareer,
    uploadImage,
  };
};
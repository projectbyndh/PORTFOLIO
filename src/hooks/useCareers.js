import { useState, useCallback } from 'react';
import apiClient from '../api/apiClient';
import toast from 'react-hot-toast';

/**
 * Custom hook for career management operations
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
      const data = await apiClient('/careers');
      const careerData = data?.data || [];
      setCareers(careerData);
      return careerData;
    } catch (err) {
      const errorMessage = err.data?.message || 'Failed to fetch careers';
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
      const data = await apiClient(`/careers/${id}`);
      return data?.data || data;
    } catch (err) {
      const errorMessage = err.data?.message || 'Failed to fetch career';
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
      // careerData is FormData, send it directly
      const data = await apiClient('/careers', {
        method: 'POST',
        body: careerData
      });
      const newCareer = data?.data || data;

      setCareers(prev => [newCareer, ...prev]);
      toast.success('Career created successfully!');
      return newCareer;
    } catch (err) {
      const errorMessage = err.data?.message || 'Failed to create career';
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
      // careerData is FormData, send it directly
      const data = await apiClient(`/careers/${id}`, {
        method: 'PUT',
        body: careerData
      });
      const updatedCareer = data?.data || data;

      setCareers(prev => prev.map(career =>
        (career.id || career._id) === id ? updatedCareer : career
      ));

      toast.success('Career updated successfully!');
      return updatedCareer;
    } catch (err) {
      const errorMessage = err.data?.message || 'Failed to update career';
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
      await apiClient(`/careers/${id}`, { method: 'DELETE' });
      setCareers(prev => prev.filter(career => (career.id || career._id) !== id));
      toast.success('Career deleted successfully!');
    } catch (err) {
      const errorMessage = err.data?.message || 'Failed to delete career';
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

      if (data?.imageUrl || data?.url) {
        toast.success('Image uploaded successfully!');
        return {
          imageUrl: data.imageUrl || data.url,
          url: data.url || data.imageUrl
        };
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      const errorMessage = err.data?.message || 'Failed to upload image';
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
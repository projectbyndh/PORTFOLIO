import { useState, useEffect } from 'react';
import axios from '../api/axios';
import usePartnerStore from '../Store/usePartnerStore';
import toast from 'react-hot-toast';

const usePartners = () => {
  const {
    partners,
    loading,
    error,
    setPartners,
    setLoading,
    setError,
    addPartner,
    updatePartner,
    removePartner,
    clearError
  } = usePartnerStore();

  const [currentPartner, setCurrentPartner] = useState(null);

  // Fetch all partners
  const fetchPartners = async () => {
    try {
      setLoading(true);
      clearError();
      const response = await axios.get('/api/partners', {
        timeout: 5000, // 5 second timeout
      });
      if (response.data.success) {
        setPartners(response.data.data);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.code === 'ECONNABORTED'
        ? 'Backend server is not available. Please start the server.'
        : 'Failed to fetch partners';
      setError(errorMessage);
      toast.error(errorMessage);
      // Set empty partners array on error to prevent infinite loading
      setPartners([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch partner by ID
  const fetchPartnerById = async (id) => {
    try {
      setLoading(true);
      clearError();
      const response = await axios.get(`/api/partners/${id}`, {
        timeout: 5000, // 5 second timeout
      });
      if (response.data.success) {
        setCurrentPartner(response.data.data);
        return response.data.data;
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.code === 'ECONNABORTED'
        ? 'Backend server is not available. Please start the server.'
        : 'Failed to fetch partner';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Create partner
  const createPartner = async (partnerData) => {
    try {
      setLoading(true);
      clearError();

      const formData = new FormData();
      formData.append('name', partnerData.name);
      if (partnerData.image) {
        formData.append('image', partnerData.image);
      }

      const response = await axios.post('/api/partners', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 10000, // 10 second timeout for file uploads
      });

      if (response.data.success) {
        addPartner(response.data.data);
        toast.success('Partner created successfully');
        return response.data.data;
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.code === 'ECONNABORTED'
        ? 'Backend server is not available. Please start the server.'
        : 'Failed to create partner';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update partner
  const updatePartnerById = async (id, partnerData) => {
    try {
      setLoading(true);
      clearError();

      const formData = new FormData();
      formData.append('name', partnerData.name);
      if (partnerData.image) {
        formData.append('image', partnerData.image);
      }

      const response = await axios.put(`/api/partners/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 10000, // 10 second timeout for file uploads
      });

      if (response.data.success) {
        updatePartner(response.data.data);
        toast.success('Partner updated successfully');
        return response.data.data;
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.code === 'ECONNABORTED'
        ? 'Backend server is not available. Please start the server.'
        : 'Failed to update partner';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete partner
  const deletePartner = async (id) => {
    try {
      setLoading(true);
      clearError();
      const response = await axios.delete(`/api/partners/${id}`, {
        timeout: 5000, // 5 second timeout
      });
      if (response.data.success) {
        removePartner(id);
        toast.success('Partner deleted successfully');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.code === 'ECONNABORTED'
        ? 'Backend server is not available. Please start the server.'
        : 'Failed to delete partner';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Upload image utility (if needed separately)
  const uploadImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        return response.data.data.url;
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to upload image';
      toast.error(errorMessage);
      throw err;
    }
  };

  useEffect(() => {
    if (partners.length === 0) {
      fetchPartners();
    }
  }, []);

  return {
    partners,
    loading,
    error,
    currentPartner,
    fetchPartners,
    fetchPartnerById,
    createPartner,
    updatePartnerById,
    deletePartner,
    uploadImage,
    clearError
  };
};

export default usePartners;
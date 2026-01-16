import { useState, useEffect } from 'react';
import axios from '../api/axios';
import toast from 'react-hot-toast';

const useServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all services
  const fetchServices = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get('/api/services', {
        timeout: 5000, // 5 second timeout
      });
      if (response.data.success) {
        setServices(response.data.data);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.code === 'ECONNABORTED'
        ? 'Backend server is not available. Please start the server.'
        : 'Failed to fetch services';
      setError(errorMessage);
      toast.error(errorMessage);
      // Set empty services array on error
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch service by ID
  const fetchServiceById = async (id) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`/api/services/${id}`, {
        timeout: 5000, // 5 second timeout
      });
      if (response.data.success) {
        return response.data.data;
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.code === 'ECONNABORTED'
        ? 'Backend server is not available. Please start the server.'
        : 'Failed to fetch service';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Create service
  const createService = async (serviceData) => {
    try {
      setLoading(true);
      setError(null);

      const formData = new FormData();
      formData.append('title', serviceData.title);
      formData.append('description', serviceData.description);

      if (serviceData.logo) {
        formData.append('logo', serviceData.logo);
      }

      const response = await axios.post('/api/services', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 10000, // 10 second timeout for file uploads
      });

      if (response.data.success) {
        setServices(prev => [...prev, response.data.data]);
        toast.success('Service created successfully');
        return response.data.data;
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.code === 'ECONNABORTED'
        ? 'Backend server is not available. Please start the server.'
        : 'Failed to create service';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update service
  const updateService = async (id, serviceData) => {
    try {
      setLoading(true);
      setError(null);

      const formData = new FormData();
      formData.append('title', serviceData.title);
      formData.append('description', serviceData.description);

      if (serviceData.logo) {
        formData.append('logo', serviceData.logo);
      }

      const response = await axios.put(`/api/services/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 10000, // 10 second timeout for file uploads
      });

      if (response.data.success) {
        setServices(prev => prev.map(service =>
          service._id === id ? response.data.data : service
        ));
        toast.success('Service updated successfully');
        return response.data.data;
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.code === 'ECONNABORTED'
        ? 'Backend server is not available. Please start the server.'
        : 'Failed to update service';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete service
  const deleteService = async (id) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.delete(`/api/services/${id}`, {
        timeout: 5000,
      });

      if (response.data.success) {
        setServices(prev => prev.filter(service => service._id !== id));
        toast.success('Service deleted successfully');
        return true;
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.code === 'ECONNABORTED'
        ? 'Backend server is not available. Please start the server.'
        : 'Failed to delete service';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return {
    services,
    loading,
    error,
    fetchServices,
    fetchServiceById,
    createService,
    updateService,
    deleteService
  };
};

export default useServices;
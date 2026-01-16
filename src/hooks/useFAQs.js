import { useState, useEffect } from 'react';
import axios from '../api/axios';
import toast from 'react-hot-toast';

const useFAQs = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all FAQs
  const fetchFAQs = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get('/api/faqs', {
        timeout: 5000, // 5 second timeout
      });
      if (response.data.success) {
        setFaqs(response.data.data);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.code === 'ECONNABORTED'
        ? 'Backend server is not available. Please start the server.'
        : 'Failed to fetch FAQs';
      setError(errorMessage);
      toast.error(errorMessage);
      // Set empty FAQs array on error
      setFaqs([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch FAQ by ID
  const fetchFAQById = async (id) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`/api/faqs/${id}`, {
        timeout: 5000, // 5 second timeout
      });
      if (response.data.success) {
        return response.data.data;
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.code === 'ECONNABORTED'
        ? 'Backend server is not available. Please start the server.'
        : 'Failed to fetch FAQ';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Create FAQ
  const createFAQ = async (faqData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.post('/api/faqs', faqData, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 5000,
      });

      if (response.data.success) {
        setFaqs(prev => [...prev, response.data.data]);
        toast.success('FAQ created successfully');
        return response.data.data;
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.code === 'ECONNABORTED'
        ? 'Backend server is not available. Please start the server.'
        : 'Failed to create FAQ';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update FAQ
  const updateFAQ = async (id, faqData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.put(`/api/faqs/${id}`, faqData, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 5000,
      });

      if (response.data.success) {
        setFaqs(prev => prev.map(faq =>
          faq._id === id ? response.data.data : faq
        ));
        toast.success('FAQ updated successfully');
        return response.data.data;
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.code === 'ECONNABORTED'
        ? 'Backend server is not available. Please start the server.'
        : 'Failed to update FAQ';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete FAQ
  const deleteFAQ = async (id) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.delete(`/api/faqs/${id}`, {
        timeout: 5000,
      });

      if (response.data.success) {
        setFaqs(prev => prev.filter(faq => faq._id !== id));
        toast.success('FAQ deleted successfully');
        return true;
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.code === 'ECONNABORTED'
        ? 'Backend server is not available. Please start the server.'
        : 'Failed to delete FAQ';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFAQs();
  }, []);

  return {
    faqs,
    loading,
    error,
    fetchFAQs,
    fetchFAQById,
    createFAQ,
    updateFAQ,
    deleteFAQ
  };
};

export default useFAQs;
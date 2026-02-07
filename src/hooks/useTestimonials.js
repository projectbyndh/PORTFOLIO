import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import useTestimonialStore from '../Store/useTestimonialStore';

const useTestimonials = () => {
    const {
        testimonials,
        loading,
        error,
        setTestimonials,
        setLoading,
        setError,
        addTestimonial,
        updateTestimonial,
        removeTestimonial,
        clearError
    } = useTestimonialStore();

    const [currentTestimonial, setCurrentTestimonial] = useState(null);

    // Fetch all testimonials
    const fetchTestimonials = async (filters = {}) => {
        try {
            setLoading(true);
            clearError();

            const queryParams = new URLSearchParams(filters).toString();
            const url = `/api/testimonials${queryParams ? `?${queryParams}` : ''}`;

            const response = await axios.get(url, {
                timeout: 10000,
            });

            if (response.data.success) {
                setTestimonials(response.data.data);
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.code === 'ECONNABORTED'
                ? 'Backend server is not available. Please start the server.'
                : 'Failed to fetch testimonials';
            setError(errorMessage);
            toast.error(errorMessage);
            setTestimonials([]);
        } finally {
            setLoading(false);
        }
    };

    // Fetch testimonial by ID
    const fetchTestimonialById = async (id) => {
        try {
            setLoading(true);
            clearError();
            const response = await axios.get(`/api/testimonials/${id}`, {
                timeout: 10000,
            });
            if (response.data.success) {
                setCurrentTestimonial(response.data.data);
                return response.data.data;
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Failed to fetch testimonial';
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    // Create testimonial
    const createTestimonial = async (testimonialData) => {
        try {
            setLoading(true);
            clearError();

            const formData = new FormData();
            formData.append('name', testimonialData.name);
            formData.append('position', testimonialData.position);
            if (testimonialData.company) formData.append('company', testimonialData.company);
            formData.append('rating', testimonialData.rating);
            formData.append('text', testimonialData.text);
            if (testimonialData.featured !== undefined) formData.append('featured', testimonialData.featured);

            if (testimonialData.imageFile instanceof File) {
                formData.append('image', testimonialData.imageFile);
            } else if (testimonialData.image) {
                formData.append('image', testimonialData.image);
            }

            const response = await axios.post('/api/testimonials', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                timeout: 10000,
            });

            if (response.data.success) {
                addTestimonial(response.data.data);
                toast.success('Testimonial created successfully');
                return response.data.data;
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.response?.data?.error || 'Failed to create testimonial';
            setError(errorMessage);
            toast.error(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Update testimonial
    const updateTestimonialById = async (id, testimonialData) => {
        try {
            setLoading(true);
            clearError();

            const formData = new FormData();
            formData.append('name', testimonialData.name);
            formData.append('position', testimonialData.position);
            if (testimonialData.company) formData.append('company', testimonialData.company);
            formData.append('rating', testimonialData.rating);
            formData.append('text', testimonialData.text);
            if (testimonialData.featured !== undefined) formData.append('featured', testimonialData.featured);

            if (testimonialData.imageFile instanceof File) {
                formData.append('image', testimonialData.imageFile);
            }

            const response = await axios.put(`/api/testimonials/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                timeout: 10000,
            });

            if (response.data.success) {
                updateTestimonial(response.data.data);
                toast.success('Testimonial updated successfully');
                return response.data.data;
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.response?.data?.error || 'Failed to update testimonial';
            setError(errorMessage);
            toast.error(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Delete testimonial
    const deleteTestimonial = async (id) => {
        try {
            setLoading(true);
            clearError();
            const response = await axios.delete(`/api/testimonials/${id}`, {
                timeout: 10000,
            });
            if (response.data.success) {
                removeTestimonial(id);
                toast.success('Testimonial deleted successfully');
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Failed to delete testimonial';
            setError(errorMessage);
            toast.error(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    };



    return {
        testimonials,
        loading,
        error,
        currentTestimonial,
        fetchTestimonials,
        fetchTestimonialById,
        createTestimonial,
        updateTestimonialById,
        deleteTestimonial,
        // toggleFeatured,
        clearError
    };
};

export default useTestimonials;

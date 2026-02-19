import { useState, useEffect, useRef, useCallback } from 'react';
import axios from '../api/axios';
import toast from 'react-hot-toast';

const useCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const fetchedRef = useRef(false);

    const fetchCategories = useCallback(async (force = false) => {
        if (!force && fetchedRef.current) return;

        try {
            setLoading(true);
            const response = await axios.get('/categories');
            if (response.data.success) {
                setCategories(response.data.data);
                fetchedRef.current = true;
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch categories');
            // Only toast if it's not a rate limit error to avoid spamming
            if (err.response?.status !== 429) {
                toast.error('Failed to load categories');
            }
        } finally {
            setLoading(false);
        }
    }, []);


    const createCategory = async (categoryData) => {
        try {
            setLoading(true);
            const response = await axios.post('/categories', categoryData);
            if (response.data.success) {
                setCategories(prev => [...prev, response.data.data]);
                toast.success('Category created');
                return response.data.data;
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to create category');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const deleteCategory = async (id) => {
        try {
            setLoading(true);
            const response = await axios.delete(`/api/categories/${id}`);
            if (response.data.success) {
                setCategories(prev => prev.filter(cat => (cat.id || cat._id) !== id));
                toast.success('Category deleted');
            }
        } catch (err) {
            toast.error('Failed to delete category');
        } finally {
            setLoading(false);
        }
    };

    return {
        categories,
        loading,
        error,
        fetchCategories,
        createCategory,
        deleteCategory
    };
};

export default useCategories;

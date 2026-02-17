import { useState, useCallback } from 'react';
import apiClient from '../api/apiClient';
import toast from 'react-hot-toast';

export const useBatches = () => {
    const [batches, setBatches] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchBatches = useCallback(async (courseId = null) => {
        setLoading(true);
        try {
            const url = courseId ? `/batches?courseId=${courseId}` : '/batches';
            const data = await apiClient(url);
            setBatches(data.data || []);
            return data.data;
        } catch (err) {
            setError(err.message);
            toast.error('Failed to load batches');
        } finally {
            setLoading(false);
        }
    }, []);

    const createBatch = useCallback(async (batchData) => {
        setLoading(true);
        try {
            const data = await apiClient('/batches', {
                method: 'POST',
                body: batchData
            });
            setBatches(prev => [...prev, data.data]);
            toast.success('Batch created successfully');
            return data.data;
        } catch (err) {
            toast.error(err.data?.message || 'Failed to create batch');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const updateBatch = useCallback(async (id, batchData) => {
        setLoading(true);
        try {
            const data = await apiClient(`/batches/${id}`, {
                method: 'PUT',
                body: batchData
            });
            setBatches(prev => prev.map(b => b.id === id ? data.data : b));
            toast.success('Batch updated successfully');
            return data.data;
        } catch (err) {
            toast.error(err.data?.message || 'Failed to update batch');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const deleteBatch = useCallback(async (id) => {
        setLoading(true);
        try {
            await apiClient(`/batches/${id}`, { method: 'DELETE' });
            setBatches(prev => prev.filter(b => b.id !== id));
            toast.success('Batch deleted successfully');
        } catch (err) {
            toast.error('Failed to delete batch');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        batches,
        loading,
        error,
        fetchBatches,
        createBatch,
        updateBatch,
        deleteBatch
    };
};

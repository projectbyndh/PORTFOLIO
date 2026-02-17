import { useState, useCallback } from 'react';
import apiClient from '../api/apiClient';
import toast from 'react-hot-toast';

export const useEnrollments = () => {
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchEnrollments = useCallback(async () => {
        setLoading(true);
        try {
            const data = await apiClient('/enrollments');
            setEnrollments(data.data || []);
            return data.data;
        } catch (err) {
            setError(err.message);
            toast.error('Failed to load enrollments');
        } finally {
            setLoading(false);
        }
    }, []);

    const createEnrollment = useCallback(async (enrollmentData) => {
        setLoading(true);
        try {
            const data = await apiClient('/enrollments', {
                method: 'POST',
                body: enrollmentData
            });
            // enrollments update is only relevant for admin, but success matters for public
            toast.success(data.message || 'Enrollment submitted!');
            return data;
        } catch (err) {
            toast.error(err.data?.message || 'Failed to submit enrollment');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const updateEnrollmentStatus = useCallback(async (id, status, notes) => {
        setLoading(true);
        try {
            const data = await apiClient(`/enrollments/${id}`, {
                method: 'PUT',
                body: { status, notes }
            });
            setEnrollments(prev => prev.map(e => e.id === id ? data.data : e));
            toast.success('Status updated');
            return data.data;
        } catch (err) {
            toast.error('Failed to update status');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        enrollments,
        loading,
        error,
        fetchEnrollments,
        createEnrollment,
        updateEnrollmentStatus
    };
};

import { useState, useCallback } from 'react';
import apiClient from '../api/apiClient';
import toast from 'react-hot-toast';

export const useCourses = () => {
    const [courses, setCourses] = useState([]);
    const [currentCourse, setCurrentCourse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchCourses = useCallback(async () => {
        setLoading(true);
        try {
            const data = await apiClient('/courses');
            setCourses(data.data || []);
            return data.data;
        } catch (err) {
            setError(err.message);
            toast.error('Failed to load courses');
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchCourseBySlug = useCallback(async (slug) => {
        setLoading(true);
        try {
            const data = await apiClient(`/courses/${slug}`);
            setCurrentCourse(data.data);
            return data.data;
        } catch (err) {
            setError(err.message);
            toast.error('Failed to load course details');
        } finally {
            setLoading(false);
        }
    }, []);

    const createCourse = useCallback(async (courseData) => {
        setLoading(true);
        try {
            const data = await apiClient('/courses', {
                method: 'POST',
                body: courseData
            });
            setCourses(prev => [...prev, data.data]);
            toast.success('Course created successfully');
            return data.data;
        } catch (err) {
            toast.error(err.data?.message || 'Failed to create course');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const updateCourse = useCallback(async (id, courseData) => {
        setLoading(true);
        try {
            const data = await apiClient(`/courses/${id}`, {
                method: 'PUT',
                body: courseData
            });
            setCourses(prev => prev.map(c => c.id === id ? data.data : c));
            toast.success('Course updated successfully');
            return data.data;
        } catch (err) {
            toast.error(err.data?.message || 'Failed to update course');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const deleteCourse = useCallback(async (id) => {
        setLoading(true);
        try {
            await apiClient(`/courses/${id}`, { method: 'DELETE' });
            setCourses(prev => prev.filter(c => c.id !== id));
            toast.success('Course deleted successfully');
        } catch (err) {
            toast.error('Failed to delete course');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        courses,
        currentCourse,
        loading,
        error,
        fetchCourses,
        fetchCourseBySlug,
        createCourse,
        updateCourse,
        deleteCourse
    };
};

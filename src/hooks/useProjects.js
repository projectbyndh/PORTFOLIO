import { useState, useEffect, useRef, useCallback } from 'react';
import axios from '../api/axios';
import toast from 'react-hot-toast';

const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchedRef = useRef(false);

  // Fetch all projects
  const fetchProjects = useCallback(async (force = false) => {
    if (!force && fetchedRef.current) return;

    try {
      setLoading(true);
      setError(null);
      const response = await axios.get('/api/projects', {
        timeout: 5000, // 5 second timeout
      });
      if (response.data.success) {
        setProjects(response.data.data);
        fetchedRef.current = true;
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.code === 'ECONNABORTED'
        ? 'Backend server is not available. Please start the server.'
        : 'Failed to fetch projects';
      setError(errorMessage);
      // Only toast if it's not a rate limit error
      if (err.response?.status !== 429) {
        toast.error(errorMessage);
      }
      // Set empty projects array on error
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch project by ID
  const fetchProjectById = async (id) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`/api/projects/${id}`, {
        timeout: 5000, // 5 second timeout
      });
      if (response.data.success) {
        return response.data.data;
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.code === 'ECONNABORTED'
        ? 'Backend server is not available. Please start the server.'
        : 'Failed to fetch project';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Fetch projects by category
  const fetchProjectsByCategory = async (category) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`/api/projects/category/${category}`, {
        timeout: 5000, // 5 second timeout
      });
      if (response.data.success) {
        return response.data.data;
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.code === 'ECONNABORTED'
        ? 'Backend server is not available. Please start the server.'
        : 'Failed to fetch projects by category';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Create project
  const createProject = async (projectData) => {
    try {
      setLoading(true);
      setError(null);

      const formData = new FormData();
      formData.append('name', projectData.name);
      formData.append('client', projectData.client || '');
      formData.append('description', projectData.description);
      formData.append('category', projectData.category);
      formData.append('techStack', JSON.stringify(projectData.techStack || []));
      formData.append('categories', JSON.stringify(projectData.categories || [projectData.category]));
      formData.append('services', JSON.stringify(projectData.services || []));

      if (projectData.image) {
        formData.append('image', projectData.image);
      }

      const response = await axios.post('/api/projects', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 10000,
      });

      if (response.data.success) {
        setProjects(prev => [...prev, response.data.data]);
        toast.success('Project created successfully');
        return response.data.data;
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to create project';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update project
  const updateProject = async (id, projectData) => {
    try {
      setLoading(true);
      setError(null);

      const formData = new FormData();
      formData.append('name', projectData.name);
      formData.append('client', projectData.client || '');
      formData.append('description', projectData.description);
      formData.append('category', projectData.category);
      formData.append('techStack', JSON.stringify(projectData.techStack || []));
      formData.append('categories', JSON.stringify(projectData.categories || [projectData.category]));
      formData.append('services', JSON.stringify(projectData.services || []));

      if (projectData.image) {
        formData.append('image', projectData.image);
      }

      const response = await axios.put(`/api/projects/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 10000,
      });

      if (response.data.success) {
        setProjects(prev => prev.map(project =>
          (project.id === id || project._id === id) ? response.data.data : project
        ));
        toast.success('Project updated successfully');
        return response.data.data;
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to update project';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete project
  const deleteProject = async (id) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.delete(`/api/projects/${id}`);

      if (response.data.success) {
        setProjects(prev => prev.filter(project => project.id !== id && project._id !== id));
        toast.success('Project deleted successfully');
        return true;
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to delete project';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return {
    projects,
    loading,
    error,
    fetchProjects,
    fetchProjectById,
    fetchProjectsByCategory,
    createProject,
    updateProject,
    deleteProject
  };
};

export default useProjects;
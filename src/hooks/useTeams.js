import { useState, useEffect } from 'react';
import axios from '../api/axios';
import toast from 'react-hot-toast';

const useTeams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all team members
  const fetchTeams = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get('/api/team', {
        timeout: 5000, // 5 second timeout
      });
      if (response.data.success) {
        setTeams(response.data.data);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.code === 'ECONNABORTED'
        ? 'Backend server is not available. Please start the server.'
        : 'Failed to fetch team members';
      setError(errorMessage);
      toast.error(errorMessage);
      // Set empty teams array on error
      setTeams([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch team member by ID
  const fetchTeamById = async (id) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`/api/team/${id}`, {
        timeout: 5000, // 5 second timeout
      });
      if (response.data.success) {
        return response.data.data;
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.code === 'ECONNABORTED'
        ? 'Backend server is not available. Please start the server.'
        : 'Failed to fetch team member';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Create team member
  const createTeam = async (teamData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.post('/api/team', teamData, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000, // 10 second timeout
      });

      if (response.data.success) {
        setTeams(prev => [...prev, response.data.data]);
        toast.success('Team member created successfully');
        return response.data.data;
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.code === 'ECONNABORTED'
        ? 'Backend server is not available. Please start the server.'
        : 'Failed to create team member';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update team member
  const updateTeam = async (id, teamData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.put(`/api/team/${id}`, teamData, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000, // 10 second timeout
      });

      if (response.data.success) {
        setTeams(prev => prev.map(team =>
          team._id === id ? response.data.data : team
        ));
        toast.success('Team member updated successfully');
        return response.data.data;
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.code === 'ECONNABORTED'
        ? 'Backend server is not available. Please start the server.'
        : 'Failed to update team member';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete team member
  const deleteTeam = async (id) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.delete(`/api/team/${id}`, {
        timeout: 5000, // 5 second timeout
      });
      if (response.data.success) {
        setTeams(prev => prev.filter(team => team._id !== id));
        toast.success('Team member deleted successfully');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.code === 'ECONNABORTED'
        ? 'Backend server is not available. Please start the server.'
        : 'Failed to delete team member';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (teams.length === 0) {
      fetchTeams();
    }
  }, []);

  return {
    teams,
    loading,
    error,
    fetchTeams,
    fetchTeamById,
    createTeam,
    updateTeam,
    deleteTeam
  };
};

export default useTeams;
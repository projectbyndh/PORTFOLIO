import { useState, useCallback } from 'react';
import apiClient from '../api/apiClient';
import toast from 'react-hot-toast';

export default function useTeamStructureSimplified() {
  const [categories, setCategories] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch categories and members
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [categoriesRes, membersRes] = await Promise.all([
        apiClient('/team-structure/categories'),
        apiClient('/team-structure/members')
      ]);

      if (categoriesRes.success) {
        setCategories(categoriesRes.data || []);
      }
      if (membersRes.success) {
        setMembers(membersRes.data || []);
      }
    } catch (err) {
      const message = err.data?.message || 'Failed to fetch team data';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch public team structure
  const fetchPublicStructure = useCallback(async (page = 'team') => {
    try {
      const response = await apiClient('/team-structure/structure/public', {
        query: { page }
      });
      return response;
    } catch (err) {
      const message = err.data?.message || 'Failed to fetch team structure';
      toast.error(message);
      throw err;
    }
  }, []);

  // Category CRUD
  const createCategory = async (categoryData) => {
    try {
      const response = await apiClient('/team-structure/categories', {
        method: 'POST',
        body: categoryData
      });
      toast.success('Category created successfully!');
      await fetchData();
      return response;
    } catch (err) {
      const message = err.data?.message || 'Failed to create category';
      toast.error(message);
      throw err;
    }
  };

  const updateCategory = async (id, categoryData) => {
    try {
      const response = await apiClient(`/team-structure/categories/${id}`, {
        method: 'PUT',
        body: categoryData
      });
      toast.success('Category updated successfully!');
      await fetchData();
      return response;
    } catch (err) {
      const message = err.data?.message || 'Failed to update category';
      toast.error(message);
      throw err;
    }
  };

  const deleteCategory = async (id) => {
    if (!confirm('Delete this category? All members in this category will also be deleted.')) {
      return;
    }

    try {
      await apiClient(`/team-structure/categories/${id}`, { method: 'DELETE' });
      toast.success('Category deleted successfully!');
      await fetchData();
    } catch (err) {
      const message = err.data?.message || 'Failed to delete category';
      toast.error(message);
      throw err;
    }
  };

  // Member CRUD
  const createMember = async (memberData) => {
    try {
      const response = await apiClient('/team-structure/members', {
        method: 'POST',
        body: memberData
      });
      toast.success('Team member added successfully!');
      await fetchData();
      return response;
    } catch (err) {
      const message = err.data?.message || 'Failed to add member';
      toast.error(message);
      throw err;
    }
  };

  const updateMember = async (id, memberData) => {
    try {
      const response = await apiClient(`/team-structure/members/${id}`, {
        method: 'PUT',
        body: memberData
      });
      toast.success('Team member updated successfully!');
      await fetchData();
      return response;
    } catch (err) {
      const message = err.data?.message || 'Failed to update member';
      toast.error(message);
      throw err;
    }
  };

  const deleteMember = async (id) => {
    if (!confirm('Are you sure you want to delete this team member?')) {
      return;
    }

    try {
      await apiClient(`/team-structure/members/${id}`, { method: 'DELETE' });
      toast.success('Team member deleted successfully!');
      await fetchData();
    } catch (err) {
      const message = err.data?.message || 'Failed to delete member';
      toast.error(message);
      throw err;
    }
  };

  return {
    categories,
    members,
    loading,
    error,
    fetchData,
    fetchPublicStructure,
    createCategory,
    updateCategory,
    deleteCategory,
    createMember,
    updateMember,
    deleteMember
  };
}

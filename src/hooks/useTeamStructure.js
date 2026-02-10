import axios from '../api/axios';
import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';

const useTeamStructure = () => {
    const [layers, setLayers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch all admin data (layers, roles, members) in parallel
    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const [layersRes, rolesRes, membersRes] = await Promise.all([
                axios.get('/api/team-structure/layers').catch(() => ({ data: { success: false, data: [] } })),
                axios.get('/api/team-structure/roles').catch(() => ({ data: { success: false, data: [] } })),
                axios.get('/api/team-structure/members').catch(() => ({ data: { success: false, data: [] } }))
            ]);

            if (layersRes.data?.success) setLayers(layersRes.data.data);
            if (rolesRes.data?.success) setRoles(rolesRes.data.data);
            if (membersRes.data?.success) setMembers(membersRes.data.data);
        } catch (err) {
            console.error('fetchData error:', err);
            setError('Failed to fetch team structure');
            toast.error('Failed to load team data');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Fetch the public nested team structure (for public-facing pages)
    const fetchPublicStructure = useCallback(async () => {
        try {
            const res = await axios.get('/api/team-structure/structure/public');
            return res.data?.data || [];
        } catch (err) {
            console.error('Failed to fetch public structure:', err);
            return [];
        }
    }, []);

    // --- Layer CRUD ---
    const createLayer = async (formData) => {
        try {
            await axios.post('/api/team-structure/layers', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            toast.success('Layer created');
            await fetchData();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to create layer');
            throw err;
        }
    };

    const updateLayer = async (id, formData) => {
        try {
            await axios.put(`/api/team-structure/layers/${id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            toast.success('Layer updated');
            await fetchData();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to update layer');
            throw err;
        }
    };

    const deleteLayer = async (id) => {
        if (!window.confirm('Delete this layer? All associated roles will also be removed and members will be unassigned.')) return;
        try {
            await axios.delete(`/api/team-structure/layers/${id}`);
            toast.success('Layer deleted');
            await fetchData();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to delete layer');
        }
    };

    // --- Role CRUD ---
    const createRole = async (data) => {
        try {
            await axios.post('/api/team-structure/roles', data);
            toast.success('Role created');
            await fetchData();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to create role');
            throw err;
        }
    };

    const updateRole = async (id, data) => {
        try {
            await axios.put(`/api/team-structure/roles/${id}`, data);
            toast.success('Role updated');
            await fetchData();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to update role');
            throw err;
        }
    };

    const deleteRole = async (id) => {
        if (!window.confirm('Delete this role? Members with this role will become unassigned.')) return;
        try {
            await axios.delete(`/api/team-structure/roles/${id}`);
            toast.success('Role deleted');
            await fetchData();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to delete role');
        }
    };

    // --- Member CRUD ---
    const createMember = async (formData) => {
        try {
            await axios.post('/api/team-structure/members', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            toast.success('Member added');
            await fetchData();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to add member');
            throw err;
        }
    };

    const updateMember = async (id, formData) => {
        try {
            await axios.put(`/api/team-structure/members/${id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            toast.success('Member updated');
            await fetchData();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to update member');
            throw err;
        }
    };

    const deleteMember = async (id) => {
        if (!window.confirm('Delete this member?')) return;
        try {
            await axios.delete(`/api/team-structure/members/${id}`);
            toast.success('Member deleted');
            await fetchData();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to delete member');
        }
    };

    return {
        layers, roles, members, loading, error, fetchData, fetchPublicStructure,
        createLayer, updateLayer, deleteLayer,
        createRole, updateRole, deleteRole,
        createMember, updateMember, deleteMember
    };
};

export default useTeamStructure;

import React, { useState, useEffect } from 'react';
import { PlusCircle, Edit, Trash2, RefreshCw } from 'lucide-react';
import AdminLayout from './AdminLayout';
import TeamForm from '../TeamForm';
import useTeams from '../../hooks/useTeams';
import toast from 'react-hot-toast';

export default function AdminTeam() {
    const { teams, loading, fetchTeams, deleteTeam } = useTeams();
    const [showForm, setShowForm] = useState(false);
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(null);

    useEffect(() => {
        fetchTeams();
    }, []);

    const handleEdit = (team) => {
        setSelectedTeam(team);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this team member?')) return;

        setDeleteLoading(id);
        try {
            await deleteTeam(id);
            toast.success('Team member deleted successfully');
        } catch (error) {
            toast.error('Failed to delete team member');
        } finally {
            setDeleteLoading(null);
        }
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setSelectedTeam(null);
        fetchTeams();
    };

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-black text-[#1A2A44]">Team Members</h1>
                        <p className="text-[#2B4066]/60 mt-1">Manage your team members</p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => fetchTeams()}
                            disabled={loading}
                            className="px-4 py-2 bg-white border border-[#4A8EBC]/20 text-[#4A8EBC] rounded-xl hover:bg-[#4A8EBC]/10 transition-all font-semibold"
                        >
                            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                        </button>
                        <button
                            onClick={() => setShowForm(true)}
                            className="px-6 py-3 bg-gradient-to-r from-[#4A8EBC] to-[#3B5488] text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-[#4A8EBC]/30 transition-all flex items-center gap-2"
                        >
                            <PlusCircle className="w-5 h-5" />
                            Add Team Member
                        </button>
                    </div>
                </div>

                {/* Team Grid */}
                <div className="bg-white rounded-2xl border border-[#4A8EBC]/10 shadow-sm overflow-hidden min-h-[400px]">
                    {loading && teams.length === 0 ? (
                        <div className="flex justify-center items-center h-full">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4A8EBC]"></div>
                        </div>
                    ) : teams.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center py-20">
                            <div className="w-20 h-20 bg-[#F5FAFF] rounded-full flex items-center justify-center mb-4">
                                <PlusCircle className="w-10 h-10 text-[#4A8EBC]/40" />
                            </div>
                            <p className="text-[#2B4066] font-semibold text-lg mb-2">No team members found</p>
                            <p className="text-[#2B4066]/60 mb-6 max-w-sm">Start building your team by adding members.</p>
                            <button
                                onClick={() => setShowForm(true)}
                                className="px-6 py-3 bg-gradient-to-r from-[#4A8EBC] to-[#3B5488] text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                            >
                                Add First Team Member
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                            {teams.map((team) => (
                                <div
                                    key={team._id}
                                    className="group relative bg-white border border-[#4A8EBC]/10 rounded-2xl p-6 hover:shadow-xl hover:shadow-[#4A8EBC]/10 transition-all duration-300"
                                >
                                    <div className="aspect-square bg-[#F5FAFF] rounded-xl mb-4 overflow-hidden border border-[#4A8EBC]/5">
                                        <img
                                            src={team.image}
                                            alt={team.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            onError={(e) => {
                                                e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23F5FAFF" width="100" height="100"/%3E%3Ctext fill="%234A8EBC" font-family="Arial" font-size="14" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3ENo Image%3C/text%3E%3C/svg%3E';
                                            }}
                                        />
                                    </div>
                                    <h3 className="font-bold text-[#1A2A44] mb-1 group-hover:text-[#4A8EBC] transition-colors">{team.name}</h3>
                                    <p className="text-sm text-[#4A8EBC] font-medium mb-4">{team.position}</p>
                                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                        <button
                                            onClick={() => handleEdit(team)}
                                            className="flex-1 px-4 py-2 bg-[#4A8EBC]/10 text-[#4A8EBC] rounded-lg hover:bg-[#4A8EBC]/20 transition-all flex items-center justify-center gap-2 font-medium"
                                        >
                                            <Edit className="w-4 h-4" />
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(team._id)}
                                            disabled={deleteLoading === team._id}
                                            className="flex-1 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all flex items-center justify-center gap-2 font-medium disabled:opacity-50"
                                        >
                                            {deleteLoading === team._id ? (
                                                <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                                            ) : (
                                                <>
                                                    <Trash2 className="w-4 h-4" />
                                                    Delete
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Form Modal */}
                {showForm && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="p-6 border-b border-neutral-200">
                                <h2 className="text-2xl font-bold text-neutral-900">
                                    {selectedTeam ? 'Edit Team Member' : 'Add Team Member'}
                                </h2>
                            </div>
                            <div className="p-6">
                                <TeamForm
                                    team={selectedTeam}
                                    onClose={handleCloseForm}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}

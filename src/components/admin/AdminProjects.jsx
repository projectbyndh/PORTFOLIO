import React, { useState, useEffect } from 'react';
import { PlusCircle, Edit, Trash2, RefreshCw, Eye, FolderKanban, Search } from 'lucide-react';
import AdminLayout from './AdminLayout';
import ProjectForm from '../ProjectForm';
import useProjects from '../../hooks/useProjects';
import toast from 'react-hot-toast';

export default function AdminProjects() {
    const { projects, loading, fetchProjects, deleteProject } = useProjects();
    const [showForm, setShowForm] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleEdit = (project) => {
        setSelectedProject(project);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this project?')) return;

        setDeleteLoading(id);
        try {
            await deleteProject(id);
            toast.success('Project deleted successfully');
        } catch (error) {
            toast.error('Failed to delete project');
        } finally {
            setDeleteLoading(null);
        }
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setSelectedProject(null);
        fetchProjects();
    };

    const filteredProjects = projects.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-[#1A2A44]">Projects</h1>
                        <p className="text-[#2B4066]/60 mt-1">Manage your portfolio projects</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search projects..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4A8EBC]/20 w-full sm:w-64"
                            />
                        </div>
                        <button
                            onClick={() => fetchProjects()}
                            disabled={loading}
                            className="px-4 py-2 bg-white border border-[#4A8EBC]/20 text-[#4A8EBC] rounded-xl hover:bg-[#4A8EBC]/10 transition-all font-semibold flex items-center justify-center"
                        >
                            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                        </button>
                        <button
                            onClick={() => setShowForm(true)}
                            className="px-6 py-2 bg-gradient-to-r from-[#4A8EBC] to-[#3B5488] text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-[#4A8EBC]/30 transition-all flex items-center justify-center gap-2"
                        >
                            <PlusCircle className="w-5 h-5" />
                            Add Project
                        </button>
                    </div>
                </div>

                {/* Projects Grid */}
                <div className="bg-white rounded-2xl border border-[#4A8EBC]/10 shadow-sm overflow-hidden min-h-[400px]">
                    {loading && projects.length === 0 ? (
                        <div className="flex justify-center items-center h-full">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4A8EBC]"></div>
                        </div>
                    ) : filteredProjects.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center py-20">
                            {searchTerm ? (
                                <>
                                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                                        <Search className="w-10 h-10 text-gray-400" />
                                    </div>
                                    <p className="text-[#2B4066] font-semibold text-lg mb-2">No projects found</p>
                                    <p className="text-[#2B4066]/60 mb-6">No projects match "{searchTerm}"</p>
                                    <button
                                        onClick={() => setSearchTerm('')}
                                        className="px-6 py-2 bg-white border border-[#4A8EBC]/20 text-[#4A8EBC] rounded-xl font-semibold hover:bg-[#4A8EBC]/10 transition-all"
                                    >
                                        Clear Search
                                    </button>
                                </>
                            ) : (
                                <>
                                    <div className="w-20 h-20 bg-[#F5FAFF] rounded-full flex items-center justify-center mb-4">
                                        <FolderKanban className="w-10 h-10 text-[#4A8EBC]/40" />
                                    </div>
                                    <p className="text-[#2B4066] font-semibold text-lg mb-2">No projects yet</p>
                                    <p className="text-[#2B4066]/60 mb-6 max-w-sm">Showcase your work by adding your first project.</p>
                                    <button
                                        onClick={() => setShowForm(true)}
                                        className="px-6 py-3 bg-gradient-to-r from-[#4A8EBC] to-[#3B5488] text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                                    >
                                        Add First Project
                                    </button>
                                </>
                            )}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                            {filteredProjects.map((project) => (
                                <div
                                    key={project._id}
                                    className="group relative bg-white border border-[#4A8EBC]/10 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-[#4A8EBC]/10 transition-all duration-300 flex flex-col"
                                >
                                    <div className="aspect-video bg-[#F5FAFF] overflow-hidden relative">
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors z-10" />
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            onError={(e) => {
                                                e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23F5FAFF" width="100" height="100"/%3E%3Ctext fill="%234A8EBC" font-family="Arial" font-size="14" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3ENo Image%3C/text%3E%3C/svg%3E';
                                            }}
                                        />
                                    </div>
                                    <div className="p-6 flex flex-col flex-1">
                                        <div className="mb-4">
                                            <span className="inline-block px-3 py-1 bg-[#4A8EBC]/10 text-[#4A8EBC] text-xs font-semibold rounded-full mb-2">
                                                {project.category}
                                            </span>
                                            <h3 className="font-bold text-[#1A2A44] text-xl mb-2 group-hover:text-[#4A8EBC] transition-colors line-clamp-1">{project.title}</h3>
                                            <p className="text-sm text-[#2B4066]/70 line-clamp-2">{project.description}</p>
                                        </div>

                                        <div className="mt-auto flex gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
                                            <button
                                                onClick={() => handleEdit(project)}
                                                className="flex-1 px-4 py-2 bg-[#4A8EBC]/10 text-[#4A8EBC] rounded-lg hover:bg-[#4A8EBC]/20 transition-all flex items-center justify-center gap-2 font-medium"
                                            >
                                                <Edit className="w-4 h-4" />
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(project._id)}
                                                disabled={deleteLoading === project._id}
                                                className="flex-1 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all flex items-center justify-center gap-2 font-medium disabled:opacity-50"
                                            >
                                                {deleteLoading === project._id ? (
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
                                    {selectedProject ? 'Edit Project' : 'Add Project'}
                                </h2>
                            </div>
                            <div className="p-6">
                                <ProjectForm
                                    project={selectedProject}
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

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, RefreshCw } from 'lucide-react';
import useTestimonials from '../hooks/useTestimonials';
import TestimonialList from '../components/TestimonialList';
import TestimonialForm from '../components/TestimonialForm';
import AdminLayout from '../components/admin/AdminLayout';
import useAuthStore from '../Store/useAuthStore';

const TestimonialManagement = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuthStore();
    const {
        testimonials,
        loading,
        error,
        fetchTestimonials,
        createTestimonial,
        updateTestimonialById,
        deleteTestimonial
    } = useTestimonials();

    // Modal states
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingTestimonial, setEditingTestimonial] = useState(null);
    const [deletingId, setDeletingId] = useState(null);

    // Redirect if not authenticated
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/ndh-admin/login');
            return;
        }
        fetchTestimonials();
    }, [isAuthenticated, navigate]);

    // Handle Create
    const handleCreate = async (data) => {
        await createTestimonial(data);
        setIsFormOpen(false);
    };

    // Handle Update
    const handleUpdate = async (data) => {
        if (editingTestimonial) {
            await updateTestimonialById(editingTestimonial.id || editingTestimonial._id, data);
            setIsFormOpen(false);
            setEditingTestimonial(null);
        }
    };

    // Handle Delete
    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete this testimonial?')) {
            setDeletingId(id);
            try {
                await deleteTestimonial(id);
            } finally {
                setDeletingId(null);
            }
        }
    };

    // Handle Toggle Featured
    const handleToggleFeatured = async (testimonial) => {
        const newData = { ...testimonial, featured: !testimonial.featured };
        await updateTestimonialById(testimonial.id || testimonial._id, newData);
    };

    // Handle Edit
    const handleEdit = (testimonial) => {
        setEditingTestimonial(testimonial);
        setIsFormOpen(true);
    };

    // Handle Form Submit
    const handleFormSubmit = async (data) => {
        if (editingTestimonial) {
            await handleUpdate(data);
        } else {
            await handleCreate(data);
        }
    };

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-black text-[#26a8df]">Testimonials</h1>
                        <p className="text-[#26a8df]/60 mt-1">Manage client reviews and feedback</p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => fetchTestimonials()}
                            disabled={loading}
                            className="px-4 py-2 bg-white border border-[#26a8df]/20 text-[#26a8df] rounded-xl hover:bg-[#26a8df]/10 transition-all font-semibold"
                        >
                            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                        </button>
                        <button
                            onClick={() => {
                                setEditingTestimonial(null);
                                setIsFormOpen(true);
                            }}
                            className="px-6 py-3 bg-gradient-to-r from-[#26a8df] to-[#26a8df] text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-[#26a8df]/30 transition-all flex items-center gap-2"
                        >
                            <PlusCircle className="w-5 h-5" />
                            Add Testimonial
                        </button>
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
                        <p className="font-medium">Error:</p>
                        <p>{error}</p>
                    </div>
                )}

                {/* List Container */}
                <div className="bg-white rounded-2xl border border-[#26a8df]/10 shadow-sm overflow-hidden min-h-[400px]">
                    <TestimonialList
                        testimonials={testimonials}
                        loading={loading}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onToggleFeatured={handleToggleFeatured}
                        deletingId={deletingId}
                    />
                </div>

                {/* Form Modal */}
                <TestimonialForm
                    isOpen={isFormOpen}
                    onClose={() => {
                        setIsFormOpen(false);
                        setEditingTestimonial(null);
                    }}
                    onSubmit={handleFormSubmit}
                    initialData={editingTestimonial}
                    loading={loading}
                />
            </div>
        </AdminLayout>
    );
};

export default TestimonialManagement;

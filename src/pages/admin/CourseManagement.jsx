import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { useCourses } from '../../hooks/useCourses';
import PageHeader from '../../components/admin/PageHeader';
import { DataCard, EmptyState, PageLoader, IconButton, Button, ConfirmModal } from '../../components/admin/ui';
import CourseForm from '../../components/admin/CourseForm';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';

export default function CourseManagement() {
    const { courses, loading, error, fetchCourses, createCourse, updateCourse, deleteCourse } = useCourses();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingCourse, setEditingCourse] = useState(null);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [deletingId, setDeletingId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchCourses();
    }, [fetchCourses]);

    const filteredCourses = courses.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (course.tagline && course.tagline.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleCreate = async (data) => {
        try {
            await createCourse(data);
            setIsFormOpen(false);
        } catch (error) {
            console.error("Failed to create course", error);
        }
    };

    const handleUpdate = async (data) => {
        if (editingCourse) {
            try {
                await updateCourse(editingCourse.id, data);
                setIsFormOpen(false);
                setEditingCourse(null);
            } catch (error) {
                console.error("Failed to update course", error);
            }
        }
    };

    const handleDelete = async () => {
        if (deletingId) {
            try {
                await deleteCourse(deletingId);
                setIsDeleteOpen(false);
                setDeletingId(null);
            } catch (error) {
                console.error("Failed to delete course", error);
            }
        }
    };

    if (loading && courses.length === 0) return <PageLoader />;

    return (
        <AdminLayout>
            <div>
                <PageHeader
                    title="Course Management"
                    description="Manage your courses, curriculum, and details."
                    primaryAction={{
                        label: 'Create Course',
                        icon: <Plus size={16} />,
                        onClick: () => { setEditingCourse(null); setIsFormOpen(true); }
                    }}
                />

                {!isFormOpen && (
                    <div className="mb-6">
                        <input
                            type="text"
                            placeholder="Search courses..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full max-w-md px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0D1641]/20 focus:border-[#0D1641] transition-all"
                        />
                    </div>
                )}

                {isFormOpen ? (
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold">{editingCourse ? 'Edit Course' : 'Create New Course'}</h2>
                            <button onClick={() => setIsFormOpen(false)} className="text-gray-500 hover:text-gray-700">Cancel</button>
                        </div>
                        <CourseForm
                            defaultValues={editingCourse}
                            onSubmit={editingCourse ? handleUpdate : handleCreate}
                            isSubmitting={loading}
                        />
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {filteredCourses.length === 0 ? (
                            <EmptyState title={searchTerm ? "No courses match your search" : "No courses yet"} description={searchTerm ? "Try a different search term." : "Create your first course to get started."} />
                        ) : (
                            filteredCourses.map(course => (
                                <DataCard key={course.id}>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-bold text-lg text-gray-800">{course.title}</h3>
                                            <div className="text-sm text-gray-500 mt-1">{course.tagline}</div>
                                            <div className="flex gap-2 mt-2">
                                                {course.isFeatured && <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">Featured</span>}
                                                {course.isPopular && <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded text-xs">Popular</span>}
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <IconButton icon={<Eye size={16} />} onClick={() => navigate(`/courses/${course.slug}`)} tooltip="View Public Page" />
                                            <IconButton icon={<Edit size={16} />} onClick={() => { setEditingCourse(course); setIsFormOpen(true); }} tooltip="Edit" />
                                            <IconButton icon={<Trash2 size={16} />} onClick={() => { setDeletingId(course.id); setIsDeleteOpen(true); }} variant="danger" tooltip="Delete" />
                                        </div>
                                    </div>
                                </DataCard>
                            ))
                        )}
                    </div>
                )}

                <ConfirmModal
                    isOpen={isDeleteOpen}
                    onClose={() => setIsDeleteOpen(false)}
                    onConfirm={handleDelete}
                    title="Delete Course"
                    message="Are you sure? This will delete the course and all associated batches and enrollments."
                    variant="danger"
                />
            </div>
        </AdminLayout>
    );
}

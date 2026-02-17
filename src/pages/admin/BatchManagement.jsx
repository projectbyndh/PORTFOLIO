import React, { useState, useEffect } from 'react';
import { useBatches } from '../../hooks/useBatches';
import { useCourses } from '../../hooks/useCourses';
import { PageLoader, EmptyState, DataCard, IconButton, Button, ConfirmModal } from '../../components/admin/ui';
import PageHeader from '../../components/admin/PageHeader';
import { Plus, Edit, Trash2, Calendar } from 'lucide-react';
import { useForm } from 'react-hook-form';
import AdminLayout from '../../components/admin/AdminLayout';

export default function BatchManagement() {
    const { batches, loading, error, fetchBatches, createBatch, updateBatch, deleteBatch } = useBatches();
    const { courses, fetchCourses } = useCourses();

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingBatch, setEditingBatch] = useState(null);
    const [deletingId, setDeletingId] = useState(null);

    useEffect(() => {
        fetchBatches();
        fetchCourses();
    }, [fetchBatches, fetchCourses]);

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    useEffect(() => {
        if (editingBatch) {
            reset({
                ...editingBatch,
                startDate: editingBatch.startDate ? new Date(editingBatch.startDate).toISOString().split('T')[0] : '',
                endDate: editingBatch.endDate ? new Date(editingBatch.endDate).toISOString().split('T')[0] : '',
                earlyBirdDeadline: editingBatch.earlyBirdDeadline ? new Date(editingBatch.earlyBirdDeadline).toISOString().split('T')[0] : ''
            });
        } else {
            reset({
                courseId: '',
                name: '',
                startDate: '',
                endDate: '',
                timings: '',
                mode: 'Live Online',
                totalSeats: 20,
                fee: 0,
                status: 'upcoming'
            });
        }
    }, [editingBatch, reset]);

    const onSubmit = async (data) => {
        try {
            if (editingBatch) {
                await updateBatch(editingBatch.id, data);
            } else {
                await createBatch(data);
            }
            setIsFormOpen(false);
            setEditingBatch(null);
        } catch (e) {
            // Handled by hook
        }
    };

    if (loading && batches.length === 0) return <PageLoader />;

    return (
        <AdminLayout>
            <div>
                <PageHeader
                    title="Batch Management"
                    description="Schedule new batches for your courses."
                    primaryAction={{
                        label: 'Create Batch',
                        icon: <Plus size={16} />,
                        onClick: () => { setEditingBatch(null); setIsFormOpen(true); }
                    }}
                />

                {isFormOpen && (
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8 max-w-2xl mx-auto">
                        <h2 className="text-xl font-bold mb-4">{editingBatch ? 'Edit Batch' : 'Create New Batch'}</h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Course</label>
                                <select {...register('courseId', { required: 'Course is required' })} className="w-full p-2 border rounded">
                                    <option value="">Select Course</option>
                                    {courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Batch Name</label>
                                    <input {...register('name', { required: true })} placeholder="e.g. March Fast Track" className="w-full p-2 border rounded" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Status</label>
                                    <select {...register('status')} className="w-full p-2 border rounded">
                                        <option value="upcoming">Upcoming</option>
                                        <option value="ongoing">Ongoing</option>
                                        <option value="completed">Completed</option>
                                        <option value="filling fast">Filling Fast</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Start Date</label>
                                    <input type="date" {...register('startDate', { required: true })} className="w-full p-2 border rounded" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">End Date</label>
                                    <input type="date" {...register('endDate')} className="w-full p-2 border rounded" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Timings</label>
                                    <input {...register('timings')} placeholder="Sat-Sun 6-8 PM" className="w-full p-2 border rounded" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Mode</label>
                                    <select {...register('mode')} className="w-full p-2 border rounded">
                                        <option value="Live Online">Live Online</option>
                                        <option value="Recorded">Recorded</option>
                                        <option value="Hybrid">Hybrid</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Total Seats</label>
                                    <input type="number" {...register('totalSeats')} className="w-full p-2 border rounded" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Fee</label>
                                    <input type="number" {...register('fee', { required: true })} className="w-full p-2 border rounded" />
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-4">
                                <button type="button" onClick={() => setIsFormOpen(false)} className="px-4 py-2 border rounded">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded font-bold">Save Batch</button>
                            </div>
                        </form>
                    </div>
                )}

                <div className="space-y-4">
                    {batches.length === 0 ? (
                        <EmptyState title="No batches scheduled" description="Create a batch to start enrollments." />
                    ) : (
                        batches.map(batch => (
                            <DataCard key={batch.id}>
                                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${batch.status === 'upcoming' ? 'bg-blue-100 text-blue-700' :
                                                batch.status === 'ongoing' ? 'bg-green-100 text-green-700' :
                                                    'bg-gray-100 text-gray-700'
                                                }`}>
                                                {batch.status}
                                            </span>
                                            <span className="text-gray-400 text-xs">{batch.course?.title || 'Unknown Course'}</span>
                                        </div>
                                        <h3 className="font-bold text-lg">{batch.name}</h3>
                                        <div className="text-sm text-gray-600 flex items-center gap-3 mt-1">
                                            <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(batch.startDate).toLocaleDateString()}</span>
                                            <span>•</span>
                                            <span>{batch.timings}</span>
                                            <span>•</span>
                                            <span>{batch.bookedSeats}/{batch.totalSeats} seats booked</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 self-start md:self-center">
                                        <IconButton icon={<Edit size={16} />} onClick={() => { setEditingBatch(batch); setIsFormOpen(true); }} tooltip="Edit" />
                                        <IconButton icon={<Trash2 size={16} />} onClick={() => setDeletingId(batch.id)} variant="danger" tooltip="Delete" />
                                    </div>
                                </div>
                            </DataCard>
                        ))
                    )}
                </div>

                <ConfirmModal
                    isOpen={!!deletingId}
                    onClose={() => setDeletingId(null)}
                    onConfirm={async () => {
                        if (deletingId) {
                            try {
                                await deleteBatch(deletingId);
                                setDeletingId(null);
                            } catch (error) {
                                console.error("Failed to delete batch", error);
                            }
                        }
                    }}
                    title="Delete Batch?"
                    message="This will remove the batch schedule. Existing enrollments will be preserved but unlinked."
                    variant="danger"
                />
            </div>
        </AdminLayout>
    );
}

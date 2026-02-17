import React, { useState, useEffect } from 'react';
import { useEnrollments } from '../../hooks/useEnrollments';
import { PageLoader, EmptyState, DataCard, IconButton, Button } from '../../components/admin/ui';
import PageHeader from '../../components/admin/PageHeader';
import { Mail, Phone, Calendar, User, MessageCircle, MoreVertical } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';

export default function EnrollmentManagement() {
    const { enrollments, loading, error, fetchEnrollments, updateEnrollmentStatus } = useEnrollments();
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        fetchEnrollments();
    }, [fetchEnrollments]);

    const filteredEnrollments = filter === 'all'
        ? enrollments
        : enrollments.filter(e => e.status === filter);

    if (loading && enrollments.length === 0) return <PageLoader />;

    return (
        <AdminLayout>
            <div>
                <PageHeader
                    title="Enrollments & Leads"
                    description="Manage incoming student registrations and inquiries."
                    primaryAction={
                        <div className="flex gap-2 text-sm bg-white border rounded-lg p-1 shadow-sm">
                            {['all', 'new', 'contacted', 'enrolled', 'rejected'].map(s => (
                                <button
                                    key={s}
                                    onClick={() => setFilter(s)}
                                    className={`px-3 py-1 rounded-md transition-colors ${filter === s ? 'bg-blue-100 text-blue-700 font-bold' : 'hover:bg-gray-100 text-gray-500'}`}
                                >
                                    {s.charAt(0).toUpperCase() + s.slice(1)}
                                </button>
                            ))}
                        </div>
                    }
                />

                <div className="space-y-4">
                    {filteredEnrollments.length === 0 ? (
                        <EmptyState title="No enrollments found" description={`No enrollments matching '${filter}' status.`} />
                    ) : (
                        filteredEnrollments.map(enrollment => (
                            <DataCard key={enrollment.id} className="relative overflow-visible">
                                <div className="flex flex-col md:flex-row gap-4 justify-between md:items-start group">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${enrollment.status === 'new' ? 'bg-blue-500 text-white' :
                                                enrollment.status === 'contacted' ? 'bg-orange-100 text-orange-700' :
                                                    enrollment.status === 'enrolled' ? 'bg-green-100 text-green-700' :
                                                        'bg-red-100 text-red-700'
                                                }`}>
                                                {enrollment.status}
                                            </span>
                                            <span className="text-gray-400 text-xs">{new Date(enrollment.createdAt).toLocaleDateString()}</span>
                                        </div>

                                        <h3 className="font-bold text-lg text-gray-900">{enrollment.name}</h3>
                                        <div className="text-sm font-semibold text-blue-600 mb-2">
                                            {enrollment.course?.title || 'Unknown Course'}
                                            {enrollment.batch && <span className="text-gray-500 font-normal"> • {enrollment.batch.name}</span>}
                                        </div>

                                        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600">
                                            <div className="flex items-center gap-1"><Mail size={14} /> {enrollment.email}</div>
                                            <div className="flex items-center gap-1"><Phone size={14} /> {enrollment.phone}</div>
                                            <div className="flex items-center gap-1"><User size={14} /> {enrollment.profession} ({enrollment.qualification})</div>
                                        </div>

                                        {enrollment.message && (
                                            <div className="mt-3 bg-gray-50 p-3 rounded-lg text-sm text-gray-700 border border-gray-100 italic">
                                                "{enrollment.message}"
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex flex-col gap-2 md:items-end min-w-[150px]">
                                        <select
                                            value={enrollment.status}
                                            onChange={(e) => {
                                                updateEnrollmentStatus(enrollment.id, e.target.value)
                                                    .catch(err => console.error("Update failed", err));
                                            }}
                                            className="p-1.5 border rounded text-sm bg-white shadow-sm focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="new">Mark as New</option>
                                            <option value="contacted">Mark as Contacted</option>
                                            <option value="enrolled">Mark as Enrolled</option>
                                            <option value="rejected">Mark as Rejected</option>
                                        </select>

                                        {enrollment.status === 'contacted' && (
                                            <button className="text-xs text-blue-600 hover:underline flex items-center gap-1">
                                                <MessageCircle size={12} /> Add Note
                                            </button>
                                            /* Note functionality simplified for now */
                                        )}
                                    </div>
                                </div>
                            </DataCard>
                        ))
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}

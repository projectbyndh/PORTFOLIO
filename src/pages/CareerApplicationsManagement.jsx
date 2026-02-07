import React, { useState, useEffect } from 'react';
import { Download, Eye, Trash2, Filter, FileText, Mail, Phone, Calendar, X, ExternalLink } from 'lucide-react';
import AdminLayout from '../components/admin/AdminLayout';
import axios from '../api/axios';
import toast from 'react-hot-toast';

export default function CareerApplicationsManagement() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [selectedCV, setSelectedCV] = useState(null);
    const [showCVModal, setShowCVModal] = useState(false);

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/api/career-applications');
            if (response.data.success) {
                setApplications(response.data.data);
            }
        } catch (error) {
            toast.error('Failed to fetch applications');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            const response = await axios.put(`/api/career-applications/${id}`, {
                status: newStatus
            });
            if (response.data.success) {
                toast.success('Status updated successfully');
                fetchApplications();
            }
        } catch (error) {
            toast.error('Failed to update status');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this application?')) return;

        try {
            const response = await axios.delete(`/api/career-applications/${id}`);
            if (response.data.success) {
                toast.success('Application deleted successfully');
                fetchApplications();
            }
        } catch (error) {
            toast.error('Failed to delete application');
        }
    };

    const handleExportExcel = async () => {
        try {
            const response = await axios.get('/api/career-applications/export/excel', {
                responseType: 'blob'
            });

            // Create download link
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `career-applications-${Date.now()}.xlsx`);
            document.body.appendChild(link);
            link.click();
            link.remove();

            toast.success('Excel file downloaded successfully');
        } catch (error) {
            toast.error('Failed to export to Excel');
            console.error(error);
        }
    };

    const handleViewCV = (app) => {
        setSelectedCV(app);
        setShowCVModal(true);
    };

    const filteredApplications = applications.filter(app => {
        if (filter === 'all') return true;
        return app.status === filter;
    });

    const getStatusColor = (status) => {
        const colors = {
            pending: 'bg-yellow-100 text-yellow-800',
            reviewed: 'bg-blue-100 text-blue-800',
            shortlisted: 'bg-green-100 text-green-800',
            rejected: 'bg-red-100 text-red-800'
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    return (
        <AdminLayout>
            <div className="p-6">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-[#1A2A44] mb-2">Career Applications</h1>
                    <p className="text-[#2B4066]/70">Manage job applications and view CVs</p>
                </div>

                {/* Actions Bar */}
                <div className="flex flex-wrap gap-4 mb-6 items-center justify-between">
                    <div className="flex gap-2">
                        <button
                            onClick={() => setFilter('all')}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${filter === 'all' ? 'bg-[#4A8EBC] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            All ({applications.length})
                        </button>
                        <button
                            onClick={() => setFilter('pending')}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${filter === 'pending' ? 'bg-[#4A8EBC] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            Pending ({applications.filter(a => a.status === 'pending').length})
                        </button>
                        <button
                            onClick={() => setFilter('shortlisted')}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${filter === 'shortlisted' ? 'bg-[#4A8EBC] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            Shortlisted ({applications.filter(a => a.status === 'shortlisted').length})
                        </button>
                    </div>

                    <button
                        onClick={handleExportExcel}
                        className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                    >
                        <Download size={18} />
                        Export to Excel
                    </button>
                </div>

                {/* Applications Table */}
                {loading ? (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#4A8EBC]"></div>
                        <p className="mt-4 text-gray-600">Loading applications...</p>
                    </div>
                ) : filteredApplications.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                        <FileText size={48} className="mx-auto text-gray-400 mb-4" />
                        <p className="text-gray-600">No applications found</p>
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Applicant
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Position
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Contact
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Applied Date
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {filteredApplications.map((app) => (
                                        <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-gray-900">{app.fullName}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-900">{app.careerTitle}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col gap-1 text-sm">
                                                    <div className="flex items-center gap-2 text-gray-600">
                                                        <Mail size={14} />
                                                        {app.email}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-gray-600">
                                                        <Phone size={14} />
                                                        {app.phone}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <Calendar size={14} />
                                                    {new Date(app.createdAt).toLocaleDateString()}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <select
                                                    value={app.status}
                                                    onChange={(e) => handleStatusChange(app.id, e.target.value)}
                                                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="reviewed">Reviewed</option>
                                                    <option value="shortlisted">Shortlisted</option>
                                                    <option value="rejected">Rejected</option>
                                                </select>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => handleViewCV(app)}
                                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                        title="View CV"
                                                    >
                                                        <Eye size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(app.id)}
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="Delete"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* CV Viewer Modal */}
                {showCVModal && selectedCV && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col">
                            {/* Modal Header */}
                            <div className="flex items-center justify-between p-6 border-b border-gray-200">
                                <div>
                                    <h2 className="text-2xl font-bold text-[#1A2A44]">{selectedCV.fullName}'s Resume</h2>
                                    <p className="text-sm text-gray-600 mt-1">
                                        Applied for: <span className="font-medium text-[#4A8EBC]">{selectedCV.careerTitle}</span>
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <a
                                        href={selectedCV.cvUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-4 py-2 bg-[#4A8EBC] text-white rounded-lg hover:bg-[#3B5488] transition-colors"
                                    >
                                        <ExternalLink size={18} />
                                        Open in New Tab
                                    </a>
                                    <button
                                        onClick={() => setShowCVModal(false)}
                                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                    >
                                        <X size={24} className="text-gray-600" />
                                    </button>
                                </div>
                            </div>

                            {/* Modal Body - CV Viewer */}
                            <div className="flex-1 overflow-hidden p-6">
                                <div className="w-full h-full bg-gray-100 rounded-lg overflow-hidden">
                                    {selectedCV.cvUrl.toLowerCase().endsWith('.pdf') ? (
                                        <iframe
                                            src={`https://docs.google.com/viewer?url=${encodeURIComponent(selectedCV.cvUrl)}&embedded=true`}
                                            className="w-full h-full"
                                            title="CV Preview"
                                        />
                                    ) : selectedCV.cvUrl.toLowerCase().match(/\.(doc|docx)$/) ? (
                                        <iframe
                                            src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(selectedCV.cvUrl)}`}
                                            className="w-full h-full"
                                            title="CV Preview"
                                        />
                                    ) : (
                                        <div className="flex flex-col items-center justify-center h-full">
                                            <FileText size={64} className="text-gray-400 mb-4" />
                                            <p className="text-gray-600 mb-4">
                                                Preview not available for this file type
                                            </p>
                                            <a
                                                href={selectedCV.cvUrl}
                                                download
                                                className="flex items-center gap-2 px-6 py-3 bg-[#4A8EBC] text-white rounded-lg hover:bg-[#3B5488] transition-colors"
                                            >
                                                <Download size={18} />
                                                Download CV
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="p-6 border-t border-gray-200 bg-gray-50">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                    <div>
                                        <p className="text-gray-600">Email</p>
                                        <p className="font-medium text-gray-900">{selectedCV.email}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">Phone</p>
                                        <p className="font-medium text-gray-900">{selectedCV.phone}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">Applied Date</p>
                                        <p className="font-medium text-gray-900">
                                            {new Date(selectedCV.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">Status</p>
                                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedCV.status)}`}>
                                            {selectedCV.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}

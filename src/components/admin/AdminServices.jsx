import React, { useState, useEffect } from 'react';
import { PlusCircle, Edit, Trash2, RefreshCw } from 'lucide-react';
import AdminLayout from './AdminLayout';
import ServiceForm from '../ServiceForm';
import useServices from '../../hooks/useServices';
import toast from 'react-hot-toast';
import { getImageUrl } from '../../utils/getImageUrl';

export default function AdminServices() {
    const { services, loading, fetchServices, deleteService } = useServices();
    const [showForm, setShowForm] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(null);

    useEffect(() => {
        fetchServices();
    }, []);

    const handleEdit = (service) => {
        setSelectedService(service);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this service?')) return;

        setDeleteLoading(id);
        try {
            await deleteService(id);
            toast.success('Service deleted successfully');
        } catch (error) {
            toast.error('Failed to delete service');
        } finally {
            setDeleteLoading(null);
        }
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setSelectedService(null);
        fetchServices();
    };

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-black text-[#1A2A44]">Services</h1>
                        <p className="text-[#2B4066]/60 mt-1">Manage your services</p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => fetchServices()}
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
                            Add Service
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-[#4A8EBC]/10 shadow-sm overflow-hidden min-h-[400px]">
                    {loading && services.length === 0 ? (
                        <div className="flex justify-center items-center h-full">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4A8EBC]"></div>
                        </div>
                    ) : services.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center py-20">
                            <div className="w-20 h-20 bg-[#F5FAFF] rounded-full flex items-center justify-center mb-4">
                                <PlusCircle className="w-10 h-10 text-[#4A8EBC]/40" />
                            </div>
                            <p className="text-[#2B4066] font-semibold text-lg mb-2">No services found</p>
                            <p className="text-[#2B4066]/60 mb-6 max-w-sm">List your services to let clients know what you offer.</p>
                            <button
                                onClick={() => setShowForm(true)}
                                className="px-6 py-3 bg-gradient-to-r from-[#4A8EBC] to-[#3B5488] text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                            >
                                Add First Service
                            </button>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-[#F5FAFF] border-b border-[#4A8EBC]/10">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-[#1A2A44] uppercase tracking-wider">Service Name</th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-[#1A2A44] uppercase tracking-wider">Description</th>
                                        <th className="px-6 py-4 text-right text-sm font-bold text-[#1A2A44] uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#4A8EBC]/5">
                                    {services.map((service) => (
                                        <tr key={service._id} className="hover:bg-[#F5FAFF]/50 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    {service.logo && (
                                                        <div className="w-10 h-10 rounded-lg bg-white border border-[#4A8EBC]/10 p-1 flex-shrink-0">
                                                            <img
                                                                src={getImageUrl(service.logo, 'service')}
                                                                alt={service.name || service.title}
                                                                className="w-full h-full object-contain"
                                                                onError={(e) => {
                                                                    e.target.onerror = null;
                                                                    e.target.src = getImageUrl(null, 'service');
                                                                }}
                                                            />
                                                        </div>
                                                    )}
                                                    <p className="font-semibold text-[#1A2A44] group-hover:text-[#4A8EBC] transition-colors">{service.name || service.title}</p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 max-w-md">
                                                <p className="text-sm text-[#2B4066]/70 line-clamp-2">{service.description}</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button
                                                        onClick={() => handleEdit(service)}
                                                        className="px-4 py-2 bg-[#4A8EBC]/10 text-[#4A8EBC] rounded-lg hover:bg-[#4A8EBC]/20 transition-all flex items-center gap-2 font-medium"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(service._id)}
                                                        disabled={deleteLoading === service._id}
                                                        className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all flex items-center gap-2 font-medium disabled:opacity-50"
                                                    >
                                                        {deleteLoading === service._id ? (
                                                            <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                                                        ) : (
                                                            <>
                                                                <Trash2 className="w-4 h-4" />
                                                                Delete
                                                            </>
                                                        )}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {showForm && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="p-6 border-b border-neutral-200">
                                <h2 className="text-2xl font-bold text-neutral-900">
                                    {selectedService ? 'Edit Service' : 'Add Service'}
                                </h2>
                            </div>
                            <div className="p-6">
                                <ServiceForm
                                    service={selectedService}
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

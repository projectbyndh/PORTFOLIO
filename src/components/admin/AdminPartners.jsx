import React, { useState, useEffect } from 'react';
import { PlusCircle, Edit, Trash2, RefreshCw, Eye } from 'lucide-react';
import AdminLayout from './AdminLayout';
import PartnerForm from '../PartnerForm';
import usePartners from '../../hooks/usePartners';
import toast from 'react-hot-toast';
import { getImageUrl } from '../../utils/getImageUrl';

export default function AdminPartners() {
    const { partners, loading, fetchPartners, deletePartner } = usePartners();
    const [showForm, setShowForm] = useState(false);
    const [selectedPartner, setSelectedPartner] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(null);

    useEffect(() => {
        fetchPartners();
    }, []);

    const handleEdit = (partner) => {
        setSelectedPartner(partner);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this partner?')) return;

        setDeleteLoading(id);
        try {
            await deletePartner(id);
            toast.success('Partner deleted successfully');
        } catch (error) {
            toast.error('Failed to delete partner');
        } finally {
            setDeleteLoading(null);
        }
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setSelectedPartner(null);
        fetchPartners();
    };

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-black text-[#26a8df]">Partners</h1>
                        <p className="text-[#26a8df]/60 mt-1">Manage your business partners</p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => fetchPartners()}
                            disabled={loading}
                            className="px-4 py-2 bg-white border border-[#26a8df]/20 text-[#26a8df] rounded-xl hover:bg-[#26a8df]/10 transition-all font-semibold"
                        >
                            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                        </button>
                        <button
                            onClick={() => setShowForm(true)}
                            className="px-6 py-3 bg-gradient-to-r from-[#26a8df] to-[#26a8df] text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-[#26a8df]/30 transition-all flex items-center gap-2"
                        >
                            <PlusCircle className="w-5 h-5" />
                            Add Partner
                        </button>
                    </div>
                </div>

                {/* Partners Grid */}
                <div className="bg-white rounded-2xl border border-[#26a8df]/10 shadow-sm overflow-hidden min-h-[400px]">
                    {loading && partners.length === 0 ? (
                        <div className="flex justify-center items-center h-full">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#26a8df]"></div>
                        </div>
                    ) : partners.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center py-20">
                            <div className="w-20 h-20 bg-[#F5FAFF] rounded-full flex items-center justify-center mb-4">
                                <Eye className="w-10 h-10 text-[#26a8df]/40" />
                            </div>
                            <p className="text-[#26a8df] font-semibold text-lg mb-2">No partners found</p>
                            <p className="text-[#26a8df]/60 mb-6 max-w-sm">Get started by adding your first partner to the portfolio.</p>
                            <button
                                onClick={() => setShowForm(true)}
                                className="px-6 py-3 bg-gradient-to-r from-[#26a8df] to-[#26a8df] text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                            >
                                Add First Partner
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                            {partners.map((partner, index) => (
                                <div
                                    key={partner.id || partner._id || index}
                                    className="group relative bg-white border border-[#26a8df]/10 rounded-2xl p-6 hover:shadow-xl hover:shadow-[#26a8df]/10 transition-all duration-300"
                                >
                                    <div className="aspect-video bg-[#F5FAFF] rounded-xl mb-4 flex items-center justify-center overflow-hidden border border-[#26a8df]/5">
                                        <img
                                            src={getImageUrl(partner.image, 'service')}
                                            alt={partner.name}
                                            className="max-w-full max-h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = getImageUrl(null, 'service');
                                            }}
                                        />
                                    </div>
                                    <h3 className="font-bold text-[#26a8df] mb-4 group-hover:text-[#26a8df] transition-colors">{partner.name}</h3>
                                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                        <button
                                            onClick={() => handleEdit(partner)}
                                            className="flex-1 px-4 py-2 bg-[#26a8df]/10 text-[#26a8df] rounded-lg hover:bg-[#26a8df]/20 transition-all flex items-center justify-center gap-2 font-medium"
                                        >
                                            <Edit className="w-4 h-4" />
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(partner.id || partner._id)}
                                            disabled={deleteLoading === (partner.id || partner._id)}
                                            className="flex-1 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all flex items-center justify-center gap-2 font-medium disabled:opacity-50"
                                        >
                                            {deleteLoading === (partner.id || partner._id) ? (
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
                                <h2 className="text-2xl font-bold text-[#26a8df]">
                                    {selectedPartner ? 'Edit Partner' : 'Add Partner'}
                                </h2>
                            </div>
                            <div className="p-6">
                                <PartnerForm
                                    partner={selectedPartner}
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

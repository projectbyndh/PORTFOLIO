import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, RefreshCw, X, Sparkles, Building2, AlertCircle } from 'lucide-react';
import usePartners from '../hooks/usePartners';
import PartnerForm from '../components/PartnerForm';
import Loader from '../components/Loader';

const PartnerManagement = () => {
  const { partners, loading, error, deletePartner, fetchPartners } = usePartners();
  const [showForm, setShowForm] = useState(false);
  const [editingPartner, setEditingPartner] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // Fetch partners on mount
  useEffect(() => {
    fetchPartners();
  }, []);

  const handleEdit = (partner) => {
    setEditingPartner(partner);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this partner?')) {
      try {
        setDeletingId(id);
        await deletePartner(id);
      } catch (err) {
        // Error handled in hook
      } finally {
        setDeletingId(null);
      }
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingPartner(null);
  };

  const handleRetry = () => {
    fetchPartners();
  };

  // Loading state
  if (loading && partners.length === 0 && !error) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        <Loader />
      </div>
    );
  }

  // Error state
  if (error && partners.length === 0) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/60 backdrop-blur-2xl rounded-[2rem] p-12 border border-white/60 shadow-lg text-center"
          >
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
            <h2 className="text-2xl font-black text-[#26a8df] mb-4">Failed to Load Partners</h2>
            <p className="text-neutral-600 mb-8">{error}</p>
            <button
              onClick={handleRetry}
              className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-[#26a8df] to-[#26a8df] text-white font-bold py-3 px-8 rounded-2xl shadow-[0_0_20px_rgba(74,142,188,0.3)] hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
              <RefreshCw size={18} className="relative z-10" />
              <span className="relative z-10">Retry</span>
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] relative overflow-hidden">
      {/* Grain texture */}
      <div className="fixed inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none z-0" />

      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-[#26a8df]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#26a8df]/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm border border-white/40 rounded-full mb-4 shadow-sm">
                <Building2 size={14} className="text-[#26a8df]" />
                <span className="text-xs font-bold uppercase tracking-widest text-neutral-600">Management</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-[#26a8df] tracking-tight">
                Partner <span className="text-brand-primary">Directory</span>
              </h1>
              <p className="text-neutral-600 mt-4 text-lg">Manage your trusted partners and collaborators</p>
            </div>

            <button
              onClick={() => setShowForm(true)}
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-[#26a8df] to-[#26a8df] text-white font-bold py-4 px-8 rounded-2xl shadow-[0_0_30px_rgba(74,142,188,0.4),0_8px_16px_rgba(74,142,188,0.2)] hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#5A9ECC] to-[#4B84A8] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Plus size={20} className="relative z-10" />
              <span className="relative z-10">Add Partner</span>
            </button>
          </div>
        </motion.div>

        {/* Form Modal */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-neutral-900/60 backdrop-blur-md flex items-center justify-center z-50 p-4"
              onClick={handleFormClose}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="bg-white/95 backdrop-blur-2xl rounded-[2rem] shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/60"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-8">
                  <div className="flex justify-between items-center mb-8 pb-6 border-b border-neutral-200">
                    <h2 className="text-3xl font-black text-[#26a8df]">
                      {editingPartner ? 'Edit Partner' : 'Add New Partner'}
                    </h2>
                    <button
                      onClick={handleFormClose}
                      className="p-2 text-neutral-400 hover:text-[#26a8df] hover:bg-neutral-100 rounded-xl transition-all duration-200"
                    >
                      <X size={24} />
                    </button>
                  </div>
                  <PartnerForm
                    partner={editingPartner}
                    onClose={handleFormClose}
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Partners Grid */}
        {partners.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/60 backdrop-blur-2xl rounded-[2rem] p-16 border border-white/60 shadow-lg text-center"
          >
            <Building2 className="w-16 h-16 text-neutral-300 mx-auto mb-6" />
            <h3 className="text-2xl font-black text-[#26a8df] mb-4">No Partners Yet</h3>
            <p className="text-neutral-600 mb-8">Start building your partner network by adding your first partner.</p>
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 text-[#26a8df] font-bold hover:gap-3 transition-all"
            >
              <Plus size={20} />
              Add Your First Partner
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {partners.map((partner, index) => (
              <motion.div
                key={partner._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group relative bg-white/70 backdrop-blur-xl rounded-[1.5rem] p-6 border border-white/60 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#26a8df]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[1.5rem]" />

                <div className="relative z-10">
                  {/* Partner Image */}
                  <div className="mb-6 flex justify-center">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#26a8df]/20 to-[#26a8df]/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative w-24 h-24 rounded-2xl bg-white border border-neutral-200/50 shadow-lg group-hover:shadow-xl group-hover:border-[#26a8df]/30 transition-all duration-300 p-3 flex items-center justify-center overflow-hidden">
                        <img
                          src={partner.image}
                          alt={partner.name}
                          className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                          onError={(e) => {
                            e.target.src = '/placeholder-partner.png';
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Partner Name */}
                  <h3 className="text-lg font-black text-[#26a8df] text-center mb-6 group-hover:text-[#26a8df] transition-colors">
                    {partner.name}
                  </h3>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleEdit(partner)}
                      className="flex-1 flex items-center justify-center gap-2 bg-neutral-100 hover:bg-[#26a8df] text-[#0D1641] hover:text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 border border-neutral-200 hover:border-[#26a8df]"
                    >
                      <Edit2 size={16} />
                      <span className="text-sm">Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(partner._id)}
                      disabled={deletingId === partner._id}
                      className="flex-1 flex items-center justify-center gap-2 bg-red-50 hover:bg-red-500 text-red-600 hover:text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border border-red-200 hover:border-red-500"
                    >
                      {deletingId === partner._id ? (
                        <>
                          <RefreshCw size={16} className="animate-spin" />
                          <span className="text-sm">Deleting...</span>
                        </>
                      ) : (
                        <>
                          <Trash2 size={16} />
                          <span className="text-sm">Delete</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PartnerManagement;

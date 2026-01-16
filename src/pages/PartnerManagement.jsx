import React, { useState } from 'react';
import usePartners from '../hooks/usePartners';
import PartnerForm from '../components/PartnerForm';
import Loader from '../components/Loader';

const PartnerManagement = () => {
  const { partners, loading, error, deletePartner, fetchPartners } = usePartners();
  const [showForm, setShowForm] = useState(false);
  const [editingPartner, setEditingPartner] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

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

  if (loading && partners.length === 0) return <Loader />;
  if (error && partners.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-8">
          <div className="text-red-500 mb-4">{error}</div>
          <button
            onClick={handleRetry}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Partner Management</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Partner
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-[#1A2A44]/40 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl shadow-[#1A2A44]/20 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#4A8EBC]/10">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-[#4A8EBC]/10">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-[#1A2A44] to-[#4A8EBC] bg-clip-text text-transparent">
                  {editingPartner ? 'Edit Partner' : 'Add Partner'}
                </h2>
                <button
                  onClick={handleFormClose}
                  className="p-2 text-[#4A8EBC] hover:bg-[#4A8EBC]/10 rounded-xl transition-all duration-200 text-2xl leading-none"
                >
                  ×
                </button>
              </div>
              <PartnerForm
                partner={editingPartner}
                onClose={handleFormClose}
              />
            </div>
          </div>
        </div>
      )}

      {partners.length === 0 ? (
        <div className="text-center py-8 text-gray-500">No partners found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {partners.map((partner) => (
            <div
              key={partner._id}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <div className="flex flex-col items-center mb-4">
                <img
                  src={partner.image}
                  alt={partner.name}
                  className="w-20 h-20 object-contain mb-2 rounded-lg"
                  onError={(e) => {
                    e.target.src = '/placeholder-partner.png';
                  }}
                />
                <h3 className="text-lg font-semibold text-center">{partner.name}</h3>
              </div>
              <div className="flex justify-between">
                <button
                  onClick={() => handleEdit(partner)}
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(partner._id)}
                  disabled={deletingId === partner._id}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm disabled:opacity-50"
                >
                  {deletingId === partner._id ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PartnerManagement;
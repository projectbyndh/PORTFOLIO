import React, { useState } from 'react';
import usePartners from '../hooks/usePartners';
import PartnerForm from '../components/PartnerForm';
import Loader from '../components/Loader';

const PartnerManagement = () => {
  const { partners, loading, error, deletePartner } = usePartners();
  const [showForm, setShowForm] = useState(false);
  const [editingPartner, setEditingPartner] = useState(null);

  const handleEdit = (partner) => {
    setEditingPartner(partner);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this partner?')) {
      try {
        await deletePartner(id);
      } catch (err) {
        // Error handled in hook
      }
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingPartner(null);
  };

  if (loading) return <Loader />;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

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
        <div className="mb-8">
          <PartnerForm
            partner={editingPartner}
            onClose={handleFormClose}
          />
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
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm"
                >
                  Delete
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
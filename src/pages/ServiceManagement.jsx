import React, { useState } from 'react';
import useServices from '../hooks/useServices';
import ServiceForm from '../components/ServiceForm';
import Loader from '../components/Loader';

const ServiceManagement = () => {
  const { services, loading, error, deleteService, fetchServices } = useServices();
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const handleEdit = (service) => {
    setEditingService(service);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        setDeletingId(id);
        await deleteService(id);
      } catch (err) {
        // Error handled in hook
      } finally {
        setDeletingId(null);
      }
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingService(null);
  };

  const handleRetry = () => {
    fetchServices();
  };

  if (loading && services.length === 0) return <Loader />;
  if (error && services.length === 0) {
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Service Management</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add New Service
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service._id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              {service.logo && (
                <div className="flex justify-center mb-4">
                  <img
                    src={service.logo}
                    alt={service.title}
                    className="w-16 h-16 object-contain"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              )}
              <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">{service.title}</h3>
              <p className="text-gray-600 mb-4 line-clamp-3 text-center">{service.description}</p>

              <div className="flex justify-center space-x-2">
                <button
                  onClick={() => handleEdit(service)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
                  disabled={deletingId === service._id}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(service._id)}
                  disabled={deletingId === service._id}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm disabled:opacity-50"
                >
                  {deletingId === service._id ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {services.length === 0 && !loading && (
        <div className="text-center py-8">
          <p className="text-gray-500">No services found. Add your first service!</p>
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-[#26a8df]/40 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl shadow-[#26a8df]/20 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#26a8df]/10">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-[#26a8df]/10">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-[#26a8df] to-[#26a8df] bg-clip-text text-transparent">
                  {editingService ? 'Edit Service' : 'Add New Service'}
                </h2>
                <button
                  onClick={handleFormClose}
                  className="p-2 text-[#26a8df] hover:bg-[#26a8df]/10 rounded-xl transition-all duration-200 text-2xl leading-none"
                >
                  ×
                </button>
              </div>
              <ServiceForm
                service={editingService}
                onClose={handleFormClose}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceManagement;
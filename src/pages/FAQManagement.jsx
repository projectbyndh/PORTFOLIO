import React, { useState, useEffect } from 'react';
import useFAQs from '../hooks/useFAQs';
import FAQForm from '../components/FAQForm';
import Loader from '../components/Loader';

import AdminLayout from '../components/admin/AdminLayout';

const FAQManagement = () => {
  const { faqs, loading, error, deleteFAQ, fetchFAQs } = useFAQs();
  const [showForm, setShowForm] = useState(false);
  const [editingFAQ, setEditingFAQ] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // Fetch FAQs on component mount
  useEffect(() => {
    fetchFAQs();
  }, []);

  const handleEdit = (faq) => {
    setEditingFAQ(faq);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!id) {
      toast.error('Invalid FAQ ID');
      return;
    }

    if (window.confirm('Are you sure you want to delete this FAQ?')) {
      try {
        setDeletingId(id);
        await deleteFAQ(id);
      } catch (err) {
        // Error handled in hook
      } finally {
        setDeletingId(null);
      }
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingFAQ(null);
  };

  const handleRetry = () => {
    fetchFAQs();
  };

  if (loading && faqs.length === 0) return <Loader />;

  // Wrap error state in AdminLayout too if desired, or just main return
  if (error && faqs.length === 0) {
    return (
      <AdminLayout>
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
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">FAQ Management</h1>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add New FAQ
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Q: {faq.question}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    A: {faq.answer}
                  </p>
                  <div className="text-sm text-gray-500">
                    Created: {new Date(faq.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex space-x-2 ml-4">
                  <button
                    onClick={() => handleEdit(faq)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
                    disabled={deletingId === faq.id}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(faq.id)}
                    disabled={deletingId === faq.id}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm disabled:opacity-50"
                  >
                    {deletingId === faq.id ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {faqs.length === 0 && !loading && (
          <div className="text-center py-8">
            <p className="text-gray-500">No FAQs found. Add your first FAQ!</p>
          </div>
        )}

        {showForm && (
          <div className="fixed inset-0 bg-[#26a8df]/40 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl shadow-[#26a8df]/20 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#26a8df]/10">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-[#26a8df]/10">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-[#26a8df] to-[#26a8df] bg-clip-text text-transparent">
                    {editingFAQ ? 'Edit FAQ' : 'Add New FAQ'}
                  </h2>
                  <button
                    onClick={handleFormClose}
                    className="p-2 text-[#26a8df] hover:bg-[#26a8df]/10 rounded-xl transition-all duration-200 text-2xl leading-none"
                  >
                    ×
                  </button>
                </div>
                <FAQForm
                  faq={editingFAQ}
                  onClose={handleFormClose}
                  onSuccess={fetchFAQs}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default FAQManagement;
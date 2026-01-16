import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, RefreshCw, ArrowLeft } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import { useCareers } from '../hooks/useCareers';
import CareerList from '../components/CareerList';
import CareerForm from '../components/CareerForm';
import useAuthStore from '../Store/useAuthStore';

/**
 * CareerManagement Page - Complete career management interface
 * Features: List careers, create, edit, delete with image upload
 */
const CareerManagement = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const {
    careers,
    loading,
    error,
    fetchCareers,
    createCareer,
    updateCareer,
    deleteCareer,
    uploadImage,
  } = useCareers();

  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCareer, setEditingCareer] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
      return;
    }

    // Fetch careers on mount
    fetchCareers().catch(err => {
      console.error('Failed to load careers:', err);
    });
  }, [isAuthenticated, navigate, fetchCareers]);

  // Handle create career
  const handleCreateCareer = async (careerData) => {
    await createCareer(careerData);
  };

  // Handle update career
  const handleUpdateCareer = async (careerData) => {
    if (editingCareer) {
      await updateCareer(editingCareer._id, careerData);
      setEditingCareer(null);
    }
  };

  // Handle delete career
  const handleDeleteCareer = async (careerId) => {
    if (!confirm('Are you sure you want to delete this career posting? This action cannot be undone.')) {
      return;
    }

    setDeletingId(careerId);
    try {
      await deleteCareer(careerId);
    } catch (error) {
      // Error handled by hook
    } finally {
      setDeletingId(null);
    }
  };

  // Handle edit career
  const handleEditCareer = (career) => {
    setEditingCareer(career);
    setIsFormOpen(true);
  };

  // Handle form submit
  const handleFormSubmit = async (careerData) => {
    if (editingCareer) {
      await handleUpdateCareer(careerData);
    } else {
      await handleCreateCareer(careerData);
    }
  };

  // Handle image upload with loading state
  const handleImageUpload = async (file) => {
    setUploadingImage(true);
    try {
      const result = await uploadImage(file);
      return result;
    } finally {
      setUploadingImage(false);
    }
  };

  // Close modal
  const closeModal = () => {
    setIsFormOpen(false);
    setEditingCareer(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toaster for notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10B981',
              secondary: '#fff',
            },
          },
          error: {
            duration: 5000,
            iconTheme: {
              primary: '#EF4444',
              secondary: '#fff',
            },
          },
        }}
      />

      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Back Button */}
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Dashboard
            </button>

            {/* Title */}
            <h1 className="text-xl font-semibold text-gray-900">Career Management</h1>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => fetchCareers()}
                disabled={loading}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-100 disabled:cursor-not-allowed rounded-md transition-colors"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>

              <button
                onClick={() => setIsFormOpen(true)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add New Career
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Positions</p>
                <p className="text-2xl font-bold text-gray-900">{careers.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Plus className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Postings</p>
                <p className="text-2xl font-bold text-green-600">{careers.length}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <RefreshCw className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">With Images</p>
                <p className="text-2xl font-bold text-purple-600">
                  {careers.filter(career => career.image).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Plus className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
            <p className="font-medium">Error loading careers:</p>
            <p>{error}</p>
          </div>
        )}

        {/* Career List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6">
            <CareerList
              careers={careers}
              loading={loading}
              onEdit={handleEditCareer}
              onDelete={handleDeleteCareer}
              deletingId={deletingId}
            />
          </div>
        </div>
      </div>

      {/* Career Form Modal */}
      <CareerForm
        isOpen={isFormOpen}
        onClose={closeModal}
        onSubmit={handleFormSubmit}
        initialData={editingCareer}
        loading={loading}
        uploadImage={handleImageUpload}
        uploadingImage={uploadingImage}
      />
    </div>
  );
};

export default CareerManagement;
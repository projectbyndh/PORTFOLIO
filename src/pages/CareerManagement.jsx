import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, RefreshCw } from 'lucide-react';
import { useCareers } from '../hooks/useCareers';
import CareerList from '../components/CareerList';
import CareerForm from '../components/CareerForm';
import AdminLayout from '../components/admin/AdminLayout';
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
      navigate('/ndh-admin/login');
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
      await updateCareer(editingCareer.id || editingCareer._id, careerData);
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
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-[#26a8df]">Careers</h1>
            <p className="text-[#26a8df]/60 mt-1">Manage job openings</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => fetchCareers()}
              disabled={loading}
              className="px-4 py-2 bg-white border border-[#26a8df]/20 text-[#26a8df] rounded-xl hover:bg-[#26a8df]/10 transition-all font-semibold"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={() => setIsFormOpen(true)}
              className="px-6 py-3 bg-gradient-to-r from-[#26a8df] to-[#26a8df] text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-[#26a8df]/30 transition-all flex items-center gap-2"
            >
              <PlusCircle className="w-5 h-5" />
              Add Position
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
            <p className="font-medium">Error loading careers:</p>
            <p>{error}</p>
          </div>
        )}

        {/* Career List Container */}
        <div className="bg-white rounded-2xl border border-[#26a8df]/10 shadow-sm overflow-hidden min-h-[400px]">
          <div className="p-0">
            <CareerList
              careers={careers}
              loading={loading}
              onEdit={handleEditCareer}
              onDelete={handleDeleteCareer}
              deletingId={deletingId}
            />
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
    </AdminLayout>
  );
};

export default CareerManagement;
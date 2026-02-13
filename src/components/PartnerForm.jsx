import React, { useState, useEffect } from 'react';
import usePartners from '../hooks/usePartners';
import ImageUploadPreview from './ImageUploadPreview';

const PartnerForm = ({ partner, onClose }) => {
  const { createPartner, updatePartnerById, uploadImage } = usePartners();
  const [submitting, setSubmitting] = useState(false);
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [formData, setFormData] = useState({
    name: partner?.name || ''
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Partner name is required';
    }
    if (!partner && !selectedImageFile) {
      newErrors.image = 'Partner logo is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setSubmitting(true);

      const partnerData = {
        name: formData.name,
        imageFile: selectedImageFile, // Pass the file directly
        image: partner?.image // Keep existing image if editing and no new file
      };

      if (partner) {
        await updatePartnerById(partner._id, partnerData);
      } else {
        await createPartner(partnerData);
      }
      onClose();
    } catch (err) {
      // Error handled in hook
      console.error('Form submission error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative">
      {submitting && (
        <div className="absolute inset-0 bg-white/75 backdrop-blur-sm flex items-center justify-center z-10 rounded-xl">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#26a8df] mx-auto mb-2"></div>
            <p className="text-sm text-[#26a8df]">Saving...</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-[#26a8df] mb-2">
            Partner Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            disabled={submitting}
            className="w-full px-4 py-3 border-2 border-[#26a8df]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#26a8df]/30 focus:border-[#26a8df] transition-all duration-200 disabled:bg-gray-100"
            placeholder="Enter partner name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#26a8df] mb-2">
            Partner Logo
          </label>
          <ImageUploadPreview
            currentImage={partner?.image}
            onImageUpload={(file) => {
              setSelectedImageFile(file);
              // Clear image error when file is selected
              if (errors.image) {
                setErrors(prev => ({
                  ...prev,
                  image: ''
                }));
              }
            }}
            onImageRemove={() => setSelectedImageFile(null)}
            showUploadButton={false}
          />
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">{errors.image}</p>
          )}
        </div>

        <div className="flex justify-end gap-3 pt-6 border-t border-[#26a8df]/10">
          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            className="px-6 py-2.5 text-sm font-semibold text-[#26a8df] bg-[#26a8df]/5 hover:bg-[#26a8df]/10 rounded-xl transition-all duration-200 border border-[#26a8df]/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-[#26a8df] to-[#26a8df] hover:shadow-lg hover:shadow-[#26a8df]/25 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-all duration-200"
          >
            {submitting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Saving...
              </div>
            ) : (partner ? 'Update Partner' : 'Create Partner')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PartnerForm;
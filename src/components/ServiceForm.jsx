import React, { useState, useEffect } from 'react';
import useServices from '../hooks/useServices';
import ImageUploadPreview from './ImageUploadPreview';

const ServiceForm = ({ service, onClose }) => {
  const { createService, updateService } = useServices();
  const [submitting, setSubmitting] = useState(false);
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [formData, setFormData] = useState({
    title: service?.title || '',
    description: service?.description || '',
    tagline: service?.tagline || '',
    capabilities: service?.capabilities ? service.capabilities.join(', ') : ''
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
    if (!formData.title.trim()) {
      newErrors.title = 'Service title is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Service description is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setSubmitting(true);
      const serviceData = {
        title: formData.title,
        description: formData.description,
        tagline: formData.tagline,
        capabilities: formData.capabilities.split(',').map(cap => cap.trim()).filter(cap => cap !== ''),
        logo: selectedImageFile
      };

      if (service) {
        await updateService(service.id || service._id, serviceData);
      } else {
        await createService(serviceData);
      }
      onClose();
    } catch (err) {
      // Error handled in hook
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative">
      {submitting && (
        <div className="absolute inset-0 bg-white/75 backdrop-blur-sm flex items-center justify-center z-10 rounded-xl">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#4A8EBC] mx-auto mb-2"></div>
            <p className="text-sm text-[#4A8EBC]">Saving...</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-[#1A2A44] mb-2">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 border-[#4A8EBC]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4A8EBC]/30 focus:border-[#4A8EBC] transition-all duration-200"
            placeholder="Enter service title"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#1A2A44] mb-2">
            Tagline
          </label>
          <input
            type="text"
            name="tagline"
            value={formData.tagline}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 border-[#4A8EBC]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4A8EBC]/30 focus:border-[#4A8EBC] transition-all duration-200"
            placeholder="Enter tagline (e.g. High-Availability Ecosystems)"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#1A2A44] mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-4 py-3 border-2 border-[#4A8EBC]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4A8EBC]/30 focus:border-[#4A8EBC] transition-all duration-200"
            placeholder="Enter service description"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#1A2A44] mb-2">
            Capabilities
          </label>
          <textarea
            name="capabilities"
            value={formData.capabilities}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-4 py-3 border-2 border-[#4A8EBC]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4A8EBC]/30 focus:border-[#4A8EBC] transition-all duration-200"
            placeholder="Enter capabilities separated by commas (e.g. Edge Computing, Real-time Hydration)"
          />
          <p className="text-xs text-[#2B4066]/50 mt-1 italic">Separate each capability with a comma</p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#1A2A44] mb-2">
            Logo
          </label>
          <ImageUploadPreview
            currentImage={service?.logo}
            onImageUpload={async (file) => {
              setSelectedImageFile(file);
              return file;
            }}
            onImageRemove={() => setSelectedImageFile(null)}
          />
        </div>

        <div className="flex justify-end gap-3 pt-6 border-t border-[#4A8EBC]/10">
          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            className="px-6 py-2.5 text-sm font-semibold text-[#4A8EBC] bg-[#4A8EBC]/5 hover:bg-[#4A8EBC]/10 rounded-xl transition-all duration-200 border border-[#4A8EBC]/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-[#4A8EBC] to-[#3B5488] hover:shadow-lg hover:shadow-[#4A8EBC]/25 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-all duration-200"
          >
            {submitting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Saving...
              </div>
            ) : (service ? 'Update Service' : 'Create Service')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ServiceForm;
import React, { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Loader2, Save, Plus, Trash2 } from 'lucide-react';
import ImageUploadPreview from './ImageUploadPreview';

// Validation schema
const careerSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  image: z.string().optional(),
  requirements: z.array(z.string().min(1, 'Requirement cannot be empty')).min(1, 'At least one requirement is required'),
  responsibilities: z.array(z.string().min(1, 'Responsibility cannot be empty')).min(1, 'At least one responsibility is required'),
  applyLink: z.string().url('Must be a valid URL').min(1, 'Apply link is required'),
  location: z.string().min(1, 'Location is required').max(100, 'Location must be less than 100 characters'),
});

/**
 * CareerForm Component - Modal for creating/editing careers
 */
const CareerForm = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
  loading = false,
  uploadImage,
  uploadingImage = false
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
    control
  } = useForm({
    resolver: zodResolver(careerSchema),
    defaultValues: {
      title: '',
      description: '',
      image: '',
      requirements: [''],
      responsibilities: [''],
      applyLink: '',
      location: '',
    },
  });

  const {
    fields: requirementFields,
    append: appendRequirement,
    remove: removeRequirement,
  } = useFieldArray({
    control,
    name: 'requirements',
  });

  const {
    fields: responsibilityFields,
    append: appendResponsibility,
    remove: removeResponsibility,
  } = useFieldArray({
    control,
    name: 'responsibilities',
  });

  const currentImage = watch('image');

  // Reset form when modal opens/closes or initialData changes
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        // Edit mode
        reset({
          title: initialData.title || '',
          description: initialData.description || '',
          image: initialData.image || '',
          requirements: initialData.requirements || [''],
          responsibilities: initialData.responsibilities || [''],
          applyLink: initialData.applyLink || '',
          location: initialData.location || '',
        });
      } else {
        // Create mode
        reset({
          title: '',
          description: '',
          image: '',
          requirements: [''],
          responsibilities: [''],
          applyLink: '',
          location: '',
        });
      }
    }
  }, [isOpen, initialData, reset]);

  // Handle form submission
  const handleFormSubmit = async (data) => {
    try {
      await onSubmit(data);
      onClose(); // Close modal on success
    } catch (error) {
      // Error is handled by the hook
      console.error('Form submission failed:', error);
    }
  };

  // Handle image upload
  const handleImageUpload = async (file) => {
    try {
      const result = await uploadImage(file);
      if (result?.imageUrl) {
        setValue('image', result.imageUrl);
      }
      return result;
    } catch (error) {
      throw error;
    }
  };

  // Handle image removal
  const handleImageRemove = () => {
    setValue('image', '');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {initialData ? 'Edit Career' : 'Create New Career'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6 space-y-6">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Career Image (Optional)
            </label>
            <ImageUploadPreview
              currentImage={currentImage}
              onImageUpload={handleImageUpload}
              onImageRemove={handleImageRemove}
              uploading={uploadingImage}
            />
            {errors.image && (
              <p className="mt-1 text-sm text-red-600">{errors.image.message}</p>
            )}
          </div>

          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Job Title *
            </label>
            <input
              {...register('title')}
              type="text"
              id="title"
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter job title"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
            )}
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
              Location *
            </label>
            <input
              {...register('location')}
              type="text"
              id="location"
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.location ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter job location"
            />
            {errors.location && (
              <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Job Description *
            </label>
            <textarea
              {...register('description')}
              id="description"
              rows={4}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter job description"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
            )}
          </div>

          {/* Requirements */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Requirements *
            </label>
            <div className="space-y-2">
              {requirementFields.map((field, index) => (
                <div key={field.id} className="flex gap-2">
                  <input
                    {...register(`requirements.${index}`)}
                    type="text"
                    className={`flex-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.requirements?.[index] ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder={`Requirement ${index + 1}`}
                  />
                  {requirementFields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeRequirement(index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => appendRequirement('')}
                className="flex items-center gap-2 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Requirement
              </button>
            </div>
            {errors.requirements && (
              <p className="mt-1 text-sm text-red-600">{errors.requirements.message}</p>
            )}
          </div>

          {/* Responsibilities */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Responsibilities *
            </label>
            <div className="space-y-2">
              {responsibilityFields.map((field, index) => (
                <div key={field.id} className="flex gap-2">
                  <input
                    {...register(`responsibilities.${index}`)}
                    type="text"
                    className={`flex-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.responsibilities?.[index] ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder={`Responsibility ${index + 1}`}
                  />
                  {responsibilityFields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeResponsibility(index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => appendResponsibility('')}
                className="flex items-center gap-2 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Responsibility
              </button>
            </div>
            {errors.responsibilities && (
              <p className="mt-1 text-sm text-red-600">{errors.responsibilities.message}</p>
            )}
          </div>

          {/* Apply Link */}
          <div>
            <label htmlFor="applyLink" className="block text-sm font-medium text-gray-700 mb-2">
              Apply Link *
            </label>
            <input
              {...register('applyLink')}
              type="url"
              id="applyLink"
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.applyLink ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="https://example.com/apply"
            />
            {errors.applyLink && (
              <p className="mt-1 text-sm text-red-600">{errors.applyLink.message}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
              disabled={isSubmitting || loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || loading}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed rounded-md transition-colors"
            >
              {isSubmitting || loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {initialData ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  {initialData ? 'Update Career' : 'Create Career'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CareerForm;
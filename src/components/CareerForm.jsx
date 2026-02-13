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
  location: z.string().min(1, 'Location is required').max(100, 'Location must be less than 100 characters'),
  category: z.enum(['CTO', 'CEO', 'CFO', 'Senior Developer', 'Developer', 'Intern'], {
    errorMap: () => ({ message: 'Please select a valid category' }),
  }),
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
      location: '',
      category: 'Developer',
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

  const [selectedFile, setSelectedFile] = React.useState(null);
  const [previewUrl, setPreviewUrl] = React.useState('');
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
          location: initialData.location || '',
          category: initialData.category || 'Developer',
        });
        setPreviewUrl(initialData.image || '');
        setSelectedFile(null);
      } else {
        // Create mode
        reset({
          title: '',
          description: '',
          image: '',
          requirements: [''],
          responsibilities: [''],
          location: '',
          category: 'Developer',
        });
        setPreviewUrl('');
        setSelectedFile(null);
      }
    }
  }, [isOpen, initialData, reset]);

  // Handle form submission
  const handleFormSubmit = async (data) => {
    try {
      // Create a copy of data to modify
      const submissionData = { ...data };

      // If we have a file selected, add it to the submission data
      if (selectedFile) {
        submissionData.image = selectedFile;
      }

      await onSubmit(submissionData);
      onClose(); // Close modal on success
    } catch (error) {
      // Error is handled by the hook
      console.error('Form submission failed:', error);
    }
  };

  // Handle image selection
  const handleImageSelect = (file) => {
    setSelectedFile(file);
    const preview = URL.createObjectURL(file);
    setPreviewUrl(preview);
    setValue('image', ''); // Clear existing image URL
  };

  // Handle image removal
  const handleImageRemove = () => {
    setSelectedFile(null);
    setPreviewUrl('');
    setValue('image', '');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#26a8df]/40 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl shadow-[#26a8df]/20 max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-[#26a8df]/10">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#26a8df]/10 bg-gradient-to-r from-[#26a8df]/5 to-[#26a8df]/5">
          <h2 className="text-xl font-bold bg-gradient-to-r from-[#26a8df] to-[#26a8df] bg-clip-text text-transparent">
            {initialData ? 'Edit Career' : 'Create New Career'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-[#26a8df] hover:bg-[#26a8df]/10 rounded-xl transition-all duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6 space-y-6">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-[#26a8df] mb-2">
              Career Image (Optional)
            </label>
            <ImageUploadPreview
              currentImage={previewUrl || currentImage}
              onImageUpload={handleImageSelect}
              onImageRemove={handleImageRemove}
              uploading={false}
              showUploadButton={false}
            />
            {errors.image && (
              <p className="mt-1 text-sm text-red-500">{errors.image.message}</p>
            )}
          </div>

          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-[#26a8df] mb-2">
              Job Title *
            </label>
            <input
              {...register('title')}
              type="text"
              id="title"
              className={`w-full px-4 py-3 border-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#26a8df]/30 focus:border-[#26a8df] transition-all duration-200 ${errors.title ? 'border-red-400' : 'border-[#26a8df]/20'
                }`}
              placeholder="Enter job title"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-semibold text-[#26a8df] mb-2">
              Location *
            </label>
            <input
              {...register('location')}
              type="text"
              id="location"
              className={`w-full px-4 py-3 border-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#26a8df]/30 focus:border-[#26a8df] transition-all duration-200 ${errors.location ? 'border-red-400' : 'border-[#26a8df]/20'
                }`}
              placeholder="Enter job location"
            />
            {errors.location && (
              <p className="mt-1 text-sm text-red-500">{errors.location.message}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-semibold text-[#26a8df] mb-2">
              Category *
            </label>
            <select
              {...register('category')}
              id="category"
              className={`w-full px-4 py-3 border-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#26a8df]/30 focus:border-[#26a8df] transition-all duration-200 ${errors.category ? 'border-red-400' : 'border-[#26a8df]/20'
                }`}
            >
              <option value="CTO">CTO</option>
              <option value="CEO">CEO</option>
              <option value="CFO">CFO</option>
              <option value="Senior Developer">Senior Developer</option>
              <option value="Developer">Developer</option>
              <option value="Intern">Intern</option>
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-500">{errors.category.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-[#26a8df] mb-2">
              Job Description *
            </label>
            <textarea
              {...register('description')}
              id="description"
              rows={4}
              className={`w-full px-4 py-3 border-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#26a8df]/30 focus:border-[#26a8df] transition-all duration-200 ${errors.description ? 'border-red-400' : 'border-[#26a8df]/20'
                }`}
              placeholder="Enter job description"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>
            )}
          </div>

          {/* Requirements */}
          <div>
            <label className="block text-sm font-semibold text-[#26a8df] mb-2">
              Requirements *
            </label>
            <div className="space-y-2">
              {requirementFields.map((field, index) => (
                <div key={field.id} className="flex gap-2">
                  <input
                    {...register(`requirements.${index}`)}
                    type="text"
                    className={`flex-1 px-4 py-3 border-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#26a8df]/30 focus:border-[#26a8df] transition-all duration-200 ${errors.requirements?.[index] ? 'border-red-400' : 'border-[#26a8df]/20'
                      }`}
                    placeholder={`Requirement ${index + 1}`}
                  />
                  {requirementFields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeRequirement(index)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => appendRequirement('')}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#26a8df] hover:bg-[#26a8df]/10 rounded-xl transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Requirement
              </button>
            </div>
            {errors.requirements && (
              <p className="mt-1 text-sm text-red-500">{errors.requirements.message}</p>
            )}
          </div>

          {/* Responsibilities */}
          <div>
            <label className="block text-sm font-semibold text-[#26a8df] mb-2">
              Responsibilities *
            </label>
            <div className="space-y-2">
              {responsibilityFields.map((field, index) => (
                <div key={field.id} className="flex gap-2">
                  <input
                    {...register(`responsibilities.${index}`)}
                    type="text"
                    className={`flex-1 px-4 py-3 border-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#26a8df]/30 focus:border-[#26a8df] transition-all duration-200 ${errors.responsibilities?.[index] ? 'border-red-400' : 'border-[#26a8df]/20'
                      }`}
                    placeholder={`Responsibility ${index + 1}`}
                  />
                  {responsibilityFields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeResponsibility(index)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => appendResponsibility('')}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#26a8df] hover:bg-[#26a8df]/10 rounded-xl transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Responsibility
              </button>
            </div>
            {errors.responsibilities && (
              <p className="mt-1 text-sm text-red-500">{errors.responsibilities.message}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-6 border-t border-[#26a8df]/10">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-semibold text-[#26a8df] bg-[#26a8df]/10 hover:bg-[#26a8df]/20 rounded-xl transition-all duration-200 border border-[#26a8df]/20"
              disabled={isSubmitting || loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || loading}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-[#26a8df] to-[#26a8df] hover:from-[#26a8df] hover:to-[#26a8df] disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-all duration-200 shadow-lg shadow-[#26a8df]/25"
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
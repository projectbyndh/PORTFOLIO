import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Loader2, Save } from 'lucide-react';
import ImageUploadPreview from './ImageUploadPreview';

// Validation schema
const blogSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
  author: z.string().min(1, 'Author is required').max(100, 'Author must be less than 100 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters').max(2000, 'Description must be less than 2000 characters'),
  image: z.string().optional(),
});

/**
 * BlogForm Component - Modal for creating/editing blogs
 */
const BlogForm = ({
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
    watch
  } = useForm({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: '',
      author: 'NDH Technologies',
      description: '',
      image: '',
    },
  });

  const currentImage = watch('image');

  // Reset form when modal opens/closes or initialData changes
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        // Edit mode
        reset({
          title: initialData.title || '',
          author: initialData.author || 'NDH Technologies',
          description: initialData.description || initialData.content || '',
          image: initialData.image || '',
        });
      } else {
        // Create mode
        reset({
          title: '',
          author: 'NDH Technologies',
          description: '',
          image: '',
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
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {initialData ? 'Edit Blog' : 'Create New Blog'}
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
              Blog Image
            </label>
            <ImageUploadPreview
              currentImage={currentImage}
              onImageUpload={handleImageUpload}
              onImageRemove={handleImageRemove}
              uploading={uploadingImage}
            />
          </div>

          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              {...register('title')}
              type="text"
              id="title"
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter blog title"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
            )}
          </div>

          {/* Author */}
          <div>
            <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
              Author *
            </label>
            <input
              {...register('author')}
              type="text"
              id="author"
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.author ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter author name"
            />
            {errors.author && (
              <p className="mt-1 text-sm text-red-600">{errors.author.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description/Content *
            </label>
            <textarea
              {...register('description')}
              id="description"
              rows={6}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter blog description or content"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
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
                  {initialData ? 'Update Blog' : 'Create Blog'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogForm;
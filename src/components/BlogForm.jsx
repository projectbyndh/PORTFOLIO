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
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [previewUrl, setPreviewUrl] = React.useState('');

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
        setPreviewUrl(initialData.image || '');
        setSelectedFile(null);
      } else {
        // Create mode
        reset({
          title: '',
          author: 'NDH Technologies',
          description: '',
          image: '',
        });
        setPreviewUrl('');
        setSelectedFile(null);
      }
    }
  }, [isOpen, initialData, reset]);

  // Handle form submission
  const handleFormSubmit = async (data) => {
    try {
      console.log('🔍 BlogForm Submit - data:', data);
      console.log('🔍 BlogForm Submit - selectedFile:', selectedFile);

      // Create FormData to send file with other fields
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('author', data.author);
      formData.append('description', data.description);

      if (selectedFile) {
        console.log('✅ Appending file to FormData:', selectedFile.name, selectedFile.type, selectedFile.size);
        formData.append('image', selectedFile);
      } else if (data.image) {
        console.log('⚠️ No file selected, appending URL string:', data.image);
        // If editing and no new file, send existing URL
        formData.append('image', data.image);
      } else {
        console.log('❌ No image file or URL');
      }

      console.log('📤 FormData contents:');
      for (let pair of formData.entries()) {
        console.log(`  ${pair[0]}:`, pair[1]);
      }

      await onSubmit(formData);
      onClose(); // Close modal on success
    } catch (error) {
      // Error is handled by the hook
      console.error('Form submission failed:', error);
    }
  };

  // Handle image file selection
  const handleImageSelect = (file) => {
    console.log('🖼️ handleImageSelect called with file:', file);
    console.log('🖼️ File details:', file?.name, file?.type, file?.size);
    setSelectedFile(file);
    const preview = URL.createObjectURL(file);
    setPreviewUrl(preview);
    setValue('image', ''); // Clear URL since we have a file
    console.log('🖼️ selectedFile state updated');
  };

  // Handle image removal
  const handleImageRemove = () => {
    setSelectedFile(null);
    setPreviewUrl('');
    setValue('image', '');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#1A2A44]/40 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#4A8EBC]/10">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#4A8EBC]/10 bg-gradient-to-r from-[#4A8EBC]/5 to-[#2DD4BF]/5">
          <h2 className="text-xl font-bold bg-gradient-to-r from-[#1A2A44] to-[#4A8EBC] bg-clip-text text-transparent">
            {initialData ? 'Edit Blog' : 'Create New Blog'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#4A8EBC] hover:text-[#1A2A44] hover:bg-[#4A8EBC]/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6 space-y-6">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-[#1A2A44] mb-2">
              Blog Image
            </label>
            <ImageUploadPreview
              currentImage={previewUrl || currentImage}
              onImageUpload={handleImageSelect}
              onImageRemove={handleImageRemove}
              uploading={false}
              showUploadButton={false}
            />
          </div>

          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-[#1A2A44] mb-2">
              Title *
            </label>
            <input
              {...register('title')}
              type="text"
              id="title"
              className={`w-full px-4 py-2.5 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4A8EBC]/30 focus:border-[#4A8EBC] transition-all ${errors.title ? 'border-red-500' : 'border-[#4A8EBC]/20'
                }`}
              placeholder="Enter blog title"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
            )}
          </div>

          {/* Author */}
          <div>
            <label htmlFor="author" className="block text-sm font-semibold text-[#1A2A44] mb-2">
              Author *
            </label>
            <input
              {...register('author')}
              type="text"
              id="author"
              className={`w-full px-4 py-2.5 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4A8EBC]/30 focus:border-[#4A8EBC] transition-all ${errors.author ? 'border-red-500' : 'border-[#4A8EBC]/20'
                }`}
              placeholder="Enter author name"
            />
            {errors.author && (
              <p className="mt-1 text-sm text-red-600">{errors.author.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-[#1A2A44] mb-2">
              Description/Content *
            </label>
            <textarea
              {...register('description')}
              id="description"
              rows={6}
              className={`w-full px-4 py-2.5 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4A8EBC]/30 focus:border-[#4A8EBC] transition-all ${errors.description ? 'border-red-500' : 'border-[#4A8EBC]/20'
                }`}
              placeholder="Enter blog description or content"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-[#4A8EBC]/10">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-semibold text-[#4A8EBC] bg-[#4A8EBC]/10 hover:bg-[#4A8EBC]/20 rounded-xl transition-all border border-[#4A8EBC]/20"
              disabled={isSubmitting || loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || loading}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-[#4A8EBC] to-[#3B5488] hover:from-[#3B5488] hover:to-[#4A8EBC] disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-all shadow-lg shadow-[#4A8EBC]/25"
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
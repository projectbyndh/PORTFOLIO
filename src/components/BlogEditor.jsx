import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Image as ImageIcon, X, Upload } from 'lucide-react';
import useAuthStore from '../Store/useAuthStore';
import useBlogStore from '../Store/useBlogStore';

export default function BlogEditor() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isAuthenticated } = useAuthStore();
  const { selectedBlog, createBlog, updateBlog, fetchBlogById } = useBlogStore();

  const [formData, setFormData] = useState({
    title: '',
    author: 'NDH Technologies',
    image: '',
    description: '',
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/ndh-admin/login');
      return;
    }

    if (id) {
      // Edit mode - fetch blog
      fetchBlogById(id).then(() => {
        if (selectedBlog) {
          setFormData({
            title: selectedBlog.title || '',
            author: selectedBlog.author || 'NDH Technologies',
            image: selectedBlog.image || '',
            description: selectedBlog.description || selectedBlog.content || '',
          });
          setPreviewImage(selectedBlog.image || '');
        }
      });
    }
  }, [id, isAuthenticated, navigate, fetchBlogById, selectedBlog]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      // Create preview URL for the selected file
      const previewUrl = URL.createObjectURL(file);
      setPreviewImage(previewUrl);
      // Clear any existing URL
      setFormData(prev => ({ ...prev, image: '' }));
    }
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setPreviewImage('');
    setFormData(prev => ({ ...prev, image: '' }));
    // Clear the file input
    const fileInput = document.getElementById('image-upload');
    if (fileInput) fileInput.value = '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'image') {
      setPreviewImage(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log('🔍 selectedFile:', selectedFile);
      console.log('🔍 formData.image:', formData.image);

      const blogData = new FormData();
      blogData.append('title', formData.title);
      blogData.append('author', formData.author);
      blogData.append('description', formData.description);

      if (selectedFile) {
        console.log('✅ Appending file to FormData:', selectedFile.name);
        blogData.append('image', selectedFile);
      } else if (formData.image) {
        console.log('⚠️ No file selected, appending URL string:', formData.image);
        blogData.append('image', formData.image);
      } else {
        console.log('❌ No image file or URL available');
      }

      console.log('📤 Sending FormData to backend...');
      // Log FormData contents
      for (let pair of blogData.entries()) {
        console.log(`  ${pair[0]}:`, pair[1]);
      }

      if (id) {
        await updateBlog(id, blogData);
        alert('Blog updated successfully!');
      } else {
        await createBlog(blogData);
        alert('Blog created successfully!');
      }

      navigate('/ndh-admin/dashboard');
    } catch (err) {
      console.error('❌ Submit error:', err);
      // Show more detailed error from the store if available, or the err object
      alert(`Failed to ${id ? 'update' : 'create'} blog: ${err.message || 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#F5FAFF] via-white to-[#F0F7FF]">
      {/* Header */}
      <header className="bg-white/70 backdrop-blur-sm border-b border-[#4A8EBC]/20 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 py-4">
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="flex items-center gap-2 text-[#4A8EBC] hover:text-[#3B5488] font-semibold transition-colors duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Dashboard
            </button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold bg-linear-to-r from-[#1A2A44] to-[#4A8EBC] bg-clip-text text-transparent">
                {id ? 'Edit Blog' : 'Create New Blog'}
              </h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Main Content Card */}
          <div className="bg-white/70 backdrop-blur-sm border border-white/50 rounded-2xl shadow-xl p-8">
            {/* Title */}
            <div className="mb-6">
              <label htmlFor="title" className="block text-sm font-semibold text-[#1A2A44] mb-2">
                Blog Title *
              </label>
              <input
                id="title"
                name="title"
                type="text"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-[#4A8EBC]/20 rounded-lg focus:ring-2 focus:ring-[#4A8EBC] focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-300"
                placeholder="Enter blog title..."
              />
            </div>

            {/* Author */}
            <div className="mb-6">
              <label htmlFor="author" className="block text-sm font-semibold text-[#1A2A44] mb-2">
                Author *
              </label>
              <input
                id="author"
                name="author"
                type="text"
                required
                value={formData.author}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-[#4A8EBC]/20 rounded-lg focus:ring-2 focus:ring-[#4A8EBC] focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-300"
                placeholder="Author name..."
              />
            </div>

            {/* Image Upload */}
            <div className="mb-6">
              <label htmlFor="image-upload" className="block text-sm font-semibold text-[#1A2A44] mb-2">
                Featured Image (Optional)
              </label>
              <div className="space-y-4">
                {/* File Upload Area */}
                <div className="border-2 border-dashed border-[#4A8EBC]/30 rounded-lg p-6 text-center hover:border-[#4A8EBC]/50 transition-colors duration-300">
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <div className="flex flex-col items-center gap-3">
                      <Upload className="w-8 h-8 text-[#4A8EBC]" />
                      <div>
                        <p className="text-sm font-medium text-[#1A2A44]">
                          Click to upload an image
                        </p>
                        <p className="text-xs text-[#2B4066]/60 mt-1">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
                  </label>
                </div>

                {/* Alternative URL Input */}
                <div className="text-center">
                  <span className="text-sm text-[#2B4066]/60">or</span>
                </div>

                <div className="flex gap-2">
                  <input
                    id="image-url"
                    name="image"
                    type="url"
                    value={formData.image}
                    onChange={handleChange}
                    className="flex-1 px-4 py-3 border border-[#4A8EBC]/20 rounded-lg focus:ring-2 focus:ring-[#4A8EBC] focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-300"
                    placeholder="Or enter image URL..."
                  />
                  {previewImage && (
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Image Preview */}
              {previewImage && (
                <div className="mt-4">
                  <div className="relative">
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="w-full h-64 object-cover rounded-lg border border-[#4A8EBC]/20"
                      onError={(e) => {
                        e.target.src = '/placeholder.svg?height=256&width=512';
                      }}
                    />
                    <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                      {selectedFile ? `${selectedFile.name} (${(selectedFile.size / 1024 / 1024).toFixed(2)} MB)` : 'URL Image'}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Content/Description */}
            <div className="mb-6">
              <label htmlFor="description" className="block text-sm font-semibold text-[#1A2A44] mb-2">
                Blog Content *
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows={15}
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-[#4A8EBC]/20 rounded-lg focus:ring-2 focus:ring-[#4A8EBC] focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-300 resize-y"
                placeholder="Write your blog content here... Use \n\n for paragraph breaks."
              />
              <p className="mt-2 text-sm text-[#2B4066]/60">
                Tip: Use double line breaks (\n\n) to separate paragraphs
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6 border-t border-[#4A8EBC]/20">
              <button
                type="button"
                onClick={() => navigate('/admin/dashboard')}
                className="flex-1 px-6 py-3 border border-[#4A8EBC]/20 text-[#2B4066] hover:bg-[#4A8EBC]/5 rounded-lg font-semibold transition-all duration-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 flex items-center justify-center gap-2 bg-linear-to-r from-[#4A8EBC] to-[#3B5488] hover:from-[#3B5488] hover:to-[#4A8EBC] text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    {id ? 'Updating...' : 'Creating...'}
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    {id ? 'Update Blog' : 'Publish Blog'}
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

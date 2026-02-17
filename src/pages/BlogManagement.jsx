import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, RefreshCw, Loader2 } from 'lucide-react';
import { useBlogs } from '../hooks/useBlogs';
import BlogList from '../components/BlogList';
import BlogForm from '../components/BlogForm';
import useAuthStore from '../Store/useAuthStore';
import AdminLayout from '../components/admin/AdminLayout';

/**
 * BlogManagement Page - Complete blog management interface
 * Features: List blogs, create, edit, delete with image upload
 */
const BlogManagement = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const {
    blogs,
    loading,
    error,
    fetchBlogs,
    createBlog,
    updateBlog,
    deleteBlog,
    uploadImage,
  } = useBlogs();

  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/ndh-admin/login');
      return;
    }

    // Fetch blogs on mount
    fetchBlogs().catch(err => {
      console.error('Failed to load blogs:', err);
    });
  }, [isAuthenticated, navigate, fetchBlogs]);

  // Handle create blog
  const handleCreateBlog = async (blogData) => {
    await createBlog(blogData);
  };

  // Handle update blog
  const handleUpdateBlog = async (blogData) => {
    if (editingBlog) {
      await updateBlog(editingBlog.id || editingBlog._id, blogData);
      setEditingBlog(null);
    }
  };

  // Handle delete blog
  const handleDeleteBlog = async (blogId) => {
    if (!confirm('Are you sure you want to delete this blog? This action cannot be undone.')) {
      return;
    }

    setDeletingId(blogId);
    try {
      await deleteBlog(blogId);
    } catch (error) {
      // Error handled by hook
    } finally {
      setDeletingId(null);
    }
  };

  // Handle edit blog
  const handleEditBlog = (blog) => {
    setEditingBlog(blog);
    setIsFormOpen(true);
  };

  // Handle form submit
  const handleFormSubmit = async (blogData) => {
    if (editingBlog) {
      await handleUpdateBlog(blogData);
    } else {
      await handleCreateBlog(blogData);
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
    setEditingBlog(null);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-[#26a8df]">Blog Posts</h1>
            <p className="text-[#26a8df]/60 mt-1">Manage your blog content</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => fetchBlogs()}
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
              Add New Blog
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
            <p className="font-medium">Error loading blogs:</p>
            <p>{error}</p>
          </div>
        )}

        {/* Blog List Container */}
        <div className="bg-white rounded-2xl border border-[#26a8df]/10 shadow-sm overflow-hidden min-h-[400px]">
          <div className="p-0">
            <BlogList
              blogs={blogs}
              loading={loading}
              onEdit={handleEditBlog}
              onDelete={handleDeleteBlog}
              deletingId={deletingId}
            />
          </div>
        </div>

        {/* Blog Form Modal */}
        <BlogForm
          isOpen={isFormOpen}
          onClose={closeModal}
          onSubmit={handleFormSubmit}
          initialData={editingBlog}
          loading={loading}
          uploadImage={handleImageUpload}
          uploadingImage={uploadingImage}
        />
      </div>
    </AdminLayout>
  );
};

export default BlogManagement;
import React, { useState, useEffect } from 'react';
import useBlogStore from '../Store/BlogStore';
import Sidebar from './Sidebar';

const AdminPanel = () => {
  const { blogs, selectedBlog, loading, error, fetchBlogs, fetchBlogById, addBlog, updateBlog, deleteBlog } = useBlogStore();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [editId, setEditId] = useState(null);
  const [viewId, setViewId] = useState('');

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) formData.append('image', image);

    if (editId) {
      updateBlog(editId, formData);
      setEditId(null);
    } else {
      addBlog(formData);
    }
    setTitle('');
    setContent('');
    setImage(null);
  };

  const handleEdit = (blog) => {
    setEditId(blog._id);
    setTitle(blog.title);
    setContent(blog.content);
    setImage(null);
  };

  const handleViewById = (e) => {
    e.preventDefault();
    if (viewId) {
      fetchBlogById(viewId);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-[#F5FAFF] to-[#EAF5FF]">
      
      {/* Sidebar included here */}
      <Sidebar />

      <main className="flex-1 p-8 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-[#4A8EBC]/10 animate-pulse-slow"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-[#3B5488]/10 animate-pulse-slow"></div>
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `radial-gradient(#4A8EBC 1px, transparent 1px)`,
              backgroundSize: '30px 30px',
            }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto p-6 py-16 relative z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#1A2A44] to-[#4A8EBC] text-center mb-12 animate-fade-in">
            Blog Admin Panel
          </h1>

          {error && (
            <p className="text-red-500 text-lg bg-white/50 backdrop-blur-sm p-4 rounded-lg shadow mb-6 text-center">
              {error}
            </p>
          )}
          {loading && (
            <p className="text-[#4A8EBC] text-lg bg-white/50 backdrop-blur-sm p-4 rounded-lg shadow mb-6 text-center animate-pulse">
              Loading...
            </p>
          )}

          <div className="mb-12 p-6 bg-white/50 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-semibold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#1A2A44] to-[#4A8EBC]">
              {editId ? 'Edit Blog' : 'Add New Blog'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#2B4066]/80">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-3 border border-[#4A8EBC]/20 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#4A8EBC] transition-all duration-300"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2B4066]/80">Description</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full p-3 border border-[#4A8EBC]/20 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#4A8EBC] transition-all duration-300"
                  rows="5"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2B4066]/80">Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="w-full p-3 border border-[#4A8EBC]/20 rounded-lg bg-white/80 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-[#4A8EBC] file:text-white hover:file:bg-[#3B5488] transition-all duration-300"
                />
              </div>
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-[#4A8EBC] to-[#3B5488] text-white font-semibold py-3 px-8 rounded-full hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  {editId ? 'Update Blog' : 'Add Blog'}
                </button>
                {editId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditId(null);
                      setTitle('');
                      setContent('');
                      setImage(null);
                    }}
                    className="border-2 border-[#4A8EBC] text-[#3B5488] font-semibold py-3 px-8 rounded-full hover:bg-[#4A8EBC]/20 hover:shadow-xl transition-all duration-300"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          <div className="grid gap-6">
            <h2 className="text-2xl font-semibold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#1A2A44] to-[#4A8EBC]">
              All Blogs
            </h2>
            {blogs.length === 0 && !loading && (
              <p className="text-[#2B4066]/80 text-lg bg-white/50 backdrop-blur-sm p-4 rounded-lg shadow text-center">
                No blogs available.
              </p>
            )}
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="p-6 bg-white/50 backdrop-blur-sm rounded-xl shadow-lg hover:transform hover:-translate-y-2 transition-all duration-300 flex items-center"
              >
                {blog.image && (
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-24 h-24 object-cover rounded-lg mr-4"
                    onError={(e) => {
                      e.target.src = '/placeholder.svg?height=96&width=96';
                    }}
                  />
                )}
                <div className="flex-1">
                  <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#1A2A44] to-[#4A8EBC]">
                    {blog.title}
                  </h3>
                  <p className="text-[#2B4066]/80 mt-2">{blog.content.substring(0, 100)}...</p>
                  <p className="text-sm text-[#2B4066]/60 mt-2">ID: {blog._id}</p>
                </div>
                <div className="space-x-4">
                  <button
                    onClick={() => handleEdit(blog)}
                    className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-white font-semibold py-2 px-6 rounded-full hover:shadow-xl hover:scale-105 transition-all duration-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteBlog(blog._id)}
                    className="bg-gradient-to-r from-[#FF4D4F] to-[#CC0000] text-white font-semibold py-2 px-6 rounded-full hover:shadow-xl hover:scale-105 transition-all duration-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;

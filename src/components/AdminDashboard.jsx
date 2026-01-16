import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LogOut, 
  FileText, 
  PlusCircle, 
  Edit, 
  Trash2, 
  Eye,
  Calendar,
  User as UserIcon,
  TrendingUp,
  BarChart3,
  Home,
  PenTool,
  Settings,
  Menu,
  X,
  RefreshCw,
  Briefcase
} from 'lucide-react';
import useAuthStore from '../Store/useAuthStore';
import useBlogStore from '../Store/useBlogStore';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, logout, user } = useAuthStore();
  const { blogs, loading, error, fetchBlogs, deleteBlog } = useBlogStore();
  
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(null);

  // Ensure blogs is always an array
  const safeBlogs = Array.isArray(blogs) ? blogs : [];

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
      return;
    }

    // Always fetch blogs when component mounts or when returning to dashboard
    const loadBlogs = async () => {
      try {
        await fetchBlogs();
      } catch (error) {
        console.error('Failed to fetch blogs in AdminDashboard:', error);
      }
    };

    loadBlogs();
  }, [isAuthenticated, navigate, fetchBlogs, location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleRefreshBlogs = async () => {
    try {
      await fetchBlogs();
    } catch (error) {
      console.error('Failed to refresh blogs:', error);
    }
  };

  const handleDeleteBlog = async (blogId) => {
    if (!confirm('Are you sure you want to delete this blog? This action cannot be undone.')) {
      return;
    }

    setDeleteLoading(blogId);
    try {
      await deleteBlog(blogId);
      alert('Blog deleted successfully!');
      // Refresh the blogs list
      await fetchBlogs();
    } catch (error) {
      alert('Failed to delete blog: ' + error.message);
    } finally {
      setDeleteLoading(null);
    }
  };

  const formatDate = (date) => {
    if (!date) return 'No date';
    try {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return 'Invalid date';
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#F5FAFF] via-white to-[#F0F7FF] flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white/90 backdrop-blur-sm border-r border-[#4A8EBC]/20 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-6 border-b border-[#4A8EBC]/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-linear-to-r from-[#4A8EBC] to-[#3B5488] rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#1A2A44]">Admin Panel</h2>
                <p className="text-xs text-[#2B4066]/60">NDH Technologies</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-lg hover:bg-[#4A8EBC]/10 transition-colors duration-200"
            >
              <X className="w-5 h-5 text-[#4A8EBC]" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6">
            <div className="space-y-2">
              <button
                onClick={() => {
                  setActiveTab('dashboard');
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  activeTab === 'dashboard'
                    ? 'bg-linear-to-r from-[#4A8EBC] to-[#3B5488] text-white shadow-lg'
                    : 'text-[#2B4066]/70 hover:bg-[#4A8EBC]/10 hover:text-[#4A8EBC]'
                }`}
              >
                <Home className="w-5 h-5" />
                Dashboard
              </button>

              <button
                onClick={() => {
                  navigate('/admin/blogs');
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  activeTab === 'blogs'
                    ? 'bg-linear-to-r from-[#4A8EBC] to-[#3B5488] text-white shadow-lg'
                    : 'text-[#2B4066]/70 hover:bg-[#4A8EBC]/10 hover:text-[#4A8EBC]'
                }`}
              >
                <FileText className="w-5 h-5" />
                Manage Blogs
              </button>

              <button
                onClick={() => {
                  navigate('/admin/careers');
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  activeTab === 'careers'
                    ? 'bg-linear-to-r from-[#4A8EBC] to-[#3B5488] text-white shadow-lg'
                    : 'text-[#2B4066]/70 hover:bg-[#4A8EBC]/10 hover:text-[#4A8EBC]'
                }`}
              >
                <Briefcase className="w-5 h-5" />
                Manage Careers
              </button>

              <button
                onClick={() => {
                  navigate('/admin/partners');
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  activeTab === 'partners'
                    ? 'bg-linear-to-r from-[#4A8EBC] to-[#3B5488] text-white shadow-lg'
                    : 'text-[#2B4066]/70 hover:bg-[#4A8EBC]/10 hover:text-[#4A8EBC]'
                }`}
              >
                <UserIcon className="w-5 h-5" />
                Manage Partners
              </button>

              <button
                onClick={() => {
                  navigate('/admin/blog/create');
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  activeTab === 'create'
                    ? 'bg-linear-to-r from-[#4A8EBC] to-[#3B5488] text-white shadow-lg'
                    : 'text-[#2B4066]/70 hover:bg-[#4A8EBC]/10 hover:text-[#4A8EBC]'
                }`}
              >
                <PenTool className="w-5 h-5" />
                Write Blog
              </button>

              <button
                onClick={() => {
                  setActiveTab('settings');
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  activeTab === 'settings'
                    ? 'bg-linear-to-r from-[#4A8EBC] to-[#3B5488] text-white shadow-lg'
                    : 'text-[#2B4066]/70 hover:bg-[#4A8EBC]/10 hover:text-[#4A8EBC]'
                }`}
              >
                <Settings className="w-5 h-5" />
                Settings
              </button>
            </div>
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-[#4A8EBC]/20">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-semibold text-red-600 hover:bg-red-50 transition-all duration-300"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white/70 backdrop-blur-sm border-b border-[#4A8EBC]/20 sticky top-0 z-40 shadow-lg">
          <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-[#4A8EBC]/10 transition-colors duration-200"
              >
                <Menu className="w-6 h-6 text-[#4A8EBC]" />
              </button>
              <div>
                <h1 className="text-2xl font-bold bg-linear-to-r from-[#1A2A44] to-[#4A8EBC] bg-clip-text text-transparent">
                  {activeTab === 'dashboard' ? 'Dashboard' : 
                   activeTab === 'blogs' ? 'Manage Blogs' : 
                   activeTab === 'settings' ? 'Settings' : 'Admin Panel'}
                </h1>
                <p className="text-sm text-[#2B4066]/70">Welcome back, {user?.username}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/70 backdrop-blur-sm border border-white/50 rounded-2xl p-6 shadow-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-[#2B4066]/70">Total Blogs</p>
                      <p className="text-3xl font-bold text-[#1A2A44]">{safeBlogs.length}</p>
                    </div>
                    <div className="w-12 h-12 bg-linear-to-r from-[#4A8EBC] to-[#3B5488] rounded-full flex items-center justify-center">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>

                <div className="bg-white/70 backdrop-blur-sm border border-white/50 rounded-2xl p-6 shadow-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-[#2B4066]/70">Published</p>
                      <p className="text-3xl font-bold text-[#1A2A44]">{safeBlogs.length}</p>
                    </div>
                    <div className="w-12 h-12 bg-linear-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>

                <div className="bg-white/70 backdrop-blur-sm border border-white/50 rounded-2xl p-6 shadow-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-[#2B4066]/70">Views</p>
                      <p className="text-3xl font-bold text-[#1A2A44]">--</p>
                    </div>
                    <div className="w-12 h-12 bg-linear-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center">
                      <BarChart3 className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white/70 backdrop-blur-sm border border-white/50 rounded-2xl p-6 shadow-xl">
                <h3 className="text-xl font-bold text-[#1A2A44] mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <button
                    onClick={() => navigate('/admin/blog/create')}
                    className="flex items-center gap-3 p-4 bg-linear-to-r from-[#4A8EBC] to-[#3B5488] hover:from-[#3B5488] hover:to-[#4A8EBC] text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <PlusCircle className="w-6 h-6" />
                    Create New Blog
                  </button>
                  <button
                    onClick={() => navigate('/admin/blogs')}
                    className="flex items-center gap-3 p-4 bg-white/70 backdrop-blur-sm border border-[#4A8EBC]/20 text-[#4A8EBC] hover:bg-[#4A8EBC]/10 rounded-lg font-semibold transition-all duration-300"
                  >
                    <FileText className="w-6 h-6" />
                    Manage Blogs
                  </button>
                  <button
                    onClick={() => setActiveTab('settings')}
                    className="flex items-center gap-3 p-4 bg-white/70 backdrop-blur-sm border border-[#4A8EBC]/20 text-[#4A8EBC] hover:bg-[#4A8EBC]/10 rounded-lg font-semibold transition-all duration-300"
                  >
                    <Settings className="w-6 h-6" />
                    Settings
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'blogs' && (
            <div className="bg-white/70 backdrop-blur-sm border border-white/50 rounded-2xl shadow-xl">
              <div className="p-6">
                {/* Create Blog Button */}
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-4">
                    <h2 className="text-xl font-bold text-[#1A2A44]">All Blogs</h2>
                    <button
                      onClick={handleRefreshBlogs}
                      disabled={loading}
                      className="p-2 text-[#4A8EBC] hover:bg-[#4A8EBC]/10 rounded-lg transition-colors duration-200 disabled:opacity-50"
                      title="Refresh Blogs"
                    >
                      <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                    </button>
                  </div>
                  <button
                    onClick={() => navigate('/admin/blog/create')}
                    className="flex items-center gap-2 bg-linear-to-r from-[#4A8EBC] to-[#3B5488] hover:from-[#3B5488] hover:to-[#4A8EBC] text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <PlusCircle className="w-5 h-5" />
                    Create New Blog
                  </button>
                </div>

                {/* Loading State */}
                {loading && (
                  <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#4A8EBC]"></div>
                  </div>
                )}

                {/* Error State */}
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    {error}
                  </div>
                )}

                {/* Blogs Table */}
                {!loading && !error && (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#4A8EBC]/20">
                          <th className="text-left py-3 px-4 text-sm font-semibold text-[#1A2A44]">Blog Details</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-[#1A2A44]">Author</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-[#1A2A44]">Status</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-[#1A2A44]">Date</th>
                          <th className="text-right py-3 px-4 text-sm font-semibold text-[#1A2A44]">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {!Array.isArray(safeBlogs) || safeBlogs.length === 0 ? (
                          <tr>
                            <td colSpan="5" className="text-center py-12">
                              <div className="flex flex-col items-center gap-4">
                                <FileText className="w-16 h-16 text-[#4A8EBC]/30" />
                                <div>
                                  <p className="text-lg font-semibold text-[#1A2A44] mb-2">No blogs found</p>
                                  <p className="text-[#2B4066]/60 mb-4">Blogs will appear here once created via the backend API.</p>
                                  <button
                                    onClick={() => navigate('/admin/blog/create')}
                                    className="inline-flex items-center gap-2 bg-linear-to-r from-[#4A8EBC] to-[#3B5488] hover:from-[#3B5488] hover:to-[#4A8EBC] text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                                  >
                                    <PlusCircle className="w-5 h-5" />
                                    Create New Blog
                                  </button>
                                </div>
                              </div>
                            </td>
                          </tr>
                        ) : (
                          safeBlogs.map((blog) => (
                            <tr key={blog._id || blog.id} className="border-b border-[#4A8EBC]/10 hover:bg-[#4A8EBC]/5 transition-colors duration-200">
                              <td className="py-4 px-4">
                                <div className="flex items-center gap-3">
                                  {blog.image && (
                                    <img
                                      src={blog.image}
                                      alt={blog.title}
                                      className="w-12 h-12 object-cover rounded-lg border border-[#4A8EBC]/20"
                                      onError={(e) => {
                                        e.target.src = '/placeholder.svg?height=48&width=48';
                                      }}
                                    />
                                  )}
                                  <div className="min-w-0 flex-1">
                                    <p className="font-semibold text-[#1A2A44] truncate">{blog.title || 'Untitled'}</p>
                                    <p className="text-xs text-[#2B4066]/60 line-clamp-2 mt-1">
                                      {blog.description || blog.content || 'No description available'}
                                    </p>
                                    {blog._id?.startsWith('local-') && (
                                      <span className="inline-block mt-1 px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                                        Local
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </td>
                              <td className="py-4 px-4">
                                <div className="flex items-center gap-2">
                                  <UserIcon className="w-4 h-4 text-[#4A8EBC]" />
                                  <span className="text-sm text-[#2B4066]">{blog.author || 'NDH'}</span>
                                </div>
                              </td>
                              <td className="py-4 px-4">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  blog._id?.startsWith('local-') 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-blue-100 text-blue-800'
                                }`}>
                                  {blog._id?.startsWith('local-') ? 'Local' : 'Published'}
                                </span>
                              </td>
                              <td className="py-4 px-4">
                                <div className="flex items-center gap-2">
                                  <Calendar className="w-4 h-4 text-[#4A8EBC]" />
                                  <span className="text-sm text-[#2B4066]">
                                    {formatDate(blog.date || blog.createdAt)}
                                  </span>
                                </div>
                              </td>
                              <td className="py-4 px-4">
                                <div className="flex items-center justify-end gap-1">
                                  <button
                                    onClick={() => window.open(`/blogdetails?id=${blog._id || blog.id}`, '_blank')}
                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200 group relative"
                                    title="View Blog"
                                  >
                                    <Eye className="w-4 h-4" />
                                    <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                                      View Blog
                                    </span>
                                  </button>
                                  <button
                                    onClick={() => navigate(`/admin/blog/edit/${blog._id || blog.id}`)}
                                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200 group relative"
                                    title="Edit Blog"
                                  >
                                    <Edit className="w-4 h-4" />
                                    <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                                      Edit Blog
                                    </span>
                                  </button>
                                  <button
                                    onClick={() => handleDeleteBlog(blog._id || blog.id)}
                                    disabled={deleteLoading === (blog._id || blog.id)}
                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 group relative disabled:opacity-50 disabled:cursor-not-allowed"
                                    title="Delete Blog"
                                  >
                                    {deleteLoading === (blog._id || blog.id) ? (
                                      <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                                    ) : (
                                      <Trash2 className="w-4 h-4" />
                                    )}
                                    <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                                      Delete Blog
                                    </span>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="bg-white/70 backdrop-blur-sm border border-white/50 rounded-2xl shadow-xl p-6">
              <h2 className="text-xl font-bold text-[#1A2A44] mb-4">Settings</h2>
              <p className="text-[#2B4066]/70">Settings panel coming soon...</p>
            </div>
          )}
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}

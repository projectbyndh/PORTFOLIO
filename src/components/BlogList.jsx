import React from 'react';
import { Edit, Trash2, Calendar, User, Eye, Loader2 } from 'lucide-react';

/**
 * BlogList Component - Displays a table of blogs with actions
 */
const BlogList = ({
  blogs = [],
  loading = false,
  onEdit,
  onDelete,
  deletingId = null
}) => {
  // Format date helper
  const formatDate = (dateString) => {
    if (!dateString) return 'No date';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return 'Invalid date';
    }
  };

  // Loading state
  if (loading && blogs.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-600">Loading blogs...</span>
      </div>
    );
  }

  // Empty state
  if (!loading && blogs.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <Eye className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No blogs found</h3>
        <p className="text-gray-500">Get started by creating your first blog post.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">
              Blog Details
            </th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">
              Author
            </th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">
              Date
            </th>
            <th className="text-right py-3 px-4 text-sm font-semibold text-gray-900">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr
              key={blog._id || blog.id}
              className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              {/* Blog Details */}
              <td className="py-4 px-4">
                <div className="flex items-center gap-3">
                  {/* Image Preview */}
                  {blog.image ? (
                    <>
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-12 h-12 object-cover rounded-lg border border-gray-200 flex-shrink-0"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextElementSibling.style.display = 'flex';
                        }}
                      />
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 hidden">
                        <Eye className="w-6 h-6 text-gray-400" />
                      </div>
                    </>
                  ) : (
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Eye className="w-6 h-6 text-gray-400" />
                    </div>
                  )}

                  {/* Title and Description */}
                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold text-gray-900 truncate">
                      {blog.title || 'Untitled'}
                    </h4>
                    <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                      {blog.description || blog.content || 'No description available'}
                    </p>
                  </div>
                </div>
              </td>

              {/* Author */}
              <td className="py-4 px-4">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-900">
                    {blog.author || 'Unknown'}
                  </span>
                </div>
              </td>

              {/* Date */}
              <td className="py-4 px-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {formatDate(blog.createdAt || blog.date)}
                  </span>
                </div>
              </td>

              {/* Actions */}
              <td className="py-4 px-4">
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => onEdit(blog)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-white/50"
                    title="Edit blog"
                    aria-label={`Edit blog: ${blog.title}`}
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(blog._id || blog.id)}
                    disabled={deletingId === (blog._id || blog.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:ring-offset-2 focus:ring-offset-white/50"
                    title="Delete blog"
                    aria-label={`Delete blog: ${blog.title}`}
                  >
                    {deletingId === (blog._id || blog.id) ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BlogList;
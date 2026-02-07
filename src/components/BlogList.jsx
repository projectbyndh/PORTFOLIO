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
      <div className="flex justify-center items-center h-full py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4A8EBC]"></div>
      </div>
    );
  }

  // Empty state
  if (!loading && blogs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center py-20">
        <div className="w-20 h-20 bg-[#F5FAFF] rounded-full flex items-center justify-center mb-4">
          <Eye className="w-10 h-10 text-[#4A8EBC]/40" />
        </div>
        <p className="text-[#2B4066] font-semibold text-lg mb-2">No blogs found</p>
        <p className="text-[#2B4066]/60 mb-6 max-w-sm">Get started by creating your first blog post.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-[#F5FAFF] border-b border-[#4A8EBC]/10">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-bold text-[#1A2A44] uppercase tracking-wider">
              Blog Details
            </th>
            <th className="px-6 py-4 text-left text-sm font-bold text-[#1A2A44] uppercase tracking-wider">
              Author
            </th>
            <th className="px-6 py-4 text-left text-sm font-bold text-[#1A2A44] uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-4 text-right text-sm font-bold text-[#1A2A44] uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#4A8EBC]/5">
          {blogs.map((blog) => (
            <tr
              key={blog._id || blog.id}
              className="hover:bg-[#F5FAFF]/50 transition-colors group"
            >
              {/* Blog Details */}
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  {/* Image Preview */}
                  {blog.image ? (
                    <>
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-12 h-12 object-cover rounded-lg border border-[#4A8EBC]/10 flex-shrink-0"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextElementSibling.style.display = 'flex';
                        }}
                      />
                      <div className="w-12 h-12 bg-[#F5FAFF] rounded-lg flex items-center justify-center flex-shrink-0 hidden border border-[#4A8EBC]/5">
                        <Eye className="w-6 h-6 text-[#4A8EBC]/40" />
                      </div>
                    </>
                  ) : (
                    <div className="w-12 h-12 bg-[#F5FAFF] rounded-lg flex items-center justify-center flex-shrink-0 border border-[#4A8EBC]/5">
                      <Eye className="w-6 h-6 text-[#4A8EBC]/40" />
                    </div>
                  )}

                  {/* Title and Description */}
                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold text-[#1A2A44] truncate group-hover:text-[#4A8EBC] transition-colors">
                      {blog.title || 'Untitled'}
                    </h4>
                    <p className="text-sm text-[#2B4066]/70 line-clamp-2 mt-1">
                      {blog.description || blog.content || 'No description available'}
                    </p>
                  </div>
                </div>
              </td>

              {/* Author */}
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-[#4A8EBC]/60" />
                  <span className="text-sm text-[#2B4066]">
                    {blog.author || 'Unknown'}
                  </span>
                </div>
              </td>

              {/* Date */}
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#4A8EBC]/60" />
                  <span className="text-sm text-[#2B4066]/70">
                    {formatDate(blog.createdAt || blog.date)}
                  </span>
                </div>
              </td>

              {/* Actions */}
              <td className="px-6 py-4">
                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => onEdit(blog)}
                    className="px-4 py-2 bg-[#4A8EBC]/10 text-[#4A8EBC] rounded-lg hover:bg-[#4A8EBC]/20 transition-all flex items-center gap-2 font-medium"
                    title="Edit blog"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(blog._id || blog.id)}
                    disabled={deletingId === (blog._id || blog.id)}
                    className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all flex items-center gap-2 font-medium disabled:opacity-50"
                    title="Delete blog"
                  >
                    {deletingId === (blog._id || blog.id) ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </>
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
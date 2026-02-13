import { Edit, Trash2, Calendar, MapPin, ExternalLink, Loader2 } from 'lucide-react';
import { getImageUrl } from '../utils/getImageUrl';
import React from 'react';
/**
 * CareerList Component - Displays a table of careers with actions
 */
const CareerList = ({
  careers = [],
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
  if (loading && careers.length === 0) {
    return (
      <div className="flex justify-center items-center h-full py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#26a8df]"></div>
      </div>
    );
  }

  // Empty state
  if (!loading && careers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center py-20">
        <div className="w-20 h-20 bg-[#F5FAFF] rounded-full flex items-center justify-center mb-4">
          <MapPin className="w-10 h-10 text-[#26a8df]/40" />
        </div>
        <p className="text-[#26a8df] font-semibold text-lg mb-2">No careers found</p>
        <p className="text-[#26a8df]/60 mb-6 max-w-sm">Get started by creating your first career posting.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-[#F5FAFF] border-b border-[#26a8df]/10">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-bold text-[#26a8df] uppercase tracking-wider">
              Job Details
            </th>
            <th className="px-6 py-4 text-left text-sm font-bold text-[#26a8df] uppercase tracking-wider">
              Location
            </th>
            <th className="px-6 py-4 text-left text-sm font-bold text-[#26a8df] uppercase tracking-wider">
              Category
            </th>
            <th className="px-6 py-4 text-left text-sm font-bold text-[#26a8df] uppercase tracking-wider">
              Posted Date
            </th>
            <th className="px-6 py-4 text-right text-sm font-bold text-[#26a8df] uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#26a8df]/5">
          {careers.map((career) => (
            <tr
              key={career._id || career.id}
              className="hover:bg-[#F5FAFF]/50 transition-colors group"
            >
              {/* Job Details */}
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  {/* Image Preview */}
                  {career.image ? (
                    <>
                      <img
                        src={getImageUrl(career.image, 'career')}
                        alt={career.title}
                        className="w-12 h-12 object-cover rounded-lg border border-[#26a8df]/10 flex-shrink-0"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextElementSibling.style.display = 'flex';
                        }}
                      />
                      <div className="w-12 h-12 bg-[#F5FAFF] rounded-lg flex items-center justify-center flex-shrink-0 hidden border border-[#26a8df]/5">
                        <MapPin className="w-6 h-6 text-[#26a8df]/40" />
                      </div>
                    </>
                  ) : (
                    <div className="w-12 h-12 bg-[#F5FAFF] rounded-lg flex items-center justify-center flex-shrink-0 border border-[#26a8df]/5">
                      <MapPin className="w-6 h-6 text-[#26a8df]/40" />
                    </div>
                  )}

                  {/* Title and Description */}
                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold text-[#26a8df] truncate group-hover:text-[#26a8df] transition-colors">
                      {career.title || 'Untitled Position'}
                    </h4>
                    <p className="text-sm text-[#26a8df]/70 line-clamp-2 mt-1">
                      {career.description || 'No description available'}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-[#26a8df]/60">
                      <span>{career.requirements?.length || 0} requirements</span>
                      <span>{career.responsibilities?.length || 0} responsibilities</span>
                      {career.applyLink && (
                        <a
                          href={career.applyLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-[#26a8df] hover:text-[#26a8df] transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="w-3 h-3" />
                          Apply
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </td>

              {/* Location */}
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#26a8df]/60" />
                  <span className="text-sm text-[#26a8df]">
                    {career.location || 'Not specified'}
                  </span>
                </div>
              </td>

              {/* Category */}
              <td className="px-6 py-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${career.category === 'Intern'
                  ? 'bg-blue-100 text-blue-800'
                  : career.category?.includes('Developer')
                    ? 'bg-purple-100 text-purple-800'
                    : 'bg-green-100 text-green-800'
                  }`}>
                  {career.category || 'N/A'}
                </span>
              </td>

              {/* Posted Date */}
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#26a8df]/60" />
                  <span className="text-sm text-[#26a8df]/70">
                    {formatDate(career.createdAt)}
                  </span>
                </div>
              </td>

              {/* Actions */}
              <td className="px-6 py-4">
                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => onEdit(career)}
                    className="px-4 py-2 bg-[#26a8df]/10 text-[#26a8df] rounded-lg hover:bg-[#26a8df]/20 transition-all flex items-center gap-2 font-medium"
                    title="Edit career"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(career._id || career.id)}
                    disabled={deletingId === (career._id || career.id)}
                    className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all flex items-center gap-2 font-medium disabled:opacity-50"
                    title="Delete career"
                  >
                    {deletingId === (career._id || career.id) ? (
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

export default CareerList;
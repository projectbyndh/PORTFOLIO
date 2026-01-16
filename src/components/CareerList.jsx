import React from 'react';
import { Edit, Trash2, Calendar, MapPin, ExternalLink, Loader2 } from 'lucide-react';

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
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-600">Loading careers...</span>
      </div>
    );
  }

  // Empty state
  if (!loading && careers.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <MapPin className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No careers found</h3>
        <p className="text-gray-500">Get started by creating your first career posting.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">
              Job Details
            </th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">
              Location
            </th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">
              Posted Date
            </th>
            <th className="text-right py-3 px-4 text-sm font-semibold text-gray-900">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {careers.map((career) => (
            <tr
              key={career._id || career.id}
              className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              {/* Job Details */}
              <td className="py-4 px-4">
                <div className="flex items-center gap-3">
                  {/* Image Preview */}
                  {career.image ? (
                    <>
                      <img
                        src={career.image}
                        alt={career.title}
                        className="w-12 h-12 object-cover rounded-lg border border-gray-200 flex-shrink-0"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextElementSibling.style.display = 'flex';
                        }}
                      />
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 hidden">
                        <MapPin className="w-6 h-6 text-gray-400" />
                      </div>
                    </>
                  ) : (
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-gray-400" />
                    </div>
                  )}

                  {/* Title and Description */}
                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold text-gray-900 truncate">
                      {career.title || 'Untitled Position'}
                    </h4>
                    <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                      {career.description || 'No description available'}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                      <span>{career.requirements?.length || 0} requirements</span>
                      <span>{career.responsibilities?.length || 0} responsibilities</span>
                      {career.applyLink && (
                        <a
                          href={career.applyLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
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
              <td className="py-4 px-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-900">
                    {career.location || 'Not specified'}
                  </span>
                </div>
              </td>

              {/* Posted Date */}
              <td className="py-4 px-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {formatDate(career.createdAt)}
                  </span>
                </div>
              </td>

              {/* Actions */}
              <td className="py-4 px-4">
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => onEdit(career)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                    title="Edit career"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(career._id || career.id)}
                    disabled={deletingId === (career._id || career.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Delete career"
                  >
                    {deletingId === (career._id || career.id) ? (
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

export default CareerList;
import React from 'react';
import { Edit, Trash2, Star, CheckCircle, XCircle } from 'lucide-react';

const TestimonialList = ({
    testimonials = [],
    loading = false,
    onEdit,
    onDelete,
    onToggleFeatured,
    deletingId = null
}) => {
    if (loading && testimonials.length === 0) {
        return (
            <div className="flex justify-center items-center h-full py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4A8EBC]"></div>
            </div>
        );
    }

    if (!loading && testimonials.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center py-20">
                <div className="w-20 h-20 bg-[#F5FAFF] rounded-full flex items-center justify-center mb-4">
                    <Star className="w-10 h-10 text-[#4A8EBC]/40" />
                </div>
                <p className="text-[#2B4066] font-semibold text-lg mb-2">No testimonials found</p>
                <p className="text-[#2B4066]/60 mb-6 max-w-sm">Get started by creating your first testimonial.</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead className="bg-[#F5FAFF] border-b border-[#4A8EBC]/10">
                    <tr>
                        <th className="px-6 py-4 text-left text-sm font-bold text-[#1A2A44] uppercase tracking-wider">
                            Client
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-bold text-[#1A2A44] uppercase tracking-wider">
                            Rating
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-bold text-[#1A2A44] uppercase tracking-wider">
                            Message
                        </th>
                        <th className="px-6 py-4 text-center text-sm font-bold text-[#1A2A44] uppercase tracking-wider">
                            Featured
                        </th>
                        <th className="px-6 py-4 text-right text-sm font-bold text-[#1A2A44] uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-[#4A8EBC]/5">
                    {testimonials.map((item) => (
                        <tr
                            key={item.id || item._id}
                            className="hover:bg-[#F5FAFF]/50 transition-colors group"
                        >
                            {/* Client Info */}
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    {item.image ? (
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-10 h-10 rounded-full object-cover border border-[#4A8EBC]/10"
                                            onError={(e) => { e.target.src = 'https://via.placeholder.com/40'; }}
                                        />
                                    ) : (
                                        <div className="w-10 h-10 rounded-full bg-[#4A8EBC]/10 flex items-center justify-center text-[#4A8EBC] font-bold">
                                            {item.name?.charAt(0)}
                                        </div>
                                    )}
                                    <div>
                                        <h4 className="font-semibold text-[#1A2A44]">{item.name}</h4>
                                        <p className="text-xs text-[#2B4066]/60">{item.position} {item.company ? `at ${item.company}` : ''}</p>
                                    </div>
                                </div>
                            </td>

                            {/* Rating */}
                            <td className="px-6 py-4">
                                <div className="flex text-yellow-400">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-4 h-4 ${i < item.rating ? 'fill-current' : 'text-gray-200'}`}
                                        />
                                    ))}
                                </div>
                            </td>

                            {/* Message */}
                            <td className="px-6 py-4">
                                <p className="text-sm text-[#2B4066]/70 line-clamp-2 max-w-xs ring-offset-2">
                                    "{item.text}"
                                </p>
                            </td>

                            {/* Featured Toggle */}
                            <td className="px-6 py-4 text-center">
                                <button
                                    onClick={() => onToggleFeatured(item)}
                                    className={`p-1 rounded-full transition-colors ${item.featured
                                        ? 'bg-green-100 text-green-600 hover:bg-green-200'
                                        : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                                        }`}
                                    title="Toggle featured"
                                >
                                    {item.featured ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                                </button>
                            </td>

                            {/* Actions */}
                            <td className="px-6 py-4">
                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => onEdit(item)}
                                        className="px-3 py-1.5 bg-[#4A8EBC]/10 text-[#4A8EBC] rounded-lg hover:bg-[#4A8EBC]/20 transition-all flex items-center gap-1.5 font-medium text-sm"
                                    >
                                        <Edit className="w-3.5 h-3.5" />
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => onDelete(item.id || item._id)}
                                        disabled={deletingId === (item.id || item._id)}
                                        className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all flex items-center gap-1.5 font-medium text-sm disabled:opacity-50"
                                    >
                                        {deletingId === (item.id || item._id) ? (
                                            <div className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                <Trash2 className="w-3.5 h-3.5" />
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

export default TestimonialList;

import React, { useState, useEffect } from 'react';
import { X, Upload, Loader2, Star } from 'lucide-react';

const TestimonialForm = ({
    isOpen,
    onClose,
    onSubmit,
    initialData,
    loading
}) => {
    const [formData, setFormData] = useState({
        name: '',
        position: '',
        company: '',
        rating: 5,
        text: '',
        image: null,
        featured: false
    });
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name || '',
                position: initialData.position || '',
                company: initialData.company || '',
                rating: initialData.rating || 5,
                text: initialData.text || '',
                image: initialData.image || null,
                featured: initialData.featured || false
            });
            setImagePreview(initialData.image || null);
        } else {
            setFormData({
                name: '',
                position: '',
                company: '',
                rating: 5,
                text: '',
                image: null,
                featured: false
            });
            setImagePreview(null);
        }
    }, [initialData, isOpen]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({
                ...prev,
                imageFile: file
            }));
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const handleRating = (value) => {
        setFormData(prev => ({ ...prev, rating: value }));
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#1A2A44]/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-200 border border-[#4A8EBC]/20">

                {/* Header */}
                <div className="px-8 py-6 border-b border-[#4A8EBC]/10 flex justify-between items-center sticky top-0 bg-white z-10">
                    <div>
                        <h2 className="text-2xl font-black text-[#1A2A44]">
                            {initialData ? 'Edit Testimonial' : 'New Testimonial'}
                        </h2>
                        <p className="text-[#2B4066]/60 text-sm mt-1">
                            Add client feedback and reviews
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-[#4A8EBC]/10 rounded-xl text-[#2B4066] transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-[#1A2A44]">Client Name <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-xl border border-[#4A8EBC]/20 focus:border-[#4A8EBC] focus:ring-4 focus:ring-[#4A8EBC]/10 bg-[#F5FAFF] outline-none transition-all font-medium"
                                placeholder="e.g. John Doe"
                            />
                        </div>

                        {/* Position */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-[#1A2A44]">Position <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                name="position"
                                value={formData.position}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-xl border border-[#4A8EBC]/20 focus:border-[#4A8EBC] focus:ring-4 focus:ring-[#4A8EBC]/10 bg-[#F5FAFF] outline-none transition-all font-medium"
                                placeholder="e.g. CEO"
                            />
                        </div>

                        {/* Company */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-[#1A2A44]">Company (Optional)</label>
                            <input
                                type="text"
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-[#4A8EBC]/20 focus:border-[#4A8EBC] focus:ring-4 focus:ring-[#4A8EBC]/10 bg-[#F5FAFF] outline-none transition-all font-medium"
                                placeholder="e.g. TechCorp Inc."
                            />
                        </div>

                        {/* Rating */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-[#1A2A44]">Rating</label>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => handleRating(star)}
                                        className="focus:outline-none"
                                    >
                                        <Star
                                            className={`w-8 h-8 transition-colors ${star <= formData.rating
                                                    ? 'fill-yellow-400 text-yellow-400'
                                                    : 'text-gray-300 hover:text-yellow-200'
                                                }`}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Testimonial Text */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-[#1A2A44]">Message <span className="text-red-500">*</span></label>
                        <textarea
                            name="text"
                            value={formData.text}
                            onChange={handleChange}
                            rows="4"
                            required
                            className="w-full px-4 py-3 rounded-xl border border-[#4A8EBC]/20 focus:border-[#4A8EBC] focus:ring-4 focus:ring-[#4A8EBC]/10 bg-[#F5FAFF] outline-none transition-all font-medium resize-none"
                            placeholder="Enter client's feedback..."
                        ></textarea>
                    </div>

                    {/* Image Upload */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-[#1A2A44]">Client Photo</label>
                        <div className="flex items-center gap-6">
                            <div
                                onClick={() => document.getElementById('image-upload').click()}
                                className="relative group cursor-pointer w-24 h-24 rounded-full border-2 border-dashed border-[#4A8EBC]/30 hover:border-[#4A8EBC] flex items-center justify-center bg-[#F5FAFF] transition-all overflow-hidden"
                            >
                                {imagePreview ? (
                                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <Upload className="w-8 h-8 text-[#4A8EBC]/40 group-hover:text-[#4A8EBC] transition-colors" />
                                )}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-medium">
                                    Change
                                </div>
                            </div>
                            <input
                                id="image-upload"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                            <div className="text-sm text-[#2B4066]/60">
                                <p>Click to upload image.</p>
                                <p>JPG, PNG or GIF (Max 2MB)</p>
                            </div>
                        </div>
                    </div>

                    {/* Featured Toggle */}
                    <div className="flex items-center gap-3 bg-[#F5FAFF] p-4 rounded-xl border border-[#4A8EBC]/10">
                        <input
                            type="checkbox"
                            id="featured"
                            name="featured"
                            checked={formData.featured}
                            onChange={handleChange}
                            className="w-5 h-5 text-[#4A8EBC] rounded focus:ring-[#4A8EBC]"
                        />
                        <label htmlFor="featured" className="text-sm font-bold text-[#1A2A44] cursor-pointer selection:bg-none">
                            Mark as Featured Testimonial
                        </label>
                    </div>

                    {/* Footer Actions */}
                    <div className="pt-6 flex items-center justify-end gap-3 border-t border-[#4A8EBC]/10">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2.5 rounded-xl text-[#2B4066] font-bold hover:bg-[#F5FAFF] transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-8 py-2.5 bg-gradient-to-r from-[#4A8EBC] to-[#3B5488] text-white rounded-xl font-bold hover:shadow-lg hover:shadow-[#4A8EBC]/25 transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                'Save Testimonial'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TestimonialForm;

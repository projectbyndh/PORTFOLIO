import React, { useState, useEffect } from 'react';
import { Camera, X, Save } from 'lucide-react';
import { getImageUrl } from '../../utils/getImageUrl';

const VISIBLE_ON_OPTIONS = [
    { value: 'team', label: 'Team Page' },
    { value: 'about', label: 'About Page' },
];

export default function LayerForm({ layer, onClose, onSubmit }) {
    const [formData, setFormData] = useState({
        title: layer?.title || '',
        key: layer?.key || '',
        description: layer?.description || '',
        order: layer?.order || 0,
        isActive: layer?.isActive !== undefined ? layer.isActive : true,
        visibleOn: layer?.visibleOn || ['team'],
        image: layer?.image || ''
    });

    const [previewUrl, setPreviewUrl] = useState(layer?.image ? getImageUrl(layer.image, 'default') : '');
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        if (layer) {
            setFormData({
                title: layer.title || '',
                key: layer.key || '',
                description: layer.description || '',
                order: layer.order || 0,
                isActive: layer.isActive !== undefined ? layer.isActive : true,
                visibleOn: layer.visibleOn || ['team'],
                image: layer.image || ''
            });
            setPreviewUrl(layer.image ? getImageUrl(layer.image, 'default') : '');
        }
    }, [layer]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => {
            const newData = { ...prev, [name]: value };
            // Auto-generate key from title if it's a new layer or key is empty
            if (name === 'title' && (!layer || !prev.key)) {
                newData.key = value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
            }
            return newData;
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const submitData = new FormData();
        submitData.append('title', formData.title);
        submitData.append('key', formData.key);
        submitData.append('description', formData.description);
        submitData.append('order', formData.order);
        submitData.append('isActive', formData.isActive);
        submitData.append('visibleOn', JSON.stringify(formData.visibleOn));
        if (selectedFile) {
            submitData.append('image', selectedFile);
        }
        onSubmit(submitData, layer?.id);
        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Header Image/Logo */}
            <div className="flex flex-col items-center mb-6">
                <label className="block text-sm font-semibold text-[#1A2A44] mb-4 text-center">Section Logo / Icon</label>
                <div className="relative group">
                    <div className="w-32 h-32 rounded-2xl bg-neutral-100 flex items-center justify-center border-2 border-dashed border-[#4A8EBC]/20 overflow-hidden">
                        {previewUrl ? (
                            <img src={previewUrl} alt="Preview" className="w-full h-full object-contain" />
                        ) : (
                            <Camera className="w-8 h-8 text-neutral-400" />
                        )}
                    </div>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        accept="image/*"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-2xl pointer-events-none">
                        <Camera className="text-white w-6 h-6" />
                    </div>
                </div>
                <p className="text-xs text-neutral-500 mt-2 italic">Recommended: Square PNG with transparent background</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-semibold text-[#1A2A44] mb-2">Layer Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-[#4A8EBC]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4A8EBC]/30"
                        placeholder="e.g. Executive Leadership"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-[#1A2A44] mb-2">Key (URL/Code)</label>
                    <input
                        type="text"
                        name="key"
                        value={formData.key}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-[#4A8EBC]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4A8EBC]/30 bg-neutral-50"
                        placeholder="executive-leadership"
                        required
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-semibold text-[#1A2A44] mb-2">Display Order</label>
                <input
                    type="number"
                    name="order"
                    value={formData.order}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-[#4A8EBC]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4A8EBC]/30"
                    required
                />
            </div>

            {/* Description */}
            <div>
                <label className="block text-sm font-semibold text-[#1A2A44] mb-2">Description / Subtitle</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={2}
                    className="w-full px-4 py-3 border-2 border-[#4A8EBC]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4A8EBC]/30"
                    placeholder="Brief description shown below the layer title on public pages"
                />
            </div>

            {/* Active Toggle & Visible On */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-semibold text-[#1A2A44] mb-2">Status</label>
                    <label className="flex items-center gap-3 px-4 py-3 border-2 border-[#4A8EBC]/20 rounded-xl cursor-pointer hover:bg-[#F5FAFF] transition-all">
                        <input
                            type="checkbox"
                            checked={formData.isActive}
                            onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                            className="w-5 h-5 text-[#4A8EBC] rounded border-neutral-300 focus:ring-[#4A8EBC]"
                        />
                        <span className="text-sm font-medium text-[#1A2A44]">Active (show on public site)</span>
                    </label>
                </div>
                <div>
                    <label className="block text-sm font-semibold text-[#1A2A44] mb-2">Visible On Pages</label>
                    <div className="space-y-2">
                        {VISIBLE_ON_OPTIONS.map(opt => (
                            <label key={opt.value} className="flex items-center gap-3 px-4 py-2 border border-[#4A8EBC]/10 rounded-lg cursor-pointer hover:bg-[#F5FAFF] transition-all">
                                <input
                                    type="checkbox"
                                    checked={formData.visibleOn.includes(opt.value)}
                                    onChange={(e) => {
                                        setFormData(prev => ({
                                            ...prev,
                                            visibleOn: e.target.checked
                                                ? [...prev.visibleOn, opt.value]
                                                : prev.visibleOn.filter(v => v !== opt.value)
                                        }));
                                    }}
                                    className="w-4 h-4 text-[#4A8EBC] rounded border-neutral-300 focus:ring-[#4A8EBC]"
                                />
                                <span className="text-sm text-[#1A2A44]">{opt.label}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex gap-3 pt-4">
                <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-6 py-3 border-2 border-neutral-200 text-neutral-600 rounded-xl font-semibold hover:bg-neutral-50 transition-all"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-[#4A8EBC] to-[#3B5488] text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                    <Save size={20} />
                    {layer ? 'Update Layer' : 'Create Layer'}
                </button>
            </div>
        </form>
    );
}

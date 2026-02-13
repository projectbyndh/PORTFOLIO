import React, { useState, useEffect } from 'react';
import ImageUploadPreview from './ImageUploadPreview';
import { Linkedin, Github, Mail } from 'lucide-react';
import { getImageUrl } from '../utils/getImageUrl';

const TeamForm = ({ member, categories = [], onClose, onSubmit }) => {
  const [submitting, setSubmitting] = useState(false);

  // Parse social links if they exist
  const initialSocials = member?.socialLinks || {};

  const [formData, setFormData] = useState({
    name: '',
    layerId: '',
    title: '',
    bio: '',
    image: '',
    isPublic: true,
    order: 0,
    linkedin: '',
    github: '',
    email: ''
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const socials = member?.socialLinks || {};
    setFormData({
      name: member?.name || '',
      layerId: member?.layerId ? String(member.layerId) : '',
      title: member?.title || '',
      bio: member?.bio || member?.description || '',
      image: member?.image || '',
      isPublic: member?.isPublic !== undefined ? member.isPublic : true,
      order: member?.order || 0,
      linkedin: socials.linkedin || '',
      github: socials.github || '',
      email: socials.email || ''
    });
    setPreviewUrl(member?.image ? getImageUrl(member.image, 'team') : '');
    setSelectedFile(null);
  }, [member]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageSelect = (file) => {
    setSelectedFile(file);
    const preview = URL.createObjectURL(file);
    setPreviewUrl(preview);
    setFormData(prev => ({ ...prev, image: '' })); // Clear string URL if new file selected
    if (errors.image) setErrors(prev => ({ ...prev, image: '' }));
  };

  const handleImageRemove = () => {
    setSelectedFile(null);
    setPreviewUrl('');
    setFormData(prev => ({ ...prev, image: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.layerId) newErrors.layerId = 'Category selection is required';
    if (!formData.title.trim()) newErrors.title = 'Job title is required';
    if (!formData.bio.trim()) newErrors.bio = 'Bio is required';

    // Check if we have either a file or an existing image URL or preview
    if (!selectedFile && !formData.image && !previewUrl) {
      newErrors.image = 'Profile image is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setSubmitting(true);
      const data = new FormData();
      data.append('name', formData.name);
      data.append('layerId', formData.layerId);
      data.append('title', formData.title);
      data.append('bio', formData.bio);
      data.append('isPublic', formData.isPublic);
      data.append('order', formData.order);

      const socialLinks = JSON.stringify({
        linkedin: formData.linkedin,
        github: formData.github,
        email: formData.email
      });
      data.append('socialLinks', socialLinks);

      if (selectedFile) {
        data.append('image', selectedFile);
      } else if (member?.image) {
        // Should backend handle "keep existing"? Usually yes if no file provided.
        // But my controller checks `if (req.file)`. 
        // So if I don't send `image` field, it just keeps old record data if this is an update.
        // But if creating, image is required.
      }

      await onSubmit(data, member?.id);
      onClose();
    } catch (err) {
      console.error(err);
      // Parent handles toast usually
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <div>
        <label className="block text-sm font-semibold text-[#26a8df] mb-2">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border-2 border-[#26a8df]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#26a8df]/30 focus:border-[#26a8df] transition-all"
          placeholder="John Doe"
        />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
      </div>

      {/* Category Select */}
      <div>
        <label htmlFor="layerId" className="block text-sm font-semibold text-[#26a8df] mb-2">
          Category <span className="text-red-500">*</span>
        </label>
        <select
          name="layerId"
          id="layerId"
          value={formData.layerId || ''}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border-2 border-[#26a8df]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#26a8df]/30 focus:border-[#26a8df] transition-all bg-white text-[#26a8df] font-medium block"
          required
        >
          <option value="">-- Select a Category --</option>
          {categories.map(category => (
            <option key={category.id} value={String(category.id)}>
              {category.title}
            </option>
          ))}
        </select>
        {categories.length === 0 && (
          <p className="text-amber-500 text-xs mt-2 italic">
            ⚠️ Setup Required: Create categories first (e.g., CEO, Developer, Marketing).
          </p>
        )}
        {errors.layerId && <p className="text-red-500 text-xs mt-1">{errors.layerId}</p>}
      </div>

      {/* Job Title */}
      <div>
        <label className="block text-sm font-semibold text-[#26a8df] mb-2">
          Job Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border-2 border-[#26a8df]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#26a8df]/30 focus:border-[#26a8df] transition-all"
          placeholder="e.g., Chief Executive Officer, Senior Developer, Marketing Manager"
        />
        {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
        <p className="text-xs text-neutral-400 mt-1">This will be displayed on the team member card</p>
      </div>

      {/* Visibility & Order Row */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-[#26a8df] mb-2">Display Order</label>
          <input
            type="number"
            name="order"
            value={formData.order}
            onChange={handleInputChange}
            min="0"
            className="w-full px-4 py-3 border-2 border-[#26a8df]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#26a8df]/30 focus:border-[#26a8df] transition-all"
          />
          <p className="text-xs text-neutral-400 mt-1">Lower number = shown first</p>
        </div>
        <div>
          <label className="block text-sm font-semibold text-[#26a8df] mb-2">Visibility</label>
          <label className="flex items-center gap-3 px-4 py-3 border-2 border-[#26a8df]/20 rounded-xl cursor-pointer hover:bg-[#F5FAFF] transition-all">
            <input
              type="checkbox"
              checked={formData.isPublic}
              onChange={(e) => setFormData(prev => ({ ...prev, isPublic: e.target.checked }))}
              className="w-5 h-5 text-[#26a8df] rounded border-neutral-300 focus:ring-[#26a8df]"
            />
            <span className="text-sm font-medium text-[#26a8df]">Show on public site</span>
          </label>
        </div>
      </div>

      {/* Bio */}
      <div>
        <label className="block text-sm font-semibold text-[#26a8df] mb-2">
          Bio <span className="text-red-500">*</span>
        </label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleInputChange}
          rows={4}
          className="w-full px-4 py-3 border-2 border-[#26a8df]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#26a8df]/30 focus:border-[#26a8df] transition-all"
          placeholder="Brief professional biography..."
        />
        {errors.bio && <p className="text-red-500 text-xs mt-1">{errors.bio}</p>}
      </div>

      {/* Image */}
      <div>
        <label className="block text-sm font-semibold text-[#26a8df] mb-2">
          Profile Image <span className="text-red-500">*</span>
        </label>
        <ImageUploadPreview
          currentImage={previewUrl}
          onImageUpload={handleImageSelect}
          onImageRemove={handleImageRemove}
          showUploadButton={false}
        />
        {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
      </div>

      {/* Social Links */}
      <div className="space-y-4 pt-4 border-t border-neutral-100">
        <h4 className="text-sm font-semibold text-[#26a8df]">Social Links</h4>

        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
            <Linkedin size={18} />
          </div>
          <input
            type="text"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleInputChange}
            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#26a8df]"
            placeholder="LinkedIn URL"
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2 bg-gray-100 text-gray-800 rounded-lg">
            <Github size={18} />
          </div>
          <input
            type="text"
            name="github"
            value={formData.github}
            onChange={handleInputChange}
            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#26a8df]"
            placeholder="GitHub URL"
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2 bg-red-50 text-red-500 rounded-lg">
            <Mail size={18} />
          </div>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#26a8df]"
            placeholder="Email Address"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-6 border-t border-[#26a8df]/10">
        <button
          type="button"
          onClick={onClose}
          disabled={submitting}
          className="px-6 py-2.5 text-sm font-semibold text-[#26a8df] bg-[#26a8df]/5 hover:bg-[#26a8df]/10 rounded-xl transition-all"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-[#26a8df] to-[#26a8df] rounded-xl transition-all hover:shadow-lg disabled:opacity-50"
        >
          {submitting ? 'Saving...' : (member ? 'Update Member' : 'Add Member')}
        </button>
      </div>
    </form>
  );
};

export default TeamForm;
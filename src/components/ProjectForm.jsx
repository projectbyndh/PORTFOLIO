import React, { useState, useEffect } from 'react';
import useProjects from '../hooks/useProjects';
import ImageUploadPreview from './ImageUploadPreview';

const ProjectForm = ({ project, onClose }) => {
  const { createProject, updateProject } = useProjects();
  const [submitting, setSubmitting] = useState(false);
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [formData, setFormData] = useState({
    title: project?.title || '',
    description: project?.description || '',
    techStack: project?.techStack ? project.techStack.join(', ') : '',
    category: project?.category || '',
    links: project?.links ? project.links.join(', ') : ''
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Project title is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Project description is required';
    }
    if (!formData.techStack.trim()) {
      newErrors.techStack = 'Tech stack is required';
    }
    if (!formData.category.trim()) {
      newErrors.category = 'Project category is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setSubmitting(true);
      const projectData = {
        title: formData.title,
        description: formData.description,
        techStack: formData.techStack.split(',').map(tech => tech.trim()).filter(tech => tech),
        category: formData.category,
        links: formData.links ? formData.links.split(',').map(link => link.trim()).filter(link => link) : [],
        image: selectedImageFile
      };

      if (project) {
        await updateProject(project._id, projectData);
      } else {
        await createProject(projectData);
      }
      onClose();
    } catch (err) {
      // Error handled in hook
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative">
      {submitting && (
        <div className="absolute inset-0 bg-white/75 backdrop-blur-sm flex items-center justify-center z-10 rounded-xl">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#4A8EBC] mx-auto mb-2"></div>
            <p className="text-sm text-[#4A8EBC]">Saving...</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-[#1A2A44] mb-2">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 border-[#4A8EBC]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4A8EBC]/30 focus:border-[#4A8EBC] transition-all duration-200"
            placeholder="Enter project title"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#1A2A44] mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-4 py-3 border-2 border-[#4A8EBC]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4A8EBC]/30 focus:border-[#4A8EBC] transition-all duration-200"
            placeholder="Enter project description"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#1A2A44] mb-2">
            Tech Stack
          </label>
          <input
            type="text"
            name="techStack"
            value={formData.techStack}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 border-[#4A8EBC]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4A8EBC]/30 focus:border-[#4A8EBC] transition-all duration-200"
            placeholder="Enter technologies separated by commas (e.g., React, Node.js, MongoDB)"
          />
          {errors.techStack && (
            <p className="text-red-500 text-sm mt-1">{errors.techStack}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#1A2A44] mb-2">
            Category
          </label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 border-[#4A8EBC]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4A8EBC]/30 focus:border-[#4A8EBC] transition-all duration-200"
            placeholder="Enter project category (e.g., Web Development, Mobile App)"
          />
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">{errors.category}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#1A2A44] mb-2">
            Links (Optional)
          </label>
          <input
            type="text"
            name="links"
            value={formData.links}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 border-[#4A8EBC]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4A8EBC]/30 focus:border-[#4A8EBC] transition-all duration-200"
            placeholder="Enter project links separated by commas (optional)"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#1A2A44] mb-2">
            Project Image
          </label>
          <ImageUploadPreview
            currentImage={project?.image}
            onImageUpload={async (file) => {
              setSelectedImageFile(file);
              return file;
            }}
            onImageRemove={() => setSelectedImageFile(null)}
            uploading={uploadingImage}
          />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-[#4A8EBC]/10">
          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            className="px-5 py-2.5 text-sm font-semibold text-[#4A8EBC] bg-[#4A8EBC]/10 hover:bg-[#4A8EBC]/20 rounded-xl transition-all duration-200 border border-[#4A8EBC]/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-[#4A8EBC] to-[#3B5488] hover:from-[#3B5488] hover:to-[#4A8EBC] disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-all duration-200 shadow-lg shadow-[#4A8EBC]/25"
          >
            {submitting ? 'Saving...' : (project ? 'Update' : 'Create')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;
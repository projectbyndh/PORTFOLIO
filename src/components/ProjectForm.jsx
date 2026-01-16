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
    <div className="bg-white rounded-lg shadow-md p-6 relative">
      {submitting && (
        <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
            <p className="text-sm text-gray-600">Saving...</p>
          </div>
        </div>
      )}
      <h2 className="text-2xl font-bold mb-4">
        {project ? 'Edit Project' : 'Add Project'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter project title"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter project description"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tech Stack
          </label>
          <input
            type="text"
            name="techStack"
            value={formData.techStack}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter technologies separated by commas (e.g., React, Node.js, MongoDB)"
          />
          {errors.techStack && (
            <p className="text-red-500 text-sm mt-1">{errors.techStack}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter project category (e.g., Web Development, Mobile App)"
          />
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">{errors.category}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Links (Optional)
          </label>
          <input
            type="text"
            name="links"
            value={formData.links}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter project links separated by commas (optional)"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
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

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? 'Saving...' : (project ? 'Update' : 'Create')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;
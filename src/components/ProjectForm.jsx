import React, { useState, useEffect } from 'react';
import useProjects from '../hooks/useProjects';
import useCategories from '../hooks/useCategories';
import ImageUploadPreview from './ImageUploadPreview';
import { Plus } from 'lucide-react';

const ProjectForm = ({ project, onClose }) => {
  const { createProject, updateProject } = useProjects();
  const { categories: apiCategories, fetchCategories, createCategory } = useCategories();
  const [submitting, setSubmitting] = useState(false);
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  const [formData, setFormData] = useState({
    name: project?.name || '',
    client: project?.client || '',
    description: project?.description || '',
    techStack: project?.techStack ? project.techStack.join(', ') : '',
    category: project?.category || '',
    categories: project?.categories ? project.categories.join(', ') : (project?.category || ''),
    services: project?.services ? project.services.join(', ') : ''
  });

  useEffect(() => {
    fetchCategories();
  }, []);

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
    if (!formData.name.trim()) {
      newErrors.name = 'Project name is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (!formData.category.trim()) {
      newErrors.category = 'Primary category is required';
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
        name: formData.name,
        client: formData.client,
        description: formData.description,
        techStack: formData.techStack.split(',').map(item => item.trim()).filter(Boolean),
        category: formData.category,
        categories: formData.categories.split(',').map(item => item.trim()).filter(Boolean),
        services: formData.services.split(',').map(item => item.trim()).filter(Boolean),
        image: selectedImageFile
      };

      if (project) {
        await updateProject(project.id || project._id, projectData);
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

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return;
    try {
      const newCat = await createCategory({ name: newCategoryName });
      setFormData(prev => ({ ...prev, category: newCat.name }));
      setNewCategoryName('');
      setShowNewCategoryInput(false);
    } catch (err) {
      // Error handled in hook
    }
  };

  return (
    <div className="relative">
      {submitting && (
        <div className="absolute inset-0 bg-white/75 backdrop-blur-sm flex items-center justify-center z-10 rounded-xl">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#26a8df] mx-auto mb-2"></div>
            <p className="text-sm text-[#26a8df]">Saving...</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-[#26a8df] mb-2">
              Project Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 border-[#26a8df]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#26a8df]/30 focus:border-[#26a8df] transition-all duration-200"
              placeholder="e.g., Numazu Halal Food"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#26a8df] mb-2">
              Client Name
            </label>
            <input
              type="text"
              name="client"
              value={formData.client}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 border-[#26a8df]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#26a8df]/30 focus:border-[#26a8df] transition-all duration-200"
              placeholder="e.g., Numazu Food Court"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#26a8df] mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-4 py-3 border-2 border-[#26a8df]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#26a8df]/30 focus:border-[#26a8df] transition-all duration-200"
            placeholder="Describe the project objective and results..."
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-[#26a8df]">
                Primary Category (for Badge)
              </label>
              <button
                type="button"
                onClick={() => setShowNewCategoryInput(!showNewCategoryInput)}
                className="text-xs font-bold text-[#26a8df] flex items-center gap-1 hover:underline"
              >
                <Plus size={12} /> Add New
              </button>
            </div>
            {showNewCategoryInput ? (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className="flex-1 px-4 py-2 border-2 border-[#26a8df]/20 rounded-xl focus:outline-none border-[#26a8df]/50"
                  placeholder="Category Name"
                />
                <button
                  type="button"
                  onClick={handleAddCategory}
                  className="px-4 py-2 bg-[#26a8df] text-white rounded-xl text-sm font-bold"
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => setShowNewCategoryInput(false)}
                  className="px-2 py-2 text-gray-400"
                >
                  cancel
                </button>
              </div>
            ) : (
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-[#26a8df]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#26a8df]/30 focus:border-[#26a8df] transition-all duration-200"
              >
                <option value="">Select Primary Category</option>
                {apiCategories.map(cat => (
                  <option key={cat.id || cat._id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            )}
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">{errors.category}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#26a8df] mb-2">
              All Filter Categories (comma-separated)
            </label>
            <input
              type="text"
              name="categories"
              value={formData.categories}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 border-[#26a8df]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#26a8df]/30 focus:border-[#26a8df] transition-all duration-200"
              placeholder="e.g., Web Applications, Healthcare"
            />
            <div className="mt-1 flex flex-wrap gap-1">
              {apiCategories.map(cat => (
                <button
                  key={cat.id || cat._id}
                  type="button"
                  onClick={() => {
                    const current = formData.categories.split(',').map(c => c.trim()).filter(Boolean);
                    if (!current.includes(cat.name)) {
                      setFormData(prev => ({ ...prev, categories: [...current, cat.name].join(', ') }));
                    }
                  }}
                  className="text-[10px] bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded text-gray-600"
                >
                  + {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#26a8df] mb-2">
            Tech Stack (comma-separated)
          </label>
          <input
            type="text"
            name="techStack"
            value={formData.techStack}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 border-[#26a8df]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#26a8df]/30 focus:border-[#26a8df] transition-all duration-200"
            placeholder="e.g., React, Node.js, PostgreSQL"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#26a8df] mb-2">
            Services/Key Features (comma-separated)
          </label>
          <input
            type="text"
            name="services"
            value={formData.services}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 border-[#26a8df]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#26a8df]/30 focus:border-[#26a8df] transition-all duration-200"
            placeholder="e.g., E-commerce portal, Admin Analytics"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#26a8df] mb-2">
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

        <div className="flex justify-end gap-3 pt-6 border-t border-[#26a8df]/10">
          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            className="px-6 py-2.5 text-sm font-semibold text-[#26a8df] bg-[#26a8df]/5 hover:bg-[#26a8df]/10 rounded-xl transition-all duration-200 border border-[#26a8df]/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-[#26a8df] to-[#26a8df] hover:shadow-lg hover:shadow-[#26a8df]/25 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-all duration-200"
          >
            {submitting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Saving...
              </div>
            ) : (project ? 'Update Project' : 'Create Project')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;
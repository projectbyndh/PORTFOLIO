import React, { useState } from 'react';
import useProjects from '../hooks/useProjects';
import ProjectForm from '../components/ProjectForm';
import Loader from '../components/Loader';

const ProjectManagement = () => {
  const { projects, loading, error, deleteProject, fetchProjects } = useProjects();
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const handleEdit = (project) => {
    setEditingProject(project);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        setDeletingId(id);
        await deleteProject(id);
      } catch (err) {
        // Error handled in hook
      } finally {
        setDeletingId(null);
      }
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingProject(null);
  };

  const handleRetry = () => {
    fetchProjects();
  };

  if (loading && projects.length === 0) return <Loader />;
  if (error && projects.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-8">
          <div className="text-red-500 mb-4">{error}</div>
          <button
            onClick={handleRetry}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Project Management</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add New Project
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project._id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {project.image && (
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            )}
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{project.title}</h3>
              <p className="text-gray-600 mb-3 line-clamp-3">{project.description}</p>

              <div className="mb-3">
                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  {project.category}
                </span>
              </div>

              {project.techStack && project.techStack.length > 0 && (
                <div className="mb-3">
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Tech Stack:</h4>
                  <div className="flex flex-wrap gap-1">
                    {project.techStack.map((tech, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {project.links && project.links.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Links:</h4>
                  <div className="space-y-1">
                    {project.links.map((link, index) => (
                      <a
                        key={index}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm block truncate"
                      >
                        {link}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => handleEdit(project)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
                  disabled={deletingId === project._id}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(project._id)}
                  disabled={deletingId === project._id}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm disabled:opacity-50"
                >
                  {deletingId === project._id ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {projects.length === 0 && !loading && (
        <div className="text-center py-8">
          <p className="text-gray-500">No projects found. Add your first project!</p>
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-[#26a8df]/40 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl shadow-[#26a8df]/20 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#26a8df]/10">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-[#26a8df]/10">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-[#26a8df] to-[#26a8df] bg-clip-text text-transparent">
                  {editingProject ? 'Edit Project' : 'Add New Project'}
                </h2>
                <button
                  onClick={handleFormClose}
                  className="p-2 text-[#26a8df] hover:bg-[#26a8df]/10 rounded-xl transition-all duration-200 text-2xl leading-none"
                >
                  ×
                </button>
              </div>
              <ProjectForm
                project={editingProject}
                onClose={handleFormClose}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectManagement;
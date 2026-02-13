import React, { useState } from 'react';
import useTeams from '../hooks/useTeams';
import TeamForm from '../components/TeamForm';
import Loader from '../components/Loader';

const TeamManagement = () => {
  const { teams, loading, error, deleteTeam, fetchTeams } = useTeams();
  const [showForm, setShowForm] = useState(false);
  const [editingTeam, setEditingTeam] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const handleEdit = (team) => {
    setEditingTeam(team);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this team member?')) {
      try {
        setDeletingId(id);
        await deleteTeam(id);
      } catch (err) {
        // Error handled in hook
      } finally {
        setDeletingId(null);
      }
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingTeam(null);
  };

  const handleRetry = () => {
    fetchTeams();
  };

  if (loading && teams.length === 0) return <Loader />;
  if (error && teams.length === 0) {
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
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Team Management</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Team Member
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-[#26a8df]/40 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl shadow-[#26a8df]/20 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#26a8df]/10">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-[#26a8df]/10">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-[#26a8df] to-[#26a8df] bg-clip-text text-transparent">
                  {editingTeam ? 'Edit Team Member' : 'Add Team Member'}
                </h2>
                <button
                  onClick={handleFormClose}
                  className="p-2 text-[#26a8df] hover:bg-[#26a8df]/10 rounded-xl transition-all duration-200 text-2xl leading-none"
                >
                  ×
                </button>
              </div>
              <TeamForm
                team={editingTeam}
                onClose={handleFormClose}
              />
            </div>
          </div>
        </div>
      )}

      {teams.length === 0 ? (
        <div className="text-center py-8 text-gray-500">No team members found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map((team) => (
            <div
              key={team._id}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <div className="flex flex-col items-center mb-4">
                <img
                  src={team.image}
                  alt={team.name}
                  className="w-20 h-20 object-cover rounded-full mb-2"
                  onError={(e) => {
                    e.target.src = '/placeholder-team.png';
                  }}
                />
                <h3 className="text-lg font-semibold text-center">{team.name}</h3>
                <p className="text-sm text-gray-600 text-center">{team.position}</p>
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-700 text-center line-clamp-3">
                  {team.description}
                </p>
              </div>
              <div className="flex justify-between">
                <button
                  onClick={() => handleEdit(team)}
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(team._id)}
                  disabled={deletingId === team._id}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm disabled:opacity-50"
                >
                  {deletingId === team._id ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeamManagement;
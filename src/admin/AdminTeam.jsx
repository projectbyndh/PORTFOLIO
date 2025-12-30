
import React, { useState, useEffect } from "react";

import Sidebar from "./Sidebar";

const TEAM_KEY = "teamMembers";

export default function AdminTeam() {
  const [form, setForm] = useState({
    name: "",
    position: "",
    bio: "",
    image: ""
  });
  const [editIndex, setEditIndex] = useState(null);
  const [team, setTeam] = useState([]);
  const [imagePreview, setImagePreview] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem(TEAM_KEY);
    console.log('Raw teamMembers data from localStorage:', stored);
    setTeam(stored ? JSON.parse(stored) : []);
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({ ...prev, image: reader.result }));
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updated = [...team];
      updated[editIndex] = form;
      setTeam(updated);
      localStorage.setItem(TEAM_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event("teamMembersUpdated"));
      setEditIndex(null);
    } else {
      const updated = [...team, form];
      setTeam(updated);
      localStorage.setItem(TEAM_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event("teamMembersUpdated"));
    }
    setForm({ name: "", position: "", bio: "", image: "" });
  };

  const handleEdit = (idx) => {
    setForm(team[idx]);
    setEditIndex(idx);
  };

  const handleDelete = (idx) => {
    setDeleteIndex(idx);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (deleteIndex !== null) {
      const updated = team.filter((_, i) => i !== deleteIndex);
      setTeam(updated);
      localStorage.setItem(TEAM_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event("teamMembersUpdated"));
      setEditIndex(null);
      setForm({ name: "", position: "", bio: "", image: "" });
      setDeleteIndex(null);
      setShowDeleteModal(false);
    }
  };

  const cancelDelete = () => {
    setDeleteIndex(null);
    setShowDeleteModal(false);
  };

  return (
    <>
    <div className="flex min-h-screen bg-[#F5FAFF]">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg mt-10 p-8">
          <h2 className="text-2xl font-bold mb-6 text-[#1A2A44]">Manage Team Members</h2>
          <form onSubmit={handleSubmit} className="space-y-4 mb-8">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Name"
              className="border p-3 w-full rounded-lg"
              required
            />
            <input
              type="text"
              name="position"
              value={form.position}
              onChange={handleChange}
              placeholder="Position"
              className="border p-3 w-full rounded-lg"
              required
            />
            <input
              type="text"
              name="bio"
              value={form.bio}
              onChange={handleChange}
              placeholder="Bio"
              className="border p-3 w-full rounded-lg"
              required
            />
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex-1">
                <label className="block mb-2 font-semibold text-[#1A2A44]">Upload Image</label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="border p-3 w-full rounded-lg"
                />
              </div>
              <div className="flex-1 flex flex-col items-center">
                {imagePreview || form.image ? (
                  <img src={imagePreview || form.image} alt="Preview" className="w-20 h-20 rounded-full object-cover mb-2 border" />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 mb-2">No Image</div>
                )}
              </div>
            </div>
            <button type="submit" className="bg-gradient-to-r from-[#4A8EBC] to-[#3B5488] text-white px-6 py-2 rounded-full font-semibold shadow hover:scale-105 transition-all">
              {editIndex !== null ? "Update Member" : "Add Member"}
            </button>
          </form>
          <div>
            <h3 className="text-xl font-semibold mb-4 text-[#1A2A44]">Current Team</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {team.length === 0 && <p className="text-gray-500 col-span-full">No team members added yet.</p>}
              {team.map((member, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl shadow-xl border border-[#4A8EBC]/10 flex flex-col items-center p-6 group hover:scale-105 transition-transform duration-300 animate-fadeIn"
                  style={{ animationDelay: `${idx * 80}ms` }}
                >
                  <div className="relative w-24 h-24 mb-4">
                    <img
                      src={member.image || "/placeholder.svg?height=120&width=120"}
                      alt={member.name}
                      className="w-24 h-24 rounded-full object-cover border-4 border-[#E0F0FF] shadow group-hover:border-[#4A8EBC] transition-all duration-300"
                      onError={e => { e.target.src = "/placeholder.svg?height=120&width=120"; }}
                    />
                    <div className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-br from-[#4A8EBC] to-[#3B5488] border-2 border-white flex items-center justify-center text-white text-xs font-bold shadow">{idx+1}</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-lg text-[#1A2A44] mb-1">{member.name}</div>
                    <div className="text-[#4A8EBC] font-medium mb-1">{member.position}</div>
                    <div className="text-gray-700 text-sm mb-2">{member.bio}</div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => handleEdit(idx)}
                      className="flex items-center gap-1 px-4 py-1 bg-[#4A8EBC] text-white rounded-full font-semibold shadow hover:bg-[#3B5488] transition-all group/edit relative"
                      title="Edit Member"
                    >
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(idx)}
                      className="flex items-center gap-1 px-4 py-1 bg-red-500 text-white rounded-full font-semibold shadow hover:bg-red-600 transition-all group/delete relative"
                      title="Delete Member"
                    >
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    {/* Delete Confirmation Modal */}
    {showDeleteModal && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div className="bg-white rounded-xl shadow-2xl p-8 max-w-sm w-full flex flex-col items-center animate-fadeIn">
          <div className="w-12 h-12 mb-4 flex items-center justify-center bg-red-100 rounded-full">
            <span className="text-red-500 text-3xl font-bold">!</span>
          </div>
          <h4 className="text-lg font-bold mb-2 text-[#1A2A44]">Delete Team Member?</h4>
          <p className="text-gray-600 mb-6 text-center">Are you sure you want to delete this team member? This action cannot be undone.</p>
          <div className="flex gap-4">
            <button onClick={confirmDelete} className="bg-red-500 text-white px-5 py-2 rounded-full font-semibold shadow hover:bg-red-600 transition-all">Delete</button>
            <button onClick={cancelDelete} className="bg-gray-200 text-[#1A2A44] px-5 py-2 rounded-full font-semibold shadow hover:bg-gray-300 transition-all">Cancel</button>
          </div>
        </div>
      </div>
    )}
    </div>
    </>
    );
}

// Tailwind CSS animation for fade-in
// Add this to your global CSS if not present:
// .animate-fadeIn { animation: fadeIn 0.6s both; }
// @keyframes fadeIn { from { opacity: 0; transform: translateY(20px);} to { opacity: 1; transform: none; } }

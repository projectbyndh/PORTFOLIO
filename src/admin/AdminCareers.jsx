import AdminCareerApplications from "./AdminCareerApplications";

import React, { useState } from "react";
import AdminLayout from "./Layout";

export default function AdminCareers() {
  const [careers, setCareers] = useState(() => {
    const stored = localStorage.getItem("careers");
    return stored ? JSON.parse(stored) : [];
  });
  const [image, setImage] = useState("");
  const [imageName, setImageName] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    setImageName(file.name);
    const reader = new FileReader();
    reader.onload = (evt) => {
      setImage(evt.target?.result || "");
    };
    reader.readAsDataURL(file);
  };

  const addCareer = (e) => {
    e.preventDefault();
    if (!image) return;
    const newCareer = { id: Date.now(), image };
    const updated = [...careers, newCareer];
    setCareers(updated);
    localStorage.setItem("careers", JSON.stringify(updated));
    setImage("");
    setImageName("");
  };

  const removeCareer = (id) => {
    const updated = careers.filter((c) => c.id !== id);
    setCareers(updated);
    localStorage.setItem("careers", JSON.stringify(updated));
  };

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto w-full">
        <div className="bg-white/60 backdrop-blur-md rounded-2xl shadow-2xl p-10 min-h-[60vh] border border-[#4A8EBC]/20">
          <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#1A2A44] to-[#4A8EBC] mb-10 text-center tracking-tight">
            Manage Careers
          </h1>
          <form onSubmit={addCareer} className="mb-8 space-y-4 max-w-xl mx-auto">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#1A2A44]">Upload Career Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="border p-2 w-full rounded-lg focus:ring-2 focus:ring-[#4A8EBC]"
              />
              {image && (
                <div className="mt-2 flex items-center gap-3">
                  <div className="w-16 h-16 rounded-lg overflow-hidden border">
                    <img src={image} alt={imageName || "Preview"} className="w-full h-full object-cover" />
                  </div>
                  <span className="text-sm text-gray-600 truncate max-w-[200px]">{imageName}</span>
                </div>
              )}
            </div>
            <button type="submit" className="bg-gradient-to-r from-[#4A8EBC] to-[#3B5488] text-white px-6 py-2 rounded-full font-semibold shadow hover:scale-105 transition-all">
              Add Career
            </button>
          </form>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {careers.map(c => (
              <div key={c.id} className="relative group">
                <div className="aspect-square rounded-xl overflow-hidden border bg-white shadow-sm">
                  {c.image ? (
                    <img src={c.image} alt="Career" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">No image</div>
                  )}
                </div>
                <button 
                  onClick={() => removeCareer(c.id)} 
                  className="absolute top-2 right-2 bg-red-500 text-white w-6 h-6 rounded-full text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
        <AdminCareerApplications />
      </div>
    </AdminLayout>
  );
}

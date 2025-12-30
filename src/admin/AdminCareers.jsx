import AdminCareerApplications from "./AdminCareerApplications";

import React, { useState } from "react";
import AdminLayout from "./Layout";

export default function AdminCareers() {
  const [careers, setCareers] = useState(() => {
    const stored = localStorage.getItem("careers");
    return stored ? JSON.parse(stored) : [];
  });
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const addCareer = (e) => {
    e.preventDefault();
    if (!title.trim() || !desc.trim()) return;
    const newCareer = { id: Date.now(), title, desc };
    const updated = [...careers, newCareer];
    setCareers(updated);
    localStorage.setItem("careers", JSON.stringify(updated));
    setTitle("");
    setDesc("");
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
            <input
              className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-[#4A8EBC]"
              placeholder="Job Title"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            <textarea
              className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-[#4A8EBC]"
              placeholder="Job Description"
              value={desc}
              onChange={e => setDesc(e.target.value)}
            />
            <button type="submit" className="bg-gradient-to-r from-[#4A8EBC] to-[#3B5488] text-white px-6 py-2 rounded-full font-semibold shadow hover:scale-105 transition-all">
              Add Career
            </button>
          </form>
          <ul className="space-y-4 max-w-xl mx-auto">
            {careers.map(c => (
              <li key={c.id} className="border p-4 rounded-xl flex justify-between items-center bg-white/80 shadow-sm">
                <div>
                  <div className="font-semibold text-lg text-[#1A2A44]">{c.title}</div>
                  <div className="text-sm text-gray-600">{c.desc}</div>
                </div>
                <button onClick={() => removeCareer(c.id)} className="text-red-500 font-bold px-3 py-1 rounded hover:bg-red-50 transition-all">Delete</button>
              </li>
            ))}
          </ul>
        </div>
        <AdminCareerApplications />
      </div>
    </AdminLayout>
  );
}

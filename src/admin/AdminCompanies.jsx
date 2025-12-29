
import React, { useState } from "react";
import useCompanyStore from "../Store/CompanyStore";
import AdminLayout from "./Layout";

export default function AdminCompanies() {
  const companies = useCompanyStore((state) => state.companies);
  const addCompany = useCompanyStore((state) => state.addCompany);
  const clearCompanies = useCompanyStore((state) => state.clearCompanies);
  const [form, setForm] = useState({ name: "", logoUrl: "" });
  const [error, setError] = useState("");


  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "logoFile" && files && files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setForm((prev) => ({ ...prev, logoUrl: ev.target.result }));
      };
      reader.readAsDataURL(files[0]);
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.name || !form.logoUrl) {
      setError("Both name and logo URL are required.");
      return;
    }
    addCompany({ id: Date.now(), ...form });
    setForm({ name: "", logoUrl: "" });
    setError("");
  };

  return (
    <AdminLayout>
      <div className="max-w-2xl mx-auto w-full">
        <div className="relative bg-white/70 backdrop-blur-2xl rounded-3xl shadow-2xl p-12 min-h-[80vh] border border-[#4A8EBC]/20 overflow-hidden">
          {/* Animated gradient background */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-gradient-to-br from-[#4A8EBC]/30 via-[#A7D8F7]/20 to-[#F5FAFF]/0 rounded-full blur-3xl animate-pulse-slow" />
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tr from-[#1A2A44]/20 via-[#4A8EBC]/10 to-transparent rounded-full blur-2xl animate-pulse-slower" />
          </div>
          <h2 className="relative z-10 text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#1A2A44] to-[#4A8EBC] mb-10 text-center tracking-tight drop-shadow-lg">Manage Companies</h2>
          <form onSubmit={handleAdd} className="relative z-10 flex flex-col gap-4 mb-10">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Company Name"
              className="border p-3 rounded-lg focus:ring-2 focus:ring-[#4A8EBC]/30 focus:border-[#4A8EBC] transition-all"
            />
            <input
              type="file"
              name="logoFile"
              accept="image/*"
              onChange={handleChange}
              className="border p-3 rounded-lg focus:ring-2 focus:ring-[#4A8EBC]/30 focus:border-[#4A8EBC] transition-all"
            />
            {form.logoUrl && (
              <img src={form.logoUrl} alt="Preview" className="h-24 w-24 object-contain rounded-full border-4 border-[#4A8EBC]/40 bg-white mx-auto shadow-xl transition-transform duration-300 hover:scale-105" />
            )}
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <div className="flex gap-4">
              <button type="submit" className="bg-gradient-to-r from-[#4A8EBC] to-[#3B5488] text-white px-6 py-2 rounded-lg font-semibold shadow hover:scale-105 transition-all">Add Company</button>
              <button type="button" onClick={clearCompanies} className="bg-red-500 text-white px-6 py-2 rounded-lg font-semibold shadow hover:scale-105 transition-all">Clear All</button>
            </div>
          </form>
          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-10">
            {companies.map((company) => (
              <div key={company.id} className="group flex flex-col items-center bg-gradient-to-br from-[#F5FAFF] via-[#EAF5FF] to-[#D8EBFF] border border-[#4A8EBC]/40 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 relative overflow-hidden cursor-pointer scale-100 hover:scale-105">
                <div className="absolute -top-8 -left-8 w-24 h-24 rounded-full bg-[#4A8EBC]/20 blur-2xl opacity-50 pointer-events-none z-0 group-hover:opacity-80 group-hover:scale-110 transition-all duration-300" />
                <img src={company.logoUrl} alt={company.name} className="h-20 w-20 object-contain mb-3 rounded-full border-4 border-[#4A8EBC]/40 bg-white shadow-lg z-10 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-[#1A2A44] font-extrabold text-center text-xl z-10 drop-shadow group-hover:text-[#4A8EBC] transition-colors duration-300">{company.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

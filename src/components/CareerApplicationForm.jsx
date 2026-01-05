import React, { useState } from "react";
import { generateApplicationPDF } from "../utils/pdf";


export default function CareerApplicationForm({ position = "", onSuccess }) {
  const [form, setForm] = useState({ name: "", email: "", resume: null, message: "", position });
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Store application in localStorage (simulate backend)
    const prev = JSON.parse(localStorage.getItem("careerApplications") || "[]");
    const newApp = {
      ...form,
      position: form.position || position,
      id: Date.now(),
      resumeName: form.resume ? form.resume.name : "",
    };
    localStorage.setItem("careerApplications", JSON.stringify([...prev, newApp]));
    // Auto-generate a PDF summary for user convenience
    try {
      generateApplicationPDF(newApp);
    } catch (err) {
      // Fail gracefully without blocking submission
      // eslint-disable-next-line no-console
      console.warn("PDF generation failed:", err);
    }
    setSuccess("Application submitted successfully!");
    setForm({ name: "", email: "", resume: null, message: "", position });
    if (onSuccess) onSuccess();
  };

  return (
    <section className="max-w-2xl mx-auto my-8 bg-white/80 rounded-2xl shadow-xl border border-[#4A8EBC]/10 p-8">
      <h2 className="text-2xl font-bold text-[#1A2A44] mb-4">Apply for a Career</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your Name"
          className="border p-3 w-full rounded-lg"
          required
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Your Email"
          className="border p-3 w-full rounded-lg"
          required
        />
        <input
          type="file"
          name="resume"
          accept=".pdf,.doc,.docx"
          onChange={handleChange}
          className="border p-3 w-full rounded-lg"
          required
        />
        <input
          type="text"
          name="position"
          value={form.position}
          onChange={handleChange}
          placeholder="Position Applying For"
          className="border p-3 w-full rounded-lg"
          required
          readOnly={!!position}
        />
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Tell us about yourself or your motivation"
          className="border p-3 w-full rounded-lg"
          rows={4}
        />
        <button type="submit" className="bg-gradient-to-r from-[#4A8EBC] to-[#3B5488] text-white px-6 py-2 rounded-full font-semibold shadow hover:scale-105 transition-all">
          Submit Application
        </button>
        {success && <div className="text-green-600 font-semibold mt-2">{success}</div>}
      </form>
    </section>
  );
}

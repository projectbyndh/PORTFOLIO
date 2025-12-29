
import React, { useState } from "react";
import useCourseStore from "../Store/CourseStore";
import AdminLayout from "./Layout";

export default function AdminCourses() {
  const courses = useCourseStore((state) => state.courses);
  const addCourse = useCourseStore((state) => state.addCourse);
  const updateCourse = useCourseStore((state) => state.updateCourse);
  const deleteCourse = useCourseStore((state) => state.deleteCourse);
  const clearCourses = useCourseStore((state) => state.clearCourses);
  const [form, setForm] = useState({
    title: "",
    image: "",
    duration: "",
    period: "",
    outcome: "",
    price: ""
  });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdate = (e) => {
    e.preventDefault();
    if (!form.title || !form.image || !form.duration || !form.period || !form.outcome || !form.price) {
      setError("All fields are required.");
      return;
    }
    if (editId) {
      updateCourse(editId, form);
      setEditId(null);
    } else {
      addCourse({ id: Date.now(), ...form });
    }
    setForm({ title: "", image: "", duration: "", period: "", outcome: "", price: "" });
    setError("");
  };

  const handleEdit = (course) => {
    setForm({ ...course });
    setEditId(course.id);
  };

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto w-full">
        <div className="relative bg-white/70 backdrop-blur-2xl rounded-3xl shadow-2xl p-12 min-h-[80vh] border border-[#4A8EBC]/20 overflow-hidden">
          {/* Animated gradient background */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-gradient-to-br from-[#4A8EBC]/30 via-[#A7D8F7]/20 to-[#F5FAFF]/0 rounded-full blur-3xl animate-pulse-slow" />
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tr from-[#1A2A44]/20 via-[#4A8EBC]/10 to-transparent rounded-full blur-2xl animate-pulse-slower" />
          </div>
          <h2 className="relative z-10 text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#1A2A44] to-[#4A8EBC] mb-10 text-center tracking-tight drop-shadow-lg">Manage Courses</h2>
          <form onSubmit={handleAddOrUpdate} className="relative z-10 flex flex-col gap-4 mb-10">
            <input type="text" name="title" value={form.title} onChange={handleChange} placeholder="Course Title" className="border p-3 rounded-lg focus:ring-2 focus:ring-[#4A8EBC]/30 focus:border-[#4A8EBC] transition-all" />
            <input type="text" name="image" value={form.image} onChange={handleChange} placeholder="Image URL" className="border p-3 rounded-lg focus:ring-2 focus:ring-[#4A8EBC]/30 focus:border-[#4A8EBC] transition-all" />
            <input type="text" name="duration" value={form.duration} onChange={handleChange} placeholder="Duration (e.g. 3 months)" className="border p-3 rounded-lg focus:ring-2 focus:ring-[#4A8EBC]/30 focus:border-[#4A8EBC] transition-all" />
            <input type="text" name="period" value={form.period} onChange={handleChange} placeholder="Time Period (e.g. Jan-Mar 2026)" className="border p-3 rounded-lg focus:ring-2 focus:ring-[#4A8EBC]/30 focus:border-[#4A8EBC] transition-all" />
            <input type="text" name="outcome" value={form.outcome} onChange={handleChange} placeholder="Learning Outcome" className="border p-3 rounded-lg focus:ring-2 focus:ring-[#4A8EBC]/30 focus:border-[#4A8EBC] transition-all" />
            <input type="text" name="price" value={form.price} onChange={handleChange} placeholder="Price" className="border p-3 rounded-lg focus:ring-2 focus:ring-[#4A8EBC]/30 focus:border-[#4A8EBC] transition-all" />
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <div className="flex gap-4">
              <button type="submit" className="bg-gradient-to-r from-[#4A8EBC] to-[#3B5488] text-white px-6 py-2 rounded-lg font-semibold shadow hover:scale-105 transition-all">{editId ? "Update Course" : "Add Course"}</button>
              <button type="button" onClick={clearCourses} className="bg-red-500 text-white px-6 py-2 rounded-lg font-semibold shadow hover:scale-105 transition-all">Clear All</button>
            </div>
          </form>
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10">
            {courses.map((course) => (
              <div key={course.id} className="group flex flex-col items-center bg-gradient-to-br from-[#F5FAFF] via-[#EAF5FF] to-[#D8EBFF] border border-[#4A8EBC]/40 rounded-3xl p-10 shadow-2xl hover:shadow-3xl transition-all duration-300 relative overflow-hidden cursor-pointer scale-100 hover:scale-105">
                <div className="absolute -top-10 -left-10 w-32 h-32 rounded-full bg-[#4A8EBC]/20 blur-2xl opacity-50 pointer-events-none z-0 group-hover:opacity-80 group-hover:scale-110 transition-all duration-300" />
                <img src={course.image} alt={course.title} className="h-28 w-28 object-contain mb-3 rounded-2xl border-4 border-[#4A8EBC]/40 bg-white shadow-lg z-10 group-hover:scale-110 transition-transform duration-300" />
                <div className="text-[#1A2A44] font-extrabold text-xl mb-1 text-center z-10 drop-shadow group-hover:text-[#4A8EBC] transition-colors duration-300">{course.title}</div>
                <div className="text-sm text-[#3B5488] mb-1 z-10">Duration: <span className="font-semibold">{course.duration}</span></div>
                <div className="text-sm text-[#3B5488] mb-1 z-10">Period: <span className="font-semibold">{course.period}</span></div>
                <div className="text-sm text-[#2B4066]/80 mb-1 text-center z-10">Outcome: {course.outcome}</div>
                <div className="text-lg font-bold text-[#4A8EBC] mb-2 z-10">Price: {course.price}</div>
                <div className="flex gap-2 mt-2 z-10">
                  <button onClick={() => handleEdit(course)} className="bg-yellow-400 text-white px-3 py-1 rounded shadow hover:bg-yellow-500 transition-colors duration-200">Edit</button>
                  <button onClick={() => deleteCourse(course.id)} className="bg-red-500 text-white px-3 py-1 rounded shadow hover:bg-red-600 transition-colors duration-200">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

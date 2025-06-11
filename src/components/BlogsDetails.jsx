// src/components/BlogDetails.jsx
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useBlogStore from "../Store/BlogStore";
import React from "react";

export default function BlogDetails() {
  const { selectedBlog, fetchBlogById, loading } = useBlogStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [isImageError, setIsImageError] = useState(false);

  // Extract ID from query parameter
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

  // Fetch blog by ID on mount
  useEffect(() => {
    if (id) {
      fetchBlogById(id);
    }
  }, [id, fetchBlogById]);

  // Handle image load error
  const handleImageError = (e) => {
    setIsImageError(true);
    e.target.src = "/placeholder.svg?height=384&width=768";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5FAFF] to-[#EAF5FF] font-sans text-[#1A2A44] relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-[#4A8EBC]/10 animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-[#3B5488]/10 animate-pulse-slow"></div>
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(#4A8EBC 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
          }}
        ></div>
      </div>

      <div className="max-w-4xl mx-auto p-6 py-16 relative z-10">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="group inline-flex items-center gap-2 text-[#4A8EBC] hover:text-[#3B5488] font-semibold mb-8 transition-all duration-300"
        >
          <span className="group-hover:-translate-x-1 transition-transform duration-300">← Back to Blogs</span>
        </button>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20">
            <div className="w-16 h-16 border-4 border-[#4A8EBC]/20 border-t-[#4A8EBC] rounded-full animate-spin mx-auto"></div>
            <p className="text-[#4A8EBC] text-lg bg-white/50 backdrop-blur-sm p-4 rounded-lg shadow mt-4 animate-pulse">
              Loading...
            </p>
          </div>
        )}

        {/* Blog Content */}
        {!loading && selectedBlog && (
          <div className="p-6 bg-white/50 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            {/* Title */}
            <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#1A2A44] to-[#4A8EBC] mb-6">
              {selectedBlog.title}
            </h1>

            {/* Image */}
            {selectedBlog.image && !isImageError ? (
              <img
                src={selectedBlog.image}
                alt={selectedBlog.title}
                className="w-full h-96 object-cover rounded-lg mb-6"
                onError={handleImageError}
              />
            ) : (
              <div className="w-full h-96 bg-[#4A8EBC]/10 flex items-center justify-center rounded-lg mb-6">
                <img
                  src="/placeholder.svg?height=384&width=768"
                  alt="No Image"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            )}

            {/* Content */}
            <div className="text-[#2B4066]/80">
              {selectedBlog.content.split("\n").map((paragraph, index) => (
                <p key={index} className="mb-4 text-lg">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Not Found State */}
        {!loading && !selectedBlog && id && (
          <div className="text-center py-20 p-6 bg-white/50 backdrop-blur-sm rounded-xl shadow-lg">
            <h3 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#1A2A44] to-[#4A8EBC] mb-4">
              Blog Not Found
            </h3>
            <p className="text-[#2B4066]/80">The blog post you're looking for doesn't exist or has been removed.</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
    
  );
}
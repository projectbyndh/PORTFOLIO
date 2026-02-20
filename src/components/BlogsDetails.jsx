// src/components/BlogDetails.jsx
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import React from "react";
import useBlogStore from "../Store/useBlogStore";

export default function BlogDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isImageError, setIsImageError] = useState(false);

  // Extract ID from query parameter
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

  // Get blog data from Zustand store
  const { selectedBlog, loading, error, fetchBlogById, clearSelectedBlog } = useBlogStore();

  useEffect(() => {
    // Only fetch if we have a valid ID
    if (id && id !== 'undefined') {
      fetchBlogById(id).catch(err => {
        // Silent error handling
      });
    } else if (!id) {
      // If no ID is provided, redirect back to blogs
      navigate('/blog');
    }

    return () => {
      clearSelectedBlog();
    };
  }, [id, fetchBlogById, clearSelectedBlog, navigate]);

  // Handle image load error
  const handleImageError = (e) => {
    setIsImageError(true);
    e.target.src = "/placeholder.svg?height=384&width=768";
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-[#F5FAFF] to-[#EAF5FF] font-sans text-[#0D1641] relative pt-20 md:pt-24 lg:pt-28">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-[#26a8df]/10 animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-[#26a8df]/10 animate-pulse-slow"></div>
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(#26a8df 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
          }}
        ></div>
      </div>

      <div className="max-w-4xl mx-auto p-6 py-16 relative z-10">
        {/* Back Button */}
        <Link to="/blog" className="group flex items-center gap-2 text-neutral-400 hover:text-[#26a8df] transition-colors font-bold uppercase tracking-widest text-xs">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Insights
        </Link>


        {/* Blog Content */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="w-16 h-16 border-4 border-[#26a8df]/10 border-t-[#26a8df] rounded-full animate-spin"></div>
          </div>
        )}

        {error && !selectedBlog && (
          <div className="text-center py-20 p-6 bg-white/50 backdrop-blur-sm rounded-xl shadow-lg">
            <h3 className="text-2xl font-semibold bg-clip-text text-transparent bg-linear-to-r from-red-600 to-red-400 mb-4">
              Error Loading Blog
            </h3>
            <p className="text-[#0D1641]/80">{error}</p>
            <button
              onClick={() => fetchBlogById(id)}
              className="px-8 py-3 bg-[#0D1641] text-white rounded-xl font-bold hover:bg-[#0D1641]/90 transition-all shadow-lg active:scale-95"
            >
              Retry Connection
            </button>
          </div>
        )}

        {!loading && selectedBlog && (
          <div className="p-8 bg-white backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-neutral-100">
            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-extrabold text-neutral-800 mb-6 leading-tight">
              {selectedBlog.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-[#26a8df] mb-6 sm:mb-8">
              <div className="flex items-center gap-2 outline-none">
                <Calendar size={14} />
                {new Date(selectedBlog.createdAt).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-2 outline-none">
                <User size={14} />
                {selectedBlog.author || 'NDH Team'}
              </div>
            </div>

            {/* Image */}
            {selectedBlog.image && !isImageError ? (
              <img
                src={selectedBlog.image}
                alt={selectedBlog.title}
                className="w-full h-96 object-cover rounded-xl mb-8 shadow-md"
                onError={handleImageError}
              />
            ) : (
              <div className="w-full h-96 bg-neutral-100 flex items-center justify-center rounded-xl mb-8">
                <img
                  src="/placeholder.svg?height=384&width=768"
                  alt="No Image"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            )}

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              {(selectedBlog.content || selectedBlog.description || "").split("\n").map((paragraph, index) => (
                <p key={index} className="mb-5 text-lg leading-relaxed text-neutral-600">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Not Found State */}
        {!loading && !selectedBlog && !error && id && (
          <div className="text-center py-20 p-6 bg-white/50 backdrop-blur-sm rounded-xl shadow-lg">
            <h3 className="text-2xl font-semibold bg-clip-text text-transparent bg-linear-to-r from-[#0D1641] to-[#0D1641] mb-4">
              Blog Not Found
            </h3>
            <p className="text-[#0D1641]/80">The blog post you're looking for doesn't exist or has been removed.</p>
            <button
              onClick={() => navigate("/")}
              className="mt-4 inline-flex items-center gap-2 bg-[#0D1641] hover:bg-[#0D1641]/90 text-white px-6 py-3 rounded-full font-medium transition-colors duration-300"
            >
              Back to Home
            </button>
          </div>
        )}
      </div>
    </div>

  );
}
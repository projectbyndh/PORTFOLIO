"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, ArrowRight, Calendar, Clock, User, Eye, Heart } from "lucide-react"
import useBlogStore from "../Store/BlogStore"
import React from "react"
export default function BlogSection() {
  const { blogs, fetchBlogs, loading, error } = useBlogStore()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [slidesToShow, setSlidesToShow] = useState(3)
  const [hoveredCard, setHoveredCard] = useState(null)

  // Fetch blogs on mount
  useEffect(() => {
    fetchBlogs()
  }, [fetchBlogs])

  // Handle responsive slides
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSlidesToShow(1)
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(2)
      } else {
        setSlidesToShow(3)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + slidesToShow >= blogs.length ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? Math.max(0, blogs.length - slidesToShow) : prev - 1))
  }

  const formatDate = (timestamp) => {
    return new Date(Number.parseInt(timestamp)).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const getReadTime = (content) => {
    const wordsPerMinute = 200
    const wordCount = content.split(" ").length
    return Math.ceil(wordCount / wordsPerMinute)
  }

  const truncateContent = (content, maxLength = 120) => {
    return content.length > maxLength ? content.substring(0, maxLength) + "..." : content
  }

  return (
    <section className="relative py-20 bg-gradient-to-br from-[#F5FAFF] via-white to-[#F0F7FF] overflow-hidden">
      {/* Enhanced Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-br from-[#4A8EBC]/15 to-[#3B5488]/10 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-tr from-[#4A8EBC]/15 to-[#3B5488]/10 blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-r from-[#4A8EBC]/5 to-[#3B5488]/5 blur-3xl"></div>

        {/* Animated dots pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] animate-pulse"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #4A8EBC 2px, transparent 0)`,
            backgroundSize: "50px 50px",
          }}
        />

        {/* Floating elements */}
        <div className="absolute top-20 left-20 w-4 h-4 rounded-full bg-[#4A8EBC]/20 animate-bounce"></div>
        <div
          className="absolute top-40 right-32 w-6 h-6 rounded-full bg-[#3B5488]/20 animate-bounce"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-32 left-40 w-3 h-3 rounded-full bg-[#4A8EBC]/20 animate-bounce"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-[#4A8EBC]/10 to-[#3B5488]/10 border border-[#4A8EBC]/20 mb-8 backdrop-blur-sm">
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-[#4A8EBC] animate-pulse"></div>
              <div className="w-2 h-2 rounded-full bg-[#4A8EBC] animate-pulse" style={{ animationDelay: "0.5s" }}></div>
              <div className="w-2 h-2 rounded-full bg-[#4A8EBC] animate-pulse" style={{ animationDelay: "1s" }}></div>
            </div>
            <span className="text-sm font-semibold text-[#4A8EBC] tracking-wide">LATEST INSIGHTS</span>
          </div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-[#1A2A44] via-[#4A8EBC] to-[#3B5488] bg-clip-text text-transparent">
              Our Blog
            </span>
          </h2>

          <p className="text-xl text-[#2B4066]/70 max-w-3xl mx-auto leading-relaxed font-light">
            Discover insights, tutorials, and industry trends from our team of experts.
            <br className="hidden md:block" />
            Stay ahead with the latest in technology and development.
          </p>


        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-[#4A8EBC]/20 border-t-[#4A8EBC] rounded-full animate-spin"></div>
              <div
                className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-[#3B5488] rounded-full animate-spin"
                style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
              ></div>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-20">
            <div className="inline-flex items-center gap-3 px-6 py-4 bg-red-50 border border-red-200 rounded-xl">
              <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">!</span>
              </div>
              <span className="text-red-700 font-medium">{error}</span>
            </div>
          </div>
        )}

        {/* Empty State */}
        {blogs.length === 0 && !loading && !error && (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-[#4A8EBC]/10 to-[#3B5488]/10 rounded-full flex items-center justify-center">
              <div className="w-12 h-12 bg-gradient-to-br from-[#4A8EBC] to-[#3B5488] rounded-full flex items-center justify-center">
                <span className="text-white text-xl">📝</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-[#1A2A44] mb-4">No Blogs Available</h3>
            <p className="text-[#2B4066]/70 max-w-md mx-auto">
              We're working on creating amazing content for you. Check back soon for our latest insights and tutorials.
            </p>
          </div>
        )}

        {/* Carousel Container */}
        {blogs.length > 0 && !loading && (
          <div className="relative">
            {/* Enhanced Navigation Buttons */}
            <div className="absolute -left-8 top-1/2 -translate-y-1/2 z-20">
              <button
                onClick={prevSlide}
                className="group w-14 h-14 rounded-full bg-white/90 backdrop-blur-md border border-[#4A8EBC]/20 hover:bg-[#4A8EBC] hover:border-[#4A8EBC] transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center hover:scale-110"
              >
                <ChevronLeft className="w-6 h-6 text-[#4A8EBC] group-hover:text-white transition-colors duration-300" />
              </button>
            </div>

            <div className="absolute -right-8 top-1/2 -translate-y-1/2 z-20">
              <button
                onClick={nextSlide}
                className="group w-14 h-14 rounded-full bg-white/90 backdrop-blur-md border border-[#4A8EBC]/20 hover:bg-[#4A8EBC] hover:border-[#4A8EBC] transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center hover:scale-110"
              >
                <ChevronRight className="w-6 h-6 text-[#4A8EBC] group-hover:text-white transition-colors duration-300" />
              </button>
            </div>

            {/* Enhanced Blog Cards */}
            <div className="overflow-hidden mx-12">
              <div
                className="flex transition-transform duration-700 ease-out"
                style={{
                  transform: `translateX(-${currentIndex * (100 / slidesToShow)}%)`,
                }}
              >
                {blogs.map((blog, index) => (
                  <div key={blog._id} className="flex-shrink-0 px-4" style={{ width: `${100 / slidesToShow}%` }}>
                    <div
                      className="group h-full bg-white/70 backdrop-blur-sm border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-3 rounded-2xl relative"
                      onMouseEnter={() => setHoveredCard(index)}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      {/* Card glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-[#4A8EBC]/0 via-[#4A8EBC]/5 to-[#3B5488]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>

                      {/* Image container */}
                      <div className="relative overflow-hidden rounded-t-2xl">
                        <img
                          src={blog.image || "/placeholder.svg?height=280&width=400"}
                          alt={blog.title}
                          className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                          onError={(e) => {
                            e.target.src = "/placeholder.svg?height=280&width=400"
                          }}
                        />

                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        {/* Floating action buttons */}
                        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                          <button className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors duration-200">
                            <Heart className="w-4 h-4 text-[#4A8EBC]" />
                          </button>
                          <button className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors duration-200">
                            <Eye className="w-4 h-4 text-[#4A8EBC]" />
                          </button>
                        </div>

                        {/* Blog number badge */}
                        <div className="absolute top-4 left-4">
                          <div className="w-10 h-10 bg-gradient-to-br from-[#4A8EBC] to-[#3B5488] rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {String(index + 1).padStart(2, "0")}
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 relative">
                        {/* Meta information */}
                        <div className="flex items-center gap-4 text-sm text-[#2B4066]/60 mb-4">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(blog._id)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{getReadTime(blog.content)} min read</span>
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold text-[#1A2A44] mb-4 line-clamp-2 group-hover:text-[#4A8EBC] transition-colors duration-300 leading-tight">
                          {blog.title}
                        </h3>

                        {/* Content preview */}
                        <p className="text-[#2B4066]/70 mb-6 line-clamp-3 leading-relaxed">
                          {truncateContent(blog.content)}
                        </p>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-4 border-t border-[#4A8EBC]/10">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#4A8EBC] to-[#3B5488] flex items-center justify-center">
                              <User className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-[#2B4066]">NDH Technologies</div>
                              <div className="text-xs text-[#2B4066]/60">Author</div>
                            </div>
                          </div>

<a
  href={`/blogdetails?id=${blog._id}`}
  className="group/link inline-flex items-center gap-2 text-[#4A8EBC] hover:text-[#3B5488] font-semibold text-sm transition-all duration-300"
>
  <span>Read More</span>
  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" />
</a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced Dots Indicator */}
            <div className="flex justify-center gap-3 mt-12">
              {Array.from({ length: Math.ceil(blogs.length / slidesToShow) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index * slidesToShow)}
                  className={`h-3 rounded-full transition-all duration-300 ${
                    Math.floor(currentIndex / slidesToShow) === index
                      ? "bg-gradient-to-r from-[#4A8EBC] to-[#3B5488] w-12"
                      : "bg-[#4A8EBC]/30 hover:bg-[#4A8EBC]/50 w-3"
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Enhanced View All Button */}
        {blogs.length > 0 && (
          <div className="text-center mt-16">
            <a
              href="/blog"
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-[#4A8EBC] to-[#3B5488] hover:from-[#3B5488] hover:to-[#4A8EBC] text-white px-10 py-4 rounded-full font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:scale-105"
            >
              <span>View All Articles</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </div>
        )}
      </div>
    </section>
  )
}

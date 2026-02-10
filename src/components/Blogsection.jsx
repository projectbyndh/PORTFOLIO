"use client"

import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { ChevronLeft, ChevronRight, ArrowRight, Calendar, Clock, User, Eye, Heart } from "lucide-react"
import React from "react"
import useBlogStore from "../Store/useBlogStore"

function Blogsection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [slidesToShow, setSlidesToShow] = useState(3)
  const dragStartX = useRef(null)
  const dragDelta = useRef(0)

  // Get blogs from Zustand store
  const { blogs, loading, error, fetchBlogs } = useBlogStore()

  // Fetch blogs on component mount
  useEffect(() => {
    fetchBlogs().catch(err => {
      console.error('Failed to fetch blogs:', err)
    })
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
    setCurrentIndex((prev) => (prev + slidesToShow >= displayBlogs.length ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? Math.max(0, displayBlogs.length - slidesToShow) : prev - 1))
  }

  // Touch/drag handlers for carousel
  const handleDragStart = (e) => {
    dragStartX.current = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    dragDelta.current = 0;
  };
  const handleDragMove = (e) => {
    if (dragStartX.current === null) return;
    const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    dragDelta.current = clientX - dragStartX.current;
  };
  const handleDragEnd = () => {
    if (dragDelta.current > 50) {
      prevSlide();
    } else if (dragDelta.current < -50) {
      nextSlide();
    }
    dragStartX.current = null;
    dragDelta.current = 0;
  };

  const formatDate = (blog) => {
    // Use the date field from the blog object, fallback to createdAt or id
    const dateString = blog.date || blog.createdAt || blog.id || blog._id;
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
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

  // Use blogs from API only, filter out any without valid IDs
  const displayBlogs = blogs.filter(blog => blog.id || blog._id);

  // Show loading state
  if (loading && blogs.length === 0) {
    return (
      <section className="relative py-12 sm:py-16 md:py-20 bg-linear-to-br from-[#F5FAFF] via-white to-[#F0F7FF] overflow-hidden">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 relative z-10">
          <div className="text-center py-20">
            <div className="inline-block">
              <div className="w-16 h-16 border-4 border-[#4A8EBC] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-[#2B4066]/80">Loading blogs...</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Show error state
  if (error && blogs.length === 0) {
    return (
      <section className="relative py-12 sm:py-16 md:py-20 bg-linear-to-br from-[#F5FAFF] via-white to-[#F0F7FF] overflow-hidden">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 relative z-10">
          <div className="text-center py-20">
            <div className="inline-block">
              <p className="text-red-500 mb-4">⚠️ {error}</p>
              <p className="text-[#2B4066]/80">Unable to load blogs from server.</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative py-24 bg-[#FAFAFA] overflow-hidden" aria-labelledby="blog-heading">
      {/* Enhanced Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-linear-to-br from-[#4A8EBC]/10 to-[#3B5488]/5 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-linear-to-tr from-[#4A8EBC]/10 to-[#3B5488]/5 blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-linear-to-r from-[#4A8EBC]/5 to-[#3B5488]/5 blur-3xl"></div>

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

      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-10 sm:mb-16 md:mb-20">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-linear-to-r from-[#4A8EBC]/10 to-[#3B5488]/10 border border-[#4A8EBC]/20 mb-8 backdrop-blur-sm">
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-[#4A8EBC] animate-pulse"></div>
              <div className="w-2 h-2 rounded-full bg-[#4A8EBC] animate-pulse" style={{ animationDelay: "0.5s" }}></div>
              <div className="w-2 h-2 rounded-full bg-[#4A8EBC] animate-pulse" style={{ animationDelay: "1s" }}></div>
            </div>
            <span className="text-sm font-semibold text-[#4A8EBC] tracking-wide">LATEST INSIGHTS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 sm:mb-8 leading-tight" id="blog-heading">
            <span className="bg-linear-to-r from-[#1A2A44] via-[#4A8EBC] to-[#3B5488] bg-clip-text text-transparent">
              Our Blog
            </span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-[#2B4066]/70 max-w-2xl sm:max-w-3xl mx-auto leading-relaxed font-light">
            Discover insights, tutorials, and industry trends from our team of experts.
            <br className="hidden md:block" />
            Stay ahead with the latest in technology and development.
          </p>


        </div>

        {/* Carousel Container */}
        {displayBlogs.length > 0 && (
          <div className="relative">
            {/* Navigation Buttons - smaller and repositioned for mobile */}
            <div className="hidden sm:block absolute -left-4 md:-left-8 top-1/2 -translate-y-1/2 z-20">
              <button
                onClick={prevSlide} aria-label="Previous blog posts" className="group w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/90 backdrop-blur-md border border-[#4A8EBC]/20 hover:bg-[#4A8EBC] hover:border-[#4A8EBC] transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center hover:scale-110"
              >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-[#4A8EBC] group-hover:text-white transition-colors duration-300" />
              </button>
            </div>
            <div className="hidden sm:block absolute -right-4 md:-right-8 top-1/2 -translate-y-1/2 z-20">
              <button
                onClick={nextSlide} aria-label="Next blog posts" className="group w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/90 backdrop-blur-md border border-[#4A8EBC]/20 hover:bg-[#4A8EBC] hover:border-[#4A8EBC] transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center hover:scale-110"
              >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-[#4A8EBC] group-hover:text-white transition-colors duration-300" />
              </button>
            </div>

            {/* Blog Cards - vertical scroll on mobile, carousel on desktop */}
            <div
              className="overflow-x-auto sm:overflow-hidden mx-0 sm:mx-2 md:mx-4"
              onMouseDown={handleDragStart}
              onMouseMove={handleDragMove}
              onMouseUp={handleDragEnd}
              onMouseLeave={handleDragEnd}
              onTouchStart={handleDragStart}
              onTouchMove={handleDragMove}
              onTouchEnd={handleDragEnd}
              style={{ cursor: 'grab', userSelect: 'none' }}
            >
              <div
                className="flex flex-col sm:flex-row transition-transform duration-700 ease-out gap-8"
                style={
                  slidesToShow === 1
                    ? {}
                    : { transform: `translateX(-${currentIndex * (100 / slidesToShow)}%)` }
                }
              >
                {displayBlogs.map((blog) => (
                  <div
                    key={blog._id || blog.id}
                    className="shrink-0 w-full sm:px-4"
                    style={{ width: slidesToShow === 1 ? '100%' : `${100 / slidesToShow}%` }}
                  >
                    <div
                      className="group h-full bg-white/70 backdrop-blur-sm border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2 sm:hover:-translate-y-3 rounded-2xl relative"
                    >
                      {/* Card glow effect */}
                      <div className="absolute inset-0 bg-linear-to-r from-[#4A8EBC]/0 via-[#4A8EBC]/5 to-[#3B5488]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>

                      {/* Image container */}
                      <div className="relative overflow-hidden rounded-t-2xl">
                        <img
                          src={blog.image || "/placeholder.svg?height=280&width=400"}
                          alt={`Featured image for ${blog.title}`}
                          className="w-full h-44 sm:h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      {/* Content */}
                      <div className="p-5 sm:p-7 relative font-sans">
                        {/* Meta information */}
                        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-medium text-[#2B4066]/60 mb-3 sm:mb-4">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{formatDate(blog)}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{getReadTime(blog.content || blog.description || '')} min read</span>
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-lg sm:text-xl font-bold text-[#1A2A44] mb-3 leading-tight group-hover:text-[#4A8EBC] transition-colors duration-300">
                          {blog.title}
                        </h3>

                        {/* Content preview */}
                        <p className="text-[#2B4066]/70 mb-5 line-clamp-3 leading-relaxed text-sm">
                          {truncateContent(blog.content || blog.description || '')}
                        </p>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-4 border-t border-[#4A8EBC]/10">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-linear-to-r from-[#4A8EBC] to-[#3B5488] flex items-center justify-center shadow-md">
                              <User className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-[#1A2A44]">{blog.author || 'NDH Team'}</div>
                              <div className="text-[10px] text-[#4A8EBC] font-medium tracking-wide">AUTHOR</div>
                            </div>
                          </div>

                          <Link
                            to={`/blog-details?id=${blog.id || blog._id}`}
                            className="group/link inline-flex items-center gap-1.5 text-[#4A8EBC] hover:text-[#3B5488] font-bold text-xs uppercase tracking-wider transition-all duration-300"
                          >
                            <span>Read</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform duration-300" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dots Indicator - smaller on mobile */}
            <div className="flex justify-center gap-2 sm:gap-3 mt-8 sm:mt-12">
              {Array.from({ length: Math.ceil(displayBlogs.length / slidesToShow) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index * slidesToShow)}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={Math.floor(currentIndex / slidesToShow) === index}
                  className={`h-2 sm:h-3 rounded-full transition-all duration-300 ${Math.floor(currentIndex / slidesToShow) === index
                    ? "bg-linear-to-r from-[#4A8EBC] to-[#3B5488] w-8 sm:w-12"
                    : "bg-[#4A8EBC]/30 hover:bg-[#4A8EBC]/50 w-2 sm:w-3"
                    }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Enhanced View All Button */}
        {displayBlogs.length > 0 && (
          <div className="text-center mt-16">
            <Link
              to="/blog"
              className="group inline-flex items-center gap-3 bg-linear-to-r from-[#4A8EBC] to-[#3B5488] hover:from-[#3B5488] hover:to-[#4A8EBC] text-white px-10 py-4 rounded-full font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:scale-105">
              <span>View All Articles</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        )}

        {/* Empty State - when no blogs and no error */}
        {displayBlogs.length === 0 && !error && !loading && (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[#4A8EBC]/10 flex items-center justify-center">
                <svg className="w-12 h-12 text-[#4A8EBC]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#2B4066] mb-2">No Blog Posts Yet</h3>
              <p className="text-[#2B4066]/70 mb-6">We're working on bringing you amazing content. Check back soon for the latest insights and updates.</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => fetchBlogs()}
                  className="inline-flex items-center gap-2 bg-[#4A8EBC] hover:bg-[#3B5488] text-white px-6 py-3 rounded-full font-medium transition-colors duration-300"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Refresh
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Error State - when there's an error loading blogs */}
        {error && (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-red-100 flex items-center justify-center">
                <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#2B4066] mb-2">Unable to Load Blogs</h3>
              <p className="text-[#2B4066]/70 mb-6">We're having trouble connecting to our servers. Please check your internet connection and try again.</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => fetchBlogs()}
                  className="inline-flex items-center gap-2 bg-[#4A8EBC] hover:bg-[#3B5488] text-white px-6 py-3 rounded-full font-medium transition-colors duration-300"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Try Again
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Loading State - when fetching blogs */}
        {loading && displayBlogs.length === 0 && (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[#4A8EBC]/10 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4A8EBC]"></div>
              </div>
              <h3 className="text-xl font-semibold text-[#2B4066] mb-2">Loading Blog Posts</h3>
              <p className="text-[#2B4066]/70">Please wait while we fetch the latest content...</p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Blogsection

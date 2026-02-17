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
      // Silent error handling
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
      <section className="relative pt-20 md:pt-24 lg:pt-28 pb-12 sm:pb-16 md:pb-20 bg-linear-to-br from-[#F5FAFF] via-white to-[#F0F7FF]">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 relative z-10">
          <div className="text-center py-12 sm:py-14 md:py-16 lg:py-20">
            <div className="inline-block">
              <div className="w-16 h-16 border-4 border-[#26a8df] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-[#26a8df]/80">Loading blogs...</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Show error state
  if (error && blogs.length === 0) {
    return (
      <section className="relative pt-20 md:pt-24 lg:pt-28 pb-12 sm:pb-16 md:pb-20 bg-linear-to-br from-[#F5FAFF] via-white to-[#F0F7FF]">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 relative z-10">
          <div className="text-center py-12 sm:py-14 md:py-16 lg:py-20">
            <div className="inline-block">
              <p className="text-red-500 mb-4">⚠️ {error}</p>
              <p className="text-[#26a8df]/80">Unable to load blogs from server.</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative pt-20 md:pt-24 lg:pt-28 pb-12 sm:pb-16 md:pb-20 lg:pb-24 bg-[#FAFAFA]" aria-labelledby="blog-heading">
      {/* Enhanced Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-linear-to-br from-[#26a8df]/10 to-[#26a8df]/5 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-linear-to-tr from-[#26a8df]/10 to-[#26a8df]/5 blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-linear-to-r from-[#26a8df]/5 to-[#26a8df]/5 blur-3xl"></div>

        {/* Animated dots pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] animate-pulse"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #26a8df 2px, transparent 0)`,
            backgroundSize: "50px 50px",
          }}
        />

        {/* Floating elements */}
        <div className="absolute top-20 left-20 w-4 h-4 rounded-full bg-[#26a8df]/20 animate-bounce"></div>
        <div
          className="absolute top-40 right-32 w-6 h-6 rounded-full bg-[#26a8df]/20 animate-bounce"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-32 left-40 w-3 h-3 rounded-full bg-[#26a8df]/20 animate-bounce"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-10 sm:mb-16 md:mb-20">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-linear-to-r from-[#26a8df]/10 to-[#26a8df]/10 border border-[#26a8df]/20 mb-8 backdrop-blur-sm">
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-[#26a8df] animate-pulse"></div>
              <div className="w-2 h-2 rounded-full bg-[#26a8df] animate-pulse" style={{ animationDelay: "0.5s" }}></div>
              <div className="w-2 h-2 rounded-full bg-[#26a8df] animate-pulse" style={{ animationDelay: "1s" }}></div>
            </div>
            <span className="text-sm font-semibold text-[#26a8df] tracking-wide">LATEST INSIGHTS</span>
          </div>

          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6 leading-tight" id="blog-heading">
            <span className="bg-linear-to-r from-[#26a8df] via-[#26a8df] to-[#26a8df] bg-clip-text text-transparent">
              Explore Our Latest Blogs
            </span>
          </h2>

          <p className="text-sm xs:text-base sm:text-lg md:text-xl text-[#26a8df]/80 max-w-xl sm:max-w-2xl mx-auto leading-relaxed font-normal">
            Welcome to our knowledge hub! Dive into practical tips, inspiring stories, and the newest trends in tech and business. Whether you’re a curious learner or a seasoned pro, you’ll find something fresh every week.
          </p>


        </div>

        {/* Carousel Container */}
        {displayBlogs.length > 0 && (
          <div className="relative">
            {/* Navigation Buttons - smaller and repositioned for mobile */}
            <div className="hidden sm:block absolute -left-4 md:-left-8 top-1/2 -translate-y-1/2 z-20">
              <button
                onClick={prevSlide} aria-label="Previous blog posts" className="group w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/90 backdrop-blur-md border border-[#26a8df]/20 hover:bg-[#26a8df] hover:border-[#26a8df] transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center hover:scale-110"
              >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-[#26a8df] group-hover:text-white transition-colors duration-300" />
              </button>
            </div>
            <div className="hidden sm:block absolute -right-4 md:-right-8 top-1/2 -translate-y-1/2 z-20">
              <button
                onClick={nextSlide} aria-label="Next blog posts" className="group w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/90 backdrop-blur-md border border-[#26a8df]/20 hover:bg-[#26a8df] hover:border-[#26a8df] transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center hover:scale-110"
              >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-[#26a8df] group-hover:text-white transition-colors duration-300" />
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
                      className="group h-full bg-white backdrop-blur-sm border border-neutral-200 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden hover:-translate-y-2 sm:hover:-translate-y-3 rounded-xl sm:rounded-2xl relative"
                    >
                      {/* Card glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#26a8df]/0 via-[#26a8df]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl sm:rounded-2xl"></div>

                      {/* Image container */}
                      <div className="relative overflow-hidden rounded-t-xl sm:rounded-t-2xl group-hover:ring-2 ring-[#26a8df]/20 transition-all duration-300">
                        <img
                          src={blog.image || "/placeholder.svg?height=280&width=400"}
                          alt={`Featured image for ${blog.title}`}
                          className="w-full h-32 sm:h-44 md:h-56 object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        {/* Gradient overlay on hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 via-neutral-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        {/* Category badge */}
                        <div className="absolute top-3 right-3 px-3 py-1 bg-white/95 backdrop-blur-sm rounded-full text-[10px] font-bold text-neutral-700 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          Article
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-3 sm:p-5 md:p-7 relative font-sans">
                        {/* Meta information */}
                        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-[10px] sm:text-xs font-medium text-neutral-400 mb-3 sm:mb-4">
                          <div className="flex items-center gap-1.5 bg-neutral-50 px-2.5 py-1 rounded-full">
                            <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                            <span>{formatDate(blog)}</span>
                          </div>
                          <div className="flex items-center gap-1.5 bg-neutral-50 px-2.5 py-1 rounded-full">
                            <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                            <span>{getReadTime(blog.content || blog.description || '')} min read</span>
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-neutral-800 mb-2 sm:mb-3 leading-tight group-hover:text-[#26a8df] transition-colors duration-300 line-clamp-2">
                          {blog.title}
                        </h3>

                        {/* Content preview */}
                        <p className="text-neutral-500 mb-3 sm:mb-4 md:mb-5 line-clamp-2 sm:line-clamp-3 leading-relaxed text-xs sm:text-sm font-normal">
                          {truncateContent(blog.content || blog.description || '')}
                        </p>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-4 sm:pt-5 border-t border-neutral-200/50">
                          <div className="flex items-center gap-2 sm:gap-3">
                            <div className="relative">
                              <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-[#26a8df]/20 to-[#26a8df]/10 flex items-center justify-center border border-[#26a8df]/20 group-hover:border-[#26a8df]/40 transition-all duration-300">
                                <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#26a8df]" />
                              </div>
                              <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-white"></div>
                            </div>
                            <div>
                              <div className="text-[9px] sm:text-[10px] text-neutral-400 font-medium tracking-wide">Author</div>
                            </div>
                          </div>

                          <Link
                            to={`/blog-details?id=${blog.id || blog._id}`}
                            className="group/link relative inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-neutral-50 to-neutral-100 hover:from-[#26a8df] hover:to-[#26a8df] border border-neutral-200 hover:border-[#26a8df] rounded-full font-semibold text-[11px] sm:text-xs text-neutral-600 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md overflow-hidden"
                          >
                            <span className="relative z-10">Continue Reading</span>
                            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 relative z-10 group-hover/link:translate-x-0.5 transition-transform duration-300" />
                            <div className="absolute inset-0 bg-gradient-to-r from-[#26a8df]/0 via-[#26a8df]/10 to-[#26a8df]/0 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300"></div>
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
                    ? "bg-linear-to-r from-[#26a8df] to-[#26a8df] w-8 sm:w-12"
                    : "bg-[#26a8df]/30 hover:bg-[#26a8df]/50 w-2 sm:w-3"
                    }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Enhanced View All Button */}
        {displayBlogs.length > 0 && (
          <div className="text-center mt-12 sm:mt-14 md:mt-16">
            <Link
              to="/blog"
              className="group inline-flex items-center gap-2 sm:gap-2.5 md:gap-3 bg-linear-to-r from-[#26a8df] to-[#26a8df] hover:from-[#26a8df] hover:to-[#26a8df] text-white px-6 py-2.5 sm:px-8 sm:py-3 md:px-10 md:py-3.5 lg:px-8 lg:py-2.5 rounded-full font-semibold text-sm sm:text-base md:text-base lg:text-sm shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:scale-105">
              <span>View All Articles</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 lg:w-4 lg:h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        )}

        {/* Empty State - when no blogs and no error */}
        {displayBlogs.length === 0 && !error && !loading && (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[#26a8df]/10 flex items-center justify-center">
                <svg className="w-12 h-12 text-[#26a8df]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#26a8df] mb-2">No Blog Posts Yet</h3>
              <p className="text-[#26a8df]/70 mb-6">We're working on bringing you amazing content. Check back soon for the latest insights and updates.</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => fetchBlogs()}
                  className="inline-flex items-center gap-2 bg-[#26a8df] hover:bg-[#26a8df] text-white px-6 py-3 rounded-full font-medium transition-colors duration-300"
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
              <h3 className="text-xl font-semibold text-[#26a8df] mb-2">Unable to Load Blogs</h3>
              <p className="text-[#26a8df]/70 mb-6">We're having trouble connecting to our servers. Please check your internet connection and try again.</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => fetchBlogs()}
                  className="inline-flex items-center gap-2 bg-[#26a8df] hover:bg-[#26a8df] text-white px-6 py-3 rounded-full font-medium transition-colors duration-300"
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
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[#26a8df]/10 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#26a8df]"></div>
              </div>
              <h3 className="text-xl font-semibold text-[#26a8df] mb-2">Loading Blog Posts</h3>
              <p className="text-[#26a8df]/70">Please wait while we fetch the latest content...</p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Blogsection

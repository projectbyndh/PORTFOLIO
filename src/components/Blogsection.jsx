"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight, ArrowRight, Calendar, Clock, User, Eye, Heart } from "lucide-react"
import useBlogStore from "../Store/BlogStore"
import React from "react"

function Blogsection() {
  const { blogs, fetchBlogs, loading, error } = useBlogStore()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [slidesToShow, setSlidesToShow] = useState(3)
  const [hoveredCard, setHoveredCard] = useState(null)
  const dragStartX = useRef(null)
  const dragDelta = useRef(0)

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

  // Dummy blogs if none exist
  const dummyBlogs = [
    {
      _id: '1700000000001',
      title: 'How to Build a Modern React App',
      content: 'Learn the essentials of building a modern React application with best practices, hooks, and state management. This guide covers everything you need to get started quickly.',
      image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi_45lUhXYOommHgxXd0_IWSp8FQ06wA0PaPSoDL4FasAXvA_ju9wWVZiJ4l__EoGOK1G2tA8b-dEQa-s0CnqgQ7xh9eeoeWUuByVMTDWN93SG3t71rtuUn7rHzxgg-hABgLN5clLBIWPEu9BXuf1y3H4xljah2T-8Kqo2Ih-GhuTai47PjnGAZPkPWfOAe/s2681/Imagen4.jpg',
    },
    {
      _id: '1700000000002',
      title: 'Understanding Zustand for State Management',
      content: 'Zustand is a fast and simple state management solution for React. Discover how to use Zustand effectively in your next project.',
      image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi_45lUhXYOommHgxXd0_IWSp8FQ06wA0PaPSoDL4FasAXvA_ju9wWVZiJ4l__EoGOK1G2tA8b-dEQa-s0CnqgQ7xh9eeoeWUuByVMTDWN93SG3t71rtuUn7rHzxgg-hABgLN5clLBIWPEu9BXuf1y3H4xljah2T-8Kqo2Ih-GhuTai47PjnGAZPkPWfOAe/s2681/Imagen4.jpg',
    },
    {
      _id: '1700000000003',
      title: 'Deploying Vite Apps on Hostinger',
      content: 'A step-by-step guide to deploying your Vite-powered React SPA on Hostinger shared hosting, including routing and asset fixes.',
      image:"https://images.g2crowd.com/uploads/product/image/d2295191ae7e31fe5bb82cb311c7cb95/hostinger.png",
    },
    {
      _id: '1700000000004',
      title: '7 Sales Psychology Principles to Master as a Digital Marketer',
      content: `Introduction\nThe secret to each top-performing campaign is knowing how humans act. Techniques and technology evolve, but human psychology remains the same. In this article, I\'ll share the top sales psychology takeaways I learned on a digital marketing course — and how you can apply them ethically to drive engagement, conversions, and customer loyalty.\n\n1. The Power of Reciprocity\nPsychological Insight: People have a desire to repay a favor.\nMarketing Application: Deliver value first — e.g., a free ebook, checklist, or premium content — and then ask for something in return, such as an email address or sale.\nExample: HubSpot\'s set of free templates creates good will, increasing the chances users will ultimately purchase their CRM software.\n\n2. Curiosity Drives Clicks\nPsychological Insight: We are wired to seek closure when presented with information deficiency.\nMarketing Application: Use open loops and stimulating headlines to make readers curious.\nExample: \'You\'re Losing Sales Because of This One Mistake\' makes you click to learn what the mistake is.\n\n3. Scarcity Creates Urgency\nPsychological Insight: We are scared of losing out on limited opportunities.\nMarketing Application: Use time-sensitive offers, low-stock alerts, or countdown timers to elicit quicker decisions.\nExample: Amazon\'s \'Only 3 left in stock\' urges customers to act quickly.\n\n4. Social Proof Builds Trust\nPsychological Insight: We refer to others when uncertain.\nMarketing Application: Emphasize testimonials, reviews, user base, or influencer endorsement.\nExample: \'Over 1 million users trust Grammarly\' immediately builds confidence.\n\n5. Anchoring for Perceived Value\nPsychological Insight: Our brain calculates prices according to the first number we notice.\nMarketing Application: Show a big anchor price next to your offer so the deal will sound like a bargain.\nExample: \'Originally $299, now $99\' frames the product as high value at a reduced price.\n\n6. The Decoy Effect (Three-Box Strategy)\nPsychological Insight: People like to choose the middle item when offered three.\nMarketing Application: Price your offerings in three tiers, with the middle one as \'best value.\'\nExample: SaaS vendors generally price as Basic, Pro (highlighted), and Premium.\n\n7. Consistency Builds Loyalty\nPsychological Observation: Once they\'ve committed, people strive to stay consistent.\nMarketing Use: Start off small like a newsletter sign-up, which can be escalated to larger conversions.\nExample: A free 7-day challenge gets users on board before selling them a full course.\n\nConclusion\nSales psychology isn’t about manipulation — it’s about understanding and ethically influencing behavior. When applied with empathy and integrity, these principles can dramatically improve your marketing results. Whether you’re writing copy, designing funnels, or crafting offers, embedding psychology makes your message resonate deeper and convert better.`,
      image: 'https://fiveringsmarketing.com/wp-content/uploads/2023/11/Psychology-of-Sales-Five-Proven-Tips-1024x569.png',
    },
  ];

  // Combine admin blogs with dummy blogs
  const displayBlogs = [...blogs, ...dummyBlogs];

  return (
    <section className="relative py-12 sm:py-16 md:py-20 bg-gradient-to-br from-[#F5FAFF] via-white to-[#F0F7FF] overflow-hidden">
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

      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-10 sm:mb-16 md:mb-20">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-[#4A8EBC]/10 to-[#3B5488]/10 border border-[#4A8EBC]/20 mb-8 backdrop-blur-sm">
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-[#4A8EBC] animate-pulse"></div>
              <div className="w-2 h-2 rounded-full bg-[#4A8EBC] animate-pulse" style={{ animationDelay: "0.5s" }}></div>
              <div className="w-2 h-2 rounded-full bg-[#4A8EBC] animate-pulse" style={{ animationDelay: "1s" }}></div>
            </div>
            <span className="text-sm font-semibold text-[#4A8EBC] tracking-wide">LATEST INSIGHTS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 sm:mb-8 leading-tight">
            <span className="bg-gradient-to-r from-[#1A2A44] via-[#4A8EBC] to-[#3B5488] bg-clip-text text-transparent">
              Our Blog
            </span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-[#2B4066]/70 max-w-2xl sm:max-w-3xl mx-auto leading-relaxed font-light">
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
        {/* No empty state, always show dummy or real blogs */}

        {/* Carousel Container */}
        {displayBlogs.length > 0 && !loading && (
          <div className="relative">
            {/* Navigation Buttons - smaller and repositioned for mobile */}
            <div className="hidden sm:block absolute -left-4 md:-left-8 top-1/2 -translate-y-1/2 z-20">
              <button
                onClick={prevSlide}
                className="group w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/90 backdrop-blur-md border border-[#4A8EBC]/20 hover:bg-[#4A8EBC] hover:border-[#4A8EBC] transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center hover:scale-110"
              >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-[#4A8EBC] group-hover:text-white transition-colors duration-300" />
              </button>
            </div>
            <div className="hidden sm:block absolute -right-4 md:-right-8 top-1/2 -translate-y-1/2 z-20">
              <button
                onClick={nextSlide}
                className="group w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/90 backdrop-blur-md border border-[#4A8EBC]/20 hover:bg-[#4A8EBC] hover:border-[#4A8EBC] transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center hover:scale-110"
              >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-[#4A8EBC] group-hover:text-white transition-colors duration-300" />
              </button>
            </div>

            {/* Blog Cards - vertical scroll on mobile, carousel on desktop */}
            <div
              className="overflow-x-auto sm:overflow-hidden mx-0 sm:mx-6 md:mx-12"
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
                className="flex flex-col sm:flex-row transition-transform duration-700 ease-out gap-6 sm:gap-0"
                style={
                  slidesToShow === 1
                    ? {}
                    : { transform: `translateX(-${currentIndex * (100 / slidesToShow)}%)` }
                }
              >
                {displayBlogs.map((blog, index) => (
                  <div
                    key={blog._id}
                    className="flex-shrink-0 w-full sm:px-4"
                    style={{ width: slidesToShow === 1 ? '100%' : `${100 / slidesToShow}%` }}
                  >
                    <div
                      className="group h-full bg-white/70 backdrop-blur-sm border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2 sm:hover:-translate-y-3 rounded-2xl relative"
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
                          className="w-full h-44 sm:h-56 object-cover group-hover:scale-105 sm:group-hover:scale-110 transition-transform duration-700"
                          onError={(e) => {
                            e.target.src = "/placeholder.svg?height=280&width=400"
                          }}
                        />

                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        {/* Floating action buttons */}
                        <div className="absolute top-2 sm:top-4 right-2 sm:right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                          <button className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors duration-200">
                            <Heart className="w-4 h-4 text-[#4A8EBC]" />
                          </button>
                          <button className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors duration-200">
                            <Eye className="w-4 h-4 text-[#4A8EBC]" />
                          </button>
                        </div>

                        {/* Blog number badge */}
                        <div className="absolute top-2 sm:top-4 left-2 sm:left-4">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#4A8EBC] to-[#3B5488] rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm">
                            {String(index + 1).padStart(2, "0")}
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4 sm:p-6 relative">
                        {/* Meta information */}
                        <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-[#2B4066]/60 mb-2 sm:mb-4">
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
                        <h3 className="text-lg sm:text-xl font-bold text-[#1A2A44] mb-2 sm:mb-4 line-clamp-2 group-hover:text-[#4A8EBC] transition-colors duration-300 leading-tight">
                          {blog.title}
                        </h3>

                        {/* Content preview */}
                        <p className="text-[#2B4066]/70 mb-4 sm:mb-6 line-clamp-3 leading-relaxed text-sm sm:text-base">
                          {truncateContent(blog.content)}
                        </p>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-2 sm:pt-4 border-t border-[#4A8EBC]/10">
                          <div className="flex items-center gap-2 sm:gap-3">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-[#4A8EBC] to-[#3B5488] flex items-center justify-center">
                              <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                            </div>
                            <div>
                              <div className="text-xs sm:text-sm font-semibold text-[#2B4066]">NDH Technologies</div>
                              <div className="text-[10px] sm:text-xs text-[#2B4066]/60">Author</div>
                            </div>
                          </div>

                          <a
                            href={`/blogdetails?id=${blog._id}`}
                            className="group/link inline-flex items-center gap-1 sm:gap-2 text-[#4A8EBC] hover:text-[#3B5488] font-semibold text-xs sm:text-sm transition-all duration-300"
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

            {/* Dots Indicator - smaller on mobile */}
            <div className="flex justify-center gap-2 sm:gap-3 mt-8 sm:mt-12">
              {Array.from({ length: Math.ceil(blogs.length / slidesToShow) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index * slidesToShow)}
                  className={`h-2 sm:h-3 rounded-full transition-all duration-300 ${
                    Math.floor(currentIndex / slidesToShow) === index
                      ? "bg-gradient-to-r from-[#4A8EBC] to-[#3B5488] w-8 sm:w-12"
                      : "bg-[#4A8EBC]/30 hover:bg-[#4A8EBC]/50 w-2 sm:w-3"
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

export default Blogsection

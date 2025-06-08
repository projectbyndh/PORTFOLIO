"use client"
import React from "react"
import { Link } from "react-router-dom"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

function Blogsection() {
  const blogs = [
    {
      id: 1,
      title: "The Future of Technology in 2025",
      excerpt: "Explore the latest trends and innovations shaping the tech industry this year.",
      image: "/placeholder.svg?height=200&width=300",
      date: "June 5, 2025",
      author: "John Doe",
    },
    {
      id: 2,
      title: "Building Scalable Web Applications",
      excerpt: "Learn best practices for creating robust and scalable web applications.",
      image: "/placeholder.svg?height=200&width=300",
      date: "June 3, 2025",
      author: "Jane Smith",
    },
    {
      id: 3,
      title: "AI and Machine Learning Demystified",
      excerpt: "A beginner's guide to understanding AI and its real-world applications.",
      image: "/placeholder.svg?height=200&width=300",
      date: "June 1, 2025",
      author: "Alex Johnson",
    },
    {
      id: 4,
      title: "The Future of Technology in 2025",
      excerpt: "Explore the latest trends and innovations shaping the tech industry this year.",
      image: "/placeholder.svg?height=200&width=300",
      date: "June 5, 2025",
      author: "John Doe",
    },
    {
      id: 5,
      title: "The Future of Technology in 2025",
      excerpt: "Explore the latest trends and innovations shaping the tech industry this year.",
      image: "/placeholder.svg?height=200&width=300",
      date: "June 5, 2025",
      author: "John Doe",
    },
    {
      id: 6,
      title: "The Future of Technology in 2025",
      excerpt: "Explore the latest trends and innovations shaping the tech industry this year.",
      image: "/placeholder.svg?height=200&width=300",
      date: "June 5, 2025",
      author: "John Doe",
    },
  ]

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 5000,
    autoplaySpeed: 0,
    cssEase: "linear",
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  }

  return (
    <div className="w-full bg-[#F5FAFF] py-16 md:py-24 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(#4A8EBC 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block relative">
            <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-[#4A8EBC]/20 animate-pulse-slow"></div>
            <div className="absolute -bottom-4 -right-4 w-8 h-8 rounded-full bg-[#3B5488]/20 animate-pulse-slow"></div>
            <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#1A2A44] to-[#4A8EBC]">
              Latest Blog Posts
            </h2>
          </div>
          <p className="mt-4 text-lg text-[#2B4066]/80 max-w-2xl mx-auto">
            Stay updated with our insights, tips, and trends from industry experts.
          </p>
        </div>

        {/* Slider container with gradient edges */}
        <div className="relative">
          {/* Left gradient fade */}
          <div className="absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-[#F5FAFF] to-transparent pointer-events-none"></div>

          {/* Slider */}
          <div className="slider-container py-8">
            <Slider {...settings}>
              {blogs.map((blog) => (
                <div key={blog.id} className="px-4">
                  <Link
                    to={`/blog/${blog.id}`}
                    className="group bg-white/70 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-[#4A8EBC]/10 overflow-hidden block"
                  >
                    <div className="relative">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.target.src = "/placeholder.svg?height=200&width=300"
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1A2A44]/20 to-transparent"></div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-[#1A2A44] group-hover:text-[#4A8EBC] transition-colors duration-300">
                        {blog.title}
                      </h3>
                      <p className="mt-2 text-[#2B4066]/80 text-sm line-clamp-3">
                        {blog.excerpt}
                      </p>
                      <div className="mt-4 flex justify-between items-center text-sm text-[#2B4066]/60">
                        <span>{blog.author}</span>
                        <span>{blog.date}</span>
                      </div>
                      <Link to='/blogdetails' className="mt-4 text-[#4A8EBC] font-medium group-hover:underline">
                        Read More
                      </Link>
                    </div>
                  </Link>
                </div>
              ))}
            </Slider>
          </div>

          {/* Right gradient fade */}
          <div className="absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-[#F5FAFF] to-transparent pointer-events-none"></div>
        </div>
      </div>
    </div>
  )
}

export default Blogsection
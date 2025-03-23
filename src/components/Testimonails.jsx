"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import React from "react"
// Testimonial data
const testimonials = [
  {
    id: 1,
    name: "TrailBlazers",
    position: "CTO, TechSolutions Inc.",
    image: "/placeholder.svg?height=100&width=100",
    text: "Working with this team has transformed our digital infrastructure. Their expertise in cloud solutions saved us countless hours and resources.",
  },
  {
    id: 2,
    name: "Michael Chen",
    position: "Product Manager, InnovateTech",
    image: "/placeholder.svg?height=100&width=100",
    text: "The cybersecurity services provided exceeded our expectations. We now have peace of mind knowing our data is protected by the best in the industry.",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    position: "CEO, DataDrive Systems",
    image: "/placeholder.svg?height=100&width=100",
    text: "Their software development team delivered our project ahead of schedule and with exceptional quality. The attention to detail was impressive.",
  },
  {
    id: 4,
    name: "David Wilson",
    position: "IT Director, Global Enterprises",
    image: "/placeholder.svg?height=100&width=100",
    text: "The managed IT services have been a game-changer for our organization. Response times are quick and the technical knowledge is outstanding.",
  },
]

export default function Testimonails() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const autoPlayRef = useRef(null)  // Changed from NodeJS.Timeout to null

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  // Pause auto-play on hover
  const pauseAutoPlay = () => {
    setIsAutoPlaying(false)
  }

  // Resume auto-play when not hovering
  const resumeAutoPlay = () => {
    setIsAutoPlaying(true)
  }

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = window.setInterval(() => {
        nextSlide()
      }, 5000) // Change slide every 5 seconds
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [isAutoPlaying, currentIndex])

  return (
    <div
      className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8"
      onMouseEnter={pauseAutoPlay}
      onMouseLeave={resumeAutoPlay}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-2">What Our Clients Say</h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full"></div>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from our satisfied clients about their experience working with our team.
          </p>
        </div>

        {/* Testimonial Slider */}
        <div className="relative max-w-4xl mx-auto">
          {/* Main Testimonial */}
          <div
            className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl shadow-lg p-8 transition-all duration-500 ease-in-out"
            style={{ minHeight: "300px" }}
          >
            <div className="flex flex-col md:flex-row items-center">
              <div className="mb-6 md:mb-0 md:mr-8 flex-shrink-0">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md mx-auto">
                  <img
                    src={testimonials[currentIndex].image || "/placeholder.svg"}
                    alt={testimonials[currentIndex].name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="flex-1">
                <div className="relative">
                  <svg
                    className="absolute -top-6 -left-6 w-12 h-12 text-blue-300 opacity-50"
                    fill="currentColor"
                    viewBox="0 0 32 32"
                    aria-hidden="true"
                  >
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                  <p className="text-gray-700 text-lg italic leading-relaxed mb-4">{testimonials[currentIndex].text}</p>
                  <div className="mt-4">
                    <h4 className="font-bold text-gray-900 text-xl">{testimonials[currentIndex].name}</h4>
                    <p className="text-blue-600 italic">{testimonials[currentIndex].position}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 bg-white rounded-full p-2 shadow-lg text-blue-600 hover:text-blue-800 focus:outline-none transition-colors duration-300 z-10"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 bg-white rounded-full p-2 shadow-lg text-blue-600 hover:text-blue-800 focus:outline-none transition-colors duration-300 z-10"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots Navigation */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full focus:outline-none transition-colors duration-300 ${
                  index === currentIndex ? "bg-blue-600" : "bg-blue-200 hover:bg-blue-400"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>


      </div>
    </div>
  )
}

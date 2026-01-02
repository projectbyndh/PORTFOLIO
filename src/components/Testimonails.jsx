"use client"
import { Link } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"
import React from "react"
// Sample testimonial data with English names and companies
const TESTIMONIALS = [
  {
    id: 1,

    name: "Krishna Kharel",
    position: "CEO, Realestate Made Easy",
    image: "/images/testimonial-1.jpg",
    rating: 5,
    text: "Nepal Digital Heights completely transformed our online presence. Their team created a fantastic website that encapsulated our brand identity perfectly, and conversion rates have increased significantly.",
  },
  {
    id: 2,

    name: "Meelan Khatri",
    position: "CEO, Appleday Store",
    image: "/images/testimonial-2.jpg",
    rating: 5,
    text: "Working with Nepal Digital Heights on our digital marketing strategy has elevated our business to new heights. Their expertise in SEO and social media marketing has helped us reach new audiences and grow our business.",
  },
  {
    id: 3,

    name: "Sagar Kandel",
    position: "Co-Founder, Numazu Halal Suppliers",
    image: "/images/testimonial-3.jpg",
    rating: 5,
    text: "The mobile app developed by Nepal Digital Heights exceeded our expectations. The user interface is simple, and the performance is outstanding. Our customers love it!",
  },
  {
    id: 4,

    name: "Er. Devendra Kumar Sharma",
    position: "Independent Candidate For Member of Parliament",
    image: "/images/testimonial-4.jpg",
    rating: 4,
    text: "Their IT consulting services helped us streamline our operations and implement more efficient systems. The team was knowledgeable, responsive, and a pleasure to work with.",
  },
  {
    id: 5,
    name: "Anita Gurung",
    position: "Owner, Mountain Crafts",
    rating: 5,
    text: "As a small business owner, I needed an affordable yet professional e-commerce solution. Nepal Digital Heights provided exactly what I needed, and their ongoing support has been exceptional.",
  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [animatedItems, setAnimatedItems] = useState([])
  const testimonialsRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = Number.parseInt(entry.target.id.split("-")[1])
            setAnimatedItems((prev) => [...prev, id])
          }
        })
      },
      { threshold: 0.1 }
    )

    document.querySelectorAll(".animate-on-scroll").forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [])

  const isAnimated = (id) => animatedItems.includes(id)

  const nextTestimonial = () => setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length)
  const prevTestimonial = () => setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)

  const getVisibleTestimonials = () => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      return [TESTIMONIALS[currentIndex]]
    }

    const visibleCount = 3
    const testimonials = []
    for (let i = 0; i < visibleCount; i++) {
      testimonials.push(TESTIMONIALS[(currentIndex + i) % TESTIMONIALS.length])
    }
    return testimonials
  }

  return (
    <div className="w-full bg-[#F5FAFF] relative overflow-hidden py-16 md:py-24">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-[#4A8EBC]/5 animate-pulse-slow" />
        <div className="absolute bottom-40 right-10 w-96 h-96 rounded-full bg-[#3B5488]/5 animate-pulse-slow" />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(#4A8EBC 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          id="testimonial-1"
          className={`text-center mb-16 animate-on-scroll transition-all duration-500 ${
            isAnimated(1) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-block relative">
            <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-[#4A8EBC]/20 animate-pulse-slow" />
            <div className="absolute -bottom-4 -right-4 w-8 h-8 rounded-full bg-[#3B5488]/20 animate-pulse-slow" />
            <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#1A2A44] to-[#4A8EBC]">
              Client Testimonials
            </h2>
          </div>
          <p className="mt-4 text-lg text-[#2B4066]/80 max-w-2xl mx-auto">
            Don&apos;t just take our word for it. Here&apos;s what our clients have to say about working with Nepal Digital Heights.
          </p>
        </div>

        <div
          id="testimonial-2"
          className={`relative animate-on-scroll transition-all duration-700 ${
            isAnimated(2) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          ref={testimonialsRef}
        >
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 text-[#4A8EBC]/10 z-0">
            <Quote size={120} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            {getVisibleTestimonials().map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-[#4A8EBC]/10 transition-all duration-500 hover:shadow-xl hover:bg-white/90 ${
                  index === 0 ? "md:transform md:scale-105 md:shadow-xl" : ""
                }`}
              >
                <div className="flex items-center mb-4">
 
                  <div>
                    <h3 className="font-bold text-[#3260aa]">{testimonial.name}</h3>
                    <p className="text-sm text-[#2B4066]/70">{testimonial.position}</p>
                  </div>
                </div>

                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < testimonial.rating ? "text-[#FFD700] fill-[#FFD700]" : "text-gray-300"}
                    />
                  ))}
                </div>

                <p className="text-[#2B4066]/80 italic relative">
                  <span className="absolute -top-2 -left-2 text-[#4A8EBC]/20">&quot;</span>
                  {testimonial.text}
                  <span className="absolute -bottom-4 -right-2 text-[#4A8EBC]/20">&quot;</span>
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8 space-x-4">
            <button
              onClick={prevTestimonial}
              className="p-2 rounded-full bg-white shadow-md border border-[#4A8EBC]/20 text-[#4A8EBC] hover:bg-[#4A8EBC] hover:text-white transition-all duration-300"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextTestimonial}
              className="p-2 rounded-full bg-white shadow-md border border-[#4A8EBC]/20 text-[#4A8EBC] hover:bg-[#4A8EBC] hover:text-white transition-all duration-300"
              aria-label="Next testimonial"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>


        <div
          id="testimonial-4"
          className={`mt-16 text-center animate-on-scroll transition-all duration-1000 ${
            isAnimated(4) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-lg text-[#2B4066]/80 mb-6 max-w-2xl mx-auto">
            Join our growing list of satisfied clients and experience the Nepal Digital Heights difference.
          </p>
          <Link to='/contact'>
            <button className="px-8 py-4 bg-gradient-to-r from-[#4A8EBC] to-[#3B5488] text-white font-bold rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              Get Started Today
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

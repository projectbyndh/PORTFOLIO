"use client"
import React from "react"
import { useState, useEffect } from "react"
import { Briefcase, Users, Mail, ArrowRight, Linkedin } from "lucide-react"
import Footer from "./Footer"

export default function Services() {
  const [activeSection, setActiveSection] = useState("opportunities") // Default section
  const [animatedItems, setAnimatedItems] = useState([])

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
      { threshold: 0.1 },
    )

    document.querySelectorAll(".animate-on-scroll").forEach((item) => {
      observer.observe(item)
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  const isAnimated = (id) => animatedItems.includes(id)

  return (
    <div className="w-full bg-[#F5FAFF] relative overflow-hidden min-h-screen">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 left-10 w-64 h-64 rounded-full bg-[#4A8EBC]/5 animate-pulse-slow"></div>
        <div className="absolute bottom-40 right-10 w-96 h-96 rounded-full bg-[#3B5488]/5 animate-pulse-slow"></div>
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(#4A8EBC 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
          }}
        ></div>
      </div>

      {/* Header Section */}
      <div className="w-full bg-gradient-to-b from-[#E0F0FF] to-[#F5FAFF] py-16 px-4 sm:px-6 lg:px-8 relative">
        <svg
          className="absolute top-0 left-0 w-full h-32 opacity-10"
          viewBox="0 0 1440 320"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#4A8EBC"
            fillOpacity="1"
            d="M0,192L48,176C96,160,192,128,288,122.7C384,117,480,139,576,165.3C672,192,768,224,864,213.3C960,203,1056,149,1152,138.7C1248,128,1344,160,1392,176L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          ></path>
        </svg>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#1A2A44] to-[#4A8EBC]">
            Join Our Tech Revolution at NDH Tech!
          </h1>
          <p className="text-lg text-[#2B4066]/80 max-w-3xl mx-auto">
            Explore open roles, meet our team, and apply to shape the future with NDH Tech.

          </p>
          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-center gap-4">



          </div>
        </div>
      </div>

      {/* Conditionally Rendered Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        {/* Section 1: Career Opportunities */}
        {activeSection === "opportunities" && (
          <div
            id="category-1"
            className={`animate-on-scroll rounded-xl p-8 border border-[#4A8EBC]/10 bg-white/70 backdrop-blur-sm shadow-lg transition-all duration-500 ${
              isAnimated(1) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-3xl font-bold text-[#1A2A44] mb-4">
              Current Openings
            </h2>
            <p className="text-lg text-[#2B4066]/80 mb-6">
              No vacancy available now. Please check back later for exciting opportunities to join NDH Tech!
            </p>
            <div className="text-center">
              <button
                onClick={() => setActiveSection("contact")}
                className="px-6 py-3 bg-gradient-to-r from-[#4A8EBC] to-[#3B5488] text-white font-semibold rounded-full transition-all duration-300 hover:scale-105"
              >
                Contact Us
              </button>
            </div>
          </div>
        )}




      </div>
      <Footer />
    </div>
  )
}

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
            Join Our Tech Revolution at xAI!
          </h1>
          <p className="text-lg text-[#2B4066]/80 max-w-3xl mx-auto">
            Explore open roles, meet our team, and apply to shape the future with xAI.
          </p>
          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={() => setActiveSection("opportunities")}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                activeSection === "opportunities"
                  ? "bg-gradient-to-r from-[#4A8EBC] to-[#3B5488] text-white"
                  : "bg-white text-[#4A8EBC] border-2 border-[#4A8EBC]"
              }`}
            >
              Opportunities
            </button>
            <button
              onClick={() => setActiveSection("developer")}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                activeSection === "developer"
                  ? "bg-gradient-to-r from-[#4A8EBC] to-[#3B5488] text-white"
                  : "bg-white text-[#4A8EBC] border-2 border-[#4A8EBC]"
              }`}
            >
              Our Developers
            </button>
            <button
              onClick={() => setActiveSection("contact")}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                activeSection === "contact"
                  ? "bg-gradient-to-r from-[#4A8EBC] to-[#3B5488] text-white"
                  : "bg-white text-[#4A8EBC] border-2 border-[#4A8EBC]"
              }`}
            >
              Apply Now
            </button>
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
              Do you think you’re a good fit? Apply now. We would love to meet you.
            </p>
            <div className="space-y-4">
              {/* Frontend Developer */}
              <div className="flex items-center justify-between border-b border-[#4A8EBC]/10 pb-4">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-[#E0F0FF] flex items-center justify-center mr-4">
                    <Briefcase className="h-6 w-6 text-[#4A8EBC]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#1A2A44] hover:text-[#4A8EBC] transition-colors duration-300">
                      Frontend Developer
                    </h3>
                    <p className="text-sm text-[#2B4066]/80">Pune, India</p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveSection("contact")}
                  className="flex items-center text-[#4A8EBC] font-semibold hover:text-[#3B5488] transition-colors duration-300"
                >
                  Apply Now <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>
              {/* Figma Designer */}
              <div className="flex items-center justify-between border-b border-[#4A8EBC]/10 pb-4">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-[#E0F0FF] flex items-center justify-center mr-4">
                    <Briefcase className="h-6 w-6 text-[#4A8EBC]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#1A2A44] hover:text-[#4A8EBC] transition-colors duration-300">
                      Figma Designer
                    </h3>
                    <p className="text-sm text-[#2B4066]/80">Kathmandu, Nepal</p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveSection("contact")}
                  className="flex items-center text-[#4A8EBC] font-semibold hover:text-[#3B5488] transition-colors duration-300"
                >
                  Apply Now <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Section 2: Our Developers (Styled like the "Want to talk in-person?" section) */}
        {activeSection === "developer" && (
          <div
            id="category-2"
            className={`animate-on-scroll rounded-xl p-8 border border-[#4A8EBC]/10 bg-white/70 backdrop-blur-sm shadow-lg transition-all duration-500 ${
              isAnimated(2) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-3xl font-bold text-[#1A2A44] mb-4">
              Want to Connect with Our Team?
            </h2>
            <p className="text-lg text-[#2B4066]/80 mb-6">
              Get in touch with one of our team leads to discuss further:
            </p>
            <div className="space-y-4">
              {/* Developer 1 */}
              <div className="flex items-center justify-between border-b border-[#4A8EBC]/10 pb-4">
                <div className="flex items-center">
                  <img
                    src="https://via.placeholder.com/40" // Replace with actual developer photo URL
                    alt="Developer"
                    className="w-10 h-10 rounded-full mr-4 border-2 border-[#4A8EBC]/20"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-[#1A2A44] hover:text-[#4A8EBC] transition-colors duration-300">
                      Alex Smith
                    </h3>
                    <p className="text-sm text-[#2B4066]/80">Lead Frontend Developer</p>
                  </div>
                </div>
                <a
                  href="https://linkedin.com/in/alex-smith" // Replace with actual LinkedIn URL
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-[#4A8EBC] font-semibold hover:text-[#3B5488] transition-colors duration-300"
                >
                  <Linkedin className="mr-2 h-5 w-5" /> Connect on LinkedIn
                </a>
              </div>
              {/* Developer 2 */}
              <div className="flex items-center justify-between border-b border-[#4A8EBC]/10 pb-4">
                <div className="flex items-center">
                  <img
                    src="https://via.placeholder.com/40" // Replace with actual developer photo URL
                    alt="Developer"
                    className="w-10 h-10 rounded-full mr-4 border-2 border-[#4A8EBC]/20"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-[#1A2A44] hover:text-[#4A8EBC] transition-colors duration-300">
                      Priya Sharma
                    </h3>
                    <p className="text-sm text-[#2B4066]/80">Senior Figma Designer</p>
                  </div>
                </div>
                <a
                  href="https://linkedin.com/in/priya-sharma" // Replace with actual LinkedIn URL
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-[#4A8EBC] font-semibold hover:text-[#3B5488] transition-colors duration-300"
                >
                  <Linkedin className="mr-2 h-5 w-5" /> Connect on LinkedIn
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Section 3: Apply Now (Form for Both Roles) */}
        {activeSection === "contact" && (
          <div
            id="category-3"
            className={`animate-on-scroll rounded-xl p-8 border border-[#4A8EBC]/10 bg-white/70 backdrop-blur-sm shadow-lg transition-all duration-500 ${
              isAnimated(3) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-[#4A8EBC]/20 to-[#3B5488]/20 flex items-center justify-center mb-6 shadow-md">
              <Mail className="h-8 w-8 text-[#4A8EBC]" />
            </div>
            <h2 className="text-2xl font-bold text-[#1A2A44] mb-4 border-b-2 border-[#4A8EBC]/20 pb-2">
              👉 Apply for a Career at xAI
            </h2>
            <form className="space-y-6">
              <div>
                <label className="block text-[#1A2A44] font-semibold mb-2" htmlFor="name">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full p-3 rounded-lg border border-[#4A8EBC]/20 focus:outline-none focus:border-[#4A8EBC]"
                  placeholder="Your Full Name"
                  required
                />
              </div>
              <div>
                <label className="block text-[#1A2A44] font-semibold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-3 rounded-lg border border-[#4A8EBC]/20 focus:outline-none focus:border-[#4A8EBC]"
                  placeholder="Your Email"
                  required
                />
              </div>
              <div>
                <label className="block text-[#1A2A44] font-semibold mb-2" htmlFor="role">
                  Applying For
                </label>
                <select
                  id="role"
                  className="w-full p-3 rounded-lg border border-[#4A8EBC]/20 focus:outline-none focus:border-[#4A8EBC]"
                  required
                >
                  <option value="">Select a Role</option>
                  <option value="frontend-developer">Frontend Developer</option>
                  <option value="figma-designer">Figma Designer</option>
                </select>
              </div>
              <div>
                <label className="block text-[#1A2A44] font-semibold mb-2" htmlFor="portfolio">
                  Portfolio/GitHub/Figma Link
                </label>
                <input
                  type="url"
                  id="portfolio"
                  className="w-full p-3 rounded-lg border border-[#4A8EBC]/20 focus:outline-none focus:border-[#4A8EBC]"
                  placeholder="Link to your portfolio, GitHub, or Figma"
                  required
                />
              </div>
              <div>
                <label className="block text-[#1A2A44] font-semibold mb-2" htmlFor="resume">
                  Resume/CV (URL)
                </label>
                <input
                  type="url"
                  id="resume"
                  className="w-full p-3 rounded-lg border border-[#4A8EBC]/20 focus:outline-none focus:border-[#4A8EBC]"
                  placeholder="Link to your resume (e.g., Google Drive)"
                  required
                />
              </div>
              <div>
                <label className="block text-[#1A2A44] font-semibold mb-2" htmlFor="message">
                  Why Join xAI?
                </label>
                <textarea
                  id="message"
                  className="w-full p-3 rounded-lg border border-[#4A8EBC]/20 focus:outline-none focus:border-[#4A8EBC]"
                  rows="4"
                  placeholder="Tell us why you’re excited to join xAI"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-[#4A8EBC] to-[#3B5488] text-white font-bold rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Submit Application
              </button>
            </form>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}
"use client"
import React from "react"
import { useState, useEffect } from "react"
import { Briefcase, Users, Mail, ArrowRight, Linkedin } from "lucide-react"

import Footer from "./Footer"
import CareerApplicationForm from "./CareerApplicationForm"
import { NavLink, useLocation } from "react-router-dom";

export default function Careers() {
  const [activeSection, setActiveSection] = useState("opportunities") 
  const [animatedItems, setAnimatedItems] = useState([])
  const [careers, setCareers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState("");
  const location = useLocation();

  useEffect(() => {
    const stored = localStorage.getItem("careers");
    setCareers(stored ? JSON.parse(stored) : []);
  }, []);

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

  const handleApplyNow = (position) => {
    setSelectedPosition(position);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedPosition("");
  };

  return (
    <div className="w-full min-h-screen bg-[#F5FAFF] flex">
      <main className="flex-1 relative overflow-hidden">
        {/* Modal for Application Form */}
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="relative w-full max-w-lg mx-auto">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl font-bold z-10"
                onClick={handleCloseForm}
                aria-label="Close"
              >
                &times;
              </button>
              <CareerApplicationForm position={selectedPosition} onSuccess={handleCloseForm} />
            </div>
          </div>
        )}
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
              Explore open roles, meet our team, and apply to shape the future with NDH Tech!
            </p>
            {/* Navigation Buttons */}
            <div className="mt-8 flex justify-center gap-4"></div>
          </div>
        </div>

        {/* Conditionally Rendered Sections */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          {/* Section 1: Career Opportunities */}
          {activeSection === "opportunities" && (
            <>
              <div
                id="category-1"
                className={`animate-on-scroll rounded-xl p-8 border border-[#4A8EBC]/10 bg-white/70 backdrop-blur-sm shadow-lg transition-all duration-500 ${
                  isAnimated(1) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
              >
                <h2 className="text-3xl font-bold text-[#1A2A44] mb-4">
                  Current Openings
                </h2>
                {careers.length === 0 ? (
                  <>
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
                  </>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
                    {careers.map((c) => (
                      <div key={c.id} className="group bg-white/90 border border-[#4A8EBC]/10 rounded-2xl shadow-lg p-6 flex flex-col items-center hover:shadow-2xl transition-all duration-300">
                        <div className="w-24 h-24 mb-4 flex items-center justify-center bg-gradient-to-tr from-[#E0F0FF] to-[#F5FAFF] rounded-full border-4 border-[#4A8EBC]/20 overflow-hidden">
                          {c.image ? (
                            <img src={c.image} alt={c.title} className="w-full h-full object-cover" />
                          ) : (
                            <Briefcase className="w-12 h-12 text-[#4A8EBC]/60" />
                          )}
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-xl text-[#1A2A44] mb-1 group-hover:text-[#4A8EBC] transition-colors">{c.title}</div>
                          <div className="text-gray-700 mb-3">{c.desc}</div>
                          <button
                            className="mt-2 px-6 py-2 bg-gradient-to-r from-[#4A8EBC] to-[#3B5488] text-white font-semibold rounded-full shadow hover:scale-105 transition-all"
                            onClick={() => handleApplyNow(c.title)}
                          >
                            Apply Now
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {/* Apply Now Section */}
              {careers.length !== 0 && (
                <section className="max-w-5xl mx-auto my-20 p-10 rounded-2xl bg-gradient-to-br from-[#4A8EBC]/10 to-[#E0F0FF]/60 shadow-xl border border-[#4A8EBC]/10 flex flex-col md:flex-row items-center gap-10">
                  <div className="flex-1 text-center md:text-left">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-[#1A2A44] mb-4">Ready to Join NDH Tech?</h2>
                    <p className="text-lg text-[#2B4066]/80 mb-6">We're always looking for passionate, talented people. If you don't see a role that fits, send us your CV and tell us why you'd be a great addition to our team!</p>
                    <a href="mailto:info@ndh.com" className="inline-block px-8 py-3 bg-gradient-to-r from-[#4A8EBC] to-[#3B5488] text-white font-bold rounded-full shadow hover:scale-105 transition-all">Apply by Email</a>
                  </div>
                  <div className="flex-1 flex justify-center">
                    <img src="/apply-career.svg" alt="Apply Now" className="w-64 h-64 object-contain" />
                  </div>
                </section>
              )}
            </>
          )}
        </div>
        {/* The form is now shown as a modal, not inline */}
        <Footer />
      </main>
    </div>
  );
}

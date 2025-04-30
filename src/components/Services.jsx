"use client"
import React from "react"

import { useState, useEffect } from "react"
import { Globe, Smartphone, Layout, Share2, Search, Palette, Database, BarChart2, HeadphonesIcon } from "lucide-react"
import { Link } from "react-router-dom"
export default function Services() {
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
    <div className="w-full bg-[#F5FAFF] relative overflow-hidden">
      {/* Decorative elements with low opacity */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Circles */}
        <div className="absolute top-40 left-10 w-64 h-64 rounded-full bg-[#4A8EBC]/5 animate-pulse-slow"></div>
        <div className="absolute bottom-40 right-10 w-96 h-96 rounded-full bg-[#3B5488]/5 animate-pulse-slow"></div>

        {/* Grid pattern */}
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
        {/* Wavy pattern */}
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
          <div className="inline-block relative">
            <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-[#4A8EBC]/20 animate-pulse-slow"></div>
            <div className="absolute -bottom-4 -right-4 w-8 h-8 rounded-full bg-[#3B5488]/20 animate-pulse-slow"></div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#1A2A44] to-[#4A8EBC]">
              Our Expertise, <span className="text-[#4A8EBC]">Your Success.</span>
            </h1>
          </div>
          <p className="text-lg text-[#2B4066]/80 max-w-3xl mx-auto">
            We deliver cutting-edge digital solutions tailored to your business needs, helping you stay ahead in today's
            competitive landscape.
          </p>
        </div>
      </div>

      {/* Services Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Digital Presence & Development */}
          <div
            id="category-1"
            className={`animate-on-scroll rounded-xl p-8 border border-[#4A8EBC]/10 bg-white/70 backdrop-blur-sm shadow-lg transition-all duration-500 hover:shadow-xl hover:bg-white/90 ${
              isAnimated(1) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-[#4A8EBC]/20 to-[#3B5488]/20 flex items-center justify-center mb-6 shadow-md">
              <Globe className="h-8 w-8 text-[#4A8EBC]" />
            </div>
            <h2 className="text-2xl font-bold text-[#1A2A44] mb-4 border-b-2 border-[#4A8EBC]/20 pb-2">
              Digital Presence & Development
            </h2>
            <div className="space-y-6">
              <ServiceItem
                icon={<Layout className="h-6 w-6 text-[#4A8EBC]" />}
                title="Custom Web Solutions"
                description="From e-commerce platforms to dynamic web applications, we build websites that perform."
              />
              <ServiceItem
                icon={<Smartphone className="h-6 w-6 text-[#4A8EBC]" />}
                title="Mobile App Innovation"
                description="Cross-platform apps designed for seamless user experiences."
              />
              <ServiceItem
                icon={<Layout className="h-6 w-6 text-[#4A8EBC]" />}
                title="WordPress Mastery"
                description="Tailored WordPress solutions for businesses of all sizes."
              />
            </div>
          </div>

          {/* Digital Marketing & Branding */}
          <div
            id="category-2"
            className={`animate-on-scroll rounded-xl p-8 border border-[#4A8EBC]/10 bg-white/70 backdrop-blur-sm shadow-lg transition-all duration-700 hover:shadow-xl hover:bg-white/90 ${
              isAnimated(2) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-[#4A8EBC]/20 to-[#3B5488]/20 flex items-center justify-center mb-6 shadow-md">
              <Share2 className="h-8 w-8 text-[#4A8EBC]" />
            </div>
            <h2 className="text-2xl font-bold text-[#1A2A44] mb-4 border-b-2 border-[#4A8EBC]/20 pb-2">
              Digital Marketing & Branding
            </h2>
            <div className="space-y-6">
              <ServiceItem
                icon={<Share2 className="h-6 w-6 text-[#4A8EBC]" />}
                title="Strategic Social Media"
                description="Engaging content and targeted campaigns that build your brand."
              />
              <ServiceItem
                icon={<Search className="h-6 w-6 text-[#4A8EBC]" />}
                title="SEO Excellence"
                description="Improving your online visibility and driving organic traffic."
              />
              <ServiceItem
                icon={<Palette className="h-6 w-6 text-[#4A8EBC]" />}
                title="Visual Branding"
                description="Creating compelling visuals that resonate with your audience."
              />
            </div>
          </div>

          {/* IT Support & Consulting */}
          <div
            id="category-3"
            className={`animate-on-scroll rounded-xl p-8 border border-[#4A8EBC]/10 bg-white/70 backdrop-blur-sm shadow-lg transition-all duration-900 hover:shadow-xl hover:bg-white/90 ${
              isAnimated(3) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-[#4A8EBC]/20 to-[#3B5488]/20 flex items-center justify-center mb-6 shadow-md">
              <Database className="h-8 w-8 text-[#4A8EBC]" />
            </div>
            <h2 className="text-2xl font-bold text-[#1A2A44] mb-4 border-b-2 border-[#4A8EBC]/20 pb-2">
              IT Support & Consulting
            </h2>
            <div className="space-y-6">
              <ServiceItem
                icon={<Database className="h-6 w-6 text-[#4A8EBC]" />}
                title="Database Solutions"
                description="Robust database management and optimization."
              />
              <ServiceItem
                icon={<BarChart2 className="h-6 w-6 text-[#4A8EBC]" />}
                title="IT Strategic Planning"
                description="Aligning your IT infrastructure with your business goals."
              />
              <ServiceItem
                icon={<HeadphonesIcon className="h-6 w-6 text-[#4A8EBC]" />}
                title="Reliable Technical Support"
                description="Ensuring smooth operations with our expert support."
              />
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div
          id="category-4"
          className={`animate-on-scroll mt-16 text-center transition-all duration-1000 ${
            isAnimated(4) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <Link to='/eservices' smooth={true} duration={500}>
          <button className="px-8 py-4 bg-gradient-to-r from-[#4A8EBC] to-[#3B5488] text-white font-bold rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            See All Services
          </button>
          </Link>
        </div>
      </div>

      {/* Bottom Banner */}
      <div className="w-full bg-gradient-to-t from-[#E0F0FF] to-[#F5FAFF] py-16 px-4 sm:px-6 lg:px-8 mt-16 relative">
        {/* Subtle pattern overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%234A8EBC' fillOpacity='1' fillRule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1'/%3E%3Ccircle cx='13' cy='13' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>


      </div>
    </div>
  )
}

// Service Item Component
function ServiceItem({ icon, title, description }) {
  return (
    <div className="group">
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-4 p-2 rounded-lg bg-[#E0F0FF] group-hover:bg-[#4A8EBC]/10 transition-colors duration-300">
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-[#1A2A44] group-hover:text-[#4A8EBC] transition-colors duration-300">
            {title}
          </h3>
          <p className="mt-1 text-[#2B4066]/80">{description}</p>
        </div>
      </div>
    </div>
  )
}


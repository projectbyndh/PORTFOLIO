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
    <main className="w-full bg-linear-to-br from-[#F5FAFF] via-[#EAF5FF] to-[#F0F9FF] relative overflow-hidden py-20" role="region" aria-labelledby="services-heading">
      {/* Enhanced Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-80 h-80 rounded-full bg-linear-to-br from-[#4A8EBC]/6 to-[#2DD4BF]/4 animate-float blur-2xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-linear-to-br from-[#3B5488]/5 to-[#8B5CF6]/3 animate-float blur-2xl" style={{animationDelay: '3s'}}></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 rounded-full bg-linear-to-br from-[#F59E0B]/4 to-[#EF4444]/3 animate-float blur-xl" style={{animationDelay: '6s'}}></div>

        {/* Geometric Shapes */}
        <div className="absolute top-32 right-32 w-20 h-20 border-2 border-[#4A8EBC]/20 rotate-45 animate-spin-slow"></div>
        <div className="absolute bottom-32 left-32 w-16 h-16 bg-[#2DD4BF]/10 rounded-full animate-bounce"></div>

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-4"
          style={{
            backgroundImage: `radial-gradient(circle, #4A8EBC 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      {/* Enhanced Header Section */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <div className="relative inline-block mb-8">
            <div className="absolute -top-6 -left-6 w-12 h-12 rounded-full bg-linear-to-br from-[#4A8EBC]/20 to-[#2DD4BF]/20 animate-pulse-slow"></div>
            <div className="absolute -bottom-6 -right-6 w-12 h-12 rounded-full bg-linear-to-br from-[#8B5CF6]/20 to-[#F59E0B]/20 animate-pulse-slow" style={{animationDelay: '1s'}}></div>
            <h1 id="services-heading" className="text-5xl md:text-6xl font-extrabold mb-6 animate-fade-in">
              <span className="bg-linear-to-r from-[#1A2A44] via-[#4A8EBC] to-[#3B5488] bg-clip-text text-transparent">
                Our Expertise,
              </span>
              <br />
              <span className="bg-linear-to-r from-[#2DD4BF] to-[#8B5CF6] bg-clip-text text-transparent">
                Your Success
              </span>
            </h1>
          </div>

          <p className="text-xl md:text-2xl text-[#2B4066]/80 max-w-4xl mx-auto leading-relaxed animate-fade-in" style={{animationDelay: '0.3s'}}>
            We deliver cutting-edge digital solutions tailored to your business needs, helping you stay ahead in today's
            competitive landscape with innovative technology and strategic insights.
          </p>
        </div>
      </div>

      {/* Enhanced Services Categories */}
      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Digital Presence & Development */}
          <div
            id="category-1"
            className={`group relative animate-on-scroll transition-all duration-700 hover:-translate-y-2 ${
              isAnimated(1) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="absolute inset-0 bg-linear-to-br from-[#4A8EBC]/10 to-[#2DD4BF]/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl hover:shadow-3xl border border-white/50 transition-all duration-500">
              <div className="h-20 w-20 rounded-2xl bg-linear-to-br from-[#4A8EBC] to-[#3B5488] flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300">
                <Globe className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-[#1A2A44] mb-6 group-hover:text-[#4A8EBC] transition-colors duration-300">
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
          </div>

          {/* Digital Marketing & Branding */}
          <div
            id="category-2"
            className={`group relative animate-on-scroll transition-all duration-700 hover:-translate-y-2 ${
              isAnimated(2) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{animationDelay: '0.2s'}}
          >
            <div className="absolute inset-0 bg-linear-to-br from-[#2DD4BF]/10 to-[#8B5CF6]/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl hover:shadow-3xl border border-white/50 transition-all duration-500">
              <div className="h-20 w-20 rounded-2xl bg-linear-to-br from-[#2DD4BF] to-[#8B5CF6] flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300">
                <Share2 className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-[#1A2A44] mb-6 group-hover:text-[#2DD4BF] transition-colors duration-300">
                Digital Marketing & Branding
              </h2>
              <div className="space-y-6">
                <ServiceItem
                  icon={<Share2 className="h-6 w-6 text-[#2DD4BF]" />}
                  title="Strategic Social Media"
                  description="Engaging content and targeted campaigns that build your brand."
                />
                <ServiceItem
                  icon={<Search className="h-6 w-6 text-[#2DD4BF]" />}
                  title="SEO Excellence"
                  description="Improving your online visibility and driving organic traffic."
                />
                <ServiceItem
                  icon={<Palette className="h-6 w-6 text-[#2DD4BF]" />}
                  title="Visual Branding"
                  description="Creating compelling visuals that resonate with your audience."
                />
              </div>
            </div>
          </div>

          {/* IT Support & Consulting */}
          <div
            id="category-3"
            className={`group relative animate-on-scroll transition-all duration-700 hover:-translate-y-2 ${
              isAnimated(3) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{animationDelay: '0.4s'}}
          >
            <div className="absolute inset-0 bg-linear-to-br from-[#8B5CF6]/10 to-[#F59E0B]/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl hover:shadow-3xl border border-white/50 transition-all duration-500">
              <div className="h-20 w-20 rounded-2xl bg-linear-to-br from-[#8B5CF6] to-[#F59E0B] flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300">
                <Database className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-[#1A2A44] mb-6 group-hover:text-[#8B5CF6] transition-colors duration-300">
                IT Support & Consulting
              </h2>
              <div className="space-y-6">
                <ServiceItem
                  icon={<Database className="h-6 w-6 text-[#8B5CF6]" />}
                  title="Database Solutions"
                  description="Robust database management and optimization."
                />
                <ServiceItem
                  icon={<BarChart2 className="h-6 w-6 text-[#8B5CF6]" />}
                  title="IT Strategic Planning"
                  description="Aligning your IT infrastructure with your business goals."
                />
                <ServiceItem
                  icon={<HeadphonesIcon className="h-6 w-6 text-[#8B5CF6]" />}
                  title="Reliable Technical Support"
                  description="Ensuring smooth operations with our expert support."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced CTA Section */}
        <div
          id="category-4"
          className={`animate-on-scroll mt-16 text-center transition-all duration-1000 ${
            isAnimated(4) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-linear-to-r from-[#4A8EBC] to-[#3B5488] rounded-2xl blur-xl opacity-30 animate-pulse-slow"></div>
            <Link to='/E-Services'>
              <button className="relative px-12 py-5 bg-linear-to-r from-[#4A8EBC] via-[#2DD4BF] to-[#3B5488] text-white font-bold rounded-2xl text-xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 hover:from-[#3B5488] hover:via-[#8B5CF6] hover:to-[#1A2A44] group overflow-hidden">
                <span className="relative z-10">Explore All Services</span>
                <div className="absolute inset-0 bg-linear-to-r from-[#2DD4BF] to-[#8B5CF6] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

// Enhanced Service Item Component
function ServiceItem({ icon, title, description }) {
  return (
    <div className="group relative p-4 rounded-xl hover:bg-linear-to-r hover:from-[#4A8EBC]/5 hover:to-[#2DD4BF]/5 transition-all duration-300 cursor-pointer">
      <div className="flex items-start gap-4">
        <div className="shrink-0 p-3 rounded-xl bg-linear-to-br from-[#4A8EBC]/10 to-[#2DD4BF]/10 group-hover:from-[#4A8EBC]/20 group-hover:to-[#2DD4BF]/20 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-[#1A2A44] group-hover:text-[#4A8EBC] transition-colors duration-300 mb-2">
            {title}
          </h3>
          <p className="text-[#2B4066]/80 leading-relaxed group-hover:text-[#2B4066]/90 transition-colors duration-300">
            {description}
          </p>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-[#4A8EBC] to-[#2DD4BF] group-hover:w-full transition-all duration-500"></div>
    </div>
  )
}


"use client" // Next.js client-side component directive
import androidIcon from '../assets/android.png'
import wordpressIcon from '../assets/wordpress.png'
import iosIcon from '../assets/app-store.png'
import graphicsIcon from '../assets/grapphics.png'
import marketingIcon from '../assets/markeyting.png'
import webIcon from '../assets/web-design.png'
import logo from '../assets/logo.png'
import { useEffect, useRef } from "react"
import React from "react"
import { Link } from 'react-router-dom'


const TECH_STACK = [
  { name: "Android Development", icon: androidIcon },
  { name: "WordPress", icon: wordpressIcon },
  { name: "iOS Development", icon: iosIcon },
  { name: "Graphics Design", icon: graphicsIcon },
  { name: "Digital Marketing", icon: marketingIcon },
  { name: "Web Development", icon: webIcon },
]
// Stats data
const STATS = [
  { value: "7+", label: "Projects Delivered" },
  { value: "1+", label: "Years in Business" },
  { value: "10+", label: "Team Members" },
]

function First() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const icons = container.querySelectorAll(".tech-icon")
    const radius = 220
    const totalIcons = icons.length

    // Initial positioning
    icons.forEach((icon, index) => {
      const angle = (index / totalIcons) * 2 * Math.PI
      const x = radius * Math.cos(angle)
      const y = radius * Math.sin(angle)
      icon.style.transform = `translate(${x}px, ${y}px)`
    })

    // Animation
    let rotation = 0
    const animate = () => {
      rotation += 0.005
      icons.forEach((icon, index) => {
        const angle = (index / totalIcons) * 2 * Math.PI + rotation
        const x = radius * Math.cos(angle)
        const y = radius * Math.sin(angle)
        icon.style.transform = `translate(${x}px, ${y}px) rotate(${rotation * 0}deg)`
      })
      requestAnimationFrame(animate)
    }
    animate()
  }, [])

  return (
    <div className="bg-linear-to-br from-[#F5FAFF] via-[#EAF5FF] to-[#F0F9FF] min-h-screen font-sans relative overflow-hidden">
      {/* Enhanced Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-linear-to-br from-[#4A8EBC]/8 to-[#2DD4BF]/5 animate-float blur-xl"></div>
        <div className="absolute bottom-40 right-10 w-96 h-96 rounded-full bg-linear-to-br from-[#3B5488]/6 to-[#8B5CF6]/4 animate-float blur-xl" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/4 w-48 h-48 rounded-full bg-linear-to-br from-[#F59E0B]/6 to-[#EF4444]/4 animate-float blur-lg" style={{animationDelay: '4s'}}></div>

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
      <header className="relative z-10">
        <nav className="flex justify-between items-center p-6 lg:px-12">
          <div className="flex items-center space-x-2">
            <img src={logo} alt="Nepal Digital Heights Logo" className="h-12 w-auto" />
          </div>
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-[#1A2A44] hover:text-[#4A8EBC] font-medium transition-colors duration-300">Home</Link>
            <Link to="/about-us" className="text-[#1A2A44] hover:text-[#4A8EBC] font-medium transition-colors duration-300">About</Link>
            <Link to="/E-Services" className="text-[#1A2A44] hover:text-[#4A8EBC] font-medium transition-colors duration-300">Services</Link>
            <Link to="/case-studies" className="text-[#1A2A44] hover:text-[#4A8EBC] font-medium transition-colors duration-300">Case Studies</Link>
            <Link to="/Careers" className="text-[#1A2A44] hover:text-[#4A8EBC] font-medium transition-colors duration-300">Careers</Link>
            <Link to="/contact" className="text-[#1A2A44] hover:text-[#4A8EBC] font-medium transition-colors duration-300">Contact</Link>
          </div>
          <div className="md:hidden">
            <button className="text-[#1A2A44] hover:text-[#4A8EBC] focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* Enhanced Hero Section */}
      <section className="relative z-10 px-6 lg:px-12 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="relative inline-block">
                <div className="absolute -top-8 -left-8 w-16 h-16 rounded-full bg-linear-to-br from-[#4A8EBC]/20 to-[#2DD4BF]/20 animate-pulse-slow"></div>
                <div className="absolute -bottom-8 -right-8 w-12 h-12 rounded-full bg-linear-to-br from-[#8B5CF6]/20 to-[#F59E0B]/20 animate-pulse-slow" style={{animationDelay: '1s'}}></div>
                <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight animate-fade-in">
                  <span className="bg-linear-to-r from-[#1A2A44] via-[#4A8EBC] to-[#3B5488] bg-clip-text text-transparent">
                    Nepal Digital
                  </span>
                  <br />
                  <span className="bg-linear-to-r from-[#2DD4BF] to-[#8B5CF6] bg-clip-text text-transparent">
                    Heights
                  </span>
                </h1>
              </div>

              <p className="text-xl lg:text-2xl text-[#2B4066]/80 leading-relaxed animate-fade-in" style={{animationDelay: '0.3s'}}>
                Empowering businesses with cutting-edge digital solutions. From web development to mobile apps,
                we transform ideas into reality with innovation and excellence.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{animationDelay: '0.6s'}}>
                <Link
                  to="/E-Services"
                  className="bg-linear-to-r from-[#4A8EBC] via-[#2DD4BF] to-[#3B5488] text-white font-bold py-4 px-8 rounded-full text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:from-[#3B5488] hover:via-[#8B5CF6] hover:to-[#1A2A44] group overflow-hidden"
                >
                  <span className="relative z-10">Discover Services</span>
                  <div className="absolute inset-0 bg-linear-to-r from-[#2DD4BF] to-[#8B5CF6] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </Link>
                <Link
                  to="/contact"
                  className="border-2 border-[#4A8EBC] text-[#3B5488] font-semibold py-4 px-8 rounded-full text-lg hover:bg-[#4A8EBC]/30 hover:shadow-xl transition-all duration-300 backdrop-blur-sm"
                >
                  Get Started
                </Link>
              </div>
            </div>

            {/* Right Content - Tech Stack Animation */}
            <div className="relative" ref={containerRef}>
              <div className="relative w-96 h-96 mx-auto">
                {/* Central Logo */}
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <div className="w-32 h-32 bg-white/90 backdrop-blur-xl rounded-full shadow-2xl flex items-center justify-center animate-pulse-slow">
                    <img src={logo} alt="Nepal Digital Heights" className="w-20 h-20 object-contain" />
                  </div>
                </div>

                {/* Animated Tech Icons */}
                {TECH_STACK.map((tech, index) => (
                  <div
                    key={tech.name}
                    className="tech-icon absolute w-16 h-16 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg flex items-center justify-center hover:scale-110 transition-transform duration-300 animate-float"
                    style={{animationDelay: `${index * 0.2}s`}}
                  >
                    <img src={tech.icon} alt={tech.name} className="w-10 h-10 object-contain" />
                    <div className="absolute -bottom-10 whitespace-nowrap text-sm font-medium bg-linear-to-r from-[#4A8EBC] to-[#3B5488] text-white px-3 py-1 rounded-full shadow-md opacity-0 hover:opacity-100 transition-opacity duration-200">
                      {tech.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="relative z-10 px-6 py-16">
        <div className="bg-linear-to-r from-[#E0F0FF] via-[#D8EBFF] to-[#E8F4FF] px-6 py-16 text-center relative z-10 shadow-inner">
          <div className="absolute inset-0 opacity-5 bg-[#4A8EBC]/5"></div>

          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-12 relative">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="hover:transform hover:-translate-y-3 transition-all duration-300 bg-white/50 backdrop-blur-sm p-6 rounded-xl shadow-sm"
              >
                <span className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-[#1A2A44] to-[#4A8EBC]">
                  {stat.value}
                </span>
                <p className="text-base md:text-lg text-[#2B4066]/80 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default First
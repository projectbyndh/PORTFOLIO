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
  { value: "3+", label: "Projects Delivered" },
  { value: "1+", label: "Years in Business" },
  { value: "5+", label: "Team Members" },
  { value: "98%", label: "Client Satisfaction" },
]

function First() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const icons = container.querySelectorAll(".tech-icon")
    const radius = 200
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
      rotation += 0.01
      icons.forEach((icon, index) => {
        const angle = rotation + (index / totalIcons) * 2 * Math.PI
        const x = radius * Math.cos(angle)
        const y = radius * Math.sin(angle)
        icon.style.transform = `translate(${x}px, ${y}px) rotate(${rotation * 0}deg)`
      })
      requestAnimationFrame(animate)
    }

    const animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
  }, [])

  return (
    <div className="bg-[#F5FAFF] min-h-screen font-sans">
      <section className="bg-gradient-to-b from-[#F5FAFF] to-[#EAF5FF] text-[#1A2A44] relative overflow-hidden" id="home">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-[#4A8EBC]/5 animate-pulse-slow"></div>
          <div className="absolute bottom-40 right-10 w-96 h-96 rounded-full bg-[#3B5488]/5 animate-pulse-slow"></div>
          
          <svg className="absolute top-0 left-0 w-full h-64 opacity-10" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="#4A8EBC"
              fillOpacity="1"
              d="M0,192L48,176C96,160,192,128,288,122.7C384,117,480,139,576,165.3C672,192,768,224,864,213.3C960,203,1056,149,1152,138.7C1248,128,1344,160,1392,176L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            ></path>
          </svg>

          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `radial-gradient(#4A8EBC 1px, transparent 1px)`,
              backgroundSize: "30px 30px",
            }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24 flex flex-col lg:flex-row gap-16 items-center justify-center relative z-10">
          <div className="flex flex-col gap-8 text-center lg:text-left">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-12 h-12 rounded-full bg-[#4A8EBC]/20 animate-pulse-slow"></div>
              <div className="absolute -bottom-6 -right-6 w-12 h-12 rounded-full bg-[#3B5488]/20 animate-pulse-slow"></div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#1A2A44] to-[#4A8EBC] animate-fade-in relative">
                Nepal Digital Heights
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-[#2B4066]/80 leading-relaxed max-w-2xl">
              <span className="font-bold text-[#4A8EBC]">Innovate. Scale. Succeed.</span> - Unleashing limitless
              possibilities with world-class IT solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">

            <Link
  to="/E-Services"
  className="bg-gradient-to-r from-[#4A8EBC] to-[#3B5488] text-white font-semibold py-4 px-10 rounded-full text-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
>
  Discover Services
</Link>
              <Link
                to="/contact"
                className="border-2 border-[#4A8EBC] text-[#3B5488] font-semibold py-4 px-10 rounded-full text-lg hover:bg-[#4A8EBC]/30 hover:shadow-xl transition-all duration-300 backdrop-blur-sm"
              >
                Get Started
              </Link>
            </div>
          </div>

          <div className="relative w-[28rem] h-[28rem] flex items-center justify-center">
            <div className="absolute w-full h-full rounded-full border border-[#4A8EBC]/10"></div>
            <div className="absolute w-[90%] h-[90%] rounded-full border border-[#4A8EBC]/15"></div>
            <div className="absolute w-[80%] h-[80%] rounded-full border border-[#4A8EBC]/20"></div>

            <div className="absolute w-36 h-36 rounded-full bg-gradient-to-br from-[#4A8EBC]/20 to-[#3B5488]/20 flex items-center justify-center shadow-lg backdrop-blur-sm animate-pulse">
              <div className="w-32 h-32 relative bg-white rounded-full flex items-center justify-center shadow-inner">
                <img
                  src={logo}
                  alt="Nepal Digital Heights Logo"
                  className="w-24 h-24 object-contain"
                  onError={(e) => {
                    if (e.target instanceof HTMLImageElement) {
                      e.target.src = "/placeholder.svg?height=96&width=96"
                    }
                  }}
                />
              </div>
            </div>
            <div className="absolute w-full h-full rounded-full border-4 border-[#4A8EBC]/30 animate-spin-slow" />
            <div ref={containerRef} className="absolute w-full h-full">
              {TECH_STACK.map((tech) => (
                <div
                  key={tech.name}
                  className="tech-icon absolute top-1/2 left-1/2 w-16 h-16 -ml-8 -mt-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform duration-300 group"
                >
                  <img
                    src={tech.icon || "/placeholder.svg"}
                    alt={tech.name}
                    className="w-12 h-12 object-contain p-2"
                    onError={(e) => {
                      if (e.target instanceof HTMLImageElement) {
                        e.target.src = "/placeholder.svg?height=48&width=48"
                      }
                    }}
                  />
                  <div className="absolute -bottom-10 whitespace-nowrap text-sm font-medium bg-gradient-to-r from-[#4A8EBC] to-[#3B5488] text-white px-3 py-1 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {tech.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#E0F0FF] to-[#D8EBFF] px-6 py-12 text-center relative z-10 shadow-inner">
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%234A8EBC' fillOpacity='1' fillRule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1'/%3E%3Ccircle cx='13' cy='13' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>

          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 relative">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="hover:transform hover:-translate-y-3 transition-all duration-300 bg-white/50 backdrop-blur-sm p-6 rounded-xl shadow-sm"
              >
                <span className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#1A2A44] to-[#4A8EBC]">
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
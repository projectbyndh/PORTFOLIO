"use client"
import React from 'react'
import { useEffect, useRef } from "react"
import Footer from '../components/Footer'  // Adjust this path to your actual Footer component

const PortfolioPage = () => {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const icons = container.querySelectorAll(".tech-icon")
    const radius = 220
    const totalIcons = icons.length

    let rotation = 0
    const animate = () => {
      rotation += 0.005

      icons.forEach((icon, index) => {
        const angle = rotation + (index / totalIcons) * 2 * Math.PI
        const x = radius * Math.cos(angle)
        const y = radius * Math.sin(angle)
        icon.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => cancelAnimationFrame(animate)
  }, [])

  return (
    <div className="bg-[#F5FAFF] min-h-screen font-sans overflow-hidden">
      {/* Featured Project - Numazu Halal Food */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-[#1A2A44]">Featured Project</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center bg-white/70 backdrop-blur-md rounded-3xl shadow-2xl p-10 md:p-16 hover:shadow-[#4A8EBC]/40 transition-all duration-500">
            <div className="order-2 md:order-1">
              <h3 className="text-3xl font-bold mb-6 text-[#3B5488]">Numazu Halal Food</h3>
              <p className="text-lg mb-6 text-[#2B4066]/90">
                <strong>Scope:</strong> Custom Web Development & Cross-Platform Mobile Application
              </p>
              <div className="space-y-4 mb-8">
                <p><strong>Tech Stack:</strong></p>
                <ul className="grid grid-cols-2 gap-4 text-[#2B4066]/90">
                  <li className="flex items-center gap-2"><span className="w-2 h-2 bg-[#4A8EBC] rounded-full"></span> React.js Frontend</li>
                  <li className="flex items-center gap-2"><span className="w-2 h-2 bg-[#4A8EBC] rounded-full"></span> Flutter Mobile (iOS & Android)</li>
                  <li className="flex items-center gap-2"><span className="w-2 h-2 bg-[#4A8EBC] rounded-full"></span> .NET Backend & API</li>
                  <li className="flex items-center gap-2"><span className="w-2 h-2 bg-[#4A8EBC] rounded-full"></span> MySQL Database</li>
                </ul>
              </div>
              <p className="text-lg text-[#2B4066]/90">
                <strong>Impact:</strong> Bridged physical retail with seamless digital access. .NET backend ensured secure, scalable handling of peak traffic while maintaining data integrity across platforms.
              </p>
            </div>
            <div className="order-1 md:order-2 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://code.market/imgproxy/2023/06/1685761324_800_Food-Delivery-Flutter-iOSAndroid-App-Template.png"
                alt="Numazu Halal Food App Mockups"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Additional Projects Grid */}
      <section className="py-20 px-6 bg-gradient-to-b from-[#EAF5FF] to-[#F5FAFF]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-[#1A2A44]">More Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* UrbanStyle E-Commerce Platform */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl overflow-hidden hover:-translate-y-6 hover:shadow-2xl hover:shadow-[#4A8EBC]/40 transition-all duration-500">
              <div className="overflow-hidden">
                <img
                  src="https://flatlogic.com/blog/wp-content/uploads/2019/09/Screen-Shot-2019-09-17-at-5.11.27-PM-1024x578.png"
                  alt="UrbanStyle E-Commerce Dashboard"
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-[#3B5488]">UrbanStyle E-Commerce Platform</h3>
                <p className="text-[#2B4066]/90 mb-4">Full-stack online shopping platform with admin dashboard, product management, payments, and user authentication.</p>
                <p className="text-sm text-[#4A8EBC] font-medium">React • Node.js • Express • MongoDB</p>
              </div>
            </div>

            {/* Proprietary SaaS Inventory System */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl overflow-hidden hover:-translate-y-6 hover:shadow-2xl hover:shadow-[#4A8EBC]/40 transition-all duration-500">
              <div className="overflow-hidden">
                <img
                  src="https://cdn3.f-cdn.com//files/download/234270216/Screenshot%202024-10-14%20202706.png?width=780&height=438&fit=crop"
                  alt="Inventory Management Dashboard"
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-[#3B5488]">Proprietary SaaS Inventory System</h3>
                <p className="text-[#2B4066]/90 mb-4">Internal tool for real-time inventory management with third-party integrations.</p>
                <p className="text-sm text-[#4A8EBC] font-medium">.NET • React • MySQL</p>
              </div>
            </div>

            {/* Hospitality Sector Integrations */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl overflow-hidden hover:-translate-y-6 hover:shadow-2xl hover:shadow-[#4A8EBC]/40 transition-all duration-500">
              <div className="overflow-hidden">
                <img
                  src="https://i.ytimg.com/vi/yCWc91uwWPg/maxresdefault.jpg"
                  alt="Hospitality Booking Dashboard"
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-[#3B5488]">Hospitality Sector Integrations</h3>
                <p className="text-[#2B4066]/90 mb-4">Custom API integrations for booking and management systems.</p>
                <p className="text-sm text-[#4A8EBC] font-medium">Flutter • .NET • REST APIs</p>
              </div>
            </div>


          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default PortfolioPage
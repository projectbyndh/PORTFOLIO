"use client"; // For Next.js client-side component

import React, { useEffect, useRef } from "react";

// Importing assets (ensure these paths are correct in your project structure)
import android from '../assets/android.png';
import app from '../assets/app-store.png';
import grapphics from '../assets/grapphics.png';
import markeyting from '../assets/markeyting.png';
import web from '../assets/web-design.png';
import wordpress from '../assets/wordpress.png';
import logo from '../assets/logo.png';

// Tech stack data
const TECH_STACK = [
  { name: "Android Development", icon: android },
  { name: "WordPress", icon: wordpress },
  { name: "iOS Development", icon: app },
  { name: "Graphics Design", icon: grapphics },
  { name: "Digital Marketing", icon: markeyting },
  { name: "Web Development", icon: web },
];

// Stats data
const STATS = [
  { value: "50+", label: "Projects Delivered" },
  { value: "10+", label: "Years in Business" },
  { value: "25+", label: "Team Members" },
  { value: "98%", label: "Client Satisfaction" },
];

function First() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const icons = container.querySelectorAll(".tech-icon");
    const radius = 200;
    const totalIcons = icons.length;

    // Initial positioning
    icons.forEach((icon, index) => {
      const angle = (index / totalIcons) * 2 * Math.PI;
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);
      icon.style.transform = `translate(${x}px, ${y}px)`;
    });

    // Animation
    let rotation = 0;
    const animate = () => {
      rotation += 0.015;
      icons.forEach((icon, index) => {
        const angle = rotation + (index / totalIcons) * 2 * Math.PI;
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);
        icon.style.transform = `translate(${x}px, ${y}px) rotate(${rotation * 10}deg)`;
      });
      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className="bg-[#E6F0FA] min-h-screen font-sans">
      {/* Hero Section */}
      <section
        className="bg-gradient-to-br from-[#1A2A44] via-[#2B4066] to-[#3B5488] text-white relative overflow-hidden"
        id="home"
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-15">
          <div
            className="absolute top-0 left-0 w-full h-full"
            style={{
              backgroundImage: `url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CjxyZWN0IHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgZmlsbD0iIzAwMCIvPgo8cGF0aCBkPSJNMCwwSDYwVjYwSDBWMHoiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzRGODlEQyIgc3Ryb2tlLXdpZHRoPSIwLjUiLz4KPC9zdmc+')`,
            }}
          />
        </div>

        {/* Main content */}
        <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24 flex flex-col lg:flex-row gap-16 items-center justify-center relative z-10">
          {/* Text content */}
          <div className="flex flex-col gap-8 text-center lg:text-left">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#f0f0f0] to-[#d1e0ff] animate-fade-in">
              Nepal Digital Heights
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 leading-relaxed max-w-2xl">
              <span className="font-bold text-[#4A8EBC]">Innovate. Scale. Succeed.</span> - Unleashing limitless possibilities with world-class IT solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
              <a
                href="#services"
                className="bg-gradient-to-r from-[#4A8EBC] to-[#3B5488] text-white font-semibold py-4 px-10 rounded-full text-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                Discover Services
              </a>
              <a
                href="#contact"
                className="border-2 border-[#4A8EBC] text-white font-semibold py-4 px-10 rounded-full text-lg hover:bg-[#4A8EBC]/30 hover:shadow-xl transition-all duration-300"
              >
                Get Started
              </a>
            </div>
          </div>

          {/* Tech stack animation */}
          <div className="relative w-[28rem] h-[28rem] flex items-center justify-center">
            <div className="absolute w-36 h-36 rounded-full bg-[#4A8EBC]/20 flex items-center justify-center shadow-2xl animate-pulse">
              <img
                src={logo}
                alt="Nepal Digital Heights Logo"
                className="w-32 h-32 object-contain p-2 bg-white rounded-full"
                onError={(e) => (e.target.src = "/placeholder.svg")}
              />
            </div>
            <div className="absolute w-full h-full rounded-full border-4 border-[#4A8EBC]/60 animate-spin-slow" />
            <div ref={containerRef} className="absolute w-full h-full">
              {TECH_STACK.map((tech) => (
                <div
                  key={tech.name}
                  className="tech-icon absolute top-1/2 left-1/2 w-16 h-16 -ml-8 -mt-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform duration-300 group"
                >
                  <img
                    src={tech.icon}
                    alt={tech.name}
                    className="w-12 h-12 object-contain p-2"
                    onError={(e) => (e.target.src = "/placeholder.svg")}
                  />
                  <div className="absolute -bottom-10 whitespace-nowrap text-sm font-medium bg-[#4A8EBC] text-white px-3 py-1 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {tech.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats section */}
        <div className="bg-[#2B4066]/60 px-6 py-12 text-center relative z-10">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="hover:transform hover:-translate-y-3 transition-all duration-300"
              >
                <span className="text-4xl md:text-5xl font-extrabold text-[#f0f0f0]">
                  {stat.value}
                </span>
                <p className="text-base md:text-lg text-gray-200 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default First;
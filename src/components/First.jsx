"use client";
import android from '../assets/android.png';
import app from '../assets/app-store.png';
import grapphics from '../assets/grapphics.png';
import markeyting from '../assets/markeyting.png';
import web from '../assets/web-design.png';
import wordpress from '../assets/wordpress.png';
import logo from '../assets/logo.jpg'
import React from "react";
import { useEffect, useRef } from "react";

// Tech stack data
const TECH_STACK = [
  { name: "Android Development", icon: android },
  { name: "Wordpress", icon: wordpress },

  { name: "IOS Development", icon: app },
  { name: "Graphics", icon: grapphics },
  { name: "Digital Marketing", icon: markeyting },
  { name: "Web Development", icon: web },
];

function First() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const icons = container.querySelectorAll(".tech-icon");
    const radius = 140;
    const totalIcons = icons.length;

    // Position icons in a circle
    icons.forEach((icon, index) => {
      const angle = (index / totalIcons) * 2 * Math.PI;
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);

      icon.style.transform = `translate(${x}px, ${y}px)`;
    });

    // Animation
    let rotation = 0;
    const animate = () => {
      rotation += 0.002;

      icons.forEach((icon, index) => {
        const angle = rotation + (index / totalIcons) * 2 * Math.PI;
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);

        icon.style.transform = `translate(${x}px, ${y}px)`;
      });

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="container px-4 md:px-6 mx-auto">
        {/* Main Content */}
        <main className="py-12 md:py-24 lg:py-32">
          {/* Hero Section */}
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="flex flex-col gap-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
                Transforming Ideas into <span className="text-blue-500">Digital Reality</span>
              </h1>
              <p className="text-lg text-slate-600 max-w-[600px]">
                GFirst delivers cutting-edge technology solutions that help businesses innovate, scale, and succeed in
                the digital landscape.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-md font-medium flex items-center">
                  Explore Our Services
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-2 h-4 w-4"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </button>
                <button className="px-6 py-3 border border-slate-200 hover:bg-slate-50 rounded-md font-medium">
                  Contact Us
                </button>
              </div>
            </div>
            <div className="relative flex items-center justify-center">
              <div className="absolute w-72 h-72 md:w-96 md:h-96 bg-blue-200/30 rounded-full blur-3xl"></div>

              {/* Tech Ring */}
              <div className="relative w-80 h-80 md:w-96 md:h-96 flex items-center justify-center z-10">
                {/* Center circle with glow effect */}
                <div className="absolute w-24 h-24 rounded-full bg-blue-500/20 backdrop-blur-md flex items-center justify-center z-10">
                  <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-bold">
                  <img
                          src={logo || "/placeholder.svg"}
                          alt={logo}
                          className="w-full h-full object-contain p-1"
                        />
                  </div>
                </div>

                {/* Outer ring */}
                <div className="absolute w-full h-full rounded-full border-2 border-blue-200/50"></div>

                {/* Tech icons container */}
                <div ref={containerRef} className="absolute w-full h-full">
                  {TECH_STACK.map((tech) => (
                    <div
                      key={tech.name}
                      className="tech-icon absolute top-1/2 left-1/2 w-14 h-14 -ml-7 -mt-7  rounded-full shadow-lg flex items-center justify-center transition-transform duration-300"
                    >
                      <div className="relative w-10 h-10">
                        <img
                          src={tech.icon || "/placeholder.svg"}
                          alt={tech.name}
                          className="w-full h-full object-contain p-1"
                        />
                      </div>
                      <div className="absolute -bottom-6 whitespace-nowrap text-xs font-medium  px-2 py-0.5 rounded-full shadow-sm">
                        {tech.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="py-12 border-t border-slate-200">
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
              G
            </div>
            <span className="text-xl font-bold">GFirst</span>
          </div>
          <div className="flex flex-wrap justify-center gap-8 mb-8">
            <a href="#" className="text-sm font-medium hover:text-blue-500">
              Services
            </a>
            <a href="#" className="text-sm font-medium hover:text-blue-500">
              About Us
            </a>
            <a href="#" className="text-sm font-medium hover:text-blue-500">
              Our Work
            </a>
            <a href="#" className="text-sm font-medium hover:text-blue-500">
              Blog
            </a>
            <a href="#" className="text-sm font-medium hover:text-blue-500">
              Contact
            </a>
          </div>
          <div className="flex justify-center gap-6 mb-8">
            {/* Social Media Icons */}
          </div>
          <div className="text-center text-sm text-slate-600">
            <p>© {new Date().getFullYear()} GFirst. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default First;

"use client"
import Slider from "react-slick"
import React from "react"
import { Link } from "react-router-dom"
function PartnersSlider() {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 0,
    cssEase: "linear",
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  }


  const projects = [
    { title: 'Numazu', image: 'https://via.placeholder.com/120x48?text=Numazu' },
    { title: 'Trailblazers', image: 'https://via.placeholder.com/120x48?text=Trailblazers' },
    { title: 'Apple Day', image: 'https://via.placeholder.com/120x48?text=Apple+Day' },
  ];

  return (
    <div className="w-full bg-[#F5FAFF] py-16 md:py-24 relative overflow-hidden">
      {/* Decorative elements with low opacity */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(#26a8df 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block relative">
            <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-[#26a8df]/20 animate-pulse-slow"></div>
            <div className="absolute -bottom-4 -right-4 w-8 h-8 rounded-full bg-[#26a8df]/20 animate-pulse-slow"></div>
            <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-linear-to-r from-[#26a8df] to-[#26a8df]">
              Our Trusted Partners
            </h2>
          </div>
          <p className="mt-4 text-lg text-[#26a8df]/80 max-w-2xl mx-auto">
            We collaborate with industry leaders to deliver exceptional solutions for our clients.
          </p>
        </div>

        {/* Slider container with gradient edges */}
        <div className="relative">
          {/* Left gradient fade */}
          <div className="absolute left-0 top-0 bottom-0 w-16 z-10 bg-linear-to-r from-[#F5FAFF] to-transparent pointer-events-none"></div>

          {/* Slider */}
          <div className="slider-container py-8">
            <Slider {...settings}>
              {projects.map((project, index) => (
                <div key={index} className="px-6">
                  <div className="h-24 flex items-center justify-center bg-white/70 backdrop-blur-sm rounded-xl p-4 mx-2 shadow-sm hover:shadow-md transition-all duration-300 border border-[#26a8df]/10">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={`${project.title} logo`}
                      className="max-h-12 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                      onError={(e) => {
                        const target = e.target
                        target.src = "/placeholder.svg?height=48&width=120"
                      }}
                    />
                  </div>
                </div>
              ))}
            </Slider>
          </div>

          {/* Right gradient fade */}
          <div className="absolute right-0 top-0 bottom-0 w-16 z-10 bg-linear-to-l from-[#F5FAFF] to-transparent pointer-events-none"></div>
        </div>


      </div>
    </div>
  )
}

export default PartnersSlider


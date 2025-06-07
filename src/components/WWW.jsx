"use client"
import Slider from "react-slick"
// Import slick-carousel styles
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import React from "react"
import { Link } from "react-router-dom"
import numazu from "../assets/numazu.png"
import razes from "../assets/Razes.png"
import samiksha from "../assets/samiksha.png"
import surat from "../assets/surat.png"
import epasaley from "../assets/epasaley.png"
import trailblazers from "../assets/trailblazers.png"
import appleday from "../assets/appleday.png"
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

const companies = [
  { name: "numaju", logo: numazu },
  { name: "Razes Art", logo: razes },
  { name: "Samiksha", logo: samiksha },
  { name: "Surat", logo: surat },
  { name: "epasaley", logo: epasaley },
  { name: "trailblazers", logo: trailblazers },
  { name: "appleday", logo: appleday },

]

  return (
    <div className="w-full bg-[#F5FAFF] py-16 md:py-24 relative overflow-hidden">
      {/* Decorative elements with low opacity */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(#4A8EBC 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block relative">
            <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-[#4A8EBC]/20 animate-pulse-slow"></div>
            <div className="absolute -bottom-4 -right-4 w-8 h-8 rounded-full bg-[#3B5488]/20 animate-pulse-slow"></div>
            <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#1A2A44] to-[#4A8EBC]">
              Our Trusted Partners
            </h2>
          </div>
          <p className="mt-4 text-lg text-[#2B4066]/80 max-w-2xl mx-auto">
            We collaborate with industry leaders to deliver exceptional solutions for our clients.
          </p>
        </div>

        {/* Slider container with gradient edges */}
        <div className="relative">
          {/* Left gradient fade */}
          <div className="absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-[#F5FAFF] to-transparent pointer-events-none"></div>

          {/* Slider */}
          <div className="slider-container py-8">
            <Slider {...settings}>
              {companies.map((company, index) => (
                <div key={index} className="px-6">
                  <div className="h-24 flex items-center justify-center bg-white/70 backdrop-blur-sm rounded-xl p-4 mx-2 shadow-sm hover:shadow-md transition-all duration-300 border border-[#4A8EBC]/10">
                    <img
                      src={company.logo || "/placeholder.svg"}
                      alt={`${company.name} logo`}
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
          <div className="absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-[#F5FAFF] to-transparent pointer-events-none"></div>
        </div>


      </div>
    </div>
  )
}

export default PartnersSlider


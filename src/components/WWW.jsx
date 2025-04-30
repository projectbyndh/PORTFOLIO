"use client"
import Slider from "react-slick"
// Import slick-carousel styles
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
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

  const companies = [
    { name: "Google", logo: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png" },
    { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" },
    { name: "Apple", logo: "https://www.apple.com/ac/structured-data/images/knowledge_graph_logo.png" },
    { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
    { name: "Facebook", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Facebook_New_Logo_%282015%29.svg" },
    { name: "Twitter", logo: "https://upload.wikimedia.org/wikipedia/commons/9/95/Twitter_new_X_logo.png" },
    { name: "Netflix", logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" },
    { name: "Tesla", logo: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg" },
    { name: "IBM", logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" },
    { name: "Adobe", logo: "https://upload.wikimedia.org/wikipedia/commons/6/66/Adobe_Corporate_logo.svg" },
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

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-lg text-[#2B4066]/80 mb-6 max-w-2xl mx-auto">
            Join our growing network of industry-leading partners and collaborate with us.
          </p>
          <button className="px-8 py-4 bg-white text-[#4A8EBC] font-bold rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg border-2 border-[#4A8EBC] hover:bg-gradient-to-r hover:from-[#3B5488] hover:to-[#4A8EBC] hover:text-white">
            <Link to='/contact'>
            Become a Partner
            </Link>
          </button>
        </div>
      </div>
    </div>
  )
}

export default PartnersSlider


"use client"
import React from "react"
import { useState, useEffect, useRef } from "react"
import {
  Globe,
  Smartphone,
  Layout,
  Share2,
  Search,
  Palette,
  Database,
  Code,
  Server,
  Shield,
  Cloud,
  Cpu,
  Wifi,
  ChevronLeft,
  ChevronRight,
  Star,
} from "lucide-react"

// Using placeholder images until actual assets are available
const placeholderImage = "/placeholder.svg?height=100&width=100"
const logoPlaceholder = "/placeholder.svg?height=200&width=200"

// Tech stack data
const TECH_STACK = [
  { name: "Android Development", icon: placeholderImage },
  { name: "Wordpress", icon: placeholderImage },
  { name: "IOS Development", icon: placeholderImage },
  { name: "Graphics", icon: placeholderImage },
  { name: "Digital Marketing", icon: placeholderImage },
  { name: "Web Development", icon: placeholderImage },
]

// Testimonial data
const testimonials = [
  {
    id: 1,
    name: "TrailBlazers",
    position: "CTO, TechSolutions Inc.",
    image: "/placeholder.svg?height=100&width=100",
    text: "Working with this team has transformed our digital infrastructure. Their expertise in cloud solutions saved us countless hours and resources.",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    position: "Product Manager, InnovateTech",
    image: "/placeholder.svg?height=100&width=100",
    text: "The cybersecurity services provided exceeded our expectations. We now have peace of mind knowing our data is protected by the best in the industry.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    position: "CEO, DataDrive Systems",
    image: "/placeholder.svg?height=100&width=100",
    text: "Their software development team delivered our project ahead of schedule and with exceptional quality. The attention to detail was impressive.",
    rating: 4,
  },
  {
    id: 4,
    name: "David Wilson",
    position: "IT Director, Global Enterprises",
    image: "/placeholder.svg?height=100&width=100",
    text: "The managed IT services have been a game-changer for our organization. Response times are quick and the technical knowledge is outstanding.",
    rating: 5,
  },
]

// Service Item Component
function ServiceItem({ icon, title, description }) {
  return (
    <div className="group">
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-4">{icon}</div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800 group-hover:text-inherit transition-colors duration-300">
            {title}
          </h3>
          <p className="mt-1 text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  )
}

export default function NepaliTechCompany() {
  // First section refs and state
  const containerRef = useRef(null)

  // Services section state
  const [animatedItems, setAnimatedItems] = useState([])

  // Testimonials section state
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const autoPlayRef = useRef(null)

  // First section effect - Tech stack rotation
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const icons = container.querySelectorAll(".tech-icon")
    const radius = 140
    const totalIcons = icons.length

    // Position icons in a circle
    icons.forEach((icon, index) => {
      const angle = (index / totalIcons) * 2 * Math.PI
      const x = radius * Math.cos(angle)
      const y = radius * Math.sin(angle)

      icon.style.transform = `translate(${x}px, ${y}px)`
    })

    // Animation
    let rotation = 0
    const animate = () => {
      rotation += 0.002

      icons.forEach((icon, index) => {
        const angle = rotation + (index / totalIcons) * 2 * Math.PI
        const x = radius * Math.cos(angle)
        const y = radius * Math.sin(angle)

        icon.style.transform = `translate(${x}px, ${y}px)`
      })

      requestAnimationFrame(animate)
    }

    const animationId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [])

  // Services section effect - Intersection observer for animations
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

  // Testimonials section functions
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  // Pause auto-play on hover
  const pauseAutoPlay = () => {
    setIsAutoPlaying(false)
  }

  // Resume auto-play when not hovering
  const resumeAutoPlay = () => {
    setIsAutoPlaying(true)
  }

  // Auto-play functionality for testimonials
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = window.setInterval(() => {
        nextSlide()
      }, 5000) // Change slide every 5 seconds
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [isAutoPlaying, currentIndex])

  // Helper function for services section
  const isAnimated = (id) => animatedItems.includes(id)

  return (
    <div className="bg-white">
      {/* ===== HERO SECTION ===== */}
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 relative overflow-hidden">
        {/* Nepali flag-inspired background elements */}
        <div className="absolute inset-0 z-0">
          {/* Triangular shapes inspired by Nepali flag */}
          <div className="absolute top-0 left-0 w-0 h-0 border-t-[100vh] border-t-blue-700/10 border-r-[50vw] border-r-transparent"></div>
          <div className="absolute top-0 right-0 w-0 h-0 border-t-[100vh] border-t-blue-700/10 border-l-[50vw] border-l-transparent"></div>

          {/* Decorative elements inspired by Nepali patterns */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-600/20 rounded-full blur-2xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-700/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-blue-600/20 rounded-full blur-xl"></div>

          {/* Mandala-inspired decorative elements */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 border-2 border-red-700/5 rounded-full"></div>
          <div className="absolute top-1/4 left-1/4 w-48 h-48 border-2 border-blue-600/5 rounded-full"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 border-2 border-red-700/5 rounded-full"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 border-2 border-blue-600/5 rounded-full"></div>
        </div>

        <div className="container px-4 md:px-6 mx-auto relative z-10">
          {/* Main Content */}
          <main className="py-12 md:py-24 lg:py-32">
            {/* Hero Section */}
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="flex flex-col gap-6">
                <div className="inline-block">
                  <span className="text-sm font-medium px-4 py-1.5 bg-gradient-to-r from-red-700 to-red-600 text-white rounded-full mb-2 inline-block shadow-lg shadow-red-700/20">
                    नेपाली प्रविधि समाधान
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
                  Transforming Ideas into{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-700 to-red-500">
                    Digital Reality
                  </span>
                </h1>
                <p className="text-lg text-slate-600 max-w-[600px]">
                  GFirst delivers cutting-edge technology solutions that help businesses innovate, scale, and succeed in
                  the digital landscape with a unique Nepali perspective.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="group px-6 py-3.5 bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 text-white rounded-md font-medium flex items-center shadow-lg shadow-red-700/20 transition-all hover:translate-y-[-2px]">
                    <span>Explore Our Services</span>
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
                      className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </button>
                  <button className="px-6 py-3.5 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 rounded-md font-medium transition-all hover:translate-y-[-2px] hover:shadow-md">
                    Contact Us
                  </button>
                </div>

                {/* Nepali-inspired decorative element */}
                <div className="mt-8 flex items-center gap-2 text-slate-500">
                  <div className="h-px bg-gradient-to-r from-red-700/20 to-transparent flex-grow max-w-[80px]"></div>
                  <span className="text-sm">Proudly Nepali</span>
                  <div className="h-px bg-gradient-to-l from-blue-600/20 to-transparent flex-grow max-w-[80px]"></div>
                </div>
              </div>

              <div className="relative flex items-center justify-center">
                {/* Glowing background effect */}
                <div className="absolute w-96 h-96 md:w-96 md:h-96 bg-gradient-to-br from-red-700/20 to-blue-600/20 rounded-full blur-3xl"></div>

                {/* Nepali flag-inspired decorative elements */}
                <div className="absolute w-full h-full">
                  <div className="absolute top-0 left-1/4 w-16 h-16 bg-blue-600/30 rounded-full"></div>
                  <div className="absolute bottom-0 right-1/4 w-16 h-16 bg-blue-600/30 rounded-full"></div>
                </div>

                {/* Tech Ring */}
                <div className="relative w-3/4 h-3/4 md:w-96 md:h-96 flex items-center justify-center z-10">
                  {/* Animated outer rings */}
                  <div className="absolute w-full h-full rounded-full border-2 border-blue-600/30"></div>
                  <div className="absolute w-[90%] h-[90%] rounded-full border-2 border-red-700/20"></div>

                  {/* Center circle with glow effect */}
                  <div className="absolute w-28 h-28 rounded-full bg-gradient-to-br from-red-700/30 to-blue-600/30 backdrop-blur-md flex items-center justify-center z-10 border-2 border-white/50 shadow-xl">
                    <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                      <img
                        src={logoPlaceholder || "/placeholder.svg"}
                        alt="Logo"
                        className="w-full h-full object-contain p-1"
                      />
                    </div>
                  </div>

                  {/* Tech icons container */}
                  <div ref={containerRef} className="absolute w-full h-full">
                    {TECH_STACK.map((tech) => (
                      <div
                        key={tech.name}
                        className="tech-icon absolute top-1/2 left-1/2 w-16 h-16 -ml-8 -mt-8 bg-white/90 rounded-full shadow-lg flex items-center justify-center transition-transform duration-300 border border-red-700/20 hover:border-red-700/50 cursor-pointer hover:scale-110"
                      >
                        <div className="relative w-10 h-10">
                          <img
                            src={tech.icon || "/placeholder.svg"}
                            alt={tech.name}
                            className="w-full h-full object-contain p-1"
                          />
                        </div>
                        <div className="absolute -bottom-8 whitespace-nowrap text-xs font-medium bg-white/90 px-3 py-1 rounded-full shadow-md border border-red-700/10 opacity-0 group-hover:opacity-100 transition-opacity">
                          {tech.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Nepali-themed decorative element */}
            <div className="mt-20 py-10 px-8 bg-gradient-to-r from-red-700/10 via-white/80 to-blue-600/10 rounded-xl backdrop-blur-sm border border-white/40 shadow-xl relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-700 via-transparent to-blue-600"></div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-transparent to-red-700"></div>
              <div className="absolute -top-6 -left-6 w-12 h-12 border-2 border-red-700/20 rounded-full"></div>
              <div className="absolute -bottom-6 -right-6 w-12 h-12 border-2 border-blue-600/20 rounded-full"></div>

              <h2 className="text-3xl font-bold text-center mb-6 relative">
                <span className="relative">
                  Proudly <span className="text-red-700">Nepali</span>, Globally{" "}
                  <span className="text-blue-600">Connected</span>
                  <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-red-700/50 to-blue-600/50"></div>
                </span>
              </h2>
              <p className="text-center text-slate-600 max-w-2xl mx-auto text-lg">
                We combine traditional Nepali values with cutting-edge technology to deliver solutions that resonate
                with both local and global audiences.
              </p>

              {/* Feature highlights */}
              <div className="grid md:grid-cols-3 gap-6 mt-10">
                {[
                  { title: "Innovation", description: "Pushing boundaries with creative solutions" },
                  { title: "Excellence", description: "Delivering quality in every project" },
                  { title: "Heritage", description: "Inspired by rich Nepali traditions" },
                ].map((feature) => (
                  <div
                    key={feature.title}
                    className="bg-white/60 p-6 rounded-lg border border-red-700/10 shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
                  >
                    <h3 className="text-xl font-semibold mb-2 text-red-700">{feature.title}</h3>
                    <p className="text-slate-600">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* ===== SERVICES SECTION ===== */}
      <div className="w-full bg-white relative overflow-hidden">
        {/* Nepali-themed background elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Triangular shapes inspired by Nepali flag */}
          <div className="absolute top-0 left-0 w-0 h-0 border-t-[50vh] border-t-red-700/5 border-r-[50vw] border-r-transparent"></div>
          <div className="absolute bottom-0 right-0 w-0 h-0 border-b-[50vh] border-b-blue-600/5 border-l-[50vw] border-l-transparent"></div>

          {/* Decorative elements */}
          <div className="absolute top-1/4 right-10 w-64 h-64 border-2 border-red-700/5 rounded-full"></div>
          <div className="absolute bottom-1/4 left-10 w-48 h-48 border-2 border-blue-600/5 rounded-full"></div>
        </div>

        {/* Header Section */}
        <div className="w-full bg-gradient-to-b from-red-50 to-white py-16 px-4 sm:px-6 lg:px-8 relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-700 via-transparent to-blue-600"></div>
          <div className="max-w-7xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-red-700 to-red-600 text-white rounded-full mb-4 text-sm font-medium shadow-md">
              हाम्रो सेवाहरू
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our Expertise, <span className="text-red-700">Your Success.</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We deliver cutting-edge digital solutions tailored to your business needs, helping you stay ahead in
              today's competitive landscape.
            </p>
          </div>
        </div>

        {/* Services Categories */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Digital Presence & Development */}
            <div
              id="category-1"
              className={`animate-on-scroll rounded-xl p-8 border border-gray-100 shadow-lg transition-all duration-500 hover:shadow-xl hover:border-red-200 bg-gradient-to-br from-white to-red-50 group ${
                isAnimated(1) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center mb-6 shadow-lg shadow-red-700/20 group-hover:scale-110 transition-transform">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-red-200 pb-2 group-hover:text-red-700 transition-colors">
                Digital Presence & Development
              </h2>
              <div className="space-y-6">
                <ServiceItem
                  icon={<Code className="h-6 w-6 text-red-600" />}
                  title="Custom Web Solutions"
                  description="From e-commerce platforms to dynamic web applications, we build websites that perform."
                />
                <ServiceItem
                  icon={<Smartphone className="h-6 w-6 text-red-600" />}
                  title="Mobile App Innovation"
                  description="Cross-platform apps designed for seamless user experiences."
                />
                <ServiceItem
                  icon={<Layout className="h-6 w-6 text-red-600" />}
                  title="WordPress Mastery"
                  description="Tailored WordPress solutions for businesses of all sizes."
                />
              </div>
            </div>

            {/* Digital Marketing & Branding */}
            <div
              id="category-2"
              className={`animate-on-scroll rounded-xl p-8 border border-gray-100 shadow-lg transition-all duration-700 hover:shadow-xl hover:border-blue-200 bg-gradient-to-br from-white to-blue-50 group ${
                isAnimated(2) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-6 shadow-lg shadow-blue-600/20 group-hover:scale-110 transition-transform">
                <Share2 className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-200 pb-2 group-hover:text-blue-600 transition-colors">
                Digital Marketing & Branding
              </h2>
              <div className="space-y-6">
                <ServiceItem
                  icon={<Share2 className="h-6 w-6 text-blue-600" />}
                  title="Strategic Social Media"
                  description="Engaging content and targeted campaigns that build your brand."
                />
                <ServiceItem
                  icon={<Search className="h-6 w-6 text-blue-600" />}
                  title="SEO Excellence"
                  description="Improving your online visibility and driving organic traffic."
                />
                <ServiceItem
                  icon={<Palette className="h-6 w-6 text-blue-600" />}
                  title="Visual Branding"
                  description="Creating compelling visuals that resonate with your audience."
                />
              </div>
            </div>

            {/* IT Support & Consulting */}
            <div
              id="category-3"
              className={`animate-on-scroll rounded-xl p-8 border border-gray-100 shadow-lg transition-all duration-900 hover:shadow-xl hover:border-red-200 bg-gradient-to-br from-white to-red-50 group ${
                isAnimated(3) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center mb-6 shadow-lg shadow-red-700/20 group-hover:scale-110 transition-transform">
                <Server className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-red-200 pb-2 group-hover:text-red-700 transition-colors">
                IT Support & Consulting
              </h2>
              <div className="space-y-6">
                <ServiceItem
                  icon={<Database className="h-6 w-6 text-red-600" />}
                  title="Database Solutions"
                  description="Robust database management and optimization."
                />
                <ServiceItem
                  icon={<Shield className="h-6 w-6 text-red-600" />}
                  title="Cybersecurity"
                  description="Protecting your digital assets with advanced security measures."
                />
                <ServiceItem
                  icon={<Cloud className="h-6 w-6 text-red-600" />}
                  title="Cloud Infrastructure"
                  description="Scalable cloud solutions for modern businesses."
                />
              </div>
            </div>
          </div>

          {/* Additional Services Section */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div
              id="category-5"
              className={`animate-on-scroll rounded-xl p-8 border border-gray-100 shadow-lg transition-all duration-1100 hover:shadow-xl hover:border-blue-200 bg-gradient-to-br from-white to-blue-50 ${
                isAnimated(5) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-blue-200 pb-2 flex items-center">
                <Cpu className="h-6 w-6 text-blue-600 mr-2" />
                <span>Hardware Solutions</span>
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <span className="text-blue-600 text-sm font-bold">✓</span>
                  </div>
                  <p className="text-gray-600">Network infrastructure setup and maintenance</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <span className="text-blue-600 text-sm font-bold">✓</span>
                  </div>
                  <p className="text-gray-600">Server deployment and configuration</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <span className="text-blue-600 text-sm font-bold">✓</span>
                  </div>
                  <p className="text-gray-600">Workstation setup and optimization</p>
                </li>
              </ul>
            </div>

            <div
              id="category-6"
              className={`animate-on-scroll rounded-xl p-8 border border-gray-100 shadow-lg transition-all duration-1200 hover:shadow-xl hover:border-red-200 bg-gradient-to-br from-white to-red-50 ${
                isAnimated(6) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-red-200 pb-2 flex items-center">
                <Wifi className="h-6 w-6 text-red-600 mr-2" />
                <span>Connectivity Solutions</span>
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-red-100 flex items-center justify-center mr-3">
                    <span className="text-red-600 text-sm font-bold">✓</span>
                  </div>
                  <p className="text-gray-600">High-speed internet solutions for businesses</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-red-100 flex items-center justify-center mr-3">
                    <span className="text-red-600 text-sm font-bold">✓</span>
                  </div>
                  <p className="text-gray-600">Secure VPN implementation</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-red-100 flex items-center justify-center mr-3">
                    <span className="text-red-600 text-sm font-bold">✓</span>
                  </div>
                  <p className="text-gray-600">Wireless network optimization</p>
                </li>
              </ul>
            </div>
          </div>

          {/* CTA Section */}
          <div
            id="category-4"
            className={`animate-on-scroll mt-16 text-center transition-all duration-1000 ${
              isAnimated(4) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <button className="px-8 py-4 bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 text-white font-bold rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-red-700/20">
              See All Services
            </button>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="w-full bg-gradient-to-t from-blue-100 to-white py-16 px-4 sm:px-6 lg:px-8 mt-16 relative">
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-transparent to-red-700"></div>
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Ready to transform your digital presence?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
              Let's discuss how our services can help your business grow and succeed in the digital landscape.
            </p>
            <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold rounded-full border-2 border-white shadow-lg shadow-blue-600/20 transition-all duration-300 hover:scale-105">
              Contact Us Today
            </button>
          </div>
        </div>
      </div>

      {/* ===== TESTIMONIALS SECTION ===== */}
      <div
        className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
        onMouseEnter={pauseAutoPlay}
        onMouseLeave={resumeAutoPlay}
      >
        {/* Nepali-themed background elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Triangular shapes inspired by Nepali flag */}
          <div className="absolute top-0 right-0 w-0 h-0 border-t-[30vh] border-t-red-700/5 border-l-[30vw] border-l-transparent"></div>
          <div className="absolute bottom-0 left-0 w-0 h-0 border-b-[30vh] border-b-blue-600/5 border-r-[30vw] border-r-transparent"></div>

          {/* Decorative elements */}
          <div className="absolute top-1/4 left-10 w-64 h-64 border-2 border-red-700/5 rounded-full"></div>
          <div className="absolute bottom-1/4 right-10 w-48 h-48 border-2 border-blue-600/5 rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-full mb-4 text-sm font-medium shadow-md">
              ग्राहक प्रतिक्रिया
            </span>
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-2">What Our Clients Say</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-red-700 to-blue-600 mx-auto rounded-full"></div>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from our satisfied clients about their experience working with our team.
            </p>
          </div>

          {/* Testimonial Slider */}
          <div className="relative max-w-4xl mx-auto">
            {/* Main Testimonial */}
            <div
              className="bg-gradient-to-r from-red-50 to-blue-50 rounded-2xl shadow-lg p-8 transition-all duration-500 ease-in-out relative overflow-hidden"
              style={{ minHeight: "300px" }}
            >
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-700/50 via-transparent to-blue-600/50"></div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600/50 via-transparent to-red-700/50"></div>
              <div className="absolute -top-6 -left-6 w-12 h-12 border-2 border-red-700/10 rounded-full"></div>
              <div className="absolute -bottom-6 -right-6 w-12 h-12 border-2 border-blue-600/10 rounded-full"></div>

              <div className="flex flex-col md:flex-row items-center">
                <div className="mb-6 md:mb-0 md:mr-8 flex-shrink-0">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md mx-auto relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-700/20 to-blue-600/20 rounded-full"></div>
                    <img
                      src={testimonials[currentIndex].image || "/placeholder.svg"}
                      alt={testimonials[currentIndex].name}
                      className="w-full h-full object-cover relative z-10"
                    />
                  </div>

                  {/* Star Rating */}
                  <div className="flex justify-center mt-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < testimonials[currentIndex].rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="relative">
                    <svg
                      className="absolute -top-6 -left-6 w-12 h-12 text-red-300 opacity-50"
                      fill="currentColor"
                      viewBox="0 0 32 32"
                      aria-hidden="true"
                    >
                      <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                    </svg>
                    <p className="text-gray-700 text-lg italic leading-relaxed mb-4">
                      {testimonials[currentIndex].text}
                    </p>
                    <div className="mt-4">
                      <h4 className="font-bold text-gray-900 text-xl">{testimonials[currentIndex].name}</h4>
                      <p className="text-blue-600 italic">{testimonials[currentIndex].position}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 bg-white rounded-full p-2 shadow-lg text-red-600 hover:text-red-800 focus:outline-none transition-colors duration-300 z-10 hover:bg-red-50"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 bg-white rounded-full p-2 shadow-lg text-blue-600 hover:text-blue-800 focus:outline-none transition-colors duration-300 z-10 hover:bg-blue-50"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Dots Navigation */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full focus:outline-none transition-colors duration-300 ${
                    index === currentIndex
                      ? "bg-gradient-to-r from-red-700 to-blue-600"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Additional Testimonials Preview */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials
              .filter((_, idx) => idx !== currentIndex)
              .slice(0, 3)
              .map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-blue-100 cursor-pointer"
                  onClick={() => goToSlide(testimonials.findIndex((t) => t.id === testimonial.id))}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-gray-100">
                      <img
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">{testimonial.position}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm line-clamp-3">{testimonial.text}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}


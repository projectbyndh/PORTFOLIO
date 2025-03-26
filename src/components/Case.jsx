"use client"

import { useState, useEffect } from "react"
import { ArrowRight, Filter } from "lucide-react"
import React from "react"
import Footer from "./Footer"

export default function CaseStudies() {
  const [animatedItems, setAnimatedItems] = useState([])
  const [activeFilter, setActiveFilter] = useState("all")

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

  // Case studies data
  const caseStudies = [
    {
      id: 1,
      title: "E-commerce Platform Redesign",
      client: "Mountain Crafts Nepal",
      category: "web-development",
      tags: ["E-commerce", "UI/UX", "Web Development"],
      image: "/images/case-study-1.jpg",
      description:
        "Complete redesign and development of an e-commerce platform, resulting in a 45% increase in conversion rate and 60% improvement in page load speed.",
      results: [
        "45% increase in conversion rate",
        "60% improvement in page load speed",
        "32% reduction in cart abandonment",
      ],
    },
    {
      id: 2,
      title: "Mobile Banking Application",
      client: "Himalayan Trust Bank",
      category: "mobile-app",
      tags: ["Mobile App", "Fintech", "UX Design"],
      image: "/images/case-study-2.jpg",
      description:
        "Developed a secure, user-friendly mobile banking application with biometric authentication, real-time notifications, and seamless transaction processing.",
      results: [
        "200,000+ downloads in first quarter",
        "4.8/5 average user rating",
        "85% reduction in branch visits for basic transactions",
      ],
    },
    {
      id: 3,
      title: "Digital Marketing Campaign",
      client: "Nepal Tourism Board",
      category: "digital-marketing",
      tags: ["Digital Marketing", "SEO", "Social Media"],
      image: "/images/case-study-3.jpg",
      description:
        "Comprehensive digital marketing strategy to promote tourism in Nepal, including SEO optimization, content marketing, and targeted social media campaigns.",
      results: [
        "320% increase in website traffic",
        "15M+ social media impressions",
        "42% growth in international bookings",
      ],
    },
    {
      id: 4,
      title: "Enterprise Resource Planning System",
      client: "Everest Manufacturing",
      category: "software",
      tags: ["ERP", "Software Development", "Process Automation"],
      image: "/images/case-study-4.jpg",
      description:
        "Custom ERP solution integrating inventory management, production planning, HR, and financial operations into a unified platform.",
      results: [
        "35% improvement in operational efficiency",
        "28% reduction in inventory costs",
        "Real-time visibility across all departments",
      ],
    },
    {
      id: 5,
      title: "Healthcare Management System",
      client: "Kathmandu Medical Center",
      category: "software",
      tags: ["Healthcare", "Software Development", "UX Design"],
      image: "/images/case-study-5.jpg",
      description:
        "Comprehensive healthcare management system with electronic medical records, appointment scheduling, and billing integration.",
      results: [
        "50% reduction in administrative workload",
        "99.9% data security compliance",
        "Improved patient satisfaction scores by 40%",
      ],
    },
    {
      id: 6,
      title: "Restaurant Ordering App",
      client: "Taste of Himalayas",
      category: "mobile-app",
      tags: ["Mobile App", "Food & Beverage", "UI Design"],
      image: "/images/case-study-6.jpg",
      description:
        "Mobile application for table reservations, online ordering, and loyalty program management for a chain of restaurants.",
      results: [
        "25% increase in average order value",
        "30% growth in repeat customers",
        "Reduced order processing time by 65%",
      ],
    },
  ]

  const filteredCaseStudies =
    activeFilter === "all" ? caseStudies : caseStudies.filter((study) => study.category === activeFilter)

  const categories = [
    { id: "all", name: "All Projects" },
    { id: "web-development", name: "Web Development" },
    { id: "mobile-app", name: "Mobile Apps" },
    { id: "digital-marketing", name: "Digital Marketing" },
    { id: "software", name: "Software Solutions" },
  ]

  return (
    <div className="w-full bg-[#F5FAFF] relative overflow-hidden">
      {/* Decorative elements with low opacity */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Circles */}
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-[#4A8EBC]/5 animate-pulse-slow"></div>
        <div className="absolute bottom-40 right-10 w-96 h-96 rounded-full bg-[#3B5488]/5 animate-pulse-slow"></div>

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(#4A8EBC 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
          }}
        ></div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-block relative">
              <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-[#4A8EBC]/20 animate-pulse-slow"></div>
              <div className="absolute -bottom-4 -right-4 w-8 h-8 rounded-full bg-[#3B5488]/20 animate-pulse-slow"></div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#1A2A44] to-[#4A8EBC]">
                Case Studies
              </h1>
            </div>
            <p className="mt-4 text-lg text-[#2B4066]/80 max-w-2xl mx-auto">
              Explore our portfolio of successful projects and digital transformations.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center justify-center mb-8">
            <Filter className="text-[#4A8EBC] mr-2" size={20} />
            <span className="text-[#1A2A44] font-medium mr-6">Filter by:</span>
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveFilter(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeFilter === category.id
                      ? "bg-gradient-to-r from-[#3B5488] to-[#4A8EBC] text-white shadow-md"
                      : "bg-white text-[#2B4066] hover:bg-[#E0F0FF] border border-[#4A8EBC]/20"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-8 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCaseStudies.map((study, index) => (
              <div
                key={study.id}
                id={`case-${study.id}`}
                className={`animate-on-scroll bg-white/70 backdrop-blur-sm rounded-xl overflow-hidden shadow-md border border-[#4A8EBC]/10 hover:shadow-xl transition-all duration-500 group ${
                  isAnimated(study.id) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={study.image || `/placeholder.svg?height=300&width=500`}
                    alt={study.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      const target = e.target 
                      target.src = "/placeholder.svg?height=300&width=500"
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A2A44]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4 flex flex-wrap gap-2 transition-all duration-300 opacity-0 group-hover:opacity-100">
                    {study.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-[#4A8EBC]/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-[#1A2A44] group-hover:text-[#4A8EBC] transition-colors duration-300">
                      {study.title}
                    </h3>
                  </div>
                  <p className="text-[#4A8EBC] text-sm mb-4">Client: {study.client}</p>
                  <p className="text-[#2B4066]/80 text-sm mb-6 line-clamp-3">{study.description}</p>
                  <div className="space-y-2 mb-6">
                    {study.results.slice(0, 2).map((result, i) => (
                      <div key={i} className="flex items-start">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#4A8EBC] mt-1.5 mr-2"></div>
                        <p className="text-[#2B4066] text-sm">{result}</p>
                      </div>
                    ))}
                  </div>
                  <a
                    href={`/case-studies/${study.id}`}
                    className="inline-flex items-center text-[#4A8EBC] font-semibold hover:text-[#3B5488] transition-colors duration-300 group/link"
                  >
                    View case study{" "}
                    <ArrowRight
                      className="ml-2 group-hover/link:translate-x-1 transition-transform duration-300"
                      size={18}
                    />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {filteredCaseStudies.length === 0 && (
            <div className="text-center py-16">
              <p className="text-[#2B4066]/80 text-lg">No case studies found for this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Featured Case Study */}
      <section className="py-16 bg-gradient-to-b from-[#F5FAFF] to-[#E0F0FF] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div
            id="case-10"
            className={`animate-on-scroll transition-all duration-900 ${
              isAnimated(10) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#1A2A44] mb-4">Featured Project</h2>
              <p className="text-[#2B4066]/80 max-w-2xl mx-auto">
                An in-depth look at one of our most impactful digital transformations.
              </p>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg border border-[#4A8EBC]/10">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-80 lg:h-auto overflow-hidden">
                  <img
                    src="/images/featured-case-study.jpg"
                    alt="Featured Case Study"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target 
                      target.src = "/placeholder.svg?height=600&width=800"
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#1A2A44]/80 to-transparent lg:bg-gradient-to-t lg:from-[#1A2A44]/80 lg:via-transparent lg:to-transparent flex items-center justify-center lg:items-end lg:justify-start p-8">
                    <div>
                      <span className="bg-[#4A8EBC] text-white text-xs px-3 py-1 rounded-full">E-commerce</span>
                      <h3 className="text-2xl font-bold text-white mt-3 mb-1">Himalayan Handicrafts</h3>
                      <p className="text-white/80">Global E-commerce Expansion</p>
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <div className="space-y-6">
                    <p className="text-[#2B4066]/80">
                      Himalayan Handicrafts needed to expand their traditional artisan business to global markets. We
                      developed a comprehensive e-commerce solution with multi-currency support, localized content, and
                      an optimized supply chain management system.
                    </p>

                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-[#1A2A44]">Key Achievements:</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-[#E0F0FF]/50 rounded-lg p-4">
                          <div className="text-2xl font-bold text-[#4A8EBC]">320%</div>
                          <p className="text-[#2B4066]">Increase in international sales</p>
                        </div>
                        <div className="bg-[#E0F0FF]/50 rounded-lg p-4">
                          <div className="text-2xl font-bold text-[#4A8EBC]">15+</div>
                          <p className="text-[#2B4066]">New country markets</p>
                        </div>
                        <div className="bg-[#E0F0FF]/50 rounded-lg p-4">
                          <div className="text-2xl font-bold text-[#4A8EBC]">42%</div>
                          <p className="text-[#2B4066]">Reduction in operational costs</p>
                        </div>
                        <div className="bg-[#E0F0FF]/50 rounded-lg p-4">
                          <div className="text-2xl font-bold text-[#4A8EBC]">5x</div>
                          <p className="text-[#2B4066]">Return on investment</p>
                        </div>
                      </div>
                    </div>

                    <a
                      href="/case-studies/himalayan-handicrafts"
                      className="inline-flex items-center text-[#4A8EBC] font-semibold hover:text-[#3B5488] transition-colors duration-300 group"
                    >
                      Read full case study{" "}
                      <ArrowRight
                        className="ml-2 group-hover:translate-x-1 transition-transform duration-300"
                        size={18}
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div
            id="case-11"
            className={`bg-gradient-to-r from-[#1A2A44] to-[#3B5488] rounded-2xl p-12 text-center shadow-xl relative overflow-hidden animate-on-scroll transition-all duration-900 ${
              isAnimated(11) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
              <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white/5 animate-pulse-slow"></div>
              <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-white/5 animate-pulse-slow"></div>
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `radial-gradient(rgba(255,255,255,0.3) 1px, transparent 1px)`,
                  backgroundSize: "20px 20px",
                }}
              ></div>
            </div>

            <h2 className="text-3xl font-bold text-white mb-6 relative">Ready to Transform Your Business?</h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-8 relative">
              Let's discuss how Nepal Digital Heights can help you achieve your digital goals and create your own
              success story.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative">
              <a
                href="/contact"
                className="px-8 py-4 bg-white text-[#1A2A44] font-bold rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Start Your Project
              </a>
              <a
                href="/services"
                className="px-8 py-4 border-2 border-white text-white font-bold rounded-full text-lg hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
              >
                Explore Our Services
              </a>
            </div>
          </div>
        </div>
      </section>
      <Footer/>

    </div>
  )
}


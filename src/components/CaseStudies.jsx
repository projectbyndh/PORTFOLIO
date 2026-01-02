"use client"
import { useState } from "react"
import { ArrowRight, Sparkles, Code2, Smartphone, TrendingUp, GraduationCap, Heart, CheckCircle2, Globe, Server } from "lucide-react"
import React from "react"
import Logo from "./Logo"
import { Link } from "react-router-dom"
import numa from '../assets/numa.jpeg';
import dg from '../assets/dg.jpeg';
import rms2 from '../assets/rms2.jpeg';
import select from '../assets/select.jpeg';
import ep from '../assets/ep.jpeg';
const categories = [
  "All",
  "Web Applications",
  "Mobile Applications",
  "SaaS & ERP",
  "Digital Marketing",
  "Education & Institutions",
  "Healthcare",
]

const projects = [
  {
    name: "Numazu Halal Food",
    category: "Web Applications",
    categories: ["Web Applications", "Mobile Applications"],
    techStack: [".NET", "React", "Flutter"],
    description: "A cross-platform shopping ecosystem with high-performance backend, modern web UI, and seamless mobile commerce experience.",
    image: numa, // Professional food delivery admin/dashboard
  },
  {
    name: "Epasaley",
    category: "E-Commerces",
    categories: ["Web Applications", "e-Commerces"],
    techStack: ["Node.js", "React"],
    description: "Complete e-commerce platform featuring scalable architecture, multi-vendor support, and powerful admin dashboards.",
    image: ep, // Clean modern e-commerce dashboard
  },
  {
    name: "Siddhartha School & College",
    client: "Siddhartha School & Siddhartha International College",
    category: "Digital Marketing",
    categories: ["Digital Marketing", "Education & Institutions"],
    techStack: ["Digital Marketing", "Social Media", "Analytics"],
    description: "Comprehensive digital campaigns driving admission growth through targeted ads, event digitization, and funnel optimization.",
    image: dg, // Modern school management dashboard
    services: ["Social Media Campaigns", "Event Digitization", "Admission Funnel Optimization"],
  },
  {
    name: "Trailblazers Nepal",
    category: "Digital Marketing",
    categories: ["Digital Marketing"],
    techStack: ["Google Ads", "Meta Ads", "Analytics"],
    description: "High-impact adventure travel marketing campaigns with creative content, precise targeting, and measurable ROI.",
    image: "https://www.geckoboard.com/uploads/Digital-marketing-campaign-dashboard.png", // Professional marketing analytics dashboard
  },
  {
    name: "Resunga Polyclinic",
    category: "Healthcare",
    categories: ["Healthcare", "Web Applications"],
    techStack: ["Backend Systems", "Digital Infrastructure"],
    description: "Modern healthcare management system with patient portals, appointment scheduling, and secure data handling.",
    image: "https://cdn.dribbble.com/userupload/15369173/file/original-d9d779abf13c9cb42abf092076d035e4.png?resize=1200x900", // Clinic management dashboard
    services: ["Clinic Management System", "Patient Portal", "Digital Infrastructure"],
  },
  {
    name: "ERP & RMS Solutions",
    category: "SaaS & ERP",
    categories: ["SaaS & ERP"],
    techStack: ["Custom ERP", "RMS", "Cloud Infrastructure"],
    description: "Enterprise-grade ERP and Restaurant Management Systems for inventory, billing, staff scheduling, and real-time analytics.",
    image: rms2, // Modern restaurant admin dashboard
    services: ["Inventory Management", "POS Integration", "Analytics & Reporting"],
  },
  {
    name: "Selection Clothing",
    category: "Digital Marketing",
    categories: ["Digital Marketing"],
    techStack: ["Next.js", "Node.js", "MongoDB"],
    description: "Fashion-forward e-commerce platform with advanced filtering, personalized recommendations, and seamless checkout.",
    image: select, // Fashion e-commerce dashboard mockup
    services: ["Product Catalog", "Payment Integration", "Inventory Sync"],
  },
]

export default function ProjectsShowcase() {
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter((project) => project.categories.includes(activeCategory))

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Web Applications": return <Globe className="h-4 w-4" />
      case "Mobile Applications": return <Smartphone className="h-4 w-4" />
      case "SaaS & ERP": return <Server className="h-4 w-4" />
      case "Digital Marketing": return <TrendingUp className="h-4 w-4" />
      case "Education & Institutions": return <GraduationCap className="h-4 w-4" />
      case "Healthcare": return <Heart className="h-4 w-4" />
      default: return <Sparkles className="h-4 w-4" />
    }
  }

  return (
    <div className="bg-[#F5FAFF] min-h-screen font-sans overflow-hidden">
      {/* Hero Section - Adapted from First component style */}
      <section className="bg-linear-to-b from-[#F5FAFF] to-[#EAF5FF] text-[#1A2A44] relative py-20 lg:py-32">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-80 h-80 rounded-full bg-[#4A8EBC]/10 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-[#3B5488]/10 blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <div className="flex items-center justify-center gap-3">
            <Logo className="hidden sm:block h-10 w-auto" />
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold bg-clip-text text-transparent bg-linear-to-r from-[#1A2A44] via-[#4A8EBC] to-[#3B5488] mb-8">
              Our Projects
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-[#2B4066]/90 max-w-4xl mx-auto leading-relaxed">
            <span className="font-bold text-[#4A8EBC]">Innovate. Scale. Succeed.</span> — Showcasing world-class solutions we've built for clients across industries.
          </p>
        </div>
      </section>

      {/* Category Filters - Soft blue style */}
      <section className="sticky top-0 z-20 bg-[#F5FAFF]/90 backdrop-blur-md border-b border-[#4A8EBC]/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-4 overflow-x-auto py-6 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`flex items-center gap-2 whitespace-nowrap rounded-full px-6 py-3 text-sm font-semibold transition-all ${
                  activeCategory === category
                    ? "bg-linear-to-r from-[#4A8EBC] to-[#3B5488] text-white shadow-lg"
                    : "bg-white/70 text-[#3B5488] hover:bg-white hover:shadow-md"
                }`}
              >
                {getCategoryIcon(category)}
                <span>{category}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project, index) => (
              <div
                key={project.name}
                className="group relative bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl hover:-translate-y-4 transition-all duration-500"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#1A2A44]/70 to-transparent opacity-60 group-hover:opacity-70 transition-opacity" />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-[#3B5488] shadow-md">
                      {getCategoryIcon(project.category)}
                      {project.category}
                    </span>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-[#1A2A44] group-hover:text-[#4A8EBC] transition-colors">
                    {project.name}
                  </h3>
                  {project.client && (
                    <p className="mt-2 text-[#3B5488] font-medium">{project.client}</p>
                  )}
                  <p className="mt-4 text-[#2B4066]/90 leading-relaxed">{project.description}</p>
                  {project.services && (
                    <div className="mt-6 space-y-2">
                      {project.services.map((service) => (
                        <div key={service} className="flex items-center gap-3">
                          <CheckCircle2 className="h-5 w-5 text-[#4A8EBC]" />
                          <span className="text-[#2B4066]/90">{service}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="mt-6 flex flex-wrap gap-3">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-[#E0F0FF] px-4 py-2 text-sm font-medium text-[#3B5488]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <Link to="/contact" className="mt-8 inline-flex items-center gap-2 text-[#4A8EBC] font-semibold hover:gap-4 transition-all">
                    View Details <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-[#4A8EBC] to-[#3B5488] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Matching First style */}
      <section className="bg-linear-to-r from-[#E0F0FF]/80 to-[#D8EBFF]/80 px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1A2A44] mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-[#2B4066]/90 mb-10">
            Let's bring your vision to life with innovative digital solutions.
          </p>
          <Link to="/contact" className="inline-flex items-center bg-linear-to-r from-[#4A8EBC] to-[#3B5488] text-white font-bold py-5 px-12 rounded-full text-lg shadow-2xl hover:shadow-[#4A8EBC]/50 hover:scale-105 transition-transform duration-300">
            Get in Touch <ArrowRight className="inline h-5 w-5 ml-2" />
          </Link>
        </div>
      </section>
    </div>
  )
}
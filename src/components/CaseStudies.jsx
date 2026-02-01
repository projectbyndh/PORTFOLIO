"use client"
import { useState } from "react"
import { motion } from "framer-motion"
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

// Fallback projects
const FALLBACK_PROJECTS = [
  {
    name: "Numazu Halal Food",
    category: "Web Applications",
    categories: ["Web Applications", "Mobile Applications"],
    techStack: [".NET", "React", "Flutter"],
    description: "A cross-platform shopping ecosystem with high-performance backend, modern web UI, and seamless mobile commerce experience.",
    image: numa,
  },
  {
    name: "Epasaley",
    category: "E-Commerces",
    categories: ["Web Applications", "e-Commerces"],
    techStack: ["Node.js", "React"],
    description: "Complete e-commerce platform featuring scalable architecture, multi-vendor support, and powerful admin dashboards.",
    image: ep,
  },
  {
    name: "Siddhartha School & College",
    client: "Siddhartha School & Siddhartha International College",
    category: "Digital Marketing",
    categories: ["Digital Marketing", "Education & Institutions"],
    techStack: ["Digital Marketing", "Social Media", "Analytics"],
    description: "Comprehensive digital campaigns driving admission growth through targeted ads, event digitization, and funnel optimization.",
    image: dg,
    services: ["Social Media Campaigns", "Event Digitization", "Admission Funnel Optimization"],
  },
  {
    name: "Trailblazers Nepal",
    category: "Digital Marketing",
    categories: ["Digital Marketing"],
    techStack: ["Google Ads", "Meta Ads", "Analytics"],
    description: "High-impact adventure travel marketing campaigns with creative content, precise targeting, and measurable ROI.",
    image: "https://www.geckoboard.com/uploads/Digital-marketing-campaign-dashboard.png",
  },
  {
    name: "Resunga Polyclinic",
    category: "Healthcare",
    categories: ["Healthcare", "Web Applications"],
    techStack: ["Backend Systems", "Digital Infrastructure"],
    description: "Modern healthcare management system with patient portals, appointment scheduling, and secure data handling.",
    image: "https://cdn.dribbble.com/userupload/15369173/file/original-d9d779abf13c9cb42abf092076d035e4.png?resize=1200x900",
    services: ["Clinic Management System", "Patient Portal", "Digital Infrastructure"],
  },
  {
    name: "ERP & RMS Solutions",
    category: "SaaS & ERP",
    categories: ["SaaS & ERP"],
    techStack: ["Custom ERP", "RMS", "Cloud Infrastructure"],
    description: "Enterprise-grade ERP and Restaurant Management Systems for inventory, billing, staff scheduling, and real-time analytics.",
    image: rms2,
    services: ["Inventory Management", "POS Integration", "Analytics & Reporting"],
  },
  {
    name: "Selection Clothing",
    category: "Digital Marketing",
    categories: ["Digital Marketing"],
    techStack: ["Next.js", "Node.js", "MongoDB"],
    description: "Fashion-forward e-commerce platform with advanced filtering, personalized recommendations, and seamless checkout.",
    image: select,
    services: ["Product Catalog", "Payment Integration", "Inventory Sync"],
  },
]

export default function ProjectsShowcase() {
  const displayProjects = FALLBACK_PROJECTS
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredProjects = activeCategory === "All"
    ? displayProjects
    : displayProjects.filter((project) => {
      const projectCategories = project.categories || [project.category]
      return projectCategories.includes(activeCategory)
    })

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
    <div className="bg-[#FAFAFA] min-h-screen font-sans overflow-hidden relative">
      {/* Global grain texture */}
      <div className="fixed inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none z-0" />

      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-80 h-80 rounded-full bg-[#4A8EBC]/10 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-[#3B7AA8]/10 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm border border-white/40 rounded-full mb-8 shadow-sm"
          >
            <Sparkles size={14} className="text-[#4A8EBC]" />
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-600">Portfolio</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-black text-neutral-900 tracking-tighter mb-6"
          >
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4A8EBC] via-[#3B7AA8] to-[#2D5F8C]">Projects</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-neutral-600 max-w-4xl mx-auto leading-relaxed"
          >
            <span className="font-bold text-[#4A8EBC]">Innovate. Scale. Succeed.</span> — Showcasing world-class solutions we've built for clients across industries.
          </motion.p>
        </div>
      </section>

      {/* Category Filters - Enhanced Glassmorphism */}
      <section className="sticky top-0 z-20 bg-[#FAFAFA]/80 backdrop-blur-2xl border-b border-white/20 shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-3 overflow-x-auto py-6 scrollbar-hide">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 whitespace-nowrap rounded-2xl px-6 py-3 text-sm font-bold transition-all duration-300 ${activeCategory === category
                    ? "bg-gradient-to-r from-[#4A8EBC] to-[#3B7AA8] text-white shadow-[0_0_20px_rgba(74,142,188,0.4),0_4px_12px_rgba(74,142,188,0.2)]"
                    : "bg-white/60 backdrop-blur-sm text-neutral-700 hover:bg-white hover:shadow-lg border border-white/40"
                  }`}
              >
                {getCategoryIcon(category)}
                <span>{category}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-white/70 backdrop-blur-xl rounded-[2rem] shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-white/60"
              >
                {/* Image Section */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-neutral-900/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-2 rounded-xl bg-white/90 backdrop-blur-sm px-4 py-2 text-sm font-bold text-neutral-700 shadow-lg border border-white/50">
                      {getCategoryIcon(project.category)}
                      {project.category}
                    </span>
                  </div>

                  {/* Hover Glow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#4A8EBC]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Content Section */}
                <div className="p-8">
                  <h3 className="text-2xl font-black text-neutral-900 group-hover:text-[#4A8EBC] transition-colors duration-300 tracking-tight">
                    {project.name}
                  </h3>
                  {project.client && (
                    <p className="mt-2 text-neutral-600 font-semibold text-sm">{project.client}</p>
                  )}
                  <p className="mt-4 text-neutral-600 leading-relaxed">{project.description}</p>

                  {/* Services */}
                  {project.services && (
                    <div className="mt-6 space-y-2">
                      {project.services.map((service) => (
                        <div key={service} className="flex items-center gap-3">
                          <CheckCircle2 className="h-5 w-5 text-[#4A8EBC] flex-shrink-0" />
                          <span className="text-sm text-neutral-600 font-medium">{service}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tech Stack */}
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-xl bg-neutral-100 px-3 py-1.5 text-xs font-bold text-neutral-700 border border-neutral-200/50"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* View Details Link */}
                  <Link
                    to={`/project/${project.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="mt-8 inline-flex items-center gap-2 text-[#4A8EBC] font-bold hover:gap-4 transition-all group/link"
                  >
                    View Details <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>

                {/* Bottom Accent Line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#4A8EBC] to-[#3B7AA8] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 shadow-[0_0_10px_rgba(74,142,188,0.5)]" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Premium Glassmorphic */}
      <section className="relative px-6 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#4A8EBC]/5 to-[#3B7AA8]/5" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/60 backdrop-blur-2xl rounded-[3rem] p-12 md:p-16 border border-white/60 shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
          >
            <h2 className="text-4xl md:text-5xl font-black text-neutral-900 mb-6 tracking-tight">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-neutral-600 mb-10 max-w-2xl mx-auto">
              Let's bring your vision to life with innovative digital solutions.
            </p>
            <Link
              to="/contact"
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-[#4A8EBC] to-[#3B7AA8] text-white font-bold py-5 px-12 rounded-2xl text-lg shadow-[0_0_30px_rgba(74,142,188,0.4),0_8px_16px_rgba(74,142,188,0.2)] hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#5A9ECC] to-[#4B84A8] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10">Get in Touch</span>
              <ArrowRight className="relative z-10 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

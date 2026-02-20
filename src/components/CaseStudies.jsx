"use client"
import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Sparkles, Code2, Smartphone, TrendingUp, GraduationCap, Heart, CheckCircle2, Globe, Server, Loader2 } from "lucide-react"
import { Link } from "react-router-dom"
import useCategories from "../hooks/useCategories"
import useProjects from "../hooks/useProjects"
import { getImageUrl } from "../utils/getImageUrl"
import defaultProjectImg from "../assets/aaaa.jpg"

export default function ProjectsShowcase() {
  const { projects, loading: projectsLoading, fetchProjects } = useProjects()
  const { categories: apiCategories, fetchCategories } = useCategories()
  const [activeCategory, setActiveCategory] = useState("All")

  useEffect(() => {
    fetchProjects()
    fetchCategories()
  }, [])

  const categories = ["All", ...apiCategories.map(cat => cat.name)]

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter((project) => {
      // Normalize project categories to lowercase for comparison
      const projectCats = (project.categories || [])
        .concat(project.category ? [project.category] : [])
        .filter(Boolean)
        .map(c => String(c).trim().toLowerCase());

      const targetCat = activeCategory.trim().toLowerCase();

      return projectCats.includes(targetCat);
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
    <div className="bg-[#FAFAFA] min-h-screen font-sans relative">
      <div className="fixed inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none z-0" />

      <section className="relative pt-20 md:pt-24 lg:pt-28 pb-12 sm:pb-16 md:pb-20 lg:pb-24 xl:pb-32">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-80 h-80 rounded-full bg-[#26a8df]/10 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-[#26a8df]/10 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center relative z-10">


          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-[#0D1641] tracking-tighter mb-4 sm:mb-5 md:mb-6"
          >
            Our <span className="text-gradient-brand">Projects</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-neutral-600 max-w-4xl mx-auto leading-relaxed px-4"
          >
            <span className="font-bold text-[#26a8df]">Create. Grow. Succeed.</span> — See the great work we’ve done for businesses in many different fields.
          </motion.p>
        </div>
      </section>

      <section className="sticky top-0 z-20 bg-[#FAFAFA]/80 backdrop-blur-2xl border-b border-white/20 shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex gap-2 sm:gap-3 overflow-x-auto py-4 sm:py-5 md:py-6 scrollbar-hide">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-xl font-bold text-xs sm:text-sm transition-all duration-300 whitespace-nowrap
                  ${activeCategory === category
                    ? "bg-[#0D1641] text-white shadow-lg shadow-slate-500/25 scale-105"
                    : "bg-white text-neutral-500 hover:text-[#0D1641] border border-neutral-200"
                  }`}
              >
                {getCategoryIcon(category)}
                <span>{category}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-14 md:py-16 lg:py-20 px-4 sm:px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {projectsLoading ? (
            <div className="flex flex-col items-center justify-center py-12 sm:py-14 md:py-16 lg:py-20 gap-3 sm:gap-4">
              <Loader2 className="h-12 w-12 text-[#26a8df] animate-spin" />
              <p className="text-slate-500 font-medium animate-pulse">Syncing Portfolio Assets...</p>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-12 sm:py-14 md:py-16 lg:py-20">
              <p className="text-slate-500 text-lg">No projects found in this category.</p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id || project._id || index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative bg-white/70 backdrop-blur-xl rounded-[2rem] shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-white/60"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={getImageUrl(project.image, 'project')}
                      alt={project.name}
                      onError={(e) => {
                        console.error("Failed to load image:", getImageUrl(project.image, 'project'));
                        e.target.onerror = null;
                        e.target.src = defaultProjectImg;
                      }}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-neutral-900/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center gap-2 rounded-xl bg-white/90 backdrop-blur-sm px-4 py-2 text-sm font-bold text-[#0D1641] shadow-lg border border-white/50">
                        {getCategoryIcon(project.category)}
                        {project.category}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#26a8df]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  <div className="p-8">
                    <h3 className="text-2xl font-black text-[#26a8df] group-hover:text-[#26a8df] transition-colors duration-300 tracking-tight">
                      {project.name}
                    </h3>
                    {project.client && (
                      <p className="mt-2 text-neutral-600 font-semibold text-sm">{project.client}</p>
                    )}
                    <p className="mt-4 text-neutral-600 leading-relaxed">{project.description}</p>
                    {project.services && (
                      <div className="mt-6 space-y-2">
                        {project.services.map((service) => (
                          <div key={service} className="flex items-center gap-3">
                            <CheckCircle2 className="h-5 w-5 text-[#26a8df] flex-shrink-0" />
                            <span className="text-sm text-neutral-600 font-medium">{service}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-xl bg-neutral-100 px-3 py-1.5 text-xs font-bold text-[#0D1641] border border-neutral-200/50"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#26a8df] to-[#26a8df] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 shadow-[0_0_10px_rgba(74,142,188,0.5)]" />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#26a8df]/5 to-[#26a8df]/5" />
        <div className="max-w-4xl mx-auto text-center relative z-10 px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/60 backdrop-blur-2xl rounded-[2rem] sm:rounded-[2.5rem] md:rounded-[3rem] p-6 sm:p-8 md:p-10 lg:p-10 xl:p-12 border border-white/60 shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#26a8df] mb-4 sm:mb-5 md:mb-6 leading-none tracking-tighter">
              Engineering <br className="hidden sm:block" />
              Success Stories.
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-base text-neutral-600 mb-6 sm:mb-7 md:mb-8 lg:mb-6 max-w-2xl mx-auto px-4">
              Let's bring your vision to life with innovative digital solutions.
            </p>
            <p className="text-sm sm:text-base md:text-lg lg:text-base text-neutral-600 mb-6 sm:mb-7 md:mb-8 lg:mb-6 max-w-2xl mx-auto px-4">
              Email: contact@ndhtechnologies.com | Phone: 9857089898
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 sm:gap-2.5 bg-[#0D1641] text-white font-bold py-2.5 sm:py-3 md:py-3.5 lg:py-2.5 px-6 sm:px-7 md:px-8 lg:px-6 rounded-xl sm:rounded-2xl lg:rounded-xl text-sm sm:text-base md:text-base lg:text-sm shadow-lg transition-all"
            >
              <span className="relative z-10">Get Free Counseling</span>
              <ArrowRight className="relative z-10 h-4 w-4 sm:h-4 sm:w-4 lg:h-4 lg:w-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

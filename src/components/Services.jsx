import React, { useRef, useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion, useMotionTemplate, useMotionValue } from "framer-motion"
import {
  Globe, Smartphone, Layout, Share2, Search,
  Palette, Database, BarChart2, HeadphonesIcon,
  ArrowRight, Cpu, Zap, ShieldCheck, ChevronRight
} from "lucide-react"

export default function Services() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  }

  return (
    <main className="w-full bg-[#FAFAFA] relative pt-20 md:pt-24 lg:pt-28 pb-12 sm:pb-16 md:pb-20 lg:pb-24 selection:bg-blue-100">

      {/* --- TECH BACKGROUND --- */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03]"
          style={{ backgroundImage: `radial-gradient(#4A8EBC 1.5px, transparent 1.5px)`, backgroundSize: '40px 40px' }} />
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-400/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

        {/* --- HEADER --- */}
        <div className="mb-12 sm:mb-16 md:mb-20 lg:mb-24 text-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 sm:gap-3 text-[#4A8EBC] mb-4 sm:mb-5 md:mb-6 justify-center"
          >
            <div className="w-8 sm:w-10 md:w-12 h-[2px] bg-[#4A8EBC]" />
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] sm:tracking-[0.25em]">Capabilities</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-neutral-900 tracking-tighter leading-tight"
          >
            Our Digital <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4A8EBC] via-[#3B7AA8] to-[#2D5F8C]">
              Infrastructure.
            </span>
          </motion.h1>
        </div>

        {/* --- DYNAMIC SCROLL STRUCTURE --- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-10"
        >
          <SpotlightCard
            icon={<Cpu size={32} />}
            title="Core Engineering"
            desc="Building robust backbones for the web using modern scalable architectures."
            features={[
              { t: "Web Systems", i: <Layout size={18} /> },
              { t: "App Innovation", i: <Smartphone size={18} /> },
              { t: "CMS Solutions", i: <Globe size={18} /> }
            ]}
          />

          <SpotlightCard
            icon={<Zap size={32} />}
            title="Growth Systems"
            desc="Accelerating your digital presence with data-driven strategies."
            features={[
              { t: "SEO Intelligence", i: <Search size={18} /> },
              { t: "Brand Dynamics", i: <Palette size={18} /> },
              { t: "Social Strategy", i: <Share2 size={18} /> }
            ]}
          />

          <SpotlightCard
            icon={<ShieldCheck size={32} />}
            title="Data & Integrity"
            desc="Protecting and scaling your assets with enterprise-grade security."
            features={[
              { t: "Cloud Ops", i: <Database size={18} /> },
              { t: "Strategic Planning", i: <BarChart2 size={18} /> },
              { t: "24/7 Support", i: <HeadphonesIcon size={18} /> }
            ]}
          />

          {/* CTA Card */}
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.95 },
              visible: { opacity: 1, scale: 1 }
            }}
            whileHover={{ scale: 0.98 }}
            className="relative bg-gradient-to-br from-[#1A2A44] to-[#0F172A] rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[2.5rem] p-6 sm:p-8 md:p-10 lg:p-12 text-white flex flex-col justify-center items-center text-center shadow-2xl overflow-hidden group border border-white/10"
          >
            {/* Animated Grid Background */}
            <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>

            <div className="absolute top-0 right-0 w-48 sm:w-56 md:w-64 h-48 sm:h-56 md:h-64 bg-[#4A8EBC]/20 rounded-full blur-[60px] sm:blur-[80px] -translate-y-1/2 translate-x-1/2" />

            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-2xl font-black mb-3 sm:mb-4 md:mb-5 lg:mb-4 z-10 tracking-tight">Ready to scale?</h3>
            <p className="text-blue-100/80 mb-5 sm:mb-6 md:mb-8 lg:mb-6 z-10 max-w-sm text-sm sm:text-base md:text-base lg:text-sm font-light">Experience the next generation of Nepali IT excellence.</p>

            <Link to="/contact" className="relative px-5 sm:px-6 md:px-7 lg:px-5 py-2 sm:py-2.5 md:py-3 lg:py-2 bg-white text-[#0F172A] rounded-xl sm:rounded-2xl lg:rounded-xl text-sm sm:text-base md:text-base lg:text-sm font-bold inline-flex items-center gap-2 transition-all hover:scale-105 hover:bg-blue-50 z-10 shadow-lg shadow-blue-900/20 group/btn">
              <span>Get Started</span>
              <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </main>
  )
}

function SpotlightCard({ icon, title, desc, features }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
      }}
      className="group relative border border-neutral-200 bg-white rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[2.5rem] p-4 sm:p-6 md:p-8 lg:p-10 shadow-sm hover:shadow-xl transition-shadow duration-500 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Spotlight Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2.5rem] opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(74, 142, 188, 0.15),
              transparent 80%
            )
          `,
        }}
      />

      <div className="relative z-10 h-full flex flex-col">
        <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#4A8EBC]/10 to-blue-500/5 text-[#4A8EBC] flex items-center justify-center mb-4 sm:mb-6 md:mb-8 border border-[#4A8EBC]/10 group-hover:scale-110 transition-transform duration-500">
          {icon}
        </div>

        <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-neutral-900 mb-3 sm:mb-4 tracking-tight">{title}</h3>
        <p className="text-neutral-500 text-sm sm:text-base mb-6 sm:mb-8 md:mb-10 font-medium leading-relaxed">{desc}</p>

        <div className="mt-auto space-y-2 sm:space-y-3">
          {features.map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ x: 6 }}
              className="flex items-center justify-between p-2 sm:p-2.5 md:p-3 rounded-lg sm:rounded-xl bg-neutral-50 border border-transparent hover:border-[#4A8EBC]/20 hover:bg-white transition-all cursor-default group/item"
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="text-[#4A8EBC]/70 group-hover/item:text-[#4A8EBC] [&>svg]:w-4 [&>svg]:h-4 sm:[&>svg]:w-[18px] sm:[&>svg]:h-[18px]">{f.i}</span>
                <span className="text-xs sm:text-sm font-bold text-neutral-600 group-hover/item:text-neutral-900">{f.t}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
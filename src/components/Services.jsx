"use client"
import React from "react"
import { motion } from "framer-motion"
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
    <main className="w-full bg-[#F8FBFF] relative overflow-hidden py-24 selection:bg-blue-100">
      
      {/* --- TECH BACKGROUND --- */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03]" 
             style={{ backgroundImage: `radial-gradient(#4A8EBC 1.5px, transparent 1.5px)`, backgroundSize: '40px 40px' }} />
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* --- HEADER --- */}
        <div className="mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 text-[#4A8EBC] mb-6"
          >
            <div className="w-12 h-[2px] bg-[#4A8EBC]" />
            <span className="text-xs font-black uppercase tracking-[0.4em]">Capabilities</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-7xl font-black text-neutral-900 tracking-tighter leading-tight"
          >
            Our Digital <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4A8EBC] to-[#2D5F8C]">
              Infrastructure.
            </span>
          </motion.h1>
        </div>

        {/* --- DYNAMIC SCROLL STRUCTURE --- */}
        {/* We use a grid that stacks cards 2-per-row but feels like a single stream */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"
        >
          <ModuleCard 
            icon={<Cpu size={32} />}
            title="Core Engineering"
            desc="Building robust backbones for the web."
            features={[
              { t: "Web Systems", i: <Layout size={18}/> },
              { t: "App Innovation", i: <Smartphone size={18}/> },
              { t: "CMS Solutions", i: <Globe size={18}/> }
            ]}
          />

          <ModuleCard 
            icon={<Zap size={32} />}
            title="Growth Systems"
            desc="Accelerating your digital presence."
            features={[
              { t: "SEO Intelligence", i: <Search size={18}/> },
              { t: "Brand Dynamics", i: <Palette size={18}/> },
              { t: "Social Strategy", i: <Share2 size={18}/> }
            ]}
          />

          <ModuleCard 
            icon={<ShieldCheck size={32} />}
            title="Data & Integrity"
            desc="Protecting and scaling your assets."
            features={[
              { t: "Cloud Ops", i: <Database size={18}/> },
              { t: "Strategic Planning", i: <BarChart2 size={18}/> },
              { t: "24/7 Support", i: <HeadphonesIcon size={18}/> }
            ]}
          />

          {/* Extra placeholder or "Why Us" micro-card to keep the 2-row symmetry */}
          <motion.div 
            whileHover={{ scale: 0.98 }}
            className="bg-gradient-to-br from-[#4A8EBC] to-[#1E3A8A] rounded-[2.5rem] p-12 text-white flex flex-col justify-center items-center text-center shadow-xl relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
            <h3 className="text-3xl font-black mb-4 z-10">Ready to scale?</h3>
            <p className="text-blue-100 mb-8 z-10">Experience the next generation of Nepali IT excellence.</p>
            <button className="bg-white text-[#1E3A8A] px-8 py-4 rounded-2xl font-black flex items-center gap-3 transition-transform hover:scale-105 z-10">
              Get Started <ArrowRight size={20} />
            </button>
          </motion.div>
        </motion.div>
      </div>
    </main>
  )
}

function ModuleCard({ icon, title, desc, features }) {
  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
      }}
      className="group relative bg-white border border-blue-100 rounded-[2.5rem] p-8 md:p-12 shadow-[0_10px_40px_-15px_rgba(74,142,188,0.1)] hover:shadow-[0_30px_60px_-15px_rgba(74,142,188,0.2)] transition-all duration-700 overflow-hidden flex flex-col"
    >
      {/* Hover Background Pattern */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-[5rem] -translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
      
      <div className="relative z-10">
        <div className="inline-flex p-4 rounded-2xl bg-blue-50 text-[#4A8EBC] mb-8 group-hover:bg-[#4A8EBC] group-hover:text-white transition-all duration-500 shadow-sm group-hover:shadow-blue-200">
          {icon}
        </div>
        
        <h3 className="text-3xl font-black text-neutral-900 mb-3 tracking-tight">{title}</h3>
        <p className="text-neutral-500 text-base mb-10 font-medium">{desc}</p>
        
        <div className="grid grid-cols-1 gap-3">
          {features.map((f, i) => (
            <motion.div 
              key={i} 
              whileHover={{ x: 10 }}
              className="flex items-center justify-between p-4 rounded-2xl bg-[#F0F7FF] border border-transparent hover:border-blue-200 hover:bg-white transition-all cursor-pointer group/item"
            >
              <div className="flex items-center gap-4">
                <span className="text-[#4A8EBC]/60 group-hover/item:text-[#4A8EBC] transition-colors">{f.i}</span>
                <span className="text-sm font-bold text-neutral-700 tracking-wide">{f.t}</span>
              </div>
              <ChevronRight size={18} className="text-blue-200 group-hover/item:text-[#4A8EBC] transition-colors" />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
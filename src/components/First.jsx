import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Code, Globe, Shield } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#FAFAFA] px-6 lg:px-10 overflow-hidden pt-20">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-[#4A8EBC]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[100px]" />
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03] bg-[grid-size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent)]" 
             style={{ backgroundImage: 'linear-gradient(to right, #808080 1px, transparent 1px), linear-gradient(to bottom, #808080 1px, transparent 1px)' }} />
      </div>

      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* LEFT CONTENT */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-neutral-200 shadow-sm mb-6"
          >
            <Sparkles size={14} className="text-[#4A8EBC]" />
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-neutral-500">
              Elevating Nepali Innovation
            </span>
          </motion.div>

          <motion.h1 
            className="text-5xl lg:text-8xl font-black text-neutral-900 leading-[0.9] tracking-tighter mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Build for the <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#4A8EBC] via-[#3B7AA8] to-[#2D5F8C]">
              Next Summit.
            </span>
          </motion.h1>

          <motion.p 
            className="text-lg md:text-xl text-neutral-500 leading-relaxed max-w-xl mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Nepal Digital Heights is where world-class engineering meets local expertise. We design, build, and scale the digital infrastructure for tomorrow's market leaders.
          </motion.p>

          <motion.div 
            className="flex flex-wrap gap-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <button className="px-8 py-4 bg-[#1A1A1A] text-white rounded-2xl font-bold flex items-center gap-3 hover:bg-[#4A8EBC] transition-all hover:scale-105 active:scale-95 shadow-xl shadow-black/10">
              Start Building <ArrowRight size={18} />
            </button>
            <button className="px-8 py-4 bg-white text-neutral-700 border border-neutral-200 rounded-2xl font-bold hover:bg-neutral-50 transition-all">
              Our Capabilities
            </button>
          </motion.div>
        </motion.div>

        {/* RIGHT VISUAL - Abstract Glass Stack */}
        <motion.div 
          className="relative h-[500px] flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Main Decorative Card */}
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute z-20 w-72 h-96 bg-white/40 backdrop-blur-3xl border border-white/60 rounded-[3rem] shadow-2xl p-8 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-[#4A8EBC] to-[#2D5F8C] flex items-center justify-center text-white">
                <Code size={24} />
              </div>
              <div className="h-2 w-24 bg-neutral-800/20 rounded-full" />
              <div className="h-2 w-full bg-neutral-800/10 rounded-full" />
            </div>
            <div className="pt-4 border-t border-neutral-800/5 flex justify-between items-center">
              <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Project Status</span>
              <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-[10px] font-bold">Live</span>
            </div>
          </motion.div>

          {/* Background Card 1 */}
          <motion.div 
            animate={{ x: [0, 30, 0], y: [0, 15, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute z-10 w-64 h-80 bg-linear-to-br from-[#4A8EBC] to-[#2D5F8C] rounded-[2.5rem] shadow-2xl translate-x-12 -translate-y-8 flex items-center justify-center"
          >
            <Globe size={80} className="text-white/20" />
          </motion.div>

          {/* Background Card 2 */}
          <motion.div 
            animate={{ x: [0, -30, 0], y: [0, -15, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute z-0 w-64 h-80 bg-neutral-900 rounded-[2.5rem] shadow-2xl -translate-x-16 translate-y-12 p-8 text-white flex flex-col justify-end"
          >
             <Shield size={32} className="text-[#4A8EBC] mb-4" />
             <p className="text-sm font-bold opacity-60">Enterprise <br/> Encryption Standard</p>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default HeroSection;
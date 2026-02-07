import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Globe, Shield, Zap } from 'lucide-react';
import Logo from './Logo';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#FAFAFA] px-6 lg:px-10 overflow-hidden pt-20">

      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Grain Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.4] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        {/* Vibrant Blobs */}
        <motion.div
          animate={{ x: [0, 50, 0], y: [0, 30, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#4A8EBC]/10 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, 50, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px]"
        />

        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center relative z-10">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-start"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-blue-100 shadow-sm mb-8 hover:shadow-md transition-shadow cursor-default"
          >
            <Sparkles size={14} className="text-[#4A8EBC]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#4A8EBC]">
              Elevating Nepali Innovation
            </span>
          </motion.div>

          <motion.h1
            className="text-6xl lg:text-8xl font-black text-neutral-900 leading-[0.95] tracking-tighter mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Build for the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4A8EBC] via-[#3B7AA8] to-[#2D5F8C] animate-gradient-x">
              Next Summit.
            </span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-neutral-500 leading-relaxed max-w-xl mb-10 font-medium"
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
            <button className="group relative px-8 py-4 bg-gradient-to-r from-[#4A8EBC] to-[#3B7AA8] text-white rounded-2xl font-bold flex items-center gap-3 hover:-translate-y-1 transition-all duration-300 shadow-[0_0_30px_rgba(74,142,188,0.4),0_8px_16px_rgba(74,142,188,0.2)] overflow-hidden">
              {/* Animated glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#5A9ECC] to-[#4B84A8] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10">Start Building</span>
              <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 bg-white/80 backdrop-blur-sm text-neutral-700 border border-neutral-200/50 rounded-2xl font-bold hover:bg-white hover:border-neutral-300 hover:shadow-lg transition-all hover:-translate-y-1 duration-300">
              Our Capabilities
            </button>
          </motion.div>
        </motion.div>

        {/* RIGHT VISUAL - Abstract Glass Stack */}
        <motion.div
          className="relative h-[600px] w-full flex items-center justify-center lg:justify-end perspective-1000"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Background Card 1 (Blue Gradient) */}
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [6, 4, 6],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute z-10 top-20 right-10 w-72 h-96 bg-gradient-to-br from-[#4A8EBC] to-[#2D5F8C] rounded-[2.5rem] shadow-[0_20px_60px_rgba(74,142,188,0.3)] flex items-center justify-center"
          >
            <Globe size={100} className="text-white/20" />
            <div className="absolute inset-0 bg-white/10 rounded-[2.5rem] backdrop-blur-[2px]" />
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-[2.5rem] shadow-[inset_0_0_60px_rgba(255,255,255,0.1)]" />
          </motion.div>

          {/* Background Card 2 (Dark) */}
          <motion.div
            animate={{
              y: [0, -30, 0],
              rotate: [-6, -8, -6],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute z-0 top-32 right-48 w-72 h-96 bg-gradient-to-br from-[#1A1A1A] to-[#0a0a0a] rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.4)] p-8 flex flex-col justify-end border border-white/5"
          >
            <Shield size={40} className="text-[#4A8EBC] mb-4 drop-shadow-[0_0_10px_rgba(74,142,188,0.5)]" />
            <div className="space-y-2">
              <div className="h-2 w-20 bg-white/20 rounded-full" />
              <div className="h-2 w-12 bg-white/10 rounded-full" />
            </div>
            <p className="text-white/40 text-xs font-mono mt-6">SECURE_PROTOCOL_V2</p>
          </motion.div>

          {/* Main Glass Card (Front) - Enhanced */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-20 w-80 h-[420px] bg-white/70 backdrop-blur-2xl border border-white/60 rounded-[3rem] shadow-[0_30px_80px_rgba(0,0,0,0.12),0_0_40px_rgba(74,142,188,0.1)] p-8 flex flex-col justify-between overflow-hidden"
          >
            {/* Enhanced Shimmer Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-white/40 to-transparent opacity-60" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#4A8EBC]/10 rounded-full blur-3xl" />

            <div className="relative z-10 space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-white shadow-xl flex items-center justify-center p-3 border border-white/50">
                <Logo className="w-full h-full object-contain" />
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                  <span className="text-sm font-bold text-neutral-600">System Online</span>
                </div>
                <div className="h-2 w-32 bg-gradient-to-r from-neutral-200 to-neutral-100 rounded-full" />
                <div className="h-2 w-24 bg-neutral-100 rounded-full" />
              </div>
            </div>

            {/* Enhanced Performance Card */}
            <div className="relative z-10 bg-white/60 backdrop-blur-xl rounded-2xl p-4 border border-white/40 shadow-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-neutral-500 tracking-wide">PERFORMANCE</span>
                <Zap size={14} className="text-yellow-500 fill-yellow-500 drop-shadow-[0_0_6px_rgba(234,179,8,0.5)]" />
              </div>
              <div className="w-full bg-neutral-200/50 rounded-full h-2 overflow-hidden shadow-inner">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "92%" }}
                  transition={{ duration: 1.5, delay: 0.8 }}
                  className="bg-gradient-to-r from-[#4A8EBC] to-[#3B7AA8] h-full rounded-full shadow-[0_0_10px_rgba(74,142,188,0.5)]"
                />
              </div>
              <div className="flex justify-end mt-1.5">
                <span className="text-[10px] font-black text-[#4A8EBC]">98.2%</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

      </div>

      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 1.5s infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
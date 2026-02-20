import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Globe,
  Shield,
  Zap,
  CheckCircle2,
  RefreshCw,
  X,
  ArrowRight,
  Wind
} from 'lucide-react';

// ── 1. Sophisticated Blueprint Background ────────────────────────────
const BlueprintBackground = () => (
  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none bg-[#f8fafc]">
    {/* Grid System */}
    <div
      className="absolute inset-0 opacity-[0.25]"
      style={{
        backgroundImage: `
          linear-gradient(to right, #26a8df 1px, transparent 1px),
          linear-gradient(to bottom, #26a8df 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        maskImage: 'radial-gradient(circle at center, black, transparent 90%)'
      }}
    />

    {/* Velocity Wind Particles */}
    {[...Array(6)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ x: '120%', y: `${18 * i + 10}%` }}
        animate={{ x: '-120%' }}
        transition={{
          duration: 1.5 + Math.random(),
          repeat: Infinity,
          ease: "linear",
          delay: i * 0.3
        }}
        className="absolute h-px w-40 bg-gradient-to-r from-transparent via-[#26a8df40] to-transparent"
      />
    ))}
  </div>
);

// ── 2. The Hero Section ──────────────────────────────────────────────
const HeroSection = () => {
  const [rotation, setRotation] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  const [autoRotate, setAutoRotate] = useState(true);

  const cards = [
    {
      id: 'global',
      icon: <Globe size={24} />,
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop',
      title: 'Global Mesh',
      subtitle: 'Edge Infrastructure',
      description: 'Distributed network architecture providing sub-30ms latency across 120+ global nodes.',
      features: ['Anycast Routing', 'Edge Runtime', 'Geo-Optimization'],
    },
    {
      id: 'security',
      icon: <Shield size={24} />,
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1200&auto=format&fit=crop',
      title: 'Shield Layer',
      subtitle: 'Zero-Trust Protocol',
      description: 'Hardened security perimeter with integrated WAF and real-time DDoS mitigation.',
      features: ['L7 Filtering', 'mTLS Encryption', 'Threat Intel'],
    },
    {
      id: 'performance',
      icon: <Zap size={24} />,
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop',
      title: 'Peak Speed',
      subtitle: 'Brotli Acceleration',
      description: 'Advanced compression and intelligent caching designed for high-velocity delivery.',
      features: ['Brotli Stream', 'Tiered Caching', 'Image Proxy'],
    },
  ];

  useEffect(() => {
    if (!autoRotate || selectedId) return;
    const interval = setInterval(() => setRotation(prev => prev + 120), 5000);
    return () => clearInterval(interval);
  }, [autoRotate, selectedId]);

  const activeCard = cards.find((c) => c.id === selectedId);

  return (
    <LayoutGroup>
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20 px-4">
        <BlueprintBackground />

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">

            {/* LEFT: CONTENT / DETAILS (Restored Fonts) */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <AnimatePresence mode="wait">
                {!selectedId ? (
                  <motion.div
                    key="hero"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    className="space-y-8 text-center lg:text-left"
                  >


                    <h1 className="text-5xl sm:text-7xl font-black text-[#0D1641] tracking-tighter leading-[0.9]">
                      Build on <br />
                      <span className="text-[#26a8df]">Pure Velocity.</span>
                    </h1>

                    <p className="max-w-md mx-auto lg:mx-0 text-xl text-slate-500 font-medium leading-relaxed">
                      Experience the revolution of infrastructure. Secure, fast, and globally distributed by default.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                      <Link
                        to="/contactus"
                        className="group flex items-center gap-2 px-10 py-4 bg-[#0D1641] text-white rounded-xl font-bold shadow-2xl hover:bg-[#26a8df] transition-all hover:-translate-y-1 active:scale-95"
                      >
                        Get Started
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </Link>
                      <button
                        onClick={() => setRotation(r => r + 120)}
                        className="p-3 text-[#0D1641] hover:bg-slate-200 rounded-full transition-colors"
                      >
                        <RefreshCw size={20} />
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="expanded"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 40 }}
                  >
                    <DetailedPanel data={activeCard} onClose={() => setSelectedId(null)} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* RIGHT: REVOLVING FULL-IMAGE CAROUSEL */}
            <div className="lg:col-span-7 relative h-[450px] sm:h-[600px] flex items-center justify-center order-1 lg:order-2">
              <div
                className="relative w-full h-full flex items-center justify-center"
                style={{ perspective: "2000px", transformStyle: "preserve-3d" }}
              >
                {cards.map((card, index) => (
                  <RevolvingCard
                    key={card.id}
                    data={card}
                    index={index}
                    currentRotation={rotation}
                    isSelected={selectedId === card.id}
                    onClick={() => {
                      setSelectedId(card.id);
                      setAutoRotate(false);
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </LayoutGroup>
  );
};

// ── 3. High-Opacity Full Image Card ──────────────────────────────────
const RevolvingCard = ({ data, index, currentRotation, onClick, isSelected }) => {
  const angleStep = 120;
  const cardAngle = (index * angleStep) + currentRotation;
  const radian = (cardAngle * Math.PI) / 180;
  const radius = isSelected ? 0 : 200;

  const x = Math.sin(radian) * radius;
  const z = Math.cos(radian) * radius;
  const skew = isSelected ? 0 : (x / 200) * -10;

  return (
    <motion.div
      animate={{
        x: isSelected ? 0 : x,
        z: isSelected ? 400 : z,
        rotateY: isSelected ? 0 : cardAngle,
        skewX: skew,
        scale: isSelected ? 1.15 : (z + 200) / (400) * 0.4 + 0.6,
        opacity: isSelected ? 1 : (z + 200) / (400) * 0.7 + 0.3,
      }}
      transition={{ type: 'spring', stiffness: 50, damping: 20 }}
      onClick={onClick}
      className={`absolute w-[240px] sm:w-[290px] aspect-[4/5.5] cursor-pointer rounded-[2.5rem] overflow-hidden group shadow-2xl ${isSelected ? 'z-[100]' : ''
        }`}
      style={{
        transformStyle: "preserve-3d",
        zIndex: isSelected ? 200 : Math.round(z + 200)
      }}
    >
      <div className="absolute inset-0">
        <img
          src={data.image}
          alt={data.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D1641]/10 via-transparent to-[#0D1641]/90" />
      </div>

      <div className="relative h-full w-full p-8 flex flex-col text-white">
        <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-auto border border-white/30 shadow-lg">
          {React.cloneElement(data.icon, { className: "text-white" })}
        </div>

        <div className="space-y-1">
          <p className="text-[10px] font-black text-[#26a8df] uppercase tracking-[0.2em]">
            {data.subtitle}
          </p>
          <h3 className="text-3xl font-black tracking-tight leading-none">
            {data.title}
          </h3>
          <div className="mt-4 flex items-center gap-2 opacity-50">
            <span className="text-[9px] font-bold uppercase tracking-tighter">Cluster Node 0{index + 1}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ── 4. Detailed Sidebar View (Restored Font Styles) ──────────────────
const DetailedPanel = ({ data, onClose }) => (
  <div className="space-y-10 text-center lg:text-left">
    <div className="space-y-4">
      <div className="h-1.5 w-16 bg-[#26a8df] rounded-full mx-auto lg:mx-0" />
      {/* Restored Italic Black Header */}
      <h2 className="text-6xl sm:text-7xl font-black text-[#0D1641] tracking-tighter uppercase leading-none italic">
        {data.title}
      </h2>
      <p className="text-xl sm:text-2xl text-slate-500 font-light leading-relaxed max-w-lg mx-auto lg:mx-0">
        {data.description}
      </p>
    </div>

    <div className="grid gap-3 max-w-sm mx-auto lg:mx-0">
      {data.features.map((feat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          className="flex items-center gap-4 p-5 bg-white border border-slate-100 rounded-2xl shadow-sm hover:border-[#26a8df]/40 transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#26a8df] group-hover:bg-[#26a8df] group-hover:text-white transition-colors">
            <CheckCircle2 size={20} />
          </div>
          <span className="font-bold text-[#0D1641] tracking-tight text-lg">{feat}</span>
        </motion.div>
      ))}
    </div>

    {/* Ergonimic Close Action */}
    <div className="pt-8 border-t border-slate-100 flex justify-center lg:justify-start">
      <button
        onClick={onClose}
        className="group flex items-center gap-3 px-8 py-3 bg-slate-100 text-[#0D1641] hover:bg-red-50 hover:text-red-600 rounded-full font-black uppercase tracking-widest text-[9px] transition-all shadow-sm"
      >
        <X size={14} className="transition-transform group-hover:rotate-90" />
        Dismiss Configuration
      </button>
    </div>
  </div>
);

export default HeroSection;
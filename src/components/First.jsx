import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Globe,
  Shield,
  Zap,
  X,
  CheckCircle2,
  RefreshCw,
  ChevronLeft,
} from 'lucide-react';

// ── 1. Subtle Background ────────────────────────────────────────────────
const AnimatedGrid = () => (
  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none bg-[#f9fafb]">
    {/* Very soft gradient */}
    <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-50/70" />
    {/* Large, faint architectural grid */}
    <div
      className="absolute inset-0 opacity-[0.07]"
      style={{
        backgroundImage: `
          linear-gradient(to right, #cbd5e1 1px, transparent 1px),
          linear-gradient(to bottom, #cbd5e1 1px, transparent 1px)
        `,
        backgroundSize: '7rem 7rem',
      }}
    />
    {/* Single gentle static glow (no pulsing) */}
    <div className="absolute -top-40 -right-40 w-[1000px] h-[1000px] bg-blue-50/20 rounded-full blur-3xl" />
    {/* Subtle vertical rhythm lines */}
    <div
      className="absolute inset-0 opacity-60"
      style={{
        backgroundImage: `repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0 1px, transparent 1px 24px)`,
        mixBlendMode: 'overlay',
        opacity: 0.04,
      }}
    />

    {/* Gentle diagonal weave for texture */}
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: `repeating-linear-gradient(135deg, rgba(0,0,0,0.02) 0 1px, transparent 1px 48px)`,
        opacity: 0.03,
      }}
    />
  </div>
);

// ── 2. Main Hero ────────────────────────────────────────────────────────
const HeroSection = () => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const cards = [
    {
      id: 'global',
      icon: Globe,
      color: '#2563eb',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop',
      title: 'Global Infrastructure',
      subtitle: '35+ Regions • Anycast Edge',
      description:
        'Deploy instantly to our worldwide mesh of high-performance nodes. We optimize routing so your users get the fastest possible experience.',
      features: ['Anycast Network', 'Smart Routing', 'Instant Purge', 'Edge Functions'],
    },
    {
      id: 'security',
      icon: Shield,
      color: '#059669',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1200&auto=format&fit=crop',
      title: 'Enterprise Security',
      subtitle: 'Zero-Trust by Default',
      description:
        'Built-in protection against DDoS, bots, and exploits — with automatic SSL, powerful WAF, and real-time visibility, no performance trade-offs.',
      features: ['WAF + Rate Limiting', 'DDoS Mitigation', 'Auto SSL/TLS', 'Audit Logs'],
    },
    {
      id: 'performance',
      icon: Zap,
      color: '#d97706',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop',
      title: 'Hypersonic Delivery',
      subtitle: 'Sub-30 ms Global Latency',
      description:
        'Optimized caching, image optimization, HTTP/3, Brotli — content is served from the closest possible point to every user.',
      features: ['Image Optimization', 'Brotli Compression', 'HTTP/3 & QUIC', 'Smart Invalidation'],
    },
  ];

  const [order, setOrder] = useState([0, 1, 2]);
  const [selectedId, setSelectedId] = useState(null);
  const [autoShuffle, setAutoShuffle] = useState(true);

  useEffect(() => {
    if (selectedId || !autoShuffle) return;

    const interval = setInterval(() => {
      setOrder((prev) => {
        const next = [...prev];
        const first = next.shift();
        if (first !== undefined) next.push(first);
        return next;
      });
    }, 8000);

    return () => clearInterval(interval);
  }, [selectedId, autoShuffle]);

  const handleCardClick = (id) => {
    setSelectedId(id);
    setAutoShuffle(false);
  };

  const closeExpanded = (e) => {
    if (e) e.stopPropagation();
    setSelectedId(null);
    // Small delay before re-enabling shuffle so animation completes
    setTimeout(() => setAutoShuffle(true), 400);
  };

  const activeCard = cards.find((c) => c.id === selectedId);

  return (
    <LayoutGroup>
      <section className="relative min-h-[640px] lg:min-h-[720px] flex items-center justify-center overflow-hidden bg-[#f9fafb] font-sans text-slate-900 pt-24 md:pt-28 lg:pt-32 pb-16 lg:pb-20">
        <AnimatedGrid />

        <div className="relative z-10 max-w-7xl mx-auto w-full px-5 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left — Hero text / expanded detail */}
            <div className="lg:col-span-7 min-h-[380px] lg:min-h-[520px] flex items-center">
              <AnimatePresence mode="wait">
                {!selectedId ? (
                  <motion.div
                    key="hero"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -24 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-2xl"
                  >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200/70 shadow-sm mb-6">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-70" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                      </span>
                      <span className="text-sm font-medium text-green-700">All systems operational</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight text-slate-900">
                      Scale your <br />
                      <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                        vision globally
                      </span>
                    </h1>

                    <p className="mt-5 text-lg sm:text-xl text-slate-700 leading-relaxed">
                      The modern edge platform for teams that care about speed, security, and simplicity.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-4">
                      <Link
                        to="/start"
                        className="px-8 py-4 bg-slate-900 text-white rounded-xl font-semibold text-base sm:text-lg hover:bg-slate-800 transition-all shadow-md hover:shadow-lg active:scale-98"
                      >
                        Start for free
                      </Link>
                      <button
                        onClick={() => handleCardClick('global')}
                        className="px-8 py-4 bg-white text-slate-800 rounded-xl font-semibold text-base sm:text-lg border border-slate-200 hover:border-slate-300 transition-all active:scale-98"
                      >
                        See features
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="expanded"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="hidden lg:block w-full"
                  >
                    <DesktopExpandedView data={activeCard} onClose={closeExpanded} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right — Card stack */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end items-center relative">
              <div className="relative w-full max-w-[280px] sm:max-w-[300px] aspect-[4/5.6] perspective-[1400px]">
                {/* Lined accent behind the card stack (subtle, pointer-events-none) */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage: `
                      repeating-linear-gradient(90deg, rgba(255,255,255,0.02) 0 1px, transparent 1px 28px),
                      repeating-linear-gradient(0deg, rgba(0,0,0,0.015) 0 1px, transparent 1px 40px)
                    `,
                    opacity: 0.06,
                    mixBlendMode: 'overlay',
                  }}
                />

                <AnimatePresence initial={false}>
                  {[2, 1, 0].map((posIndex) => {
                    const idx = order[posIndex];
                    const card = cards[idx];
                    const isHidden = selectedId === card.id && isDesktop;

                    if (isHidden) return null;

                    return (
                      <CardStackItem
                        key={card.id}
                        data={card}
                        position={posIndex}
                        onClick={() => handleCardClick(card.id)}
                        isSelected={selectedId === card.id}
                      />
                    );
                  })}
                </AnimatePresence>
              </div>

              {/* Controls */}
              <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 lg:left-auto lg:right-0 lg:translate-x-0 flex items-center gap-5 mt-10">
                <button
                  onClick={() => {
                    setAutoShuffle(false);
                    setOrder((prev) => {
                      const n = [...prev];
                      const first = n.shift();
                      if (first !== undefined) n.push(first);
                      return n;
                    });
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 bg-white rounded-full shadow border border-slate-200 text-slate-700 hover:text-blue-600 hover:border-blue-200 transition-all text-sm font-medium"
                >
                  <RefreshCw size={14} />
                  Shuffle
                </button>

                <div className="flex gap-2.5">
                  {cards.map((c) => (
                    <div
                      key={c.id}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        selectedId === c.id ? 'w-10 bg-blue-600' : 'w-2 bg-slate-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile modal */}
        <AnimatePresence>
          {selectedId && activeCard && !isDesktop && (
            <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeExpanded}
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              />
              <motion.div
                layoutId={activeCard.id}
                className="relative w-full max-w-lg bg-white rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col m-4 sm:m-6"
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: '100%', opacity: 0 }}
                transition={{ type: 'spring', stiffness: 240, damping: 30 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={closeExpanded}
                  className="absolute top-4 right-4 z-20 p-2.5 bg-black/50 text-white rounded-full backdrop-blur hover:bg-black/70 transition-all"
                >
                  <X size={20} />
                </button>

                <div className="relative h-64 sm:h-72">
                  <img
                    src={activeCard.image}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <h3 className="text-3xl sm:text-4xl font-bold">{activeCard.title}</h3>
                    <p className="text-lg sm:text-xl text-white/90 mt-2">{activeCard.subtitle}</p>
                  </div>
                </div>

                <div className="p-6 sm:p-8 flex-1 overflow-y-auto">
                  <p className="text-slate-700 leading-relaxed mb-6 text-base sm:text-lg">
                    {activeCard.description}
                  </p>
                  <div className="space-y-4">
                    {activeCard.features.map((feat, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl text-base"
                      >
                        <CheckCircle2 size={20} className="text-blue-600 shrink-0" />
                        <span className="font-medium text-slate-800">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </section>
    </LayoutGroup>
  );
};

// ── 3. Desktop Expanded View & 4. CardStackItem remain mostly the same ──
// (I only made minor visual/stability tweaks)

const DesktopExpandedView = ({ data, onClose }) => (
  <motion.div
    layoutId={data.id}
    className="w-full max-h-[520px] bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-200/80 overflow-hidden flex flex-col"
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    transition={{ type: 'spring', stiffness: 220, damping: 28 }}
  >
    <div className="relative h-56 shrink-0">
      <img src={data.image} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent" />
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
        <button
          onClick={onClose}
          className="flex items-center gap-2 px-4 py-2 bg-white/25 backdrop-blur-md border border-white/20 text-white rounded-full hover:bg-white/35 transition text-sm font-medium"
        >
          <ChevronLeft size={16} />
          Back
        </button>
        <div className="px-3 py-1.5 rounded-full bg-white/25 backdrop-blur-md text-white text-sm font-medium border border-white/15 flex items-center gap-1.5">
          <data.icon size={14} />
          Details
        </div>
      </div>
      <div className="absolute bottom-6 left-6 right-6">
        <h2 className="text-3xl font-bold text-white tracking-tight leading-tight">
          {data.title}
        </h2>
      </div>
    </div>

    <div className="flex-1 p-6 bg-white overflow-y-auto">
      <p className="text-base text-slate-600 mb-2 font-medium">{data.subtitle}</p>
      <p className="text-base text-slate-700 leading-relaxed mb-6">{data.description}</p>

      <div className="space-y-3">
        <span className="text-xs uppercase font-semibold text-slate-500 tracking-wider block mb-2">
          Key Features
        </span>
        <div className="grid grid-cols-2 gap-3">
          {data.features.map((feat, i) => (
            <div
              key={i}
              className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3 text-sm"
            >
              <CheckCircle2 size={16} className="text-blue-600 shrink-0" />
              <span className="font-medium text-slate-800">{feat}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </motion.div>
);

const CardStackItem = ({ data, position, onClick, isSelected }) => {
  const isFront = position === 0;

  const variants = {
    front: { zIndex: 30, scale: 1, x: 0, y: 0, rotateZ: 0, rotateX: 0, opacity: 1 },
    middle: { zIndex: 20, scale: 0.95, x: -32, y: -36, rotateZ: -5, rotateX: 4, opacity: 0.9 },
    back: { zIndex: 8, scale: 0.86, x: 44, y: -86, rotateZ: 8, rotateX: 8, opacity: 0.72 },
  };

  return (
    <motion.div
      layoutId={data.id}
      variants={variants}
      animate={isFront ? 'front' : position === 1 ? 'middle' : 'back'}
      transition={{ type: 'spring', stiffness: 180, damping: 24 }}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={`
        absolute inset-0 rounded-3xl overflow-hidden cursor-pointer
        shadow-2xl will-change-transform
        ${isFront ? 'shadow-[0_30px_70px_-12px_rgba(0,0,0,0.25)] hover:scale-[1.025]' : 'shadow-xl hover:scale-[1.015]'}
        ${isSelected ? 'pointer-events-none' : ''}
      `}
    >
      <img
        src={data.image}
        alt=""
        className="absolute inset-0 w-full h-full object-cover brightness-[0.82] contrast-[1.08]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/15" />
      <div className="absolute inset-0 shadow-[inset_0_0_70px_rgba(0,0,0,0.45)]" />

      <div className="relative z-10 h-full flex flex-col justify-end p-6 sm:p-8 pb-10 sm:pb-12 text-white">
        <div className="flex items-center gap-4 mb-5">
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
            style={{
              backgroundColor: data.color,
              boxShadow: `0 10px 25px ${data.color}60`,
            }}
          >
            <data.icon size={24} className="text-white" />
          </div>
          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold leading-tight tracking-tight">
              {data.title}
            </h3>
            <p className="text-base text-white/90 mt-1 font-medium">{data.subtitle}</p>
          </div>
        </div>

        <p className="text-base leading-relaxed text-white/85 line-clamp-3 mb-6">
          {data.description}
        </p>

        {isFront && (
          <>
            <div className="flex flex-wrap gap-2.5 mb-6">
              {data.features.slice(0, 3).map((f, i) => (
                <span
                  key={i}
                  className="text-xs sm:text-sm px-4 py-1.5 bg-white/16 backdrop-blur-md border border-white/15 rounded-full font-medium"
                >
                  {f}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between text-base">
              <button className="bg-white text-slate-900 px-6 py-2.5 rounded-lg font-semibold shadow transition-all hover:shadow-md active:scale-98">
                Explore
              </button>
              <span className="text-white/80 text-sm">Click to learn more</span>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default HeroSection;
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Link } from "react-router-dom";
import { Globe, Shield, Zap, ChevronRight, RefreshCw, X } from "lucide-react";

// Ultra-minimal 2025 hero with tiny card stack
const cardsData = [
  {
    id: "edge",
    title: "Global Edge",
    subtitle: "Deploy everywhere",
    description: "Lightning-fast content delivery with edge nodes in 280+ cities worldwide.",
    features: ["<20ms latency", "Auto-scale", "Zero config CDN"],
    icon: Globe,
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    id: "secure",
    title: "Zero Trust",
    subtitle: "Security built-in",
    description: "Enterprise-grade protection with DDoS mitigation and certificate management.",
    features: ["WAF included", "TLS 1.3", "Bot detection"],
    icon: Shield,
    gradient: "from-purple-500 to-pink-400",
  },
  {
    id: "performance",
    title: "Instant Deploy",
    subtitle: "Push to production",
    description: "Ship features in seconds with atomic deployments and instant rollbacks.",
    features: ["Git integration", "Preview URLs", "Analytics"],
    icon: Zap,
    gradient: "from-orange-500 to-yellow-400",
  },
];

const softSpring = { type: "spring", stiffness: 180, damping: 24 };

// Animated background with grid + orb glow
const AnimatedBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Grid pattern */}
    <div
      className="absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage: `
          linear-gradient(to right, currentColor 1px, transparent 1px),
          linear-gradient(to bottom, currentColor 1px, transparent 1px)
        `,
        backgroundSize: "32px 32px",
      }}
    />
    
    {/* Orb glow */}
    <motion.div
      className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-blue-500/10 to-cyan-400/10 blur-3xl"
      animate={{
        scale: [1, 1.1, 1],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
    
    <motion.div
      className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-purple-500/10 to-pink-400/10 blur-3xl"
      animate={{
        scale: [1.1, 1, 1.1],
        opacity: [0.4, 0.2, 0.4],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  </div>
);

// Tiny elegant card component
const MicroCard = ({ card, position, onClick, isFront }) => {
  const variants = {
    front: { zIndex: 30, scale: 1, y: 0, rotateX: 0, opacity: 1 },
    mid: { zIndex: 20, scale: 0.96, y: -14, rotateX: 2, opacity: 0.92 },
    back: { zIndex: 10, scale: 0.92, y: -28, rotateX: 4, opacity: 0.8 },
  };

  const state = position === 0 ? "front" : position === 1 ? "mid" : "back";
  const Icon = card.icon;

  return (
    <motion.div
      layoutId={`card-${card.id}`}
      initial={false}
      animate={state}
      variants={variants}
      transition={softSpring}
      onClick={onClick}
      className="absolute inset-0 rounded-xl overflow-hidden cursor-pointer select-none bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 shadow-lg"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-5`} />

      <div className="relative z-10 p-4 h-full flex flex-col">
        {/* Icon + Title */}
        <div className="flex items-center gap-2.5 mb-3">
          <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${card.gradient} flex items-center justify-center shadow-sm`}>
            <Icon size={16} className="text-white" />
          </div>
          <div className="min-w-0">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
              {card.title}
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 truncate">
              {card.subtitle}
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed line-clamp-2 mb-3">
          {card.description}
        </p>

        {/* Features - only show on front card */}
        {isFront && (
          <div className="mt-auto space-y-1.5">
            {card.features.slice(0, 2).map((feature, i) => (
              <div key={i} className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400">
                <div className={`w-1 h-1 rounded-full bg-gradient-to-r ${card.gradient}`} />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

// Expanded card detail view
const ExpandedCard = ({ card, onClose }) => {
  const Icon = card.icon;

  return (
    <motion.div
      layoutId={`card-${card.id}`}
      className="relative w-full max-w-2xl mx-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-slate-200/50 dark:border-slate-700/50 overflow-hidden"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={softSpring}
    >
      {/* Header */}
      <div className={`relative bg-gradient-to-br ${card.gradient} p-6`}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-colors"
        >
          <X size={16} className="text-white" />
        </button>

        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Icon size={24} className="text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">{card.title}</h3>
            <p className="text-sm text-white/90">{card.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
          {card.description}
        </p>

        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider">
            Key Features
          </h4>
          {card.features.map((feature, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50"
            >
              <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${card.gradient}`} />
              <span className="text-sm text-slate-800 dark:text-slate-200 font-medium">
                {feature}
              </span>
            </div>
          ))}
        </div>

        <button
          className={`mt-6 w-full py-3 rounded-xl bg-gradient-to-r ${card.gradient} text-white font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-shadow`}
        >
          Learn more
          <ChevronRight size={16} />
        </button>
      </div>
    </motion.div>
  );
};

export default function HeroMinimal() {
  const [order, setOrder] = useState([0, 1, 2]);
  const [selected, setSelected] = useState(null);
  const [autoShuffle, setAutoShuffle] = useState(true);

  // Auto-shuffle effect
  useEffect(() => {
    if (selected || !autoShuffle) return undefined;
    
    const interval = setInterval(() => {
      setOrder((prev) => {
        const next = [...prev];
        const first = next.shift();
        if (typeof first !== "undefined") next.push(first);
        return next;
      });
    }, 6000);

    return () => clearInterval(interval);
  }, [selected, autoShuffle]);

  const handleCardClick = (id) => {
    setSelected(id);
    setAutoShuffle(false);
  };

  const handleClose = () => {
    setSelected(null);
    setAutoShuffle(true);
  };

  const handleManualShuffle = () => {
    setAutoShuffle(false);
    setOrder((prev) => {
      const next = [...prev];
      const first = next.shift();
      if (typeof first !== "undefined") next.push(first);
      return next;
    });
  };

  const activeCard = cardsData.find((c) => c.id === selected);

  return (
    <LayoutGroup>
      <section className="relative min-h-[500px] flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 py-16">
        <AnimatedBackground />

        <div className="relative z-10 max-w-7xl mx-auto w-full px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Headline + CTAs */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Live on 280+ edge locations
                </span>
              </div>

              <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-white">
                Ship faster with{" "}
                <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  edge-first infrastructure
                </span>
              </h1>

              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl">
                Deploy globally in seconds. Built for developers who need speed, security, and simplicity.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  to="/get-started"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold shadow-lg hover:shadow-xl transition-shadow"
                >
                  Start building
                  <ChevronRight size={18} />
                </Link>

                <button
                  onClick={handleManualShuffle}
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 text-slate-700 dark:text-slate-300 font-medium hover:bg-white/80 dark:hover:bg-slate-800/80 transition-colors"
                >
                  <RefreshCw size={16} />
                  <span className="text-sm">Shuffle</span>
                </button>
              </div>
            </div>

            {/* Right: Tiny card stack */}
            <div className="flex justify-center lg:justify-end">
              <div
                className="relative w-[260px] h-[340px]"
                style={{ perspective: "1000px" }}
              >
                <AnimatePresence initial={false} mode="popLayout">
                  {[2, 1, 0].map((posIndex) => {
                    const cardIndex = order[posIndex];
                    const card = cardsData[cardIndex];
                    const isHidden = selected === card.id && window.innerWidth >= 1024;

                    if (isHidden) return null;

                    return (
                      <MicroCard
                        key={card.id}
                        card={card}
                        position={posIndex}
                        onClick={() => handleCardClick(card.id)}
                        isFront={posIndex === 0}
                      />
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Expanded modal */}
        <AnimatePresence>
          {selected && activeCard && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleClose}
              />
              <ExpandedCard card={activeCard} onClose={handleClose} />
            </div>
          )}
        </AnimatePresence>
      </section>
    </LayoutGroup>
  );
}

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Link } from "react-router-dom";
import { CheckCircle2, RefreshCw, X, ArrowRight } from "lucide-react";

// Ultra-premium minimal hero inspired by 2025 SaaS design
const cardsSeed = [
  {
    id: "global",
    title: "Global Edge",
    subtitle: "Instantly distributed and performant",
    description:
      "Tiny tiles, huge impact — deploy close to users with fast, predictable performance.",
    features: ["Edge-first delivery", "Zero config CDN", "Observability"],
    image: "/assets/hero-global.jpg",
  },
  {
    id: "secure",
    title: "Fortified",
    subtitle: "Security that stays out of the way",
    description: "Built-in controls and minimal surface area for fast, secure defaults.",
    features: ["WAF & TLS", "Least-privilege access", "Audit trails"],
    image: "/assets/hero-secure.jpg",
  },
  {
    id: "velocity",
    title: "Velocity",
    subtitle: "Developer-first ergonomics",
    description: "Ship features faster with a tiny, delightful DX and reliable infra.",
    features: ["Instant preview", "Lightweight CLI", "Observability"],
    image: "/assets/hero-velocity.jpg",
  },
];

const spring = { type: "spring", stiffness: 200, damping: 28 };

const MicroBackground = () => (
  <svg
    className="absolute inset-0 w-full h-full pointer-events-none opacity-10"
    preserveAspectRatio="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 800 600"
  >
    <defs>
      <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse">
        <circle cx="1" cy="1" r="0.8" fill="currentColor" />
      </pattern>
      <radialGradient id="accent" cx="50%" cy="30%">
        <stop offset="0%" stopColor="#0066ff" stopOpacity="0.12" />
        <stop offset="100%" stopColor="#00e5ff" stopOpacity="0" />
      </radialGradient>
    </defs>

    <rect width="100%" height="100%" fill="url(#dots)" />
    <rect width="100%" height="100%" fill="url(#accent)" />
  </svg>
);

const CardTile = ({ card, position, onClick, isFront }) => {
  const variants = {
    front: { zIndex: 40, scale: 1, rotateX: 0, y: 0, opacity: 1 },
    mid: { zIndex: 30, scale: 0.96, rotateX: 2.5, y: -18, opacity: 0.92 },
    back: { zIndex: 20, scale: 0.92, rotateX: 5, y: -36, opacity: 0.78 },
  };

  const state = position === 0 ? "front" : position === 1 ? "mid" : "back";

  return (
    <motion.div
      layoutId={`card-${card.id}`}
      initial={false}
      animate={state}
      variants={variants}
      transition={spring}
      onClick={onClick}
      className={`absolute inset-0 rounded-2xl overflow-hidden shadow-xl transform-gpu cursor-pointer select-none bg-[linear-gradient(180deg,#0f1724,rgba(15,23,36,0.8))]`}
      style={{
        maxWidth: 320,
        width: "100%",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

      <div className="relative z-10 p-6 flex flex-col justify-end h-full text-white">
        <div className="flex items-center gap-4 mb-4">
          <div
            className="w-12 h-12 rounded-lg flex items-center justify-center"
            style={{ background: "linear-gradient(135deg,#0366ff,#00e5ff)" }}
          >
            <CheckCircle2 size={20} className="text-white" />
          </div>

          <div className="min-w-0">
            <h4 className="text-lg font-semibold leading-tight truncate">{card.title}</h4>
            <p className="text-sm opacity-90 truncate">{card.subtitle}</p>
          </div>
        </div>

        <p className="text-sm text-white/80 mb-4 line-clamp-2">{card.description}</p>

        {isFront && (
          <div className="flex items-center justify-between">
            <button className="px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 text-white text-sm font-medium">
              Explore
            </button>
            <div className="text-xs text-white/70">{card.features.slice(0, 2).join(" • ")}</div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default function HeroPremium() {
  const [order, setOrder] = useState([0, 1, 2]);
  const [selected, setSelected] = useState(null);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (selected || !auto) return undefined;
    const t = setInterval(() => {
      setOrder((prev) => {
        const next = [...prev];
        const first = next.shift();
        if (typeof first !== "undefined") next.push(first);
        return next;
      });
    }, 7000);
    return () => clearInterval(t);
  }, [selected, auto]);

  const open = (id) => {
    setSelected(id);
    setAuto(false);
  };

  const close = () => {
    setSelected(null);
    setAuto(true);
  };

  const active = cardsSeed.find((c) => c.id === selected);

  return (
    <LayoutGroup>
      <section className="relative min-h-[520px] flex items-center justify-center overflow-hidden bg-white text-slate-900 font-sans">
        <div className="absolute inset-0 pointer-events-none">
          <MicroBackground />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 py-12">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900">
                A minimal platform for teams who value speed.
              </h1>
              <p className="mt-4 text-lg text-slate-700 max-w-prose">
                Compact, composable tools with a refined developer experience and
                enterprise-grade primitives. Small tiles, big outcomes.
              </p>

              <div className="mt-6 flex items-center gap-4">
                <Link
                  to="/get-started"
                  className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-400 text-white font-semibold shadow-sm"
                >
                  Get started
                </Link>

                <button
                  onClick={() => setAuto((s) => !s)}
                  className="px-4 py-2 rounded-lg bg-white/6 backdrop-blur-sm border border-white/6 text-slate-900 text-sm"
                >
                  <RefreshCw size={14} />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div
                className="relative w-[320px] h-[420px] perspective-1000"
                style={{ perspective: 1200 }}
              >
                <AnimatePresence initial={false} mode="popLayout">
                  {[0, 1, 2].map((i) => {
                    const pos = order.indexOf(i);
                    const card = cardsSeed[i];
                    // hide the active card on desktop to show expanded view
                    const hide = selected === card.id && window.innerWidth >= 1024;
                    if (hide) return null;

                    return (
                      <div
                        key={card.id}
                        className={`absolute inset-0 px-2`}>
                        <CardTile
                          card={card}
                          position={pos}
                          onClick={() => open(card.id)}
                          isFront={pos === 0}
                        />
                      </div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {selected && active && (
            <div className="fixed inset-0 z-50 flex items-end lg:items-center justify-center">
              <motion.div
                className="absolute inset-0 bg-black/40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={close}
              />

              {/* Desktop expanded card */}
              <motion.div
                layoutId={`card-${active.id}`}
                className="relative w-full max-w-3xl mx-4 lg:mx-0 bg-white rounded-2xl shadow-2xl overflow-hidden"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={spring}
              >
                <div className="p-6 lg:p-8">
                  <div className="flex items-start justify-between gap-6">
                    <div className="min-w-0">
                      <h3 className="text-2xl font-bold text-slate-900">{active.title}</h3>
                      <p className="mt-2 text-slate-700">{active.subtitle}</p>
                      <p className="mt-4 text-slate-700">{active.description}</p>
                    </div>

                    <div className="flex-shrink-0">
                      <button
                        onClick={close}
                        className="p-2 rounded-lg bg-white/6 backdrop-blur-sm border border-white/8"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {active.features.map((f) => (
                      <div
                        key={f}
                        className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100"
                      >
                        <CheckCircle2 size={18} className="text-blue-600" />
                        <div className="text-sm text-slate-800">{f}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-400 text-white font-semibold">
                      Learn more
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </section>
    </LayoutGroup>
  );
}

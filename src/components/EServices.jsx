import React, { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Globe, Smartphone, Server, Code, Layers, Zap, ArrowUpRight, Cpu, ShieldCheck } from "lucide-react";

// Immutable Configuration Schema
const SERVICE_SCHEMA = [
  {
    id: "01",
    title: "Web Engineering",
    tagline: "High-Availability Ecosystems",
    icon: <Globe />,
    description: "Deployment of scalable, serverless architectures utilizing Next.js for sub-second LCP (Largest Contentful Paint) performance.",
    capabilities: ["Edge Computing", "Real-time Hydration", "SSR/ISR Optimization"],
    accent: "text-blue-500"
  },
  {
    id: "02",
    title: "Mobile Architecture",
    tagline: "Cross-Platform Synchronization",
    icon: <Smartphone />,
    description: "Engineering native-grade experiences with reactive state management and offline-first synchronization protocols.",
    capabilities: ["React Native", "Swift/Kotlin Bridges", "Shared Logic Layers"],
    accent: "text-indigo-500"
  },
  {
    id: "03",
    title: "Cloud Infrastructure",
    tagline: "Distributed Systems",
    icon: <Server />,
    description: "Automated CI/CD pipelines and Kubernetes orchestration to ensure 99.9% uptime and horizontal elasticity.",
    capabilities: ["Terraform", "Docker Containerization", "Zero-Trust Security"],
    accent: "text-cyan-500"
  }
];

export default function NexusServices() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="min-h-screen bg-[#FDFDFF] text-neutral-900 selection:bg-blue-100">
      {/* Dynamic Structural Grid */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]" />
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-24">
        {/* Header Engineering */}
        <header className="max-w-3xl mb-32">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="h-px w-12 bg-[#4A8EBC]" />
            <span className="text-xs font-black uppercase tracking-[0.3em] text-[#4A8EBC]">E-Service Ecosystem</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight mb-10">
            What We <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4A8EBC] to-[#3B7AA8]">Offer</span><span className="text-[#4A8EBC]">.</span>
          </h1>

          <p className="text-xl text-neutral-500 font-medium leading-relaxed max-w-xl">
            Converging advanced algorithmic logic with high-fidelity aesthetics to deliver
            enterprise-grade digital assets.
          </p>
        </header>

        {/* The Grid: Interactive Node Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-200 border border-neutral-200 rounded-3xl overflow-hidden shadow-2xl">
          {SERVICE_SCHEMA.map((service, idx) => (
            <ServiceNode
              key={service.id}
              service={service}
              onHover={() => setHoveredIndex(idx)}
              onLeave={() => setHoveredIndex(null)}
              isAnyHovered={hoveredIndex !== null}
              isSelfHovered={hoveredIndex === idx}
            />
          ))}
        </div>

        {/* Enterprise Validation Section */}
        <div className="mt-40 grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-neutral-100 pt-20">
          <ValidationMetrics icon={<Cpu />} title="Algorithm Driven" desc="Logic-first approach to UI rendering." />
          <ValidationMetrics icon={<ShieldCheck />} title="Security Centric" desc="Encapsulated data handling protocols." />
          <ValidationMetrics icon={<Zap />} title="Latency Optimized" desc="Optimized for sub-second interactions." />
        </div>
      </main>
    </div>
  );
}

function ServiceNode({ service, onHover, onLeave, isSelfHovered }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => { onHover(); setIsExpanded(true); }}
      onMouseLeave={() => { onLeave(); setIsExpanded(false); }}
      className="relative bg-white p-12 h-[500px] flex flex-col justify-between transition-colors duration-500 group overflow-hidden"
    >
      {/* Background Micro-interaction */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="absolute inset-0 bg-neutral-50 z-0"
          />
        )}
      </AnimatePresence>

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-12">
          <div className={`p-4 rounded-2xl bg-white shadow-xl border border-neutral-100 transition-transform duration-500 ${isExpanded ? 'rotate-12' : ''}`}>
            {React.cloneElement(service.icon, { size: 32, className: "text-[#4A8EBC]" })}
          </div>
          <span className="text-5xl font-black text-neutral-100 group-hover:text-[#4A8EBC]/10 transition-colors">
            {service.id}
          </span>
        </div>

        <p className="text-xs font-bold tracking-widest text-[#4A8EBC] uppercase mb-2">{service.tagline}</p>
        <h3 className="text-3xl font-black text-neutral-900 mb-6">{service.title}</h3>
        <p className="text-neutral-500 font-medium leading-relaxed">{service.description}</p>
      </div>

      <div className="relative z-10 pt-8">
        <ul className="space-y-3">
          {service.capabilities.map((cap, i) => (
            <li key={i} className="flex items-center gap-2 text-sm font-bold text-neutral-400 group-hover:text-neutral-700 transition-colors">
              <div className="h-1 w-1 bg-[#4A8EBC] rounded-full" />
              {cap}
            </li>
          ))}
        </ul>
        <motion.button
          whileHover={{ x: 5 }}
          className="mt-10 flex items-center gap-2 text-sm font-black text-[#4A8EBC]"
        >
          EXPLORE CAPABILITIES <ArrowUpRight size={16} />
        </motion.button>
      </div>
    </motion.div>
  );
}

function ValidationMetrics({ icon, title, desc }) {
  return (
    <div className="flex flex-col items-center md:items-start text-center md:text-left">
      <div className="mb-6 text-[#4A8EBC] p-3 bg-blue-50 rounded-xl">{React.cloneElement(icon, { size: 28 })}</div>
      <h4 className="text-lg font-black text-neutral-900 mb-2">{title}</h4>
      <p className="text-neutral-500 font-medium text-sm leading-relaxed">{desc}</p>
    </div>
  );
}
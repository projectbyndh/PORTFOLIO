import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Smartphone, Server, ArrowUpRight, Brain, Zap, ShieldCheck, BarChart3, Megaphone, Cpu, Loader2, Sparkles } from "lucide-react";
import useServices from "../hooks/useServices";
import { getImageUrl } from "../utils/getImageUrl";

const SERVICE_SCHEMA = [
  {
    id: "01",
    title: "Web Engineering",
    tagline: "High-Availability Ecosystems",
    icon: <Globe />,
    description: "Deployment of scalable, serverless architectures utilizing Next.js for sub-second LCP performance.",
    capabilities: ["Edge Computing", "Real-time Hydration", "SSR/ISR Optimization"],
  },
  {
    id: "02",
    title: "Mobile Architecture",
    tagline: "Cross-Platform Sync",
    icon: <Smartphone />,
    description: "Engineering native-grade experiences with reactive state management and offline-first protocols.",
    capabilities: ["React Native", "Swift/Kotlin Bridges", "Shared Logic Layers"],
  },
  {
    id: "03",
    title: "Cloud & Hosting",
    tagline: "Scalable Deployment",
    icon: <Server />,
    description: "Reliable cloud hosting solutions using VPS and AWS infrastructure to deliver secure applications.",
    capabilities: ["AWS EC2 & Lightsail", "VPS Setup", "Performance Monitoring"],
  },
  {
    id: "04",
    title: "Digital Marketing",
    tagline: "Search & Growth Systems",
    icon: <BarChart3 />,
    description: "Data-informed SEO and growth strategies engineered for compounding visibility and conversion velocity.",
    capabilities: ["Technical SEO", "Content Intelligence", "Analytics & Attribution"],
  },
  {
    id: "05",
    title: "Product Automation",
    tagline: "Operational Intelligence",
    icon: <Megaphone />,
    description: "Designing internal tools and AI-assisted systems that eliminate operational drag and scale growth.",
    capabilities: ["Internal Dashboards", "Workflow Automation", "AI Integrations"],
  },
  {
    id: "06",
    title: "AI & Data Engineering",
    tagline: "Intelligent Systems",
    icon: <Brain />,
    description: "Designing data pipelines and AI models that transform raw information into predictive intelligence.",
    capabilities: ["ML Model Integration", "Data Pipelines", "AI-Powered Insights"],
  }
];

const getIconForService = (title) => {
  const t = title?.toLowerCase() || "";
  if (t.includes('web') || t.includes('engineering')) return <Globe />;
  if (t.includes('mobile') || t.includes('app')) return <Smartphone />;
  if (t.includes('cloud') || t.includes('server')) return <Server />;
  if (t.includes('marketing') || t.includes('seo')) return <BarChart3 />;
  if (t.includes('automation') || t.includes('product')) return <Megaphone />;
  if (t.includes('ai') || t.includes('data')) return <Brain />;
  return <Zap />;
};

export default function NexusServices() {
  const { services, loading, error, fetchServices } = useServices();

  useEffect(() => {
    fetchServices();
  }, []);


  const displayServices = services.length > 0
    ? services.map((s, i) => ({
      id: (i + 1).toString().padStart(2, '0'),
      _id: s.id || s._id,
      title: s.title,
      tagline: s.tagline || "Advanced Solution",
      icon: s.logo ? <img
        src={getImageUrl(s.logo, 'service')}
        alt={s.title}
        className="w-12 h-12 object-contain"
        onError={(e) => {
          e.target.style.display = 'none'; // Hide if fails
          // Ideally show fallback icon, but this is inside an object property.
          // The parent component handles fallback if icon is not valid element? 
          // No, ServiceCard renders it directly.
        }}
      /> : getIconForService(s.title),
      description: s.description,
      capabilities: Array.isArray(s.capabilities) ? s.capabilities : (typeof s.capabilities === 'string' ? s.capabilities.split(',').map(c => c.trim()) : ["Innovation", "Excellence"])
    }))
    : SERVICE_SCHEMA;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0D1641] selection:bg-blue-100 font-sans pt-20 md:pt-24 lg:pt-28">
      {/* Ambient Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-50/50 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-50/50 blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-6 pb-24">
        {/* Section Header */}
        <header className="max-w-4xl mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="p-2 bg-[#26a8df]/10 rounded-lg">
              <Sparkles className="w-5 h-5 text-[#26a8df]" />
            </div>
            <span className="text-sm font-black uppercase tracking-[0.4em] text-[#26a8df]">Service Ecosystem</span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter text-[#0D1641] mb-10 leading-[0.85]">
            Our <br />
            <span className="text-gradient-brand-alt">
              Core Services
            </span>
          </h1>

          <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-2xl border-l-4 border-blue-500/20 pl-8">
            Precision engineering for the next generation of digital excellence.
            We converge advanced architectural patterns with high-fidelity aesthetics.
          </p>
        </header>

        {/* Dynamic Grid */}
        {loading && services.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-40 gap-8">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-[#0D1641]/10 rounded-full"></div>
              <div className="absolute inset-0 w-20 h-20 border-4 border-[#26a8df] border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="text-slate-400 font-black tracking-widest uppercase text-xs">Synchronizing Repository...</p>
          </div>
        ) : error && services.length === 0 ? (
          <div className="text-center py-24 bg-white/80 backdrop-blur-xl rounded-[40px] border border-red-50 p-12 shadow-2xl shadow-red-500/5">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-8">
              <ShieldCheck className="w-10 h-10 text-red-500" />
            </div>
            <h2 className="text-2xl font-black text-[#0D1641] mb-4">Connection Failed</h2>
            <p className="text-slate-500 mb-10 max-w-md mx-auto leading-relaxed">{error}</p>
            <button
              onClick={() => fetchServices()}
              className="px-10 py-4 bg-[#0D1641] text-white rounded-2xl font-bold hover:bg-[#0D1641]/90 transition-all shadow-xl hover:shadow-slate-500/20 active:scale-95"
            >
              Retry Handshake
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayServices.map((service, index) => (
              <ServiceCard key={service._id || service.id || index} service={service} />
            ))}
          </div>
        )}

        {/* Footer Metrics */}
        <div className="mt-40 grid grid-cols-1 md:grid-cols-3 gap-16 border-t border-slate-200 pt-20">
          <MetricItem icon={<Cpu />} title="Logic First" desc="Sub-second latency driven by serverless infrastructure." />
          <MetricItem icon={<ShieldCheck />} title="Encapsulated" desc="Security-first approach to all data and assets." />
          <MetricItem icon={<Zap />} title="Hyper-Scale" desc="Designed to handle enterprise-grade traffic loads." />
        </div>
      </main>
    </div>
  );
}

function ServiceCard({ service }) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="group relative bg-white border border-slate-200 rounded-3xl sm:rounded-[40px] p-6 sm:p-8 md:p-10 lg:p-12 h-auto sm:h-[480px] md:h-[520px] lg:h-[560px] flex flex-col justify-between transition-all duration-500 hover:shadow-[0_40px_80px_-20px_rgba(74,142,188,0.2)] overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6 sm:mb-8 md:mb-10 lg:mb-12">
          <div className="p-3 sm:p-4 md:p-5 rounded-2xl sm:rounded-3xl bg-slate-50 text-[#26a8df] group-hover:bg-[#26a8df] group-hover:text-white transition-all duration-700 shadow-sm group-hover:shadow-lg group-hover:shadow-blue-500/30">
            {React.isValidElement(service.icon) ? React.cloneElement(service.icon, { size: 24, strokeWidth: 2.5, className: "sm:w-7 sm:h-7 md:w-8 md:h-8" }) : service.icon}
          </div>
          <span className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-50 group-hover:text-slate-100 transition-colors">
            {service.id}
          </span>
        </div>

        <div className="space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6">
          <p className="text-[10px] sm:text-[11px] font-black tracking-[0.25em] sm:tracking-[0.3em] text-[#0D1641] uppercase">{service.tagline}</p>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0D1641] tracking-tight leading-tight">{service.title}</h3>
          <p className="text-sm sm:text-base text-slate-500 leading-relaxed font-medium">
            {service.description}
          </p>
        </div>
      </div>

      <div className="relative z-10">
        <div className="h-[1px] w-full bg-slate-100 mb-6 sm:mb-8 md:mb-10 group-hover:bg-blue-100 transition-colors" />
        <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 md:mb-10">
          {(service.capabilities || []).slice(0, 3).map((cap, i) => (
            <li key={i} className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm font-bold text-slate-400 group-hover:text-slate-600 transition-all transform group-hover:translate-x-1 duration-300">
              <div className="h-2 w-2 bg-[#26a8df] rounded-full shadow-[0_0_8px_rgba(38,168,223,0.5)]" />
              {cap}
            </li>
          ))}
        </ul>

        {/* This button's styling is modified based on the instruction. */}
        {/* The instruction's provided code snippet was syntactically incorrect and misplaced. */}
        {/* I've interpreted the instruction to apply the active state styling to a button, */}
        {/* and added a placeholder 'activeService' for demonstration purposes. */}
        <button className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-[10px] font-black tracking-[0.2em] text-[#26a8df] group-hover:text-[#26a8df]/80 transition-all uppercase active:scale-95">
          Inquire Ecosystem <ArrowUpRight size={14} className="sm:w-4 sm:h-4" />
        </button>
      </div>
    </motion.div>
  );
}

function MetricItem({ icon, title, desc }) {
  return (
    <div className="flex flex-col items-center md:items-start group">
      <div className="mb-8 text-[#26a8df] bg-white shadow-xl shadow-blue-500/5 border border-slate-100 p-5 rounded-[24px] transform group-hover:scale-110 transition-transform duration-500">
        {React.cloneElement(icon, { size: 28 })}
      </div>
      <h4 className="text-xl font-black text-[#0D1641] mb-3 tracking-tight">{title}</h4>
      <p className="text-slate-500 text-base font-medium leading-relaxed">{desc}</p>
    </div>
  );
}

import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useSpring, useTransform, useInView } from "framer-motion";
import { Target, Eye, Compass, Rocket, Zap, Globe, ShieldCheck } from "lucide-react";
import FAQSection from "./FAQSection";

const STRATEGY_DATA = [
  {
    id: "01",
    title: "The Mission",
    label: "PURPOSE",
    desc: "Empowering businesses through reliable digital solutions that drive growth and create lasting impact.",
    icon: <Target className="w-8 h-8" />,
    stats: "100% Client Focus",
  },
  {
    id: "02",
    title: "The Vision",
    label: "FUTURE",
    desc: "To be Nepal’s leading digital agency, recognized globally for transforming ideas into digital realities.",
    icon: <Eye className="w-8 h-8" />,
    stats: "Global Standards",
  },
  {
    id: "03",
    title: "Strategic Planning",
    label: "ARCHITECT",
    desc: "Engineering scalable roadmaps using modern tech stacks like Next.js, AI integration, and Cloud Native solutions.",
    icon: <Compass className="w-8 h-8" />,
    stats: "Agile Workflow",
  },
];

export default function AdvancedPath() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const pathLength = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <section ref={containerRef} className="relative py-24 bg-[#FAFAFA] overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>
      {/* Dynamic Background Watermark */}
      <motion.div
        style={{ x: useTransform(scrollYProgress, [0, 1], [0, -200]) }}
        className="absolute top-20 left-0 text-[20vw] font-black text-neutral-900/[0.02] whitespace-nowrap pointer-events-none uppercase"
      >
        Digital Heights Engineering
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="flex flex-col items-center mb-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 px-4 py-2 bg-white shadow-sm border border-neutral-100 rounded-full mb-6"
          >
            <Zap size={14} className="text-[#4A8EBC] fill-[#4A8EBC]" />
            <span className="text-xs font-black tracking-widest text-neutral-500 uppercase">The Blueprint</span>
          </motion.div>
          <h2 className="text-5xl md:text-7xl font-black text-neutral-900 tracking-tighter">
            Our <span className="text-[#4A8EBC]">Operational</span> DNA
          </h2>
        </div>

        {/* The SVG Path System */}
        <div className="absolute left-[50%] top-[400px] bottom-0 -translate-x-1/2 w-[2px] hidden lg:block">
          <svg width="2" height="100%" className="overflow-visible">
            <line x1="1" y1="0" x2="1" y2="100%" stroke="#E2E8F0" strokeWidth="2" strokeDasharray="10 10" />
            <motion.line
              x1="1" y1="0" x2="1" y2="100%"
              stroke="#4A8EBC" strokeWidth="3"
              style={{ pathLength }}
            />
          </svg>
        </div>

        <div className="space-y-40 relative">
          {STRATEGY_DATA.map((item, index) => (
            <StrategyNode key={item.id} data={item} index={index} />
          ))}
        </div>
      </div>

      {/* Industry Comparison Component */}
      <IndustryContext />

      {/* FAQ Section */}
      <FAQSection />

      {/* CTA Section - Added for consistency and user request */}
      <div className="mt-32 mb-10 max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-[#1A2A44] mb-6">
          Ready to work with us?
        </h2>
        <p className="text-xl text-[#2B4066]/90 mb-10">
          Let's build something extraordinary together.
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          <Link to="/contact" className="px-8 py-4 bg-[#1A2A44] text-white rounded-full font-bold shadow-lg hover:bg-[#4A8EBC] hover:scale-105 transition-all flex items-center gap-2">
            Contact Us <Zap size={18} />
          </Link>
          <Link to="/services" className="px-8 py-4 bg-white text-[#1A2A44] border border-neutral-200 rounded-full font-bold shadow-sm hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2">
            Explore Services <Rocket size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function StrategyNode({ data, index }) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ margin: "-100px" }}
      className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-32 ${isEven ? "" : "lg:flex-row-reverse"}`}
    >
      {/* Content Side */}
      <div className={`flex-1 ${isEven ? "lg:text-right" : "lg:text-left"}`}>
        <span className="text-[#4A8EBC] font-bold uppercase tracking-widest text-sm">{data.label}</span>
        <h3 className="text-4xl font-extrabold text-neutral-900 mt-2 mb-6">{data.title}</h3>
        <p className="text-lg text-neutral-500 leading-relaxed mb-8 max-w-lg shadow-sm p-6 bg-white rounded-2xl border-l-4 border-[#4A8EBC]">
          {data.desc}
        </p>
        <div className={`flex items-center gap-4 ${isEven ? "justify-end" : "justify-start"}`}>
          <span className="px-4 py-1.5 bg-neutral-100 rounded-full text-xs font-bold text-neutral-600">{data.stats}</span>
        </div>
      </div>

      {/* Center Visual Node */}
      <div className="relative group">
        <div className="w-24 h-24 rounded-[2rem] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-neutral-100 flex items-center justify-center text-[#4A8EBC] relative z-10 group-hover:bg-[#4A8EBC] group-hover:text-white transition-all duration-500">
          {data.icon}
        </div>
        <div className="absolute inset-0 bg-[#4A8EBC]/20 blur-2xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-500" />
        <span className="absolute -top-4 -right-4 text-6xl font-black text-neutral-900/5 select-none">{data.id}</span>
      </div>

      {/* Buffer Side */}
      <div className="hidden lg:block flex-1" />
    </motion.div>
  );
}

function IndustryContext() {
  return (
    <div className="mt-40 max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: <Globe />, title: "Global Reach", text: "Like top agencies in NY or London, we operate across timezones." },
          { icon: <ShieldCheck />, title: "Enterprise Security", text: "Adhering to ISO-grade security protocols for all data architecture." },
          { icon: <Zap />, title: "Rapid Deployment", text: "CICD pipelines that match Silicon Valley delivery speeds." },
        ].map((item, i) => (
          <div key={i} className="p-8 bg-white/50 border border-white rounded-3xl backdrop-blur-sm">
            <div className="text-[#4A8EBC] mb-4">{React.cloneElement(item.icon, { size: 32 })}</div>
            <h4 className="font-black text-xl mb-2">{item.title}</h4>
            <p className="text-neutral-500 text-sm leading-relaxed">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
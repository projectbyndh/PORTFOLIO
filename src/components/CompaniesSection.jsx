import React from 'react';
import { motion } from 'framer-motion';
import usePartners from '../hooks/usePartners';
import Loader from './Loader';
import { Sparkles } from 'lucide-react';

export default function CompaniesSection() {
  const { partners, loading } = usePartners();

  // Duplicate the array for seamless looping if we have partners
  const marqueePartners = partners && partners.length > 0 ? [...partners, ...partners, ...partners] : [];

  if (loading && partners.length === 0) {
    return (
      <section className="py-20 bg-[#FAFAFA] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
          <Loader />
        </div>
      </section>
    );
  }

  if (!partners || partners.length === 0) {
    return null; // Don't show section if no partners
  }

  return (
    <section className="relative pt-32 pb-20 bg-[#FAFAFA] overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#4A8EBC]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#3B7AA8]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm border border-white/40 rounded-full mb-6 shadow-sm">
            <Sparkles size={14} className="text-[#4A8EBC]" />
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-600">Trusted By</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-neutral-900 tracking-tight">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4A8EBC] to-[#3B7AA8]">Partners</span>
          </h2>
        </motion.div>

        {/* Marquee Container with Glassmorphic Border */}
        <div className="relative">
          <div className="absolute inset-0 bg-white/40 backdrop-blur-sm rounded-3xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.06)]" />

          <div className="relative overflow-hidden py-12 px-8">
            {/* Gradient Fade Edges */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#FAFAFA] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#FAFAFA] to-transparent z-10 pointer-events-none" />

            <div
              className="flex items-center gap-16"
              style={{
                width: 'max-content',
                animation: `marquee ${Math.max(30, partners.length * 6)}s linear infinite`,
              }}
            >
              {marqueePartners.map((company, idx) => (
                <motion.div
                  key={(company._id || company.id) + '-' + idx}
                  className="group flex flex-col items-center min-w-[140px]"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="relative mb-3">
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#4A8EBC]/20 to-[#3B7AA8]/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="relative w-24 h-24 rounded-2xl bg-white border border-neutral-200/50 shadow-lg group-hover:shadow-xl group-hover:border-[#4A8EBC]/30 transition-all duration-300 p-3 flex items-center justify-center overflow-hidden">
                      <img
                        src={company.image || company.logoUrl}
                        alt={company.name}
                        className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  </div>
                  <span className="text-sm font-bold text-neutral-600 group-hover:text-[#4A8EBC] text-center whitespace-nowrap transition-colors duration-300">
                    {company.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Marquee animation keyframes */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>
    </section>
  );
}

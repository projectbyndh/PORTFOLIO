import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Users, Award, Zap, CheckCircle2, Users2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import usePartners from '../hooks/usePartners';
import useProjects from '../hooks/useProjects';
import useTeamStructureSimplified from '../hooks/useTeamStructureSimplified';

function Refer() {
  const { partners } = usePartners();
  const { projects } = useProjects();
  const { members: teams } = useTeamStructureSimplified();

  const stats = useMemo(() => [
    { icon: Users, value: partners.length > 5 ? `${partners.length}+` : partners.length || '50+', label: 'Clients' },
    { icon: Award, value: projects.length > 5 ? `${projects.length}+` : projects.length || '50+', label: 'Projects Delivered' },
    { icon: Zap, value: '99%', label: 'Client Satisfaction' },
    { icon: Users2, value: teams.length > 5 ? `${teams.length}+` : teams.length || '15+', label: 'Team Members' },
  ], [partners.length, projects.length, teams.length]);

  const benefits = [
    'Free Consultation & Strategy Session',
    'Dedicated Project Manager',
    'Agile Development Process',
    '24/7 Support & Maintenance',
    'Scalable & Future-Proof Solutions',
    'Transparent Pricing & Timeline',
  ];

  return (
    <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-[#FAFAFA] via-white to-[#FAFAFA] overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#4A8EBC]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#3B7AA8]/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6 mb-10 sm:mb-12 md:mb-14 lg:mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-white/60 backdrop-blur-xl rounded-[1.25rem] sm:rounded-[1.5rem] md:rounded-[2rem] p-4 sm:p-5 md:p-6 lg:p-8 border border-white/60 shadow-lg hover:shadow-2xl transition-all duration-500 text-center"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#4A8EBC]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[1.25rem] sm:rounded-[1.5rem] md:rounded-[2rem]" />

              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#4A8EBC] to-[#3B7AA8] mb-2 sm:mb-3 md:mb-4 shadow-[0_0_20px_rgba(74,142,188,0.3)]">
                  <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-white" />
                </div>
                <h3 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-black text-neutral-900 mb-1 sm:mb-1.5 md:mb-2 bg-gradient-to-r from-[#4A8EBC] to-[#3B7AA8] bg-clip-text text-transparent">
                  {stat.value}
                </h3>
                <p className="text-neutral-600 font-semibold text-xs sm:text-sm md:text-base">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-white/70 backdrop-blur-2xl rounded-[2rem] sm:rounded-[2.5rem] md:rounded-[3rem] p-6 sm:p-8 md:p-10 lg:p-12 xl:p-16 border border-white/60 shadow-[0_20px_60px_rgba(0,0,0,0.08)] overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#4A8EBC]/10 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-[#3B7AA8]/10 to-transparent rounded-full blur-3xl" />

          <div className="relative z-10">
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/60 backdrop-blur-sm border border-white/40 rounded-full mb-4 sm:mb-5 md:mb-6 shadow-sm"
              >
                <Sparkles size={12} className="text-[#4A8EBC] sm:w-3.5 sm:h-3.5" />
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-widest text-neutral-600">Let's Build Together</span>
              </motion.div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-neutral-900 mb-4 sm:mb-5 md:mb-6 tracking-tight">
                Ready to Transform Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4A8EBC] via-[#3B7AA8] to-[#2D5F8C]">
                  Digital Presence?
                </span>
              </h2>

              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-neutral-600 max-w-3xl mx-auto mb-8 sm:mb-10 md:mb-12 px-4">
                Join hundreds of satisfied clients who've transformed their businesses with our innovative solutions.
                Let's discuss how we can help you achieve your goals.
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3 md:gap-4 mb-8 sm:mb-10 md:mb-12">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="flex items-center gap-2 sm:gap-2.5 md:gap-3 bg-white/60 backdrop-blur-sm rounded-xl sm:rounded-2xl p-2.5 sm:p-3 md:p-4 border border-white/40"
                >
                  <CheckCircle2 className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#4A8EBC] flex-shrink-0" />
                  <span className="text-xs sm:text-xs md:text-sm font-semibold text-neutral-700">{benefit}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Link
                to="/contact"
                className="group relative inline-flex items-center justify-center gap-2 sm:gap-2.5 bg-gradient-to-r from-[#4A8EBC] to-[#3B7AA8] text-white font-bold py-3.5 sm:py-3 md:py-3.5 lg:py-2.5 px-8 sm:px-7 md:px-8 lg:px-6 rounded-xl sm:rounded-2xl lg:rounded-xl text-base sm:text-base md:text-base lg:text-sm shadow-[0_0_30px_rgba(74,142,188,0.4),0_8px_16px_rgba(74,142,188,0.2)] hover:scale-105 transition-all duration-300 overflow-hidden w-full sm:w-auto max-w-sm sm:max-w-none"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#5A9ECC] to-[#4B84A8] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10">Start Your Project</span>
                <ArrowRight className="relative z-10 w-5 h-5 sm:w-4 sm:h-4 lg:w-4 lg:h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/case-studies"
                className="inline-flex items-center justify-center gap-2 sm:gap-2 px-8 sm:px-7 md:px-8 lg:px-6 py-3.5 sm:py-3 md:py-3.5 lg:py-2.5 bg-white/80 backdrop-blur-sm text-neutral-700 border-2 border-neutral-200/50 rounded-xl sm:rounded-2xl lg:rounded-xl font-bold text-base sm:text-base md:text-base lg:text-sm hover:bg-white hover:border-[#4A8EBC] hover:text-[#4A8EBC] hover:shadow-lg transition-all duration-300 w-full sm:w-auto max-w-sm sm:max-w-none"
              >
                View Our Work
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Refer;
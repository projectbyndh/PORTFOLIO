import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import usePartners from '../hooks/usePartners';
import Loader from './Loader';

const PartnersSection = () => {
    const { partners, loading, error } = usePartners();

    if (loading) return <Loader />;
    if (error) return null; // Silently fail if no partners

    if (partners.length === 0) return null; // Don't show section if no partners

    return (
        <section className="relative w-full bg-[#FAFAFA] py-24 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
                <div className="absolute top-0 left-0 w-full h-full opacity-[0.03]"
                    style={{ backgroundImage: `radial-gradient(#4A8EBC 1.5px, transparent 1.5px)`, backgroundSize: '40px 40px' }} />
                <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-400/10 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="mb-16 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-blue-100 shadow-sm mb-6 hover:shadow-md transition-shadow"
                    >
                        <Sparkles size={14} className="text-[#4A8EBC]" />
                        <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#4A8EBC]">
                            Trusted Partnerships
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-6xl font-black text-neutral-900 tracking-tighter leading-tight mb-4"
                    >
                        Powering Success{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4A8EBC] via-[#3B7AA8] to-[#2D5F8C]">
                            Together.
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-neutral-500 max-w-2xl mx-auto font-medium"
                    >
                        Collaborating with industry leaders to deliver exceptional digital experiences.
                    </motion.p>
                </div>

                {/* Partners Grid */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                >
                    {partners.map((partner, index) => (
                        <motion.div
                            key={partner._id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -8, scale: 1.02 }}
                            className="group relative bg-white rounded-3xl p-8 border border-neutral-200 shadow-sm hover:shadow-xl transition-all duration-500 flex items-center justify-center overflow-hidden"
                        >
                            {/* Hover Gradient Effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#4A8EBC]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            {/* Spotlight Effect */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-[#4A8EBC]/10 rounded-full blur-3xl" />
                            </div>

                            <div className="relative z-10 w-full h-32 flex items-center justify-center">
                                <img
                                    src={partner.image}
                                    alt={partner.name}
                                    className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500 filter group-hover:brightness-100 brightness-75"
                                    onError={(e) => {
                                        e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23f0f0f0" width="100" height="100"/%3E%3Ctext fill="%234A8EBC" font-family="Arial" font-size="14" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3E' + partner.name + '%3C/text%3E%3C/svg%3E';
                                    }}
                                />
                            </div>

                            {/* Partner Name on Hover */}
                            <div className="absolute bottom-4 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <p className="text-sm font-bold text-neutral-700">{partner.name}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="mt-16 text-center"
                >
                    <p className="text-neutral-500 font-medium mb-4">
                        Want to partner with us?
                    </p>
                    <a
                        href="/contact"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#4A8EBC] to-[#3B7AA8] text-white rounded-2xl font-bold hover:-translate-y-1 transition-all duration-300 shadow-[0_0_30px_rgba(74,142,188,0.4),0_8px_16px_rgba(74,142,188,0.2)]"
                    >
                        Let's Collaborate
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default PartnersSection;

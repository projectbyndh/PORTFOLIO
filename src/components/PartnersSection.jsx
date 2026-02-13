import React from 'react';
import { Link } from 'react-router-dom';
import Marquee from 'react-fast-marquee';
import { motion } from 'framer-motion';
import usePartners from '../hooks/usePartners';
import Loader from './Loader';

const PartnersSection = () => {
    const { partners, loading, error } = usePartners();

    if (loading) return <Loader />;
    if (error || !partners || partners.length === 0) return null;

    // Split partners into 3 rows for the alternating effect
    const count = partners.length;
    const third = Math.ceil(count / 3);

    const row1 = partners.slice(0, third);
    const row2 = partners.slice(third, third * 2);
    const row3 = partners.slice(third * 2);

    const PartnerLogo = ({ partner }) => (
        <div className="mx-12 flex items-center justify-center w-36 h-20 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 hover:scale-110 transition-all duration-500">
            <img
                src={partner.image}
                alt={partner.name}
                className="max-w-full max-h-full object-contain"
                onError={(e) => {
                    e.target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='30'%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='10' fill='%23ccc' text-anchor='middle' dominant-baseline='middle'%3E${partner.name}%3C/text%3E%3C/svg%3E`;
                }}
            />
        </div>
    );

    return (
        <section className="bg-white py-16 sm:py-20 md:py-24 overflow-hidden border-t border-gray-50 relative">
            {/* Background decorative elements */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{ backgroundImage: `radial-gradient(#26a8df 1px, transparent 1px)`, backgroundSize: '30px 30px' }} />

            <div className="max-w-screen-2xl mx-auto relative z-10">
                {/* Header Section */}
                <div className="mb-12 sm:mb-16 md:mb-20 text-center px-4 sm:px-6">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-[9px] sm:text-[10px] font-bold tracking-[0.3em] sm:tracking-[0.4em] uppercase text-blue-500 block mb-3 sm:mb-4"
                    >
                        Global Network
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-[#26a8df] tracking-tight"
                    >
                        Our Strategic <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">Partners</span>
                    </motion.h2>
                </div>

                {/* Marquee Rows */}
                <div className="flex flex-col space-y-6 sm:space-y-8">
                    {/* Row 1: Right to Left (direction="left" is default) */}
                    <Marquee gradient={true} gradientColor="white" gradientWidth={100} speed={40} direction="left" pauseOnHover={true}>
                        {row1.map((partner) => (
                            <PartnerLogo key={partner.id || partner._id} partner={partner} />
                        ))}
                        {/* Repeat for smoother loop if items are few */}
                        {row1.length < 5 && row1.map((partner) => (
                            <PartnerLogo key={`${partner.id || partner._id}-dup`} partner={partner} />
                        ))}
                    </Marquee>

                    {/* Row 2: Left to Right */}
                    {row2.length > 0 && (
                        <Marquee gradient={true} gradientColor="white" gradientWidth={100} speed={45} direction="right" pauseOnHover={true}>
                            {row2.map((partner) => (
                                <PartnerLogo key={partner.id || partner._id} partner={partner} />
                            ))}
                            {row2.length < 5 && row2.map((partner) => (
                                <PartnerLogo key={`${partner.id || partner._id}-dup`} partner={partner} />
                            ))}
                        </Marquee>
                    )}

                    {/* Row 3: Right to Left (Adjusting speed) */}
                    {row3.length > 0 && (
                        <Marquee gradient={true} gradientColor="white" gradientWidth={100} speed={35} direction="left" pauseOnHover={true}>
                            {row3.map((partner) => (
                                <PartnerLogo key={partner.id || partner._id} partner={partner} />
                            ))}
                            {row3.length < 5 && row3.map((partner) => (
                                <PartnerLogo key={`${partner.id || partner._id}-dup`} partner={partner} />
                            ))}
                        </Marquee>
                    )}
                </div>

                {/* Bottom CTA */}
                <div className="mt-24 flex flex-col items-center">
                    <div className="h-px w-24 bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-10" />
                    <Link
                        to="/contact"
                        className="group relative px-8 py-3 bg-white border border-gray-200 rounded-full text-[11px] font-bold tracking-widest uppercase text-gray-500 hover:text-blue-600 hover:border-blue-200 transition-all duration-300 shadow-sm hover:shadow-md"
                    >
                        Become a Partner —
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default PartnersSection;

import React, { useState, useEffect } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from '../api/axios';

export default function FAQSection() {
    const [faqs, setFaqs] = useState([]);
    const [openIndex, setOpenIndex] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFAQs();
    }, []);

    const fetchFAQs = async () => {
        try {
            const response = await axios.get('/api/faqs');
            if (response.data.success) {
                setFaqs(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching FAQs:', error);
            // Use fallback FAQs if API fails
            setFaqs(FALLBACK_FAQS);
        } finally {
            setLoading(false);
        }
    };

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    if (loading) {
        return (
            <div className="py-24 bg-white">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <p className="text-[#26a8df]">Loading FAQs...</p>
                </div>
            </div>
        );
    }

    if (faqs.length === 0) return null;

    return (
        <section className="py-16 sm:py-20 md:py-24 bg-white relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-[#26a8df]/5 animate-pulse-slow blur-3xl" />
                <div className="absolute bottom-40 left-10 w-96 h-96 rounded-full bg-[#26a8df]/5 animate-pulse-slow blur-3xl" />
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-5 md:px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-10 sm:mb-12 md:mb-14 lg:mb-16">
                    <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-[#26a8df]/10 rounded-full mb-4 sm:mb-5 md:mb-6">
                        <HelpCircle size={14} className="text-[#26a8df] sm:w-4 sm:h-4 md:w-[18px] md:h-[18px]" />
                        <span className="text-xs sm:text-sm font-bold text-[#26a8df] uppercase tracking-wider">FAQ</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#26a8df] mb-3 sm:mb-4 px-3">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-sm sm:text-base md:text-lg text-[#26a8df]/80 max-w-2xl mx-auto px-3">
                        Find answers to common questions about our services and processes
                    </p>
                </div>

                {/* FAQ List */}
                <div className="space-y-3 sm:space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={faq.id || index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white/70 backdrop-blur-sm rounded-lg sm:rounded-xl border border-[#26a8df]/10 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full px-3 sm:px-4 md:px-5 lg:px-6 py-3 sm:py-3.5 md:py-4 lg:py-5 flex items-center justify-between text-left hover:bg-[#26a8df]/5 transition-colors"
                            >
                                <span className="font-semibold text-sm sm:text-base text-[#26a8df] pr-3 sm:pr-4">
                                    {faq.question}
                                </span>
                                <ChevronDown
                                    className={`flex-shrink-0 text-[#26a8df] transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''
                                        }`}
                                    size={18}
                                />
                            </button>

                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-3 sm:px-4 md:px-5 lg:px-6 pb-3 sm:pb-4 md:pb-5 text-xs sm:text-sm md:text-base text-[#26a8df]/80 leading-relaxed">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// Fallback FAQs in case API fails
const FALLBACK_FAQS = [
    {
        id: 1,
        question: "What services does Nepal Digital Heights offer?",
        answer: "We offer a comprehensive range of digital services including web development, mobile app development, digital marketing, SEO, UI/UX design, and IT consulting. Our team specializes in creating custom solutions tailored to your business needs."
    },
    {
        id: 2,
        question: "How long does it take to complete a project?",
        answer: "Project timelines vary depending on complexity and scope. A basic website typically takes 2-4 weeks, while more complex applications can take 2-3 months. We provide detailed timelines during the initial consultation and keep you updated throughout the development process."
    },
    {
        id: 3,
        question: "Do you provide ongoing support after project completion?",
        answer: "Yes! We offer comprehensive post-launch support and maintenance packages. This includes bug fixes, updates, security patches, and technical support to ensure your digital solution continues to perform optimally."
    },
    {
        id: 4,
        question: "What is your pricing structure?",
        answer: "Our pricing is project-based and depends on the scope, complexity, and requirements. We provide transparent quotes after understanding your needs. We also offer flexible payment plans to accommodate different budgets."
    },
    {
        id: 5,
        question: "Can you work with clients outside Nepal?",
        answer: "Absolutely! We work with clients globally. Our team is experienced in remote collaboration and we use modern communication tools to ensure smooth project execution regardless of location."
    }
];

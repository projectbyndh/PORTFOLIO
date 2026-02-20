'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../api/apiClient';
import { motion, useScroll, useSpring, useTransform, useInView } from 'framer-motion';
import { Target, Eye, Compass, Rocket, Zap, Globe, ShieldCheck, ChevronDown } from 'lucide-react';

const STRATEGY_DATA = [
  {
    id: '01',
    title: 'Our Goal',
    label: 'PURPOSE',
    desc: 'Helping businesses grow with tech they can trust.',
    icon: <Target className="w-6 h-6" />,
    stats: '100% Client Focus',
  },
  {
    id: '02',
    title: 'The Vision',
    label: 'FUTURE',
    desc: 'To be Nepal\'s leading digital agency, recognized globally for transforming ideas into digital realities.',
    icon: <Eye className="w-6 h-6" />,
    stats: 'Global Standards',
  },
  {
    id: '03',
    title: 'A Clear Plan',
    label: 'ARCHITECT',
    desc: 'We plan your project using the latest technology to make sure it works perfectly.',
    icon: <Compass className="w-6 h-6" />,
    stats: 'Step-by-step updates',
  },
];

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const pathLength = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <main ref={containerRef} className="relative min-h-screen">
      <section className="relative pt-20 md:pt-24 lg:pt-28 pb-12 sm:pb-16 md:pb-20 lg:pb-24 bg-[#FAFAFA]">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </div>

        {/* Dynamic Background Watermark */}
        <motion.div
          style={{ x: useTransform(scrollYProgress, [0, 1], [0, -200]) }}
          className="absolute top-20 left-0 text-[15vw] font-black text-[#26a8df]/[0.02] whitespace-nowrap pointer-events-none uppercase z-0"
        >
          Digital Heights
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          {/* Title Section */}
          <div className="text-center mb-16 md:mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block text-[#26a8df] font-bold uppercase tracking-widest text-xs md:text-sm mb-3 px-4 py-1.5 rounded-full bg-[#26a8df]/10">
                Who We Are
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4 mt-4">
                Our <span className="text-[#26a8df]">Strategy</span>
              </h1>
              <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Three core pillars driving digital transformation with purpose and precision
              </p>
            </motion.div>
          </div>

          {/* The SVG Path System */}
          <div className="absolute left-[50%] top-[400px] bottom-0 -translate-x-1/2 w-[2px] hidden lg:block">
            <svg width="2" height="100%" className="overflow-visible">
              <line x1="1" y1="0" x2="1" y2="100%" stroke="#E2E8F0" strokeWidth="2" strokeDasharray="10 10" />
              <motion.line
                x1="1" y1="0" x2="1" y2="100%"
                stroke="#26a8df" strokeWidth="3"
                style={{ pathLength }}
              />
            </svg>
          </div>

          {/* Strategy Cards */}
          <div className="space-y-16 sm:space-y-20 md:space-y-24 lg:space-y-32 relative">
            {STRATEGY_DATA.map((item, index) => (
              <StrategyNode key={item.id} data={item} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Industry Context Section */}
      <IndustryContext />

      {/* FAQ Section */}
      <FAQSection />

      {/* CTA Section */}
      <CTASection />
    </main>
  );
}

function StrategyNode({ data, index }) {
  const isEven = index % 2 === 0;
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: '-100px', once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-24 ${isEven ? '' : 'lg:flex-row-reverse'}`}
    >
      {/* Content Side */}
      <div className={`flex-1 ${isEven ? 'lg:text-right' : 'lg:text-left'}`}>
        <motion.span
          initial={{ opacity: 0, x: isEven ? 20 : -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? 20 : -20 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="inline-block text-[#26a8df] font-bold uppercase tracking-widest text-xs px-3 py-1 rounded-full bg-[#26a8df]/10"
        >
          {data.label}
        </motion.span>
        <motion.h3
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 + 0.1 }}
          className="text-2xl md:text-3xl font-bold text-slate-900 mt-3 mb-4"
        >
          {data.title}
        </motion.h3>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
          className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm mb-5 max-w-md"
        >
          <p className="text-sm md:text-base text-slate-700 leading-relaxed">{data.desc}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
          className={`flex items-center gap-3 ${isEven ? 'justify-end' : 'justify-start'}`}
        >
          <span className="px-3 py-1 bg-neutral-100 rounded-full text-xs font-bold text-neutral-600">
            {data.stats}
          </span>
        </motion.div>
      </div>

      {/* Center Visual Node */}
      <motion.div
        ref={ref}
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 + 0.2, type: 'spring', stiffness: 100 }}
        className="relative group flex-shrink-0"
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white shadow-lg border border-neutral-100 flex items-center justify-center text-[#26a8df] relative z-10 group-hover:bg-[#26a8df] group-hover:text-white transition-all duration-300 cursor-pointer"
        >
          {data.icon}
        </motion.div>
        <motion.div
          initial={{ scale: 0 }}
          whileHover={{ scale: 1.2 }}
          className="absolute inset-0 bg-[#26a8df]/20 blur-2xl rounded-full transition-transform duration-500"
        />
        <span className="absolute -top-3 -right-3 text-5xl font-black text-[#26a8df]/10 select-none">
          {data.id}
        </span>
      </motion.div>

      {/* Buffer Side */}
      <div className="hidden lg:block flex-1" />
    </motion.div>
  );
}

function IndustryContext() {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: '-100px', once: true });

  return (
    <section ref={ref} className="py-16 md:py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* About Us Intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-block text-[#26a8df] font-bold uppercase tracking-widest text-xs px-4 py-1.5 rounded-full bg-[#26a8df]/10 mb-4">
            About Us
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 mb-5">
            Nepal <span className="text-[#26a8df]">Digital Heights</span>
          </h2>
          <p className="text-base md:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Nepal Digital Heights (NDH) is a forward-thinking digital agency based in Nepal, dedicated to empowering businesses through cutting-edge technology solutions. We specialize in web development, mobile applications, digital marketing, and cloud services — delivering end-to-end digital experiences tailored to your unique goals. Founded with a mission to bridge the gap between local ambition and global standards, our team of passionate professionals works tirelessly to transform ideas into impactful digital realities. Whether you're a startup finding your footing or an established enterprise looking to scale, NDH is your trusted partner every step of the way.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {[
            {
              icon: <Globe className="w-6 h-6" />,
              title: 'Global Reach',
              text: 'From Nepal to the whole world. We help your business grow everywhere.',
            },
            {
              icon: <ShieldCheck className="w-6 h-6" />,
              title: 'Top-Level Security',
              text: 'Your data is protected with the highest standards.',
            },
            {
              icon: <Zap className="w-6 h-6" />,
              title: 'Fast Delivery',
              text: 'We deliver your project quickly and keep you updated every step.',
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="p-4 sm:p-5 md:p-6 bg-gradient-to-br from-white to-neutral-50 border border-neutral-200 rounded-xl sm:rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <div className="text-[#26a8df] mb-3">{item.icon}</div>
              <h4 className="font-bold text-base sm:text-lg text-neutral-900 mb-2">{item.title}</h4>
              <p className="text-neutral-600 text-sm leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: '-100px', once: true });
  const [openIndex, setOpenIndex] = useState(null);

  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

  const FALLBACK_FAQS = [
    {
      question: 'What services do you offer?',
      answer:
        'We offer web development, mobile apps, digital marketing, cloud solutions, and custom software development tailored to your business needs.',
    },
    {
      question: 'How long does a project typically take?',
      answer:
        'Project timelines vary based on scope and complexity. We provide detailed project plans and keep you updated throughout the development process.',
    },
    {
      question: 'Do you provide ongoing support?',
      answer:
        'Yes, we offer comprehensive post-launch support and maintenance packages to ensure your digital solutions continue to perform optimally.',
    },
    {
      question: 'What is your pricing model?',
      answer:
        'We offer flexible pricing options including fixed-price projects, hourly rates, and retainer agreements based on your requirements.',
    },
  ];

  useEffect(() => {
    let mounted = true;

    const fetchFaqs = async () => {
      try {
        const res = await apiClient('/faqs');
        // ofetch returns parsed body. Backend returns { success, count, data }
        const items = res && res.data ? res.data : [];
        if (mounted) {
          if (items && items.length) setFaqs(items);
          else setFaqs(FALLBACK_FAQS);
        }
      } catch (err) {
        console.error('Failed to fetch FAQs', err);
        if (mounted) setFaqs(FALLBACK_FAQS);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchFaqs();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section ref={ref} className="py-16 md:py-20 lg:py-24 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-12"
        >
          <span className="inline-block text-[#26a8df] font-bold uppercase tracking-widest text-xs px-4 py-1.5 rounded-full bg-[#26a8df]/10 mb-4">
            FAQ
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-3">
            Frequently Asked <span className="text-[#26a8df]">Questions</span>
          </h2>
          <p className="text-slate-600 text-base md:text-lg">Quick answers to common questions about our services</p>
        </motion.div>

        <div className="space-y-3">
          {(loading ? FALLBACK_FAQS : faqs).map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="border border-slate-200 rounded-xl bg-white overflow-hidden hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-5 sm:px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors duration-200"
              >
                <span className="text-left font-semibold text-slate-900 text-sm sm:text-base pr-4">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown className="w-5 h-5 text-[#26a8df]" />
                </motion.div>
              </button>
              <motion.div
                initial={false}
                animate={{ height: openIndex === index ? 'auto' : 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-5 sm:px-6 py-4 bg-slate-50 border-t border-slate-200">
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed">{faq.answer}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: '-100px', once: true });

  return (
    <section
      ref={ref}
      className="py-16 md:py-24 lg:py-32 bg-gradient-to-br from-[#26a8df] to-[#1e7ba8] text-white relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 sm:mb-6">
            Ready to Transform Your Digital Presence?
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-8 sm:mb-10 max-w-2xl mx-auto">
            Let's build something extraordinary together and take your business to the next level.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
            <Link to="/contact">
              <button
                className="px-8 py-3 sm:py-4 bg-[#0D1641] text-white rounded-full font-bold text-base sm:text-lg shadow-lg transition-all flex items-center gap-2 justify-center"
              >
                Get Free Counseling <Zap size={20} />
              </button>
            </Link>
            <Link to="/contact">
              <button
                className="px-8 py-3 sm:py-4 bg-white/20 text-white border-2 border-white rounded-full font-bold text-base sm:text-lg transition-all flex items-center gap-2 justify-center"
              >
                Explore Services <Rocket size={20} />
              </button>
            </Link>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-white/80 text-sm sm:text-base mt-8 sm:mt-10"
          >
            Email: contact@ndhtechnologies.com | Phone: 9857089898
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

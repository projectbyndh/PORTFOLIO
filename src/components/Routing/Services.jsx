'use client';

import React, { useState, useEffect } from 'react';
import { Globe, Smartphone, Layout, Share2, Search, Palette, Database, BarChart2, HeadphonesIcon, Zap } from 'lucide-react';

export default function Services() {
  const [animatedItems, setAnimatedItems] = useState([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = Number.parseInt(entry.target.id.split('-')[1]);
            setAnimatedItems((prev) => [...prev, id]);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((item) => {
      observer.observe(item);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const isAnimated = (id) => animatedItems.includes(id);

  return (
    <div className="w-full bg-white">
      {/* Logo Section */}
      <div className="w-full flex justify-center py-8">

      </div>

      {/* Header Section */}
      <div className="w-full bg-gradient-to-b from-blue-100 to-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Our Expertise, <span className="text-blue-600">Your Success.</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We deliver cutting-edge digital solutions tailored to your business needs, helping you stay ahead in today's
            competitive landscape.
          </p>
        </div>
      </div>

      {/* Services Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Digital Presence & Development */}
          <div
            id="category-1"
            className={`animate-on-scroll rounded-xl p-8 border border-gray-100 shadow-sm transition-all duration-500 ${
              isAnimated(1) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mb-6">
              <Globe className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-200 pb-2">
              Digital Presence & Development
            </h2>
            <div className="space-y-6">
              <ServiceItem
                icon={<Layout className="h-6 w-6 text-blue-600" />}
                title="Custom Web Solutions"
                description="From e-commerce platforms to dynamic web applications, we build websites that perform."
              />
              <ServiceItem
                icon={<Smartphone className="h-6 w-6 text-blue-600" />}
                title="Mobile App Innovation"
                description="Cross-platform apps designed for seamless user experiences."
              />
              <ServiceItem
                icon={<Layout className="h-6 w-6 text-blue-600" />}
                title="WordPress Mastery"
                description="Tailored WordPress solutions for businesses of all sizes."
              />
            </div>
          </div>

          {/* Digital Marketing & Branding */}
          <div
            id="category-2"
            className={`animate-on-scroll rounded-xl p-8 border border-gray-100 shadow-sm transition-all duration-700 ${
              isAnimated(2) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mb-6">
              <Share2 className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-200 pb-2">
              Digital Marketing & Branding
            </h2>
            <div className="space-y-6">
              <ServiceItem
                icon={<Share2 className="h-6 w-6 text-blue-600" />}
                title="Strategic Social Media"
                description="Engaging content and targeted campaigns that build your brand."
              />
              <ServiceItem
                icon={<Search className="h-6 w-6 text-blue-600" />}
                title="SEO Excellence"
                description="Improving your online visibility and driving organic traffic."
              />
              <ServiceItem
                icon={<Palette className="h-6 w-6 text-blue-600" />}
                title="Visual Branding"
                description="Creating compelling visuals that resonate with your audience."
              />
            </div>
          </div>

          {/* IT Support & Consulting */}
          <div
            id="category-3"
            className={`animate-on-scroll rounded-xl p-8 border border-gray-100 shadow-sm transition-all duration-900 ${
              isAnimated(3) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mb-6">
              <Database className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-200 pb-2">
              IT Support & Consulting
            </h2>
            <div className="space-y-6">
              <ServiceItem
                icon={<Database className="h-6 w-6 text-blue-600" />}
                title="Database Solutions"
                description="Robust database management and optimization."
              />
              <ServiceItem
                icon={<BarChart2 className="h-6 w-6 text-blue-600" />}
                title="IT Strategic Planning"
                description="Aligning your IT infrastructure with your business goals."
              />
              <ServiceItem
                icon={<HeadphonesIcon className="h-6 w-6 text-blue-600" />}
                title="Reliable Technical Support"
                description="Ensuring smooth operations with our expert support."
              />
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div
          id="category-4"
          className={`animate-on-scroll mt-16 text-center transition-all duration-1000 ${
            isAnimated(4) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-md">
            See All Services
          </button>
        </div>
      </div>

      {/* Bottom Banner */}
      <div className="w-full bg-gradient-to-t from-blue-100 to-white py-16 px-4 sm:px-6 lg:px-8 mt-16">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Ready to transform your digital presence?</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Let's discuss how our services can help your business grow and succeed in the digital landscape.
          </p>
          <button className="px-6 py-3 bg-white text-blue-600 font-bold rounded-full border-2 border-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300">
            Contact Us Today
          </button>
        </div>
      </div>
    </div>
  );
}

// Service Item Component
function ServiceItem({ icon, title, description }) {
  return (
    <div className="group">
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-4">{icon}</div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
            {title}
          </h3>
          <p className="mt-1 text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
}

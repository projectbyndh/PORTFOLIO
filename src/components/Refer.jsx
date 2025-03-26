'use client';

import React from 'react';

const ReferralPage = () => {
  // Reusable Form Field Component
  const FormField = ({ label, id, type = 'text', placeholder, required = false }) => (
    <div className="relative group">
      <label htmlFor={id} className="block text-sm font-medium text-[#1A2A44] mb-2 transition-all duration-300 group-focus-within:text-[#4A8EBC]">
        {label}
      </label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-[#4A8EBC]/20 rounded-xl 
                  focus:outline-none focus:ring-2 focus:ring-[#4A8EBC]/30 focus:border-[#4A8EBC] 
                  transition-all duration-300 text-[#2B4066] placeholder-[#2B4066]/50 
                  peer hover:border-[#4A8EBC]/40 shadow-sm"
      />
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none opacity-0 peer-focus:opacity-100 transition-opacity duration-300">
        <svg className="h-5 w-5 text-[#4A8EBC]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>
    </div>
  );

  // Reusable Benefit Item Component
  const BenefitItem = ({ text, icon }) => (
    <li className="flex items-center space-x-4 bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-md hover:shadow-lg 
                  transition-all duration-300 transform hover:-translate-y-1 border border-[#4A8EBC]/10">
      <span className="text-[#4A8EBC] text-2xl flex-shrink-0">{icon}</span>
      <span className="text-[#2B4066] text-sm font-medium">{text}</span>
    </li>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5FAFF] via-white to-[#E0F0FF] flex items-center justify-center p-4 sm:p-8 relative overflow-hidden">
      {/* Decorative elements with low opacity */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Circles */}
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-[#4A8EBC]/5 animate-pulse-slow"></div>
        <div className="absolute bottom-40 right-10 w-96 h-96 rounded-full bg-[#3B5488]/5 animate-pulse-slow"></div>
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-5" 
          style={{
            backgroundImage: `radial-gradient(#4A8EBC 1px, transparent 1px)`,
            backgroundSize: '30px 30px'
          }}
        ></div>
      </div>
      


      {/* Custom Animation Styles */}
      <style jsx>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-down {
          animation: fadeInDown 0.6s ease-out;
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
        .animate-pulse {
          animation: pulse 2s infinite;
        }
      `}</style>

    </div>
  );
};

export default ReferralPage;

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
      
      <div className="w-full max-w-4xl relative z-10">
        {/* Main Card */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden transform transition-all duration-500 hover:shadow-2xl border border-[#4A8EBC]/10">
          {/* Header with Gradient Banner */}
          <div className="bg-gradient-to-r from-[#3B5488] to-[#4A8EBC] p-10 text-center relative">
            <div className="absolute top-5 left-5 w-12 h-12 rounded-full bg-white/10 animate-pulse-slow"></div>
            <div className="absolute bottom-5 right-5 w-16 h-16 rounded-full bg-white/10 animate-pulse-slow"></div>
            
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 animate-fade-in-down 
                          drop-shadow-md relative z-10">
              Refer & Thrive
            </h1>
            <p className="text-lg text-white/90 max-w-md mx-auto font-light">
              Invite friends to Nepal Digital Heights and enjoy exclusive perks together!
            </p>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20 animate-pulse" />
          </div>

          {/* Form Section */}
          <div className="p-8 sm:p-12 bg-gradient-to-b from-[#F5FAFF]/50 to-white/50">
            <form className="space-y-8">
              <div className="grid sm:grid-cols-2 gap-6">
                <FormField
                  label="Your Name"
                  id="your-name"
                  placeholder="John Doe"
                  required
                />
                <FormField
                  label="Your Email"
                  id="your-email"
                  type="email"
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <FormField
                  label="Friend's Name"
                  id="friend-name"
                  placeholder="Jane Smith"
                  required
                />
                <FormField
                  label="Friend's Email"
                  id="friend-email"
                  type="email"
                  placeholder="jane@example.com"
                  required
                />
              </div>

              <div className="relative">
                <label htmlFor="message" className="block text-sm font-medium text-[#1A2A44] mb-2">
                  Personal Message (Optional)
                </label>
                <textarea
                  id="message"
                  placeholder="Share why your friend will love our IT solutions..."
                  className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-[#4A8EBC]/20 rounded-xl 
                            focus:outline-none focus:ring-2 focus:ring-[#4A8EBC]/30 focus:border-[#4A8EBC] 
                            transition-all duration-300 text-[#2B4066] placeholder-[#2B4066]/50 
                            min-h-[140px] resize-y hover:border-[#4A8EBC]/40 shadow-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#3B5488] to-[#4A8EBC] text-white py-4 px-8 rounded-xl 
                          font-semibold shadow-lg hover:shadow-xl 
                          transition-all duration-300 transform hover:-translate-y-1 
                          flex items-center justify-center gap-2"
              >
                <span>Send Referral Now</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </form>

            {/* Benefits Section */}
            <div className="mt-12 bg-[#E0F0FF]/50 p-8 rounded-2xl border border-[#4A8EBC]/10 shadow-inner">
              <h3 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#1A2A44] to-[#4A8EBC] mb-6 flex items-center gap-3">
                <svg className="w-7 h-7 text-[#4A8EBC]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Your Exclusive Rewards
              </h3>
              <ul className="grid sm:grid-cols-2 gap-5">
                <BenefitItem text="$100 credit per successful referral" icon="💰" />
                <BenefitItem text="Priority tech support access" icon="⚡" />
                <BenefitItem text="Early access to new features" icon="🚀" />
                <BenefitItem text="Monthly tech prize draw entry" icon="🎁" />
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center text-sm text-[#2B4066]/70 mt-8">
          © {new Date().getFullYear()} Nepal Digital Heights. Crafted with <span className="text-[#4A8EBC]">💙</span> for our community.
        </footer>
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

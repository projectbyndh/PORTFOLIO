import React from 'react';
import { Mail, Phone, MapPin, Globe, Facebook, Instagram, Twitter, Linkedin, ChevronRight, Send } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-br from-[#1A2A44] via-[#2A4066] to-[#3B5C88] pt-20 pb-8 px-6 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.06] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJ3aGl0ZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTAgMTBhNCA0IDAgMCAxIDQtNCA0IDQgMCAwIDEgMCA4IDQgNCAwIDAgMS00IDRoNCA0IDQgMCAwIDAgMCA4aC00YTQgNCAwIDAgMSAwLTgiLz48L2c+PC9zdmc+')]"></div>
      
      {/* Top Gradient Overlay */}
      <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-[#4A8EBC] to-[#2A4B7C]"></div>

      <div className="container mx-auto relative grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 z-10">
        {/* Company Info */}
        <div className="space-y-6">
          <h2 className="text-3xl font-extrabold text-white bg-gradient-to-r from-[#4A8EBC] to-[#FFFFFF] bg-clip-text text-transparent">
            Nepal Digital Height
          </h2>
          <p className="text-[#D1E0F0] text-sm leading-relaxed max-w-xs">
            Innovating technology solutions with a sustainable future in mind.
          </p>
          <div className="space-y-4 text-[#E6EDF5] text-sm">
            <div className="flex items-center group hover:text-[#4A8EBC] transition-colors">
              <MapPin size={18} className="mr-3 group-hover:scale-110 transition-transform" /> 
              Butwal, Nepal
            </div>
            <div className="flex items-center group hover:text-[#4A8EBC] transition-colors">
              <Phone size={18} className="mr-3 group-hover:scale-110 transition-transform" /> 
              +977 (555) 123-4567
            </div>
            <div className="flex items-center group hover:text-[#4A8EBC] transition-colors">
              <Mail size={18} className="mr-3 group-hover:scale-110 transition-transform" /> 
              contact@nepaldigitalheight.com
            </div>
            <div className="flex items-center group hover:text-[#4A8EBC] transition-colors">
              <Globe size={18} className="mr-3 group-hover:scale-110 transition-transform" /> 
              www.nepaldigitalheight.com
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-6 relative">
            Quick Links
            <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-[#4A8EBC] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
          </h3>
          <ul className="space-y-4">
            {['About Us', 'Services', 'Case Studies', 'Contact'].map(link => (
              <li key={link}>
                <a 
                  href="#" 
                  className="text-[#D1E0F0] hover:text-white flex items-center group transition-all duration-300"
                >
                  <ChevronRight size={16} className="mr-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" /> 
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-6 relative">
            Our Services
            <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-[#4A8EBC] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
          </h3>
          <ul className="space-y-4">
            {['Cloud Solutions', 'Sustainable IT', 'Software Development', 'IT Consulting'].map(service => (
              <li key={service}>
                <a 
                  href="#" 
                  className="text-[#D1E0F0] hover:text-white flex items-center group transition-all duration-300"
                >
                  <ChevronRight size={16} className="mr-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" /> 
                  {service}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter & Social */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-white mb-6">Stay Connected</h3>
          <div className="relative">
            <input 
              type="email" 
              placeholder="Your email" 
              className="w-full bg-[#2A4066]/50 border border-[#4A8EBC]/30 rounded-full px-5 py-3 text-[#D1E0F0] placeholder:text-[#A0B5CC] focus:outline-none focus:ring-2 focus:ring-[#4A8EBC] transition-all"
            />
            <button className="absolute right-1 top-1/2 -translate-y-1/2 px-4 py-1 bg-[#4A8EBC] hover:bg-[#3B6D9C] text-white rounded-full flex items-center transition-all">
              <Send size={16} />
            </button>
          </div>
          <div className="flex space-x-4 pt-4">
            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, idx) => (
              <a 
                key={idx} 
                href="#" 
                className="w-12 h-12 rounded-full bg-[#2A4066] flex items-center justify-center hover:bg-[#4A8EBC] transform hover:-translate-y-1 transition-all duration-300"
              >
                <Icon size={20} className="text-white" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="container mx-auto mt-12 pt-6 border-t border-[#4A8EBC]/20 text-[#D1E0F0] text-sm text-center relative z-10">
        © {currentYear} Nepal Digital Height and Technology. All rights reserved.
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-2 h-2 bg-[#4A8EBC] rounded-full absolute top-1/4 left-1/3 animate-float"></div>
        <div className="w-3 h-3 bg-[#3B6D9C] rounded-full absolute bottom-1/3 right-1/4 animate-float delay-1000"></div>
        <div className="w-1 h-1 bg-[#2A4B7C] rounded-full absolute top-1/2 left-1/5 animate-float delay-2000"></div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); opacity: 0.6; }
          50% { transform: translateY(-20px); opacity: 0.3; }
        }
        .animate-float {
          animation: float 6s infinite ease-in-out;
        }
        .delay-1000 { animation-delay: 1s; }
        .delay-2000 { animation-delay: 2s; }
      `}</style>
    </footer>
  );
};

export default Footer;
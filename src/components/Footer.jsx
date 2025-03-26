"use client"
import { Mail, Phone, MapPin, Globe, Facebook, Instagram, Twitter, Linkedin, ChevronRight, Send } from "lucide-react"
import React from "react"
const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-gradient-to-br from-[#1A2A44] via-[#2A4066] to-[#3B5488] pt-20 pb-8 px-6 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.06] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJ3aGl0ZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTAgMTBhNCA0IDAgMCAxIDQtNCA0IDQgMCAwIDEgMCA4IDQgNCAwIDAgMS00IDRoNCA0IDQgMCAwIDAgMCA4aC00YTQgNCAwIDAgMSAwLTgiLz48L2c+PC9zdmc+')]"></div>

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Circles */}
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-[#4A8EBC]/5 animate-pulse-slow"></div>
        <div className="absolute bottom-40 right-10 w-96 h-96 rounded-full bg-[#3B5488]/5 animate-pulse-slow"></div>

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
          }}
        ></div>

        {/* Floating Particles */}
        <div className="w-2 h-2 bg-[#4A8EBC] rounded-full absolute top-1/4 left-1/3 animate-float"></div>
        <div className="w-3 h-3 bg-[#3B6D9C] rounded-full absolute bottom-1/3 right-1/4 animate-float delay-1000"></div>
        <div className="w-1 h-1 bg-[#2A4B7C] rounded-full absolute top-1/2 left-1/5 animate-float delay-2000"></div>
        <div className="w-2 h-2 bg-[#4A8EBC] rounded-full absolute top-1/3 right-1/3 animate-float delay-3000"></div>
        <div className="w-1 h-1 bg-[#3B6D9C] rounded-full absolute bottom-1/4 left-1/4 animate-float delay-4000"></div>
      </div>

      {/* Top Gradient Overlay */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#4A8EBC] to-[#2A4B7C]"></div>

      <div className="container mx-auto relative grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 z-10">
        {/* Company Info */}
        <div className="space-y-6">
          <div className="relative inline-block">
            <div className="absolute -top-3 -left-3 w-6 h-6 rounded-full bg-[#4A8EBC]/20 animate-pulse-slow"></div>
            <h2 className="text-3xl font-extrabold text-white bg-gradient-to-r from-[#4A8EBC] to-[#FFFFFF] bg-clip-text text-transparent">
              Nepal Digital Heights
            </h2>
          </div>
          <p className="text-[#D1E0F0] text-sm leading-relaxed max-w-xs">
            Innovating technology solutions with a sustainable future in mind. We deliver cutting-edge digital
            experiences that transform businesses.
          </p>
          <div className="space-y-4 text-[#E6EDF5] text-sm">
            <div className="flex items-center group hover:text-[#4A8EBC] transition-colors duration-300">
              <div className="w-8 h-8 rounded-full bg-[#4A8EBC]/10 flex items-center justify-center mr-3 group-hover:bg-[#4A8EBC]/20 transition-all duration-300">
                <MapPin size={16} className="group-hover:scale-110 transition-transform duration-300" />
              </div>
              <span>Butwal, Nepal</span>
            </div>
            <div className="flex items-center group hover:text-[#4A8EBC] transition-colors duration-300">
              <div className="w-8 h-8 rounded-full bg-[#4A8EBC]/10 flex items-center justify-center mr-3 group-hover:bg-[#4A8EBC]/20 transition-all duration-300">
                <Phone size={16} className="group-hover:scale-110 transition-transform duration-300" />
              </div>
              <span>+977 (555) 123-4567</span>
            </div>
            <div className="flex items-center group hover:text-[#4A8EBC] transition-colors duration-300">
              <div className="w-8 h-8 rounded-full bg-[#4A8EBC]/10 flex items-center justify-center mr-3 group-hover:bg-[#4A8EBC]/20 transition-all duration-300">
                <Mail size={16} className="group-hover:scale-110 transition-transform duration-300" />
              </div>
              <span>contact@nepaldigitalheights.com</span>
            </div>
            <div className="flex items-center group hover:text-[#4A8EBC] transition-colors duration-300">
              <div className="w-8 h-8 rounded-full bg-[#4A8EBC]/10 flex items-center justify-center mr-3 group-hover:bg-[#4A8EBC]/20 transition-all duration-300">
                <Globe size={16} className="group-hover:scale-110 transition-transform duration-300" />
              </div>
              <span>www.nepaldigitalheights.com</span>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <div className="relative inline-block mb-6">
            <div className="absolute -top-2 -left-2 w-4 h-4 rounded-full bg-[#4A8EBC]/20 animate-pulse-slow"></div>
            <h3 className="text-xl font-semibold text-white relative">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-[#4A8EBC]"></span>
            </h3>
          </div>
          <ul className="space-y-4">
            {[
              { name: "About Us", url: "/about" },
              { name: "Services", url: "#services" },
              { name: "Case Studies", url: "/casestudy" },
              { name: "Testimonials", url: "#testimonials" },
              { name: "Contact", url: "/contact" },
            ].map((link) => (
              <li key={link.name}>
                <a
                  href={link.url}
                  className="text-[#D1E0F0] hover:text-white flex items-center group transition-all duration-300"
                >
                  <div className="w-6 h-6 rounded-full bg-transparent group-hover:bg-[#4A8EBC]/10 flex items-center justify-center mr-2 transition-all duration-300">
                    <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  </div>
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <div className="relative inline-block mb-6">
            <div className="absolute -top-2 -left-2 w-4 h-4 rounded-full bg-[#4A8EBC]/20 animate-pulse-slow"></div>
            <h3 className="text-xl font-semibold text-white relative">
              Our Services
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-[#4A8EBC]"></span>
            </h3>
          </div>
          <ul className="space-y-4">
            {[
              { name: "Web Development", url: "#web-dev" },
              { name: "Mobile Applications", url: "#mobile-apps" },
              { name: "Digital Marketing", url: "#digital-marketing" },
              { name: "UI/UX Design", url: "#design" },
              { name: "IT Consulting", url: "#consulting" },
            ].map((service) => (
              <li key={service.name}>
                <a
                  href={service.url}
                  className="text-[#D1E0F0] hover:text-white flex items-center group transition-all duration-300"
                >
                  <div className="w-6 h-6 rounded-full bg-transparent group-hover:bg-[#4A8EBC]/10 flex items-center justify-center mr-2 transition-all duration-300">
                    <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  </div>
                  {service.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter & Social */}
        <div className="space-y-6">
          <div className="relative inline-block mb-6">
            <div className="absolute -top-2 -left-2 w-4 h-4 rounded-full bg-[#4A8EBC]/20 animate-pulse-slow"></div>
            <h3 className="text-xl font-semibold text-white relative">
              Stay Connected
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-[#4A8EBC]"></span>
            </h3>
          </div>
          <p className="text-[#D1E0F0] text-sm mb-4">
            Subscribe to our newsletter for the latest updates and insights.
          </p>
          <div className="relative">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full bg-[#2A4066]/50 backdrop-blur-sm border border-[#4A8EBC]/30 rounded-full px-5 py-3 text-[#D1E0F0] placeholder:text-[#A0B5CC] focus:outline-none focus:ring-2 focus:ring-[#4A8EBC] transition-all"
            />
            <button className="absolute right-1 top-1/2 -translate-y-1/2 h-10 px-4 bg-gradient-to-r from-[#3B5488] to-[#4A8EBC] hover:from-[#4A8EBC] hover:to-[#3B5488] text-white rounded-full flex items-center justify-center transition-all duration-300 shadow-md">
              <span className="mr-1 text-sm hidden sm:inline">Subscribe</span>
              <Send size={16} />
            </button>
          </div>

          <div className="pt-6">
            <h4 className="text-white text-sm font-medium mb-4">Follow Us</h4>
            <div className="flex space-x-3">
              {[
                { icon: Facebook, name: "Facebook" },
                { icon: Twitter, name: "Twitter" },
                { icon: Instagram, name: "Instagram" },
                { icon: Linkedin, name: "LinkedIn" },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href="#"
                  aria-label={`Follow us on ${social.name}`}
                  className="w-10 h-10 rounded-full bg-[#2A4066]/70 backdrop-blur-sm flex items-center justify-center hover:bg-gradient-to-r hover:from-[#3B5488] hover:to-[#4A8EBC] transform hover:-translate-y-1 transition-all duration-300 shadow-md group"
                >
                  <social.icon
                    size={18}
                    className="text-white group-hover:scale-110 transition-transform duration-300"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="container mx-auto mt-16 pt-6 border-t border-[#4A8EBC]/20 flex flex-col md:flex-row justify-between items-center text-[#D1E0F0] text-sm relative z-10">
        <div>© {currentYear} Nepal Digital Heights. All rights reserved.</div>
        <div className="mt-4 md:mt-0 flex space-x-6">
          <a href="#" className="text-[#D1E0F0] hover:text-[#4A8EBC] transition-colors duration-300">
            Privacy Policy
          </a>
          <a href="#" className="text-[#D1E0F0] hover:text-[#4A8EBC] transition-colors duration-300">
            Terms of Service
          </a>
          <a href="#" className="text-[#D1E0F0] hover:text-[#4A8EBC] transition-colors duration-300">
            Sitemap
          </a>
        </div>
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
        .delay-3000 { animation-delay: 3s; }
        .delay-4000 { animation-delay: 4s; }
      `}</style>
    </footer>
  )
}

export default Footer


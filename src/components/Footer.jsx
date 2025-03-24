import React from 'react';
import { Mail, Phone, MapPin, Globe, Facebook, Instagram, Twitter, Linkedin, ChevronRight, Send } from 'lucide-react';

const Index = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow flex items-center justify-center bg-gray-100">

      </main>

      <footer className="relative bg-gradient-to-b from-[#2A4B7C] via-[#3B6D9C] to-[#4A8EBC] pt-16 pb-8 px-6">
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJ3aGl0ZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTZ2LTRoLTJ2NGgyek0yNCAzNGgtMnYtNGgydjR6bTAtNnYtNGgtMnY0aDJ6Ii8+PC9nPjwvc3ZnPg==')]"></div>
        
        <div className="container mx-auto relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h2 className="text-white text-2xl font-bold mb-6">Nepal Digital Height and Technology</h2>
            <p className="text-white/80 mb-6">Bridging technology and sustainability.</p>
            <div className="space-y-3 text-white/90">
              <div className="flex items-center"><MapPin size={18} className="mr-3" /> Butwal, Nepal</div>
              <div className="flex items-center"><Phone size={18} className="mr-3" /> +977 (555) 123-4567</div>
              <div className="flex items-center"><Mail size={18} className="mr-3" /> contact@nepaldigitalheight.com</div>
              <div className="flex items-center"><Globe size={18} className="mr-3" /> www.nepaldigitalheight.com</div>
            </div>
          </div>

          <div>
            <h3 className="text-white text-xl font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {['About Us', 'Services', 'Case Studies', 'Contact'].map(link => (
                <li key={link}><a href="#" className="text-white/90 hover:text-white flex items-center"><ChevronRight size={16} className="mr-1" /> {link}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white text-xl font-semibold mb-6">Our Services</h3>
            <ul className="space-y-3">
              {['Cloud Solutions', 'Sustainable IT', 'Software Development', 'IT Consulting'].map(service => (
                <li key={service}><a href="#" className="text-white/90 hover:text-white flex items-center"><ChevronRight size={16} className="mr-1" /> {service}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white text-xl font-semibold mb-6">Stay Connected</h3>
            <input 
              type="email" 
              placeholder="Your email" 
              className="w-full mb-3 bg-white/10 border border-white/30 rounded-md px-4 py-2 text-white placeholder:text-white/50"
            />
            <button className="w-full px-6 py-2 bg-white/20 hover:bg-white/30 text-white rounded-md flex items-center justify-center">
              Subscribe <Send size={16} className="ml-2" />
            </button>
            <div className="mt-8 flex space-x-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, idx) => (
                <a key={idx} href="#" className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30">
                  <Icon size={18} className="text-white" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="container mx-auto pt-8 border-t border-white/20 text-white/70 text-sm text-center">
          © {currentYear} Nepal Digital Height and Technology. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Index;
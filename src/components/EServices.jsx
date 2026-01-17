import React from "react";
import Logo from "./Logo";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  CheckCircle,
  ChevronDown,
  Code,
  Database,
  Globe,
  Layers,
  Server,
  ShoppingBag,
  Smartphone,
  Zap,
} from "lucide-react";

// E-Services data
const E_SERVICES = [
  {
    title: "Web Development",
    icon: <Globe className="w-10 h-10 text-[#4A8EBC]" aria-hidden="true" />,
    description: "Custom websites and web applications built with cutting-edge technologies.",
    features: ["Responsive Design", "CMS Integration", "E-commerce Solutions"],
  },
  {
    title: "Mobile App Development",
    icon: <Smartphone className="w-10 h-10 text-[#4A8EBC]" aria-hidden="true" />,
    description: "Native and cross-platform mobile applications for all devices.",
    features: ["iOS & Android Apps", "Cross-Platform Solutions", "UI/UX Design"],
  },
  {
    title: "Cloud Services",
    icon: <Server className="w-10 h-10 text-[#4A8EBC]" aria-hidden="true" />,
    description: "Scalable cloud solutions to optimize your business operations.",
    features: ["Cloud Migration", "AWS/Azure/GCP", "DevOps"],
  },
  {
    title: "Software Development",
    icon: <Code className="w-10 h-10 text-[#4A8EBC]" aria-hidden="true" />,
    description: "Custom software solutions tailored to your specific business needs.",
    features: ["Enterprise Applications", "API Development", "Quality Assurance"],
  },
  {
    title: "E-commerce Solutions",
    icon: <ShoppingBag className="w-10 h-10 text-[#4A8EBC]" aria-hidden="true" />,
    description: "End-to-end e-commerce platforms that drive sales.",
    features: ["Online Store Development", "Payment Gateway Integration", "Inventory Management"],
  },
  {
    title: "Digital Transformation",
    icon: <Layers className="w-10 h-10 text-[#4A8EBC]" aria-hidden="true" />,
    description: "Strategic digital transformation services for your business.",
    features: ["Process Automation", "Data Analytics", "Digital Strategy"],
  },
]; 

export default function EServicesEnhanced() {
  const [activeAccordion, setActiveAccordion] = useState(0);
  const floatingIconsRef = useRef(null);

  useEffect(() => {
    const container = floatingIconsRef.current;
    if (!container) return;

    const icons = container.querySelectorAll(".floating-icon");

    icons.forEach((icon, index) => {
      const delay = index * 0.5;
      const duration = 3 + Math.random() * 2;

      icon.animate(
        [
          { transform: "translateY(0px) rotate(0deg)" },
          { transform: "translateY(-15px) rotate(5deg)" },
          { transform: "translateY(0px) rotate(0deg)" },
        ],
        {
          duration: duration * 1000,
          iterations: Number.POSITIVE_INFINITY,
          delay: delay * 1000,
          easing: "ease-in-out",
        }
      );
    });
  }, []);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  return (
    <>
      {/* Custom styles removed. If you need these, add them to your global CSS file. */}

      <div className="bg-[#F5FAFF] min-h-screen font-sans">
        {/* Hero Section */}
        <section
          className="bg-linear-to-b from-[#F5FAFF] to-[#EAF5FF] py-16 relative overflow-hidden"
          aria-labelledby="hero-title"
        >
          <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-[#4A8EBC]/10 animate-pulse" />
          <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-[#3B5488]/10 animate-pulse" />
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `radial-gradient(#4A8EBC 1px, transparent 1px)`,
              backgroundSize: "30px 30px",
            }}
          />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                <div className="flex items-center justify-center gap-3">
                  <Logo className="hidden sm:block h-8 w-auto" />
                  <h1
                    id="hero-title"
                    className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-linear-to-r from-[#1A2A44] to-[#4A8EBC] mb-4 animate-fade-in-down"
                  >
                    Our E-Services
                  </h1>
                </div>
            <p className="text-base sm:text-lg text-[#2B4066]/80 max-w-2xl mx-auto mb-8 animate-fade-in-up">
              Comprehensive digital solutions to transform your business and drive growth in the digital landscape.
            </p>

            {/* Floating Icons */}
            <div
              ref={floatingIconsRef}
              className="relative h-40 max-w-md mx-auto my-8"
              aria-hidden="true"
            >
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-linear-to-br from-[#4A8EBC] to-[#f0f0f0] rounded-full flex items-center justify-center text-white shadow-lg animate-pulse">
                <span className="font-bold">
                  <Logo className="h-10 w-auto" />
                </span>
              </div>

              <div className="floating-icon absolute top-0 left-1/4 w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center">
                <Globe className="w-6 h-6 text-[#4A8EBC]" />
              </div>
              <div className="floating-icon absolute top-1/4 right-1/4 w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center">
                <Smartphone className="w-6 h-6 text-[#4A8EBC]" />
              </div>
              <div className="floating-icon absolute bottom-0 left-1/3 w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center">
                <Server className="w-6 h-6 text-[#4A8EBC]" />
              </div>
              <div className="floating-icon absolute bottom-1/4 right-1/3 w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center">
                <Code className="w-6 h-6 text-[#4A8EBC]" />
              </div>
              <div className="floating-icon absolute top-1/3 left-10 w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center">
                <Database className="w-6 h-6 text-[#4A8EBC]" />
              </div>
              <div className="floating-icon absolute bottom-1/3 right-10 w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center">
                <Zap className="w-6 h-6 text-[#4A8EBC]" />
              </div>
            </div>

  
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-16 relative" aria-labelledby="services-title">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2
              id="services-title"
              className="text-2xl sm:text-3xl font-bold text-[#1A2A44] mb-4 text-center animate-fade-in"
            >
              Our Digital Services
            </h2>
            <p className="text-base sm:text-lg text-[#2B4066]/80 max-w-2xl mx-auto mb-12 text-center animate-fade-in">
              Digital services designed to help businesses worldwide thrive in the digital era.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {E_SERVICES.map((service, index) => (
                <article
                  key={service.title}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
                >
                  <div className="p-6">
                    <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                      {service.icon}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-[#1A2A44] mb-2">{service.title}</h3>
                    <p className="text-[#2B4066]/80 mb-4">{service.description}</p>

                    <ul className="space-y-2 mb-4" aria-label={`${service.title} features`}>
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-[#4A8EBC] animate-bounce" aria-hidden="true" />
                          <span className="text-[#2B4066] text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-2 border-t border-[#4A8EBC]/10">
                      <button
                        className="w-full text-[#4A8EBC] font-medium flex items-center justify-center gap-1 mt-2 hover:text-[#3B5488] transition-colors"
                        onClick={() => toggleAccordion(index)}
                        aria-expanded={activeAccordion === index}
                        aria-controls={`accordion-content-${index}`}
                      >
                        Learn More
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-300 ${
                            activeAccordion === index ? "rotate-180" : ""
                          }`}
                          aria-hidden="true"
                        />
                      </button>

                      <div
                        id={`accordion-content-${index}`}
                        className={`overflow-hidden transition-all duration-300 ${
                          activeAccordion === index ? "max-h-24 mt-2" : "max-h-0"
                        }`}
                        role="region"
                      >
                        <p className="text-[#2B4066]/80 text-sm">
                          Our {service.title.toLowerCase()} services are tailored to meet the specific needs of
                          businesses globally. Contact us to learn more about our solutions.
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16" aria-labelledby="cta-title">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2
              id="cta-title"
              className="text-2xl sm:text-3xl font-bold text-[#1A2A44] mb-4 animate-fade-in"
            >
                <div className="flex items-center justify-center gap-2">
                  <Logo className="hidden sm:block h-6 w-auto" />
                  Ready to Transform Your Business?
                </div>
            </h2>
            <p className="text-base sm:text-lg text-[#2B4066]/80 mb-8 max-w-xl mx-auto animate-fade-in">
              Let's discuss how our e-services can help your business thrive in the global digital landscape.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-linear-to-r from-[#4A8EBC] to-[#3B5488] text-white font-semibold py-3 px-8 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                Contact Us Today
              </a>
              <a
                href="/case-studies"
                className="border-2 border-[#4A8EBC] text-[#3B5488] font-semibold py-3 px-8 rounded-full hover:bg-[#4A8EBC]/20 hover:scale-105 transition-all duration-300"
              >
                View Portfolio
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
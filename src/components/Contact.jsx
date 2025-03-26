"use client"

import { useState } from "react"
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, User, Briefcase, FileText } from "lucide-react"
import React from "react"
import Footer from "./Footer"
export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)

      // Reset form after showing success message
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          service: "",
          message: "",
        })
        setSubmitted(false)
      }, 5000)
    }, 1500)
  }

  const services = [
    "Web Development",
    "Mobile App Development",
    "UI/UX Design",
    "Digital Marketing",
    "E-commerce Solutions",
    "IT Consulting",
    "Custom Software Development",
    "Other",
  ]

  return (
    <div className="w-full bg-[#F5FAFF] relative overflow-hidden">
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
            backgroundSize: "30px 30px",
          }}
        ></div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-block relative">
              <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-[#4A8EBC]/20 animate-pulse-slow"></div>
              <div className="absolute -bottom-4 -right-4 w-8 h-8 rounded-full bg-[#3B5488]/20 animate-pulse-slow"></div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#1A2A44] to-[#4A8EBC]">
                Contact Us
              </h1>
            </div>
            <p className="mt-4 text-lg text-[#2B4066]/80 max-w-2xl mx-auto">
              Let's discuss how we can help transform your digital presence.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-8 shadow-md border border-[#4A8EBC]/10 h-full">
                <h2 className="text-2xl font-bold text-[#1A2A44] mb-6">Get in Touch</h2>
                <p className="text-[#2B4066]/80 mb-8">
                  Have a question or want to discuss a project? Reach out to us through any of these channels or fill
                  out the form.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-[#4A8EBC]/10 flex items-center justify-center mr-4 flex-shrink-0">
                      <MapPin className="h-5 w-5 text-[#4A8EBC]" />
                    </div>
                    <div>
                      <h3 className="text-[#1A2A44] font-medium mb-1">Our Location</h3>
                      <p className="text-[#2B4066]/80 text-sm">
                        Butwal-11, Rupandehi
                        <br />
                        Nepal
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-[#4A8EBC]/10 flex items-center justify-center mr-4 flex-shrink-0">
                      <Mail className="h-5 w-5 text-[#4A8EBC]" />
                    </div>
                    <div>
                      <h3 className="text-[#1A2A44] font-medium mb-1">Email Us</h3>
                      <p className="text-[#2B4066]/80 text-sm">
                        info@nepaldigitalheights.com
                        <br />
                        support@nepaldigitalheights.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-[#4A8EBC]/10 flex items-center justify-center mr-4 flex-shrink-0">
                      <Phone className="h-5 w-5 text-[#4A8EBC]" />
                    </div>
                    <div>
                      <h3 className="text-[#1A2A44] font-medium mb-1">Call Us</h3>
                      <p className="text-[#2B4066]/80 text-sm">
                        +977 (555) 123-4567
                        <br />
                        +977 (555) 765-4321
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-[#4A8EBC]/10 flex items-center justify-center mr-4 flex-shrink-0">
                      <Clock className="h-5 w-5 text-[#4A8EBC]" />
                    </div>
                    <div>
                      <h3 className="text-[#1A2A44] font-medium mb-1">Working Hours</h3>
                      <p className="text-[#2B4066]/80 text-sm">
                        Monday - Friday: 9:00 AM - 6:00 PM
                        <br />
                        Saturday: 10:00 AM - 2:00 PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-8 shadow-md border border-[#4A8EBC]/10">
                <h2 className="text-2xl font-bold text-[#1A2A44] mb-6">Send Us a Message</h2>

                {submitted ? (
                  <div className="bg-[#E0F0FF] border border-[#4A8EBC]/30 rounded-lg p-6 text-center">
                    <div className="w-16 h-16 rounded-full bg-[#4A8EBC]/20 flex items-center justify-center mx-auto mb-4">
                      <MessageSquare className="h-8 w-8 text-[#4A8EBC]" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1A2A44] mb-2">Thank You!</h3>
                    <p className="text-[#2B4066]/80">
                      Your message has been sent successfully. We'll get back to you as soon as possible.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="relative">
                        <label htmlFor="name" className="block text-sm font-medium text-[#1A2A44] mb-2">
                          Your Name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-[#4A8EBC]/50" />
                          </div>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full pl-10 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-[#4A8EBC]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A8EBC]/30 focus:border-[#4A8EBC] transition-all duration-300 text-[#2B4066] placeholder-[#2B4066]/50"
                            placeholder="John Doe"
                          />
                        </div>
                      </div>

                      <div className="relative">
                        <label htmlFor="email" className="block text-sm font-medium text-[#1A2A44] mb-2">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-[#4A8EBC]/50" />
                          </div>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full pl-10 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-[#4A8EBC]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A8EBC]/30 focus:border-[#4A8EBC] transition-all duration-300 text-[#2B4066] placeholder-[#2B4066]/50"
                            placeholder="john@example.com"
                          />
                        </div>
                      </div>

                      <div className="relative">
                        <label htmlFor="phone" className="block text-sm font-medium text-[#1A2A44] mb-2">
                          Phone Number
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Phone className="h-5 w-5 text-[#4A8EBC]/50" />
                          </div>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-[#4A8EBC]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A8EBC]/30 focus:border-[#4A8EBC] transition-all duration-300 text-[#2B4066] placeholder-[#2B4066]/50"
                            placeholder="+977 98XXXXXXXX"
                          />
                        </div>
                      </div>

                      <div className="relative">
                        <label htmlFor="company" className="block text-sm font-medium text-[#1A2A44] mb-2">
                          Company Name
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Briefcase className="h-5 w-5 text-[#4A8EBC]/50" />
                          </div>
                          <input
                            type="text"
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-[#4A8EBC]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A8EBC]/30 focus:border-[#4A8EBC] transition-all duration-300 text-[#2B4066] placeholder-[#2B4066]/50"
                            placeholder="Your Company"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="relative">
                      <label htmlFor="service" className="block text-sm font-medium text-[#1A2A44] mb-2">
                        Service You're Interested In <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FileText className="h-5 w-5 text-[#4A8EBC]/50" />
                        </div>
                        <select
                          id="service"
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-[#4A8EBC]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A8EBC]/30 focus:border-[#4A8EBC] transition-all duration-300 text-[#2B4066] placeholder-[#2B4066]/50 appearance-none"
                        >
                          <option value="">Select a service</option>
                          {services.map((service) => (
                            <option key={service} value={service}>
                              {service}
                            </option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <svg
                            className="h-5 w-5 text-[#4A8EBC]/50"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="relative">
                      <label htmlFor="message" className="block text-sm font-medium text-[#1A2A44] mb-2">
                        Your Message <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                          <MessageSquare className="h-5 w-5 text-[#4A8EBC]/50" />
                        </div>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={5}
                          className="w-full pl-10 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-[#4A8EBC]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A8EBC]/30 focus:border-[#4A8EBC] transition-all duration-300 text-[#2B4066] placeholder-[#2B4066]/50 resize-y"
                          placeholder="Tell us about your project or inquiry..."
                        ></textarea>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-[#3B5488] to-[#4A8EBC] text-white py-4 px-8 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message <Send className="ml-2" size={18} />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1A2A44] mb-4">Our Location</h2>
            <p className="text-[#2B4066]/80 max-w-2xl mx-auto">
              Visit our office in Butwal, Nepal or connect with us virtually from anywhere in the world.
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-xl overflow-hidden shadow-md border border-[#4A8EBC]/10 h-[400px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56516.31397712412!2d83.41784725!3d27.6993945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3996864275d9755f%3A0x2b1e92d89d4bb3ae!2sButwal%2C%20Nepal!5e0!3m2!1sen!2sus!4v1648226594926!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Nepal Digital Heights Office Location"
            ></iframe>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gradient-to-b from-[#F5FAFF] to-[#E0F0FF] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1A2A44] mb-4">Frequently Asked Questions</h2>
            <p className="text-[#2B4066]/80 max-w-2xl mx-auto">
              Find quick answers to common questions about our services and process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: "What services does Nepal Digital Heights offer?",
                answer:
                  "We offer a comprehensive range of digital services including web development, mobile app development, UI/UX design, digital marketing, e-commerce solutions, IT consulting, and custom software development.",
              },
              {
                question: "How long does a typical project take to complete?",
                answer:
                  "Project timelines vary based on complexity and scope. A simple website might take 2-4 weeks, while a complex web application or mobile app could take 2-6 months. We'll provide a detailed timeline during our initial consultation.",
              },
              {
                question: "Do you work with clients outside of Nepal?",
                answer:
                  "We work with clients globally and have successfully delivered projects for businesses in North America, Europe, Australia, and across Asia.",
              },
              {
                question: "What is your project process like?",
                answer:
                  "Our process typically includes discovery and planning, design, development, testing, deployment, and post-launch support. We follow agile methodologies to ensure transparent communication and regular updates throughout the project lifecycle.",
              },
              {
                question: "How do you handle project pricing?",
                answer:
                  "We offer flexible pricing models including fixed-price quotes for well-defined projects and time-and-materials billing for more complex or evolving projects. We provide detailed proposals with clear cost breakdowns before beginning any work.",
              },
              {
                question: "Do you provide ongoing maintenance and support?",
                answer:
                  "Yes, we offer various maintenance and support packages to ensure your digital products remain secure, up-to-date, and performing optimally after launch. Our support team is available to address any issues that may arise.",
              },
              {
                question: "How do I get started with Nepal Digital Heights?",
                answer:
                  "Simply fill out our contact form, email us, or give us a call. We'll schedule an initial consultation to discuss your project requirements, goals, and timeline, then provide you with a customized proposal.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-md border border-[#4A8EBC]/10 hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-lg font-semibold text-[#1A2A44] mb-3">{faq.question}</h3>
                <p className="text-[#2B4066]/80">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer/>

    </div>
  )
}


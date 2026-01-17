"use client"

import { useState, useEffect } from "react"
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, User, Briefcase, FileText } from "lucide-react"
import React from "react"
import Logo from "./Logo"
import toast from 'react-hot-toast'
import useFAQs from '../hooks/useFAQs'
import { useContacts } from '../hooks/useContacts'
import { useContactInfo } from '../hooks/useContactInfo'

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
  const [contactInfo, setContactInfo] = useState(null)

  // Fetch FAQs
  const { faqs, loading: faqsLoading, error: faqsError, fetchFAQs } = useFAQs()
  
  // Contact hooks
  const { createContact } = useContacts()
  const { fetchContactInfo } = useContactInfo()

  // Fetch contact info on component mount
  useEffect(() => {
    const loadContactInfo = async () => {
      try {
        const info = await fetchContactInfo()
        if (info.success && info.data.length > 0) {
          setContactInfo(info.data[0]) // Assuming we want the first contact info
        }
      } catch (error) {
        console.error('Failed to fetch contact info:', error)
      }
    }
    loadContactInfo()
  }, [fetchContactInfo])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const contactData = {
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.phone,
        companyName: formData.company,
        serviceInterested: formData.service,
        message: formData.message,
      };

      await createContact(contactData);
      setSubmitted(true);
      toast.success('Message sent successfully!');

      // Reset form after showing success message
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          service: "",
          message: "",
        });
        setSubmitted(false);
      }, 5000);
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
      console.error('Error submitting contact form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
                <div className="flex items-center justify-center gap-3">
                <Logo className="hidden sm:block h-8 w-auto" />
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-linear-to-r from-[#1A2A44] to-[#4A8EBC]">
                  Contact Us
                </h1>
              </div>
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
                    <div className="w-10 h-10 rounded-full bg-[#4A8EBC]/10 flex items-center justify-center mr-4 shrink-0">
                      <MapPin className="h-5 w-5 text-[#4A8EBC]" />
                    </div>
                    <div>
                      <h3 className="text-[#1A2A44] font-medium mb-1">Our Location</h3>
                      <p className="text-[#2B4066]/80 text-sm">
                        {contactInfo?.location?.address || 'Tillottama-5, Rupandehi'}
                        <br />
                        {contactInfo?.location?.city || 'Nepal'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-[#4A8EBC]/10 flex items-center justify-center mr-4 shrink-0">
                      <Mail className="h-5 w-5 text-[#4A8EBC]" />
                    </div>
                    <div>
                      <h3 className="text-[#1A2A44] font-medium mb-1">Email Us</h3>
                      <p className="text-[#2B4066]/80 text-sm">
                        {contactInfo?.email || 'info@ndhtechnologies.com'}
                        <br />
                        {contactInfo?.supportEmail || 'support@ndhtechnologies.com'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-[#4A8EBC]/10 flex items-center justify-center mr-4 shrink-0">
                      <Phone className="h-5 w-5 text-[#4A8EBC]" />
                    </div>
                    <div>
                      <h3 className="text-[#1A2A44] font-medium mb-1">Call Us</h3>
                      <p className="text-[#2B4066]/80 text-sm">
                        {contactInfo?.phone || '+9779867453240'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-[#4A8EBC]/10 flex items-center justify-center mr-4 shrink-0">
                      <Clock className="h-5 w-5 text-[#4A8EBC]" />
                    </div>
                    <div>
                      <h3 className="text-[#1A2A44] font-medium mb-1">Working Hours</h3>
                      <p className="text-[#2B4066]/80 text-sm">
                        {contactInfo?.workingHours || 'Sunday - Friday: 11:00 AM - 6:00 PM'}
                        <br />
                        {contactInfo?.timezone || 'Nepal Time (GMT+5:45)'}
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
                      className="w-full bg-linear-to-r from-[#3B5488] to-[#4A8EBC] text-white py-4 px-8 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
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
              Visit our office in Tilottama, Nepal or connect with us virtually from anywhere in the world.
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-xl overflow-hidden shadow-md border border-[#4A8EBC]/10 h-[400px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.370964295022!2d83.460144!3d27.690769!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399687b2e2e2e2e3%3A0x7e2e2e2e2e2e2e2e!2sTilottama%2C%20Nepal!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
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




    </div>
  )
}


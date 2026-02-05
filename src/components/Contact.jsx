"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Mail, Phone, MapPin, Clock, Send,
  MessageSquare, User, Briefcase, FileText,
  Sparkles, Globe, ArrowRight, ShieldCheck
} from "lucide-react"
import toast from 'react-hot-toast'
import axiosInstance from '../api/axios'


// Engineering Note: Centralized Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
}

export default function ContactAdvanced() {
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", company: "", service: "", message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Map frontend field names to backend schema
      const contactData = {
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.phone,
        companyName: formData.company,
        serviceInterested: formData.service,
        message: formData.message
      }

      const response = await axiosInstance.post('/api/contacts', contactData)

      if (response.data.success) {
        setSubmitted(true)
        toast.success('Communication Channel Established!')
        // Reset form
        setFormData({
          name: "", email: "", phone: "", company: "", service: "", message: ""
        })
      }
    } catch (error) {
      console.error('Contact submission error:', error)
      toast.error(error.response?.data?.message || 'Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] selection:bg-blue-100 overflow-x-hidden">
      {/* --- BACKGROUND ENGINEERING: SPATIAL DEPTH --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Grain texture */}
        <div className="fixed inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />

        {/* Blur orbs */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-[#4A8EBC]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#3B7AA8]/10 rounded-full blur-3xl" />
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-24">
        {/* --- HEADER SYSTEM --- */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="text-center mb-20"
        >
          <motion.div variants={itemVariants} className="flex items-center justify-center gap-2 mb-6">
            <span className="h-px w-12 bg-[#4A8EBC]" />
            <span className="text-xs font-black uppercase tracking-[0.3em] text-[#4A8EBC]">Global Outreach</span>
            <span className="h-px w-12 bg-[#4A8EBC]" />
          </motion.div>
          <motion.h1 variants={itemVariants} className="text-6xl md:text-7xl font-black text-neutral-900 tracking-tighter mb-6">
            Let&apos;s Build the <span className="text-[#4A8EBC]">Future.</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="text-xl text-neutral-500 max-w-2xl mx-auto leading-relaxed">
            Ready to scale your digital ecosystem? Our engineering team is standing by to translate your vision into high-performance reality.
          </motion.p>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* --- CONTACT INFO MODULE (3 Columns) --- */}
          <motion.aside
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="lg:col-span-4 space-y-6"
          >
            <ContactCard
              icon={<MapPin />}
              title="Location"
              detail="Tilottama-5, Rupandehi"
              subDetail="Lumbini Province, Nepal"
            />
            <ContactCard
              icon={<Mail />}
              title="Direct Email"
              detail="engineering@ndh.com"
              subDetail="Response within 24 hours"
            />
            <ContactCard
              icon={<Globe />}
              title="Global Support"
              detail="+977 9867453240"
              subDetail="Sun - Fri | 11AM - 6PM"
            />


          </motion.aside>

          {/* --- FORM MODULE (8 Columns) --- */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-8"
          >
            <div className="bg-white border border-neutral-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-[2.5rem] p-10 md:p-14 relative overflow-hidden">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-20"
                  >
                    <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
                      <Send size={40} />
                    </div>
                    <h2 className="text-3xl font-black mb-4">Transmission Successful</h2>
                    <p className="text-neutral-500 mb-8">Our architects are reviewing your requirements. Expect a briefing shortly.</p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-[#4A8EBC] font-bold flex items-center gap-2 mx-auto"
                    >
                      Send another message <ArrowRight size={16} />
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <InputField icon={<User />} label="Full Name" name="name" placeholder="Nikola Tesla" value={formData.name} onChange={handleChange} required />
                    <InputField icon={<Mail />} label="Email Address" name="email" type="email" placeholder="nikola@wardenclyffe.com" value={formData.email} onChange={handleChange} required />
                    <InputField icon={<Phone />} label="Phone Number" name="phone" type="tel" placeholder="+977-9876543210" value={formData.phone} onChange={handleChange} required />
                    <InputField icon={<Briefcase />} label="Company" name="company" placeholder="Tesla Electric" value={formData.company} onChange={handleChange} />
                    <div className="md:col-span-2">
                      <InputField icon={<FileText />} label="Service Area" name="service" isSelect options={['Web Ecosystems', 'Mobile Apps', 'Cloud Architecture', 'UI/UX Engineering']} value={formData.service} onChange={handleChange} required />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-black uppercase tracking-widest text-neutral-400 mb-3">Project Scope</label>
                      <textarea
                        name="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full bg-neutral-50 border-none rounded-2xl p-5 text-neutral-900 focus:ring-2 focus:ring-[#4A8EBC]/20 transition-all outline-none"
                        placeholder="Describe the challenge we're solving..."
                      />
                    </div>

                    <div className="md:col-span-2">
                      <button
                        disabled={isSubmitting}
                        className="w-full h-16 bg-neutral-900 text-white rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-[#4A8EBC] transition-all active:scale-[0.98] disabled:opacity-50"
                      >
                        {isSubmitting ? "Processing..." : "Initiate Contact"}
                        {!isSubmitting && <ArrowRight size={20} />}
                      </button>
                    </div>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </main>

      {/* --- MAP ENGINEERING: INTERACTIVE WRAPPER --- */}
      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto rounded-[3rem] overflow-hidden border border-neutral-100 shadow-2xl h-[500px] relative group">
          <div className="absolute inset-0 bg-neutral-900/10 pointer-events-none z-10 group-hover:opacity-0 transition-opacity" />
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.222723795556!2d83.46995631506198!3d27.63384238282371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3996860000000001%3A0xf6070737837077a5!2sTilottama%20Municipality!5e0!3m2!1sen!2snp!4v1620000000000!5m2!1sen!2snp"
            width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" title="Office Location"
          />
        </div>
      </section>
    </div>
  )
}

// --- SUB-COMPONENTS (Good Engineering Practice: Component Decomposition) ---

function ContactCard({ icon, title, detail, subDetail }) {
  return (
    <motion.div
      variants={itemVariants}
      className="p-8 rounded-[2rem] bg-white border border-neutral-50 shadow-sm hover:shadow-xl hover:border-[#4A8EBC]/20 transition-all group"
    >
      <div className="w-12 h-12 bg-[#4A8EBC]/10 rounded-xl flex items-center justify-center text-[#4A8EBC] mb-6 group-hover:scale-110 transition-transform">
        {React.cloneElement(icon, { size: 24 })}
      </div>
      <h3 className="text-xs font-black uppercase tracking-widest text-neutral-400 mb-2">{title}</h3>
      <p className="text-lg font-black text-neutral-900 mb-1">{detail}</p>
      <p className="text-sm text-neutral-500 font-medium">{subDetail}</p>
    </motion.div>
  )
}

function InputField({ label, icon, isSelect, options, ...props }) {
  return (
    <div>
      <label className="block text-xs font-black uppercase tracking-widest text-neutral-400 mb-3">{label}</label>
      <div className="relative group">
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-300 group-focus-within:text-[#4A8EBC] transition-colors">
          {React.cloneElement(icon, { size: 18 })}
        </div>
        {isSelect ? (
          <select {...props} className="w-full h-14 bg-neutral-50 border-none rounded-2xl pl-12 pr-5 text-neutral-900 focus:ring-2 focus:ring-[#4A8EBC]/20 outline-none appearance-none font-bold">
            <option value="">Select Service</option>
            {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        ) : (
          <input {...props} className="w-full h-14 bg-neutral-50 border-none rounded-2xl pl-12 pr-5 text-neutral-900 font-bold focus:ring-2 focus:ring-[#4A8EBC]/20 outline-none transition-all" />
        )}
      </div>
    </div>
  )
}
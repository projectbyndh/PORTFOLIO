import React from "react";
import { motion } from "framer-motion";
import { Shield, FileText, Scale, AlertCircle, CheckCircle, Mail } from "lucide-react";

export default function Terms() {
  const currentYear = new Date().getFullYear();

  const sections = [
    {
      icon: <FileText />,
      title: "1. Acceptance of Terms",
      content: [
        "By accessing and using Nepal Digital Heights' services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.",
        "These terms apply to all visitors, users, and others who access or use our services.",
        "If you disagree with any part of these terms, you may not access our services."
      ]
    },
    {
      icon: <Shield />,
      title: "2. Services Description",
      content: [
        "Nepal Digital Heights provides digital solutions including web development, mobile app development, digital marketing, UI/UX design, and related IT services.",
        "We reserve the right to modify, suspend, or discontinue any part of our services at any time without prior notice.",
        "Service specifications, timelines, and deliverables will be outlined in individual project agreements."
      ]
    },
    {
      icon: <Scale />,
      title: "3. Intellectual Property Rights",
      content: [
        "All content, features, and functionality of our services are owned by Nepal Digital Heights and are protected by international copyright, trademark, and other intellectual property laws.",
        "Upon full payment, clients receive ownership of the final deliverables as specified in the project agreement.",
        "Nepal Digital Heights retains the right to showcase completed projects in our portfolio unless otherwise agreed in writing."
      ]
    },
    {
      icon: <CheckCircle />,
      title: "4. User Responsibilities",
      content: [
        "You agree to provide accurate, current, and complete information during project engagement.",
        "You are responsible for maintaining the confidentiality of any account credentials provided.",
        "You agree not to use our services for any unlawful or prohibited activities.",
        "You must provide timely feedback and approvals as outlined in project timelines."
      ]
    },
    {
      icon: <AlertCircle />,
      title: "5. Payment Terms",
      content: [
        "Payment terms will be specified in individual project agreements and invoices.",
        "A deposit may be required before project commencement.",
        "Late payments may result in project delays or suspension of services.",
        "All fees are non-refundable unless otherwise stated in the project agreement."
      ]
    },
    {
      icon: <Shield />,
      title: "6. Confidentiality",
      content: [
        "We respect the confidentiality of your business information and project details.",
        "Both parties agree to maintain confidentiality of proprietary information shared during the engagement.",
        "We implement industry-standard security measures to protect your data.",
        "Confidentiality obligations survive the termination of our services."
      ]
    },
    {
      icon: <FileText />,
      title: "7. Warranties and Disclaimers",
      content: [
        "We strive to deliver high-quality services but do not guarantee uninterrupted or error-free operation.",
        "Services are provided 'as is' without warranties of any kind, either express or implied.",
        "We are not liable for any indirect, incidental, or consequential damages arising from the use of our services.",
        "Our total liability shall not exceed the amount paid for the specific service in question."
      ]
    },
    {
      icon: <Scale />,
      title: "8. Termination",
      content: [
        "Either party may terminate services with written notice as specified in the project agreement.",
        "Upon termination, you must pay for all services rendered up to the termination date.",
        "We reserve the right to terminate services immediately if terms are violated.",
        "Termination does not affect any rights or obligations that have accrued prior to termination."
      ]
    },
    {
      icon: <FileText />,
      title: "9. Modifications to Terms",
      content: [
        "We reserve the right to modify these terms at any time.",
        "Changes will be effective immediately upon posting on our website.",
        "Continued use of our services after changes constitutes acceptance of modified terms.",
        "Material changes will be communicated via email to active clients."
      ]
    },
    {
      icon: <Mail />,
      title: "10. Contact Information",
      content: [
        "For questions about these Terms and Conditions, please contact us at:",
        "Email: info@ndhtechnologies.com",
        "Phone: +977 9815408990",
        "Address: Tilottama-5, Manigram, Rupandehi, Nepal"
      ]
    }
  ];

  return (
    <section className="relative min-h-screen bg-[#FAFAFA] py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03]"
          style={{ backgroundImage: `radial-gradient(#4A8EBC 1.5px, transparent 1.5px)`, backgroundSize: '40px 40px' }} />
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-400/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-blue-100 shadow-sm mb-6">
            <Scale size={14} className="text-[#4A8EBC]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#4A8EBC]">
              Legal Framework
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-black text-neutral-900 tracking-tighter mb-6">
            Terms &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4A8EBC] via-[#3B7AA8] to-[#2D5F8C]">
              Conditions
            </span>
          </h1>

          <p className="text-lg text-neutral-500 max-w-2xl mx-auto font-medium">
            Please read these terms and conditions carefully before using our services.
          </p>

          <p className="text-sm text-neutral-400 mt-4">
            Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </motion.div>

        {/* Terms Sections */}
        <div className="space-y-6">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-3xl p-8 md:p-10 border border-neutral-200 shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#4A8EBC]/10 to-blue-500/5 text-[#4A8EBC] flex items-center justify-center flex-shrink-0">
                  {React.cloneElement(section.icon, { size: 24 })}
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-neutral-900 tracking-tight">
                  {section.title}
                </h2>
              </div>

              <div className="space-y-4 ml-16">
                {section.content.map((paragraph, pIndex) => (
                  <p key={pIndex} className="text-neutral-600 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-br from-[#1A2A44] to-[#0F172A] rounded-3xl p-10 text-white text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-6">
            <AlertCircle size={32} className="text-white" />
          </div>
          <h3 className="text-2xl font-black mb-4">Questions About Our Terms?</h3>
          <p className="text-blue-100/80 mb-6 max-w-2xl mx-auto">
            If you have any questions or concerns about these Terms and Conditions, please don't hesitate to contact our team.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#0F172A] rounded-2xl font-bold hover:scale-105 transition-all shadow-lg"
          >
            Contact Us
          </a>
        </motion.div>

        {/* Copyright */}
        <div className="mt-12 text-center">
          <p className="text-sm text-neutral-400">
            © {currentYear} Nepal Digital Heights. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
}

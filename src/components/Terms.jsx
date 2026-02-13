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
    <section className="relative min-h-screen bg-[#FAFAFA] pt-20 md:pt-24 lg:pt-28 pb-24">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03]"
          style={{ backgroundImage: `radial-gradient(#26a8df 1.5px, transparent 1.5px)`, backgroundSize: '40px 40px' }} />
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
            <Scale size={14} className="text-[#26a8df]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#26a8df]">
              Legal Framework
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-black text-[#26a8df] tracking-tighter mb-6">
            Terms &{' '}
            <span className="text-gradient-brand">
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
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#26a8df]/10 to-blue-500/5 text-[#26a8df] flex items-center justify-center flex-shrink-0">
                  {React.cloneElement(section.icon, { size: 24 })}
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-[#26a8df] tracking-tight">
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
          className="mt-12 sm:mt-14 md:mt-16 bg-gradient-to-br from-[#26a8df] to-[#0F172A] rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-8 text-white text-center max-w-3xl mx-auto"
        >
          <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-14 lg:h-14 rounded-xl sm:rounded-2xl lg:rounded-xl bg-white/10 flex items-center justify-center mx-auto mb-4 sm:mb-5 md:mb-6 lg:mb-5">
            <AlertCircle size={24} className="sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-7 lg:h-7 text-white" />
          </div>
          <h3 className="text-xl sm:text-2xl md:text-2xl lg:text-xl font-black mb-3 sm:mb-4 lg:mb-3">Questions About Our Terms?</h3>
          <p className="text-sm sm:text-base md:text-base lg:text-sm text-blue-100/80 mb-5 sm:mb-6 lg:mb-5 max-w-2xl mx-auto px-4">
            If you have any questions or concerns about these Terms and Conditions, please don't hesitate to contact our team.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-2.5 sm:px-7 sm:py-3 md:px-8 md:py-3.5 lg:px-6 lg:py-2.5 bg-white text-[#26a8df] rounded-xl sm:rounded-2xl lg:rounded-xl font-bold text-sm sm:text-base lg:text-sm hover:scale-105 transition-all shadow-lg"
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

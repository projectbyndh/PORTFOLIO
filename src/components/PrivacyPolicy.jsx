import React from "react";
import { motion } from "framer-motion";
import { Shield, Lock, Eye, Database, Cookie, Users, FileText, Mail, AlertCircle } from "lucide-react";

export default function PrivacyPolicy() {
  const currentYear = new Date().getFullYear();

  const sections = [
    {
      icon: <FileText />,
      title: "1. Introduction",
      content: [
        "Nepal Digital Heights is committed to protecting your privacy and ensuring the security of your personal information.",
        "This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.",
        "By using our services, you consent to the data practices described in this policy."
      ]
    },
    {
      icon: <Database />,
      title: "2. Information We Collect",
      content: [
        "Personal Information: We may collect personal identification information including name, email address, phone number, company name, and job title when you voluntarily provide it.",
        "Project Information: Details about your project requirements, business information, and technical specifications shared during consultations.",
        "Usage Data: We automatically collect information about how you interact with our website, including IP address, browser type, pages visited, and time spent on pages.",
        "Communication Data: Records of correspondence, support tickets, and feedback you provide to us."
      ]
    },
    {
      icon: <Eye />,
      title: "3. How We Use Your Information",
      content: [
        "Service Delivery: To provide, maintain, and improve our digital solutions and services tailored to your needs.",
        "Communication: To respond to your inquiries, send project updates, invoices, and important service notifications.",
        "Business Operations: To process payments, manage contracts, and maintain our client relationships.",
        "Marketing: To send you promotional materials about our services, with your consent (you can opt-out anytime).",
        "Analytics: To understand user behavior and improve our website and service offerings.",
        "Legal Compliance: To comply with legal obligations and protect our rights and interests."
      ]
    },
    {
      icon: <Lock />,
      title: "4. Data Security",
      content: [
        "We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.",
        "All sensitive data is encrypted during transmission using SSL/TLS protocols.",
        "Access to personal information is restricted to authorized personnel who need it to perform their job functions.",
        "We regularly review and update our security practices to ensure the highest level of protection.",
        "While we strive to protect your data, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security."
      ]
    },
    {
      icon: <Cookie />,
      title: "5. Cookies and Tracking Technologies",
      content: [
        "We use cookies and similar tracking technologies to enhance your browsing experience and analyze website traffic.",
        "Essential Cookies: Required for basic website functionality and cannot be disabled.",
        "Analytics Cookies: Help us understand how visitors interact with our website (e.g., Google Analytics).",
        "Marketing Cookies: Used to deliver relevant advertisements and track campaign effectiveness.",
        "You can control cookie preferences through your browser settings, though disabling cookies may limit website functionality."
      ]
    },
    {
      icon: <Users />,
      title: "6. Third-Party Services",
      content: [
        "We may use third-party service providers to help us operate our business and deliver services (e.g., payment processors, hosting providers, email services).",
        "These third parties have access to your information only to perform specific tasks on our behalf and are obligated to protect it.",
        "We do not sell, trade, or rent your personal information to third parties for marketing purposes.",
        "Our website may contain links to third-party websites; we are not responsible for their privacy practices."
      ]
    },
    {
      icon: <Shield />,
      title: "7. Your Privacy Rights",
      content: [
        "Access: You have the right to request copies of your personal data we hold.",
        "Correction: You can request correction of inaccurate or incomplete information.",
        "Deletion: You may request deletion of your personal data, subject to legal obligations.",
        "Opt-Out: You can unsubscribe from marketing communications at any time.",
        "Data Portability: You can request your data in a structured, machine-readable format.",
        "To exercise these rights, please contact us using the information provided below."
      ]
    },
    {
      icon: <Database />,
      title: "8. Data Retention",
      content: [
        "We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy.",
        "Project-related data is retained for the duration of the project and for a reasonable period afterward for support and legal purposes.",
        "Financial records are retained according to legal and accounting requirements.",
        "You may request deletion of your data at any time, subject to our legal obligations."
      ]
    },
    {
      icon: <FileText />,
      title: "9. Children's Privacy",
      content: [
        "Our services are not directed to individuals under the age of 18.",
        "We do not knowingly collect personal information from children.",
        "If we become aware that we have collected data from a child, we will take steps to delete such information promptly.",
        "Parents or guardians who believe we have collected information from a child should contact us immediately."
      ]
    },
    {
      icon: <AlertCircle />,
      title: "10. International Data Transfers",
      content: [
        "Nepal Digital Heights operates from Nepal, and your information may be transferred to and processed in Nepal.",
        "By using our services, you consent to the transfer of your information to Nepal and other countries where we operate.",
        "We ensure appropriate safeguards are in place to protect your data during international transfers.",
        "We comply with applicable data protection laws regarding international data transfers."
      ]
    },
    {
      icon: <FileText />,
      title: "11. Changes to This Policy",
      content: [
        "We reserve the right to update this Privacy Policy at any time to reflect changes in our practices or legal requirements.",
        "Changes will be effective immediately upon posting on our website.",
        "We will notify you of material changes via email or prominent notice on our website.",
        "We encourage you to review this policy periodically to stay informed about how we protect your information.",
        "Continued use of our services after changes constitutes acceptance of the updated policy."
      ]
    },
    {
      icon: <Mail />,
      title: "12. Contact Us",
      content: [
        "If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:",
        "Email: info@ndhtechnologies.com",
        "Phone: +977 9815408990",
        "Address: Nepal Digital Heights, Tilottama-5, Manigram, Rupandehi, Nepal",
        "We will respond to your inquiry within a reasonable timeframe."
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
            <Shield size={14} className="text-[#4A8EBC]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#4A8EBC]">
              Your Privacy Matters
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-black text-neutral-900 tracking-tighter mb-6">
            Privacy{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4A8EBC] via-[#3B7AA8] to-[#2D5F8C]">
              Policy
            </span>
          </h1>

          <p className="text-lg text-neutral-500 max-w-2xl mx-auto font-medium">
            We are committed to protecting your privacy and ensuring the security of your personal information.
          </p>

          <p className="text-sm text-neutral-400 mt-4">
            Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </motion.div>

        {/* Privacy Sections */}
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
            <Lock size={32} className="text-white" />
          </div>
          <h3 className="text-2xl font-black mb-4">Questions About Your Privacy?</h3>
          <p className="text-blue-100/80 mb-6 max-w-2xl mx-auto">
            If you have any questions or concerns about how we handle your data, our team is here to help.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#0F172A] rounded-2xl font-bold hover:scale-105 transition-all shadow-lg"
          >
            Contact Us
          </a>
        </motion.div>

        {/* Compliance Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-neutral-400">
            © {currentYear} Nepal Digital Heights. All rights reserved. | We are committed to GDPR compliance and data protection.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

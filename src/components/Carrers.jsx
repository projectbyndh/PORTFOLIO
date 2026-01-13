"use client"
import React, { useState, useEffect } from "react"
import { Briefcase, Mail, Phone, FileText, User, X, Upload, CheckCircle, MapPin, Clock } from "lucide-react"
import { generateApplicationPDF } from "../utils/pdf"

export default function Careers() {
  const [displayCareers, setDisplayCareers] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [selectedPosition, setSelectedPosition] = useState("")
  const [form, setForm] = useState({ name: "", email: "", phone: "", resume: null })
  const [success, setSuccess] = useState(false)
  const [dragActive, setDragActive] = useState(false)

  // Hardcoded career posts
  useEffect(() => {
    const dummyCareers = [
      { id: 1, image: 'https://via.placeholder.com/300x400?text=Software+Engineer' },
      { id: 2, image: 'https://via.placeholder.com/300x400?text=UI/UX+Designer' },
      { id: 3, image: 'https://via.placeholder.com/300x400?text=Project+Manager' },
    ];
    setDisplayCareers(dummyCareers);
  }, [])

  const handleApplyNow = (position) => {
    setSelectedPosition(position)
    setShowForm(true)
    setSuccess(false)
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setSelectedPosition("")
    setForm({ name: "", email: "", phone: "", resume: null })
    setSuccess(false)
  }

  const handleChange = (e) => {
    const { name, value, files } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }))
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setForm((prev) => ({ ...prev, resume: e.dataTransfer.files[0] }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Convert resume file to base64 for storage
    let resumeData = null
    if (form.resume) {
      resumeData = await new Promise((resolve) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result)
        reader.readAsDataURL(form.resume)
      })
    }
    
    const prev = JSON.parse(localStorage.getItem("careerApplications") || "[]")
    const newApp = {
      ...form,
      position: selectedPosition,
      id: Date.now(),
      resumeName: form.resume ? form.resume.name : "",
      resumeData: resumeData, // Store the actual file as base64
    }
    localStorage.setItem("careerApplications", JSON.stringify([...prev, newApp]))
    
    try {
      generateApplicationPDF(newApp)
    } catch (err) {
      console.warn("PDF generation failed:", err)
    }
    
    setSuccess(true)
    setTimeout(() => {
      handleCloseForm()
    }, 2000)
  }

  return (
    <div className="w-full min-h-screen bg-[#F5FAFF] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 left-10 w-64 h-64 rounded-full bg-[#4A8EBC]/5 animate-pulse"></div>
        <div className="absolute bottom-40 right-10 w-96 h-96 rounded-full bg-[#3B5488]/5 animate-pulse"></div>
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(#4A8EBC 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
          }}
        ></div>
      </div>

      {/* Hero Section */}
      <div className="w-full bg-linear-to-b from-[#E0F0FF] to-[#F5FAFF] py-16 px-4 sm:px-6 lg:px-8 relative">
        <svg
          className="absolute top-0 left-0 w-full h-32 opacity-10"
          viewBox="0 0 1440 320"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#4A8EBC"
            fillOpacity="1"
            d="M0,192L48,176C96,160,192,128,288,122.7C384,117,480,139,576,165.3C672,192,768,224,864,213.3C960,203,1056,149,1152,138.7C1248,128,1344,160,1392,176L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          ></path>
        </svg>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-block relative">
            <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-[#4A8EBC]/20 animate-pulse"></div>
            <div className="absolute -bottom-4 -right-4 w-8 h-8 rounded-full bg-[#3B5488]/20 animate-pulse"></div>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#4A8EBC]/10 rounded-full text-[#4A8EBC] text-sm font-medium mb-6">
              <Briefcase className="w-4 h-4" />
              We're Hiring!
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-linear-to-r from-[#1A2A44] to-[#4A8EBC]">
            Join Our Tech Revolution at <span className="text-[#4A8EBC]">NDH Tech!</span>
          </h1>
          <p className="text-lg text-[#2B4066]/80 max-w-3xl mx-auto mb-8">
            Explore open roles, meet our team, and apply to shape the future with NDH Tech!
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-[#2B4066]/70 text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#4A8EBC]" />
              Remote & On-site
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#4A8EBC]" />
              Full-time & Part-time
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#4A8EBC]" />
              Growth Opportunities
            </div>
          </div>
        </div>
      </div>

      {/* Positions Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A2A44] mb-4">
            Open Positions
          </h2>
          <p className="text-lg text-[#2B4066]/80 max-w-2xl mx-auto">
            Explore our current opportunities and find the perfect role for your skills and ambitions.
          </p>
        </div>

        {displayCareers.length === 0 ? (
          <div className="text-center py-20 rounded-xl bg-white/70 backdrop-blur-sm shadow-lg border border-[#4A8EBC]/10">
            <div className="w-24 h-24 bg-linear-to-br from-[#4A8EBC]/20 to-[#3B5488]/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Briefcase className="w-12 h-12 text-[#4A8EBC]" />
            </div>
            <h3 className="text-2xl font-semibold text-[#1A2A44] mb-3">No Openings Right Now</h3>
            <p className="text-[#2B4066]/80 max-w-md mx-auto mb-8">
              We don't have any open positions at the moment, but we're always looking for talented people. 
              Check back soon or send us your CV!
            </p>
            <a 
              href="mailto:careers@ndh.com" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-[#4A8EBC] to-[#3B5488] text-white font-semibold rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <Mail className="w-5 h-5" />
              Send Your CV
            </a>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayCareers.map((career, index) => (
                <div 
                  key={career.id} 
                  className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer bg-white border border-[#4A8EBC]/10"
                  onClick={() => handleApplyNow("Position")}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Large Image */}
                  <div className="aspect-3/4 w-full">
                    {career.image ? (
                      <img 
                        src={career.image} 
                        alt="Career opportunity" 
                        className="w-full h-full object-contain bg-white"
                      />
                    ) : (
                      <div className="w-full h-full bg-linear-to-br from-[#4A8EBC] to-[#3B5488] flex items-center justify-center">
                        <Briefcase className="w-20 h-20 text-white/50" />
                      </div>
                    )}
                  </div>
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-[#1A2A44]/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  {/* Apply Button */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <button
                      className="w-full py-3 px-6 bg-white/90 backdrop-blur-sm text-[#4A8EBC] font-bold rounded-full opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-white shadow-lg"
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Call to Action */}
            <div className="mt-16 text-center">
              <p className="text-[#2B4066]/80 mb-4">
                Click on any position above to apply, or send us your CV directly.
              </p>
              <a 
                href="mailto:careers@ndh.com" 
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#4A8EBC] text-[#4A8EBC] font-semibold rounded-full hover:bg-[#4A8EBC] hover:text-white transition-all duration-300"
              >
                <Mail className="w-5 h-5" />
                Send Your CV
              </a>
            </div>
          </>
        )}
      </div>

      {/* Why Join Us Section */}
      <div className="w-full bg-linear-to-t from-[#E0F0FF] to-[#F5FAFF] py-16 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A2A44] mb-4">
              Why Join NDH Tech?
            </h2>
            <p className="text-lg text-[#2B4066]/80 max-w-2xl mx-auto">
              We offer more than just a job – we offer a career path with growth, learning, and impact.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: "🚀", title: "Growth & Learning", desc: "Continuous learning opportunities and career advancement paths" },
              { icon: "💡", title: "Innovation First", desc: "Work on cutting-edge projects that shape the future of technology" },
              { icon: "🤝", title: "Great Team", desc: "Collaborate with talented professionals in a supportive environment" },
            ].map((item, i) => (
              <div key={i} className="text-center p-8 rounded-xl bg-white/70 backdrop-blur-sm shadow-lg border border-[#4A8EBC]/10 hover:shadow-xl hover:bg-white/90 transition-all duration-300">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-[#1A2A44] mb-2">{item.title}</h3>
                <p className="text-[#2B4066]/80">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Application Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={handleCloseForm} />
          
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="relative bg-linear-to-r from-[#4A8EBC] to-[#3B5488] px-8 py-6">
              <button
                onClick={handleCloseForm}
                className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
              <h2 className="text-2xl font-bold text-white">Apply for a Position</h2>
              <p className="text-white/80 mt-1">Join the NDH Tech team</p>
            </div>

            {/* Success State */}
            {success ? (
              <div className="p-8 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="text-xl font-bold text-[#1A2A44] mb-2">Application Submitted!</h3>
                <p className="text-[#2B4066]/80">Your PDF summary is downloading. We'll be in touch soon!</p>
              </div>
            ) : (
              /* Form */
              <form onSubmit={handleSubmit} className="p-8 space-y-5">
                {/* Name Field */}
                <div>
                  <label className="block text-sm font-semibold text-[#1A2A44] mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4A8EBC]/50" />
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className="w-full pl-12 pr-4 py-3 border border-[#4A8EBC]/20 rounded-lg focus:ring-2 focus:ring-[#4A8EBC] focus:border-transparent transition-all outline-none"
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-sm font-semibold text-[#1A2A44] mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4A8EBC]/50" />
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      className="w-full pl-12 pr-4 py-3 border border-[#4A8EBC]/20 rounded-lg focus:ring-2 focus:ring-[#4A8EBC] focus:border-transparent transition-all outline-none"
                    />
                  </div>
                </div>

                {/* Phone Field */}
                <div>
                  <label className="block text-sm font-semibold text-[#1A2A44] mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4A8EBC]/50" />
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+977 98XXXXXXXX"
                      required
                      className="w-full pl-12 pr-4 py-3 border border-[#4A8EBC]/20 rounded-lg focus:ring-2 focus:ring-[#4A8EBC] focus:border-transparent transition-all outline-none"
                    />
                  </div>
                </div>

                {/* CV Upload */}
                <div>
                  <label className="block text-sm font-semibold text-[#1A2A44] mb-2">
                    Upload CV / Resume
                  </label>
                  <div
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-all cursor-pointer ${
                      dragActive 
                        ? "border-[#4A8EBC] bg-[#E0F0FF]" 
                        : form.resume 
                          ? "border-green-500 bg-green-50" 
                          : "border-[#4A8EBC]/30 hover:border-[#4A8EBC] hover:bg-[#E0F0FF]/50"
                    }`}
                  >
                    <input
                      type="file"
                      name="resume"
                      accept=".pdf,.doc,.docx"
                      onChange={handleChange}
                      required
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    {form.resume ? (
                      <div className="flex items-center justify-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-green-600" />
                        </div>
                        <div className="text-left">
                          <p className="font-medium text-[#1A2A44] truncate max-w-[200px]">
                            {form.resume.name}
                          </p>
                          <p className="text-xs text-[#2B4066]/60">
                            {(form.resume.size / 1024).toFixed(1)} KB
                          </p>
                        </div>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-10 h-10 text-[#4A8EBC]/50 mx-auto mb-3" />
                        <p className="text-[#2B4066] font-medium">
                          Drop your CV here or <span className="text-[#4A8EBC]">browse</span>
                        </p>
                        <p className="text-xs text-[#2B4066]/60 mt-1">PDF, DOC, DOCX (Max 5MB)</p>
                      </>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-4 bg-linear-to-r from-[#4A8EBC] to-[#3B5488] text-white font-bold rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105">
                
                  Submit Application
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

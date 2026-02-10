"use client"
import React, { useState, useEffect } from "react"
import { Briefcase, Mail, MapPin, Clock, Loader2, X, CheckCircle } from "lucide-react"
import { useCareers } from "../hooks/useCareers"
import CareerApplicationForm from "./CareerApplicationForm"
import { getImageUrl } from "../utils/getImageUrl"

export default function Careers() {
  const [showForm, setShowForm] = useState(false)
  const [selectedCareer, setSelectedCareer] = useState(null)

  // Use the careers hook to fetch data from API
  const { careers, loading, error, fetchCareers } = useCareers()

  // Fetch careers on component mount
  useEffect(() => {
    fetchCareers().catch(err => {
      console.error('Failed to fetch careers:', err)
    })
  }, [fetchCareers])

  const handleApplyNow = (career) => {
    setSelectedCareer(career)
    setShowForm(true)
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setSelectedCareer(null)
  }


  return (
    <div className="w-full min-h-screen bg-[#FAFAFA] relative overflow-hidden pt-32">
      {/* Grain texture */}
      <div className="fixed inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none z-0" />

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 left-10 w-64 h-64 rounded-full bg-[#4A8EBC]/10 blur-3xl"></div>
        <div className="absolute bottom-40 right-10 w-96 h-96 rounded-full bg-[#3B7AA8]/10 blur-3xl"></div>
      </div>

      {/* Hero Section */}
      <div className="w-full bg-gradient-to-b from-white/60 to-[#FAFAFA] py-16 px-4 sm:px-6 lg:px-8 relative">
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
          <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-neutral-900">
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

        {careers.length === 0 ? (
          <div className="text-center py-20 rounded-xl bg-white/70 backdrop-blur-sm shadow-lg border border-[#4A8EBC]/10">
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-8 h-8 animate-spin text-[#4A8EBC]" />
                <span className="ml-2 text-[#2B4066]">Loading careers...</span>
              </div>
            ) : (
              <>
                <div className="w-24 h-24 bg-linear-to-br from-[#4A8EBC]/20 to-[#3B5488]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Briefcase className="w-12 h-12 text-[#4A8EBC]" />
                </div>
                <h3 className="text-2xl font-semibold text-[#1A2A44] mb-3">
                  {error ? 'Error Loading Careers' : 'No Openings Right Now'}
                </h3>
                <p className="text-[#2B4066]/80 max-w-md mx-auto mb-8">
                  {error
                    ? 'Unable to load career opportunities. Please try again later.'
                    : "We don't have any open positions at the moment, but we're always looking for talented people. Check back soon or send us your CV!"
                  }
                </p>
                <a
                  href="mailto:careers@ndh.com"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-[#4A8EBC] to-[#3B5488] text-white font-semibold rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <Mail className="w-5 h-5" />
                  Send Your CV
                </a>
              </>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {careers.map((career, index) => (
                <div
                  key={career.id || career._id}
                  className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-white border border-[#4A8EBC]/10 h-full flex flex-col"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Fixed Height Image Container */}
                  <div className="w-full h-64 relative overflow-hidden">
                    {career.image ? (
                      <img
                        src={getImageUrl(career.image, 'career')}
                        alt={career.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          const attemptedUrl = getImageUrl(career.image, 'career');
                          console.error("Failed to load career image:", attemptedUrl);
                          console.info("Original DB path was:", career.image);
                          e.target.onerror = null;
                          e.target.src = getImageUrl(null, 'career');
                        }}
                      // Force refresh link: v2
                      />
                    ) : (
                      <div className="w-full h-full bg-linear-to-br from-[#4A8EBC] to-[#3B5488] flex items-center justify-center">
                        <Briefcase className="w-16 h-16 text-white/60" />
                      </div>
                    )}
                  </div>

                  {/* Career Info - Flex grow to fill remaining space */}
                  <div className="p-6 bg-white flex-grow flex flex-col">
                    <h3 className="text-xl font-bold text-[#1A2A44] mb-2 line-clamp-2">{career.title}</h3>
                    <div className="flex items-center gap-2 text-[#2B4066]/70 mb-3">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{career.location}</span>
                    </div>
                    <p className="text-[#2B4066]/80 text-sm line-clamp-3 mb-4 flex-grow">
                      {career.description?.substring(0, 120)}...
                    </p>

                    {/* Apply Button - Always at bottom */}
                    <button
                      className="w-full py-3 px-6 bg-linear-to-r from-[#4A8EBC] to-[#3B5488] text-white font-semibold rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105 mt-auto"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleApplyNow(career);
                      }}
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
      <div className="w-full bg-gradient-to-t from-white/60 to-[#FAFAFA] py-16 px-4 sm:px-6 lg:px-8 relative">
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
      {showForm && selectedCareer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#1A2A44]/40 backdrop-blur-md" onClick={handleCloseForm} />

          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 z-10 bg-gradient-to-r from-[#4A8EBC] to-[#3B5488] px-8 py-6">
              <button
                onClick={handleCloseForm}
                className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
              <h2 className="text-2xl font-bold text-white">Apply for Position</h2>
              <p className="text-white/80 mt-1">Join the NDH Tech team</p>
            </div>

            {/* Application Form */}
            <div className="p-8">
              <CareerApplicationForm career={selectedCareer} onClose={handleCloseForm} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

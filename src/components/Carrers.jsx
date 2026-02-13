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
      // Silent error handling
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
    <div className="w-full min-h-screen bg-[#FAFAFA] relative pt-20 md:pt-24 lg:pt-28">
      {/* Grain texture */}
      <div className="fixed inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none z-0" />

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 left-10 w-64 h-64 rounded-full bg-[#4A8EBC]/10 blur-3xl"></div>
        <div className="absolute bottom-40 right-10 w-96 h-96 rounded-full bg-[#3B7AA8]/10 blur-3xl"></div>
      </div>

      {/* Hero Section */}
      <div className="w-full bg-gradient-to-b from-white/60 to-[#FAFAFA] py-8 sm:py-10 md:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 relative">
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
            <div className="absolute -top-2 sm:-top-3 md:-top-4 -left-2 sm:-left-3 md:-left-4 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-[#4A8EBC]/20 animate-pulse"></div>
            <div className="absolute -bottom-2 sm:-bottom-3 md:-bottom-4 -right-2 sm:-right-3 md:-right-4 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-[#3B5488]/20 animate-pulse"></div>
            <span className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-[#4A8EBC]/10 rounded-full text-[#4A8EBC] text-xs sm:text-sm font-medium mb-4 sm:mb-5 md:mb-6">
              <Briefcase className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
              We're Hiring!
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-4 sm:mb-5 md:mb-6 tracking-tight text-neutral-900">
            Join Our Tech Revolution at <span className="text-[#4A8EBC]">NDH Tech!</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-[#2B4066]/80 max-w-3xl mx-auto mb-6 sm:mb-7 md:mb-8 px-4">
            Explore open roles, meet our team, and apply to shape the future with NDH Tech!
          </p>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 text-[#2B4066]/70 text-xs sm:text-sm">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-[#4A8EBC]" />
              Remote & On-site
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-[#4A8EBC]" />
              Full-time & Part-time
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <CheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-[#4A8EBC]" />
              Growth Opportunities
            </div>
          </div>
        </div>
      </div>

      {/* Positions Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12 lg:py-16 relative z-10">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1A2A44] mb-3 sm:mb-4">
            Open Positions
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-[#2B4066]/80 max-w-2xl mx-auto px-4">
            Explore our current opportunities and find the perfect role for your skills and ambitions.
          </p>
        </div>

        {careers.length === 0 ? (
          <div className="text-center py-12 sm:py-14 md:py-16 lg:py-20 rounded-xl bg-white/70 backdrop-blur-sm shadow-lg border border-[#4A8EBC]/10">
            {loading ? (
              <div className="flex items-center justify-center py-6 sm:py-8">
                <Loader2 className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 animate-spin text-[#4A8EBC]" />
                <span className="ml-2 text-[#2B4066] text-sm sm:text-base">Loading careers...</span>
              </div>
            ) : (
              <>
                <div className="w-20 h-20 sm:w-22 sm:h-22 md:w-24 md:h-24 bg-linear-to-br from-[#4A8EBC]/20 to-[#3B5488]/20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-5 md:mb-6">
                  <Briefcase className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 text-[#4A8EBC]" />
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-[#1A2A44] mb-2 sm:mb-3">
                  {error ? 'Error Loading Careers' : 'No Openings Right Now'}
                </h3>
                <p className="text-[#2B4066]/80 max-w-md mx-auto mb-6 sm:mb-7 md:mb-8 text-sm sm:text-base px-4">
                  {error
                    ? 'Unable to load career opportunities. Please try again later.'
                    : "We don't have any open positions at the moment, but we're always looking for talented people. Check back soon or send us your CV!"
                  }
                </p>
                <a
                  href="mailto:careers@ndh.com"
                  className="inline-flex items-center gap-2 px-5 sm:px-6 md:px-7 lg:px-5 py-2.5 sm:py-3 md:py-3 lg:py-2.5 bg-linear-to-r from-[#4A8EBC] to-[#3B5488] text-white text-sm sm:text-base md:text-base lg:text-sm font-semibold rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 lg:w-4 lg:h-4" />
                  Send Your CV
                </a>
              </>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
              {careers.map((career, index) => (
                <div
                  key={career.id || career._id}
                  className="group relative rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-white border border-[#4A8EBC]/10 h-full flex flex-col"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Fixed Height Image Container */}
                  <div className="w-full h-48 sm:h-56 md:h-60 lg:h-64 relative overflow-hidden">
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
                        <Briefcase className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-white/60" />
                      </div>
                    )}
                  </div>

                  {/* Career Info - Flex grow to fill remaining space */}
                  <div className="p-4 sm:p-5 md:p-6 bg-white flex-grow flex flex-col">
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#1A2A44] mb-1.5 sm:mb-2 line-clamp-2">{career.title}</h3>
                    <div className="flex items-center gap-1.5 sm:gap-2 text-[#2B4066]/70 mb-2 sm:mb-2.5 md:mb-3">
                      <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                      <span className="text-xs sm:text-sm">{career.location}</span>
                    </div>
                    <p className="text-[#2B4066]/80 text-xs sm:text-sm line-clamp-3 mb-3 sm:mb-3.5 md:mb-4 flex-grow">
                      {career.description?.substring(0, 120)}...
                    </p>

                    {/* Apply Button - Always at bottom */}
                    <button
                      className="w-full py-2.5 sm:py-3 md:py-3 lg:py-2.5 px-4 sm:px-5 md:px-6 lg:px-4 bg-linear-to-r from-[#4A8EBC] to-[#3B5488] text-white text-sm sm:text-base md:text-base lg:text-sm font-semibold rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105 mt-auto"
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
            <div className="mt-10 sm:mt-12 md:mt-14 lg:mt-12 text-center">
              <p className="text-[#2B4066]/80 mb-3 sm:mb-4 text-sm sm:text-base px-4">
                Click on any position above to apply, or send us your CV directly.
              </p>
              <a
                href="mailto:careers@ndh.com"
                className="inline-flex items-center gap-2 px-5 sm:px-6 md:px-7 lg:px-5 py-2.5 sm:py-3 md:py-3 lg:py-2.5 border-2 border-[#4A8EBC] text-[#4A8EBC] text-sm sm:text-base md:text-base lg:text-sm font-semibold rounded-full hover:bg-[#4A8EBC] hover:text-white transition-all duration-300"
              >
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 lg:w-4 lg:h-4" />
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

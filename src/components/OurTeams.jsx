"use client"

import React, { useEffect, useState } from "react"
import Logo from "./Logo"
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion"
import axiosInstance from "../api/axios"
import { getImageUrl } from "../utils/getImageUrl"
import Loader from "./Loader"

export default function OurTeams() {
  const [teamData, setTeamData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPublicTeam = async () => {
      try {
        setLoading(true)
        const response = await axiosInstance.get('/api/team-structure/structure/public')
        if (response.data.success) {
          setTeamData(response.data.data)
        }
      } catch (err) {
        console.error('Failed to fetch team structure:', err)
        setError('Failed to load team data')
      } finally {
        setLoading(false)
      }
    }
    fetchPublicTeam()
  }, [])

  if (loading) return <Loader />

  if (error) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] py-12 flex items-center justify-center relative">
        <div className="fixed inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none z-0" />
        <div className="text-center">
          <div className="text-red-500 mb-4">{error}</div>
          <button onClick={() => window.location.reload()} className="bg-[#4A8EBC] hover:bg-[#3B7AA8] text-white font-bold py-2 px-6 rounded-xl">
            Retry
          </button>
        </div>
      </div>
    )
  }

  const hasMembers = teamData.some(layer => layer.members && layer.members.length > 0)

  return (
    <div className="min-h-screen bg-[#FAFAFA] relative overflow-hidden pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Grain texture */}
      <div className="fixed inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none z-0" />

      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-[#4A8EBC]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#3B7AA8]/10 rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl">
        {/* Header with animation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12 text-center sm:mb-16"
        >
          <div className="flex items-center justify-center gap-3">
            <Logo className="hidden sm:block h-8 w-auto" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-3 sm:mb-4 tracking-tight text-neutral-900 leading-tight">
              Meet Our Team
            </h1>
          </div>
          <p className="text-base sm:text-lg text-[#2B4A6F]/70 max-w-2xl mx-auto px-4 leading-relaxed">
            The creative minds behind our success, driven by passion and innovation
          </p>
        </motion.div>

        {!hasMembers ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20 bg-white/50 backdrop-blur-xl rounded-3xl border border-white/60 max-w-2xl mx-auto"
          >
            <div className="text-6xl mb-6">👥</div>
            <h3 className="text-2xl font-black text-neutral-900 mb-2">Team Coming Soon</h3>
            <p className="text-neutral-500">We are currently updating our team directory.</p>
          </motion.div>
        ) : (
          <>
            {/* Dynamic Sections Based on Layers - fully from backend */}
            {teamData.map((layer, layerIdx) => {
              if (!layer.members || layer.members.length === 0) return null

              return (
                <motion.div
                  key={layer.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: layerIdx * 0.1 }}
                  className="mb-16 sm:mb-24 last:mb-0"
                >
                  <div className="mb-8 text-center sm:mb-12">
                    <div className="flex items-center justify-center gap-3 mb-4">
                      {layer.image ? (
                        <img
                          src={getImageUrl(layer.image, 'default')}
                          alt=""
                          className="h-8 w-8 sm:h-10 sm:w-10 object-contain"
                        />
                      ) : (
                        <Logo className="hidden sm:block h-6 sm:h-8 w-auto" />
                      )}
                      <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#1A2A44] tracking-tight">
                        {layer.title}
                      </h2>
                    </div>
                    {layer.description && (
                      <p className="text-[#2B4A6F]/60 max-w-2xl mx-auto mb-4">{layer.description}</p>
                    )}
                    <div className="w-24 h-1.5 bg-gradient-to-r from-[#4A8EBC] to-[#3B5488] mx-auto rounded-full"></div>
                  </div>

                  <div className={`grid gap-6 sm:gap-8 max-w-7xl mx-auto ${
                    layer.members.length === 1 ? 'grid-cols-1 max-w-md mx-auto' :
                    layer.members.length === 2 ? 'grid-cols-1 sm:grid-cols-2 max-w-3xl mx-auto' :
                    layer.members.length === 3 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' :
                    'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
                  }`}>
                    {layer.members.map((member, idx) => (
                      <motion.div
                        key={member.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.5,
                          delay: 0.2 + idx * 0.05,
                          ease: [0.25, 0.46, 0.45, 0.94],
                        }}
                        whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.3, ease: "easeOut" } }}
                        className="relative flex flex-col items-center p-6 transition-all duration-300 bg-white border border-gray-100 shadow-md rounded-2xl hover:shadow-xl group overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-[#4A8EBC]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="relative z-10 mb-5">
                          <div className="relative">
                            <img
                              src={getImageUrl(member.image, 'team')}
                              alt={member.name}
                              className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-white shadow-lg"
                              onError={(e) => { e.currentTarget.src = getImageUrl(null, 'team') }}
                            />
                            <div className="absolute inset-0 rounded-full border-2 border-[#4A8EBC]/10 group-hover:border-[#4A8EBC]/30 transition-colors duration-300"></div>
                          </div>
                        </div>

                        <div className="font-bold text-lg text-[#1A2A44] mb-1 text-center relative z-10">{member.name}</div>
                        <div className="text-[#4A8EBC] text-sm font-bold mb-3 uppercase tracking-wider relative z-10">
                          {member.roleTitle || 'Team Member'}
                        </div>
                        {member.bio && (
                          <div className="text-sm leading-relaxed text-center text-gray-500 relative z-10 line-clamp-3">
                            {member.bio}
                          </div>
                        )}

                        {/* Social Links */}
                        {member.socialLinks && (member.socialLinks.linkedin || member.socialLinks.github || member.socialLinks.email) && (
                          <div className="mt-4 flex gap-2 relative z-10">
                            {member.socialLinks.linkedin && (
                              <a href={member.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg bg-neutral-100 hover:bg-[#0077B5] hover:text-white transition-all text-neutral-400 text-xs">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                              </a>
                            )}
                            {member.socialLinks.github && (
                              <a href={member.socialLinks.github} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg bg-neutral-100 hover:bg-[#333] hover:text-white transition-all text-neutral-400 text-xs">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
                              </a>
                            )}
                            {member.socialLinks.email && (
                              <a href={`mailto:${member.socialLinks.email}`} className="p-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-800 hover:text-white transition-all text-neutral-400 text-xs">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                              </a>
                            )}
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </>
        )}
      </div>
    </div>
  )
}

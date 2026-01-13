"use client"

import React, { useEffect, useState } from "react"
import Logo from "./Logo"
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion"
import navin from "../assets/navin.png"
import sagar from "../assets/sagar.png"
import prajwal from "../assets/prajwal.png"
import sunil from "../assets/sunil.png"
import suman from "../assets/suman.png"
import rajesh from "../assets/rajesh.png"
import bibek from "../assets/bibek.png"
import vipul from "../assets/vipul.png"

const defaultTeamMembers = [
  {
    name: "Navin Pandey",
    position: "CEO",
    level: "executive",
    bio: "With a strong vision for digital transformation, Navin leads our team with passion and innovation.",
    image_url: navin,
  },
  {
    name: "Sagar Aryal",
    position: "CTO",
    level: "executive",
    bio: "Sagar is an expert in full-stack development, driving our technical strategies and agile methodologies.",
    image_url: sagar,
  },
  {
    name: "Prajwal Pandey",
    position: "CFO",
    level: "executive",
    bio: "Prajwal manages our financial strategies, ensuring sustainable growth and profitability.",
    image_url: prajwal,
  },
  {
    name: "Sunil Poudel",
    position: "QA Head",
    level: "executive",
    bio: "Sunil oversees quality assurance, ensuring our products meet the highest standards of excellence.",
    image_url: sunil,
  },
  {
    name: "Suman Acharya",
    position: "Marketing Head",
    level: "management",
    bio: "Suman excels in crafting effective marketing strategies that drive brand growth and engagement.",
    image_url: suman,
  },
  {
    name: "Rajesh Subedi",
    position: "Lead Engineer",
    level: "management",
    bio: "Rajesh specializes in creating intuitive user experiences, ensuring our platforms are user-friendly and engaging.",
    image_url: rajesh,
  },
  {
    name: "Bibek Pandey",
    position: "Software Engineer",
    level: "staff",
    bio: "Bibek is a rising star in our development team, contributing fresh ideas and innovative solutions.",
    image_url: bibek,
  },
  {
    name: "Vipul Pun",
    position: "Software Engineer",
    level: "staff",
    bio: "Vipul is a talented developer bringing creativity and technical expertise to our engineering team.",
    image_url: vipul,
  },
]

// Animated NDH Character Component
const AnimatedNDHCharacter = () => {
  return (
    <motion.svg
      width="120"
      height="120"
      viewBox="0 0 120 120"
      className="w-24 h-24"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
      }}
    >
      {/* Head */}
      <motion.circle
        cx="60"
        cy="35"
        r="20"
        fill="#FFD7A8"
        animate={{
          y: [0, -2, 0],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* Eyes */}
      <motion.g
        animate={{
          scaleY: [1, 0.1, 1],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          repeatDelay: 2,
        }}
      >
        <circle cx="53" cy="32" r="2.5" fill="#333" />
        <circle cx="67" cy="32" r="2.5" fill="#333" />
      </motion.g>

      {/* Smile */}
      <path d="M 52 40 Q 60 44 68 40" stroke="#333" strokeWidth="1.5" fill="none" strokeLinecap="round" />

      {/* Hoodie Body */}
      <motion.g
        animate={{
          y: [0, -2, 0],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 0.1,
        }}
      >
        {/* Main Hoodie */}
        <path
          d="M 35 55 L 30 95 L 50 95 L 50 58 L 60 50 L 70 50 L 70 58 L 70 95 L 90 95 L 85 55 Q 80 48 60 48 Q 40 48 35 55"
          fill="#1a1a1a"
        />

        {/* Hood */}
        <ellipse cx="60" cy="48" rx="25" ry="15" fill="#1a1a1a" />

        {/* Hood Opening */}
        <ellipse cx="60" cy="48" rx="20" ry="13" fill="#2a2a2a" />

        {/* NDH Text on Hoodie */}
        <text
          x="60"
          y="75"
          fontSize="12"
          fontWeight="bold"
          fill="#fff"
          textAnchor="middle"
          fontFamily="Arial, sans-serif"
        >
          NDH
        </text>

        {/* Hoodie Strings */}
        <line x1="52" y1="50" x2="48" y2="60" stroke="#444" strokeWidth="1.5" />
        <line x1="68" y1="50" x2="72" y2="60" stroke="#444" strokeWidth="1.5" />
        <circle cx="48" cy="60" r="2" fill="#444" />
        <circle cx="72" cy="60" r="2" fill="#444" />

        {/* Center Zipper */}
        <line x1="60" y1="55" x2="60" y2="95" stroke="#555" strokeWidth="1" />
      </motion.g>

      {/* Arms with wave animation */}
      <motion.g
        animate={{
          rotate: [0, 15, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{ originX: "25px", originY: "60px" }}
      >
        <ellipse cx="25" cy="60" rx="8" ry="18" fill="#1a1a1a" transform="rotate(-20 25 60)" />
      </motion.g>

      <motion.g
        animate={{
          rotate: [0, -15, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 0.75,
        }}
        style={{ originX: "95px", originY: "60px" }}
      >
        <ellipse cx="95" cy="60" rx="8" ry="18" fill="#1a1a1a" transform="rotate(20 95 60)" />
      </motion.g>

      {/* Sparkles around character */}
      <motion.circle
        cx="20"
        cy="30"
        r="2"
        fill="#4A8EBC"
        animate={{
          scale: [0, 1, 0],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          delay: 0,
        }}
      />
      <motion.circle
        cx="100"
        cy="40"
        r="2"
        fill="#4A8EBC"
        animate={{
          scale: [0, 1, 0],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          delay: 0.7,
        }}
      />
      <motion.circle
        cx="25"
        cy="80"
        r="1.5"
        fill="#4A8EBC"
        animate={{
          scale: [0, 1, 0],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          delay: 1.4,
        }}
      />
    </motion.svg>
  )
}

export default function OurTeams() {
  const displayMembers = defaultTeamMembers

  const executiveTeam = displayMembers.filter((m) => m.level === "executive")
  const managementTeam = displayMembers.filter((m) => m.level === "management")
  const staffTeam = displayMembers.filter((m) => m.level === "staff")

  return (
    <div className="min-h-screen bg-linear-to-br from-[#F5FAFF] via-[#EBF5FF] to-[#F5FAFF] py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
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
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 bg-clip-text text-transparent bg-linear-to-r from-[#1A2A44] via-[#2B4A6F] to-[#4A8EBC] leading-tight">
              Meet Our Team
            </h1>
          </div>
          <p className="text-base sm:text-lg text-[#2B4A6F]/70 max-w-2xl mx-auto px-4 leading-relaxed">
            The creative minds behind our success, driven by passion and innovation
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="max-w-md mx-auto mb-12 sm:mb-16"
        >
          <motion.div
            whileHover={{
              y: -8,
              scale: 1.02,
              transition: { duration: 0.3, ease: "easeOut" },
            }}
            className="bg-linear-to-br from-white to-[#F0F9FF] rounded-3xl shadow-xl hover:shadow-2xl p-6 sm:p-8 flex flex-col items-center relative overflow-hidden group transition-all duration-300 border border-[#4A8EBC]/10"
          >
            {/* Decorative background element */}
            <div className="absolute inset-0 bg-linear-to-br from-[#4A8EBC]/5 via-[#4A8EBC]/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Animated rings around mascot */}
            <motion.div
              className="absolute -translate-x-1/2 top-8 left-1/2"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <div className="w-32 h-32 rounded-full border-2 border-[#4A8EBC]" />
            </motion.div>

            <div className="relative z-10 flex items-center justify-center h-32 mb-6">
              <AnimatedNDHCharacter />
            </div>

            <motion.div
              className="font-bold text-xl sm:text-2xl text-[#1A2A44] mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              NDH Team
            </motion.div>

            <motion.div
              className="text-[#4A8EBC] font-semibold mb-3 text-sm sm:text-base"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Company Mascot
            </motion.div>

            <motion.div
              className="px-2 text-sm leading-relaxed text-center text-gray-600 sm:text-base"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Our creative spirit, always ready to innovate in the signature black hoodie!
            </motion.div>

            {/* Badge */}
            <motion.div
              className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-linear-to-r from-[#4A8EBC] to-[#2B4A6F] text-white text-xs px-3 py-1.5 rounded-full font-medium shadow-lg"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, type: "spring" }}
            >
              ⭐ Mascot
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 sm:mb-16"
        >
          <div className="mb-6 text-center sm:mb-8">
            <div className="flex items-center justify-center gap-2">
              <Logo className="hidden sm:block h-6 w-auto" />
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1A2A44] mb-2">Executive Leadership</h2>
            </div>
            <div className="w-20 h-1 bg-linear-to-r from-[#4A8EBC] to-[#2B4A6F] mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 sm:gap-8">
            {executiveTeam.map((member, idx) => (
              <motion.div
                key={member.name + idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.3 + idx * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
                className="relative flex flex-col items-center p-6 overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-lg rounded-2xl hover:shadow-2xl group"
              >
                <div className="absolute inset-0 bg-linear-to-br from-[#4A8EBC]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 mb-4">
                  <motion.div
                    whileHover={{ scale: 1.08, rotate: 3 }}
                    transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
                  >
                    <div className="relative">
                      <img
                        src={member.image_url || "/placeholder.svg"}
                        alt={member.name}
                        className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-[#4A8EBC]/20 shadow-md"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.svg?height=120&width=120"
                        }}
                      />
                      <div className="absolute inset-0 rounded-full bg-linear-to-br from-[#4A8EBC]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </motion.div>
                </div>

                <div className="font-bold text-base sm:text-lg text-[#1A2A44] mb-1 text-center relative z-10">
                  {member.name}
                </div>
                <div className="text-[#4A8EBC] font-semibold mb-3 text-xs sm:text-sm relative z-10">
                  {member.position}
                </div>
                <div className="relative z-10 text-xs leading-relaxed text-center text-gray-600 sm:text-sm">
                  {member.short_description || member.bio}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12 sm:mb-16"
        >
          <div className="mb-6 text-center sm:mb-8">
            <div className="flex items-center justify-center gap-2">
              <Logo className="hidden sm:block h-6 w-auto" />
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1A2A44] mb-2">Department Leaders</h2>
            </div>
            <div className="w-20 h-1 bg-linear-to-r from-[#4A8EBC] to-[#2B4A6F] mx-auto rounded-full"></div>
          </div>
          <div className="grid max-w-3xl grid-cols-1 gap-6 mx-auto sm:grid-cols-2 sm:gap-8">
            {managementTeam.map((member, idx) => (
              <motion.div
                key={member.name + idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.5 + idx * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
                className="relative flex flex-col items-center p-6 overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-lg rounded-2xl hover:shadow-2xl group"
              >
                <div className="absolute inset-0 bg-linear-to-br from-[#4A8EBC]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 mb-4">
                  <motion.div
                    whileHover={{ scale: 1.08, rotate: -3 }}
                    transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
                  >
                    <div className="relative">
                      <img
                        src={member.image_url || "/placeholder.svg"}
                        alt={member.name}
                        className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-[#4A8EBC]/20 shadow-md"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.svg?height=120&width=120"
                        }}
                      />
                      <div className="absolute inset-0 rounded-full bg-linear-to-br from-[#4A8EBC]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </motion.div>
                </div>

                <div className="font-bold text-base sm:text-lg text-[#1A2A44] mb-1 text-center relative z-10">
                  {member.name}
                </div>
                <div className="text-[#4A8EBC] font-semibold mb-3 text-xs sm:text-sm relative z-10">
                  {member.position}
                </div>
                <div className="relative z-10 text-xs leading-relaxed text-center text-gray-600 sm:text-sm">
                  {member.short_description || member.bio}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="mb-6 text-center sm:mb-8">
            <div className="flex items-center justify-center gap-2">
              <Logo className="hidden sm:block h-6 w-auto" />
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1A2A44] mb-2">Team Members</h2>
            </div>
            <div className="w-20 h-1 bg-linear-to-r from-[#4A8EBC] to-[#2B4A6F] mx-auto rounded-full"></div>
          </div>
          <div className="grid max-w-3xl grid-cols-1 gap-6 mx-auto sm:grid-cols-2 sm:gap-8">
            {staffTeam.map((member, idx) => (
              <motion.div
                key={member.name + idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.7 + idx * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
                className="relative flex flex-col items-center p-6 overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-lg rounded-2xl hover:shadow-2xl group"
              >
                <div className="absolute inset-0 bg-linear-to-br from-[#4A8EBC]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 mb-4">
                  <motion.div
                    whileHover={{ scale: 1.08, rotate: 3 }}
                    transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
                  >
                    <div className="relative">
                      <img
                        src={member.image_url || "/placeholder.svg"}
                        alt={member.name}
                        className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-[#4A8EBC]/20 shadow-md"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.svg?height=120&width=120"
                        }}
                      />
                      <div className="absolute inset-0 rounded-full bg-linear-to-br from-[#4A8EBC]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </motion.div>
                </div>

                <div className="font-bold text-base sm:text-lg text-[#1A2A44] mb-1 text-center relative z-10">
                  {member.name}
                </div>
                <div className="text-[#4A8EBC] font-semibold mb-3 text-xs sm:text-sm relative z-10">
                  {member.position}
                </div>
                <div className="relative z-10 text-xs leading-relaxed text-center text-gray-600 sm:text-sm">
                  {member.short_description || member.bio}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

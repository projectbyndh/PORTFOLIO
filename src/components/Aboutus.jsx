"use client"
import Footer from "../components/Footer"

import { useState, useEffect } from "react"
import { Users, Award, Target, Clock, ArrowRight } from "lucide-react"
import React from "react"

export default function AboutUs() {
  const [animatedItems, setAnimatedItems] = useState([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = Number.parseInt(entry.target.id.split("-")[1])
            setAnimatedItems((prev) => [...prev, id])
          }
        })
      },
      { threshold: 0.1 },
    )

    document.querySelectorAll(".animate-on-scroll").forEach((item) => {
      observer.observe(item)
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  const isAnimated = (id) => animatedItems.includes(id)

  // Team members data
  const teamMembers = [
    {
      name: "Rajesh Sharma",
      position: "Founder & CEO",
      image: "/images/team-1.jpg",
      bio: "With over 15 years of experience in IT, Rajesh leads our vision and strategy with passion and innovation.",
    },
    {
      name: "Anita Gurung",
      position: "CTO",
      image: "/images/team-2.jpg",
      bio: "Anita brings technical excellence and forward-thinking leadership to our development processes.",
    },
    {
      name: "Sunil Patel",
      position: "Design Director",
      image: "/images/team-3.jpg",
      bio: "Sunil's creative vision ensures our designs are both beautiful and functional for our clients.",
    },
    {
      name: "Priya Thapa",
      position: "Marketing Head",
      image: "/images/team-4.jpg",
      bio: "Priya drives our digital marketing strategies with data-driven insights and creativity.",
    },
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
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#1A2A44] to-[#4A8EBC]">
                About Us
              </h1>
            </div>
            <p className="mt-4 text-lg text-[#2B4066]/80 max-w-2xl mx-auto">
              Pioneering digital excellence from the heart of Nepal to the world.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-16">
            <div
              id="about-1"
              className={`animate-on-scroll transition-all duration-700 ${
                isAnimated(1) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-[#4A8EBC]/10 animate-pulse-slow"></div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-[#3B5488]/10 animate-pulse-slow"></div>
                <div className="relative rounded-2xl overflow-hidden shadow-xl border border-[#4A8EBC]/10">
                  <img
                    src="/placeholder.svg?height=500&width=600"
                    alt="Nepal Digital Heights Office"
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#1A2A44]/80 to-transparent p-6">
                    <p className="text-white text-sm">Our modern office in Butwal, Nepal</p>
                  </div>
                </div>
              </div>
            </div>

            <div
              id="about-2"
              className={`animate-on-scroll transition-all duration-900 ${
                isAnimated(2) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <h2 className="text-3xl font-bold text-[#1A2A44] mb-6">Our Story</h2>
              <p className="text-[#2B4066]/80 mb-6 leading-relaxed">
                Founded in 2013, Nepal Digital Heights began with a simple mission: to provide world-class digital
                solutions from Nepal to the global market. What started as a small team of passionate developers has
                grown into a comprehensive digital agency with expertise across web development, mobile applications,
                digital marketing, and IT consulting.
              </p>
              <p className="text-[#2B4066]/80 mb-8 leading-relaxed">
                Today, we're proud to have served over 200 clients across 10+ countries, delivering innovative solutions
                that drive business growth and digital transformation. Our team combines local talent with global
                perspectives to create digital experiences that stand out in today's competitive landscape.
              </p>
              <a
                href="#team"
                className="inline-flex items-center text-[#4A8EBC] font-semibold hover:text-[#3B5488] transition-colors duration-300 group"
              >
                Meet our team{" "}
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gradient-to-b from-[#F5FAFF] to-[#E0F0FF] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#1A2A44] mb-4">Our Core Values</h2>
            <p className="text-[#2B4066]/80 max-w-2xl mx-auto">
              These principles guide everything we do and define who we are as a company.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Target className="h-8 w-8 text-[#4A8EBC]" />,
                title: "Excellence",
                description:
                  "We strive for excellence in every project, delivering solutions that exceed expectations.",
              },
              {
                icon: <Users className="h-8 w-8 text-[#4A8EBC]" />,
                title: "Collaboration",
                description: "We believe in the power of teamwork and partnership with our clients.",
              },
              {
                icon: <Award className="h-8 w-8 text-[#4A8EBC]" />,
                title: "Integrity",
                description: "We operate with honesty, transparency, and ethical business practices.",
              },
              {
                icon: <Clock className="h-8 w-8 text-[#4A8EBC]" />,
                title: "Innovation",
                description: "We embrace change and continuously seek new ways to solve problems.",
              },
            ].map((value, index) => (
              <div
                key={value.title}
                id={`about-${index + 3}`}
                className={`animate-on-scroll bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-md border border-[#4A8EBC]/10 hover:shadow-lg transition-all duration-300 ${
                  isAnimated(index + 3) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 rounded-full bg-[#4A8EBC]/10 flex items-center justify-center mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-[#1A2A44] mb-3">{value.title}</h3>
                <p className="text-[#2B4066]/80">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block relative">
              <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-[#4A8EBC]/20 animate-pulse-slow"></div>
              <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#1A2A44] to-[#4A8EBC] mb-4">
                Meet Our Leadership
              </h2>
            </div>
            <p className="text-[#2B4066]/80 max-w-2xl mx-auto">
              The talented individuals who drive our vision and lead our teams to success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={member.name}
                id={`about-${index + 7}`}
                className={`animate-on-scroll bg-white/70 backdrop-blur-sm rounded-xl overflow-hidden shadow-md border border-[#4A8EBC]/10 hover:shadow-lg transition-all duration-300 group ${
                  isAnimated(index + 7) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={member.image || "/placeholder.svg?height=300&width=300"}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      const target = e.target 
                      target.src = "/placeholder.svg?height=300&width=300"
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A2A44]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[#1A2A44] group-hover:text-[#4A8EBC] transition-colors duration-300">
                    {member.name}
                  </h3>
                  <p className="text-[#4A8EBC] font-medium mb-3">{member.position}</p>
                  <p className="text-[#2B4066]/80 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-[#2B4066]/80 mb-6">
              Our full team includes 25+ talented professionals across development, design, marketing, and support.
            </p>
            <button className="px-8 py-4 bg-white text-[#4A8EBC] font-bold rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg border-2 border-[#4A8EBC] hover:bg-gradient-to-r hover:from-[#3B5488] hover:to-[#4A8EBC] hover:text-white">
              View Full Team
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-b from-[#E0F0FF] to-[#F5FAFF] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div
            id="about-11"
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 animate-on-scroll transition-all duration-700 ${
              isAnimated(11) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            {[
              { value: "10+", label: "Years of Experience" },
              { value: "200+", label: "Clients Worldwide" },
              { value: "500+", label: "Projects Delivered" },
              { value: "25+", label: "Team Members" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white/70 backdrop-blur-sm rounded-xl p-8 text-center shadow-md border border-[#4A8EBC]/10 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#1A2A44] to-[#4A8EBC] mb-2">
                  {stat.value}
                </div>
                <p className="text-[#2B4066]/80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div
            id="about-12"
            className={`bg-gradient-to-r from-[#1A2A44] to-[#3B5488] rounded-2xl p-12 text-center shadow-xl relative overflow-hidden animate-on-scroll transition-all duration-900 ${
              isAnimated(12) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
              <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white/5 animate-pulse-slow"></div>
              <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-white/5 animate-pulse-slow"></div>
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `radial-gradient(rgba(255,255,255,0.3) 1px, transparent 1px)`,
                  backgroundSize: "20px 20px",
                }}
              ></div>
            </div>

            <h2 className="text-3xl font-bold text-white mb-6 relative">Ready to Work With Us?</h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-8 relative">
              Let's discuss how Nepal Digital Heights can help transform your digital presence and drive your business
              forward.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative">
              <a
                href="/contact"
                className="px-8 py-4 bg-white text-[#1A2A44] font-bold rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Contact Us
              </a>
              <a
                href="/services"
                className="px-8 py-4 border-2 border-white text-white font-bold rounded-full text-lg hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
              >
                Explore Services
              </a>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}


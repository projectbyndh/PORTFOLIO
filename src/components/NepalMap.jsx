"use client"

import { useEffect, useRef, useState } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import React from "react"

const locations = [
  { name: "Rupandehi, Nepal", lat: 27.6264, lng: 83.3789, color: "#4A90E2", isHighlighted: true },
  { name: "United States", lat: 37.0902, lng: -95.7129, color: "#5BA3F5", clients: 12 },
  { name: "United Kingdom", lat: 51.5074, lng: -0.1278, color: "#6AB6FF", clients: 8 },
  { name: "Australia", lat: -25.2744, lng: 133.7751, color: "#7EC8FF", clients: 6 },
  { name: "Japan", lat: 36.2048, lng: 138.2529, color: "#8AD3FF", clients: 5 },
  { name: "UAE", lat: 25.2048, lng: 55.2708, color: "#9ADCFF", clients: 7 },
  { name: "Singapore", lat: 1.3521, lng: 103.8198, color: "#6AB6FF", clients: 4 },
  { name: "Canada", lat: 56.1304, lng: -106.3468, color: "#7EC8FF", clients: 3 },
  { name: "Germany", lat: 51.1657, lng: 10.4515, color: "#8AD3FF", clients: 5 },
  { name: "India", lat: 20.5937, lng: 78.9629, color: "#5BA3F5", clients: 15 },
]

export default function WorldMap() {
  const mapRef = useRef(null)
  const leafletMap = useRef(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined" && mapRef.current && !leafletMap.current) {
      leafletMap.current = L.map(mapRef.current, {
        center: [27.6264, 83.3789],
        zoom: 3,
        minZoom: 2,
        maxZoom: 7,
        zoomControl: true,
        attributionControl: false,
      })

      L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
        attribution: '© OpenStreetMap contributors',
      }).addTo(leafletMap.current)

      // Enhanced marker with pulse for HQ
      const createCustomIcon = (color, isHighlighted = false) => {
        const size = isHighlighted ? 22 : 14
        const pulse = isHighlighted
          ? `animation: pulseGlow 2s infinite; @keyframes pulseGlow { 0%,100% { box-shadow: 0 0 15px 5px ${color}; } 50% { box-shadow: 0 0 30px 12px ${color}; } }`
          : `box-shadow: 0 0 12px 3px ${color};`
        return L.divIcon({
          className: "custom-div-icon",
          html: `<div style="
            background: ${color};
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            border: 3px solid white;
            ${pulse}
          "></div>`,
          iconSize: [size, size],
          iconAnchor: [size / 2, size / 2],
        })
      }

      // Add markers with tooltips
      locations.forEach((loc) => {
        const marker = L.marker([loc.lat, loc.lng], {
          icon: createCustomIcon(loc.color, loc.isHighlighted),
        }).addTo(leafletMap.current)

        const content = loc.isHighlighted
          ? `<strong style="font-size:15px;color:#fff;">${loc.name}</strong><br/><span style="color:#a0d8ff;">🏢 Headquarters</span>`
          : `<strong style="color:#fff;">${loc.name}</strong><br/><span style="color:#b0e0ff;">👥 ${loc.clients} Clients</span>`

        marker.bindTooltip(content, {
          permanent: loc.isHighlighted,
          direction: "top",
          offset: [0, -10],
          className: "custom-tooltip",
        })
      })

      // Smooth curved path (quadratic bezier)
      function createCurvedPath(start, end) {
        const points = []
        const offset = 0.25
        const midLat = (start[0] + end[0]) / 2
        const midLng = (start[1] + end[1]) / 2
        const dx = end[1] - start[1]
        const dy = end[0] - start[0]
        const dist = Math.sqrt(dx * dx + dy * dy)
        const normX = -dy / dist
        const normY = dx / dist
        const controlLat = midLat + normX * offset * dist * 0.2
        const controlLng = midLng + normY * offset * dist * 0.2

        const steps = 50
        for (let i = 0; i <= steps; i++) {
          const t = i / steps
          const lat = (1 - t) * (1 - t) * start[0] + 2 * (1 - t) * t * controlLat + t * t * end[0]
          const lng = (1 - t) * (1 - t) * start[1] + 2 * (1 - t) * t * controlLng + t * t * end[1]
          points.push([lat, lng])
        }
        return points
      }

      const hqColor = "#4A90E2"
      const rupandehi = locations[0]

      // Draw only curved lines — NO ARROWS
      for (let i = 1; i < locations.length; i++) {
        const start = [rupandehi.lat, rupandehi.lng]
        const end = [locations[i].lat, locations[i].lng]
        const path = createCurvedPath(start, end)

        L.polyline(path, {
          color: hqColor,
          weight: 3,
          opacity: 0.85,
          dashArray: "8, 12",
          dashOffset: "0",
          className: "flowing-line",
        }).addTo(leafletMap.current)
      }

      setIsLoaded(true)
    }

    return () => {
      if (leafletMap.current) {
        leafletMap.current.remove()
        leafletMap.current = null
      }
    }
  }, [])

  return (
    <div className="w-full bg-gradient-to-b from-[#f0f8ff] to-[#e6f2ff] py-20 md:py-28 relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-[#4A90E2]/10 blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-[#6AB6FF]/10 blur-3xl"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#4A90E2_1px,transparent_1px)] bg-[length:60px_60px] opacity-5"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#2c5282] to-[#4A90E2] bg-clip-text text-transparent">
            From Rupandehi to the World
          </h2>
 

        </div>

        {/* Map */}
        <div className="relative max-w-5xl mx-auto">
          <div className="rounded-3xl overflow-hidden shadow-2xl border border-[#4A90E2]/30 bg-gradient-to-br from-[#0f172a]/90 to-[#1e293b]/90 backdrop-blur-sm">
            {!isLoaded && (
              <div className="absolute inset-0 flex items-center justify-center z-50 bg-[#0f172a]/80">
                <div className="w-20 h-20 border-4 border-[#4A90E2]/30 border-t-[#4A90E2] rounded-full animate-spin"></div>
              </div>
            )}
            <div ref={mapRef} className="h-96 md:h-[560px]" />

            {/* HQ Badge */}
            <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-md rounded-2xl px-6 py-4 shadow-xl border border-[#4A90E2]/40">
              <div className="flex items-center gap-4">
                <div className="w-5 h-5 rounded-full bg-[#4A90E2] animate-pulse shadow-lg"></div>
                <div>
                  <div className="font-bold text-[#2d3748]">Nepal Digital Heights</div>
                  <div className="text-sm text-[#4a6fa5]">Rupandehi, Nepal 🇳🇵</div>
                </div>
              </div>
            </div>

            {/* Bottom tagline */}
            {/* <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur rounded-xl px-5 py-3 shadow-lg border border-[#4A90E2]/20 text-sm text-[#2d3748]">
              🌍 Serving 10+ countries worldwide
            </div> */}
          </div>

          {/* Legend */}
          {/* <div className="mt-12 bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-[#4A90E2]/20">
            <h3 className="text-2xl font-bold text-[#2d3748] mb-6 text-center">Our Global Presence</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {locations.map((loc, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  <div
                    className={`${loc.isHighlighted ? "w-10 h-10" : "w-7 h-7"} rounded-full mb-3 border-4 border-white shadow-xl`}
                    style={{ backgroundColor: loc.color, boxShadow: `0 0 20px ${loc.color}` }}
                  ></div>
                  <span className={`font-medium ${loc.isHighlighted ? "text-lg text-[#2d3748]" : "text-sm text-[#4a6fa5]"}`}>
                    {loc.name.split(",")[0]}
                  </span>
                  {!loc.isHighlighted && <span className="text-xs text-[#6b7280] mt-1">{loc.clients} clients</span>}
                </div>
              ))}
            </div>
            <p className="text-center mt-8 text-[#4a6fa5]/80">
              🚀 All connections flow from our headquarters in <strong className="text-[#4A90E2]">Rupandehi, Nepal</strong>
            </p>
          </div> */}
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx global>{`
        .custom-tooltip {
          background: rgba(15, 23, 42, 0.9) !important;
          border: 1px solid #4A90E2 !important;
          border-radius: 12px !important;
          padding: 10px 14px !important;
          font-size: 13px !important;
          box-shadow: 0 4px 20px rgba(74, 144, 226, 0.4) !important;
          backdrop-filter: blur(8px);
        }
        .custom-tooltip::before {
          border-top-color: #4A90E2 !important;
        }
        .flowing-line {
          animation: flow 10s linear infinite;
        }
        @keyframes flow {
          to {
            stroke-dashoffset: -20;
          }
        }
      `}</style>
    </div>
  )
}
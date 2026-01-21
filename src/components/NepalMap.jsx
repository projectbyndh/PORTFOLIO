"use client"
import React, { useEffect, useRef, useState } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

const defaultLocations = [
  { name: "Rupandehi, Nepal", lat: 27.6264, lng: 83.3789, color: "#4A8EBC", hq: true },
  { name: "United States", lat: 37.0902, lng: -95.7129, color: "#60A5FA", clients: 12 },
  { name: "United Kingdom", lat: 51.5074, lng: -0.1278, color: "#60A5FA", clients: 8 },
  { name: "Australia", lat: -25.2744, lng: 133.7751, color: "#60A5FA", clients: 6 },
  { name: "Japan", lat: 36.2048, lng: 138.2529, color: "#60A5FA", clients: 5 },
  { name: "UAE", lat: 25.2048, lng: 55.2708, color: "#60A5FA", clients: 7 },
  { name: "Singapore", lat: 1.3521, lng: 103.8198, color: "#60A5FA", clients: 4 },
  { name: "Canada", lat: 56.1304, lng: -106.3468, color: "#60A5FA", clients: 3 },
  { name: "Germany", lat: 51.1657, lng: 10.4515, color: "#60A5FA", clients: 5 },
  { name: "India", lat: 20.5937, lng: 78.9629, color: "#60A5FA", clients: 15 },
]

export default function WorldMap() {
  const mapRef = useRef(null)
  const leafletMap = useRef(null)

  useEffect(() => {
    if (typeof window === "undefined" || !mapRef.current || leafletMap.current) return

    // 1. Initialize Map
    leafletMap.current = L.map(mapRef.current, {
      center: [20, 10], // Adjusted center for better global view
      zoom: 2.5,
      minZoom: 2,
      maxZoom: 6,
      zoomControl: false, // Cleaner UI
      attributionControl: false,
    })

    // 2. Add Professional Dark Tiles
    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png").addTo(leafletMap.current)

    // 3. Custom Icon Factory
    const createIcon = (color, isHq) => {
      const size = isHq ? 20 : 10
      return L.divIcon({
        className: "custom-marker",
        html: `<div class="marker-container ${isHq ? 'is-hq' : ''}">
                <div class="marker-core" style="background: ${color};"></div>
                <div class="marker-pulse" style="background: ${color};"></div>
              </div>`,
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
      })
    }

    // 4. Draw Assets
    const hq = defaultLocations.find(l => l.hq)
    
    defaultLocations.forEach(loc => {
      // Add Marker
      const marker = L.marker([loc.lat, loc.lng], {
        icon: createIcon(loc.color, loc.hq)
      }).addTo(leafletMap.current)

      // Add Tooltip
      marker.bindTooltip(
        `<div class="map-tooltip">
          <p class="tooltip-name">${loc.name}</p>
          <p class="tooltip-status">${loc.hq ? 'GLOBAL HEADQUARTERS' : loc.clients + ' Active Projects'}</p>
        </div>`,
        { direction: 'top', offset: [0, -5], className: 'leaflet-tooltip-custom' }
      )

      // Add Arcs from HQ
      if (!loc.hq) {
        const points = []
        const start = [hq.lat, hq.lng]
        const end = [loc.lat, loc.lng]
        
        // Curve calculation (Midpoint offset)
        const offsetX = end[1] - start[1]
        const offsetY = end[0] - start[0]
        const r = Math.sqrt(Math.pow(offsetX, 2) + Math.pow(offsetY, 2))
        const theta = Math.atan2(offsetY, offsetX)
        const thetaOffset = 0.5 // Controls the curve height
        
        const midX = (start[1] + end[1]) / 2 + (r/4) * Math.cos(theta + Math.PI/2)
        const midY = (start[0] + end[0]) / 2 + (r/4) * Math.sin(theta + Math.PI/2)

        // Generate Quadratic Bezier
        for (let t = 0; t <= 1; t += 0.02) {
          const x = (1-t)*(1-t)*start[1] + 2*(1-t)*t*midX + t*t*end[1]
          const y = (1-t)*(1-t)*start[0] + 2*(1-t)*t*midY + t*t*end[0]
          points.push([y, x])
        }

        L.polyline(points, {
          color: '#4A8EBC',
          weight: 1.5,
          opacity: 0.4,
          dashArray: '5, 10',
          className: 'map-arc'
        }).addTo(leafletMap.current)
      }
    })

    return () => {
      if (leafletMap.current) {
        leafletMap.current.remove()
        leafletMap.current = null
      }
    }
  }, [])

  return (
    <div className="w-full bg-[#020617] py-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-sm font-black uppercase tracking-[0.4em] text-blue-500 mb-4">Our Global Reach</h2>
          <h3 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tighter">
            Scaling from <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">Nepal to the World.</span>
          </h3>
        </div>

        <div className="relative group">
          {/* Holographic Border */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-transparent rounded-[2.5rem] blur opacity-75 group-hover:opacity-100 transition duration-1000" />
          
          <div className="relative bg-[#0F172A] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
            <div ref={mapRef} className="h-[500px] md:h-[650px] grayscale-[0.5] contrast-[1.2] invert-[0.05]" />
            
            {/* HQ Floating Pane */}
            <div className="absolute top-8 left-8 p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl z-[1000]">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-ping absolute" />
                  <div className="w-3 h-3 bg-blue-500 rounded-full relative" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Headquarters</p>
                  <p className="text-lg font-bold text-white leading-none">Rupandehi, Nepal</p>
                </div>
              </div>
            </div>

            {/* Stats Overlay */}
            <div className="absolute bottom-8 right-8 flex gap-4 z-[1000]">
              <div className="px-5 py-3 rounded-xl bg-black/40 backdrop-blur-md border border-white/5 text-white">
                <p className="text-xs text-blue-400 font-bold uppercase tracking-widest">Network</p>
                <p className="text-xl font-bold">10+ Countries</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .custom-marker .marker-container {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .marker-core {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          border: 2px solid white;
          z-index: 2;
        }
        .is-hq .marker-core {
          width: 14px;
          height: 14px;
          background: #3B82F6 !important;
        }
        .marker-pulse {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          z-index: 1;
          opacity: 0.6;
          animation: mapPulse 2s infinite;
        }
        @keyframes mapPulse {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(4); opacity: 0; }
        }
        .map-arc {
          stroke-dasharray: 10;
          animation: arcFlow 20s linear infinite;
        }
        @keyframes arcFlow {
          from { stroke-dashoffset: 100; }
          to { stroke-dashoffset: 0; }
        }
        .leaflet-tooltip-custom {
          background: #1E293B !important;
          border: 1px solid rgba(255,255,255,0.1) !important;
          border-radius: 8px !important;
          color: white !important;
          box-shadow: 0 10px 25px rgba(0,0,0,0.5) !important;
          padding: 8px 12px !important;
        }
        .tooltip-name { font-weight: 800; font-size: 14px; margin: 0; }
        .tooltip-status { font-size: 10px; color: #60A5FA; margin: 2px 0 0 0; text-transform: uppercase; letter-spacing: 1px; }
      `}</style>
    </div>
  )
}
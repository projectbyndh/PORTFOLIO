"use client"
import React from "react"

import { useEffect, useRef } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

// Define sample alumni locations
const locations = [
  { name: "Rupandehi, Nepal", lat: 27.6264, lng: 83.3789, color: "#FF3366", isHighlighted: true },
  { name: "New York", lat: 40.7128, lng: -74.006, color: "#FF5733" },
  { name: "London", lat: 51.5074, lng: -0.1278, color: "#33FF57" },
  { name: "Tokyo", lat: 35.6762, lng: 139.6503, color: "#3357FF" },
  { name: "Sydney", lat: -33.8688, lng: 151.2093, color: "#F033FF" },
  { name: "Cape Town", lat: -33.9249, lng: 18.4241, color: "#FF9933" },
  { name: "Rio de Janeiro", lat: -22.9068, lng: -43.1729, color: "#33FFF9" },
  { name: "Moscow", lat: 55.7558, lng: 37.6173, color: "#FFFF33" },
  { name: "Dubai", lat: 25.2048, lng: 55.2708, color: "#FF9966" },
  { name: "Singapore", lat: 1.3521, lng: 103.8198, color: "#66FFCC" },
]

export default function WorldMap() {
  const mapRef = useRef(null)
  const leafletMap = useRef(null)

  useEffect(() => {
    if (typeof window !== "undefined" && mapRef.current && !leafletMap.current) {
      // Initialize the map
      leafletMap.current = L.map(mapRef.current, {
        center: [27.6264, 83.3789], // Center on Rupandehi, Nepal
        zoom: 3,
        minZoom: 2,
        maxZoom: 6,
        zoomControl: true,
        attributionControl: false,
      })

      // Add a custom dark styled map
      L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(leafletMap.current)

      // Custom marker icon
      const createCustomIcon = (color, isHighlighted = false) => {
        const size = isHighlighted ? 18 : 12
        const pulseAnimation = isHighlighted
          ? `animation: pulse 2s infinite; @keyframes pulse { 0% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.3); opacity: 0.7; } 100% { transform: scale(1); opacity: 1; } }`
          : ""

        return L.divIcon({
          className: "custom-marker",
          html: `<div style="
            background-color: ${color};
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            box-shadow: 0 0 ${isHighlighted ? "15px 5px" : "10px 2px"} ${color};
            ${pulseAnimation}
          "></div>`,
          iconSize: [size, size],
        })
      }

      // Add markers for each location
      locations.forEach((location) => {
        const marker = L.marker([location.lat, location.lng], {
          icon: createCustomIcon(location.color, location.isHighlighted),
        }).addTo(leafletMap.current)

        marker.bindTooltip(location.name, {
          permanent: location.isHighlighted,
          direction: "top",
          className: location.isHighlighted ? "highlighted-tooltip" : "location-tooltip",
        })
      })

      // Draw curved lines between locations
      const rupandehi = locations[0]
      for (let i = 1; i < locations.length; i++) {
        const start = [rupandehi.lat, rupandehi.lng]
        const end = [locations[i].lat, locations[i].lng]
        const latlngs = createCurvedLine(start, end)

        L.polyline(latlngs, {
          color: `${rupandehi.color}`,
          weight: 2,
          opacity: 0.8,
          className: "nepal-flight-path",
        }).addTo(leafletMap.current)
      }

      // Additional connections
      for (let i = 1; i < locations.length; i++) {
        for (let j = i + 1; j < locations.length; j++) {
          if (Math.random() > 0.7) {
            const start = [locations[i].lat, locations[i].lng]
            const end = [locations[j].lat, locations[j].lng]
            const latlngs = createCurvedLine(start, end)

            L.polyline(latlngs, {
              color: `${locations[i].color}50`,
              weight: 1,
              opacity: 0.5,
              className: "flight-path",
            }).addTo(leafletMap.current)
          }
        }
      }
    }

    // Cleanup
    return () => {
      if (leafletMap.current) {
        leafletMap.current.remove()
        leafletMap.current = null
      }
    }
  }, [])

  // Curved line calculation
  function createCurvedLine(start, end) {
    const latlngs = []
    const midLat = (start[0] + end[0]) / 2
    const midLng = (start[1] + end[1]) / 2
    const distance = Math.sqrt(Math.pow(end[0] - start[0], 2) + Math.pow(end[1] - start[1], 2))
    const curveHeight = distance * 0.2

    const dx = end[0] - start[0]
    const dy = end[1] - start[1]
    const perpX = -dy
    const perpY = dx
    const length = Math.sqrt(perpX * perpX + perpY * perpY)
    const controlLat = midLat + (perpX / length) * curveHeight
    const controlLng = midLng + (perpY / length) * curveHeight

    const steps = 20
    for (let i = 0; i <= steps; i++) {
      const t = i / steps
      const lat = Math.pow(1 - t, 2) * start[0] + 2 * (1 - t) * t * controlLat + Math.pow(t, 2) * end[0]
      const lng = Math.pow(1 - t, 2) * start[1] + 2 * (1 - t) * t * controlLng + Math.pow(t, 2) * end[1]
      latlngs.push([lat, lng])
    }
    return latlngs
  }

  return (
    <div 
      className="map-container"
      style={{
        width: '100%',
        height: '600px',
        overflow: 'hidden',
        borderRadius: '8px',
        border: '1px solid #333',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div 
        ref={mapRef} 
        style={{ 
          width: '100%', 
          height: '100%', 
          background: '#0a1a2d' 
        }} 
      />
      <style jsx global>{`
        .leaflet-container {
          background-color: #0a1a2d;
        }
        .location-tooltip {
          background-color: rgba(0, 0, 0, 0.7);
          border: none;
          color: white;
          font-size: 12px;
          padding: 4px 8px;
          border-radius: 4px;
        }
        .custom-marker {
          transition: transform 0.3s ease;
        }
        .custom-marker:hover {
          transform: scale(1.5);
          z-index: 1000 !important;
        }
        .flight-path {
          animation: glow 3s infinite alternate;
        }
        @keyframes glow {
          from {
            opacity: 0.3;
          }
          to {
            opacity: 0.8;
          }
        }
        .highlighted-tooltip {
          background-color: rgba(0, 0, 0, 0.8);
          border: 1px solid #FF3366;
          color: white;
          font-size: 14px;
          font-weight: bold;
          padding: 6px 10px;
          border-radius: 4px;
        }
        .nepal-flight-path {
          animation: nepalGlow 2s infinite alternate;
          stroke-dasharray: 5, 5;
        }
        @keyframes nepalGlow {
          from {
            opacity: 0.6;
            stroke-width: 2px;
          }
          to {
            opacity: 1;
            stroke-width: 3px;
          }
        }
      `}</style>
    </div>
  )
}
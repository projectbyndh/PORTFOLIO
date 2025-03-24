"use client"

import { useEffect, useState, useRef } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline, ZoomControl } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import React from "react"
const NepalMap = () => {
  const [isMounted, setIsMounted] = useState(false)

  // Rupandehi district coordinates
  const RUPANDEHI_COORDINATES = [27.6264, 83.3789]

  // Nepal center coordinates
  const NEPAL_CENTER = [28.3949, 84.124]

  // International service destinations with service types
  const SERVICE_DESTINATIONS = [
    {
      name: "Tokyo",
      country: "Japan",
      coordinates: [35.6762, 139.6503],
      color: "#3b82f6",
      services: ["React", "Next.js", "TypeScript"],
    },
    {
      name: "Seoul",
      country: "South Korea",
      coordinates: [37.5665, 126.978],
      color: "#8b5cf6",
      services: ["Mobile Apps", "React Native", "Flutter"],
    },
    {
      name: "New York",
      country: "USA",
      coordinates: [40.7128, -74.006],
      color: "#ef4444",
      services: ["SQL", "PostgreSQL", "MongoDB"],
    },
    {
      name: "Sydney",
      country: "Australia",
      coordinates: [-33.8688, 151.2093],
      color: "#10b981",
      services: ["Digital Marketing", "SEO", "Content"],
    },
    {
      name: "London",
      country: "UK",
      coordinates: [51.5074, -0.1278],
      color: "#f59e0b",
      services: ["Django", "Python", "Flask"],
    },
    {
      name: "Dubai",
      country: "UAE",
      coordinates: [25.2048, 55.2708],
      color: "#ec4899",
      services: ["UI/UX", "Figma", "Adobe XD"],
    },
    {
      name: "Singapore",
      country: "Singapore",
      coordinates: [1.3521, 103.8198],
      color: "#6366f1",
      services: ["AI", "ML", "Data Science"],
    },
  ]

  // Animated path component with moving arrows
  const AnimatedPath = ({ from, to, color, destination }) => {
    const pathRef = useRef(null)
    const map = useMap()

    // Calculate a curved path between two points
    const calculateCurvedPath = (from, to, arcHeight = 0.2) => {
      const points = []
      const steps = 100

      for (let i = 0; i <= steps; i++) {
        const fraction = i / steps

        // Interpolate between the two points
        const lat = from[0] + (to[0] - from[0]) * fraction
        const lng = from[1] + (to[1] - from[1]) * fraction

        // Add curvature
        const offset = Math.sin(fraction * Math.PI) * arcHeight
        const latOffset = (to[1] - from[1]) * offset
        const lngOffset = (from[0] - to[0]) * offset

        points.push([lat + latOffset, lng + lngOffset])
      }

      return points
    }

    // Create the curved path
    const path = calculateCurvedPath(from, to)

    // Animate arrows along the path
    useEffect(() => {
      if (!pathRef.current) return

      // Create multiple arrow markers for each path
      const arrowMarkers = []
      const numArrows = 3 // Number of arrows per path

      // Add destination label
      const destinationLabel = L.divIcon({
        html: `<div class="destination-label" style="background-color: ${color};">${destination}</div>`,
        className: "destination-label-container",
        iconSize: [80, 20],
        iconAnchor: [40, 10],
      })

      const labelMarker = L.marker(to, { icon: destinationLabel }).addTo(map)

      // Create arrow markers
      for (let i = 0; i < numArrows; i++) {
        const arrowIcon = L.divIcon({
          html: `<div class="arrow-icon" style="background-color: ${color};"></div>`,
          className: "arrow-icon-container",
          iconSize: [10, 10],
          iconAnchor: [5, 5],
        })

        const arrowMarker = L.marker([0, 0], { icon: arrowIcon }).addTo(map)
        arrowMarkers.push(arrowMarker)
      }

      // Get the polyline element
      const polyline = pathRef.current.getElement()
      if (!polyline) return

      const length = polyline.getTotalLength()

      // Set initial positions of arrows with even spacing
      const arrowPositions = arrowMarkers.map((_, index) => (index * (length / numArrows)) % length)

      // Animate the arrows along the path
      const animate = () => {
        // Update each arrow position
        arrowMarkers.forEach((marker, index) => {
          // Move along the path
          arrowPositions[index] += 0.5
          if (arrowPositions[index] >= length) {
            arrowPositions[index] = 0
          }

          // Get the point at the current offset
          const point = polyline.getPointAtLength(arrowPositions[index])

          // Convert point to lat/lng
          const latlng = map.containerPointToLatLng([point.x, point.y])

          // Update arrow marker position
          marker.setLatLng(latlng)

          // Calculate rotation angle based on path direction
          const nextOffset = Math.min(arrowPositions[index] + 10, length)
          const nextPoint = polyline.getPointAtLength(nextOffset)
          const nextLatLng = map.containerPointToLatLng([nextPoint.x, nextPoint.y])

          // Calculate angle between current and next point
          const dx = nextLatLng.lng - latlng.lng
          const dy = nextLatLng.lat - latlng.lat
          const angle = (Math.atan2(dy, dx) * 180) / Math.PI

          // Rotate the arrow icon
          const arrowElement = marker.getElement()
          if (arrowElement) {
            const iconElement = arrowElement.querySelector(".arrow-icon")
            if (iconElement) {
              iconElement.setAttribute("style", `background-color: ${color}; transform: rotate(${angle}deg)`)
            }
          }
        })

        requestAnimationFrame(animate)
      }

      const animationId = requestAnimationFrame(animate)

      return () => {
        cancelAnimationFrame(animationId)
        arrowMarkers.forEach((marker) => map.removeLayer(marker))
        map.removeLayer(labelMarker)
      }
    }, [map, color, destination])

    return (
      <Polyline
        positions={path}
        pathOptions={{
          color,
          weight: 3,
          opacity: 0.7,
          dashArray: "5, 10",
          lineCap: "round",
          lineJoin: "round",
        }}
        ref={pathRef}
      />
    )
  }

  // Custom map controller component to set view and add effects
  const MapController = () => {
    const map = useMap()

    useEffect(() => {
      // Add CSS for arrow icons
      const style = document.createElement("style")
      style.innerHTML = `
        .arrow-icon-container {
          background: transparent;
          border: none;
        }
        .arrow-icon {
          width: 10px;
          height: 10px;
          clip-path: polygon(0% 20%, 60% 20%, 60% 0%, 100% 50%, 60% 100%, 60% 80%, 0% 80%);
          transform-origin: center;
          transition: transform 0.3s ease;
          filter: drop-shadow(0px 0px 3px rgba(0, 0, 0, 0.3));
        }
        .destination-label-container {
          background: transparent;
          border: none;
        }
        .destination-label {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          font-weight: bold;
          padding: 3px 8px;
          border-radius: 12px;
          color: white;
          white-space: nowrap;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
        }
        .rupandehi-marker {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 60px;
          height: 30px;
          background-color: #ef4444;
          border-radius: 15px;
          box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.3), 0 0 15px rgba(239, 68, 68, 0.5);
          animation: pulse-rupandehi 2s infinite;
          z-index: 900;
          font-size: 14px;
          font-weight: bold;
          color: white;
        }
        @keyframes pulse-rupandehi {
          0% {
            box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.8);
          }
          70% {
            box-shadow: 0 0 0 15px rgba(239, 68, 68, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(239, 68, 68, 0);
          }
        }
        .leaflet-popup-content-wrapper {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 8px;
          border: 1px solid rgba(239, 68, 68, 0.3);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        .leaflet-popup-tip {
          background: rgba(239, 68, 68, 0.9);
        }
        .custom-marker-container {
          background: transparent;
          border: none;
        }
      `
      document.head.appendChild(style)

      // Start with Rupandehi zoomed in
      map.setView(RUPANDEHI_COORDINATES, 7)

      // After a delay, zoom out to show connections
      setTimeout(() => {
        map.flyTo([20, 84], 2, {
          duration: 2,
          easeLinearity: 0.5,
        })
      }, 3000)

      return () => {
        document.head.removeChild(style)
      }
    }, [map])

    return null
  }

  useEffect(() => {
    setIsMounted(true)

    // Fix for Leaflet marker icons in Next.js
    delete L.Icon.Default.prototype._getIconUrl

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    })
  }, [])

  // Create custom icon for Rupandehi
  const rupandehiIcon = L.divIcon({
    html: `<div class="rupandehi-marker">Hub</div>`,
    className: "custom-marker-container",
    iconSize: [60, 30],
    iconAnchor: [30, 15],
  })

  if (!isMounted) {
    return <div className="h-[80vh] w-full animate-pulse bg-blue-100 rounded-lg"></div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-blue-300 mb-6">Rupandehi To Global Outsourcing Network</h1>
      <div className="relative">
        <MapContainer
          className="h-[80vh] w-full rounded-lg border border-gray-200 shadow-lg z-0"
          center={RUPANDEHI_COORDINATES}
          zoom={7}
          scrollWheelZoom={true}
          style={{ background: "#f0f9ff" }}
          zoomControl={false}
        >
          <ZoomControl position="bottomright" />
          <MapController />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />

          {/* Rupandehi marker - Service Hub */}
          <Marker position={RUPANDEHI_COORDINATES} icon={rupandehiIcon}>
            <Popup className="service-hub-popup">
              <div className="px-3 py-3">
                <h3 className="font-bold text-lg text-red-600">Rupandehi Service Hub</h3>
                <p className="text-sm text-gray-600">Lumbini Province, Nepal</p>
                <div className="mt-2 text-sm font-medium text-gray-700">
                  Our main outsourcing center providing services to global clients.
                </div>
              </div>
            </Popup>
          </Marker>

          {/* Animated paths with moving arrows to international destinations */}
          {SERVICE_DESTINATIONS.map((destination) => (
            <AnimatedPath
              key={destination.name}
              from={RUPANDEHI_COORDINATES}
              to={destination.coordinates}
              color={destination.color}
              destination={destination.name}
            />
          ))}
        </MapContainer>
      </div>
    </div>
  )
}

export default NepalMap


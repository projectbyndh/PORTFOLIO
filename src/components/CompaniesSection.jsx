import React, { useEffect, useState } from "react";
import numazu from '../assets/numazu.png';
import trailblazers from '../assets/trailblazers.png';
import appleday from '../assets/appleday.png';
import epasaley from '../assets/epasaley.png';
import resunga from '../assets/resunga.jpeg';
import siddhartha from '../assets/siddhartha.jpeg';
import school from '../assets/school.jpeg';
import selection from '../assets/selection.jpeg';

export default function CompaniesSection() {
  const [displayCompanies, setDisplayCompanies] = useState([]);

  // Use default partners
  useEffect(() => {
    const defaultPartners = [
      { id: '1', name: 'Numazu', logoUrl: numazu },
      { id: '2', name: 'Trailblazers', logoUrl: trailblazers },
      { id: '3', name: 'Apple Day', logoUrl: appleday },
      { id: '4', name: 'Epasaley', logoUrl: epasaley },
      { id: '5', name: 'Selection Clothing', logoUrl: selection },
      { id: '6', name: 'Siddhartha College', logoUrl: siddhartha },
      { id: '7', name: 'Siddhartha School', logoUrl: school },
      { id: '8', name: 'Resunga Pharmacy', logoUrl: resunga },
    ];
    setDisplayCompanies(defaultPartners);
  }, [])

  // Combine display companies with default partners
  const partners = displayCompanies;

  // Duplicate the array for seamless looping
  const marqueePartners = partners && partners.length > 0 ? [...partners, ...partners] : [];

  return (
    <section className="py-12 bg-white/80">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8 text-center text-[#1A2A44]">Our Partners</h2>
        <div className="overflow-hidden relative">
          <div
            className="flex items-center gap-12 animate-marquee"
            style={{
              width: 'max-content',
              animation: 'marquee 25s linear infinite',
            }}
          >
            {marqueePartners.map((company, idx) => (
              <div key={company.id + '-' + idx} className="flex flex-col items-center min-w-[120px]">
                <img
                  src={company.logoUrl}
                  alt={company.name}
                  className="h-20 w-20 object-contain mb-2 rounded-full border border-[#4A8EBC]/20 bg-white"
                />
                <span className="text-[#2B4066] font-medium text-center whitespace-nowrap">{company.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Marquee animation keyframes */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          will-change: transform;
        }
      `}</style>
    </section>
  );
}

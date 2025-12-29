import React from "react";
import useCompanyStore from "../Store/CompanyStore";

export default function CompaniesSection() {
  const companies = useCompanyStore((state) => state.companies);

  return (
    <section className="py-12 bg-white/80">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8 text-center text-[#1A2A44]">Our Partners</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-center">
          {companies.map((company) => (
            <div key={company.id} className="flex flex-col items-center">
              <img
                src={company.logoUrl}
                alt={company.name}
                className="h-20 w-20 object-contain mb-2 rounded-full border border-[#4A8EBC]/20 bg-white"
              />
              <span className="text-[#2B4066] font-medium text-center">{company.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import React from 'react';

const ReferralBenefits = () => {
  return (
    <section className="container mx-auto px-6 py-12">
      <div className="grid md:grid-cols-3 gap-8">
        {[ 
          { icon: "💰", title: "Cash Bonus", description: "$100 per referral" },
          { icon: "🎯", title: "Free Credits", description: "$50 service credits" },
          { icon: "⚡", title: "Priority Access", description: "Jump the queue" }
        ].map((benefit, index) => (
          <div key={index} className="bg-gradient-to-br from-blue-800 to-blue-900 shadow-lg rounded-xl p-8 text-center transform transition-all hover:scale-105 hover:shadow-xl">
            <span className="text-4xl mb-4 block">{benefit.icon}</span>
            <h3 className="text-2xl font-bold mb-2 text-white">{benefit.title}</h3>
            <p className="text-blue-200 text-lg">{benefit.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReferralBenefits;

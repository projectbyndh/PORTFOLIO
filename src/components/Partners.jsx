import React from 'react';
import usePartners from '../hooks/usePartners';
import Loader from '../components/Loader';

const Partners = () => {
  const { partners, loading, error } = usePartners();

  console.log('Partners component render:', { partners, loading, error });

  if (loading) return <Loader />;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Our Partners</h1>

      {partners.length === 0 ? (
        <div className="text-center py-8 text-gray-500">No partners found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {partners.map((partner) => (
            <div
              key={partner._id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex flex-col items-center">
                <img
                  src={partner.image}
                  alt={partner.name}
                  className="w-24 h-24 object-contain mb-4 rounded-lg"
                  onError={(e) => {
                    e.target.src = '/placeholder-partner.png'; // Fallback image
                  }}
                />
                <h3 className="text-xl font-semibold text-center">{partner.name}</h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Partners;
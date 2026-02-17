import React from 'react';

export default function MobileModal({ data, onClose }) {
  if (!data) return null;
  return (
    <div className="fixed inset-0 flex items-end sm:items-center justify-center">
      <div className="bg-white rounded-t-xl w-full sm:max-w-md p-4 shadow-lg">
        <h3 className="font-bold">{data.title}</h3>
        <p className="text-sm mt-2">{data.subtitle}</p>
      </div>
    </div>
  );
}

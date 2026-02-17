import React from 'react';

export default function DesktopExpandedView({ data, onClose }) {
  if (!data) return null;
  return (
    <div className="w-full h-full rounded-xl shadow-lg bg-white overflow-hidden">
      <div className="h-56 w-full overflow-hidden relative">
        <img src={data.image} alt={data.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>
      <div className="p-6">
        <h2 className="text-2xl font-bold">{data.title}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{data.description}</p>
      </div>
    </div>
  );
}

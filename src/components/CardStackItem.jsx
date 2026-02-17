import React from 'react';

export default function CardStackItem({ data, position, onClick, isSelected }) {
  return (
    <div
      onClick={onClick}
      className={`absolute inset-0 rounded-xl overflow-hidden cursor-pointer ${position === 0 ? 'z-20' : position === 1 ? 'z-10 transform scale-95' : 'z-0 transform scale-90'}`}
      role="button"
      tabIndex={0}
    >
      <img src={data.image} alt={data.title} className="w-full h-full object-cover" />
      <div className="absolute inset-0 p-4 flex flex-col justify-end text-white bg-gradient-to-t from-black/40 to-transparent">
        <h3 className="font-bold">{data.title}</h3>
        <p className="text-sm">{data.subtitle}</p>
      </div>
    </div>
  );
}

import React from "react";
import Logo from "./Logo";

export default function Loader({ text = "Loading..." }) {
  return (
    <div className="fixed inset-0 z-[60] bg-white/80 backdrop-blur-sm flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="absolute inset-0 animate-ping rounded-full border-4 border-[#4A8EBC]/30"></div>
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-[#4A8EBC]/30 border-t-transparent"></div>
          <Logo className="relative h-12 w-auto" />
        </div>
        <div className="text-[#1A2A44] font-semibold tracking-wide">{text}</div>
      </div>
    </div>
  );
}

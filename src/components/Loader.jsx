import React from "react";
import Logo from "./Logo";

export default function Loader({ text = "Loading..." }) {
  return (
    <div className="fixed inset-0 z-[60] bg-white/80 backdrop-blur-sm flex items-center justify-center">
      <div className="flex flex-col items-center gap-2.5 sm:gap-3 md:gap-4">
        <div className="relative">
          <div className="absolute inset-0 animate-ping rounded-full border-2 sm:border-3 md:border-4 border-[#26a8df]/30"></div>
          <div className="absolute inset-0 animate-spin rounded-full border-2 sm:border-3 md:border-4 border-[#26a8df]/30 border-t-transparent"></div>
          <Logo className="relative h-8 sm:h-10 md:h-12 w-auto" />
        </div>
        <div className="text-[#26a8df] font-semibold tracking-wide text-xs sm:text-sm md:text-base">{text}</div>
      </div>
    </div>
  );
}

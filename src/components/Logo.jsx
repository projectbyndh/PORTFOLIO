import React from "react";
import logo2x from "../assets/NDH technologies_logo@4x.png";
import logo1x from "../assets/NDH technologies_logo@4x-100.jpg";
import fallback from "../assets/logo.png";

export default function Logo({ className = "h-8 w-auto", title = "NDH Technologies" }) {
  const onError = (e) => {
    e.currentTarget.src = fallback;
  };
  return (
    <img
      src={logo2x}
      srcSet={`${logo1x} 1x, ${logo2x} 2x`}
      alt={title}
      className={className}
      onError={onError}
      loading="eager"
    />
  );
}

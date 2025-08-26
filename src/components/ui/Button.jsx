import React from "react";

export default function Button({ children, condition = "Default", className = '', ...props }) {
  // Better contrast color palette
  const buttonStyles = {
    Clear: "bg-yellow-400 hover:bg-yellow-500 text-gray-900",       // sunny
    Clouds: "bg-gray-600 hover:bg-gray-700 text-white",             // cloudy
    Rain: "bg-blue-500 hover:bg-blue-600 text-white",               // rainy
    Snow: "bg-sky-200 hover:bg-sky-300 text-gray-900",             // snowy
    Thunderstorm: "bg-purple-600 hover:bg-purple-700 text-white",  // thunder
    Fog: "bg-gray-400 hover:bg-gray-500 text-gray-900",             // fog
    Default: "bg-white/20 hover:bg-white/30 text-white border border-white/30",
  };

  const style = buttonStyles[condition] || buttonStyles.Default;

  return (
    <button
      className={`inline-flex items-center justify-center rounded-2xl px-4 py-2 font-medium transition active:scale-[.98] disabled:opacity-50 disabled:cursor-not-allowed ${style} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

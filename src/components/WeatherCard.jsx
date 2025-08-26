import React from "react";
import { motion } from "framer-motion";

export default function WeatherCard({ weather }) {
  if (!weather || !weather.main) return null;

  const { name, main, weather: weatherInfo } = weather;
  const temp = main?.temp;
  const condition = weatherInfo?.[0]?.main;
  const icon = weatherInfo?.[0]?.icon;

  // Background gradient colors for conditions
  const weatherColors = {
    Clear: "from-yellow-300 to-orange-400 text-gray-900",
    Clouds: "from-gray-400 to-gray-600 text-white",
    Rain: "from-blue-600 to-blue-400 text-white",
    Snow: "from-blue-200 to-white text-black",
    Thunderstorm: "from-purple-700 to-gray-900 text-white",
    Drizzle: "from-cyan-400 to-blue-600 text-white",
    Mist: "from-gray-300 to-gray-500 text-black",
    Haze: "from-yellow-200 to-orange-400 text-black",
    Fog: "from-gray-400 to-gray-600 text-black",
    Default: "from-blue-200 to-blue-400 text-white",
  };

  const bgClass = weatherColors[condition] || weatherColors.Default;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} // entrance animation
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      whileHover={{ scale: 1.05 }} // hover effect
      className={`w-full max-w-md rounded-2xl p-6 shadow-lg text-center bg-gradient-to-b ${bgClass} cursor-pointer transform transition duration-300 hover:shadow-2xl`}
    >
      {/* City Name */}
      <h2 className="text-2xl font-bold mb-2">{name}</h2>

      {/* Weather Icon */}
      {icon && (
        <img
          src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
          alt={condition}
          className="w-28 h-28 mx-auto drop-shadow-md"
        />
      )}

      {/* Temperature */}
      <p className="text-5xl font-extrabold drop-shadow-sm">{Math.round(temp)}°C</p>

      {/* Condition */}
      <p className="text-xl font-medium mt-1">{condition}</p>
    </motion.div>
  );
}

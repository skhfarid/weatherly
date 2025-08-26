import React from "react";
import { motion } from "framer-motion";

const WeatherEffect = ({ condition }) => {
  switch (condition.toLowerCase()) {
    // ☀️ Sunny
    case "clear":
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="w-16 h-16 rounded-full bg-yellow-400 shadow-[0_0_60px_rgba(255,215,0,0.6)]"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          />
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-6 bg-yellow-300 rounded-full"
              style={{ rotate: i * 45 }}
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ repeat: Infinity, duration: 2, delay: i * 0.2 }}
            />
          ))}
        </div>
      );

    // ☁️ Cloudy
    case "clouds":
      return (
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-[20%] w-32 h-16 bg-gray-300 rounded-full opacity-70"
              style={{ top: `${10 + i * 20}%` }}
              animate={{ x: ["-30%", "110%"] }}
              transition={{
                repeat: Infinity,
                duration: 40 + i * 10,
                ease: "linear",
                delay: i * 5,
              }}
            />
          ))}
        </div>
      );

    // 🌧 Rain
    case "rain":
      return (
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 25 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-6 bg-blue-400 rounded-full opacity-70"
              initial={{
                x: Math.random() * window.innerWidth,
                y: -20,
              }}
              animate={{ y: "110%" }}
              transition={{
                repeat: Infinity,
                duration: 1 + Math.random(),
                delay: i * 0.1,
                ease: "linear",
              }}
            />
          ))}
        </div>
      );

    // 🌫 Fog / Mist
    case "fog":
    case "mist":
    case "haze":
      return (
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-full h-12 bg-gray-400/20 rounded-full blur-xl"
              style={{ top: `${20 + i * 25}%` }}
              animate={{ x: ["-100%", "100%"] }}
              transition={{
                repeat: Infinity,
                duration: 60 + i * 20,
                ease: "linear",
              }}
            />
          ))}
        </div>
      );

    // ⛈ Storm
    case "thunderstorm":
      return (
        <div className="absolute inset-0 overflow-hidden">
          {/* Storm clouds */}
          <motion.div
            className="absolute top-8 left-1/4 w-40 h-20 bg-gray-600 rounded-full opacity-80"
            animate={{ x: ["-10%", "10%", "-10%"] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          />
          {/* Lightning flashes */}
          <motion.div
            className="absolute inset-0 bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.8, 0] }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut",
              repeatDelay: 3,
            }}
          />
        </div>
      );

    default:
      return null;
  }
};

export default WeatherEffect;

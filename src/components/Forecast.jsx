import React from "react";
import ForecastCard from "./ForecastCard";

const Forecast = ({ forecast, weatherColors }) => {
  if (!forecast || forecast.length === 0) return null;

  return (
    <div className="flex flex-col items-center w-full max-w-[500px]">
      {/* First row with 2 boxes */}
      <div className="flex justify-center gap-4 w-full mb-4">
        {forecast.slice(0, 2).map((day, index) => (
          <div 
            key={index} 
            className="animate-fade-in w-1/2"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <ForecastCard 
              item={day} 
              weatherColors={weatherColors} 
            />
          </div>
        ))}
      </div>
      
      {/* Second row with 3 boxes */}
      <div className="flex justify-center gap-4 w-full">
        {forecast.slice(2, 5).map((day, index) => (
          <div 
            key={index + 2} 
            className="animate-fade-in w-1/3"
            style={{ animationDelay: `${(index + 2) * 0.1}s` }}
          >
            <ForecastCard 
              item={day} 
              weatherColors={weatherColors} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
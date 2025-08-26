import React from "react";

const ForecastCard = ({ item, weatherColors }) => {
  if (!item || !item.main) return null;

  const date = new Date(item.dt * 1000 || item.dt_txt).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  const condition = item.weather?.[0]?.main || "Default";
  const cardClass = weatherColors[condition]?.card || weatherColors.Default.card;

  return (
    <div className={`p-4 rounded-xl shadow-md text-center transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${cardClass}`}>
      <p className="font-semibold text-gray-800">{date}</p>
      <img
        src={`https://openweathermap.org/img/wn/${item.weather?.[0]?.icon}@2x.png`}
        alt={item.weather?.[0]?.description || "weather"}
        className="mx-auto my-2 w-14 h-14"
      />
      <p className="text-gray-700 font-medium">{item.weather?.[0]?.main}</p>
      <p className="text-sm text-gray-600 mt-2">
        {Math.round(item.main.temp_min)}°C / {Math.round(item.main.temp_max)}°C
      </p>
      <p className="text-xs text-gray-500 mt-1">Humidity: {item.main.humidity}%</p>
    </div>
  );
};

export default ForecastCard;
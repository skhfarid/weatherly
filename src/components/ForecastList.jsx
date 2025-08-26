import React from "react";

const ForecastList = ({ day }) => {
  const date = new Date(day.dt * 1000);
  const temp = Math.round(day.main.temp);
  const weather = day.weather[0].main;
  const icon = `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;

  return (
    <div className="bg-white/10 p-4 rounded-xl text-center shadow-md">
      <p className="text-white font-medium">
        {date.toLocaleDateString("en-US", { weekday: "short" })}
      </p>
      <img src={icon} alt={weather} className="mx-auto w-16 h-16" />
      <p className="text-xl font-semibold text-white">{temp}°C</p>
      <p className="text-sm text-gray-200">{weather}</p>
    </div>
  );
};

export default ForecastList;

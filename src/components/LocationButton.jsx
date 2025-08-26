import React, { useState } from "react";
import LocationButton from "./LocationButton";
import WeatherCard from "./WeatherCard";

function App() {
  const [weather, setWeather] = useState(null);

  const getWeatherByCity = async (city) => {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY&units=metric`
    );
    const data = await res.json();
    setWeather(data);
  };

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=YOUR_API_KEY&units=metric`
      );
      const data = await res.json();
      setWeather(data);
    });
  };

  return (
    <div>
      {/* Input to search city */}
      <input
        type="text"
        placeholder="Enter city"
        onKeyDown={(e) => {
          if (e.key === "Enter") getWeatherByCity(e.target.value);
        }}
      />
      
      {/* Location button */}
      <LocationButton
        onGetLocation={getLocation}
        condition={weather?.weather[0]?.main} // Pass current weather condition
      />

      {/* Weather display */}
      {weather && <WeatherCard weather={weather} />}
    </div>
  );
}

export default App;

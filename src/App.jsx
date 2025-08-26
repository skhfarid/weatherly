import React, { useState } from "react";
import Button from "./components/ui/Button";
import WeatherCard from "./components/WeatherCard";
import Forecast from "./components/Forecast";
import axios from "axios";

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_KEY = "ebc6a00d06749b04dba8a66a39df27bf";

  const weatherColors = {
    Clear: { 
      bg: "from-yellow-300 to-yellow-100", 
      btn: "bg-yellow-400 hover:bg-yellow-500 text-gray-900", 
      card: "bg-yellow-100/90 hover:bg-yellow-200/90" 
    },
    Clouds: { 
      bg: "from-gray-500 to-gray-300", 
      btn: "bg-gray-600 hover:bg-gray-700 text-white", 
      card: "bg-gray-100/90 hover:bg-gray-200/90" 
    },
    Rain: { 
      bg: "from-blue-500 to-blue-300", 
      btn: "bg-blue-500 hover:bg-blue-600 text-white", 
      card: "bg-blue-100/90 hover:bg-blue-200/90" 
    },
    Snow: { 
      bg: "from-sky-200 to-white", 
      btn: "bg-sky-200 hover:bg-sky-300 text-gray-900", 
      card: "bg-sky-100/90 hover:bg-sky-200/90" 
    },
    Thunderstorm: { 
      bg: "from-purple-700 to-purple-500", 
      btn: "bg-purple-600 hover:bg-purple-700 text-white", 
      card: "bg-purple-100/90 hover:bg-purple-200/90" 
    },
    Fog: { 
      bg: "from-gray-400 to-gray-200", 
      btn: "bg-gray-400 hover:bg-gray-500 text-gray-900", 
      card: "bg-gray-100/90 hover:bg-gray-200/90" 
    },
    Default: { 
      bg: "from-blue-500 to-green-300", 
      btn: "bg-white/20 hover:bg-white/30 text-white", 
      card: "bg-white/80 hover:bg-white" 
    },
  };

  const currentCondition = weather?.weather?.[0]?.main || "Default";
  const bgClass = weatherColors[currentCondition]?.bg || weatherColors.Default.bg;
  const btnClass = weatherColors[currentCondition]?.btn || weatherColors.Default.btn;

  // Helper: Pick one forecast per day (12:00 PM entry if available)
  const processForecast = (list) => {
    const daily = [];
    const seenDates = new Set();

    for (let item of list) {
      const date = new Date(item.dt_txt);
      const day = date.toISOString().split("T")[0]; // "2025-08-26"

      // pick one forecast per day around 12:00
      if (!seenDates.has(day) && date.getHours() === 12) {
        daily.push(item);
        seenDates.add(day);
      }
    }

    // if some days missing 12:00, fill with first entry of that day
    if (daily.length < 5) {
      list.forEach((item) => {
        const day = item.dt_txt.split(" ")[0];
        if (!seenDates.has(day)) {
          daily.push(item);
          seenDates.add(day);
        }
      });
    }

    return daily.slice(0, 5); // only 5 days
  };

  // Fetch weather by city
  const getWeatherByCity = async (cityName) => {
    if (!cityName) return;
    try {
      setLoading(true);
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      setWeather(res.data);

      const forecastRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      setForecast(processForecast(forecastRes.data.list));
    } catch (error) {
      alert("City not found or error fetching data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch by location
  const getLocation = () => {
    if (!navigator.geolocation) return alert("Geolocation not supported");
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      try {
        setLoading(true);
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
        );
        setWeather(res.data);

        const forecastRes = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
        );
        setForecast(processForecast(forecastRes.data.list));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    });
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-start p-4 gap-4 bg-gradient-to-b ${bgClass}`}>
      <h1 className="text-white text-[50px] font-black text-center stroke-[2px] stroke-black font-[Montserrat] tracking-wide leading-none">
        WEATHERLY
      </h1>

      {/* Search Input + Button */}
      <div className="flex gap-2 w-full max-w-sm">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
          className="flex-1 px-4 py-2 rounded-lg border text-black border-gray-300 text-lg"
          onKeyDown={(e) => e.key === "Enter" && getWeatherByCity(city)}
        />
        <Button onClick={() => getWeatherByCity(city)} className={btnClass}>
          View
        </Button>
      </div>

      {/* Location button */}
      <Button onClick={getLocation} className={btnClass}>
        Use My Location
      </Button>

      {loading && <p className="text-gray-700 mt-2">Loading...</p>}

      {/* Current Weather */}
      {weather && <WeatherCard weather={weather} />}

      {/* Forecast - now only 5 days */}
      {forecast.length > 0 && (
      <div className="mt-8 w-full max-w-[500px]">
        <h2 className="text-xl font-semibold text-white mb-4 text-center">
          5-Day Forecast
        </h2>
        <Forecast forecast={forecast} weatherColors={weatherColors} />
      </div>
    )}
    </div>
  );
}
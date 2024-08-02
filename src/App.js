import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import WeatherDisplay from './components/WeatherDisplay';
import WeatherGridItem from './components/WeatherGridItem';
import './App.css';

const API_KEY = API_KEY;
const BASE_API_URL = "https://api.openweathermap.org/data/2.5/weather";

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [isImperial, setIsImperial] = useState(false);

  useEffect(() => {
    const fetchWeatherByPosition = async (lat, lon) => {
      const unitType = isImperial ? "imperial" : "metric";
      const apiUrl = `${BASE_API_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${unitType}`;

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error("Error fetching data on page load", error);
      }
    };

    const getCurrentPosition = () => {
      return new Promise((resolve) => {
        const latitude = 35.689487;
        const longitude = 139.691706;

        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(
            (position) => resolve(position.coords),
            () => resolve({ latitude, longitude })
          );
        } else {
          resolve({ latitude, longitude });
        }
      });
    };

    getCurrentPosition().then(({ latitude, longitude }) => {
      fetchWeatherByPosition(latitude, longitude);
    });
  }, [isImperial]);

  const handleSearch = async (locationName) => {
    const unitType = isImperial ? "imperial" : "metric";
    const apiUrl = `${BASE_API_URL}?q=${locationName}&appid=${API_KEY}&units=${unitType}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      if (data.cod === "404") {
        alert("Location not found.");
        return;
      }
      setWeatherData(data);
    } catch (error) {
      console.error("Error on form submit.", error);
    }
  };

  const handleUnitChange = () => {
    setIsImperial((prev) => !prev);
  };

  return (
    <main className="container">
      <div className="left-column">
        <Header onUnitChange={handleUnitChange} />
        <SearchForm onSearch={handleSearch} />
        <WeatherDisplay weatherData={weatherData} isImperial={isImperial} />
      </div>
      <div className="right-column">
        {weatherData && (
          <>
            <WeatherGridItem title="Temperature" value={`${weatherData.main.feels_like} ${isImperial ? '°F' : '°C'}`} />
            <WeatherGridItem title="Humidity" value={`${weatherData.main.humidity}%`} />
            <WeatherGridItem title="Wind Speed" value={`${weatherData.wind.speed} ${isImperial ? 'mph' : 'm/s'}`} />
            <WeatherGridItem title="Pressure" value={`${isImperial ? (weatherData.main.pressure / 33.8639).toFixed(2) : weatherData.main.pressure} ${isImperial ? 'inHg' : 'hPa'}`} />
          </>
        )}
      </div>
    </main>
  );
};

export default App;
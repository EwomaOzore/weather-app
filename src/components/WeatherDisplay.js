import React from 'react';

const WeatherDisplay = ({ weatherData, isImperial }) => {
    if (!weatherData) return null;

    const {
        name,
        weather,
        main,
        sys,
    } = weatherData;

    const tempUnit = isImperial ? '°F' : '°C';
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const isDayTime = currentTimestamp >= sys.sunrise && currentTimestamp <= sys.sunset;

    return (
        <section className="grid">
            <div className={`grid-item ${isDayTime ? 'day-time' : 'night-time'}`}>
                <h2 className="location">{name}</h2>
                <div className="weather-data">
                    <div>
                        <span className="temp">{main.temp.toFixed(2)}</span>
                        <span className="unit">{tempUnit}</span>
                    </div>
                    <div className="desc">{weather[0].description}</div>
                    <div>
                        <strong>H:</strong>
                        <span className="max">{main.temp_max} {tempUnit}</span>
                        <strong>L:</strong>
                        <span className="min">{main.temp_min} {tempUnit}</span>
                    </div>
                </div>
                <img
                    src={`https://refinedguides.com/weather-app/img/${weather[0].icon}.png`}
                    alt="Weather Icon"
                    className="weather-image"
                />
            </div>
        </section>
    );
};

export default WeatherDisplay;
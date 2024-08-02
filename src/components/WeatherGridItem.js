import React from 'react';

const WeatherGridItem = ({ title, value }) => (
    <div className="weather-grid-data">
        <h5>{title}</h5>
        <p>{value}</p>
    </div>
);

export default WeatherGridItem;
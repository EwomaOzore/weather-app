import React from 'react';

const Header = ({ onUnitChange }) => (
    <header>
        <h1>Weather App</h1>
        <label htmlFor="unitType" className="switch">
            <input type="checkbox" id="unitType" onChange={onUnitChange} />
            <div className="slider">
                <span>Metric</span>
            </div>
        </label>
    </header>
);

export default Header;
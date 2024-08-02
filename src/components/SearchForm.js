import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const SearchForm = ({ onSearch }) => {
    const [location, setLocation] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(location);
        setLocation('');
    };

    return (
        <form className="search-form" onSubmit={handleSubmit}>
            <span className="material-symbols-outlined"><FontAwesomeIcon icon={faMagnifyingGlass} /></span>
            <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter city, state or country name"
                required
            />
        </form>
    );
};

export default SearchForm;

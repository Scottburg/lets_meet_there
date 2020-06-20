import React, { useState } from 'react';
import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete';
import './locationSearch.css';

export default function LocationSearch({ onChange, name }) {

  const [location, setLocation] = useState('');

  const handleLocationChange = (location) => {
    setLocation(location);
  };

  const handleLocationSelect = (location) => {

    setLocation(location);
  
    geocodeByAddress(location)
      .then((results) => { 
        onChange(name, results[0].formatted_address) })
      .catch(error => console.log(`Error fetching location`, error))
 
  };

  const searchOptions = {
    types: ['(cities)'], 
  }

  const renderInput = ({ getInputProps, getSuggestionItemProps, suggestions }) => (
    <div className="autocomplete-root">
      <input className="form-control" {...getInputProps()} />
      <div className="autocomplete-dropdown-container">

        {suggestions.map(suggestion => (
          <div {...getSuggestionItemProps(suggestion)} className="suggestion">
            <span>{suggestion.description}</span>
          </div>
        ))}
        
      </div>
    </div>
  );

  return (
    <div>
      <PlacesAutocomplete
        value={location}
        name={name}
        onChange={handleLocationChange}
        onSelect={handleLocationSelect}
        // Pass the search options prop
        searchOptions={searchOptions}
        >

        {renderInput}

      </PlacesAutocomplete>
    </div>
  )
};

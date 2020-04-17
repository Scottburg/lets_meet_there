import React from 'react';
import './flightTile.css';

const FlightTile = ({ flight1, flight2, location, places, carriers }) => {
  // console.log(carriers);
  return (
    <div>
      {places[location].CityName} - {places[location].CountryName} PRICE{' '}
      {flight2.MinPrice + flight1.MinPrice}
    </div>
  );
};

export default FlightTile;

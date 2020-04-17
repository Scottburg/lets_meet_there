import React from 'react';
import './flightTile.css';

const FlightTile = ({ flight1, flight2, location }) => {
  // console.log(flight2.MinPrice);
  return (
    <div>
      {location} PRICE {flight2.MinPrice + flight1.MinPrice}
    </div>
  );
};

export default FlightTile;

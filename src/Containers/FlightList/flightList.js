import React from 'react';
import './flightList.css';
import FlightTile from '../../Components/FlightTile/flightTile';

export default ({ matchedFlights }) => {
  return (
    <div>
      <div className="tile_Container">
        {matchedFlights.map((el) => (
          <FlightTile
            key={el[0]}
            flight1={el[1][0][0]}
            flight2={el[2][0][0]}
            location={el[0]}
          />
        ))}
      </div>
    </div>
  );
};

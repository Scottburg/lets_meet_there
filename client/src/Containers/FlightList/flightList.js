import React from 'react';
import './flightList.css';
import FlightTile from '../../Components/FlightTile/flightTile';

export default ({ matchedFlights, places, carriers }) => {
  return (
    <div>
      <div className="tile_Container">
        {Object.keys(matchedFlights).map((key) => (
          <FlightTile
            key={key}
            flight1={matchedFlights[key][0][0][0]}
            flight2={matchedFlights[key][1][0][0]}
            location={key}
            places={places}
            carriers={carriers}
          ></FlightTile>
        ))}
      </div>
    </div>
  );
};

import React from 'react';
import './flightList.css';
import FlightTile from '../../Components/FlightTile/flightTile';

export default ({ matchedFlights, places, carriers }) => {
  console.log(matchedFlights);
  return (
    <div>
      <div className="tile_Container">
        {Object.keys(matchedFlights).map((key) => (
          <FlightTile
            flight1={matchedFlights[key][0][0][0]} //extra []  here sort it out
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

import React from 'react';
import './flightList.css';
import { Trip } from '../../Components';

function FlightList ({ matchedFlights }) {
  return (
    <div>
      <div className="tile_Container">
        {matchedFlights.map((flight) => (
          <React.Fragment>
            <Trip
              key={flight[0]}
              yourFlight={flight[1][0][0]}
              friendsFlight={flight[2][0][0]}
              location={flight[0]}
            />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default FlightList;
import React from 'react';
import './flightList.css';
import FlightTile from '../../Components/FlightTile/flightTile';
import { useSelector } from 'react-redux';


export default ({ matchedFlights }) => {

console.log(matchedFlights);
const directOnly = useSelector((state) => state.directFlights)

  return (
    <div>
      <div className="tile_Container">
        {matchedFlights.map((el) => (
          directOnly? el[1][0][0]["Direct"] && el[2][0][0]["Direct"]? <FlightTile
            key={el[0]}
            flight1={el[1][0][0]}
            flight2={el[2][0][0]}
            location={el[0]}
          ></FlightTile> : null 
          : <FlightTile
            key={el[0]}
            flight1={el[1][0][0]}
            flight2={el[2][0][0]}
            location={el[0]}
          ></FlightTile>
        ))}
      </div>
    </div>
  );
};

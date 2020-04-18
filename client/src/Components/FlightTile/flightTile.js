import React from 'react';
import './flightTile.css';

const FlightTile = ({ flight1, flight2, location, places, carriers }) => {
  // console.log(flight1);
  // console.log(places);
  return (
    <div className="flightTile">
      <div className="flight1">
        <h3>{places[flight1.OutboundLeg.OriginId].CityName}</h3>€
        {flight1.MinPrice}
        <div>{flight1.Direct ? 'Direct Flight' : 'Indirect Flight'}</div>
        <div className="outbound">
          <div>{carriers[flight1.OutboundLeg.CarrierIds[0]].Name}</div>
          <div>{places[flight1.OutboundLeg.OriginId].Name}</div>
          <div>{flight1.OutboundLeg.DepartureDate.slice(0, 10)}</div>
        </div>
        <div className="inbound">
          <div>{carriers[flight1.InboundLeg.CarrierIds[0]].Name}</div>
          <div>{places[flight1.InboundLeg.OriginId].Name}</div>
          <div>{flight1.InboundLeg.DepartureDate.slice(0, 10)}</div>
        </div>
      </div>
      <div className="bothFlights">
        <h3>
          {places[location].CityName} - {places[location].CountryName}
        </h3>
        <h4>€{flight2.MinPrice + flight1.MinPrice}</h4>
      </div>
      <div className="flight1">
        <div className="outbound">
          <div>{carriers[flight2.OutboundLeg.CarrierIds[0]].Name}</div>
          <div>{places[flight2.OutboundLeg.OriginId].Name}</div>
          <div>{flight2.OutboundLeg.DepartureDate.slice(0, 10)}</div>
        </div>
        <div className="inbound">
          <div>{carriers[flight2.InboundLeg.CarrierIds[0]].Name}</div>
          <div>{places[flight2.InboundLeg.OriginId].Name}</div>
          <div>{flight2.InboundLeg.DepartureDate.slice(0, 10)}</div>
        </div>
        <div>{flight2.Direct ? 'Direct Flight' : 'Indirect Flight'}</div>
        <div>€{flight2.MinPrice}</div>
        <h3>{places[flight2.OutboundLeg.OriginId].CityName}</h3>
      </div>
    </div>
  );
};

export default FlightTile;

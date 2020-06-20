import React from 'react';
import { BookingLink } from '../../Components';
import { StyledFlight } from './Styles.js';

function Flight ({ flight, places }) {
  const { inbound, outbound } = places;
  
  function isFlightDirect () {
    return flight.Direct ? 'Direct' : 'InDirect';
  }
  
  return (
    <StyledFlight>
      {inbound.origin.Name + '->' + inbound.destination.Name }
      {outbound.origin.Name + '->' + outbound.destination.Name }
      {isFlightDirect()}
      {flight.MinPrice}

      <BookingLink 
        inbound={ inbound }
        outbound={ outbound }
        flight={ flight }
      />

    </StyledFlight>
  );

};

export default Flight;

// <h4>{places[flight1.OutboundLeg.OriginId].CityName}</h4>€
//             {flight1.MinPrice}
//             <div>{flight1.Direct ? 'Direct Flight' : 'Indirect Flight'}</div>
//             <a
//               href={`${bookingUrl}${places[
//                 flight1.OutboundLeg.OriginId
//               ].CityName.slice(0, 4)}/${places[location].CityName.slice(
//                 0,
//                 4
//               )}/${flight1.OutboundLeg.DepartureDate.slice(
//                 0,
//                 10
//               )}/${flight1.InboundLeg.DepartureDate.slice(0, 10)}`}
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               Book
//             </a>

import React from 'react';
import { BookingLink } from 'Components';
import { StyledFlight } from './Styles.js';

function Flight ({ flight, places }) {
  const { inbound, outbound } = places;
  
  function flightType () {
    return flight.Direct ? 'Direct' : 'InDirect';
  }
  
  return (
    <StyledFlight>
      {inbound.origin.Name + '->' + inbound.destination.Name }
      {outbound.origin.Name + '->' + outbound.destination.Name }
      {flightType()}
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
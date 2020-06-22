import React from 'react';
import { BookingLink } from 'Components';
import { StyledFlight } from './Styles.js';

function Flight ({ flight, places, city, favLocation }) {
  const { inbound, outbound } = places;
  
  function flightType () {
    return flight.Direct ? 'Direct' : 'InDirect';
  }
  
  return (
    <StyledFlight>
      { city ? city : outbound.origin.Name + '->' }
      { favLocation ? favLocation.city :  outbound.destination.Name }

      { favLocation ? favLocation.city : inbound.origin.Name + '->' }
      { city ? city : inbound.destination.Name }

      {flightType()}
      {flight.MinPrice}
      
      <BookingLink 
        inbound={ inbound }
        outbound={ outbound }
        flight={ flight }
        city={ city && city }
        favCity={ favLocation && favLocation.city }
      />

    </StyledFlight>
  );

};

export default Flight;
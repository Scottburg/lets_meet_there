import React from 'react';
import { StyledFlightSummary } from './Styles.js';

function FlightSummary ({ location }) {

  return (
    <StyledFlightSummary>
      {location.city}
      {location.country}
    </StyledFlightSummary>
  );
  
};

export default FlightSummary;

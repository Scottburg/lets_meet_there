import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { StyledTrip } from './Styles.js';
import { Flight, FlightSummary } from 'Components';

const Trip = ({ yourFlight, friendsFlight, location }) => {
  const places = useSelector((state) => state.places);
  const carriers = useSelector((state) => state.carriers);
  const [expanded, setExpanded] = useState(false);

  const meetingLocation = {
    city: places[location].CityName,
    country: places[location].CountryName
  }

  const yourFlightPlaces = {
    inbound: {
      origin: places[yourFlight.InboundLeg.OriginId],
      destination: places[yourFlight.InboundLeg.DestinationId]
    },
    outbound: {
      origin: places[yourFlight.OutboundLeg.OriginId],
      destination: places[yourFlight.OutboundLeg.DestinationId]
    }
  }

  const friendsFlightPlaces = {
    inbound: {
      origin: places[friendsFlight.InboundLeg.OriginId],
      destination: places[friendsFlight.InboundLeg.DestinationId]
    },
    outbound: {
      origin: places[friendsFlight.OutboundLeg.OriginId],
      destination: places[friendsFlight.OutboundLeg.DestinationId]
    }
  }

  return (
    <StyledTrip>

      <Flight 
        flight={ yourFlight } 
        places={ yourFlightPlaces }
      />
      
      <FlightSummary 
        location={ meetingLocation } 
      />

      <Flight 
        flight={ friendsFlight }
        places={ friendsFlightPlaces }
      />

    </StyledTrip>
  );
};

export default Trip;

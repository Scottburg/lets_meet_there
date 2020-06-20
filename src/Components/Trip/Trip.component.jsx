import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { StyledTrip } from './Styles.js';
import { Flight, FlightSummary } from 'Components';
import { firestore } from '../../Services/firebase.utils';

const Trip = ({ yourFlight, friendsFlight, location, favourites, userCity, friendCity, favLocation, removeFromFavouritesHandler, searchDetailsForRemoveHandler }) => {
  const places = useSelector((state) => state.places);
  const carriers = useSelector((state) => state.carriers);
  const [expanded, setExpanded] = useState(false);
  const {user} = useSelector(state => state.user);

  const meetingLocation = {
    city: places[location].CityName,
    country: places[location].CountryName
  }

  const addToFavouritesHandler = async (e) => {
    const requestData = {
      userRequest: {
        origin: places[yourFlight.OutboundLeg.OriginId].CityId,
        destination: places[location].CityId,
        outboundDate: yourFlight.OutboundLeg.DepartureDate.slice(0, 10),
        inboundDate: yourFlight.InboundLeg.DepartureDate.slice(0, 10)
      },
      friendRequest: {
        origin: places[friendsFlight.OutboundLeg.OriginId].CityId,
        destination: places[location].CityId,
        outboundDate: friendsFlight.OutboundLeg.DepartureDate.slice(0, 10),
        inboundDate: friendsFlight.InboundLeg.DepartureDate.slice(0, 10)
      }
    }
    const userRef = await firestore.doc(`users/${user.id}`);
    userRef.update({ favourites: JSON.stringify([...user.favourites, requestData]) });
  }

  const favouritesButton = !favourites ? <button onClick={addToFavouritesHandler}>Add To Favourites</button> :
    <button onClick={() => removeFromFavouritesHandler (
      searchDetailsForRemoveHandler.origin, 
      searchDetailsForRemoveHandler.destination, 
      searchDetailsForRemoveHandler.outboundDate, 
      searchDetailsForRemoveHandler.inboundDate
    )}>Remove From Favourites</button>
  ;


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
        city={ userCity }
        favLocation={ favLocation }
        places={ yourFlightPlaces }
      />
      
      <FlightSummary 
        location={ meetingLocation } 
        favLocation={ favLocation }
      />

      {user ? favouritesButton : null }

      <Flight 
        flight={ friendsFlight }
        favLocation={ favLocation }
        places={ friendsFlightPlaces }
        city={ friendCity }
      />

    </StyledTrip>
  );
};

export default Trip;

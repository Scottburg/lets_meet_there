import React from 'react';
import { useSelector } from 'react-redux';
import { StyledTrip } from './Styles.js';
import { Flight, FlightSummary } from 'Components';
import { firestore } from '../../Services/firebase.utils';

const Trip = ({ yourFlight, friendsFlight, location, favourites, userCity, friendCity, favLocation, removeFromFavouritesHandler, searchDetailsForRemoveHandler, user }) => {
  const places = useSelector((state) => state.places);
  const carriers = useSelector((state) => state.carriers);

  const meetingLocation = {
    city: favLocation ? favLocation.city : places[location].CityName,
    country: favLocation ? favLocation.country : places[location].CountryName
  };

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
      origin: favLocation ? favLocation.city : places[yourFlight.InboundLeg.OriginId],
      destination: userCity ? userCity : places[yourFlight.InboundLeg.DestinationId]
    },
    outbound: {
      origin: userCity ? userCity : places[yourFlight.OutboundLeg.OriginId],
      destination: favLocation ? favLocation.city : places[yourFlight.OutboundLeg.DestinationId]
    }
  }

  const friendsFlightPlaces = {
    inbound: {
      origin: favLocation ? favLocation.city :  places[friendsFlight.InboundLeg.OriginId],
      destination: friendCity ? friendCity : places[friendsFlight.InboundLeg.DestinationId]
    },
    outbound: {
      origin: friendCity ? friendCity : places[friendsFlight.OutboundLeg.OriginId],
      destination: favLocation ? favLocation.city :  places[friendsFlight.OutboundLeg.DestinationId]
    }
  }

  return (
    <StyledTrip>

      <Flight 
        flight={ yourFlight } 
        city={ userCity && userCity }
        favLocation={ favLocation && favLocation }
        places={ yourFlightPlaces }
      />
      
      <FlightSummary 
        location={ meetingLocation } 
        favLocation={ favLocation && favLocation }
      />

      {user ? favouritesButton : null }

      <Flight 
        flight={ friendsFlight }
        favLocation={ favLocation && favLocation }
        places={ friendsFlightPlaces }
        city={ friendCity && friendCity }
      />

    </StyledTrip>
  );
};

export default Trip;

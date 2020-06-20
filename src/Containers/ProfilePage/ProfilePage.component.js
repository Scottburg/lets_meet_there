import React, {useState, useEffect} from 'react';
import './ProfilePage.styles.scss';
import ApiClient from '../../Services/ApiClient';
import FlightTile from '../../Components/FlightTile/flightTile';
import { firestore } from '../../Services/firebase.utils';

export default function ProfilePage({user}) {


  
  const [favData, setFavData] = useState();
  const getCityName = (flightData, flightList) => {
    return flightData.places.filter(place => place.PlaceId === flightList[0].OutboundLeg.OriginId) 
  }

  const getLocation = (flightData, flightList) => {
    return flightData.places.filter(place => place.PlaceId === flightList[0].OutboundLeg.DestinationId)
  }

  const removeFromFavouritesHandler = async (origin, destination, outboundDate, inboundDate) => {
    const filteredData = user.favourites.filter(request => {
      const {userRequest} = request
      if (userRequest.origin === origin && userRequest.destination === destination && userRequest.outboundDate === outboundDate && userRequest.inboundDate === inboundDate) return false
      return true;
    });
    const userRef = await firestore.doc(`users/${user.id}`);
    userRef.update({ favourites: JSON.stringify([...filteredData]) });
  }
  

  function favListData() {
      return Promise.all(user.favourites.map(async requestData => {
        const {userRequest, friendRequest} = requestData;
  
        const userFlightData = await ApiClient.getFavFlights(userRequest.origin, userRequest.destination, userRequest.outboundDate, userRequest.inboundDate )
        const friendFlightData = await ApiClient.getFavFlights(friendRequest.origin, friendRequest.destination, friendRequest.outboundDate, friendRequest.inboundDate)
        const userFlightList = userFlightData.quotes.sort((a,b) => a.MinPrice - b.MinPrice);
        const friendFlightList = friendFlightData.quotes.sort((a,b) => a.MinPrice - b.MinPrice);
        const userCityName = getCityName(userFlightData, userFlightList)[0].CityName
        const friendCityName = getCityName(friendFlightData, friendFlightList)[0].CityName
        const locationDetails = getLocation(userFlightData, userFlightList);
        return <FlightTile 
            key={Math.random() * 1000}
            favourites={true} 
            flight1={userFlightList[0]} 
            flight2={friendFlightList[0]} 
            favLocation={{city: locationDetails[0].CityName, country: locationDetails[0].CountryName}} 
            userCity={userCityName} 
            friendCity={friendCityName} 
            removeFromFavouritesHandler={removeFromFavouritesHandler}
            searchDetailsForRemoveHandler= {userRequest}
          />
      }))
  }

  useEffect(() => {
    if (user.favourites ){ favListData().then(data => {
      setFavData(data);
    });}
  },[user.favourites])
  
  return (
    <div>
      {user && user.displayName}
      {favData ? favData : <p>You have no quotes favourited</p>}
    </div>
  )
}

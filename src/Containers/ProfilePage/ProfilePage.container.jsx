/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import ApiClient from 'Services/ApiClient';
import { Trip, Spinner } from 'Components';
import { firestore } from 'Services/firebase.utils';

export default function ProfilePage({user}) {

  const [isLoading, setIsLoading] = useState(false);

  const [favData, setFavData] = useState();
  const getCityName = (flightData, flightList) => {
    console.log(flightList)
    return flightData.places.filter(place => place.PlaceId === flightList[0].OutboundLeg.OriginId) 
  }

  const getLocation = (flightData, flightList) => {
    console.log(flightList)
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
        setIsLoading(true)
        const userFlightData = await ApiClient.getFavFlights(userRequest.origin, userRequest.destination, userRequest.outboundDate, userRequest.inboundDate )
        const friendFlightData = await ApiClient.getFavFlights(friendRequest.origin, friendRequest.destination, friendRequest.outboundDate, friendRequest.inboundDate)
        const userFlightList = userFlightData.quotes.sort((a,b) => a.MinPrice - b.MinPrice);
        const friendFlightList = friendFlightData.quotes.sort((a,b) => a.MinPrice - b.MinPrice);
        const userCityName = getCityName(userFlightData, userFlightList)[0].CityName
        const friendCityName = getCityName(friendFlightData, friendFlightList)[0].CityName
        const locationDetails = getLocation(userFlightData, userFlightList);

        return <Trip 
            key={Math.random() * 1000}
            favourites={true} 
            yourFlight={userFlightList[0]} 
            friendsFlight={friendFlightList[0]} 
            favLocation={{city: locationDetails[0].CityName, country: locationDetails[0].CountryName}} 
            userCity={userCityName} 
            friendCity={friendCityName} 
            removeFromFavouritesHandler={removeFromFavouritesHandler}
            searchDetailsForRemoveHandler= {userRequest}
            user={user}
          />
      }))
  }

  useEffect(() => {
    if (user.favourites ){ favListData().then(data => {
      setIsLoading(false)
      setFavData(data);
    });}
  },[user.favourites])

  const ui = <>
              {user && user.displayName}
              {user && user.favourites.length ? favData : <p id="noQuotes">You have no quotes favourited</p>}
             </>
  
  
  return (
    <div>
      {isLoading ? <Spinner /> : ui}
    </div>
  )
}

import React, {useState, useEffect} from 'react';
import './ProfilePage.styles.scss';
import ApiClient from '../../Services/ApiClient';
import FlightTile from '../../Components/FlightTile/flightTile';


export default function ProfilePage({user}) {


  
  const [favData, setFavData] = useState();
  const getCityName = (flightData, flightList) => {
    return flightData.places.filter(place => place.PlaceId === flightList[0].OutboundLeg.OriginId) 
  }

  const getLocation = (flightData, flightList) => {
    return flightData.places.filter(place => place.PlaceId === flightList[0].OutboundLeg.DestinationId)
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
        console.log(locationDetails)
        return <FlightTile 
            favourites={true} 
            flight1={userFlightList[0]} 
            flight2={friendFlightList[0]} 
            favLocation={{city: locationDetails[0].CityName, country: locationDetails[0].CountryName}} 
            userCity={userCityName} 
            friendCity={friendCityName} 
          />
      }))
  }

  useEffect(() => {
    if (user.favourites && user.favourites.length > 0){ favListData().then(data => {
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

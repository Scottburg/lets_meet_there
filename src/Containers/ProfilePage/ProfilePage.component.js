import React, {useState, useEffect} from 'react';
import './ProfilePage.styles.scss';
import ApiClient from '../../Services/ApiClient';
import FlightTile from '../../Components/FlightTile/flightTile';


export default function ProfilePage({user}) {


  
  const [favData, setFavData] = useState([]);

  

  function favListData() {
  
    if(user.favourites.length > 0) {
      return Promise.all(user.favourites.map(async requestData => {
        console.log(requestData)
        const {userRequest, friendRequest} = requestData;
  
        const userFlightData = await ApiClient.getFavFlights(userRequest.origin, userRequest.destination, userRequest.outboundDate, userRequest.inboundDate )
        const friendFlightData = await ApiClient.getFavFlights(friendRequest.origin, friendRequest.destination, friendRequest.outboundDate, friendRequest.inboundDate)
  
        const userFlightList = userFlightData.quotes.sort((a,b) => a.MinPrice - b.MinPrice);
        const friendFlightList = friendFlightData.quotes.sort((a,b) => a.MinPrice - b.MinPrice);
  
        return <FlightTile favourites={true} flight1={userFlightList[0]} flight2={friendFlightList[0]} location={userFlightData.places[0].PlaceId} />
      }))
    } else return <p>You have no quotes favourited</p>
    
  }

  useEffect(() => {
    user.favourites && favListData().then(data => {
      setFavData(data);
    });
  },[user.favourites])
  
  return (
    <div>
      {user && user.displayName}
      {favData}
    </div>
  )
}

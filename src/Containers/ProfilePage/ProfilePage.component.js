import React, {useState, useEffect} from 'react';
import './ProfilePage.styles.scss';
import { useSelector } from 'react-redux';
import ApiClient from '../../Services/ApiClient';
import FlightTile from '../../Components/FlightTile/flightTile';


export default function ProfilePage({user}) {


  const favouritesList = useSelector(state => state.favourites.favouritesList);
  const [favData, setFavData] = useState([]);

  

  function favListData() {
    return Promise.all(favouritesList.map(async requestData => {
      const {userRequest, friendRequest} = requestData;

      const userFlightData = await ApiClient.getFavFlights(userRequest.origin, userRequest.destination, userRequest.outboundDate, userRequest.inboundDate )
      const friendFlightData = await ApiClient.getFavFlights(friendRequest.origin, friendRequest.destination, friendRequest.outboundDate, friendRequest.inboundDate)

      const userFlightList = userFlightData.quotes.sort((a,b) => a.MinPrice - b.MinPrice);
      const friendFlightList = friendFlightData.quotes.sort((a,b) => a.MinPrice - b.MinPrice);

      return <FlightTile favourites={true} flight1={userFlightList[0]} flight2={friendFlightList[0]} location={userFlightData.places[0].PlaceId} />
    }))
  }

  useEffect(() => {
    favListData().then(data => {
      setFavData(data);
    });
  },[])
  
  

  
  return (
    <div>
      {user && user.displayName}
      {favData}
    </div>
  )
}

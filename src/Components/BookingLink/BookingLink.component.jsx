import React from 'react';
import { StyledBookingLink } from './Styles';
require('dotenv').config();

function BookingLink ({inbound, outbound, flight}) {

  function bookingParams () {
    const bookingDetails = [
      trimCity(outbound.origin.CityName),
      trimCity(inbound.origin.CityName),
      trimDate(flight.OutboundLeg.DepartureDate),
      trimDate(flight.InboundLeg.DepartureDate)
    ]

    return [...bookingDetails].join('/');
  }

  function trimDate (date) {
    return date.slice(0,10);
  }

  function trimCity (city) {
    return city.slice(0,4);
  }

  return (
    <StyledBookingLink
      href={ process.env.REACT_APP_BOOKING_URL + bookingParams() }
      rel="noopener noreferrer"
      target="_blank"
    >
      Book Your Flights
    </StyledBookingLink>
  )
}

export default BookingLink;
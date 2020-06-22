import React from 'react';
import { StyledBookingLink } from './Styles';
require('dotenv').config();

function BookingLink ({inbound, outbound, flight, city, favCity}) {
  console.log(city, favCity);

  function bookingParams () {
    const bookingDetails = [
      trim(outbound.origin.CityName, 0, 4),
      trim(inbound.origin.CityName, 0, 4),
      trim(flight.OutboundLeg.DepartureDate, 0, 10),
      trim(flight.InboundLeg.DepartureDate, 0, 10)
    ]

    return [...bookingDetails].join('/');
  }

  function trim (string, start, end) {
    return string.slice(start, end);
  }

  return (
    <StyledBookingLink
      href={ process.env.REACT_APP_BOOKING_URL + bookingParams() }
      rel="noopener noreferrer"
      aria-label="Book Flights"
      title="Book Flights"
      target="_blank"
    >
      Book Your Flights
    </StyledBookingLink>
  )
}

export default BookingLink;
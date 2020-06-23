import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ApiClient from 'Services/ApiClient';
import { SearchForm, Spinner } from 'Components';
import { FlightList } from 'Containers';
import helpers from 'helpers';
import { isLoading, getPlaces, getCarriers } from 'Actions';
import { Wrapper, Hero, Title } from './Styles';

export default function HomePage({currentUser}) {

  const [matched, setMatched] = useState([]);
  // Redux items
  const loading = useSelector((state) => state.isLoading);
  const dispatch = useDispatch();

  const getPlace = async (query) => {
    return ApiClient.getPlace(query).then((res) => {
      return helpers.placeId(res, query);
    });
  };

  const searchFlights = async (from1, from2, departDate, returnDate) => {
    dispatch(isLoading());
    const quotesA = await ApiClient.getFlights(from1, departDate, returnDate);
    const quotesB = await ApiClient.getFlights(from2, departDate, returnDate);
    dispatch(getPlaces(quotesA.places, quotesB.places)); // dispatch is a redux function that gets the named reducer and sets the state.
    dispatch(getCarriers(quotesA.carriers, quotesB.carriers));
    setMatched(helpers.matchFlights(quotesA, quotesB)); // as this is passed through props fine to leave outside redux.
    dispatch(isLoading());
  };

  return (
    <Wrapper>
      <Hero>
        <Title>Search for a place to meet</Title>
        {/* <SearchForm
          searchFlights={searchFlights}
          getPlace={getPlace}
        /> */}

        {<div>
          {!loading 
            ? <FlightList user={currentUser} matchedFlights={matched}></FlightList>
            : <Spinner />
          }
        </div>}
      </Hero>
    </Wrapper>
  );
};

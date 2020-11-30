import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrency, setSearchParams } from '../../Actions';
import { directFlights } from '../../Actions';

function Header( {searchFlights }) {

  const directOnly = useSelector((state) => state.directFlights)


  const currentCurrency = useSelector((state) => state.currency);
  const searchParams = useSelector((state) => state.searchParams);
  const matched = useSelector((state) => state.matchedFlights);
 
  const dispatch = useDispatch();

  const changeCurrency = (currency) => { 
    
    if (searchParams !== null && currency !== currentCurrency) {
    searchFlights(searchParams.fmtFrom1,searchParams.fmtFrom2, searchParams.departDate, searchParams.returnDate, currency);
    dispatch(setSearchParams({fmtFrom1: searchParams.fmtFrom1, fmtFrom2: searchParams.fmtFrom2, departDate: searchParams.departDate, returnDate: searchParams.returnDate, currency: currency}))
  };
    if (currency !== currentCurrency)  {dispatch(setCurrency(currency))}; 
    };


  return (
    <header className="App-header">
        <div className="Currency-buttons">
          <div className={currentCurrency === "GBP"? "selected" : "unselected"} onClick={() => changeCurrency("GBP")}>&nbsp;£&nbsp;</div>
          <div className={currentCurrency === "USD"? "selected" : "unselected"} onClick={() => changeCurrency("USD")}>&nbsp;$&nbsp;</div>
          <div className={currentCurrency === "EUR"? "selected" : "unselected"} onClick={() => changeCurrency("EUR")}>&nbsp;€&nbsp;</div>
        </div>
        {matched[0]? <div className="Directflights-toggle">
        {directOnly? "Direct Flights": "All Flights"}  
        </div> : null}
    {!matched[0] ? (<h1>Search for a place to meet</h1>): null}
    </header>

  )
};

export default Header;
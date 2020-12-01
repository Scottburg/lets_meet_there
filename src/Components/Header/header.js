import React from 'react';
import './header.css'
import { useSelector, useDispatch } from 'react-redux';
import { setCurrency, setSearchParams } from '../../Actions';
import { setDirectFlights } from '../../Actions';

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

    const handleToggleDirectFlights  = () => {
        dispatch(setDirectFlights());
      }


  return (
    <header className="App-header">
    <div className="Filters">
    <div>
          <div className={directOnly? "selected" : "unselected"} onClick={() => handleToggleDirectFlights()}>Direct Only</div>
          <div id="allFlights" className={!directOnly? "selected" : "unselected"} onClick={() => handleToggleDirectFlights()}>All Flights</div>
    </div>
     
    
        <div>

          <div className={currentCurrency === "GBP"? "selected" : "unselected"} onClick={() => changeCurrency("GBP")}>&nbsp;£&nbsp;</div>
          <div className={currentCurrency === "USD"? "selected" : "unselected"} onClick={() => changeCurrency("USD")}>&nbsp;$&nbsp;</div>
          <div className={currentCurrency === "EUR"? "selected" : "unselected"} onClick={() => changeCurrency("EUR")}>&nbsp;€&nbsp;</div>
        </div>
          
        </div>

    {!matched[0] ? (<h1>Search for a place to meet</h1>): null}
    </header>

  )
};

export default Header;
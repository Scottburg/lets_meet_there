import React, { useState } from 'react';
import './searchForm.css';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-dates/lib/css/_datepicker.css';
import { useSelector } from 'react-redux';


const SearchForm = ({ searchFlights, getPlace }) => {
  const initialState = {
    from1: '',
    from2: '',
    currency: useSelector((state) => state.currency),
  };
  const [state, setState] = useState(initialState);
  const [focus, setFocus] = useState(null);

  const [dateRange, setdateRange] = useState({
    startDate: null,
    endDate: null,
  });
  const { startDate, endDate } = dateRange;
  const { from1, from2 } = state;

  const handleOnDateChange = (startDate, endDate) =>
    setdateRange(startDate, endDate);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { from1, from2, currency } = state;
    if (from1 && from2 && dateRange) {
      try {
        const fmtFrom1 = await getPlace(from1);
        const fmtFrom2 = await getPlace(from2);
        const departDate = dateRange.startDate.format('YYYY-MM-DD');
        const returnDate = dateRange.endDate.format('YYYY-MM-DD');
        searchFlights(fmtFrom1, fmtFrom2, departDate, returnDate, currency);
        setState(initialState);
      } catch (e) {
        console.log(e);
      }
    } else {
      alert('Please fill in all fields');
    }
  };
  return (
    <div className="form-container">
      <div className="form">
        <form className="form" onSubmit={handleSubmit}>
          <div className="from1">
            <div className="formTitles">From</div>
            <label htmlFor="from1"></label>
            <input
              className="inputboxes"
              type="text"
              name="from1"
              onChange={handleChange}
              value={from1}
              placeholder="E.g. London"
            />
          </div>
          <div className="from2">
            <div className="formTitles">And</div>
            <label htmlFor="from2"></label>
            <input
              className="inputboxes"
              type="text"
              name="from2"
              onChange={handleChange}
              value={from2}
              placeholder="E.g. Barcelona"
            />
          </div>
          <div className="datePicker">
            <DateRangePicker
              startDatePlaceholderText="Depart"
              startDate={startDate}
              onDatesChange={handleOnDateChange}
              endDatePlaceholderText="Return"
              endDate={endDate}
              numberOfMonths={1}
              displayFormat="MMM D"
              showClearDates={true}
              focusedInput={focus}
              onFocusChange={(focus) => {
                setFocus(focus);
              }}
              startDateId="startDate"
              endDateId="endDate"
              minimumNights={0}
            />
          </div>
          <div className="buttonDiv">
            <button type="submit"> Lets Meet There!</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchForm;

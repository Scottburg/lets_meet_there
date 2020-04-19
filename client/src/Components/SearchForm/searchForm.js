import React, { useState } from 'react';
import './searchForm.css';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-dates/lib/css/_datepicker.css';

const SearchForm = ({ searchFlights, getPlace }) => {
  const initialState = {
    from1: '',
    from2: '',
  };
  const [state, setState] = useState(initialState);
  const [focus, setFocus] = useState(null);

  const [dateRange, setdateRange] = useState({
    startDate: null,
    endDate: null,
  });

  const handleOnDateChange = (startDate, endDate) =>
    setdateRange(startDate, endDate);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { from1, from2 } = state;
    if (from1 && from2 && dateRange) {
      try {
        const fmtFrom1 = await getPlace(from1);
        const fmtFrom2 = await getPlace(from2);
        const departDate = dateRange.startDate.format('YYYY-MM-DD');
        const returnDate = dateRange.endDate.format('YYYY-MM-DD');
        searchFlights(fmtFrom1, fmtFrom2, departDate, returnDate);
        setState(initialState);
      } catch (e) {
        console.log(e);
      }
    } else {
      alert('Please fill in all fields');
    }
  };
  const { startDate, endDate } = dateRange;
  const { from1, from2 } = state;
  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <div className="from1">
          <label htmlFor="from1">From</label>
          <input
            type="text"
            name="from1"
            onChange={handleChange}
            value={from1}
            placeholder="first location"
          />
        </div>
        <div className="from2">
          <label htmlFor="from2">And</label>
          <input
            type="text"
            name="from2"
            onChange={handleChange}
            value={from2}
            placeholder="other location"
          />
        </div>
        <div className="datePicker">
          <DateRangePicker
            startDatePlaceholderText="Depart"
            startDate={startDate}
            onDatesChange={handleOnDateChange}
            endDatePlaceholderText="Return"
            endDate={endDate}
            numberOfMonths={2}
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
  );
};

export default SearchForm;

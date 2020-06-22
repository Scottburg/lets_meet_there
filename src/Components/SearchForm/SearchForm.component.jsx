import React, { useState } from 'react';
import { StyledSearchForm } from './Styles';
import { Form } from 'Components';

function SearchForm ({ searchFlights, getPlace }) {
  const [hasError, setHasError] = useState(false);

  async function flightResults (formData) {
    try {
      const flightData = [
        await getPlace(formData.location),
        await getPlace(formData.destination),
        formData.startDate,
        formData.endDate
      ];
      return await searchFlights(...flightData);
    } catch (err) {
      setHasError(true);
    }
  }

  async function fetchFlightResults (formData) {
    if (!formData) setHasError(true);
    await flightResults(formData);
  };

  const formFields = [
    {
      key: 'location',
      title: 'Location',
      name: 'location',
      type: 'text',
      placeholder: 'London...'
    },
    {
      key: 'destination',
      title: 'Destination',
      name: 'destination',
      type: 'text',
      placeholder: 'Barcelona...'
    }
  ]

  return (
    <StyledSearchForm>
      <Form
        key="searchflights"
        title="Search for Flights" 
        fields={formFields}
        hasError={hasError}
        showDateRange={true}
        onSubmit={fetchFlightResults}
      />
    </StyledSearchForm>
  );
};

export default SearchForm;

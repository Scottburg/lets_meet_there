import React, { useState } from 'react';
import { StyledForm, } from './Styles';
import { Button, FormInput } from '../../Components';

function Form (props) {
  const [formData, setFormData] = useState({});
  const [isFormComplete, setIsFormComplete] = useState(false);
  
  function handleChange (e) {
    const fields = {...formData};
    fields[e.target.name] = e.target.value;
    
    setFormData(fields);
    isFormValid(formData)
  };

  function isFormValid (fields) {
    for (let i = 0; i < fields.length - 1; i++) {
     if (fields[i].length === 0) {
       setIsFormComplete(false);
     };
    }
    setIsFormComplete(true);
  }

  function handleSubmit (e) {
    e.preventDefault();
    if (isFormComplete) {
      props.onSubmit(formData);
      setFormData({}); // Clear the prev form value
    }
  }

  function renderFields (fields) {
    return fields.map ( function (field) {
      return (
        <FormInput 
          {...field} 
          onChange={handleChange} 
        /> 
      )
    })
  }

  return (
    <StyledForm onSubmit={(e) => handleSubmit(e)}>
      {props.hasError ? 'Error' : null}
      {renderFields(props.fields)}
      <Button type="submit">Submit</Button>
    </StyledForm>
  )
}

export default Form;
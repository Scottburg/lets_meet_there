import React from 'react';
import { StyledInput } from './Styles';

function FormInput ({ handleChange, ...props } ) {

  return (
    <StyledInput 
      onChange={handleChange} 
      {...props} 
    />
  )
    
}; 

export default FormInput;
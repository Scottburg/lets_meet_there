import React from "react";
import { StyledButton } from './Styles'

function Button ({children, ...props}) {
  return (
    <StyledButton {...props}>
      {children}
    </StyledButton>
  );
}

export default Button;

import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from 'Components';
import { StyledSiteHeader } from './Styles.js';

function SiteHeader ({user, signOut}) {
  return (
    <StyledSiteHeader>
      {user 
        ? <Button onClick={signOut}>Sign Out</Button> 
        : <NavLink to={"/signin"}>Sign In</NavLink>
      }
    </StyledSiteHeader>
  )
}

export default SiteHeader;
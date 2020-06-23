import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from 'Components';
import { StyledSiteHeader } from './Styles.js';
import { signInWithGoogle, auth } from '../../Services/firebase.utils';


function SiteHeader ({user}) {
  return (
    <StyledSiteHeader>
      <NavLink to="/" >Home</NavLink>
      {user 
        ? <React.Fragment>
            <Button is="signOut" key="signout" onClick={(e) => auth.signOut()}>
              Sign Out
            </Button> 
            <NavLink to="/profile">
              Profile
            </NavLink>
          </React.Fragment>
        : <Button id="signin" onClick={(e) => signInWithGoogle()}>
            Sign In with Google
          </Button> 
      }
    </StyledSiteHeader>
  )
}

export default SiteHeader;
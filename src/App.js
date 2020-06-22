import React, { useState, useEffect } from 'react';
import {Route, Switch} from 'react-router-dom';
import './App.css';
import { SiteHeader } from 'Components';
import { Home, ProfilePage } from 'Containers';
import { auth, createUserProfileDocument } from 'Services/firebase.utils';

function App() {
  const [currentUser, setCurrentUser] = useState(false);

  let unsubscribeFromAuth = null;

  useEffect(() => {
    unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot => {
          const userData = snapShot.data();
          userData.favourites = JSON.parse(userData.favourites)
          setCurrentUser({
            id: snapShot.id,
            ...userData
          })
        });
      }
      setCurrentUser(userAuth);
    })

    return () => unsubscribeFromAuth();
  }, []);

  return (
    <React.Fragment>

      <SiteHeader 
        key='siteheader'
        user={currentUser} 
      />
      
      <Switch>
        <Route 
          key='home'
          path="/" 
          exact 
        >
          <Home currentUser={currentUser} />
        </Route>
        <Route
          key='profile'
          path='/profile'
          exact
        >
          <ProfilePage user={currentUser} />
        </Route>
      </Switch>
    </React.Fragment>
  );
}

export default App;

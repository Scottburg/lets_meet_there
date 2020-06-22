import React, { useState, useEffect } from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import './App.css';
import { SiteHeader } from 'Components';
import { Home, ProfilePage } from 'Containers';
import { auth, createUserProfileDocument } from 'Services/firebase.utils';

function App() {
  const [currentUser, setCurrentUser] = useState();

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

  const handleSignOut = () => {
    auth.signOut();
  }


  return (
    <React.Fragment>

      <SiteHeader 
        key='siteheader'
        user={currentUser} 
        signOut={handleSignOut} 
      />
      
      <Switch>
        <Route 
          key='home'
          path="/" 
          exact 
          render={function () {
            return <Home currentUser={currentUser} />
          }}
        />
        <Route
          key='profile'
          path='/profile'
          exact
          render={() => currentUser ? <ProfilePage user={currentUser} /> : <Redirect to='/' />} 
        />
      </Switch>
    </React.Fragment>
  );
}

export default App;

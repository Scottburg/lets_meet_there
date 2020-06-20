import React, { useState, useEffect } from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import './App.css';
import { SiteHeader, SignIn } from './Components';
import { Home, Profile } from './Containers';
import { auth, createUserProfileDocument } from './Services/firebase.utils';

function App() {
  const [currentUser, setCurrentUser] = useState();

  let unsubscribeFromAuth = null;

  useEffect(() => {
    unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
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
        user={currentUser} 
        signOut={handleSignOut} 
      />
      
      <Switch >
        <Route 
          path="/signin" 
          exact 
          render={function () {
            if (currentUser) return <SignIn />;
            return <Redirect to='/profile' />
          }}
        />
        <Route 
          path='/profile' 
          exact 
          render={function () {
            if (currentUser) return <Profile user={currentUser} />
            return <Redirect to='/signin' />
          }} 
        />
        <Route 
          path="/" 
          exact 
          render={function () {
            return <Home currentUser={currentUser} />
          }}
        />

      </Switch>
    </React.Fragment>
  );
}

export default App;

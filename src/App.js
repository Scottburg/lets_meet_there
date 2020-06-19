import React, { useState, useEffect } from 'react';
import {Route, Switch, NavLink, Redirect} from 'react-router-dom';
import Home from './Containers/HomePage/HomePage.component';
import './App.css';
import SignIn from './Components/SignIn/SignIn.component';
import { auth, createUserProfileDocument } from './Services/firebase.utils';
import ProfilePage from './Containers/ProfilePage/ProfilePage.component';


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
    <>
      {currentUser ? <button onClick={handleSignOut}>Sign Out</button> : <NavLink to={"/signin"}>Sign In</NavLink>}
      <NavLink to={"/"}>Home</NavLink>
      {currentUser && <NavLink to={"/profile"}>Profile</NavLink>}
      <Switch >
        <Route path="/signin" exact render={() => !currentUser ? <SignIn /> : <Redirect to='/profile' />} />
        <Route path='/profile'  exact render={() => currentUser ? <ProfilePage user={currentUser} /> : <Redirect to='/signin' />} />
        <Route path="/" exact render={() => <Home currentUser={currentUser} />} />
      </Switch>
    </>
  );
}

export default App;

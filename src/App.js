/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {Route, Switch, NavLink, Redirect} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Home from './Containers/HomePage/HomePage.component';
import './App.css';
import SignIn from './Components/SignIn/SignIn.component';
import { auth, createUserProfileDocument } from './Services/firebase.utils';
import ProfilePage from './Containers/ProfilePage/ProfilePage.component';
import { addUser } from './Actions/index';


function App() {

  const [currentUser, setCurrentUser] = useState();

  const dispatch = useDispatch();

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
          
          dispatch(addUser({...userData, id: snapShot.id}))
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
      {
        currentUser ? <button onClick={handleSignOut}>Sign Out</button> 
        : <NavLink to={"/signin"}>Sign In</NavLink>
      }

      <NavLink to={"/"}>Home</NavLink>

      {currentUser && <NavLink to={"/profile"}>Profile</NavLink>}

      <Switch >
        <Route path="/signin" exact render={() => !currentUser ? <SignIn /> : <Redirect to='/profile' />} />
        <Route path='/profile'  exact render={() => currentUser ? <ProfilePage user={currentUser} /> : <Redirect to='/signin' />} />
        <Route path="/" exact render={() => <Home />} />
      </Switch>
    </>
  );
}

export default App;

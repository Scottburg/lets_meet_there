import React from 'react';
import './Profile.styles.scss';
import { firestore } from '../../Services/firebase.utils';


export default function ProfilePage({user}) {
  console.log(user);
  
  return (
    <div>
      {user && user.displayName}
    </div>
  )
}

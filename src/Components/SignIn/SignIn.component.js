import React, { useState } from "react";
// import { connect } from "react-redux";
import { signInWithGoogle } from '../../Services/firebase.utils';

import "./SignIn.styles.scss";
import FormInput from '../FormInput/FormInput.component';
import CustomButton from '../CustomButton/CustomButton.component';
// import { googleSignInStart, emailSignInStart } from "../../redux/user/user.actions";

const SignIn = ({ emailSignInStart, googleSignInStart }) => {
  const [userCredentials, setCredentials] = useState({ email: "", password: "" });

  const { email, password } = userCredentials;

  const handleSubmit = async event => {
    event.preventDefault();
    const { email, password } = userCredentials;

    emailSignInStart(email, password);
  };

  const handleChange = event => {
    const { value, name } = event.target;

    setCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <div className="signIn__container">
      <div className="sign-in">
        <h2>I ALREADY HAVE AN ACCOUNT</h2>
        <span>Sign in with google</span>

        <form onSubmit={handleSubmit}>
          <FormInput name="email" handleChange={handleChange} value={email} required label="email" />
          <FormInput
            name="password"
            type="password"
            value={password}
            handleChange={handleChange}
            required
            label="password"
          />
          <div className="buttons">
            <CustomButton type="button" onClick={signInWithGoogle} isGoogleSignIn>
              Sign In With Google
            </CustomButton>
          </div>
        </form>
      </div>
    </div>
  );
};

// const mapDispatchToProps = dispatch => ({
//   googleSignInStart: () => dispatch(googleSignInStart()),
//   emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password }))
// });

export default SignIn;

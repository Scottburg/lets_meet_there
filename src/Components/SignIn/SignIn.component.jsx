import React, { useState } from "react";
import { signInWithGoogle } from '../../Services/firebase.utils';
import { FormInput, Button } from '../../Components';
import { StyledSignIn } from './Styles';

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
    <StyledSignIn>
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
            <Button type="button" onClick={signInWithGoogle} isGoogleSignIn>
              Sign In With Google
            </Button>
          </div>
        </form>
      </div>
    </StyledSignIn>
  );
};

// const mapDispatchToProps = dispatch => ({
//   googleSignInStart: () => dispatch(googleSignInStart()),
//   emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password }))
// });

export default SignIn;

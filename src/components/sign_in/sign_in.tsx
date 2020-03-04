import React, { useState } from "react";

import FormInput from "../form_input/form_input";
import CustomButton from "../custom_button/custom_button";

import { auth, signInWithGoogle } from "../../firebase/firebase.utils";

import "./sign_in.styles.scss";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await auth.signInWithEmailAndPassword(email, password);
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log("Error while sign in", error.message);
    }
  };

  return (
    <div className="sign-in">
      <h2 className="title">LOGIN</h2>
      <form onSubmit={handleSubmit}>
        <FormInput
          handleChange={handleChange}
          label="email"
          name="email"
          type="email"
          value={email}
          required
        />
        <FormInput
          handleChange={handleChange}
          label="password"
          name="password"
          type="password"
          value={password}
          required
        />

        <div className="buttons">
          <CustomButton type="submit">Login with email</CustomButton>
          <CustomButton handleClick={signInWithGoogle} isGoogleSignIn>
            Login with Google
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default SignIn;

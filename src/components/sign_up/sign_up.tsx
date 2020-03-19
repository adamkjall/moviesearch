import React, { useState } from "react";

import { auth, createUserProfileDocument } from "../../firebase/firebase.utils";

import FormInput from "../form_input/form_input";
import CustomButton from "../custom_button/custom_button";

import "./sign_up.styles.scss";

interface IState {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp = () => {
  const [state, setState] = useState<IState>({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState({
      ...state,
      [name]: value
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (state.password !== state.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        state.email,
        state.password
      );

      await createUserProfileDocument(user, {displayName: state.displayName});
      
    } catch (error) {
      console.log("Error while sign up", error.message);
    }
  };

  return (
    <div className="sign-up">
      <h2 className="title">Register</h2>
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <FormInput
          type="text"
          name="displayName"
          value={state.displayName}
          handleChange={handleChange}
          label={"Display name"}
          required
        />
        <FormInput
          type="email"
          name="email"
          value={state.email}
          handleChange={handleChange}
          label={"Email"}
          required
        />
        <FormInput
          type="password"
          name="password"
          value={state.password}
          handleChange={handleChange}
          label={"Password"}
          required
        />
        <FormInput
          type="password"
          name="confirmPassword"
          value={state.confirmPassword}
          handleChange={handleChange}
          label={"Confirm password"}
          required
        />
        <CustomButton type="submit">SIGN UP</CustomButton>
      </form>
    </div>
  );
};

export default SignUp;

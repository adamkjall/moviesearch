import React from "react";

import "./custom_buttom.styles.scss";

interface IProps {
  childlren?: React.ReactNode;
  isGoogleSignIn?: boolean;
  inverted?: boolean;
  type?: "button" | "submit" | "reset";
  handleClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}

const CustomButton: React.FC<IProps> = ({
  children,
  isGoogleSignIn,
  inverted,
  type,
  handleClick
}) => (
  <button
    className={`${inverted ? "inverted" : ""} ${
      isGoogleSignIn ? "google-sign-in" : ""
    } custom-button`}
    type={type}
    onClick={handleClick}
  >
    {children}
  </button>
);

export default CustomButton;

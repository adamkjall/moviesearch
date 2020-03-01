import React from "react"
import "./mainContent.css"

import SignIn from "../sign_in";

class MainContent extends React.Component {

  render() {
    return (
      <div className="mainContentContainer">
        <p>mainee</p>
        <SignIn />
      </div>
    )
  };
}

export default MainContent
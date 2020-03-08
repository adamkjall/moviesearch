import React from "react";
import Logo from "../../assets/avatar.png";
import "./profile.styles.css";

class Profile extends React.Component {
  render() {
    return (
      <div className="avatar">
        <img src={Logo} alt="logo" />;
      </div>
    );
  }
}

export default Profile;

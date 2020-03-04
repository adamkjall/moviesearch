import React from "react";
import "./header.styles.css";
import Profile from "../../components/profile/profile";
import SearchBar from "../../components/searchbar/searchbar";
import logo from "../../assets/logo.png";

class Header extends React.Component {
  render() {
    return (
      <div className="headerContainer">
        <Profile />
        <img src={logo} style={{ height: "70%" }} />
        <SearchBar
          // id={1}
          label="Vad söker du?"
          predicted="Spiderman"
          locked={false}
          active={false}
          error=""
          value=""
        />
      </div>
    );
  }
}

export default Header;

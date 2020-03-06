import React from "react";
import "./header.styles.css";
import Profile from "../../components/profile/profile";
import SearchBar from "../../components/searchbar/searchbar";
import logo from "../../assets/logo.png";

interface Iprops {
  getMoviesFromSearch: Function;
}

class Header extends React.Component<Iprops> {
  render() {
    return (
      <div className="headerContainer">
        <Profile />
        <img src={logo} style={{ height: "70%" }} alt={"site title"} />
        <SearchBar
          // id={1}
          // label="Vad söker du?"
          // predicted="Spiderman"
          // locked={false}
          // active={false}
          // error=""
          value=""
          getMoviesFromSearch={this.props.getMoviesFromSearch}
        />
      </div>
    );
  }
}

export default Header;

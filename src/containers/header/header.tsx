import React from "react";
import "./header.styles.css";
import Profile from "../../components/profile/profile";
import SearchBar from "../../components/searchbar/searchbar";
import logo from "../../assets/logo.png";
import { faFolderMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Spring, config } from "react-spring/renderprops";

interface Iprops {
  setSearchQuery: (query: string) => void;
  toggleSidebar: () => void;
}

class Header extends React.Component<Iprops> {
  //Able to simulate ErrorBoundaries
  errorTest = () => {
    if (1 > 99) {
      // Simulate a JS error
      throw new Error("I craaashed!");
    }
    return <FontAwesomeIcon icon={faFolderMinus} />;
  };

  render() {
    return (
      <div className="headerContainer">
        <div className="hamburgerMenu" onClick={this.props.toggleSidebar}>
          {this.errorTest()}
        </div>
        {/* <Profile /> */}
        <Spring
          config={config.molasses}
          from={{ opacity: 0, width: "20px" }}
          to={{ opacity: 1, width: "250px" }}
        >
          {props => <img src={logo} style={props} alt={"site title"} />}
        </Spring>
        <SearchBar value="" setSearchQuery={this.props.setSearchQuery} />
      </div>
    );
  }
}

export default Header;

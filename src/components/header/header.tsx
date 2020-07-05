import React, { useState } from "react";

import SearchBar from "../searchbar/searchbar";

import { Spring, config } from "react-spring/renderprops";

import logo from "../../assets/logo.png";
import { faFolderMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./header.styles.css";

interface Props {
  toggleSidebar: () => void;
}

const Header = ({ toggleSidebar }: Props) => {
  const [toggle, setToggle] = useState(true);

  return (
    <div className="headerContainer">
      <div className="hamburgerMenu" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faFolderMinus} />
      </div>
      {/* <Profile /> */}
      <Spring
        config={config.molasses}
        from={{ opacity: 0, width: "20px" }}
        to={{
          opacity:
            (!toggle && window.innerWidth <= 768) || window.innerWidth > 768
              ? 1
              : 0,
          width: "250px",
        }}
      >
        {(props) => <img src={logo} style={props} alt={"site title"} />}
      </Spring>
      <SearchBar
        expanded={toggle}
        toggleLogo={() => setToggle(!toggle)}
        value=""
      />
    </div>
  );
};

export default Header;

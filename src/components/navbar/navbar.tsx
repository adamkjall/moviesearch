import React from "react";
import { Link } from "react-router-dom";

import "./navbar.styles.css";

class Navbar extends React.Component {
  render() {
    return (
      <nav>
        <ul>
          <Link to="/movie"><li>My collection</li></Link>
          <li>Trending movies</li>
          <li>New movies</li>
          <li>Watchlist</li>
          <li>My reviews</li>
          <hr></hr>
          <li>My account</li>
          <li>Settings</li>
          <li>Log out</li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;

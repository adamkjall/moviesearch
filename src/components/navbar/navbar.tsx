import React from "react";
import { Link } from "react-router-dom";

import { auth } from "../../firebase/firebase.utils";

import "./navbar.styles.css";

interface IProps {
  currentUser: any;
}

class Navbar extends React.Component<IProps> {
  render() {
    return (
      <nav>
        <ul>
          <li>My collection</li>
          <li>Trending movies</li>
          <li>New movies</li>
          <li>Watchlist</li>
          <li>My reviews</li>
          <hr></hr>
          {this.props.currentUser ? (
            <>
              <li>My account</li>
              <li>Settings</li>
              <li onClick={() => auth.signOut()}>Log out</li>
            </>
          ) : (
            <>
              <Link to="/signin">
                <li>Log in</li>
              </Link>
              <Link to="/register">
                <li>Register</li>
              </Link>
            </>
          )}
        </ul>
      </nav>
    );
  }
}

export default Navbar;

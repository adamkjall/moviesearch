import React from "react";
import { Link } from "react-router-dom";

import { auth } from "../../firebase/firebase.utils";

import "./navbar.styles.css";

interface IProps {
  currentUser: any;
}

class Navbar extends React.Component<IProps> {
  componentDidMount() {
    const li: any = document.querySelectorAll("li");

    for (let i = 0; i < li.length; i++) {
      li[i].addEventListener("click", (e: any) => {
        for (let i = 0; i < li.length; i++) {
          li[i].classList.remove("active");
        }
        e.target.classList.add("active");
      });
    }
  }

  render() {
    return (
      <nav>
        <ul>
          <Link to="/trending">
            <li>Trending</li>
          </Link>
          <Link to="/popular">
            <li>Popular</li>
          </Link>
          <Link to="/new">
            <li>New</li>
          </Link>
          <hr></hr>
          {this.props.currentUser ? (
            <>
              <Link to="/watchlist">
                <li>Watchlist</li>
              </Link>
              <li>Reviews</li>
              <li>Account</li>
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

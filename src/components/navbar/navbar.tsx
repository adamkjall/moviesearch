import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import AuthenticationContext from "../../contexts/authentication-context/context";

import "./navbar.styles.css";

const Navbar = () => {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const { isAuthenticated, logout } = useContext(AuthenticationContext);

  useEffect(() => {
    const li: any = document.querySelectorAll("li");

    for (let i = 0; i < li.length; i++) {
      li[i].addEventListener("click", (e: any) => {
        for (let i = 0; i < li.length; i++) {
          li[i].classList.remove("active");
        }
        e.target.classList.add("active");
      });
    }
  }, []);

  return (
    <nav>
      <ul>
        <Link to="/trending" onClick={() => setActiveTab("trending")}>
          <li className={activeTab === "trending" ? "active" : ""}>Trending</li>
        </Link>
        <Link to="/popular" onClick={() => setActiveTab("popular")}>
          <li className={activeTab === "popular" ? "active" : ""}>Popular</li>
        </Link>
        <Link to="/new" onClick={() => setActiveTab("new")}>
          <li className={activeTab === "new" ? "active" : ""}>New</li>
        </Link>
        <hr></hr>
        {isAuthenticated ? (
          <>
            <Link to="/watchlist" onClick={() => setActiveTab("watchlist")}>
              <li className={activeTab === "watchlist" ? "active" : ""}>
                Watchlist
              </li>
            </Link>
            <Link to="/reviews" onClick={() => setActiveTab("reviews")}>
              <li className={activeTab === "reviews" ? "active" : ""}>
                Reviews
              </li>
            </Link>
            <Link to="/account" onClick={() => setActiveTab("account")}>
              <li className={activeTab === "account" ? "active" : ""}>
                Account
              </li>
            </Link>
            <Link to="/settings" onClick={() => setActiveTab("settings")}>
              <li className={activeTab === "settings" ? "active" : ""}>
                Settings
              </li>
            </Link>
            <li onClick={logout}>Log out</li>
          </>
        ) : (
          <>
            <Link to="/signin" onClick={() => setActiveTab("signin")}>
              <li className={activeTab === "signin" ? "active" : ""}>Log in</li>
            </Link>
            <Link to="/register" onClick={() => setActiveTab("register")}>
              <li className={activeTab === "register" ? "active" : ""}>
                Register
              </li>
            </Link>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

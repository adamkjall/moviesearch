import React from "react";
import "./sidebar.styles.css";
import Navbar from "../navbar/navbar";

class Sidebar extends React.Component {
  render() {
    return (
      <div className="sidebarContainer">
        <Navbar />
      </div>
    );
  }
}

export default Sidebar;

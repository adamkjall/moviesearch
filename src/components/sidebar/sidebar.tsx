import React from "react";
import "./sidebar.styles.css";

class Sidebar extends React.Component {
  render() {
    return (
      <div className="sidebarContainer">
        {this.props.children}
      </div>
    );
  }
}

export default Sidebar;

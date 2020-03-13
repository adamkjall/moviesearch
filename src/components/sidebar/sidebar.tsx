import React from "react";
import "./sidebar.styles.css";
import { Spring, config } from "react-spring/renderprops";

class Sidebar extends React.Component {
  render() {
    return (
        <Spring
          config={config.stiff}
          from={{ opacity: 0, width: "20px" }}
          to={{ opacity: 1, width: "250px" }}
        >
          {(props) => (
            <div style={props} className="sidebarContainer">
              {this.props.children}
            </div>
          )}
        </Spring>
    );
  }
}

export default Sidebar;

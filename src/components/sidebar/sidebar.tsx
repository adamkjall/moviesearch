import React, { ReactElement } from "react";

import "./sidebar.styles.scss";

interface Props {
  toggleSidebar: () => void;
  children: ReactElement;
}

const Sidebar = ({ children, toggleSidebar }: Props) => {
  return (
    <div className="sidebarContainer">
      <header onClick={toggleSidebar}>X</header>
      {children}
    </div>
  );
};

export default Sidebar;

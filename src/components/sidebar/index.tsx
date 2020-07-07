import React from "react";

import "./styles.scss";

interface Props {
  toggleSidebar: () => void;
  children: React.ReactNode;
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

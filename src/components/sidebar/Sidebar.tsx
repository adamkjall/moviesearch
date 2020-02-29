import React from 'react';
import "./sidebarStyle.css"
import Navbar from '../navbar/Navbar'

class Sidebar extends React.Component {

  render() {
    return (
      <div className="sidebarContainer">
        <Navbar />  
      </div>
    )
  };
}

export default Sidebar
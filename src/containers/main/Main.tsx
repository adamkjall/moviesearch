import React from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import MainContent from '../../components/main_content/MainContent';
import "./mainStyle.css";

class Main extends React.Component {

  render() {
    return (
      <div className="mainContainer">
        <Sidebar />
        <MainContent />
      </div>
    )
  };
}

export default Main
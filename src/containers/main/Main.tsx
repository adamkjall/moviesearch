import React from 'react';
import Sidebar from '../../components/sidebar/sidebar';
import MainContent from '../../components/main_content/main_content';
import "./main.styles.css";

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
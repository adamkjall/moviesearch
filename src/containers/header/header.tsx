import React from 'react';
import "./header.styles.css";
import Profile from "../../components/profile/profile"
import SearchBar from '../../components/searchbar/searchbar';

class Header extends React.Component {

  render() {
    return (
      <div className="headerContainer">
      <Profile />
      <h1>Moviestar</h1>
      <SearchBar 
      // id={1}
      label="Vad söker du?"
      predicted="Spiderman"
      locked={false}
      active={false}
      error=""
      value=""
      />
      
      
      </div>
    )
  };
}

export default Header


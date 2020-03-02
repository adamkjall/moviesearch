import React from 'react';
import { Link } from "react-router-dom";

class Profile extends React.Component {
  render() {
    return (
      <Link to="/signin">
        LOGGA IN
      </Link>
    )
  };
}

export default Profile
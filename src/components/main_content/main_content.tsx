import React from "react";
import "./main_content.styles.css";

interface IProps {
  movies: any[];
}
class MainContent extends React.Component<IProps> {
  render() {
    return (
      <div className="mainContentContainer">
        <ul>
          {this.props.movies.map(movie => (
            <li key={movie.id}>{movie.title}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default MainContent;

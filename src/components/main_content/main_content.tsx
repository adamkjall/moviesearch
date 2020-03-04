import React from "react";
import "./main_content.styles.css";

import Movie from "../movie/movie";

interface IProps {
  movies: any[];
}
class MainContent extends React.Component<IProps> {
  render() {
    return (
      <div className="mainContentContainer">
        {this.props.movies.map(movie => (
          <Movie
            key={movie.id}
            rating={movie.vote_average}
            poster={movie.poster_path}
          />
        ))}
      </div>
    );
  }
}

export default MainContent;

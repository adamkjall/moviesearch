import React from "react";
import "./movie.styles.css";

interface IProps {
  rating: string;
  poster: any;
}

class Movie extends React.Component<IProps> {
  renderPosters = () => {
    if (this.props.poster === null) {
      return (
        <img
          src={`https://s3-ap-southeast-1.amazonaws.com/upcode/static/default-image.jpg`}
          alt="card image"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      );
    } else {
      return (
        <img
          src={`http://image.tmdb.org/t/p/w185${this.props.poster}`}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      );
    }
  };

  render() {
    return (
      <div className="movie-card">
        {this.renderPosters()}
        <p>{this.props.rating}</p>
      </div>
    );
  }
}

export default Movie;

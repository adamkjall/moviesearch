import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";

import "./movie.styles.css";

interface IProps extends RouteComponentProps {
  id: number;
  rating: string;
  poster: any;
}

class Movie extends React.Component<IProps> {
  renderPosters = () => {
    if (this.props.poster === null) {
      return (
        <img
          src={`https://s3-ap-southeast-1.amazonaws.com/upcode/static/default-image.jpg`}
          alt="movie poster"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      );
    } else {
      return (
        <img
          src={`http://image.tmdb.org/t/p/w185${this.props.poster}`}
          alt="movie poster"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      );
    }
  };

  render() {
    const { history, match, id, rating } = this.props;
    return (
      <div className="movie-card" onClick={() => history.push(`${match.url}${id}`)}>
        {this.renderPosters()}
        <p>{rating}</p>
      </div>
    );
  }
}

export default withRouter(Movie);

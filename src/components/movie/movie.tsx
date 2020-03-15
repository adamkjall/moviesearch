import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";

import { addMovieToWatchlist } from "../../firebase/firebase.utils";

import "./movie.styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faCheck,
  faInfoCircle
} from "@fortawesome/free-solid-svg-icons";

import { User } from "../../App";

interface IProps extends RouteComponentProps {
  id: number;
  rating: string;
  poster: any;
  user: User | null;
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

  handleAddToFavorites = () => {
    const { user, id } = this.props;

    if (user) {
      addMovieToWatchlist(user.id, id)
    }
  }

  render() {
    const { history, match, id, rating, user } = this.props;
    return (
      <div className="movie-card">
        {this.renderPosters()}
        <p>{rating}</p>
        <div className="card-overlay">
          <button onClick={() => history.push(`${match.path}/movie/${id}`)}>
            View Details
            <FontAwesomeIcon icon={faInfoCircle} style={{ color: "#4EA8FC" }} />
          </button>
          <button>
            Seen it!
            <FontAwesomeIcon icon={faCheck} style={{ color: "#74FC88" }} />
          </button>
          <button onClick={this.handleAddToFavorites}>
            Add to watchlist
            <FontAwesomeIcon icon={faPlus} style={{ color: "#FE7A67" }} />
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(Movie);

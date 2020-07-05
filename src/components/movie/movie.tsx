import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";

import {
  addMovieToWatchlist,
  removeMovieFromWatchlist,
} from "../../firebase/firebase.utils";

import "./movie.styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMinus,
  faCheck,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";

import { User } from "../../App";

interface IProps extends RouteComponentProps {
  id: number;
  rating: number;
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

  addToFavorites = () => {
    const { user, id, rating, poster } = this.props;

    const movie = {
      id,
      rating,
      poster_path: poster,
    };

    if (user) {
      addMovieToWatchlist(user.id, movie);
    }
  };

  removeFromFavorites = () => {
    const { user, id } = this.props;
    if (user) {
      removeMovieFromWatchlist(user.id, id);
    }
  };

  handleFavorites = () => {
    const category = this.props.match.path.replace("/", "");

    if (category === "watchlist") {
      this.removeFromFavorites();
    } else {
      this.addToFavorites();
    }
  };

  render() {
    const { history, location, id, rating } = this.props;

    const category = this.props.match.path.replace("/", "");
    return (
      <div
        className="movie-card"
        onClick={() =>
          history.push({
            pathname: `${location.pathname}/movie/${id}`,
            search: location.search,
            state: { background: this.props.location },
          })
        }
      >
        {this.renderPosters()}
        <p>{rating}</p>
        {/* <div className="card-overlay"> */}
        {/* <button
            onClick={() =>
              history.push({
                pathname: `${location.pathname}/movie/${id}`,
                search: location.search,
                state: { background: this.props.location },
              })
            }
          >
            View Details
            <FontAwesomeIcon icon={faInfoCircle} style={{ color: "#4EA8FC" }} />
          </button> */}
        {/* <button>
            Seen it!
            <FontAwesomeIcon icon={faCheck} style={{ color: "#74FC88" }} />
          </button>
          <button onClick={this.handleFavorites}>
            {category === "watchlist" ? (
              <>
                Remove from watchlist
                <FontAwesomeIcon icon={faMinus} style={{ color: "#FE7A67" }} />
              </>
            ) : (
              <>
                Add to watchlist
                <FontAwesomeIcon icon={faPlus} style={{ color: "#FE7A67" }} />
              </>
            )}
          </button> */}
        {/* </div> */}
      </div>
    );
  }
}

export default withRouter(Movie);

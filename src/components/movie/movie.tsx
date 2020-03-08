import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";

import "./movie.styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCheck, faInfoCircle } from "@fortawesome/free-solid-svg-icons";

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
      <div className="movie-card" >
        {this.renderPosters()}
        <p>{rating}</p>
        <div className="card-overlay">
          <button onClick={() => history.push(`${match.path}/movie/${id}`)}>View Details<FontAwesomeIcon icon={faInfoCircle} style={{color: '#4EA8FC'}}/></button>
          <button>Seen it!<FontAwesomeIcon icon={faCheck} style={{color: '#74FC88'}}/></button>
          <button>Add to watchlist<FontAwesomeIcon icon={faPlus} style={{color: '#FE7A67'}}/></button>
        </div>
      </div>
    );
  }
}

export default withRouter(Movie);

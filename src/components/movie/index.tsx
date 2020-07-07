import React from "react";
import { useHistory, useLocation } from "react-router-dom";

import "./styles.css";

interface IProps {
  id: number;
  rating: number;
  poster: string;
}

const Movie = ({ id, rating, poster }: IProps) => {
  const history = useHistory();
  const location = useLocation();

  const posterPath = poster
    ? `http://image.tmdb.org/t/p/w185${poster}`
    : `https://s3-ap-southeast-1.amazonaws.com/upcode/static/default-image.jpg`;

  return (
    <div
      className="movie-card"
      onClick={() =>
        history.push({
          pathname: `${location.pathname}/movie/${id}`,
          search: location.search,
          state: { background: location },
        })
      }
    >
      <img
        src={posterPath}
        alt="movie poster"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
      <p>{rating}</p>
    </div>
  );
};

export default Movie;

import React, { FC } from "react";

import "./movie_overview.styles.scss";

interface IProps {
  genres: string;
  runtime: number;
  voteAverage: number;
  overview: string;
}

const MovieOverview: FC<IProps> = ({
  genres,
  runtime,
  voteAverage,
  overview
}) => (
  <div className="movie-overview">
    <h2 className="title">Details</h2>
    <div className="grid">
      <span>Genres</span>
      <span>{genres}</span>
      <span>Runtime</span>
      <span>{runtime} minutes</span>
      <span>Rating</span>
      <span>{voteAverage} / 10</span>
      <span>Overview</span>
    </div>
    <div className="overview">{overview}</div>
  </div>
);

export default MovieOverview;

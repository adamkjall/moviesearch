import React, { FC, useState, useEffect } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import {
  getMovieDetails,
  getCast,
  baseImgUrl,
} from "../../utils/themoviedb-api";

import CastList from "../cast_list/cast_list";
import TrailerList from "../trailer_list/trailer_list";
import MovieOverview from "../movie_overview/movie_overview";

import "./movie_details.styles.scss";

interface IProps extends RouteComponentProps {}

interface IState {
  movieId?: string;
  movie?: IMovie;
  cast: ICastMember[];
  videos?: any;
}

export interface IMovie {
  id: number;
  title: string;
  release_date: string;
  year: string;
  runtime: number; // minutes,
  vote_average: number;
  vote_count: number;
  tagline: string;
  backdrop_path: string;
  poster_path: string;
  overview: string;
  homepage: string; // url
  genres: { id: number; name: String }[];
  trailers?: IVideo[];
}

export interface ICastMember {
  name: string;
  profile_path?: string;
  character?: string;
}

export interface IVideo {
  id: string;
  key: string;
  name: string;
  type: string;
}

const MovieDetails: FC<IProps> = ({ history }) => {
  const [state, setState] = useState<IState>({
    movieId: undefined,
    movie: undefined,
    cast: [],
  });

  useEffect(() => {
    const movieId = history.location.pathname.split("/").pop();
    setState((state) => ({
      ...state,
      movieId,
    }));

    getMovieDetails(movieId)
      .then((movieDetails) => ({
        ...movieDetails,
        year: movieDetails.release_date.split("-")[0],
        genres: movieDetails.genres.map(
          (genre: { name: String }) => genre.name
        ),
        trailers: movieDetails.videos.results.filter(
          (video: IVideo) => video.type === "Trailer"
        ),
      }))
      .then((movie: IMovie) => setState((state) => ({ ...state, movie })))
      .catch(console.log);

    getCast(movieId)
      .then((cast) =>
        cast.map((person: ICastMember) => ({
          name: person.name,
          character: person.character,
          profile_path: person.profile_path,
        }))
      )
      .then((cast) => setState((state) => ({ ...state, cast })))
      .catch(console.log);
  }, [history.location.pathname]);

  if (!state.movie) return <h2>Loading...</h2>;

  return (
    <section
      className="movie-details"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${baseImgUrl}${state.movie.backdrop_path})`,
      }}
    >
      <header className="header">
        <FontAwesomeIcon
          className="go-back"
          icon={faArrowLeft}
          onClick={() => history.goBack()}
        />
        <h1 className="title">
          {state.movie.title} <span className="year">({state.movie.year})</span>
        </h1>
      </header>
      <img
        className="poster"
        src={baseImgUrl + state.movie.poster_path}
        alt="movie poster"
      />
      <MovieOverview
        genres={state.movie.genres.toString()}
        runtime={state.movie.runtime}
        voteAverage={state.movie.vote_average}
        overview={state.movie.overview}
      />
      <CastList cast={state.cast} />
      <TrailerList trailers={state.movie.trailers} />
    </section>
  );
};

export default withRouter(MovieDetails);

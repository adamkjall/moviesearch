import React, { FC, useState, useEffect } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import { getMovieDetails, getCast, baseImgUrl } from "../../utils/themoviedb-api";

import CastList from "../cast_list/cast_list";

import "./movie_details.styles.scss";

interface IProps extends RouteComponentProps {}

interface IMovie {
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
}

export interface ICastMember {
  name: string;
  profile_path?: string;
  character?: string;
}

const MovieDetails: FC<IProps> = ({ history, match }) => {
  const [movie, setMovie] = useState<IMovie | null>(null);
  const [cast, setCast] = useState<ICastMember[]>([]);

  useEffect(() => {
    const movieId = history.location.pathname.split("/").pop();

    getMovieDetails(movieId)
      .then(movieDetails => ({
        ...movieDetails,
        year: movieDetails.release_date.split("-")[0],
        genres: movieDetails.genres.map((genre: { name: String }) => genre.name)
      }))
      .then(movie => setMovie(movie))
      .catch(console.log);

    getCast(movieId)
      .then(cast =>
        cast.map((person: ICastMember) => ({
          name: person.name,
          character: person.character,
          profile_path: person.profile_path
        }))
      )
      .then(cast => setCast(cast))
      .catch(console.log);

  }, [history.location.pathname]);

  if (!movie) return <h2>Loading...</h2>;

  return (
    <section
      className="movie-details"
      style={{
        background: `
          linear-gradient(rgba(0,0,0,.6), rgba(0,0,0,.6)), 
          url(${baseImgUrl}${movie.backdrop_path})
        `,
        backgroundSize: "cover"
      }}
    >
      <header>
        <FontAwesomeIcon
          className="go-back"
          icon={faArrowLeft}
          onClick={() => history.goBack()}
        />
        <h1 className="title">
          {movie.title} <span className="year">({movie.year})</span>
        </h1>
      </header>
      <main>
        <img
          className="poster"
          src={baseImgUrl + movie.poster_path}
          alt="movie poster"
        />
        <div className="details">
          <h2 className="title">Details</h2>
          <div className="grid">
            <span>Genres</span>
            <span>{movie.genres.toString()}</span>
            <span>Runtime</span>
            <span>{movie.runtime} minutes</span>
            <span>Rating</span>
            <span>{movie.vote_average} / 10</span>
            <span>Overview</span>
          </div>
          <div className="overview">{movie.overview}</div>
        </div>
        <div className="actors">
          <h2 className="title">Actors</h2>
          <CastList cast={cast} />
          {/* <div className="grid">
            {!cast ? (
              <h2>Loading...</h2>
            ) : (
              cast.splice(0, 6).map((person, i) => (
                <div key={i} className="actor">
                  <h3>{person.name}</h3>
                  <img
                    src={
                      person.profile_path
                        ? `${baseImgUrl}${person.profile_path}`
                        : "https://s3-ap-southeast-1.amazonaws.com/upcode/static/default-image.jpg"
                    }
                    alt="actor"
                  />
                </div>
              ))
            )}
          </div> */}
        </div>
      </main>
    </section>
  );
};

export default withRouter(MovieDetails);

/* 
{
adult: false,
backdrop_path: "/cjTQSwcsfVdirSFSHNBXRGkxmWa.jpg",
belongs_to_collection: null,
budget: 40000000,
genres: [
{
id: 9648,
name: "Mystery"
},
{
id: 53,
name: "Thriller"
},
{
id: 35,
name: "Comedy"
},
{
id: 80,
name: "Crime"
},
{
id: 18,
name: "Drama"
}
],
homepage: "https://www.knivesout.movie/",
id: 546554,
imdb_id: "tt8946378",
original_language: "en",
original_title: "Knives Out",
overview: "When renowned crime novelist Harlan Thrombey is found dead at his estate just after his 85th birthday, the inquisitive and debonair Detective Benoit Blanc is mysteriously enlisted to investigate. From Harlan's dysfunctional family to his devoted staff, Blanc sifts through a web of red herrings and self-serving lies to uncover the truth behind Harlan's untimely death.",
popularity: 108.054,
poster_path: "/pThyQovXQrw2m0s9x82twj48Jq4.jpg",
production_companies: [
{
id: 1632,
logo_path: "/cisLn1YAUuptXVBa0xjq7ST9cH0.png",
name: "Lionsgate",
origin_country: "US"
},
{
id: 7493,
logo_path: "/452FO4LcI6lA6bfgl6w1kQYRBlr.png",
name: "FilmNation Entertainment",
origin_country: "US"
},
{
id: 11092,
logo_path: null,
name: "Ram Bergman Productions",
origin_country: "US"
},
{
id: 37871,
logo_path: null,
name: "T-Street Productions",
origin_country: ""
}
],
production_countries: [
{
iso_3166_1: "US",
name: "United States of America"
}
],
release_date: "2019-11-27",
revenue: 163700000,
runtime: 131,
spoken_languages: [
{
iso_639_1: "es",
name: "Español"
},
{
iso_639_1: "en",
name: "English"
}
],
status: "Released",
tagline: "Hell, any of them could have done it.",
title: "Knives Out",
video: false,
vote_average: 7.8,
vote_count: 2476
}
*/

import React, { FC, useState, useEffect } from "react";
import {
  Switch,
  Route,
  withRouter,
  RouteComponentProps
} from "react-router-dom";

import {
  fetchTrendingMovies,
  fetchPopularMovies,
  fetchNewMovies,
  searchMovie
} from "../../utils/themoviedb-api";

import Movie from "../movie/movie";
import MovieDetails from "../movie_details/movie_details";

import "./main_content.styles.css";

interface IProps extends RouteComponentProps {
  query: string;
}

const MainContent: FC<IProps> = ({ match, query }) => {
  const [movies, setMovies] = useState<any[]>([]);
  const [page, setPage] = useState(1);

  // match.path : "trending" | "popular" | "new"
  // om match.path ändras så kommer denna funktionen köras igen
  // den synkar komponenten efter props, match.path i detta fallet
  useEffect(() => {
    const category = match.path.replace("/", "");
    switch (category) {
      case "popular":
        setPage(1);
        fetchPopularMovies(page).then(movies => setMovies(movies));
        break;
      case "new":
        setPage(1);
        fetchNewMovies(page).then(movies => setMovies(movies));
        break;
      default:
        setPage(1);
        fetchTrendingMovies(page).then(movies => setMovies(movies));
    }
  }, [match.path]);

  // denna effekten synkar komponenten efter query prop
  // om queryn ändras så körs denna funktionen
  useEffect(() => {
    if (query) {
      const trimmedQuery = query.split("~")[0];

      searchMovie(trimmedQuery).then(movies => {
        setMovies(movies);
      });
    }
  }, [query]);

  const loadMoreMovies = () => {
    setPage(page => page + 1);
    const category = match.path.replace("/", "");
    switch (category) {
      case "popular":
        setPage(1);
        fetchPopularMovies(page).then(newMovies =>
          setMovies(movies => [...movies, ...newMovies])
        );
        break;
      case "new":
        setPage(1);
        fetchNewMovies(page).then(newMovies =>
          setMovies(movies => [...movies, ...newMovies])
        );
        break;
      default:
        setPage(1);
        fetchTrendingMovies(page).then(newMovies =>
          setMovies(movie => [...movies, ...newMovies])
        );
    }
  };

  return (
    <Switch>
      <Route path={`${match.path}/movie/:movieId`}>
        <MovieDetails />
      </Route>
      <Route path={match.path}>
        {movies && movies.length ? (
          <div className="mainContentContainer">
            {movies.map((movie: any) => (
              <Movie
                key={movie.id}
                id={movie.id}
                rating={movie.vote_average}
                poster={movie.poster_path}
              />
            ))}
          </div>
         ) : (
          <h1>Loading...</h1>
        )}
      </Route>
    </Switch>
  );
};

export default withRouter(MainContent);

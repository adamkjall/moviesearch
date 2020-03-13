import React, { FC, useState, useEffect, useCallback } from "react";
import {
  Switch,
  Route,
  withRouter,
  RouteComponentProps
} from "react-router-dom";

import { useInfiniteScroll } from "react-infinite-scroll-hook";

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

const initialState = {
  movies: [],
  page: 1,
  hasNextPage: false,
  loading: false
};

const MainContent: FC<IProps> = ({ match, query }) => {
  const [state, setState] = useState(initialState);

  // match.path : "trending" | "popular" | "new"
  // om match.path ändras så kommer denna funktionen köras igen
  // den synkar komponenten efter props, match.path i detta fallet
  useEffect(() => {
    const category = match.path.replace("/", "");

    setState(initialState);

    switch (category) {
      case "popular":
        fetchPopularMovies(1).then(data => {
          const hasNext = data.page < data.total_pages;
          setState({
            ...initialState,
            movies: data.results,
            hasNextPage: hasNext
          });
        });
        break;
      case "new":
        fetchNewMovies(1).then(data => {
          const hasNext = data.page < data.total_pages;
          setState({
            ...initialState,
            movies: data.results,
            hasNextPage: hasNext
          });
        });
        break;
      case "trending":
        fetchTrendingMovies(1).then(data => {
          const hasNext = data.page < data.total_pages;
          setState({
            ...initialState,
            movies: data.results,
            hasNextPage: hasNext
          });
        });
    }
  }, [match.path]);

  const fetchMoviesFromQuery = useCallback(
    (page: number = 1) => {
      const trimmedQuery = query.split("~")[0] || " ";
      return searchMovie(trimmedQuery, page);
    },
    [query]
  );

  // denna effekten synkar komponenten efter query prop
  // om queryn ändras så körs denna funktionen
  useEffect(() => {
    if (query) {
      setState(state => ({ ...state, movies: [] }));
      fetchMoviesFromQuery().then(data => {
        const hasNext = data.page < data.total_pages;
        setState(state => ({
          ...state,
          movies: data.results,
          page: data.page,
          hasNextPage: hasNext
        }));
      });
    }
  }, [query, fetchMoviesFromQuery]);

  const loadMoreMovies = () => {
    setState(state => ({ ...state, loading: true }));
    const nextPage = state.page + 1;

    movieFetchFunction(nextPage).then(data => {
      const hasNext = data.page < data.total_pages;
      setState(state => ({
        ...state,
        movies: state.movies.concat(data.results),
        page: data.page,
        loading: false,
        hasNextPage: hasNext
      }));
    });
  };

  const movieFetchFunction = (nextPage: number) => {
    const category = match.path.replace("/", "");
    switch (category) {
      case "search":
        return fetchMoviesFromQuery(nextPage);
      case "popular":
        return fetchPopularMovies(nextPage);
      case "new":
        return fetchNewMovies(nextPage);
      case "trending":
        return fetchTrendingMovies(nextPage);
      default:
        return fetchTrendingMovies(nextPage);
    }
  };

  const infiniteRef = useInfiniteScroll<HTMLDivElement>({
    loading: state.loading,
    hasNextPage: state.hasNextPage,
    onLoadMore: loadMoreMovies
  });

  return (
    <Switch>
      <Route path={`${match.path}/movie/:movieId`}>
        <MovieDetails />
      </Route>
      <Route path={match.path}>
        <div className="mainContentContainer">
          <div className="movie-list" ref={infiniteRef}>
            {state.movies.map((movie: any) => (
              <Movie
                key={movie.id}
                id={movie.id}
                rating={movie.vote_average}
                poster={movie.poster_path}
              />
            ))}
            {state.loading && <h3>Loading more movies...</h3>}
          </div>
        </div>
      </Route>
    </Switch>
  );
};

export default withRouter(MainContent);

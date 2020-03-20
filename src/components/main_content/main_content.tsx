import React, { FC, useState, useEffect } from "react";
import {
  Switch,
  Route,
  withRouter,
  RouteComponentProps,
  useParams
} from "react-router-dom";

import { useInfiniteScroll } from "react-infinite-scroll-hook";

import { fetchMovieFunction } from "../../utils/themoviedb-api";

import { IMovie } from "../movie_details/movie_details";
import { User } from "../../App";

import Movie from "../movie/movie";
import MovieDetails from "../movie_details/movie_details";

import "./main_content.styles.css";

interface IProps extends RouteComponentProps {
  user: User | null;
}

interface IState {
  movies: IMovie[];
  page: number;
  hasNextPage: boolean;
  loading: boolean;
}

const initialState = {
  movies: [],
  page: 1,
  hasNextPage: false,
  loading: false
};

const MainContent: FC<IProps> = ({ match, location, user }) => {
  const [state, setState] = useState<IState>(initialState);
  const { category } = useParams();

  // category : "trending" | "popular" | "new" | "search"
  // om category ändras så kommer denna funktionen köras igen
  // den synkar komponenten efter props, category i detta fallet
  useEffect(() => {
    setState(initialState);

    fetchMovieFunction(category, 1).then(data => {
      const hasNext = data.page < data.total_pages;
      setState({
        ...initialState,
        movies: data.results,
        hasNextPage: hasNext
      });
    });
  }, [category, user]);

  // denna effekten synkar komponenten efter query,
  // om queryn ändras så körs denna funktionen
  useEffect(() => {
    const query = location.pathname.split("/").pop();

    if (category !== "search" || !query) return;

    setState(initialState);

    fetchMovieFunction("search", 1, query).then(data => {
      const hasNext = data.page < data.total_pages;
      setState(state => ({
        ...state,
        movies: data.results,
        page: data.page,
        hasNextPage: hasNext
      }));
    });
  }, [location.pathname, category]);

  const loadMoreMovies = () => {
    setState(state => ({ ...state, loading: true }));
    const nextPage = state.page + 1;
    const query = location.pathname.split("/").pop();

    fetchMovieFunction(category, nextPage, query).then(data => {
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
            {state.movies.map((movie: IMovie, index) => (
              <Movie
                key={index}
                id={movie.id}
                rating={movie.vote_average}
                poster={movie.poster_path}
                user={user}
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

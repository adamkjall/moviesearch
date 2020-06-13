import React, { useState, useEffect } from "react";
import {
  Switch,
  Route,
  useParams,
  useLocation,
  useRouteMatch,
} from "react-router-dom";

import { useInfiniteScroll } from "react-infinite-scroll-hook";
import { fetchMovieFunction } from "../../utils/themoviedb-api";

import { IMovie } from "../movie_details/movie_details";
import { User } from "../../App";

import Movie from "../movie/movie";
import MovieDetails from "../movie_details/movie_details";
import Modal from "../modal";

import "./main_content.styles.css";

interface Props {
  user: User | null;
}

interface State {
  movies: IMovie[];
  page: number;
  hasNextPage: boolean;
  loading: boolean;
}

const initialState = {
  movies: [],
  page: 1,
  hasNextPage: false,
  loading: false,
};

const MainContent = ({ user }: Props) => {
  const [state, setState] = useState<State>(initialState);
  const { category } = useParams();
  const match = useRouteMatch();
  const location = useLocation();

  // category : "trending" | "popular" | "new" | "search"
  // om category ändras så kommer denna funktionen köras igen
  // den synkar komponenten efter props, category i detta fallet
  useEffect(() => {
    setState(initialState);

    fetchMovieFunction(category, 1).then((data) => {
      if (!data) return;

      const hasNext = data.page < data.total_pages;
      setState({
        ...initialState,
        movies: data.results,
        hasNextPage: hasNext,
      });
    });
  }, [category]);

  // denna effekten synkar komponenten efter query,
  // om queryn ändras så körs denna funktionen
  useEffect(() => {
    const query = location.pathname.split("/").pop();

    if (category !== "search" || !query) return;

    setState(initialState);

    fetchMovieFunction("search", 1, query).then((data) => {
      if (!data) return;

      const hasNext = data.page < data.total_pages;
      setState((state) => ({
        ...state,
        movies: data.results,
        page: data.page,
        hasNextPage: hasNext,
      }));
    });
  }, [location.pathname, category]);

  const loadMoreMovies = () => {
    setState((state) => ({ ...state, loading: true }));
    const nextPage = state.page + 1;
    const query = location.pathname.split("/").pop();

    fetchMovieFunction(category, nextPage, query).then((data) => {
      if (!data) return;

      const hasNext = data.page < data.total_pages;
      setState((state) => ({
        ...state,
        movies: state.movies.concat(data.results),
        page: data.page,
        loading: false,
        hasNextPage: hasNext,
      }));
    });
  };

  const infiniteRef = useInfiniteScroll<HTMLDivElement>({
    loading: state.loading,
    hasNextPage: state.hasNextPage,
    onLoadMore: loadMoreMovies,
  });

  return (
    <Switch>
      <Route path={`${match.path}/movie/:movieId`}>
        <Modal open={true}>
          <MovieDetails />
        </Modal>
        {/* <MovieDetails /> */}
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
            {state.loading && <h3>Loading movies...</h3>}
          </div>
        </div>
      </Route>
    </Switch>
  );
};

export default MainContent;

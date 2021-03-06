import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";

import { useInfiniteScroll } from "react-infinite-scroll-hook";
import { fetchMovies } from "../../the-movie-db/themoviedb-api";

import { IMovie } from "../movie-details";

import Movie from "../movie";

import "./styles.css";

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

const MainContent = () => {
  const [state, setState] = useState<State>(initialState);
  const { category } = useParams<{ category: string }>();
  const location = useLocation();

  useEffect(() => {
    setState(initialState);

    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("query") || "";

    fetchMovies(category, 1, query).then((data) => {
      if (!data) return;

      const hasNext = data.page < data.total_pages;
      setState({
        ...initialState,
        movies: data.results,
        hasNextPage: hasNext,
      });
    });
  }, [category, location.search]);

  console.log("testing");

  const loadMoreMovies = () => {
    setState((state) => ({ ...state, loading: true }));
    const nextPage = state.page + 1;
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("query") || "";

    fetchMovies(category, nextPage, query).then((data) => {
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
    <div className="mainContentContainer">
      <div className="movie-list" ref={infiniteRef}>
        {state.movies.map((movie: IMovie, index) => (
          <Movie
            key={index}
            id={movie.id}
            rating={movie.vote_average}
            poster={movie.poster_path}
          />
        ))}
        {state.loading && <h3>Loading movies...</h3>}
      </div>
    </div>
  );
};

export default MainContent;

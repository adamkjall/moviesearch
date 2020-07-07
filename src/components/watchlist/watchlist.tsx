import React, { useContext, useEffect, useState } from "react";

import AuthenticationContext from "../../contexts/authentication-context/context";

import { firestore } from "../../firebase/firebase.utils";

import Movie from "../movie";

import "./watchlist.styles.scss";

type IMovie = {
  id: number;
  rating: number;
  poster_path: string;
};

const WatchList = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const { user } = useContext(AuthenticationContext);

  useEffect(() => {
    if (!user) return;
    const unsubscribe = firestore
      .collection("users")
      .doc(`${user.id}`)
      .collection("watchlist")
      .onSnapshot((snapshot) => {
        const watchlist: IMovie[] = [];
        snapshot.forEach((doc) => {
          const movie = doc.data() as IMovie;
          watchlist.push(movie);
        });
        setMovies(watchlist);
      });

    return () => unsubscribe();
  }, [user]);

  return (
    <div className="watchlist-container">
      <div className="watchlist">
        {movies.map((movie) => (
          <Movie
            key={movie.id}
            id={movie.id}
            rating={movie.rating}
            poster={movie.poster_path}
          />
        ))}
      </div>
    </div>
  );
};

export default WatchList;

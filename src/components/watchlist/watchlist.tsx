import React, { FC, useEffect, useState } from "react";

import { firestore, getWatchlist } from "../../firebase/firebase.utils";

import Movie from "../movie/movie";

import { User } from "../../App";

import "./watchlist.styles.scss";
interface IProps {
  user: User | null;
}

type IMovie = {
  id: number;
  rating: number;
  poster_path: string;
};

const WatchList: FC<IProps> = ({ user }) => {
  const [movies, setMovies] = useState<IMovie[]>([]);

  useEffect(() => {
    if (user) {
      firestore
        .collection("users")
        .doc(`${user.id}`)
        .collection("watchlist")
        .onSnapshot(snapshot => {
          const watchlist: IMovie[] = [];
          snapshot.forEach(doc => {
            const movie = doc.data() as IMovie;
            watchlist.push(movie);
          });
          setMovies(watchlist);
        });
    } else {
      setMovies([]);
    }
  }, [user]);

  return (
    <div className="watchlist-container">
      <div className="watchlist">
        {movies.map(movie => (
          <Movie
            key={movie.id}
            user={user}
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

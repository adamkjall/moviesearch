import React, { FC, useEffect, useState } from "react";

import { getWatchlist } from "../../firebase/firebase.utils";

import Movie from "../movie/movie";

import { User } from "../../App";

import "./watchlist.styles.scss";
interface IProps {
  user: User | null;
}

type IMovie = {
  id: number;
  rating: number;
  posterPath: string;
};

const WatchList: FC<IProps> = ({ user }) => {
  const [movies, setMovies] = useState<IMovie[]>([]);

  useEffect(() => {
    const getMovieIds = async () => {
      if (user) {
        const ids = await getWatchlist(user.id);
        setMovies(ids);
      }
    };

    getMovieIds();
  }, [user]);

  return (
    <div className="watchlist">
      {movies.map(movie => (
        <Movie
          user={user}
          id={movie.id}
          rating={movie.rating}
          poster={movie.posterPath}
        />
      ))}
    </div>
  );
};

export default WatchList;

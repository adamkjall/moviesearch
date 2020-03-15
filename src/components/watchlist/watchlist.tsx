import React, { FC, useEffect, useState } from "react";

import { getWatchlist } from "../../firebase/firebase.utils";
import { getMovieDetails } from "../../utils/themoviedb-api";

import { User } from "../../App";
import { IMovie } from "../movie_details/movie_details"

interface IProps {
  user: User | null;
}

interface IState {
  movies: IMovie[];
}

const WatchList: FC<IProps> = ({ user }) => {
  const [movies, setMovies] = useState<IState>();

  useEffect(() => {
    const getMovieIds = async () => {
      if (user) {
        const ids = await getWatchlist(user.id);
        
      }
      return [];
    };

    getMovieIds()
    
     

  
  }, [user]);

  return <div></div>;
};

export default WatchList;

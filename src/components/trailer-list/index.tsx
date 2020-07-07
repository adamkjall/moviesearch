import React, { FC } from "react";

import Iframe from "react-iframe";

import { IVideo } from "../movie-details";

import "./styles.scss";

interface IProps {
  trailers?: IVideo[];
}

const TrailerList: FC<IProps> = ({ trailers }) => {
  if (trailers && trailers.length === 0) return null;

  return (
    <div className="trailer-list-container">
      <h2 className="title">Trailers</h2>
      <div className="trailer-list">
        {trailers?.slice(0, 3).map((trailer) => (
          <Iframe
            height="100%"
            width="100%"
            className="trailer"
            id={trailer.id}
            key={trailer.id}
            url={`https://www.youtube.com/embed/${trailer.key}`}
            frameBorder={0}
            allowFullScreen
          />
        ))}
      </div>
    </div>
  );
};

export default TrailerList;

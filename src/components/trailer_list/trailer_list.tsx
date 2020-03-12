import React, {FC} from "react";

import Iframe from 'react-iframe'

import { IVideo } from "../movie_details/movie_details";

import "./trailer_list.styles.scss";

interface IProps {
  trailers?: IVideo[]
}

const TrailerList : FC<IProps> = ({ trailers }) => (
  <div className="trailer-list">
    {trailers?.slice(0, 3)
    .map(trailer => (
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
)

export default TrailerList;
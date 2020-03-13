import React, { useState, FC } from "react";

import { ICastMember } from "../movie_details/movie_details";
import { baseImgUrl } from "../../utils/themoviedb-api";

import "./cast_list.styles.scss";

interface IProps {
  cast: Array<ICastMember>;
}

const slice = 3;

const CastList: FC<IProps> = ({ cast }) => {
  const [visibleActors, setVisibleActors] = useState(slice);

  if (!cast || !cast.length) return <h2>Loading...</h2>;

  return (
    <div className="cast-list-container">
      <h2 className="title">Actors</h2>
      <div className="cast-list">
        {cast.slice(0, visibleActors).map((actor, index) => (
          <div className="actor" key={index}>
            <img
              className="profile-image"
              src={
                actor.profile_path
                  ? `${baseImgUrl}${actor.profile_path}`
                  : "https://s3-ap-southeast-1.amazonaws.com/upcode/static/default-image.jpg"
              }
              alt="actor"
            />
            <h3 className="name">{actor.name}</h3>
          </div>
        ))}
        {visibleActors <= slice * 2 ? (
          <span
            className="view-more"
            onClick={() => setVisibleActors(visibleActors + slice)}
          >
            View more
          </span>
        ) : (
          <span className="view-more" onClick={() => setVisibleActors(slice)}>
            View less
          </span>
        )}
      </div>
    </div>
  );
};

export default CastList;

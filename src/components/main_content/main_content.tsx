import React from "react";
import {
  Switch,
  Route,
  withRouter,
  RouteComponentProps
} from "react-router-dom";

import Movie from "../movie/movie";
import MovieDetails from "../movie_details/movie_details";

import "./main_content.styles.css";

interface IProps extends RouteComponentProps {
  movies: any[];
}
class MainContent extends React.Component<IProps> {
  render() {
    const { match, movies } = this.props;
    return (
      <Switch>
        <Route exact path={match.path}>
          <div className="mainContentContainer">
            {movies.map(movie => (
              <Movie
                key={movie.id}
                id={movie.id}
                rating={movie.vote_average}
                poster={movie.poster_path}
              />
            ))}
          </div>
        </Route>
        <Route path={`${match.path}`}>
          <MovieDetails />
        </Route>
      </Switch>
    );
  }
}

export default withRouter(MainContent);

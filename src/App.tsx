import React, { CSSProperties } from "react";
import { Switch, Route } from "react-router-dom";

import { auth } from "./firebase/firebase.utils";

// components
import SignIn from "./components/sign_in/sign_in";
import Header from "./containers/header/header";
import Sidebar from "./components/sidebar/sidebar";
import MainContent from "./components/main_content/main_content";
import MovieDetails from "./components/movie_details/movie_details";

const styles: CSSProperties = {
  display: "flex",
  height: "calc(100vh - 80px)"
};

interface IState {
  currentUser: any;
  movies: any[];
}

class App extends React.Component<{}, IState> {
  private unsubscribeFromAuth: any = null;

  state = {
    currentUser: null,
    movies: []
  };

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user =>
      this.setState({ currentUser: user })
    );
    this.fetchMovies("trending");
  }

  fetchMovies(category: "discover" | "trending") {
    fetch(
      `https://api.themoviedb.org/3/${category}/all/day?api_key=${process.env.REACT_APP_API}`
    )
      .then(response => response.json())
      .then(data => this.setState({ movies: data.results }));
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <>
        <Header />
        <div style={styles}>
          <Sidebar />
          <Switch>
            <Route exact path="/signin" component={SignIn} />
            <Route path="/">
              <MainContent movies={this.state.movies} />
            </Route>
            
          </Switch>
        </div>
      </>
    );
  }
}

export default App;

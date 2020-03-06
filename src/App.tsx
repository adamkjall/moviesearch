import React, { CSSProperties } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Firebase, {
  auth,
  createUserProfileDocument
} from "./firebase/firebase.utils";

// components
import SignIn from "./components/sign_in/sign_in";
import SignUp from "./components/sign_up/sign_up";
import Header from "./containers/header/header";
import Sidebar from "./components/sidebar/sidebar";
import MainContent from "./components/main_content/main_content";
import Navbar from "./components/navbar/navbar";

const styles: CSSProperties = {
  display: "flex",
  height: "calc(100vh - 80px)"
};

type User = {
  id: string;
  displayName: string;
  email: string;
  createdAt: Date;
};

interface IState {
  currentUser: User | null;
  movies: any[];
}

class App extends React.Component<{}, IState> {
  private unsubscribeFromAuth: Firebase.Unsubscribe | null = null;

  state = {
    currentUser: null,
    movies: []
  };

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        if (userRef) {
          userRef.onSnapshot(snapshot => {
            const { displayName, email, createdAt } = snapshot.data() as User;
            this.setState({
              currentUser: {
                id: snapshot.id,
                displayName,
                email,
                createdAt
              }
            });
          });
        }
      } else {
        this.setState({ currentUser: userAuth });
      }
    });
    this.fetchMovies("trending");
  }

  fetchMovies(category: "discover" | "trending") {
    fetch(
      `https://api.themoviedb.org/3/${category}/all/day?api_key=${process.env.REACT_APP_API}`
    )
      .then(response => response.json())
      .then(data => this.setState({ movies: data.results }));
  }

  searchMovies = (searchTerm: string) => {
    //e.preventDefault();

    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API}&query=${searchTerm}`
    )
      .then(response => response.json())
      .then(data => this.setState({ movies: data.results }));
  };

  componentWillUnmount() {
    if (this.unsubscribeFromAuth) {
      this.unsubscribeFromAuth();
    }
  }

  render() {
    const { currentUser, movies } = this.state;
    return (
      <>
        <Header getMoviesFromSearch={this.searchMovies} />
        <div style={styles}>
          <Sidebar>
            <Navbar currentUser={currentUser} />
          </Sidebar>
          <Switch>
            <Route
              exact
              path="/signin"
              render={() =>
                this.state.currentUser ? <Redirect to="/" /> : <SignIn />
              }
            />
            <Route
              exact
              path="/register"
              render={() =>
                this.state.currentUser ? <Redirect to="/" /> : <SignUp />
              }
            />
            <Route path="/">
              <MainContent movies={movies} />
            </Route>
          </Switch>
        </div>
      </>
    );
  }
}

export default App;

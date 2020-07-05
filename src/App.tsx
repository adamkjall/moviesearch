import React, { useState, useEffect, CSSProperties, FC } from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";

import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

// components
import SignIn from "./components/sign_in/sign_in";
import SignUp from "./components/sign_up/sign_up";
import Header from "./components/header/header";
import Sidebar from "./components/sidebar/sidebar";
import MainContent from "./components/main_content/main_content";
import Navbar from "./components/navbar/navbar";
import ErrorBoundary from "./components/errorBoundary";
import WatchList from "./components/watchlist/watchlist";
import Modal from "./components/modal";
import MovieDetails from "./components/movie_details/movie_details";

const styles: CSSProperties = {
  display: "flex",
  height: "calc(100vh - 80px)",
};

export type User = {
  id: string;
  displayName: string;
  email: string;
  createdAt: Date;
};

const App = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const location = useLocation();

  // This piece of state is set when one of the
  // gallery links is clicked. The `background` state
  // is the location that we were at when one of
  // the gallery links was clicked. If it's there,
  // use it as the location for the <Switch> so
  // we show the gallery in the background, behind
  // the modal.
  let locationState = location.state as any;

  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        if (userRef) {
          userRef.onSnapshot((snapshot) => {
            const { displayName, email, createdAt } = snapshot.data() as User;
            setCurrentUser({
              id: snapshot.id,
              displayName,
              email,
              createdAt,
            });
          });
        }
      } else {
        setCurrentUser(null);
      }
    });

    return () => {
      unsubscribeFromAuth();
    };
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleResize = () => {
    if (window.innerWidth <= 768) {
      setShowSidebar(false);
    } else if (window.innerWidth > 768) {
      setShowSidebar(true);
    }
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <ErrorBoundary>
      <ErrorBoundary>
        <Header toggleSidebar={toggleSidebar} />
      </ErrorBoundary>
      <div style={styles}>
        {showSidebar ? (
          <ErrorBoundary>
            <Sidebar toggleSidebar={toggleSidebar}>
              <Navbar currentUser={currentUser} />
            </Sidebar>
          </ErrorBoundary>
        ) : null}
        <ErrorBoundary>
          <Switch>
            <Route
              exact
              path="/signin"
              render={() => (currentUser ? <Redirect to="/" /> : <SignIn />)}
            />
            <Route
              exact
              path="/register"
              render={() => (currentUser ? <Redirect to="/" /> : <SignUp />)}
            />
            <Route exact path="/">
              <Redirect from="/" to="trending" />
            </Route>
            <Route path="/watchlist">
              <WatchList user={currentUser} />
            </Route>
            <Route path="/:category">
              <MainContent user={currentUser} />
            </Route>
          </Switch>
          {locationState && locationState.background && (
            <Modal>
              <MovieDetails />
            </Modal>
          )}
        </ErrorBoundary>
      </div>
    </ErrorBoundary>
  );
};

export default App;

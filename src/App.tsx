import React, { CSSProperties } from "react";
import {
  Switch,
  Route,
  Redirect,
  withRouter,
  RouteComponentProps,
} from "react-router-dom";

import Firebase, {
  auth,
  createUserProfileDocument,
} from "./firebase/firebase.utils";

// components
import SignIn from "./components/sign_in/sign_in";
import SignUp from "./components/sign_up/sign_up";
import Header from "./containers/header/header";
import Sidebar from "./components/sidebar/sidebar";
import MainContent from "./components/main_content/main_content";
import Navbar from "./components/navbar/navbar";
import ErrorBoundary from "./errorBoundary";
import WatchList from "./components/watchlist/watchlist";

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

interface IProps extends RouteComponentProps {}
interface IState {
  currentUser: User | null;
  showSidebar: boolean;
}

class App extends React.Component<IProps, IState> {
  private unsubscribeFromAuth: Firebase.Unsubscribe | null = null;

  state = {
    currentUser: null,
    showSidebar: true,
  };

  componentDidMount() {
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        if (userRef) {
          userRef.onSnapshot((snapshot) => {
            const { displayName, email, createdAt } = snapshot.data() as User;
            this.setState({
              currentUser: {
                id: snapshot.id,
                displayName,
                email,
                createdAt,
              },
            });
          });
        }
      } else {
        this.setState({ currentUser: userAuth });
      }
    });
  }

  componentWillUnmount() {
    if (this.unsubscribeFromAuth) {
      this.unsubscribeFromAuth();
    }
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize = () => {
    if (window.innerWidth <= 768 && this.state.showSidebar) {
      this.setState({ showSidebar: false });
    } else if (window.innerWidth > 768 && !this.state.showSidebar) {
      this.setState({ showSidebar: true });
    }
  };

  toggleSidebar = () => {
    this.setState({ showSidebar: !this.state.showSidebar });
  };

  render() {
    const { currentUser } = this.state;
    return (
      <ErrorBoundary>
        <ErrorBoundary>
          <Header
            toggleSidebar={this.toggleSidebar}
            hideLogo={this.state.showSidebar}
          />
        </ErrorBoundary>
        <div style={styles}>
          {this.state.showSidebar ? (
            <ErrorBoundary>
              <Sidebar>
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
                <WatchList user={this.state.currentUser} />
              </Route>
              <Route path="/:category">
                <MainContent user={this.state.currentUser} />
              </Route>
            </Switch>
          </ErrorBoundary>
        </div>
      </ErrorBoundary>
    );
  }
}

export default withRouter(App);

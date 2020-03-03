import React, { CSSProperties } from "react";
import { Switch, Route } from "react-router-dom";

import { auth } from "./firebase/firebase.utils";

// componentes
import SignIn from "./components/sign_in/sign_in";
import Header from "./containers/header/header";
import Sidebar from "./components/sidebar/sidebar";
import MainContent from "./components/main_content/main_content";

const styles: CSSProperties = {
  display: "flex",
  height: "calc(100vh - 80px)"
};

interface IState {
  currentUser: any;
}

class App extends React.Component<{}, IState> {
  private unsubscribeFromAuth: any = null;

  state = {
    currentUser: null
  };

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user =>
      this.setState({ currentUser: user })
    );
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
            <Route exact path="/" component={MainContent} />
            <Route path="/signin" component={SignIn} />
          </Switch>
        </div>
      </>
    );
  }
}

export default App;

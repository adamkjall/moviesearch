import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";

import { auth } from "./firebase/firebase.utils";

// componentes
import Main from "./containers/main/Main";
import SignIn from "./components/sign_in";
import Header from "./containers/header/Header";

const App = () => {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(user =>
      setCurrentUser(user)
    );
    // console.log(currentUser)
    return () => unsubscribeFromAuth();
  }, [currentUser]);

  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/signin" component={SignIn} />
      </Switch>
    </div>
  );
};

export default App;

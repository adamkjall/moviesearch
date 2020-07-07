import React, { FC, useState, useEffect } from "react";

import AuthenticationContext, { IUser } from "./context";
import { auth, createUserProfileDocument } from "../../firebase/firebase.utils";

const AuthenticationContextProvider: FC = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        if (userRef) {
          userRef.onSnapshot((snapshot) => {
            const { displayName, email, createdAt } = snapshot.data() as IUser;
            setUser({
              id: snapshot.id,
              displayName,
              email,
              createdAt,
            });
            setIsAuthenticated(true);
          });
        }
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    });

    return () => unsubscribeFromAuth();
  }, []);

  const login = (email: string, password: string) => {
    auth.signInWithEmailAndPassword(email, password);
  };

  const logout = async () => {
    await auth.signOut();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthenticationContext.Provider
      {...props}
      value={{
        isAuthenticated,
        user,
        login,
        logout,
      }}
    />
  );
};

export default AuthenticationContextProvider;

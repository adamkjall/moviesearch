import React from "react";

export interface IUser {
  id: string;
  displayName: string;
  email: string;
  createdAt: Date;
}

interface Context {
  isAuthenticated: boolean;
  user: IUser | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

export default React.createContext<Context>({
  isAuthenticated: false,
  user: null,
  login: (email: string, password: string) => {},
  logout: () => {},
});

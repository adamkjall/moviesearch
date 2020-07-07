import React from "react";

import AuthenticationContextProvider from "./authentication-context/context-provider";

interface Props {
  children: React.ReactNode;
}

const ApplicationContextProvider = ({ children }: Props) => (
  <AuthenticationContextProvider>{children}</AuthenticationContextProvider>
);

export default ApplicationContextProvider;

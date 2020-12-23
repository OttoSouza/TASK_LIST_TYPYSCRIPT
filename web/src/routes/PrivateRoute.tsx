import React from "react";
import { RouteProps, Route, Redirect } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";

interface PrivateRouteProps extends RouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return isPrivate === !!user ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? "/" : "/home",
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default PrivateRoute;

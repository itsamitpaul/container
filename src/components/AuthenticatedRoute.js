import React from "react";
import { Route, Redirect } from "react-router-dom";

export default ({ component: Component, props: cProps, ...rest }) => {
  return (
    <Route {...rest} render={props => (
      (cProps.isSignedIn === true)
        ? <Component {...props} {...cProps} />
        : <Redirect to={{ pathname: "/signin", state: { from: props.location } }} />
    )} />
  );
}

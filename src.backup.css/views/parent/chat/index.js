import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

const Msg = React.lazy(() =>
  import(/* webpackChunkName: "second" */ "./messagerie")
);

const Chat = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/messagerie`} />

      <Route
        path={`${match.url}/messagerie`}
        render={props => <Msg {...props} />}
      />

      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Chat;

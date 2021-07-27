import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

const Carnet = React.lazy(() =>
  import(/* webpackChunkName: "second" */ "./carnet")
);


const Notes = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/carnet`} />

      <Route
        path={`${match.url}/carnet`}
        render={props => <Carnet {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Notes;

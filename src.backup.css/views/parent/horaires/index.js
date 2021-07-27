import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";



const Cantine = React.lazy(() =>
  import(/* webpackChunkName: "second" */ "./cantine")
);
const Bus = React.lazy(() =>
  import(/* webpackChunkName: "second" */ "./bus"));

const Cal = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/bus`} />

      <Route
        path={`${match.url}/bus`}
        render={props => <Bus {...props} />}
      />

      <Route
        path={`${match.url}/cantine`}
        render={props => <Cantine {...props} />}
      />


      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Cal;

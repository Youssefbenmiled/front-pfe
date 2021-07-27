import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

const Cantine = React.lazy(() =>
  import(/* webpackChunkName: "second" */ "./cantine")
);
const Event = React.lazy(() =>
  import(/* webpackChunkName: "second" */ "./evenement")
);
const Bus = React.lazy(() =>
  import(/* webpackChunkName: "second" */ "./bus"));

const Organiser = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact
        from={`${match.url}/`}
        to={`${match.url}/evenement`} />

      <Route
        path={`${match.url}/bus`}
        render={props => <Bus {...props} />}

      />
      <Route
        path={`${match.url}/cantine`}
        render={props => <Cantine {...props} />}
      />

      <Route
        path={`${match.url}/evenement`}
        render={props => <Event {...props} />}
      />
      <Route
        path={`${match.url}/bus`}
        render={props => <Bus {...props} />}
      />

      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Organiser;

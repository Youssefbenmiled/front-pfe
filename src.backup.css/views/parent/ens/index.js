import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

const Absence = React.lazy(() =>
  import(/* webpackChunkName: "second" */ "./absence")
);
const Dev = React.lazy(() =>
  import(/* webpackChunkName: "second" */ "./devoirs")
);

const Eval = React.lazy(() =>
  import(/* webpackChunkName: "second" */ "./evaluation")
);

const Ens = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/absence`} />

      <Route
        path={`${match.url}/absence`}
        render={props => <Absence {...props} />}
      />
      <Route
        path={`${match.url}/devoirs`}
        render={props => <Dev {...props} />}
      />
      <Route
        path={`${match.url}/evaluation`}
        render={props => <Eval {...props} />}
      />


      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Ens;

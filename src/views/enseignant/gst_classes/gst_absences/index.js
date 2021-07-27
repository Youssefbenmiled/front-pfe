import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

const Marquer = React.lazy(() =>
  import(/* webpackChunkName: "second" */ "./marquer_absences")
);

const Feuille = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect
        exact
        from={`${match.url}/`}
        to={`${match.url}/marquer_absences`}
      />

      <Route
        path={`${match.url}/marquer_absences`}
        render={props => <Marquer {...props} />}
      />

      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Feuille;

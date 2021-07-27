import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

const Emploi_eleve = React.lazy(() =>
  import(/* webpackChunkName: "second" */ "./emploi_eleve")
);
const Emploi_ens = React.lazy(() =>
  import(/* webpackChunkName: "second" */ "./emploi_ens")
);

const Emploi = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/emploi_eleve`} />

      <Route
        path={`${match.url}/emploi_eleve`}
        render={props => <Emploi_eleve {...props} />}
      />
      <Route
        path={`${match.url}/emploi_ens`}
        render={props => <Emploi_ens {...props} />}
      />

      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Emploi;

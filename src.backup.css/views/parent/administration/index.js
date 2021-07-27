import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

const Notes = React.lazy(() =>
  import(/* webpackChunkName: "second" */ "./notes")
);
const Emploi = React.lazy(() =>
  import(/* webpackChunkName: "second" */ "./emploi")
);
const Cal = React.lazy(() =>
  import(/* webpackChunkName: "second" */ "./calendrier")
);
const Consultation = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/emploi`} />


      <Route
        path={`${match.url}/emploi`}
        render={props => <Emploi {...props} />}
      />
      <Route
        path={`${match.url}/calendrier`}
        render={props => <Cal {...props} />}
      />
       <Route
        path={`${match.url}/notes`}
        render={props => <Notes {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Consultation;

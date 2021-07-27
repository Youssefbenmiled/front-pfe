import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";


const Admins = React.lazy(() =>
  import(/* webpackChunkName: "second" */ "./admins")
);
const Adm = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect
        exact from={`${match.url}/`}
        to={`${match.url}/admins`}
      />
      <Route
        path={`${match.url}/admins`}
        render={props => <Admins {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Adm;

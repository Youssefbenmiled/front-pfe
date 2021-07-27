import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

const Carnet = React.lazy(() =>
  import(/* webpackChunkName: "second" */ "./carnet")
);
// const RN = React.lazy(() =>
//   import(/* webpackChunkName: "second" */ "./recevoir_notes")
// );
// const Taux = React.lazy(() =>
//   import(/* webpackChunkName: "second" */ "./taux")
// );

const Notes = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/carnet`} />

      <Route
        path={`${match.url}/carnet`}
        render={props => <Carnet {...props} />}
      />

      {/* <Route
        path={`${match.url}/recevoir_notes`}
        render={props => <RN {...props} />}
      /> */}

      {/* <Route 
      path={`${match.url}/taux`} 
      render={props => <Taux {...props} />}         
      /> */}


      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Notes;

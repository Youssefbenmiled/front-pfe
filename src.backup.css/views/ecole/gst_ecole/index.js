import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
// console.log(this.props) ycompili ama maya3rfhom les props
const Eleve = React.lazy(() =>
  import(/* webpackChunkName: "second" */ "./gst_eleve")
);
const Ens = React.lazy(() =>
  import(/* webpackChunkName: "second" */ "./gst_ens")
);
const Tuteur = React.lazy(() =>
  import(/* webpackChunkName: "second" */ "./gst_tuteur")
);
const Classe = React.lazy(() =>
  import(/* webpackChunkName: "second" */ "./gst_classe")
);
const Mat = React.lazy(() =>
  import(/* webpackChunkName: "second" */ "./gst_matieres")
);
const Domaine = React.lazy(() =>
  import(/* webpackChunkName: "second" */ "./gst_domaine")
);
const Abs = React.lazy(() =>
  import(/* webpackChunkName: "second" */ "./gst_absence")
);
// const Admins = React.lazy(() =>
//   import(/* webpackChunkName: "second" *../gst_admins/gst_adminsins")
// );
const Gestion = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect
        exact from={`${match.url}/`}
        to={`${match.url}/gst_eleve`}
      />

      <Route
        path={`${match.url}/gst_eleve`}
        render={props => <Eleve {...props} />}
      />
      <Route
        path={`${match.url}/gst_classe`}
        render={props => <Classe {...props} />}
      />
      <Route
        path={`${match.url}/gst_ens`}
        render={props => <Ens {...props} />}
      />
      <Route
        path={`${match.url}/gst_tuteur`}
        render={props => <Tuteur {...props} />}
      />
      <Route
        path={`${match.url}/gst_domaine`}
        render={props => <Domaine {...props} />}
      />
      <Route
        path={`${match.url}/gst_matieres`}
        render={props => <Mat {...props} />}
      />
      <Route
        path={`${match.url}/gst_absence`}
        render={props => <Abs {...props} />}
      />
      {/* <Route
        path={`${match.url}/gst_admins`}
        render={props => <Admins {...props} />}
      /> */}
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Gestion;

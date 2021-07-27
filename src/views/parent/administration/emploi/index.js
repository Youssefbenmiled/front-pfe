import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

var profil = JSON.parse(localStorage.getItem('eleve'));

const Emp = React.lazy(() =>
    import(/* webpackChunkName: "second" */ "./emploi")
);

const Emploi = ({ match }) => (
    <Suspense fallback={<div className="loading" />}>
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/emploi`} />

            <Route
                path={`${match.url}/emploi`}
                render={props => <Emp {...props} />}
            />

            <Redirect to="/error" />
        </Switch>
    </Suspense>
);
export default Emploi;

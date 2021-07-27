import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

const Ans = React.lazy(() =>
    import(/* webpackChunkName: "second" */ "./an_sc")
);

const Annee = ({ match }) => (
    <Suspense fallback={<div className="loading" />}>
        <Switch>
            <Redirect
                exact from={`${match.url}/`}
                to={`${match.url}/an_sc`} />

            <Route
                path={`${match.url}/an_sc`}
                render={props => <Ans {...props} />}
            />


            <Redirect to="/error" />
        </Switch>
    </Suspense>
);
export default Annee;

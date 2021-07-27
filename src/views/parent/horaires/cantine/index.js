import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

const Cantine = React.lazy(() =>
    import(/* webpackChunkName: "second" */ "./cantine")
);

const Menu = ({ match }) => (
    <Suspense fallback={<div className="loading" />}>
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/cantine`} />

            <Route
                path={`${match.url}/cantine`}
                render={props => <Cantine {...props} />}
            />
            <Redirect to="/error" />
        </Switch>
    </Suspense>
);
export default Menu;

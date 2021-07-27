import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

const Bus = React.lazy(() =>
    import(/* webpackChunkName: "second" */ "./bus")
);

const Buss = ({ match }) => (
    <Suspense fallback={<div className="loading" />}>
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/bus`} />

            <Route
                path={`${match.url}/bus`}
                render={props => <Bus {...props} />}
            />
            <Redirect to="/error" />
        </Switch>
    </Suspense>
);
export default Buss;

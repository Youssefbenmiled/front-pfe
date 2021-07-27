import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";


const Event = React.lazy(() =>
    import(/* webpackChunkName: "second" */ "./event")
);


const Evnt = ({ match }) => (
    <Suspense fallback={<div className="loading" />}>
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/event`} />

            <Route
                path={`${match.url}/event`}
                render={props => <Event {...props} />}
            />

            <Redirect to="/error" />
        </Switch>
    </Suspense>
);
export default Evnt;

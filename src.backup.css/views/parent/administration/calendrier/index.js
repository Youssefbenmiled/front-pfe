import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";


const Cal = React.lazy(() =>
    import(/* webpackChunkName: "second" */ "./calendrier")
);
const Calendrier = ({ match }) => (
    <Suspense fallback={<div className="loading" />}>
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/calendrier`} />

            <Route
                path={`${match.url}/calendrier`}
                render={props => <Cal {...props} />}
            />

            <Redirect to="/error" />
        </Switch>
    </Suspense>
);
export default Calendrier;

import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";


const CAL = React.lazy(() =>
    import(/* webpackChunkName: "second" */ "./cal")
);


const CA = ({ match }) => (
    <Suspense fallback={<div className="loading" />}>
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/cal`} />

            <Route
                path={`${match.url}/cal`}
                render={props => <CAL {...props} />}
            />

            <Redirect to="/error" />
        </Switch>
    </Suspense>
);
export default CA;

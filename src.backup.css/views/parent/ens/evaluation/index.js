import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";


const Evaluation = React.lazy(() =>
    import(/* webpackChunkName: "second" */ "./evaluation")
);

const Eval = ({ match }) => (
    <Suspense fallback={<div className="loading" />}>
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/evaluation`} />

            <Route
                path={`${match.url}/evaluation`}
                render={props => <Evaluation {...props} />}
            />

            <Redirect to="/error" />
        </Switch>
    </Suspense>
);
export default Eval;

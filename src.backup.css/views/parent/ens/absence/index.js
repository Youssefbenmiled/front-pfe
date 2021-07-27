import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";


const Abs = React.lazy(() =>
    import(/* webpackChunkName: "second" */ "./absence")
);

const Absences = ({ match }) => (
    <Suspense fallback={<div className="loading" />}>
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/absence`} />

            <Route
                path={`${match.url}/absence`}
                render={props => <Abs {...props} />}
            />

            <Redirect to="/error" />
        </Switch>
    </Suspense>
);
export default Absences;

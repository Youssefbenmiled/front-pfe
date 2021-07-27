import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";


const Dev = React.lazy(() =>
    import(/* webpackChunkName: "second" */ "./travailAfaire")
);

const Devoir = ({ match }) => (
    <Suspense fallback={<div className="loading" />}>
        <Switch>
            <Redirect
                exact from={`${match.url}/`}
                to={`${match.url}/travailAfaire`} />

            <Route
                path={`${match.url}/travailAfaire`}
                render={props => <Dev {...props} />}
            />

            <Redirect to="/error" />
        </Switch>
    </Suspense>
);
export default Devoir;

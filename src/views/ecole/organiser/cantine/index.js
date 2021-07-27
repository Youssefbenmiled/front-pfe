import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";



const Cantine = React.lazy(() =>
    import(/* webpackChunkName: "second" */ "./gst_cantine")
);

const Ca = ({ match }) => (
    <Suspense fallback={<div className="loading" />}>
        <Switch>
            <Redirect
                exact from={`${match.url}/`}
                to={`${match.url}/gst_cantine`}
            />


            <Route
                path={`${match.url}/gst_cantine`}
                render={props => <Cantine {...props} />}
            />
            <Redirect to="/error" />
        </Switch>
    </Suspense>
);
export default Ca;

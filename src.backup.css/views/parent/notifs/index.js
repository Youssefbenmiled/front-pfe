import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

const Notifs = React.lazy(() =>
    import(/* webpackChunkName: "second" */ "./notifications")
);

const Notification = ({ match }) => (
    <Suspense fallback={<div className="loading" />}>
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/notifications`} />

            <Route
                path={`${match.url}/notifications`}
                render={props => <Notifs {...props} />}
            />
            <Redirect to="/error" />
        </Switch>
    </Suspense>
);
export default Notification;

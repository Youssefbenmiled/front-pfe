import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";


const Event = React.lazy(() =>
    import(/* webpackChunkName: "second" */ "./evenement")
);


const Evenement = ({ match }) => (
    <Suspense fallback={<div className="loading" />}>
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/evenement`} />


            <Route
                path={`${match.url}/evenement`}
                render={props => <Event {...props} />}
            />


            <Redirect to="/error" />
        </Switch>
    </Suspense>
);
export default Evenement;

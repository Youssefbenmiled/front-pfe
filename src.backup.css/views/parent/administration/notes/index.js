import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";


const Notes = React.lazy(() =>
    import(/* webpackChunkName: "second" */ "./notes")
);

const Consultation = ({ match }) => (
    <Suspense fallback={<div className="loading" />}>
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/notes`} />

            <Route
                path={`${match.url}/notes`}
                render={props => <Notes {...props} />}
            />

            <Redirect to="/error" />
        </Switch>
    </Suspense>
);
export default Consultation;

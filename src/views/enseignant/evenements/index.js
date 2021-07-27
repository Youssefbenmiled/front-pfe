import React, { Component, Suspense } from "react";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";


// const Creation = React.lazy(() =>
//     import(/* webpackChunkName: "viwes-blank-page" */ "./creation")
// );
const Consulter = React.lazy(() =>
    import(/* webpackChunkName: "viwes-blank-page" */ "./event")
);

class Events extends Component {
    render() {
        const { match } = this.props;

        return (
            <div className="dashboard-wrapper">
                <Suspense fallback={<div className="loading" />}>
                    <Switch>
                        <Redirect
                            exact
                            from={`${match.url}/`}
                            to={`${match.url}/event`}
                        />

                        <Route
                            path={`${match.url}/event`}
                            render={props => <Consulter {...props} />}
                        />




                        <Redirect to="/error" />
                    </Switch>
                </Suspense>
            </div>
        );
    }
}
const mapStateToProps = ({ menu }) => {
    const { containerClassnames } = menu;
    return { containerClassnames };
};

export default withRouter(connect(mapStateToProps, {})(Events));

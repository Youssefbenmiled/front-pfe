import React, { Component, Suspense } from "react";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";


// const Creation = React.lazy(() =>
//     import(/* webpackChunkName: "viwes-blank-page" */ "./creation")
// );
const Consulter = React.lazy(() =>
    import(/* webpackChunkName: "viwes-blank-page" */ "./consulter")
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
                            to={`${match.url}/consulter`}
                        />

                        <Route
                            path={`${match.url}/consulter`}
                            render={props => <Consulter {...props} />}
                        />

                        {/* <Route
                            path={`${match.url}/creation`}
                            render={props => <Creation {...props} />}
                        /> */}


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

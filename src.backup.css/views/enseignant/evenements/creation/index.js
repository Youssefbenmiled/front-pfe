import React, { Component, Suspense } from "react";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";



const Event = React.lazy(() =>
    import(/* webpackChunkName: "viwes-blank-page" */ "./evenements")
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
                            to={`${match.url}/evenements`}
                        />

                        <Route
                            path={`${match.url}/evenements`}
                            render={props => <Event {...props} />}
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

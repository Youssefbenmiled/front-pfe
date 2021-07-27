import React, { Component, Suspense } from "react";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const Exams = React.lazy(() =>
    import(/* webpackChunkName: "viwes-blank-page" */ "./date_evaluation")
);


class Examen extends Component {
    render() {
        const { match } = this.props;

        return (
            <div className="dashboard-wrapper">
                <Suspense fallback={<div className="loading" />}>
                    <Switch>
                        <Redirect
                            exact
                            from={`${match.url}/`}
                            to={`${match.url}/date_evaluation`}
                        />
                        <Route
                            path={`${match.url}/date_evaluation`}
                            render={props => <Exams {...props} />}
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

export default withRouter(connect(mapStateToProps, {})(Examen));

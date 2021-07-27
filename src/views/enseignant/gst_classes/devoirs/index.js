import React, { Component, Suspense } from "react";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const Devoirs = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ "./travailAfaire")
);

class App extends Component {
  render() {
    const { match } = this.props;

    return (
      <div className="dashboard-wrapper">
        <Suspense fallback={<div className="loading" />}>
          <Switch>
            <Redirect
              exact
              from={`${match.url}/`}
              to={`${match.url}/travailAfaire`}
            />
            <Route
              path={`${match.url}/travailAfaire`}
              render={props => <Devoirs {...props} />}
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

export default withRouter(connect(mapStateToProps, {})(App));

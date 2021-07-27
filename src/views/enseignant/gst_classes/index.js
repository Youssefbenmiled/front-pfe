import React, { Component, Suspense } from "react";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const Devoirs = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ "./devoirs")
);
const Absences = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ "./gst_absences")
);
const Evt = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ "./evaluations_tests")
);

// const Notes = React.lazy(() =>
//   import(/* webpackChunkName: "viwes-blank-page" */ "./gst_notes")
// );
// const Travail = React.lazy(() =>
//   import(/* webpackChunkName: "viwes-blank-page" */ "./travail")
// );

class Gestion extends Component {
  render() {
    const { match } = this.props;

    return (
      <div className="dashboard-wrapper">
        <Suspense fallback={<div className="loading" />}>
          <Switch>
            <Redirect
              exact
              from={`${match.url}/`}
              to={`${match.url}/gst_eleves`}
            />
            <Route
              path={`${match.url}/devoirs`}
              render={props => <Devoirs {...props} />}
            />
            <Route
              path={`${match.url}/gst_absences`}
              render={props => <Absences {...props} />}
            />
            <Route
              path={`${match.url}/evaluations_tests`}
              render={props => <Evt {...props} />}
            />

            {/* <Route
              path={`${match.url}/gst_notes`}
              render={props => <Notes {...props} />}
            /> */}

            {/* <Route
              path={`${match.url}/travail`}
              render={props => <Travail {...props} />}
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

export default withRouter(connect(mapStateToProps, {})(Gestion));

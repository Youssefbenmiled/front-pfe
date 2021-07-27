import React, { Component, Suspense } from "react";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import EnsLayout from "../../layout/EnsLayout";

const Accueil = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ "./accueil")
);
const Classes = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ "./gst_classes")
);
const Notifs = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ "./notifs")
);
const Event = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ "./evenements")
);

const Chat = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ "./gst_chat")
);

const Admin = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ "./administration")
);


class App extends Component {
  render() {
    const { match } = this.props;
    switch (localStorage.getItem('user_role')) {
      case "ROLE_ADMIN":
        localStorage.getItem('user_role');
        localStorage.getItem('user_id');
        this.props.history.push('/ecole/accueil');
        break;
      case "ROLE_PARENT":
        localStorage.getItem('user_role');
        localStorage.getItem('user_id');
        this.props.history.push('/parent/accueil');
        break;
      default:

        break;
    }
    return (
      <EnsLayout>
        <div className="dashboard-wrapper">
          <Suspense fallback={<div className="loading" />}>
            <Switch>
              {/* {(localStorage.getItem('user_role')) && */}

              <Redirect
                exact
                from={`${match.url}/`}
                to={`${match.url}/accueil`}
              />
              {/* }
              {(localStorage.getItem('user_role')) && */}

              <Route
                path={`${match.url}/accueil`}
                render={props => <Accueil {...props} />}
              />
              {/* }
              {(localStorage.getItem('user_role')) && */}

              <Route
                path={`${match.url}/gst_classes`}
                render={props => <Classes {...props} />}
              />
              {/* }
              {(localStorage.getItem('user_role')) && */}

              <Route
                path={`${match.url}/evenements`}
                render={props => <Event {...props} />}
              />
              {/* }
              {(localStorage.getItem('user_role')) && */}

              <Route
                path={`${match.url}/gst_chat`}
                render={props => <Chat {...props} />}
              />
              {/* }
              {(localStorage.getItem('user_role')) && */}

              <Route
                path={`${match.url}/administration`}
                render={props => <Admin {...props} />}
              />
              {/* } */}
              <Route
                path={`${match.url}/notifs`}
                render={props => <Notifs {...props} />}
              />

              <Redirect to="../user/login" />

              {/* <Redirect to="/error" /> */}
            </Switch>
          </Suspense>
        </div>
      </EnsLayout>
    );
  }
}
const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};

export default withRouter(connect(mapStateToProps, {})(App));

import React, { Component, Suspense } from "react";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import AppLayout from "../../layout/AppLayout";

const Hor = React.lazy(() =>
  import(/* webpackChunkName: "viwes-g  ogo" */ "./horaires")
);
const Notifs = React.lazy(() =>
  import(/* webpackChunkName: "viwes-g  ogo" */ "./notifs")
);
const Msg = React.lazy(() =>
  import(/* webpackChunkName: "viwes-gogo" */ "./chat")
);
const Admin = React.lazy(() =>
  import(/* webpackChunkName: "viwes-second-menu" */ "./administration")
);
const Ens = React.lazy(() =>
  import(/* webpackChunkName: "viwes-second-menu" */ "./ens")
);
const Accueil = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ "./accueil")
);
const Event = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ "./evenements")
);

class App extends Component {
  render() {
    console.log(localStorage)
    const { match } = this.props;
    switch (localStorage.getItem('user_role')) {
      case "ROLE_ENS":
        localStorage.getItem('user_role');
        localStorage.getItem('user_id');
        this.props.history.push('/enseignant/accueil');
        break;
      case "ROLE_ADMIN":
        localStorage.getItem('user_role');
        localStorage.getItem('user_id');
        this.props.history.push('/ecole/accueil');
        break;
      // default:

      //   break;
    }
    return (
      <AppLayout>
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
                path={`${match.url}/administration`}
                render={props => <Admin {...props} />}
              />
              {/* }
              {(localStorage.getItem('user_role')) && */}

              <Route
                path={`${match.url}/ens`}
                render={props => <Ens {...props} />}
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
                path={`${match.url}/chat`}
                render={props => <Msg {...props} />}
              />
              {/* } */}
              <Route
                path={`${match.url}/horaires`}
                render={props => <Hor {...props} />}
              />

              <Route
                path={`${match.url}/notifs`}
                render={props => <Notifs {...props} />}
              />
              <Redirect to="../user/login" />

              {/* <Redirect to="/error" /> */}
            </Switch>
          </Suspense>
        </div>
      </AppLayout>
    );
  }
}
const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};

export default withRouter(connect(mapStateToProps, {})(App));

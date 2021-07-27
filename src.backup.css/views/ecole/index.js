import React, { Component, Suspense } from "react";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
// import md5 from 'md5';

import EcoLayout from "../../layout/EcoLayout";

const Accueil = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ "./accueil")
);
const Annee = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ "./annee")
);
const Emploi = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ "./gst_emplois")
);
const Ecole = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ "./gst_ecole")
);
const Organiser = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ "./organiser")
);
const Notes = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ "./notes")
);
const Calexams = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ "./calendrier_examens")
);
const Admins = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ "./gst_admins")
);
const Login = React.lazy(() =>
  import(/* webpackChunkName: "user-login" */ "../user/login")
);
class App extends Component {
  render() {
    const { match } = this.props;

    switch (localStorage.getItem('user_role')) {
      case "ROLE_ENS":
        localStorage.getItem('user_role');
        localStorage.getItem('user_id');
        this.props.history.push('/enseignant/accueil');
        break;
      case "ROLE_PARENT":
        localStorage.getItem('user_role');
        localStorage.getItem('user_id');
        this.props.history.push('/parent/accueil');
        break;
      default:

        break;
    }

    // if (localStorage.getItem('user_role') !== "ROLE_ADMIN") {
    //   localStorage.getItem('user_role');
    //   localStorage.getItem('user_id');
    //   this.props.history.push('/user/login');
    // }
    // var curr_role;
    // if (localStorage) {
    var curr_role = [];
    if (localStorage.getItem('user_role'))

      curr_role = localStorage.getItem('user_role').trim().split(' ');


    // }
    return (
      <EcoLayout>
        <div className="dashboard-wrapper">
          <Suspense fallback={<div className="loading" />}>

            <Switch>
              {/* {(localStorage.getItem('user_id')) && (localStorage.getItem('annee') === "annee") && */}

              <Redirect
                exact
                from={`${match.url}/`}
                to={`${match.url}/annee`}
              />


              {/* {(localStorage.getItem('user_id')) && (localStorage.getItem('annee') != "annee") && */}
              <Route
                path={`${match.url}/accueil`}
                render={props => <Accueil {...props} />}
              />
              {/* }
              {(localStorage.getItem('user_id')) && curr_role.includes("ROLE_EMPLOI") && (localStorage.getItem('annee') != "annee") && */}

              <Route
                path={`${match.url}/gst_emplois`}
                render={props => <Emploi {...props} />}
              />
              {/* }
              {(localStorage.getItem('user_id')) && curr_role.includes("ROLE_GESTION_ECOLE") && (localStorage.getItem('annee') != "annee") && */}

              <Route
                path={`${match.url}/gst_ecole`}
                render={props => <Ecole {...props} />}
              />
              {/* }

              {(localStorage.getItem('user_id')) && curr_role.includes("ROLE_ORGANISATION") && (localStorage.getItem('annee') != "annee") && */}

              <Route
                path={`${match.url}/organiser`}
                render={props => <Organiser {...props} />}
              />
              {/* }
              {(localStorage.getItem('user_id')) && curr_role.includes("ROLE_NOTES") && (localStorage.getItem('annee') != "annee") && */}

              <Route
                path={`${match.url}/notes`}
                render={props => <Notes {...props} />}
              />
              {/* }
              {(localStorage.getItem('user_id')) && curr_role.includes("ROLE_CALENDRIER_EXAMENS") && (localStorage.getItem('annee') != "annee") && */}

              <Route
                path={`${match.url}/calendrier_examens`}
                render={props => <Calexams {...props} />}
              />
              {/* }
              {(localStorage.getItem('user_id')) && curr_role.includes("ROLE_GESTION_ADMINISTRATEUR") && (localStorage.getItem('annee') != "annee") && */}

              <Route
                path={`${match.url}/gst_admins`}
                render={props => <Admins {...props} />}
              />
              {/* }
              {(localStorage.getItem('user_id')) && curr_role.includes("ROLE_GESTION_ADMINISTRATEUR") && */}

              <Route
                path={`${match.url}/annee`}
                render={props => <Annee {...props} />}
              />
              {/* } */}

              <Redirect to="../user/login" />

            </Switch>
          </Suspense>
        </div>
      </EcoLayout>
    );
  }
}
const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};

export default withRouter(connect(mapStateToProps, {})(App));

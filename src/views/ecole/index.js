import React, { Component, Suspense } from "react";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import {

  logoutUser,

} from "../../redux/actions";
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
  componentWillReceiveProps(nextProps) {
    try {
      axios
        .get("http://api.onyx.inedit-gd.tn/admins/get/" + parseInt(localStorage.getItem('user_id')))
        .then(res => res.data)
        .then(data => {


          return this.verifData(data);


        }, error => {
          return this.handleLogout();

        })
    } catch (error) {
      return this.handleLogout();

    }
  }

  verifData(admin) {

    if (admin.statut === "inactif" || admin.firstlogin === 0)
      return this.handleLogout();



    if (localStorage.getItem('accueil') && localStorage.getItem('accueil').localeCompare('/ecole/accueil') != 0)
      return this.handleLogout();


    if (parseInt(admin.id) != parseInt(localStorage.getItem('user_id')))
      return this.handleLogout();


  }
  handleLogout = () => {
    this.props.logoutUser(this.props.history);
  };

  render() {
    const { match } = this.props;




    return (
      <EcoLayout>
        <div className="dashboard-wrapper">
          <Suspense fallback={<div className="loading" />}>

            <Switch>

              <Redirect
                exact
                from={`${match.url}/`}
                to={`${match.url}/accueil`}
              />


              <Route
                path={`${match.url}/accueil`}
                render={props => <Accueil {...props} />}
              />

              <Route
                path={`${match.url}/gst_emplois`}
                render={props => <Emploi {...props} />}
              />

              <Route
                path={`${match.url}/gst_ecole`}
                render={props => <Ecole {...props} />}
              />

              <Route
                path={`${match.url}/organiser`}
                render={props => <Organiser {...props} />}
              />

              <Route
                path={`${match.url}/notes`}
                render={props => <Notes {...props} />}
              />

              <Route
                path={`${match.url}/calendrier_examens`}
                render={props => <Calexams {...props} />}
              />

              <Route
                path={`${match.url}/gst_admins`}
                render={props => <Admins {...props} />}
              />

              <Route
                path={`${match.url}/annee`}
                render={props => <Annee {...props} />}
              />


              <Redirect to="/error" />

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

export default withRouter(connect(mapStateToProps, { logoutUser })(App));

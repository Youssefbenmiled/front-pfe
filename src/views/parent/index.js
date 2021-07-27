import React, { Component, Suspense } from "react";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import AppLayout from "../../layout/AppLayout";
import {
  logoutUser,
} from "../../redux/actions";
const Hor = React.lazy(() =>
  import(/* webpackChunkName: "viwes-g  ogo" */ "./horaires")
);
// const Notifs = React.lazy(() =>
//   import(/* webpackChunkName: "viwes-g  ogo" */ "./notifs")
// );
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

  componentWillReceiveProps(nextProps) {

    try {
      axios
        .get("http://api.onyx.inedit-gd.tn/tuteur/get/" + parseInt(localStorage.getItem('user_id')))
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

  verifData(parent) {

    if (parent.statut === "inactif" || parent.firstlogin === 0)
      return this.handleLogout();



    if (localStorage.getItem('accueil') && localStorage.getItem('accueil').localeCompare('/parent/accueil') != 0)
      return this.handleLogout();


    if (parseInt(parent.id) != parseInt(localStorage.getItem('user_id')))
      return this.handleLogout();

    if (parseInt(parent.id) != parseInt(localStorage.getItem('user_id')))
      return this.handleLogout();

    if (parent.eleves.map(eleve => eleve.id).indexOf(parseInt(localStorage.getItem('id_eleve'))) === -1)
      return this.handleLogout();



  }
  handleLogout = () => {
    this.props.logoutUser(this.props.history);
  };
  render() {

    const { match } = this.props;


    return (
      <AppLayout>
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
                path={`${match.url}/administration`}
                render={props => <Admin {...props} />}
              />
              <Route
                path={`${match.url}/ens`}
                render={props => <Ens {...props} />}
              />

              <Route
                path={`${match.url}/evenements`}
                render={props => <Event {...props} />}
              />

              <Route
                path={`${match.url}/chat`}
                render={props => <Msg {...props} />}
              />
              <Route
                path={`${match.url}/horaires`}
                render={props => <Hor {...props} />}
              />


              <Redirect to="/error" />
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

export default withRouter(connect(mapStateToProps, { logoutUser })(App));

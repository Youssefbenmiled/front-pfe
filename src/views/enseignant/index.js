import React, { Component, Suspense } from "react";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import EnsLayout from "../../layout/EnsLayout";
import axios from "axios";
import {

  logoutUser,

} from "../../redux/actions";
const Accueil = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ "./accueil")
);
const Classes = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ "./gst_classes")
);
// const Notifs = React.lazy(() =>
//   import(/* webpackChunkName: "viwes-blank-page" */ "./notifs")
// );
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
  componentWillReceiveProps(nextProps) {

    try {
      axios
        .get("http://api.onyx.inedit-gd.tn/enseignant/get/" + parseInt(localStorage.getItem('user_id')))
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

  verifData(ens) {

    if (ens.statut === "inactif" || ens.firstlogin === 0)
      return this.handleLogout();



    if (localStorage.getItem('accueil') && localStorage.getItem('accueil').localeCompare('/enseignant/accueil') != 0)
      return this.handleLogout();


    if (parseInt(ens.id) != parseInt(localStorage.getItem('user_id')))
      return this.handleLogout();

    // if ((localStorage.getItem('user_role') && localStorage.getItem('user_role').toString().localeCompare(ens.roles.toString()) != 0))
    //   return this.handleLogout();



  }
  handleLogout = () => {
    this.props.logoutUser(this.props.history);
  };
  render() {
    const { match } = this.props;

    return (
      <EnsLayout>
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
                path={`${match.url}/gst_classes`}
                render={props => <Classes {...props} />}
              />

              <Route
                path={`${match.url}/evenements`}
                render={props => <Event {...props} />}
              />


              <Route
                path={`${match.url}/gst_chat`}
                render={props => <Chat {...props} />}
              />
              <Route
                path={`${match.url}/administration`}
                render={props => <Admin {...props} />}
              />
              {/* <Route
                path={`${match.url}/notifs`}
                render={props => <Notifs {...props} />}
              /> */}


              <Redirect to="/error" />
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

export default withRouter(connect(mapStateToProps, { logoutUser })(App));

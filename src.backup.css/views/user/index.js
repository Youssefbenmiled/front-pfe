import React, { Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import UserLayout from "../../layout/UserLayout";

const Login = React.lazy(() =>
  import(/* webpackChunkName: "user-login" */ "./login")
);
const ForgotPassword = React.lazy(() =>
  import(/* webpackChunkName: "user-forgot-password" */ "./forgot-password")
);
const ResetPassword = React.lazy(() =>
  import(/* webpackChunkName: "user-reset-password" */ "./reset-password")
);
// const Goto = React.lazy(() =>
//   import(/* webpackChunkName: "user-reset-password" */localStorage.getItem('accueil'))
// );


// if (localStorage) {
//   const id = localStorage.getItem('user_id');
//   const login = localStorage.getItem('first_login');
//   const accueil = localStorage.getItem('first_login');
//   console.log(accueil, 'indexxx accc')

// }
// else
//   console.log('indexx leeeeee')


const User = ({ match }) => {
  //match ki yabda l user ynaviguy tekhou sa valeur
  return (
    <UserLayout>
      <Suspense fallback={<div className="loading" />}>
        <Switch>
          <Redirect exact from={`${match.url}/`} to={`${match.url}/login`} />

          <Route
            path={`${match.url}/login`}
            render={props => <Login {...props} />}
          />


          <Route
            path={`${match.url}/forgot-password`}
            render={props => <ForgotPassword {...props} />}
          />

          <Route
            path={`${match.url}/reset-password/:type/:token`}
            render={props => <ResetPassword {...props} />}
          />


          <Redirect to="/error" />

        </Switch>
      </Suspense>
    </UserLayout>
  );
};

export default User;

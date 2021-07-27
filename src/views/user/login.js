import React, { Component } from "react";
import { Row, Card, CardTitle, Label, Button } from "reactstrap";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import Select from "react-select";
import { NotificationManager } from "../../components/common/react-notifications";
import {
  AvForm,
  AvField,
  AvGroup,
} from "availity-reactstrap-validation";
import { loginUser } from "../../redux/actions";
import { Colxx } from "../../components/common/CustomBootstrap";
import IntlMessages from "../../helpers/IntlMessages";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueType: { label: "Tuteur", value: "tuteur" },

    };
  }


  onUserLogin = (event, errors, values) => {
    event.preventDefault();

    if (!this.props.loading) {
      if (errors.length === 0) {
        values = {
          ...values,
          type: this.state.valueType.value
        }
        this.props.loginUser(values, this.props.history);
      }

    }
  };
  componentWillMount() {

    if (localStorage.getItem('user_id') && localStorage.getItem('accueil'))
      return this.props.history.push(localStorage.getItem('accueil'));


  }


  handleChangeType = value => {
    this.setState({
      valueType: value
    });
  }
  render() {
    // const { password, email, valueType } = this.state;
    // const initialValues = { email, password };
    const types = [
      { label: "Tuteur", value: "tuteur" },
      { label: "Enseignant", value: "enseignant" },
      { label: "Administratif", value: "adminstrateur" },
    ];
    const defaultValues = {
      email: "",
      password: "",
    };

    return (
      <Row className="h-100">
        <Colxx xxs="12" md="10" className="mx-auto my-auto">
          <Card className="auth-card">
            <div className="position-relative image-side ">

              <br></br>

            </div>
            <div className="form-side">

              <CardTitle className="mb-4">
                <IntlMessages id="Page d'authentification " />
              </CardTitle>
              <AvForm
                onSubmit={this.onUserLogin}
                model={defaultValues}
                className="av-tooltip tooltip-right-bottom"
              >
                <Label>Espace :</Label>
                <Select
                  onChange={this.handleChangeType}
                  value={this.state.valueType}
                  options={types}
                  className="react-select position-relative"
                  classNamePrefix="react-select"
                  name="form-field-name"
                  required

                />
                {/* {this.state.valueType === null && this.state.isSubmited &&
                    <>
                      <div className="av-invalid is-invalid form-control d-none"></div>
                      <div class="invalid-feedback">Veuillez saisir au moins un rôle</div>
                    </>
                  }
                </div> */}
                <br></br>


                <AvGroup className="error-t-negative">
                  <Label for="email">Email :</Label>
                  <AvField
                    name="email"
                    type="email"
                    validate={{
                      required: {
                        value: true,
                        errorMessage: "Veuillez saisir l'adresse email"
                      },
                      email: {
                        value: true,
                        errorMessage: "Veuillez saisir une adresse email valide"
                      }
                    }}
                  />
                </AvGroup>
                <AvGroup className="error-t-negative">
                  <Label for="password">Mot de passe :</Label>
                  <AvField
                    name="password"
                    type="password"
                    validate={{
                      required: {
                        value: true,
                        errorMessage: "Veuillez saisir le mot de passe"
                      },
                    }}
                  />
                </AvGroup>
                <div className="d-flex justify-content-between align-items-center">
                  <NavLink to={`/user/forgot-password`}>
                    <IntlMessages id="Mot de passe oublié ?" />
                  </NavLink>
                  <Button
                    color="primary"
                    className={`btn-shadow btn-multiple-state ${
                      this.props.loading ? "show-spinner" : ""
                      }`}
                    size="lg"
                  >
                    <span className="spinner d-inline-block">
                      <span className="bounce1" />
                      <span className="bounce2" />
                      <span className="bounce3" />
                    </span>
                    <span className="label">
                      <IntlMessages id="Connexion" />
                    </span>
                  </Button>

                </div>
              </AvForm>
            </div>
          </Card>
        </Colxx>
      </Row>
    );
  }
}
const mapStateToProps = ({ authUser }) => {
  const { user, loading, error } = authUser;
  return { user, loading, error };
};

export default connect(mapStateToProps, {
  loginUser
})(Login);


{/* <Formik initialValues={initialValues} onSubmit={this.onUserLogin}>
                {({ errors, touched }) => (
                  <Form className="av-tooltip tooltip-label-bottom">

                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="Utilisateur" />
                      </Label>
                      <FormikReactSelect
                        name="state"
                        id="state"
                        value={valueType}
                        options={types}
                        onChange={this.handleChangeType}
                        onBlur={null}

                      />
                      {errors.state && touched.state ? (
                        <div className="invalid-feedback d-block">
                          {errors.state}
                        </div>
                      ) : null}
                    </FormGroup>
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="Adresse e-mail" />
                      </Label>
                      <Field
                        className="form-control"
                        name="email"
                        validate={this.validateEmail}
                      />
                      {errors.email && touched.email && (
                        <div className="invalid-feedback d-block">
                          {errors.email}
                        </div>
                      )}
                    </FormGroup>
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="Mot de passe" />
                      </Label>
                      <Field
                        className="form-control"
                        type="password"
                        name="password"
                        validate={this.validatePassword}
                      />
                      {errors.password && touched.password && (
                        <div className="invalid-feedback d-block">
                          {errors.password}
                        </div>
                      )}
                    </FormGroup>


                    <div className="d-flex justify-content-between align-items-center">
                      <NavLink to={`/user/forgot-password`}>
                        <IntlMessages id="Mot de passe oublié ?" />
                      </NavLink>
                      <Button
                        color="primary"
                        className={`btn-shadow btn-multiple-state ${
                          this.props.loading ? "show-spinner" : ""
                          }`}
                        size="lg"
                      >
                        <span className="spinner d-inline-block">
                          <span className="bounce1" />
                          <span className="bounce2" />
                          <span className="bounce3" />
                        </span>
                        <span className="label">
                          <IntlMessages id="Connexion" />
                        </span>
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik> */}
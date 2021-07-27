import React, { Component } from "react";
import { Row, Card, CardTitle, Form, Label, Input, Button, FormGroup } from "reactstrap";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../redux/actions";
import { Formik, Field } from "formik";

import IntlMessages from "../../helpers/IntlMessages";
import { Colxx } from "../../components/common/CustomBootstrap";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nom: "",
      nomcomplet: [],
      email: "",
      mdp: "",
      mdp2: ""
      // email: "demo@gogo.com",
      // mdp: "gogo123",
      // mdp2: "gogo123",
    };
  }
  onUserRegister() {
    if (this.state.email !== "" && this.state.password !== "") {
      this.props.history.push("/");
    }
  }
  // onUserRegister = values => {
  //   if (!this.props.loading) {
  //     if (values.email !== "" && values.password !== "") {
  //       this.props.loginUser(values, this.props.history);
  //     }
  //   }
  // };
  validateNom = value => {
    let error;
    let nomc = value.trim().split(' ')
    if (!value) {
      error = "Champ obligatoire";
    } else if (nomc.length < 2) {
      error = "Veuillez saisir votre nom complet s'il vous plait";
    }
    else {
      this.setState({ nomc })
      return;
    }
    return error;
  };
  validateEmail = value => {
    let error;
    if (!value) {
      error = "Veuillez saisir votre adresse e-mail s'il vous plait";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = "Adresse email invalide";
    }
    return error;
  };

  validatePassword = value => {
    let error;
    if (!value) {
      error = "Veuillez saisir votre mot de passe s'il vous plait";
    } else if (value.length < 5) {
      error = "La valeur doit être supérieure à 4 caractères";
    }
    else {
      this.setState({ mdp: value })
      return;
    }
    return error;
  };
  validatePassword2 = value => {
    let error;
    if (!value) {
      error = "Veuillez retapez votre mot de passe s'il vous plait";
    } else if (value != this.state.mdp) {
      error = "Veuillez confirmer votre mot de passe s'il vous plait";
    }
    else {
      this.setState({ mdp2: value })
    }
    return error;
  };


  render() {
    const { email, mdp, mdp2, nom } = this.state;
    const initialValues = { nom, email, mdp, mdp2 };


    return (
      <Row className="h-100">
        <Colxx xxs="12" md="10" className="mx-auto my-auto">
          <Card className="auth-card">
            <div className="position-relative image-side ">
              <p className="text-white h2">Onyx</p>
              <br />

              <p className="white mb-0">
                Veuillez utiliser ce formulaire pour vous inscrire. <br />
                Si vous êtes membre, connectez-vous s'il vous plait ,{" "}
                <NavLink to={`/user/login`} className="white">
                  s'identifier
                </NavLink>
                .
              </p>
            </div>
            <div className="form-side">
              {/* <NavLink to={`/`} className="white">
                <span className="logo-single" />
              </NavLink> */}
              <CardTitle className="mb-4">
                <IntlMessages id="INSCRIPTION" />
              </CardTitle>
              <Formik initialValues={initialValues} onSubmit={this.onUserLogin}>
                {({ errors, touched }) => (
                  <Form>
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="Nom complet" />
                      </Label>
                      <Field
                        className="form-control"
                        name="nom"
                        validate={this.validateNom}
                      />

                      {errors.nom && touched.nom && (
                        <div className="invalid-feedback d-block">
                          {errors.nom}
                        </div>
                      )}
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
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="Confirmer le mot de passe" />
                      </Label>
                      <Field
                        className="form-control"
                        type="password"
                        name="password2"
                        validate={this.validatePassword2}
                      />
                      {errors.password2 && touched.password2 && (
                        <div className="invalid-feedback d-block">
                          {errors.password2}
                        </div>
                      )}
                    </FormGroup>
                    <div className="d-flex justify-content-end align-items-center">
                      <Button
                        color="primary"
                        className="btn-shadow"
                        size="lg"
                        onClick={() => this.onUserRegister()}
                      >
                        <IntlMessages id="Inscription" />
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </Card>
        </Colxx>
      </Row>
    );
  }
}
const mapStateToProps = ({ authUser }) => {
  const { user, loading } = authUser;
  return { user, loading };
};

export default connect(
  mapStateToProps,
  {
    registerUser
  }
)(Register);

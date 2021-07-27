import React, { Component } from "react";
import { Row, Card, CardTitle, Label, FormGroup, Button } from "reactstrap";
import { NavLink } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import {
  AvForm,
  AvField,
  AvGroup,
  AvInput,
  AvFeedback,
  AvRadioGroup,
  AvRadio,
  AvCheckboxGroup,
  AvCheckbox
} from "availity-reactstrap-validation";
import { Colxx } from "../../components/common/CustomBootstrap";
import IntlMessages from "../../helpers/IntlMessages";
import { forgotPassword } from "../../redux/actions";
import { NotificationManager } from "../../components/common/react-notifications";
import { connect } from "react-redux";
import Select from "react-select";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    // console.log(props.match)
    this.state = {
      valueType: { label: "Tuteur", value: "tuteur" },

    };
  }


  onForgotPassword = (event, errors, values) => {
    if (!this.props.loading) {
      if (errors.length === 0) {
        values = {
          ...values,
          type: this.state.valueType.value
        }
        this.props.forgotPassword(values, this.props.history);
      }
    }
  }
  handleChangeType = value => {
    this.setState({
      valueType: value
    });
  }
  componentDidMount() {
    if (
      localStorage.getItem('user_id') &&
      localStorage.getItem('accueil')
    ) {
      return this.props.history.push(localStorage.getItem('accueil'));
    }
  }


  // componentDidUpdate() {
  //   if (this.props.error) {
  //     NotificationManager.warning(
  //       this.props.error,
  //       "Forgot Password Error",
  //       3000,
  //       null,
  //       null,
  //       ''
  //     );
  //   } else {
  //     if (!this.props.loading && this.props.forgotUserMail === "success")
  //       NotificationManager.success(
  //         "Please check your email.",
  //         "Forgot Password Success",
  //         3000,
  //         null,
  //         null,
  //         ''
  //       );
  //   }

  // }



  render() {
    const types = [
      { label: "Tuteur", value: "tuteur" },
      { label: "Enseignant", value: "enseignant" },
      { label: "Administratif", value: "adminstrateur" },
    ];
    const defaultValues = {
      email: ""
    }
    return (
      <Row className="h-100">
        <Colxx xxs="12" md="10" className="mx-auto my-auto">
          <Card className="auth-card">
            <div className="position-relative image-side ">
              <br />

            </div>
            <div className="form-side">

              <CardTitle className="mb-4">
                <IntlMessages id="Mot de passe oublié ?" />
              </CardTitle>

              <AvForm
                onSubmit={this.onForgotPassword}
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

                <div className="d-flex justify-content-between align-items-center">
                  <NavLink to={`/user/login`}>
                    <IntlMessages id="user.login-title" />
                  </NavLink>
                  <Button
                    color="primary"
                    className={`btn-shadow btn-multiple-state ${this.props.loading ? "show-spinner" : ""}`}
                    size="lg"
                  >
                    <span className="spinner d-inline-block">
                      <span className="bounce1" />
                      <span className="bounce2" />
                      <span className="bounce3" />
                    </span>
                    <span className="label"><IntlMessages id="Réinitialiser" /></span>
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
  const { forgotUserMail, loading, error } = authUser;
  return { forgotUserMail, loading, error };
};

export default connect(
  mapStateToProps,
  {
    forgotPassword
  }
)(ForgotPassword);


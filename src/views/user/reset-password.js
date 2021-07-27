import React, { Component } from "react";
import { Row, Card, CardTitle, Label, FormGroup, Button } from "reactstrap";
import { NavLink } from "react-router-dom";
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
import axios from "axios"
import { Colxx } from "../../components/common/CustomBootstrap";
import IntlMessages from "../../helpers/IntlMessages";
import { resetPassword } from "../../redux/actions";
import { NotificationManager } from "../../components/common/react-notifications";
import { connect } from "react-redux";

class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    onResetPassword = (event, errors, values) => {
        // alert(this.props.match.params.type)
        if (!this.props.loading) {
            if (errors.length === 0 && (values.newPassword.localeCompare(values.newPasswordAgain) === 0)) {
                this.props.resetPassword({
                    newPassword: values.newPassword,
                    history: this.props.history,
                    type: this.props.match.params.type,
                    token: this.props.match.params.token
                });
            }
            else {
                NotificationManager.warning(
                    "Erreur de Réinitialisation mot de passe",
                    "MOT DE PASSE",
                    3000,
                    null,
                    null,
                );
            }

        }

    }
    componentDidMount() {


        let re_url = "http://api.onyx.inedit-gd.tn/" + this.props.match.params.type + "/auth/check_reset/" + this.props.match.params.token;
        axios({
            method: 'get',
            url: re_url,
        })
            .then(res => {
            },
                error => {

                    return this.props.history.push('/user/login');
                }

            )
    }


    render() {
        const defaultValues = {
            newPassword: "",
            newPasswordAgain: ""
        };

        return (
            <Row className="h-100">
                <Colxx xxs="12" md="10" className="mx-auto my-auto">
                    <Card className="auth-card">
                        <div className="position-relative image-side ">
                            {/* <p className="text-white h2">ONYX</p> */}
                        </div>
                        <div className="form-side">

                            <CardTitle className="mb-4">
                                <IntlMessages id="Réinitialiser le mot de passe" />
                            </CardTitle>
                            <AvForm
                                onSubmit={this.onResetPassword}
                                model={defaultValues}
                                className="av-tooltip tooltip-right-bottom"
                            >

                                <AvGroup className="error-t-negative">
                                    <Label for="newPassword">Nouveau mot de passe</Label>
                                    <AvField
                                        name="newPassword"
                                        type='password'
                                        validate={{
                                            required: {
                                                value: true,
                                                errorMessage: "Veuillez saisir le nouveau mot de passe"
                                            },
                                            minLength: {
                                                value: 5,
                                                errorMessage:
                                                    "5 caractéres minimum !"
                                            },
                                            maxLength: {
                                                value: 10,
                                                errorMessage:
                                                    "10 caractéres maximum !"
                                            },

                                        }}
                                    />



                                </AvGroup>



                                <AvGroup className="error-t-negative">
                                    <Label for="newPasswordAgain">Confirmer le mot de passe</Label>
                                    <AvField
                                        name="newPasswordAgain"
                                        type='password'
                                        validate={{
                                            required: {
                                                value: true,
                                                errorMessage: "Veuillez confirmer le mot de passe"
                                            },
                                            minLength: {
                                                value: 5,
                                                errorMessage:
                                                    "5 caractéres minimum !"
                                            },
                                            maxLength: {
                                                value: 10,
                                                errorMessage:
                                                    "10 caractéres maximum !"
                                            },

                                        }}
                                    />

                                </AvGroup>

                                <div className="d-flex justify-content-between align-items-center">

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
    const { newPassword, resetPasswordCode, loading, error } = authUser;
    return { newPassword, resetPasswordCode, loading, error };
};

export default connect(
    mapStateToProps,
    {
        resetPassword
    }
)(ResetPassword);

{/* <Formik
validate={this.validateNewPassword}
initialValues={initialValues}
onSubmit={this.onResetPassword}>
{({ errors, touched }) => (
    <Form className="av-tooltip tooltip-label-bottom">
        <FormGroup className="form-group has-float-label">
            <Label>
                <IntlMessages id="user.new-password" />
            </Label>
            <Field
                className="form-control"
                name="newPassword"
                type="password"
            />
        </FormGroup>
        <FormGroup className="form-group has-float-label">
            <Label>
                <IntlMessages id="user.new-password-again" />
            </Label>
            <Field
                className="form-control"
                name="newPasswordAgain"
                type="password"
            />
            {errors.newPasswordAgain && touched.newPasswordAgain && (
                <div className="invalid-feedback d-block">
                    {errors.newPasswordAgain}
                </div>
            )}
        </FormGroup>

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
                <span className="label"><IntlMessages id="user.reset-password-button" /></span>
            </Button>
        </div>
    </Form>
)}
</Formik> */}

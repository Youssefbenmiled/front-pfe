import React, { Component, Fragment } from "react";
import {
    CustomInput,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Table,
    Label,
    Card,
    Input
} from "reactstrap";
import axios from "axios";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { Colxx } from "../../../components/common/CustomBootstrap";
import {
    AvForm,
    AvField,
    AvGroup,
} from "availity-reactstrap-validation";
import SingleLightbox from "../../../components/pages/SingleLightbox";
import {

    logoutUser,

} from "../../../redux/actions";
class Modalvoir extends Component {
    constructor(props) {
        super(props);
        this.state = {
            changer: false,
            afficher: false
        };
    }
    fnClick = () => {
        this.setState({ changer: true })
    }

    hideSwitch = () => {
        this.setState({ afficher: !this.state.afficher })
    }

    componentWillReceiveProps() {
        this.setState({
            changer: false
        })
    }
    handleSubmit = (event, errors, values) => {
        event.preventDefault();
        // this.verif();
        if (!localStorage.getItem('user_id'))
            return this.props.handleLogout();



    }
    verif() {
        try {
            axios
                .get("http://api.onyx.inedit-gd.tn/admins/get/" + parseInt(localStorage.getItem('user_id')))
                .then(res => res.data)
                .then(data => {



                    if (data.statut === "inactif" || data.firstlogin === 0)
                        return this.handleLogout();



                    if (localStorage.getItem('accueil') && localStorage.getItem('accueil').localeCompare('/ecole/accueil') != 0)
                        return this.handleLogout();


                    if (parseInt(data.id) != parseInt(localStorage.getItem('user_id')))
                        return this.handleLogout();

                }, error => {
                    return this.handleLogout();

                })
        } catch (error) {
            return this.handleLogout();

        }
    }


    render() {
        const { afficher } = this.state
        const { modalOpenParam, toggleModalParam, src, ens } = this.props;
        let defaultValues = {
            email: "",
            mdp: "",
            nmdp: "",
            adresse: "",
            tel: "",
        };
        return (
            <Modal
                isOpen={modalOpenParam}
                toggle={toggleModalParam}
                size="lg"
                wrapClassName="modal-left"
                backdrop="static"
            >
                <ModalHeader toggle={toggleModalParam}></ModalHeader>
                <ModalBody>
                    <Colxx xxs="12" className="mb-3">

                        <AvForm
                            onSubmit={this.handleSubmit}
                            model={defaultValues}
                            className="av-tooltip tooltip-right-bottom"
                        >
                            <Card className="mb-4">
                                <div className="position-absolute card-top-buttons">
                                    <label class="icon-button btn btn-outline-white">
                                        <input type="file" accept='image/*' class="d-none" />
                                        <i class="simple-icon-pencil" ></i>
                                    </label>
                                </div>
                                <SingleLightbox
                                    thumb={src}
                                    large={src}
                                    className="card-img-top"

                                />
                            </Card>
                            <br></br>
                            <br></br>
                            {/* <AvGroup className="error-t-negative">
                                <Label for="nomc">Nom d'utilisateur :</Label>
                                <AvField
                                    name="nomc"
                                    id="nomc"
                                    required
                                    validate={{
                                        required: {
                                            value: true,
                                            errorMessage: "Veuillez saisir le nom complet"
                                        },
                                        pattern: {
                                            value: "^[A-Za-z ]+$",
                                            errorMessage: "le nom complet doit être composé uniquement de lettres"
                                        },
                                        minLength: {
                                            value: 5,
                                            errorMessage:
                                                "5 caractéres minimum !"
                                        },

                                    }} />
                            </AvGroup> */}
                            {/* <AvGroup className="error-t-negative">
                                <Label for="adresse">Adresse :</Label>
                                <AvField
                                    name="adresse"
                                    id="adresse"
                                    validate={{
                                        required: {
                                            value: true,
                                            errorMessage: "Veuillez saisir l'adresse"
                                        },

                                    }}
                                />
                            </AvGroup>
                            <AvGroup className="error-t-negative">
                                <Label for="tel">N° Téléphone :</Label>
                                <AvField
                                    name="tel"
                                    type="number"
                                    validate={{
                                        required: {
                                            value: true,
                                            errorMessage: "Veuillez saisir le N° de téléphone"
                                        },
                                        pattern: {
                                            value: "^[0-9]+$",
                                            errorMessage: "le N° de Téléphone doit être composé de 8 chiffres"
                                        },
                                        minLength: {
                                            value: 8,
                                            errorMessage: "le N° de Téléphone doit être composé de 8 chiffres"
                                        },
                                        maxLength: {
                                            value: 8,
                                            errorMessage: "le N° de Téléphone doit être composé de 8 chiffres"
                                        },
                                    }}
                                />
                            </AvGroup> */}




                            {!this.state.changer &&
                                <h4 className="w-50 w-sm-100 m-0 text-left">
                                    <NavLink
                                        to="#"
                                        location={{}}
                                        onClick={this.fnClick}
                                    >
                                        Changer le mot de passe ?
                                    </NavLink>

                                </h4>
                            }

                            {this.state.changer &&
                                <>
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
                                        <Label for="mdp">Mot de passe actuel :</Label>
                                        <AvField
                                            name="mdp"
                                            type={afficher ? 'text' : 'password'}
                                            validate={{
                                                required: {
                                                    value: true,
                                                    errorMessage: "Veuillez saisir le mot de passe actuel"
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
                                        <Label for="nmdp">Nouveau mot de passe :</Label>
                                        <AvField
                                            name="nmdp"
                                            type={afficher ? 'text' : 'password'}
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
                                    <CustomInput
                                        type="checkbox"
                                        id="exCustomCheckbox"
                                        label="Afficher les caractéres"
                                        checked={afficher}
                                        onChange={this.hideSwitch}
                                    />
                                </>
                            }



                            <br></br>
                            <br></br>
                            <Button
                                type="submit"
                                color="success"
                                id="modifier">
                                Enregistrer
                            </Button>
                            <Button
                                color="dark"
                                outline
                                onClick={toggleModalParam}
                                id="annuler">
                                Annuler
                            </Button>

                        </AvForm>

                    </Colxx>


                </ModalBody>

            </Modal>
        );
    }
}
const mapStateToProps = ({ menu }) => {
    const { containerClassnames } = menu;
    return { containerClassnames };
};

export default withRouter(connect(mapStateToProps, { logoutUser })(Modalvoir));



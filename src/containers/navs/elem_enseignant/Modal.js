import React, { Component, Fragment } from "react";
import {
    CustomInput,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Table,
    Label,
    Input,
    Card
} from "reactstrap";
import { NavLink } from "react-router-dom";
import { Colxx } from "../../../components/common/CustomBootstrap";
import moment from "moment";
// import './Modal.css';
import SingleLightbox from "../../../components/pages/SingleLightbox";
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
class Modalvoir extends Component {
    constructor(props) {
        super(props);
        this.state = {
            changer: false,
            img: undefined,
            afficher: false,

        };
    }
    fnClick = () => {
        this.setState({ changer: true })
    }
    componentWillReceiveProps() {
        this.setState({
            changer: false
        })
    }
    uploadimg = (event) => {
        let img = event.target.files[0]
        this.setState({ img })

    }
    hideSwitch = () => {
        this.setState({ afficher: !this.state.afficher })
    }
    handleSubmit = (event, errors, values) => {
        event.preventDefault();
        if (!localStorage.getItem('user_id'))
            return this.props.handleLogout();

    }


    render() {
        const { afficher } = this.state
        const { modalOpenParam, toggleModalParam, src, data } = this.props;
        let defaultValues = {
            email: "",
            mdp: "",
            nmdp: "",
            adresse: data.adresse,
            tel: data.numTel && data.numTel.toString(),
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

                            <AvGroup className="error-t-negative">
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
                                    type="text"
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
                            </AvGroup>




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

                            <div className="row">
                                <div className="col-12 col-md-6 mt-3">
                                    <Button className="w-100" color="success" type="submit">
                                        Enregistrer
                </Button>
                                </div>
                                <div className="col-12 col-md-6 mt-3">
                                    <Button className="w-100"
                                        color="danger"
                                        onClick={toggleModalParam}>
                                        Annuler
                 </Button>
                                </div>

                            </div>


                        </AvForm>

                    </Colxx>


                </ModalBody>

            </Modal >
        );
    }
}
export default Modalvoir;



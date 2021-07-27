import React, { Component, Fragment } from "react";
import {
  CustomInput,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
  FormGroup
} from "reactstrap";
import Select from "react-select";
import CustomSelectInput from "../../../components/common/CustomSelectInput";
import IntlMessages from "../../../helpers/IntlMessages";
// import "./add.css"
import { Separator } from "../../../components/common/CustomBootstrap";
import axios from "axios"
import { roles } from "../../../constants/defaultValues"
import { NotificationManager } from "../../../components/common/react-notifications";
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


class AddNewModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueRole: [],
      valueType: null,
      isSubmited: false,
      date: new Date().getDate() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getUTCFullYear(),
    };
  }

  handleChangeRoles = (value) => {
    this.setState({ valueRole: value, isSubmited: false })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isSubmited: false,
      valueRole: [],

    })
  }


  handleChangeType = value => {
    this.setState({
      valueType: value
    });
  }

  handleSubmit = (event, errors, values) => {
    event.preventDefault();


    if (!localStorage.getItem('user_id'))
      return this.props.handleLogout();



    const { nomc, email } = values
    const { valueRole, date } = this.state
    this.setState({
      isSubmited: true
    })
    if (errors.length === 0 && valueRole.length > 0) {
      NotificationManager.primary(
        "Requête en cours",
        "ADMINISTRATEUR",
        1000,
        null,
        null,
      );

      try {
        let ch = ""
        {
          valueRole.map((role, i) => {
            ch = ch.concat(role.label + " ")
          })
        }
        if (valueRole.length === 5) {
          ch = ch.concat("ROLE_GESTION_ADMINISTRATEUR")

        }

        let data = {
          nom_prenom: nomc.trim(),
          email: email.toString(),
          dateCreation: date,
          statut: "actif",
          roles: ch,
        }
        this.props.toggleModal();

        axios({
          method: 'post',
          url: 'http://api.onyx.inedit-gd.tn/admins/add',
          data: data,
        })
          .then(res => {
            NotificationManager.success(
              "Ajout avec succés",
              "ADMINISTRATEUR",
              3000,
              null,
              null,
            );
            return this.props.callback();
          },
            error => {
              NotificationManager.warning(
                "Vérifier email administrateur",
                "ADMINISTRATEUR",
                5000,
                null,
                null,
              );
              return error;
            }

          )

      } catch (error) {
        return error;

      }
    };
  }



  render() {

    const { modalOpen, toggleModal, } = this.props;


    const defaultValues = {
      nomc: "",
      email: "",
      roles: [],
      statut: "",

    };


    return (


      <Modal
        isOpen={modalOpen}
        toggle={toggleModal}
        wrapClassName="modal-left"
        backdrop="static"
      >

        <ModalHeader toggle={toggleModal}>


        </ModalHeader>
        <ModalBody>

          <AvForm
            onSubmit={this.handleSubmit}
            model={defaultValues}
            className="av-tooltip tooltip-right-bottom"
          >



            <AvGroup className="error-t-negative">
              <Label for="nomc">Nom complet :</Label>
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


            </AvGroup>

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
            <Label>Rôle(s) :</Label>

            <div className="error-t-negative position-relative">
              <Select
                onChange={this.handleChangeRoles}
                value={this.state.valueRole}
                options={roles}
                className="react-select position-relative"
                placeholder="Sélectionner un rôle..."
                classNamePrefix="react-select"
                name="form-field-name"
                required
                isMulti
              />
              {this.state.valueRole.length === 0 && this.state.isSubmited &&
                <>
                  <div className="av-invalid is-invalid form-control d-none"></div>
                  <div class="invalid-feedback">Veuillez saisir au moins un rôle</div>
                </>
              }
            </div>
            <br></br>
            {this.state.valueRole.length === 5 &&
              <h2>C'est un super administrateur</h2>}

            <div className="row">
              <div className="col-12 col-md-6 mt-3">
                <Button className="w-100" color="secondary" type="submit">
                  Confirmer
                </Button>
              </div>
              <div className="col-12 col-md-6 mt-3">
                <Button className="w-100"
                  color="danger"
                  onClick={toggleModal}>
                  Annuler
                 </Button>
              </div>

            </div>


          </AvForm>



        </ModalBody>


      </Modal>


    );

  }
}

export default AddNewModal;

import React, { Component } from "react";
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
import axios from "axios"
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
import Select from "react-select";
import CustomSelectInput from "../../../components/common/CustomSelectInput";
import IntlMessages from "../../../helpers/IntlMessages";
// import "./update.css"
import { Separator } from "../../../components/common/CustomBootstrap";

class UpdateModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueRole: "",
      selectedRoles: [],
      isSubmited: false,
      statut: null
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.admin && nextProps.admin.roles) {
      // console.log(nextProps.admin.roles.split(' '))
      this.setState({
        nomc: "",
        isSubmited: false,
        statut: { label: nextProps.admin.statut, value: nextProps.admin.statut },
        valueRole: nextProps.admin.roles.trim().split(' ').filter(x => x.localeCompare('ROLE_GESTION_ADMINISTRATEUR') != 0).map(x =>
          ({ label: x, value: x }))

      })
    }

  }

  annuler = () => {

    this.props.toggleModal();
    this.props.setST([])

  }
  handleChangeRoles = (value) => {
    this.setState({ valueRole: value })
  }



  handleSubmit = (event, errors, values) => {
    event.preventDefault();
    this.setState({ isSubmited: true })

    const { valueRole, statut } = this.state;
    const { admin } = this.props;

    const { nomc, email, } = values;
    let ch = ""
    {
      valueRole.map((role) => {
        ch = ch.concat(role.value + " ")
      })
    }
    if (valueRole.length === 5) {
      ch = ch.concat("ROLE_GESTION_ADMINISTRATEUR")

    }

    if (
      nomc.localeCompare(admin.nomPrenom) == 0 &&
      email.localeCompare(admin.email) == 0 &&
      statut.value.localeCompare(admin.statut) == 0 &&
      ch.trim().localeCompare(admin.roles.trim()) == 0
    ) {
      NotificationManager.warning(
        "Aucune modification n'a été effectuée",
        "ADMINISTRATEUR",
        5000,
        null,
        null,
      );
      return;
    }
    if (errors.length === 0 && valueRole.length > 0) {
      NotificationManager.primary(
        "Requête en cours",
        "ADMINISTRATEUR",
        1000,
        null,
        null,
      );


      const data = {
        id: this.props.admin.id,
        nomPrenom: nomc.trim(),
        email: email,
        statut: statut.value,
        roles: ch,
      }
      this.props.toggleModal();
      try {
        axios
          .put(
            "http://api.onyx.inedit-gd.tn/admins/update", data)
          .then(res => {


            this.props.callback();
            // localStorage.setItem('user_role', ch);



            NotificationManager.success(
              "Modification effectueé",
              "ADMINISTRATEUR",
              3000,
              null,
              null,
            );

          }, error => {
            console.log(error)
            NotificationManager.warning(
              "Email existant",
              "ADMINISTRATEUR",
              5000,
              null,
              null,
            );
          })

      }
      catch (error) {

        console.log("failed" + error);

      }


    }
  }

  handleChangeStat = (value) => {
    this.setState({ statut: value })
  }


  render() {
    const {
      modalOpen,
      toggleModal,
      roles,
      admin
    } = this.props;

    const stats = [
      { label: "actif", value: "actif" },
      { label: "inactif", value: "inactif" }
    ];

    const defaultValues = {
      id: admin.id,
      nomc: admin.nomPrenom,
      email: admin.email,

    };






    return (
      <Modal
        isOpen={modalOpen}
        toggle={toggleModal}
        wrapClassName="modal-left"
        backdrop="static"
      >

        <ModalHeader toggle={toggleModal}></ModalHeader>



        <ModalBody>
          <AvForm
            onSubmit={this.handleSubmit}
            model={defaultValues}
            className="av-tooltip tooltip-right-bottom"
          >



            <AvGroup className="error-t-negative">
              <Label for="nomc">Nom complet :</Label>
              <AvField

                name="nomc" id="nomc" required
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


            <Label>
              Statut :
            </Label>
            <Select
              onChange={this.handleChangeStat}
              value={this.state.statut}
              options={stats}
              className="react-select position-relative"
              classNamePrefix="react-select"
              name="form-field-name"
              required
            />



            <br></br>
            <Label>
              Rôle(s) :
            </Label>
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
            <br></br>
            <Button
              type="submit"
              color="secondary"
              id="modifier">
              Modifier{" "}
            </Button>
            <Button
              color="danger"
              onClick={this.annuler}
              id="annuler">
              Annuler{" "}
            </Button>
          </AvForm>



        </ModalBody>


      </Modal>
    );
  }
}
export default UpdateModal;

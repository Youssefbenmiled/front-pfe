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
            this.setState({ valueRole: [] });
            this.props.callback();
          },
            error => {
              NotificationManager.warning(
                "Vérifier email administrateur",
                "ADMINISTRATEUR",
                5000,
                null,
                null,
              );
            }

          )

      } catch (error) {
        console.log("failed" + error);

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



            <Label for="nomc">Bonjour et bienvenue , Vouz venez de lancer la nouvelle Année scolaire 2020/2021 </Label>
            <br></br>


            <Button
              color="secondary"
              id="modifier">
              Confirmer {" "}
            </Button>


          </AvForm>



        </ModalBody>


      </Modal>


    );

  }
}

export default AddNewModal;

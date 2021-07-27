import React, { Component, Fragment } from "react";
import {
  CustomInput,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label
} from "reactstrap";
import axios from "axios"
import { NotificationManager } from "../../../components/common/react-notifications";
import Select from "react-select";
import CustomSelectInput from "../../../components/common/CustomSelectInput";
import IntlMessages from "../../../helpers/IntlMessages";
// import "./add.css"
import { Separator } from "../../../components/common/CustomBootstrap";
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
    };
  }
  handleSubmit = (event, errors, values) => {
    event.preventDefault();

    const { nomd } = values
    if (errors.length === 0) {
      NotificationManager.primary(
        "Requête en cours",
        "DOMAINE",
        500,
        null,
        null,
      );

      try {


        let data = {
          niveau: parseInt(this.props.niveau.value),
          nom: nomd.trim(),

        }
        this.props.toggleModal();

        axios({
          method: 'post',
          url: 'http://api.onyx.inedit-gd.tn/domaine/add',
          data: data,
        })
          .then(res => {
            NotificationManager.success(
              "Domaine ajouté avec succés",
              "DOMAINE",
              3000,
              null,
              null,
            );

            this.props.callback();

          },
            error => {
              console.log(error)
              NotificationManager.warning(
                "Domaine existe",
                "DOMAINE",
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


  handleChangeType = value => {
    this.setState({
      valueType: value
    });
  }

  render() {
    const { modalOpen, toggleModal, niveau } = this.props;

    const defaultValues = {
      nomd: "",
    };
    return (
      <Modal
        isOpen={modalOpen}
        toggle={toggleModal}
        wrapClassName="modal-left"
        backdrop="static"
      >
        <ModalHeader toggle={toggleModal}
        ></ModalHeader>


        <ModalBody>
          <center><h2>Ajout d'un domaine dans le niveau {niveau.label}</h2></center>
          <br></br>
          <AvForm
            onSubmit={this.handleSubmit}
            className="av-tooltip tooltip-label-right"
            model={defaultValues}>
            <AvGroup className="error-t-negative">
              <Label for="nomd">Domaine :</Label>
              <AvField name="nomd" id="nomd" required
                validate={{
                  required: {
                    value: true,
                    errorMessage: "Veuillez saisir le domaine"
                  },
                  // pattern: {
                  //   value: "^[A-Za-z ]+$",
                  //   errorMessage: "Votre domaine doit être composé uniquement de lettres"
                  // },


                }}
              />
            </AvGroup>
            <br></br>
            <br></br>
            <Button
              color="secondary"
              id="modifier">
              Ajouter
            </Button>
            <Button
              color="danger"
              onClick={toggleModal}
              id="annuler">
              Annuler
            </Button>
          </AvForm>





        </ModalBody>


      </Modal>
    );
  }
}


export default AddNewModal;

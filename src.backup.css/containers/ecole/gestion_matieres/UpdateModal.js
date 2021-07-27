import React, { Component } from "react";
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
import { levels } from "../../../constants/defaultValues";
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
// import "./update.css"
class UpdateModal extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }



  handleSubmit = (event, errors, values) => {
    event.preventDefault();

    const { nomat, coef } = values
    const { mat, domaine } = this.props

    if (
      mat.nom.localeCompare(nomat) == 0 &&
      mat.coeficient.toString().localeCompare(coef) == 0
    ) {
      NotificationManager.warning(
        "Aucune modification n'a été effectuée",
        "MATIERE",
        5000,
        null,
        null,
      );
      return;
    }

    if (errors.length === 0) {
      NotificationManager.primary(
        "Requête en cours",
        "MATIERE",
        500,
        null,
        null,
      );

      try {


        const data =
        {
          id: mat.id,
          nom: nomat.trim(),
          coeficient: parseFloat(coef),
          domaine: domaine.value
        }
        this.props.toggleModal();

        axios
          .put(
            "http://api.onyx.inedit-gd.tn/matiere/update", data)

          .then(res => {
            NotificationManager.success(
              "Modification effectuée",
              "MATIERE",
              3000,
              null,
              null,
            );

           return this.props.callback();

          },
            error => {
              NotificationManager.warning(
                "Erreur de modification",
                "MATIERE",
                5000,
                null,
                null,
              );
              return error;
            }

          )


      } catch (error) {
        console.log("failed" + error);

      }

    };
  }



  annuler = () => {

    this.props.toggleModal();
    this.props.setST()

  }



  render() {


    const {
      modalOpen,
      toggleModal,
      mat
    } = this.props;

    const defaultValues = {

      id: mat.id,
      nomat: mat.nom,
      coef: mat.coeficient,
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
          <center>
            <h1>Mise à jour d'une matiére</h1>
          </center>
          <AvForm
            onSubmit={this.handleSubmit}
            className="av-tooltip tooltip-label-right"
            model={defaultValues}>
            <br></br>


            <AvGroup className="error-t-negative">
              <Label for="nomd">Matiére :</Label>
              <AvField name="nomat" id="nomat" required
                validate={{
                  required: {
                    value: true,
                    errorMessage: "Veuillez saisir la matiére"
                  },
                  // pattern: {
                  //   value: "^[çA-Za-z_ ]+$",
                  //   errorMessage: "Matiére est composée seulement de lettres !"
                  // },


                }}
              />
            </AvGroup>
            <AvGroup className="error-t-negative">
              <Label for="coef">coefficient :</Label>
              <AvField name="coef" id="coef" type="number" min="0.1" step="0.1" required
                validate={{
                  required: {
                    value: true,
                    errorMessage: "Veuillez saisir le coefficient de la matiére"
                  },
                  pattern: {
                    value: "^[0-9.,]+$",
                    errorMessage: "Le coefficient doit être composé uniquement des chiffres"
                  },

                }}
              />
            </AvGroup>

            <br></br>
            <br></br>

            <Button
              color="secondary"
              id="modifier">
              Modifier
            </Button>
            <Button
              color="danger"
              onClick={this.annuler}
              id="annuler">
              Annuler
            </Button>
          </AvForm>
        </ModalBody>

      </Modal>
    );
  }
}
export default UpdateModal;


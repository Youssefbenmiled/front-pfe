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
import axios from "axios";
import { NotificationManager } from "../../../components/common/react-notifications";
import {
  AvForm,
  AvField,
  AvGroup,
} from "availity-reactstrap-validation";

class UpdateModal extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  annuler = () => {

    this.props.toggleModal();
    this.props.setST()

  }


  handleSubmit = (event, errors, values) => {
    event.preventDefault();
    if (!localStorage.getItem('user_id'))
      return this.props.handleLogout();
    const { nomd } = values
    const { domaine } = this.props
    if (domaine.nom.localeCompare(nomd) == 0) {
      NotificationManager.warning(
        "Aucune modification n'a été effectuée",
        "DOMAINE",
        5000,
        null,
        null,
      );

      return;
    }

    if (errors.length === 0) {
      NotificationManager.primary(
        "Requête en cours",
        "DOMAINE",
        500,
        null,
        null,
      );

      try {


        const data = {
          id: domaine.id,
          niveau: domaine.niveau.toString(),
          nom: nomd.trim(),

        }
        this.props.toggleModal();

        axios
          .put(
            "http://api.onyx.inedit-gd.tn/domaine/update", data)

          .then(res => {
            NotificationManager.success(
              "Domaine modifié avec succés",
              "DOMAINE",
              3000,
              null,
              null,
            );

            return this.props.callback();

          },
            error => {
              NotificationManager.warning(
                "Domaine existe",
                "DOMAINE",
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
    const {
      domaine,
      modalOpen,
      toggleModal,


    } = this.props;

    const defaultValues = {
      // niveau: domaine.niveau,
      nomd: domaine.nom,
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
        <br></br>
        <br></br>
        <center>
          <h2>Mise à jour d'un domaine</h2>
        </center>

        <ModalBody>
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
                  //   value: "^[çA-Za-z ]+$",
                  //   errorMessage: "Le domaine doit être composé uniquement de lettres"
                  // },

                }}
              />
            </AvGroup>

            <br></br>
            <br></br>
            <div className="row">
              <div className="col-12 col-md-6 mt-3">
                <Button className="w-100" color="secondary" type="submit">
                  Confirmer
                </Button>
              </div>
              <div className="col-12 col-md-6 mt-3">
                <Button className="w-100"
                  color="danger"
                  onClick={this.annuler}>
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
export default UpdateModal;


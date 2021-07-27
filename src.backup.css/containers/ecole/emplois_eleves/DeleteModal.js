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
// import "./delete.css"
class DeleteModal extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }


  handleSubmit = event => {
    event.preventDefault();
    NotificationManager.primary(
      "Requête en cours",
      "EMPLOI " + this.props.items[0].niveau + "" + this.props.items[0].NomClasse,
      500,
      null,
      null,
    );
    try {
      axios
        .delete("http://api.onyx.inedit-gd.tn/emlpoi/delete/" + parseInt(this.props.items[0].id))
        .then(res => {
          NotificationManager.success(
            "Supression effectuée",
            "EMPLOI " + this.props.items[0].niveau + "" + this.props.items[0].NomClasse,
            3000,
            null,
            null,
          );

          return this.props.callback();
        })
        .then(data => {
        }, error => {
          NotificationManager.error(
            "Erreur de suppression",
            "EMPLOI " + this.props.items[0].niveau + "" + this.props.items[0].NomClasse,
            5000,
            null,
            null,

          );
          return error;
        });

    }
    catch (error) {
      console.log("failed" + error);
    }
  }


  render() {
    const {
      modalOpen,
      toggleModal,
      niveau,
      classe,
      items
    } = this.props;


    return (

      <Modal
        isOpen={modalOpen}
        toggle={toggleModal}
        wrapClassName="modal-left"
        backdrop="static"
      >
        <ModalBody>
          {classe &&
            <center>
              <h2>Êtes-vous sûr de vouloir supprimer l'emploi de {niveau + " " + classe.label} ?</h2>

            </center>

          }
          <br></br>
          <form onSubmit={this.handleSubmit}>


            <Button
              color="secondary"
              type="submit"
              id="ajouter"
              onClick={toggleModal}

            >
              Supprimer
            </Button>
            <Button
              color="danger"
              onClick={toggleModal}
              id="annuler"
            >
              Annuler
            </Button>
          </form>
        </ModalBody>
      </Modal>

    );
  }
}
export default DeleteModal;

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
import IntlMessages from "../../../helpers/IntlMessages";
// import "./delete.css"

import axios from "axios"
import { NotificationManager } from "../../../components/common/react-notifications";
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
      "CALENDRIER DES EXAMENS",
      500,
      null,
      null,
    );
    for (var i = 0; i < this.props.selectedItems.length; i++) {

      try {
        axios
          .delete("http://api.onyx.inedit-gd.tn/exam/delete/" + this.props.selectedItems[i])
          .then(res => {
            console.log(res)
            this.props.callback();
            NotificationManager.success(
              "Supression effectuée avec succés",
              "CALENDRIER DES EXAMENS",
              3000,
              null,
              null,
            );

            return res.data;
          })
          .then(data => {
          }, error => {

            NotificationManager.error(
              "Erreur de suppression",
              "CALENDRIER DES EXAMENS",
              3000,
              null,
              null,

            );
          });

      }
      catch (error) {
        console.log("failed" + error);
      }
    }
  }

  render() {
    const {
      modalOpen,
      toggleModal,
      classe,
      selectedItems
    } = this.props;



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

          {
            selectedItems.length == 1 ?
              <h2>
                Suppression calendrier des examens de la classe {classe && classe.label}
              </h2>
              :
              <h2>
                Suppression des calendriers des examens de la classe {classe && classe.label}
              </h2>
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

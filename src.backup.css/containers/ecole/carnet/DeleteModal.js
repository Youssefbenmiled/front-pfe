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

    this.state = {};
  }


  handleSubmit = event => {
    event.preventDefault();
    NotificationManager.primary(
      "Requête en cours",
      "EMPLOI ENSEIGNANT",
      500,
      null,
      null,
    );

    for (var i = 0; i < this.props.selectedItems.length; i++) {
      try {
        axios
          .delete(
            "http://api.onyx.inedit-gd.tn/note/delete/" + this.props.selectedItems[i])
          .then(res => {
            this.props.callback();

            NotificationManager.success(
              "SUPPRESSION EFFECTUEE",
              "CARNET",
              3000,
              null,
              null,
            );

            return res.data;
          })
          .then(data => {
          }, error => {
            NotificationManager.warning(
              "ERREUR DE SUPPRESSION",
              "CARNET",
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
      eleve,
      selectedItems
    } = this.props;
    return (
      <>
        {eleve &&
          <Modal
            isOpen={modalOpen}
            toggle={toggleModal}
            wrapClassName="modal-left"
            backdrop="static"
          >
            <ModalHeader toggle={toggleModal}></ModalHeader>
            <br></br>
            <br></br>

            <center>
              {selectedItems.length == 1 ?
                <h1>
                  Suppression de carnet de {eleve.label}
                </h1>
                :
                <h1>
                  Suppression des carnets de {eleve.label}
                </h1>
              }
            </center>
            <ModalBody>

              <form onSubmit={this.handleSubmit}>
                <Button type="submit" color="secondary" id="modifier" onClick={toggleModal}>
                  Supprimer
                </Button>

                <Button color="danger" onClick={toggleModal} id="annuler">
                  Annuler
                </Button>
              </form>


            </ModalBody>


          </Modal>
        }
      </>


    );
  }
}
export default DeleteModal;

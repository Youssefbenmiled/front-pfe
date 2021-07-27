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
class DeleteModal extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }


  handleSubmit = event => {
    event.preventDefault();
    if (!localStorage.getItem('user_id'))
      return this.props.handleLogout();

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


            NotificationManager.success(
              "Supression effectuée avec succés",
              "CALENDRIER DES EXAMENS",
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
              "CALENDRIER DES EXAMENS",
              3000,
              null,
              null,

            );
          });

      }
      catch (error) {
        return error;
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
                Suppression des {selectedItems.length} calendriers des examens de la classe {classe && classe.label}
              </h2>
          }

          <br></br>
          <form onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col-12 col-md-6 mt-3">
                <Button className="w-100" color="secondary" type="submit" onClick={toggleModal}>
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


          </form>
        </ModalBody>

      </Modal>

    );
  }
}
export default DeleteModal;

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



import axios from "axios"
import { NotificationManager } from "../../../components/common/react-notifications";
class DeleteModal extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }


  handleSubmit = event => {
    event.preventDefault();
    if (!localStorage.getItem('user_id'))
      return this.props.handleLogout();

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


            NotificationManager.success(
              "SUPPRESSION EFFECTUEE",
              "CARNET",
              3000,
              null,
              null,
            );

            return this.props.callback();
          })
          .then(data => { }
            , error => {
              NotificationManager.warning(
                "ERREUR DE SUPPRESSION",
                "CARNET",
                3000,
                null,
                null,

              );
              return error;
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
                <h2>
                  Suppression de carnet de {eleve.label}
                </h2>
                :
                <h2>
                  Suppression des {selectedItems.length} carnets de {eleve.label}
                </h2>
              }
            </center>
            <ModalBody>

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
        }
      </>


    );
  }
}
export default DeleteModal;

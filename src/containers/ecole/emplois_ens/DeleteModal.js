import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalBody,
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
      "EMPLOI ENSEIGNANT",
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
            "EMPLOI ENSEIGNANT",
            3000,
            null,
            null,
          );

          return this.props.callback();
        })
        .then(data => { }

          , error => {
            NotificationManager.error(
              "Erreur de suppression",
              "EMPLOI ENSEIGNANT",
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



  render() {
    const {
      modalOpen,
      toggleModal,
      ens
    } = this.props;



    return (

      <Modal
        isOpen={modalOpen}
        toggle={toggleModal}
        wrapClassName="modal-left"
        backdrop="static"
      >
        <ModalBody>
          {ens &&
            <center>
              <h2>Êtes-vous sûr de vouloir supprimer l'emploi de {ens.label} ?</h2>

            </center>
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

import React, { Component } from "react";
import {
  CustomInput,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
  Table
} from "reactstrap";
import axios from "axios"

import { NotificationManager } from "../../../components/common/react-notifications";
import { Colxx } from "../../../components/common/CustomBootstrap";
class DeleteModal extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }





  supprimer = event => {
    event.preventDefault();
    if (!localStorage.getItem('user_id'))
      return this.props.handleLogout();

    if (this.props.classe.nbEleves > 0) {
      NotificationManager.warning(
        "Vérifier le nombre d'éléves",
        "CLASSE",
        5000,
        null,
        null,
      );
      return this.props.toggleModal();

    }

    NotificationManager.primary(
      "Requête en cours",
      "CLASSE",
      500,
      null,
      null,
    );

    for (var i = 0; i < this.props.selectedItems.length; i++) {

      try {

        axios
          .delete("http://api.onyx.inedit-gd.tn/classe/delete/" + this.props.selectedItems[i])
          .then(res => {


            NotificationManager.success(
              "classe supprimée avec succés",
              "CLASSE",
              3000,
              null,
              null,
            );

            return this.props.callback();

          }, error => {
            NotificationManager.warning(
              "Vérifier l'emploi ou la calendrier des examens de classe",
              "CLASSE",
              5000,
              null,
              null,

            );

            return error;

          })


      }
      catch (error) {
        return error;


      }


    }

  };

  annuler = () => {

    this.props.toggleModal();
    this.props.setST();
  }

  render() {
    const {
      modalOpen,
      classe,
      toggleModal,
      selectedItems
    } = this.props;

    return (
      <>
        {
          selectedItems.length === 1 &&
          <Modal
            isOpen={modalOpen}
            toggle={toggleModal}
            wrapClassName="modal-left"
            backdrop="static"
          >
            <ModalHeader toggle={toggleModal}></ModalHeader>
            <br></br>

            <ModalBody>
              <form onSubmit={this.supprimer}>
                <center>
                  <h2>Êtes-vous sûr de vouloir supprimer ?</h2>

                </center>

                <br></br>
                <br></br>
                <Colxx xxs="12" className="mb-3">


                  <Table responsive hover bordered>



                    <tr>
                      <th>Niveau</th>
                      <th>{classe.niveau}</th>
                    </tr>
                    <tr>
                      <th>Nom Classe</th>
                      <th>{classe.Nom}</th>
                    </tr>
                    <tr>
                      <th>Nombre d'éléves</th>
                      <th>{classe.nbEleves}</th>
                    </tr>

                  </Table>
                </Colxx>


                <br></br>
                <br></br>
                <div className="row">
                  <div className="col-12 col-md-6 mt-3">
                    <Button className="w-100" color="secondary" type="submit" onClick={toggleModal}>
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


              </form>

            </ModalBody>


          </Modal>
        }


      </>
    );
  }
}
export default DeleteModal;

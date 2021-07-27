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
import { Colxx } from "../../../components/common/CustomBootstrap";
import axios from "axios"
import { NotificationManager } from "../../../components/common/react-notifications";
import IntlMessages from "../../../helpers/IntlMessages";
// import "./delete.css"
class DeleteModal extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }


  Supprimer = event => {
    event.preventDefault();
    NotificationManager.primary(
      "Requête en cours",
      "DOMAINE",
      500,
      null,
      null,
    );
    for (var i = 0; i < this.props.selectedItems.length; i++) {
      try {

        axios
          .delete(
            "http://api.onyx.inedit-gd.tn/domaine/delete/" + this.props.selectedItems[i])
          .then(res => {

            NotificationManager.success(
              "Suppression effectuée avec succés",
              "DOMAINE",
              3000,
              null,
              null,
            );
            return this.props.callback();

          }, error => {
            NotificationManager.warning(
              "Erreur de suppression",
              "DOMAINE",
              5000,
              null,
              null,
            );
            return error;

          })


      }
      catch (error) {
        console.log("failed" + error);

      }

    }




  };
  annuler = () => {

    this.props.toggleModal();
    this.props.setST([])

  }
  render() {
    const {
      modalOpen,
      toggleModal,
      domaine,
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
            <ModalHeader toggle={toggleModal}>

            </ModalHeader>





            <ModalBody>

              <form onSubmit={this.Supprimer}>
                <br></br>
                <center>
                  <h2>Êtes-vous sûr de vouloir supprimer ?</h2>

                </center>
                <br></br>
                <br></br>
                <Colxx xxs="12" className="mb-3">


                  <Table responsive hover bordered>



                    <tr>
                      <th>Niveau</th>
                      <th>{domaine.niveau}{' '}</th>
                    </tr>
                    <tr>
                      <th>Domaine</th>
                      <th>{domaine.nom}</th>
                    </tr>


                  </Table>
                </Colxx>

                <br></br>
                <br></br>


                <Button type="submit" color="secondary" id="modifier" onClick={toggleModal}>
                  Supprimer
                </Button>

                <Button color="danger" onClick={this.annuler} id="annuler">
                  Annuler{" "}
                </Button>

              </form>

            </ModalBody>
          </Modal>
        }
        {
          selectedItems.length > 1 &&

          <Modal
            isOpen={modalOpen}
            toggle={toggleModal}
            wrapClassName="modal-left"
            backdrop="static"
          >
            <ModalHeader toggle={toggleModal}>

            </ModalHeader>

            <ModalBody>
              <form onSubmit={this.Supprimer}>

                <br></br>
                <center>
                  <h2>Êtes-vous sûr de vouloir supprimer les {selectedItems.length} domaines ?</h2>

                </center>
                <br></br>
                <br></br>
                <Button type="submit" color="secondary" id="modifier" onClick={toggleModal}>
                  Supprimer
                  </Button>

                <Button color="danger" onClick={this.annuler} id="annuler">
                  Annuler{" "}
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

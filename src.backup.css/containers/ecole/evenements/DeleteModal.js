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
import Select from "react-select";
import axios from "axios"
import { NotificationManager } from "../../../components/common/react-notifications";
import CustomSelectInput from "../../../components/common/CustomSelectInput";
import IntlMessages from "../../../helpers/IntlMessages";
// import "./delete.css"
import { Colxx } from "../../../components/common/CustomBootstrap";
import moment from "moment";


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
      "EVENEMENT",
      500,
      null,
      null,
    );
    for (var i = 0; i < this.props.selectedItems.length; i++) {

      try {
        axios
          .delete("http://api.onyx.inedit-gd.tn/event/delete/" + this.props.selectedItems[i])
          .then(res => {
            NotificationManager.success(
              "Supression effectuée",
              "EVENEMENT",
              3000,
              null,
              null,
            );

            return this.props.callback();
          })
          .then(data => {
          }, error => {

            NotificationManager.warning(
              "Erreur de suppression",
              "EVENEMENT",
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
  }

  annuler = () => {

    this.props.toggleModal();
    this.props.setST()

  }
  render() {

    const {
      modalOpen,
      toggleModal,
      selectedItems,
      evenement
    } = this.props;
    if (evenement) {

    }
    return (
      <>
        {
          selectedItems.length === 1 && evenement &&
          <Modal
            isOpen={modalOpen}
            toggle={toggleModal}
            wrapClassName="modal-left"
            backdrop="static"
          >
            <ModalHeader toggle={toggleModal}>

            </ModalHeader>
            <form onSubmit={this.handleSubmit}>
              <br></br>
              <center>
                <h2>Êtes-vous sûr de vouloir supprimer ?</h2>
              </center>
              <ModalBody>
                <Colxx xxs="12" className="mb-3">


                  <Table responsive hover bordered>


                    <tr>
                      <th>Titre</th>
                      <th>{evenement.titre && evenement.titre}</th>
                    </tr>
                    <tr>
                      <th>Lieu</th>
                      <th>{evenement.lieu && evenement.lieu}</th>
                    </tr>
                    <tr>
                      <th>Date début</th>
                      <th>{evenement.dateDebut && moment(evenement.dateDebut, 'YYYY-MM-DD').format('DD-MM-YYYY')}</th>
                    </tr>
                    <tr>
                      <th>Date fin</th>
                      <th>{evenement.dateFin && moment(evenement.dateFin, 'YYYY-MM-DD').format('DD-MM-YYYY')}</th>
                    </tr>
                    {evenement.description && evenement.description.trim().length > 0 &&
                      <tr>
                        <th>Description</th>
                        <th>{evenement.description && evenement.description}</th>
                      </tr>
                    }
                    <tr>
                      <th>Type</th>
                      <th>{evenement.type && evenement.type}</th>
                    </tr>


                  </Table>
                </Colxx>

                {/* <Label for="nomc">Titre :</Label>
                <Input
                  value={evenement.titre}
                />

                <br></br>

                <Label for="lieu">Lieu :</Label>
                <Input
                  value={evenement.lieu}
                />
                <br></br>
                <Label for="date1">Date début :</Label>
                <Input
                  value={debut}
                />
                <br></br>

                <Label for="date2">Date fin :</Label>
                <Input
                  value={fin}
                />
                <br></br>
                <Label for="desc">Description :</Label>
                <Input
                  value={evenement.description}
                />
                <br></br>
                <Label for="event">Type d'évenement :</Label>
                <Input
                  value={evenement.type}
                /> */}
                <br></br>
                <br></br>

                <Button type="submit" color="secondary" onClick={toggleModal} id="modifier">
                  Supprimer
                </Button>

                <Button color="danger" onClick={this.annuler} id="annuler">
                  Annuler
                </Button>
              </ModalBody>

            </form>


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
            <form onSubmit={this.handleSubmit}>

              <ModalBody>
                <h2>Êtes-vous sûr de vouloir supprimer ?</h2>
              </ModalBody>
              <Button type="submit" color="secondary" onClick={toggleModal} id="supprimer">
                Supprimer
              </Button>

              <Button color="danger" onClick={toggleModal} id="annuler">
                Annuler{" "}
              </Button>
            </form>
          </Modal>
        }

      </>
    );
  }
}
export default DeleteModal;

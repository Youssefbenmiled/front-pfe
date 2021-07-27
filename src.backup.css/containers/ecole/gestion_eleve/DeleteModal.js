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
  FormGroup,
  Table
} from "reactstrap";
import { Colxx } from "../../../components/common/CustomBootstrap";

import axios from "axios"
import { NotificationManager } from "../../../components/common/react-notifications";
// import "./delete.css"
import moment from 'moment'

class DeleteModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null
    };
  }

  // handleSubmit = event => {
  //   event.preventDefault();


  //   try {
  //     axios
  //       .delete(
  //         "http://api.onyx.inedit-gd.tn/eleve/delete/" + this.props.eleve.id)
  //       .then(res => {
  //         console.log(res)


  //         this.props.callback();

  //         NotificationManager.success(
  //           "SUPPRESSION EFFECTUEE ",
  //           "ELEVE",
  //           3000,
  //           null,
  //           null,
  //         );

  //         return res.data;
  //       })
  //       .then(data => {
  //       }, error => {
  //         NotificationManager.error(
  //           "ERREUR DE SUPPRESSION",
  //           "ELEVE",
  //           3000,
  //           null,
  //           null,

  //         );
  //       });

  //   }
  //   catch (error) {
  //     console.log("failed" + error);
  //   }


  // }

  handleSubmit = event => {
    event.preventDefault();
    NotificationManager.primary(
      "Requête en cours",
      "ELEVE",
      500,
      null,
      null,
    );

    for (var i = 0; i < this.props.selectedItems.length; i++) {

      try {
        axios
          .delete(
            "http://api.onyx.inedit-gd.tn/eleve/delete/" + this.props.selectedItems[i])
          .then(res => {
            this.props.callback();

          })
          .then(data => {
            NotificationManager.success(
              "Suppression effectuée",
              "ELEVE",
              3000,
              null,
              null,
            );
          }
            , error => {
              NotificationManager.warning(
                "Vérifier les carnets des éléves non supprimés",
                "ELEVES",
                5000,
                null,
                null,
              );
              return error;
            });

      }
      catch (error) {
        console.log("failed" + error);
        return error;
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
      eleve,
      selectedItems
    } = this.props;
    return (
      <>
        {
          selectedItems.length == 1 &&
          <Modal
            isOpen={modalOpen}
            toggle={toggleModal}
            wrapClassName="modal-left"
            backdrop="static"

          >
            <ModalHeader toggle={toggleModal}>

            </ModalHeader>


            <ModalBody>
              <form onSubmit={this.handleSubmit}>
                <br></br>
                <center>
                  <h2>Êtes-vous sûr de vouloir supprimer ?</h2>

                </center>
                <br></br>
                <br></br>
                <Colxx xxs="12" className="mb-3">


                  <Table responsive hover bordered>


                    <tr>
                      <th>Nom</th>
                      <th>{eleve.nameEleve}</th>
                    </tr>
                    <tr>
                      <th>Prénom</th>
                      <th>{eleve.prenom}</th>
                    </tr>
                    <tr>
                      <th>Genre</th>
                      <th>{eleve.sexe}</th>
                    </tr>
                    <tr>
                      <th>Date naissance</th>
                      <th>{moment(eleve.dateNaissance, 'YYYY-MM-DD').format('DD-MM-YYYY')}</th>
                    </tr>
                    <tr>
                      <th>Classe</th>
                      <th>{eleve.niveau + " " + eleve.nomClasse}</th>
                    </tr>


                  </Table>
                </Colxx>

                <br></br>
                <br></br>
                <FormGroup className="mb-0">
                  <Button
                    type="submit"
                    onClick={toggleModal}
                    color="secondary"
                    id="modifier">
                    Supprimer
                  </Button>
                  <Button

                    color="danger"
                    onClick={this.annuler}
                    id="annuler">
                    Annuler
                  </Button>

                </FormGroup>
              </form>

            </ModalBody>

          </Modal>
        }
        {selectedItems.length > 1 &&
          <Modal
            isOpen={modalOpen}
            toggle={toggleModal}
            wrapClassName="modal-left"
            backdrop="static"
            size='lg'
          >
            <ModalHeader toggle={toggleModal}>

            </ModalHeader>
            <ModalBody>
              <form onSubmit={this.handleSubmit}>
                <br></br>
                <center>
                  <h2>Êtes-vous sûr de vouloir supprimer les {selectedItems.length} éléves ?</h2>

                </center>
                <br></br>
                <br></br>
                <Button type="submit" color="secondary" onClick={toggleModal} id="modifier">
                  Supprimer
                  </Button>

                <Button type="reset" color="danger" onClick={this.annuler} id="annuler">
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

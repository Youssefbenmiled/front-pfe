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
import { Separator } from "../../../components/common/CustomBootstrap";
import moment from "moment"


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

    for (var i = 0; i < this.props.selectedItems.length; i++) {

      try {

        axios
          .delete("http://api.onyx.inedit-gd.tn/travail/delete/" + this.props.selectedItems[i])
          .then(res => {

            this.props.callback();
            return NotificationManager.success(
              "Travail à faire supprimé",
              "TRAVAIL A FAIRE",
              3000,
              null,
              null,
            );




          }, error => {
            NotificationManager.warning(
              "Erreur de suppression",
              "TRAVAIL A FAIRE",
              3000,
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
      toggleModal,
      selectedItems,
      devoir
    } = this.props;

    return (

      <Modal
        isOpen={modalOpen}
        toggle={toggleModal}
        wrapClassName="modal-left"
        backdrop="static"
        size="lg"
      >
        <ModalHeader toggle={toggleModal}>

        </ModalHeader>

        {selectedItems.length === 1 &&


          <ModalBody>
            <form onSubmit={this.supprimer}>

              <Colxx xxs="12" className="mb-3">



                <Table responsive hover bordered>
                  <tr>
                    <th>Classe</th>
                    <td>
                      {devoir.niveau && devoir.niveau}{' '}{devoir.nomClasse && devoir.nomClasse}
                    </td>
                  </tr>
                  <tr>
                    <th>Trimestre</th>
                    <td>{devoir.trimestre && devoir.trimestre}</td>

                  </tr>
                  <tr>
                    <th>Domaine</th>
                    <td>{devoir.domaine && devoir.domaine}</td>
                  </tr>

                  <tr>
                    <th>Envoyé le</th>

                    <td>
                      {moment(devoir.dateEnvoi && devoir.dateEnvoi, 'YYYY-MM-DD').format("DD-MM-YYYY")}

                    </td>
                  </tr>
                  <tr>
                    <th>Date d'échéance</th>
                    <td>
                      {moment(devoir.dateEcheance && devoir.dateEcheance, 'YYYY-MM-DD').format("DD-MM-YYYY")}
                    </td>
                  </tr>



                  {devoir.description && devoir.description.trim().length > 0 &&
                    <tr>
                      <th>Description</th>
                      <td>{devoir.description && devoir.description}</td>
                    </tr>
                  }
                </Table>

              </Colxx>

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

        }

        {selectedItems.length > 1 &&



          <ModalBody>

            <form onSubmit={this.supprimer}>
              <h1>Êtes-vous sûr de vouloir supprimer les {selectedItems.length} travaux à faire ?</h1>
              <br></br>
              <br></br>
              <div className="row">
                <div className="col-12 col-md-6 mt-3">
                  <Button className="w-100" color="secondary" type="submit" onClick={toggleModal}>
                    Supprimer
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
        }
      </Modal>


    );
  }
}
export default DeleteModal;

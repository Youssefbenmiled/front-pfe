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

// import "./delete.css"
import { NotificationManager } from "../../../components/common/react-notifications";
import { Separator } from "../../../components/common/CustomBootstrap";

import moment from "moment"
import { Colxx } from "../../../components/common/CustomBootstrap";


class DeleteModal extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }


  supprimer = event => {
    if (!localStorage.getItem('user_id'))
      return this.props.handleLogout();


    event.preventDefault();
    NotificationManager.primary(
      "Requête en cours",
      "MENU CANTINE",
      1000,
      null,
      null,
    );
    for (var i = 0; i < this.props.selectedItems.length; i++) {

      try {

        axios
          .delete("http://api.onyx.inedit-gd.tn/cantine/delete/" + this.props.selectedItems[i])
          .then(res => {

            NotificationManager.success(
              "Suppression avec succés",
              "Menu",
              3000,
              null,
              null,
            );;

            return this.props.callback();

          }, error => {

            NotificationManager.warning(
              "Erreur de suppression",
              "MENU",
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
      toggleModal,
      selectedItems,
      cantine
    } = this.props;
    return (


      <Modal
        isOpen={modalOpen}
        toggle={toggleModal}
        wrapClassName="modal-left"
        backdrop="static"
      >
        <ModalHeader toggle={toggleModal}>

        </ModalHeader>

        <ModalBody>
          {
            selectedItems.length === 1 &&
            <form onSubmit={this.supprimer}>
              <br></br>
              <center>
                <h2>Êtes-vous sûr de vouloir supprimer ?</h2>
              </center>
              <br></br>
              <br></br>

              <Colxx xxs="12" className="mb-3">


                <Table responsive hover bordered>


                  <tr>
                    <th>Menu valable à partir de :</th>
                    <th>{moment(cantine.delaiDebut && cantine.delaiDebut, 'YYYY-MM-DD').format('DD-MM-YYYY')}</th>
                  </tr>
                  <tr>
                    <th>Jusqu'à</th>
                    <th>{moment(cantine.delaisFin && cantine.delaisFin, 'YYYY-MM-DD').format('DD-MM-YYYY')}</th>
                  </tr>
                  <tr>
                    <th>Heure début :</th>
                    <th>{cantine.heureDebut && cantine.heureDebut}</th>
                  </tr>
                  <tr>
                    <th>Heure fin :</th>
                    <th>{cantine.heureFin && cantine.heureFin}</th>
                  </tr>



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

          }

          {
            selectedItems.length > 1 &&

            <form onSubmit={this.supprimer}>
              <h1>Êtes-vous sûr de vouloir supprimer ?</h1>
              <br></br>
              <Separator className="mb-5" />
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

          }
        </ModalBody>
      </Modal>

    );
  }
}
export default DeleteModal;

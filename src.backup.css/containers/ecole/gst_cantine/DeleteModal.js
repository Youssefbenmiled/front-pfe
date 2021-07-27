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
        console.log("failed" + error);


      }


    }
    // if (error)
    //   NotificationManager.warning(
    //     "Erreur de suppression",
    //     "MENU",
    //     5000,
    //     null,
    //     null,

    //   );
    // else {
    //   NotificationManager.success(
    //     "Suppression avec succés",
    //     "Menu",
    //     3000,
    //     null,
    //     null,
    //   );
    // }


  };

  annuler = () => {
    this.props.toggleModal()
    this.props.setST()
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

              {/* <Label for="dat1">Menu valable à partir de :</Label>
              <Input
                name="dat1"
                value={moment(cantine.delaiDebut, 'YYYY-MM-DD').format('DD-MM-YYYY')}
              />

              <br></br>

              <Label for="dat2">Jusqu'à :</Label>
              <Input

                value={moment(cantine.delaisFin, 'YYYY-MM-DD').format('DD-MM-YYYY')}
              />
              <br></br>
              <Label for="hd">Heure début :</Label>
              <Input
                name="hd"
                value={cantine.heureDebut}
              />
              <br></br>
              <Label for="hf">Heure fin :</Label>
              <Input
                name="hd"
                value={cantine.heureFin}
              /> */}
              <br></br>
              <Button type="submit" color="secondary" id="supdat" onClick={toggleModal} >
                Supprimer
              </Button>

              <Button color="danger" onClick={this.annuler} id="supandat">
                Annuler
              </Button>
            </form>

          }

          {
            selectedItems.length > 1 &&

            <form onSubmit={this.supprimer}>
              <h1>Êtes-vous sûr de vouloir supprimer ?</h1>
              <br></br>
              <Separator className="mb-5" />
              <br></br>
              <Button type="submit" color="secondary" id="modifier" onClick={toggleModal} >
                Supprimer
                  </Button>

              <Button color="danger" onClick={this.annuler} id="annuler">
                Annuler
                  </Button>
            </form>

          }
        </ModalBody>
      </Modal>

    );
  }
}
export default DeleteModal;

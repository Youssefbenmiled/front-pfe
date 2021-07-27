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

import IntlMessages from "../../../helpers/IntlMessages";
// import "./delete.css"
import { NotificationManager } from "../../../components/common/react-notifications";
import { Colxx } from "../../../components/common/CustomBootstrap";
class DeleteModal extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }


  // supprimer = event => {
  //   event.preventDefault();
  //   if (this.props.classe.nbEleves > 0) {
  //     NotificationManager.warning(
  //       "VERIFIER LE NOMBRE D'ELEVES",
  //       "CLASSE",
  //       5000,
  //       null,
  //       null,
  //     );
  //   }
  //   else {
  //     try {
  //       axios
  //         .delete(
  //           "http://api.onyx.inedit-gd.tn/classe/delete/" + this.props.classe.id)

  //         .then(res => {
  //           console.log(res)

  //           this.props.callback();

  //           NotificationManager.success(
  //             "SUPPRESSION EFFECTUEE",
  //             "CLASSE",
  //             3000,
  //             null,
  //             null,
  //           );

  //           return res.data;
  //         })
  //         .then(data => {
  //           this.setState({
  //             data,
  //           });
  //         }, error => {
  //           NotificationManager.error(
  //             "ERREUR DE SUPPRESSION",
  //             "CLASSE",
  //             3000,
  //             null,
  //             null,
  //           );
  //         });

  //     }
  //     catch (error) {
  //       console.log("failed" + error);
  //     }
  //   }
  //   this.props.toggleModal();

  // };

  supprimer = event => {
    event.preventDefault();
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
        console.log("failed" + error);


      }


    }

  };

  annuler = () => {

    this.props.toggleModal();
    this.props.setST()
  }

  render() {
    const {
      modalOpen,
      classe,
      toggleModal,
      selectedItems
    } = this.props;
    console.log(this.props.classe)

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
                      <th>{classe.niveau}{' '}</th>
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

                {/* <Label className="mt-4">
                  Niveau classe :
               </Label>

                <Input value={classe.niveau} />
                <br></br>
                <br></br>
                <Label>
                  Nom classe :
             </Label>
                <Input value={classe.Nom} />
                <br></br>
                <br></br>
                <Label>Nombre d'éléves : </Label>
                <Input value={classe.nbEleves} /> */}
                <br></br>
                <br></br>
                <Button type="submit" color="secondary" id="modifier" onClick={toggleModal} >
                  Supprimer
                  </Button>

                <Button type="reset" color="danger" onClick={this.annuler} id="annuler" >
                  Annuler
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

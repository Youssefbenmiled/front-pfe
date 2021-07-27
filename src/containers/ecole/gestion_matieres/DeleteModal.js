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
import Select from "react-select";
import CustomSelectInput from "../../../components/common/CustomSelectInput";
import IntlMessages from "../../../helpers/IntlMessages";
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


    NotificationManager.primary(
      "Requête en cours",
      "MATIERE",
      500,
      null,
      null,
    );
    for (var i = 0; i < this.props.selectedItems.length; i++) {

      try {
        axios
          .delete("http://api.onyx.inedit-gd.tn/matiere/delete/" + this.props.selectedItems[i])
          .then(res => {
            NotificationManager.success(
              "Suppression effectuée avec succés",
              "MATIERE",
              3000,
              null,
              null,

            );
            return this.props.callback();
          })
          .then(data => {
            this.setState({
              data,
            });
          }, error => {
            NotificationManager.warning(
              "Erreur de suppression",
              "MATIERE",
              5000,
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
  };


  annuler = () => {

    this.props.toggleModal();
    this.props.setST();

  }


  render() {
    const {
      modalOpen,
      toggleModal,
      mat,
      domaine,
      niveau,
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
            size='lg'
          >
            <ModalHeader toggle={toggleModal}></ModalHeader>

            <ModalBody>
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
                      <th>Matiére</th>
                      <th>{mat.nom}</th>
                    </tr>
                    <tr>
                      <th>Coefficient</th>
                      <th>{mat.coeficient}</th>
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
        {
          selectedItems.length > 1 &&


          <Modal
            isOpen={modalOpen}
            toggle={toggleModal}
            wrapClassName="modal-left"
            backdrop="static"
            size='lg'
          >
            <ModalHeader toggle={toggleModal}></ModalHeader>


            <ModalBody>

              <form onSubmit={this.supprimer}>
                <br></br>
                <center>
                  <h2>Êtes-vous sûr de vouloir supprimer les {selectedItems.length} matiéres ?</h2>

                </center>
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

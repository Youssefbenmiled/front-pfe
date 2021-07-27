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
import moment from 'moment'

import axios from "axios"
import { NotificationManager } from "../../../components/common/react-notifications";
class DeleteModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      valueRole: []
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.admin && nextProps.admin.roles) {
      this.setState({
        valueRole: nextProps.admin.roles.trim().split(' ').filter(x => x.localeCompare('ROLE_GESTION_ADMINISTRATEUR') != 0).map(x => ({ label: x, value: x }))
      })
    }

  }

  Supprimer = event => {
    event.preventDefault();
    if (!localStorage.getItem('user_id'))
      return this.props.handleLogout();


    NotificationManager.primary(
      "Requête en cours",
      "ADMINISTRATEUR",
      1000,
      null,
      null,
    );

    for (var i = 0; i < this.props.selectedItems.length; i++) {

      try {
        axios
          .delete("http://api.onyx.inedit-gd.tn/admins/delete/" + this.props.selectedItems[i])


          .then(res => {

            NotificationManager.success(
              "Suppression effectuée",
              "ADMINISTRATEUR",
              3000,
              null,
              null,
            );
            return this.props.callback();
          }

            , error => {
              NotificationManager.warning(
                "Erreur de suppression",
                "ADMINISTRATEUR",
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

  }

  annuler = () => {

    this.props.toggleModal(this.props.admin);
    this.props.setST();

  }
  render() {
    const {
      modalOpen,
      toggleModal,
      admin,
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
          ><ModalHeader toggle={toggleModal}>

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
                      <th>Nom complet</th>
                      <th>{admin.nomPrenom}{' '}</th>
                    </tr>
                    <tr>
                      <th>Email</th>
                      <th>{admin.email}</th>
                    </tr>
                    <tr>
                      <th>Statut</th>
                      <th>{admin.statut}</th>
                    </tr>
                    <tr>
                      <th>Roles</th>
                      <th>{this.state.valueRole.map(role => role.label).join(' ,')}</th>
                    </tr>
                    <tr>
                      <th>Date de création</th>
                      <th>{moment(admin.dateCreation && admin.dateCreation, 'YYYY-MM-DD').format('DD-MM-YYYY')}</th>
                    </tr>

                  </Table>
                </Colxx>

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
          >
            <ModalHeader toggle={toggleModal}>

            </ModalHeader>
            <ModalBody>
              <form onSubmit={this.Supprimer}>

                <br></br>
                <center>
                  <h2>Êtes-vous sûr de vouloir supprimer les {selectedItems.length} administrateurs ?</h2>

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

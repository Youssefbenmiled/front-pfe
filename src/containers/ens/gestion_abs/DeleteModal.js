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
import { Separator } from "../../../components/common/CustomBootstrap";
import { Colxx } from "../../../components/common/CustomBootstrap";
import List from "./List";
import moment from 'moment';

class DeleteModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      eleves: [],
      selectedItems: []
    };
  }
  componentWillReceiveProps(nextProps) {


    if (nextProps) {
      if (!localStorage.getItem('user_id'))
        return this.props.handleLogout();
      this.getEleves(nextProps.feuille.idClasse);
      this.setState({
        selectedItems: [nextProps.feuille.idEleve],
      })
    }

  }



  getEleves(idClasse) {


    var query = "http://api.onyx.inedit-gd.tn/eleve/getAll?classe=" + idClasse;

    try {
      axios
        .get(query)
        .then(res => {
          return res.data;
        })
        .then(data => {
          this.setState({
            eleves: data.list,
          });
        }, error => {
          return error;
        });
    }
    catch (error) {
      return error;
    }
  }


  supprimer = event => {
    event.preventDefault();
    if (!localStorage.getItem('user_id'))
      return this.props.handleLogout();

    for (var i = 0; i < this.props.selectedItems.length; i++) {

      try {

        axios
          .delete("http://api.onyx.inedit-gd.tn/feuille/presence/delete/" + this.props.selectedItems[i])
          .then(res => {
            NotificationManager.success(
              "Feuille d'appel supprimée avec succées",
              "FEUILLE D'APPEL",
              3000,
              null,
              null,
            );

            return this.props.callback();

          }, error => {
            NotificationManager.warning(
              "Erreur de suppression",
              "FEUILLE D'APPEL",
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
  handleLogout = () => {
    this.props.logoutUser(this.props.history);
  };

  render() {
    const {
      modalOpen,
      toggleModal,
      selectedItems,
      feuille
    } = this.props;

    return (


      <Modal
        isOpen={modalOpen}
        toggle={toggleModal}
        wrapClassName="modal-left"
        backdrop="static"
        size={selectedItems.length === 1 && "lg"}
      >
        <ModalHeader toggle={toggleModal}>

        </ModalHeader>

        <ModalBody>
          {
            selectedItems.length === 1 &&
            <form onSubmit={this.supprimer}>

              <Colxx xxs="12" className="mb-3">

                <br></br>
                <br></br>
                <Table responsive hover bordered>
                  <tr>
                    <th>Classe</th>
                    <th>{feuille.niveauClasse + " " + feuille.nomClasse}</th>
                  </tr>
                  <tr>
                    <th>Séance</th>
                    <th>{feuille.seance}</th>
                  </tr>
                  <tr>
                    <th>Envoyé le</th>
                    <th>
                      {moment(feuille.date && feuille.date, 'YYYY-MM-DD').format("DD-MM-YYYY") + " " + feuille.heure}
                    </th>
                  </tr>




                </Table>
                <br></br>
                <br></br>

                <Table responsive hover bordered>

                  <th>Nom </th>
                  <th>Prénom </th>
                  <th>Absent</th>


                  <tbody>
                    {this.state.eleves.map((eleve, i) => {
                      return (
                        <List
                          isSelect={this.state.selectedItems.includes(eleve.id)}
                          key={eleve.id}
                          eleve={eleve}
                          edit={false}
                          handleLogout={this.handleLogout}

                        />
                      )
                    })
                    }


                  </tbody>


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
              <h1>Êtes-vous sûr de vouloir supprimer les {selectedItems.length} Feuilles d'appel ?</h1>
              <div className="row">
                <div className="col-12 col-md-6 mt-3">
                  <Button className="w-100" color="secondary" type="submit" onClick={toggleModal}>
                    Supprimer
                </Button>
                </div>
                <div className="col-12 col-md-6 mt-3">
                  <Button className="w-100"
                    color="danger"
                    onClick={this.annuler}
                  >
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

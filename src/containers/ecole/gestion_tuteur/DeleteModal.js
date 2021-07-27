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
  Table,
  InputGroup
} from "reactstrap";
import axios from "axios"
import { NotificationManager } from "../../../components/common/react-notifications";

import { Colxx } from "../../../components/common/CustomBootstrap";


class DeleteModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // valueNiveau: [],
      // valueClasse: [],
      valueEleve: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.tuteur && nextProps.tuteur.eleves)
      this.setState({
        // valueNiveau: this.getUnique(nextProps.tuteur.eleves.map(eleve => ({ label: eleve.classe.niveau, value: eleve.classe.niveau }))),
        // valueClasse: this.getUnique(nextProps.tuteur.eleves.map(eleve => (eleve.classe.nom ? ({ label: eleve.classe.niveau + ")" + eleve.classe.nom, value: eleve.classe.id }) : ({ label: eleve.classe.niveau + ")" + eleve.classe.Nom, value: eleve.classe.id })))),
        valueEleve: nextProps.tuteur.eleves.map(eleve => (eleve.classe.nom ? ({ value: eleve.id, classe: eleve.classe.niveau + " " + eleve.classe.nom, nom: eleve.Nom, prenom: eleve.prenom }) : ({ value: eleve.id, classe: eleve.classe.niveau + " " + eleve.classe.Nom, nom: eleve.Nom, prenom: eleve.prenom }))),
      })
  }

  getUnique(array) {
    var uniqueArray = [];

    for (var i = 0; i < array.length; i++) {
      if (uniqueArray.map(x => parseInt(x.value)).indexOf(parseInt(array[i].value)) === -1)
        uniqueArray.push({ label: array[i].label, value: array[i].value });

    }
    uniqueArray = uniqueArray.map(item => ({ label: item.label, value: item.value }))

    return uniqueArray;
  }



  handleSubmit = event => {
    event.preventDefault();
    if (!localStorage.getItem('user_id'))
      return this.props.handleLogout();


    NotificationManager.primary(
      "Requête en cours",
      "TUTEUR",
      1000,
      null,
      null,
    );
    for (var i = 0; i < this.props.selectedItems.length; i++) {
      try {

        axios
          .delete("http://api.onyx.inedit-gd.tn/tuteur/delete/" + this.props.selectedItems[i])


          .then(res => {


            NotificationManager.success(
              "Suppression effectuée avec succés",
              "TUTEUR",
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
              "TUTEUR",
              5000,
              null,
              null,

            );
          });

      }
      catch (error) {
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
      tuteur,
      selectedItems
    } = this.props;

    return (
      <Modal
        isOpen={modalOpen}
        toggle={toggleModal}
        wrapClassName="modal-left"
        backdrop="static"
        size='lg'
      >

        <ModalHeader toggle={toggleModal}>
        </ModalHeader>
        {tuteur &&
          <ModalBody>


            <br></br>
            <br></br>


            {selectedItems.length === 1 &&
              <form onSubmit={this.handleSubmit}>

                <br></br>
                <center>
                  <h2>Êtes-vous sûr de vouloir supprimer ?</h2>

                </center>
                <br></br>
                <Table responsive hover bordered>
                  <tr>
                    <th>Nom</th>
                    <th>{tuteur.nom}</th>
                  </tr>
                  <tr>
                    <th>Prénom</th>
                    <th>{tuteur.prenom}</th>
                  </tr>
                  <tr>
                    <th>Adresse</th>
                    <th>{tuteur.adresse}</th>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <th>{tuteur.email}</th>
                  </tr>
                  <tr>
                    <th>N° de Téléphone</th>
                    <th>{tuteur.numTel}</th>
                  </tr>
                  <tr>
                    <th>Nombre d'enfants</th>
                    <th>{tuteur.eleves.length}</th>
                  </tr>
                  <tr>
                    <th>Statut</th>
                    <th>{tuteur.statut}</th>
                  </tr>




                </Table>
                <br></br>
                <center>
                  <h2>
                    {tuteur && tuteur.eleves && tuteur.eleves.length > 1 ? <h2>Enfants</h2> : <h2>Enfant</h2>}
                  </h2>
                </center>
                <br></br>




                <Table responsive hover bordered>
                  <thead>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Classe</th>

                  </thead>
                  {this.state.valueEleve.map(eleve =>


                    <tr>
                      <td>{eleve.nom}</td>
                      <td>{eleve.prenom}</td>
                      <td>{eleve.classe}</td>
                    </tr>
                  )}
                </Table>
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

            }


            {selectedItems.length > 1 &&
              <form onSubmit={this.handleSubmit}>

                <br></br>
                <center>
                  <h2>Êtes-vous sûr de vouloir supprimer les {selectedItems.length} tuteurs ?</h2>

                </center>
                <br></br>
                <br></br>

                <Button type="submit" color="secondary" id="modifier" onClick={toggleModal}>
                  Supprimer
                  </Button>

                <Button color="danger" onClick={this.annuler} id="annuler">
                  Annuler
                  </Button>
              </form>

            }

          </ModalBody>
        }



      </Modal>





    );
  }
}


export default DeleteModal;

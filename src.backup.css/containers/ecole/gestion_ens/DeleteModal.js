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
import Select from "react-select";
import CustomSelectInput from "../../../components/common/CustomSelectInput";
import IntlMessages from "../../../helpers/IntlMessages";
// import "./delete.css";
import axios from "axios";
import { NotificationManager } from "../../../components/common/react-notifications";

class DeleteModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      valueNiveau: [],
      valueClasse: [],
      valueDomaine: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.ens && nextProps.ens.classe)
      this.setState({
        valueNiveau: this.getUnique(nextProps.ens.classe.map(classe => ({ label: classe.niveau, value: classe.niveau }))),
        valueClasse: nextProps.ens.classe.map(classe => ({ label: classe.niveau + ")" + classe.Nom, value: classe.id })),
        valueDomaine: nextProps.ens.domaine.map(domaine => ({ label: domaine.niveau + ")" + domaine.nom, value: domaine.id }))
      })
  }

  getUnique(array) {
    var uniqueArray = [];

    for (var i = 0; i < array.length; i++) {
      if (uniqueArray.indexOf(array[i].value) === -1) {
        uniqueArray.push(array[i].value);
      }
    }
    uniqueArray = uniqueArray.map(item => ({ label: item, value: item }))
    return uniqueArray;
  }

  handleSubmit = event => {
    event.preventDefault();
    NotificationManager.primary(
      "Requête en cours",
      "ENSEIGNANT",
      500,
      null,
      null,
    );
    for (var i = 0; i < this.props.selectedItems.length; i++) {
      try {
        axios
          .delete(
            "http://api.onyx.inedit-gd.tn/enseignant/delete/" + this.props.selectedItems[i])
          .then(res => {
            NotificationManager.success(
              "Suppression effectuée",
              "ENSEIGNANT",
              5000,
              null,
              null,
            );
          })
          .then(data => {
            return this.props.callback();

          }
            , error => {
              NotificationManager.warning(
                "Vérifier emploi de l'enseignant",
                "ENSEIGNANT",
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

    // }))



  }

  annuler = () => {

    this.props.toggleModal();
    this.props.setST()

  }

  render() {

    const {
      modalOpen,
      toggleModal,
      ens,
      selectedItems
    } = this.props;


    return (
      <>
        {ens && selectedItems.length == 1 &&
          <Modal
            isOpen={modalOpen}
            toggle={toggleModal}
            wrapClassName="modal-left"
            backdrop="static"
          >
            <ModalHeader
              toggle={toggleModal}>

            </ModalHeader>



            <ModalBody>
              <form onSubmit={this.handleSubmit}>
                <br></br>
                <center>
                  <h2>Êtes-vous sûr de vouloir supprimer ?</h2>
                </center>
                <br></br>
                <Colxx xxs="12" className="mb-3">
                  <Table responsive hover bordered>
                    <tr>
                      <th>Nom</th>
                      <th>{ens.prenom}</th>
                    </tr>
                    <tr>
                      <th>Prénom</th>
                      <th>{ens.nom}</th>

                    </tr>
                    <tr>
                      <th>Email</th>
                      <th>{ens.email}</th>

                    </tr>
                    <tr>
                      <th>Adresse</th>
                      <th>{ens.adresse}</th>

                    </tr>
                    <tr>
                      <th>N° de Téléphone</th>
                      <th>{ens.numTel}</th>

                    </tr>
                    <tr>
                      <th>Statut</th>
                      <th>{ens.statut}</th>

                    </tr>

                  </Table>
                  {/* <Label for="nom">Nom :</Label>
                  <Input
                    name="nom"
                    value={ens.nom}
                  />

                  <br></br>

                  <Label for="pren">Prénom :</Label>
                  <Input
                    name="pren"
                    value={ens.prenom}
                  />
                  <br></br>
                  <Label for="email">Email :</Label>
                  <Input
                    name="email"
                    value={ens.email}
                  />
                  <br></br>

                  <Label for="adr">Adresse :</Label>
                  <Input
                    name="adr"
                    value={ens.adresse}
                  />


                  <br></br>
                  <Label for="tel">N° Téléphone :</Label>
                  <Input
                    name="tel"
                    value={ens.numTel}
                  />
                  <br></br>
                  <Label for="statut">Statut :</Label>
                  <Input
                    name="statut"
                    value={ens.id === 20 ? "inactif" : "actif"}
                  /> */}
                  <br></br>
                  <center><h2>
                    Enseigne
                  </h2></center>
                  <br></br>
                  <Table responsive hover bordered>
                    <tr>
                      <th>Niveau(x)</th>
                      <th>{this.state.valueNiveau.map(niveau => niveau.value).join(' ,')}</th>
                    </tr>
                    <tr>
                      <th>Classe(s)</th>
                      <th>{this.state.valueClasse.map(classe => classe.label).join(' ,')}</th>

                    </tr>
                    <tr>
                      <th>Domaine(s)</th>
                      <th>{this.state.valueDomaine.map(domaine => domaine.label).join(' ,')}</th>

                    </tr>
                  </Table>

                </Colxx>

                {/* 
                <Label>
                  Niveau (x):
                </Label>
                <Input
                  name="niveau"
                  value={this.state.valueNiveau.map(niveau => niveau.value)}
                />
                <Select
                  value={this.state.valueNiveau}
                  options={[]}
                  className="react-select position-relative"
                  placeholder="Sélectionner un niveau..."
                  classNamePrefix="react-select"
                  name="niveau"
                  disabled
                  isMulti

                /> 
               
                <br></br>

                 <Label>
                  Classe(s) :
                </Label>
                <Input
                  name="classe"
                  value={this.state.valueClasse.map(classe => classe.label).join(' ,')}
                /> 
                 <Select
                  value={this.state.valueClasse}
                  options={[]}
                  className="react-select"
                  classNamePrefix="react-select"
                  name="classe"
                  disabled
                  isMulti

                /> 
                 
                <Label>
                  Domaine(s) :
                </Label>
                <Input
                  name="domaine"
                  value={this.state.valueDomaine.map(domaine => domaine.label).join(' ,')}
                />                                  
                <Select
                  value={this.state.valueDomaine}
                  options={[]}
                  className="react-select"
                  classNamePrefix="react-select"
                  name="domaine"
                  isMulti
                  disabled

                /> */}
                <br></br>
                <br></br>


                <Button type="submit" color="secondary" onClick={toggleModal} id="delens">
                  Supprimer
                </Button>

                <Button color="danger" onClick={this.annuler} id="annens">
                  Annuler
                </Button>

              </form>
            </ModalBody>

          </Modal>
        }

        {ens && selectedItems.length > 1 &&

          <Modal
            isOpen={modalOpen}
            toggle={toggleModal}
            wrapClassName="modal-left"
            backdrop="static"
          >


            <ModalBody>
              <form onSubmit={this.handleSubmit}>

                <br></br>
                <center>
                  <h2>Êtes-vous sûr de vouloir supprimer les {selectedItems.length} enseignants ?</h2>

                </center>
                <br></br>
                <br></br>
                <Button type="submit" color="secondary" onClick={toggleModal} id="delens">
                  Supprimer
                </Button>

                <Button color="danger" onClick={this.annuler} id="annens2">
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

// <center>
//   <h3>Données {ens.nom + " " + ens.prenom} </h3>
// </center>
//   <br></br>
//   <Table responsive hover bordered>
//     <thead>
//       <th>Nom</th>
//       <th>Prénom</th>
//       <th>Email</th>
//       <th>Adresse</th>
//       <th>N° Téléphone</th>
//     </thead>
//     {ens &&
//       <tbody>
//         <th>{ens.nom}</th>
//         <th>{ens.prenom}</th>
//         <th>{ens.email}</th>
//         <th>{ens.adresse}</th>
//         <th>{ens.numTel}</th>

//       </tbody>
//     }
//   </Table>
//   <center>

//     <h3>Enseigne : </h3>
//   </center>
//   <br></br>
//   <Table responsive hover bordered>
//     <thead>
//       <th>Classes</th>
//       <th>Domaines</th>
//     </thead>
//     {ens &&

//       <tbody>
//         <th>
//           {ens.classe.map(classe =>
//             <>
//               {classe.niveau + ")" + classe.Nom}
//               <br></br>
//             </>
//           )}
//         </th>
//         <th>
//           {ens.domaine.map(domaine =>
//             <>
//               {domaine.niveau + ")" + domaine.nom}
//               <br></br>
//             </>
//           )}
//         </th>
//       </tbody>
//     }

//   </Table>
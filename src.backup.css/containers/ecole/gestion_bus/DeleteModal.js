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
import Select from "react-select";
import axios from "axios"
import { NotificationManager } from "../../../components/common/react-notifications";
import CustomSelectInput from "../../../components/common/CustomSelectInput";
import IntlMessages from "../../../helpers/IntlMessages";
// import "./delete.css"
import { Colxx } from "../../../components/common/CustomBootstrap";
class DeleteModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      valueNiveau: null,
      valueClasse: null
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps)
      this.setState({

        // valueNiveau: this.getUnique(nextProps.bus.classe.map(classe => ({ label: classe.niveau, value: classe.niveau }))),
        // valueClasse: nextProps.bus.classe.map(classe => ({ label: classe.niveau + ")" + classe.Nom, value: classe.id })),
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
      "TRANSPORT",
      1000,
      null,
      null,
    );

    for (var i = 0; i < this.props.selectedItems.length; i++) {

      try {
        axios
          .delete("http://api.onyx.inedit-gd.tn/transport/delete/" + this.props.selectedItems[i])
          .then(res => {

            NotificationManager.success(
              "Supression bus avec succés",
              "TRANSPORT",
              3000,
              null,
              null,
            );

            return this.props.callback();
          })
          .then(data => {
          }, error => {

            NotificationManager.warning(
              "Erreur de suppression bus",
              "TRANSPORT",
              5000,
              null,
              null,

            );
          });

      }
      catch (error) {
        console.log("failed" + error);
      }
    }
  }
  annuler = () => {
    this.props.toggleModal()
    this.props.setST()
  }
  render() {
    const {
      modalOpen,
      toggleModal,
      selectedItems,
      bus
    } = this.props;
    const {
      valueClasse,
      valueNiveau
    } = this.state;
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
            <ModalHeader toggle={toggleModal}>

            </ModalHeader>
            <form onSubmit={this.handleSubmit}>

              <ModalBody>
                <Label for="mat">Matricule :</Label>
                <Input
                  value={bus.matricule}
                />

                <br></br>

                <Label for="nbp">Nombre de places :</Label>
                <Input
                  value={bus.nbplace}
                />
                <br></br>
                <Label for="nomch">Chauffeur :</Label>
                <Input
                  value={bus.nomchauffeur}
                />
                <br></br>

                <Label for="tel">N° Téléphone chauffeur :</Label>
                <Input
                  value={bus.numtelChauffeur}
                />
                <br></br>
                {/* <Label>
                  Niveau :
                </Label>

                <Select
                  value={valueNiveau}
                  options={[]}
                  className="react-select"
                  classNamePrefix="react-select"
                  name="niveau"
                  isMulti
                  disabled

                />
                <br></br>
                <Label>
                  Classe :
                </Label>

                <Select
                  value={valueClasse}
                  options={[]}
                  className="react-select"
                  classNamePrefix="react-select"
                  name="classe"
                  isMulti
                  disabled

                /> */}
                <Button type="submit" color="secondary" onClick={toggleModal} id="modifier">
                  Supprimer
              </Button>

                <Button color="danger" onClick={this.annuler} id="annuler">
                  Annuler
                </Button>
              </ModalBody>
            </form>


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
            <form onSubmit={this.handleSubmit}>

              <ModalBody>
                <h1>Voulez vous supprimer ?</h1>
              </ModalBody>
              <Button type="submit" color="secondary" onClick={toggleModal} id="supprimer">
                Supprimer
                  </Button>

              <Button color="danger" onClick={this.annuler} id="annuler">
                Annuler{" "}
              </Button>
            </form>
          </Modal>
        }

      </>
    );
  }
}
export default DeleteModal;

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
import Select from "react-select";
import CustomSelectInput from "../../../components/common/CustomSelectInput";
import IntlMessages from "../../../helpers/IntlMessages";
// import "./delete.css"
import { NotificationManager } from "../../../components/common/react-notifications";
import { Separator } from "../../../components/common/CustomBootstrap";
import { Colxx } from "../../../components/common/CustomBootstrap";
import List from "./List";
import moment from 'moment';

class DeleteModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      eleves: []
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps)
      this.getEleves(nextProps.idClasse);

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
          console.log(error)
        });
    }
    catch (error) {
      console.log("failed" + error)
    }
  }
  supprimer = event => {
    event.preventDefault();


    for (var i = 0; i < this.props.selectedItems.length; i++) {

      try {

        axios
          .delete("http://api.onyx.inedit-gd.tn/classe/delete/" + this.props.selectedItems[i])
          .then(res => {
            NotificationManager.success(
              "Feuille d'appels supprimé",
              "FEUILLE D'APPELS",
              3000,
              null,
              null,
            );
            console.log(res.data);

            return this.props.callback();



          }, error => {
            NotificationManager.warning(
              "Erreur de suppression",
              "FEUILLE D'APPELS",
              3000,
              null,
              null,

            );

            return;

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
      toggleModal,
      selectedItems,
      feuille
    } = this.props;
    var d2 = moment(feuille.date, 'YYYY-MM-DD').format("DD-MM-YYYY");

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
                    <th>Trimestre</th>
                    <th>1</th>

                  </tr>
                  <tr>
                    <th>Domaine</th>
                    <th>anglais</th>
                  </tr>
                  <tr>
                    <th>Séance</th>
                    <th>08:00__10:00</th>
                  </tr>
                  <tr>
                    <th>Envoyé le</th>
                    <th>
                      {/* {d2} */}
                    22-09-2020
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
                          key={eleve.id}
                          eleve={eleve}
                          edit={false}
                        />
                      )
                    })
                    }


                  </tbody>


                </Table>


              </Colxx>

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
              <h1>Êtes-vous sûr de vouloir supprimer les {selectedItems.length} Feuilles d'appels ?</h1>

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

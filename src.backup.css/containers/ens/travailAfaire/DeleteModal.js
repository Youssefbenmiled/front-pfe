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
import Select from "react-select";
import CustomSelectInput from "../../../components/common/CustomSelectInput";
import IntlMessages from "../../../helpers/IntlMessages";
// import "./delete.css"
import { NotificationManager } from "../../../components/common/react-notifications";
import { Separator } from "../../../components/common/CustomBootstrap";
import moment from "moment"


class DeleteModal extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }


  supprimer = event => {
    event.preventDefault();


    for (var i = 0; i < this.props.selectedItems.length; i++) {

      try {

        axios
          .delete("http://api.onyx.inedit-gd.tn/travail/delete/" + this.props.selectedItems[i])
          .then(res => {


            NotificationManager.success(
              "Devoir supprimé",
              "DEVOIR",
              3000,
              null,
              null,
            );
            console.log(res.data);

            return this.props.callback();


          }, error => {
            NotificationManager.warning(
              "Erreur de suppression",
              "DEVOIR",
              3000,
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
      toggleModal,
      selectedItems,
      devoir
    } = this.props;
    var d1 = moment(devoir.dateEnvoi, 'YYYY-MM-DD').format('YYYY-MM-DD');
    var d2 = moment(devoir.dateEcheance, 'YYYY-MM-DD').format('YYYY-MM-DD');

    return (

      <Modal
        isOpen={modalOpen}
        toggle={toggleModal}
        wrapClassName="modal-left"
        backdrop="static"
        size="lg"
      >
        <ModalHeader toggle={toggleModal}>

        </ModalHeader>

        {selectedItems.length === 1 &&


          <ModalBody>
            <form onSubmit={this.supprimer}>

              <Colxx xxs="12" className="mb-3">

                <Table responsive hover bordered>
                  <tr>
                    <th>Classe</th>
                    <td>{devoir.niveau}{' '}{devoir.classe}A</td>
                  </tr>
                  <tr>
                    <th>Trimestre</th>
                    <td>{devoir.trimestre}1</td>

                  </tr>
                  <tr>
                    <th>Domaine</th>
                    <td>{devoir.domaine}العربية</td>
                  </tr>

                  <tr>
                    <th>Envoyé le</th>
                    <td>
                      {/* {d1} */}
                    30-10-2020
                    </td>
                  </tr>
                  <tr>
                    <th>Date d'échéance</th>
                    <td>
                      15-11-2020
                    {/* {d2} */}
                    </td>
                  </tr>
                  {devoir.description && devoir.description.trim().length > 0 &&
                    <tr>

                      <th>Description</th>
                      {devoir.description && <td> devoir.description</td>}
                    </tr>
                  }
                  {devoir.url &&
                    <tr>
                      <th>Fichier</th>
                      <td>

                        <a href={devoir.url} target="_blank" >
                          Voir fichier
                        </a>


                      </td>
                    </tr>
                  }

                </Table>

              </Colxx>


              <Button type="submit" color="secondary" id="supdev" onClick={toggleModal} >
                Supprimer
                </Button>

              <Button color="danger" onClick={this.annuler} id="supan">
                Annuler
              </Button>

            </form>
          </ModalBody>

        }

        {selectedItems.length > 1 &&



          <ModalBody>

            <form onSubmit={this.supprimer}>
              <h1>Êtes-vous sûr de vouloir supprimer les {selectedItems.length} travaux à faire ?</h1>
              <br></br>
              <br></br>
              <Button type="submit" color="secondary" id="supprimer" onClick={toggleModal} >
                Supprimer
              </Button>

              <Button color="danger" onClick={this.annuler} id="annuler">
                Annuler
                </Button>
            </form>
          </ModalBody>
        }
      </Modal>


    );
  }
}
export default DeleteModal;
{/* <Table responsive hover bordered>
                  <thead>
                    <th>Classe</th>
                    <th>Trimestre</th>
                    <th>Domaine</th>


                  </thead>
                  <tbody>
                    <td>{devoir.niveau}{" "}{devoir.nomClasse}</td>
                    <td>{devoir.trimestre}</td>
                    <td>{devoir.domaine}</td>
                  </tbody>
                </Table>
                <Table responsive hover bordered>
                  <thead>

                    <th>Description</th>
                    <th>Fichier</th>
                    <th colSpan="2">Date</th>

                  </thead>
                  <tbody>

                    <td>{devoir.description}</td>
                    <td>
                      <a href={devoir.url} target="_blank" >
                        Voir fichier
                       </a>
                    </td>
                    {devoir.dateEnvoi !== undefined &&

                      <td>
                        envoi : {moment(devoir.dateEnvoi, 'YYYY-MM-DD').format('YYYY-MM-DD')}
                      </td>
                    }

                    {devoir.dateEcheance !== undefined &&

                      <td>
                        échéance : {moment(devoir.dateEcheance, 'YYYY-MM-DD').format('YYYY-MM-DD')}
                      </td>
                    }




                  </tbody>


                </Table> */}
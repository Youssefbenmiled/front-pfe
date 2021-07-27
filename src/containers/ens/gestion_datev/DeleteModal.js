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
import moment from "moment"
import { Colxx } from "../../../components/common/CustomBootstrap";



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


    for (var i = 0; i < this.props.selectedItems.length; i++) {

      try {

        axios
          .delete("http://api.onyx.inedit-gd.tn/evaluation/delete/" + this.props.selectedItems[i])
          .then(res => {


            NotificationManager.success(
              "Evaluation supprimée avec succés",
              "EVALUATION",
              3000,
              null,
              null,
            );
            return this.props.callback();


          }, error => {
            NotificationManager.warning(
              "Erreur de suppression",
              "EVALUATION",
              5000,
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
    this.props.setST()
  }

  render() {
    const {
      modalOpen,
      toggleModal,
      selectedItems,
      exam
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
            size='lg'
          >
            <ModalHeader toggle={toggleModal}>

            </ModalHeader>

            <ModalBody>
              <form onSubmit={this.supprimer}>

                <Colxx xxs="12" className="mb-3">


                  <Table responsive hover bordered>

                    <tr>
                      <th>Classe</th>
                      <th>{exam.niveauClasse && exam.niveauClasse}{' '}{exam.nomClasse && exam.nomClasse}</th>

                    </tr>
                    <tr>
                      <th>Trimestre</th>
                      <th>{exam.trimestre && exam.trimestre}</th>

                    </tr>
                    <tr>
                      <th>Date évaluation</th>
                      <th>
                        {moment(exam.date && exam.date, 'YYYY-MM-DD').format("DD-MM-YYYY")}
                      </th>
                    </tr>
                    <tr>
                      <th>Domaine</th>
                      <th>{exam.domaine && exam.domaine}</th>
                    </tr>
                    {exam.description && exam.description.trim().length > 0 &&
                      <tr>
                        <th>Description</th>
                        <th>{exam.description}</th>
                      </tr>
                    }


                  </Table>
                </Colxx>
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
              <form onSubmit={this.supprimer}>
                <h1>Êtes-vous sûr de vouloir supprimer les {selectedItems.length} dates d'évaluations ?</h1>
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
                      onClick={this.annuler}
                    >
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

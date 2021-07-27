import React, { Component } from "react";
import {
  CustomInput,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label
} from "reactstrap";
import axios from "axios"
import { NotificationManager } from "../../../components/common/react-notifications";
// import "./delete.css"
class DeleteModal extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }


  handleSubmit = event => {
    event.preventDefault();


    try {
      axios
        .delete("http://api.onyx.inedit-gd.tn/emlpoi/delete/" + parseInt(this.props.items[0].id))
        .then(res => {
          console.log(res)
          this.props.callback();
          NotificationManager.success(
            "Supression effectuée",
            "EMPLOI CLASSE",
            3000,
            null,
            null,
          );

          return res.data;
        })
        .then(data => {
        }, error => {
          NotificationManager.error(
            "Erreur de suppression",
            "EMPLOI CLASSE",
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


  render() {
    const {
      modalOpen,
      toggleModal,
      niveau,
      classe,
      items
    } = this.props;


    return (

      <Modal
        isOpen={modalOpen}
        toggle={toggleModal}
        wrapClassName="modal-left"
        backdrop="static"
      >
        <ModalBody>
          {classe &&
            <h2>
              SUPPRESSION DE L'EMPLOI DE LA CLASSE {niveau + "" + classe.label}
            </h2>
          }
          <br></br>
          <form onSubmit={this.handleSubmit}>


            <Button
              color="secondary"
              type="submit"
              id="ajouter"
              onClick={toggleModal}

            >
              Supprimer
            </Button>
            <Button
              color="danger"
              onClick={toggleModal}
              id="annuler"
            >
              Annuler
            </Button>
          </form>
        </ModalBody>
      </Modal>

    );
  }
}
export default DeleteModal;

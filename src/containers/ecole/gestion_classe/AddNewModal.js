import React, { Component, Fragment } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
} from "reactstrap";
import {
  AvForm,
  AvGroup,
  AvInput,
  AvFeedback,
} from "availity-reactstrap-validation";
import axios from "axios"
import { NotificationManager } from "../../../components/common/react-notifications";
import { Separator } from "../../../components/common/CustomBootstrap";

class AddNewModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      files: undefined
    };
  }



  handleSubmit = (event, errors, values) => {
    event.preventDefault();
    if (!localStorage.getItem('user_id'))
      return this.props.handleLogout();

    let { nom } = values
    nom = nom.trim().slice(0, 1).toUpperCase() + nom.trim().slice(1, nom.length)
    if (errors.length === 0) {
      NotificationManager.primary(
        "Requête en cours",
        "CLASSE",
        500,
        null,
        null,
      );
      try {
        const data = {
          niveau: this.props.niveau.toString(),
          nbEleves: 0,
          Nom: nom
        }
        this.props.toggleModal();


        axios({
          method: 'post',
          url: 'http://api.onyx.inedit-gd.tn/classe/add',
          data: data,
        })
          .then(res => {
            NotificationManager.success(
              "Classe ajoutée avec succés",
              "CLASSE",
              3000,
              null,
              null,
            );

            return this.props.callback();

          },
            error => {
              NotificationManager.warning(
                "Classe exsite",
                "CLASSE",
                5000,
                null,
                null,
              );
              return error;
            }

          )


      } catch (error) {
        return error;

      }
    }
  }



  render() {
    const { modalOpen, toggleModal } = this.props;
    let defaultValues = {
      nom: "",
    };
    return (
      <>


        <Modal
          isOpen={modalOpen}
          toggle={toggleModal}
          wrapClassName="modal-left"
          backdrop="static"
        >
          <ModalHeader toggle={toggleModal}
          ></ModalHeader>



          <ModalBody>


            <AvForm
              className="av-tooltip tooltip-label-right"
              model={defaultValues}
              onSubmit={this.handleSubmit}>
              <br></br>
              <br></br>


              <AvGroup>
                <Label>Nom classe :</Label>
                <AvInput name="nom" required />
                <AvFeedback>Veuillez saisir le nom de la classe</AvFeedback>
              </AvGroup>





              <br></br>
              <br></br>
              <div className="row">
                <div className="col-12 col-md-6 mt-3">
                  <Button className="w-100" color="secondary" type="submit">
                    Confirmer
                </Button>
                </div>
                <div className="col-12 col-md-6 mt-3">
                  <Button className="w-100"
                    color="danger"
                    onClick={toggleModal}>
                    Annuler
                 </Button>
                </div>

              </div>

            </AvForm>





          </ModalBody>





        </Modal>




      </>


    );
  }
}
export default AddNewModal;


import React, { Component, Fragment } from "react";
import {
  CustomInput,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
} from "reactstrap";
import {
  AvForm,
  AvField,
  AvGroup,
  AvInput,
  AvFeedback,
  AvRadioGroup,
  AvRadio,
  AvCheckboxGroup,
  AvCheckbox
} from "availity-reactstrap-validation";
import axios from "axios"
import Select from "react-select";
import CustomSelectInput from "../../../components/common/CustomSelectInput";
import IntlMessages from "../../../helpers/IntlMessages";
// import "./add.css"
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
    let { niveau, nom } = values
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
            console.log(res)

            return this.props.callback();

          },
            error => {
              console.log(error)
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
        console.log("failed" + error);

      }
    }
  }



  render() {
    const { modalOpen, toggleModal, niveau, setST } = this.props;
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

              {/* {!niveau &&
                <AvField
                  type="select"
                  name="niveau"
                  required
                  label="Niveau classe :"
                  validate={{
                    required: {
                      value: true,
                      errorMessage: "Entrez un niveau S'il vous plaît"
                    }
                  }}
                >
                  <option></option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>

                </AvField>
              } */}


              <AvGroup>
                <Label>Nom classe :</Label>
                <AvInput name="nom" required />
                <AvFeedback>Veuillez saisir le nom de la classe</AvFeedback>
              </AvGroup>





              <br></br>
              <br></br>
              <Button
                color="secondary"
                id="add"
              >
                Ajouter{" "}
              </Button>{" "}
              <Button
                color="danger"
                onClick={toggleModal}
                id="annuler">
                Annuler{" "}
              </Button>
            </AvForm>





          </ModalBody>





        </Modal>




      </>


    );
  }
}
export default AddNewModal;


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
  FormGroup
} from "reactstrap";
import axios from "axios"
import { NotificationManager } from "../../../components/common/react-notifications";
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
import Select from "react-select";
import CustomSelectInput from "../../../components/common/CustomSelectInput";
import IntlMessages from "../../../helpers/IntlMessages";
// import "./update.css"
class UpdateModal extends Component {

  constructor(props) {
    super(props);

    this.state = {
    };
  }



  handleSubmit = (event, errors, values) => {
    event.preventDefault();
    let { nom } = values
    const { classe } = this.props
    if (classe.Nom.localeCompare(nom) === 0) {
      NotificationManager.warning(
        "Aucune modification n'a été effectuée",
        "CLASSE",
        5000,
        null,
        null,
      );

      return;
    }

    nom = nom.trim().slice(0, 1).toUpperCase() + nom.trim().slice(1, nom.length)

    if (errors.length === 0) {
      NotificationManager.primary(
        "Requête en cours",
        "CLASSE",
        500,
        null,
        null,
      );
      const data = {
        id: classe.id,
        niveau: classe.niveau,
        Nom: nom,

      }
      this.props.toggleModal();

      try {
        axios
          .put(
            "http://api.onyx.inedit-gd.tn/classe/update", data)
          .then(res => {
            console.log(res);

            this.props.setST()
            NotificationManager.success(
              "Classe modifiée avec succés",
              "CLASSE",
              3000,
              null,
              null,
            );
            return this.props.callback();

          }, error => {
            console.log(error)
            NotificationManager.warning(
              "Classe existe",
              "CLASSE",
              5000,
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
  }
  annuler = () => {

    this.props.toggleModal();
    this.props.setST()

  }
  render() {
    const {
      modalOpen,
      toggleModal,
      classe,
    } = this.props;

    const defaultValues = {
      id: this.props.classe.id,
      nom: classe.Nom,
      niveau: classe.niveau,
    }



    return (
      <Modal
        isOpen={modalOpen}
        toggle={toggleModal}
        wrapClassName="modal-left"
        backdrop="static"
      >
        <ModalHeader toggle={toggleModal}
        ></ModalHeader>

        <ModalBody>
          {/* <center>
            <h1>Modification de la classe {classe.niveau}{classe.Nom}</h1>
          </center> */}

          <AvForm
            onSubmit={this.handleSubmit}
            model={defaultValues}
            className="av-tooltip tooltip-right-bottom"
          >


            <AvGroup className="error-t-negative">
              <Label for="nom">Nom classe :</Label>
              <AvField
                name="nom" id="nom" required
                validate={{
                  required: {
                    value: true,
                    errorMessage: "Veuillez saisir le nom de la classe"
                  },
                  pattern: {
                    value: "^[A-Za-z ]+$",
                    errorMessage: "Votre nom doit être composé uniquement de lettres"
                  },


                }} />
            </AvGroup>
            <br></br>
            <br></br>
            <FormGroup className="mb-0">
              <Button

                color="secondary"
                id="modifier">
                Modifier{" "}
              </Button>
              <Button
                type="reset"
                color="danger"
                onClick={this.annuler}
                id="annuler">
                Annuler{" "}
              </Button>

            </FormGroup>
          </AvForm>
        </ModalBody>



      </Modal>
    );
  }
}
export default UpdateModal;


{/* <AvGroup className="error-t-negative">

              <AvField type="select" name="niveau" label="Niveau :"
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>

              </AvField>
            </AvGroup> */}

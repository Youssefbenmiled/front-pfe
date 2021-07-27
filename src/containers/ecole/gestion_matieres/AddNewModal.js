import React, { Component, Fragment } from "react";
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
import Select from "react-select";
import CustomSelectInput from "../../../components/common/CustomSelectInput";
import IntlMessages from "../../../helpers/IntlMessages";
// import "./add.css"
import axios from "axios"
import { NotificationManager } from "../../../components/common/react-notifications";
import { Separator } from "../../../components/common/CustomBootstrap";
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
class AddNewModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handleSubmit = (event, errors, values) => {
    event.preventDefault();
    if (!localStorage.getItem('user_id'))
      return this.props.handleLogout();


    const { mat, coef } = values

    if (errors.length === 0) {
      NotificationManager.primary(
        "Requête en cours",
        "MATIERE",
        500,
        null,
        null,
      );

      try {


        let data = {
          nom: mat.trim(),
          coeficient: parseFloat(coef),
          domaine: this.props.domaine.value

        }
        this.props.toggleModal();
        axios({
          method: 'post',
          url: 'http://api.onyx.inedit-gd.tn/matiere/add',
          data: data
        })
          .then(res => {
            NotificationManager.success(
              "Ajout avec succés",
              "MATIERE",
              3000,
              null,
              null,
            );

            return this.props.callback();

          },
            error => {
              NotificationManager.warning(
                "Erreur d'ajout",
                "MATIERE",
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
    };
  }




  render() {
    const { modalOpen, toggleModal, niveau, domaine } = this.props;
    const defaultValues = {
      mat: "",
      coef: ""
    };
    return (
      <Modal
        isOpen={modalOpen}
        toggle={toggleModal}
        wrapClassName="modal-left"
        backdrop="static"
      >

        <ModalBody>

          <br></br>
          <center>
            {domaine && niveau ?
              <h2>
                Ajout d'une matiére dans le domaine {domaine.label} et le niveau {niveau.niveau}
              </h2>
              : null}
          </center>

          <AvForm
            onSubmit={this.handleSubmit}
            className="av-tooltip tooltip-label-right"
            model={defaultValues}>
            <br></br>

            <AvGroup className="error-t-negative">
              <Label for="mat">Matiére :</Label>
              <AvField name="mat" id="mat" required
                validate={{
                  required: {
                    value: true,
                    errorMessage: "Veuillez saisir la matiére"
                  },
                  // pattern: {
                  //   value: "^[A-Za-z_]+$",
                  //   errorMessage: "La matiére doit être composé uniquement de lettres"
                  // },
                }}
              />
            </AvGroup>
            <AvGroup className="error-t-negative">
              <Label for="coef">coefficient :</Label>
              <AvField name="coef" id="coef"
                type="number"
                min="0.1"
                step="0.1"
                required
                validate={{
                  required: {
                    value: true,
                    errorMessage: "Veuillez saisir le coefficient de la matiére"
                  },
                  pattern: {
                    value: "^[0-9.,]+$",
                    errorMessage: "Le coefficient doit être composé uniquement des chiffres"
                  },

                }}
              />
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
    );
  }
}


export default AddNewModal;

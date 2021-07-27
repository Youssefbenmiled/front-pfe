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
// import "./add.css"
import { Separator } from "../../../components/common/CustomBootstrap";

import axios from "axios"
import { NotificationManager } from "../../../components/common/react-notifications";
class AddNewModal extends Component {
  constructor(props) {
    super(props);
    this.state = {

      files: undefined,
      valueSem: null,
      isSubmited: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.classe) {
      this.setState({ valueSem: null, files: undefined, isSubmited: false })
    }
  }


  handleSubmit = (event, errors, values) => {
    event.preventDefault();
    const { valueSem, files } = this.state
    this.setState({ isSubmited: true })



    if (errors.length === 0 && valueSem && files) {
      let data = new FormData()
      data.append('file', files);
      data.append('idClasse', this.props.classe.value)
      data.append('trimestre', valueSem.value)

      try {
        axios({
          method: 'post',
          url: 'http://api.onyx.inedit-gd.tn/emploi/add',
          data: data,
          headers: { 'Content-Type': 'multipart/form-data' }
        })
          .then(res => {
            NotificationManager.success(
              "Insértion avec succés",
              "FICHIER DES NOTES",
              3000,
              null,
              null,
            );

            this.props.callback();
            this.props.toggleModal();

          },
            error => {
              console.log(error)
              NotificationManager.warning(
                "Vérifier le fichier",
                "FICHIER DES NOTES",
                3000,
                null,
                null,
              );
            }

          )


      } catch (error) {
        console.log("failed" + error);
      }
    }


  };


  handleChangeSem = (value) => {
    this.setState({ valueSem: value })
  }

  upload = (event) => {
    let files = event.target.files[0]
    this.setState({ files })
  }
  render() {
    const { modalOpen, toggleModal, classe, niveau } = this.props;

    const sem = [
      { label: 1, value: 1 },
      { label: 2, value: 2 },
      { label: 3, value: 3 }
    ];

    let defaultValues = {
    };

    return (
      <Modal
        isOpen={modalOpen}
        toggle={toggleModal}
        wrapClassName="modal-left"
        backdrop="static"
      >
        <ModalHeader
          toggle={toggleModal}
        >

        </ModalHeader>

        <ModalBody>
          {/* {classe &&
            <center>
              <h2>INSERER UN FICHIER DES NOTES {niveau + "" + classe.label}</h2>
            </center>
          }
          <br></br> */}
          <AvForm
            className="av-tooltip tooltip-label-right"
            model={defaultValues}
            onSubmit={this.handleSubmit}>
            <Label>Trimestre :</Label>

            <div className="error-t-negative position-relative">
              <Select
                onChange={this.handleChangeSem}
                value={this.state.valueSem}
                options={sem}
                className="react-select position-relative"
                placeholder="Sélectionner un trimestre..."
                classNamePrefix="react-select"
                name="form-field-name"
                required
              />
              {this.state.valueSem == null && this.state.isSubmited &&
                <>
                  <div className="av-invalid is-invalid form-control d-none"></div>
                  <div class="invalid-feedback">Entrez un trimestre S'il vous plaît</div>
                </>
              }
            </div>

            <br></br>

            <AvGroup className="error-t-negative">
              <Label for="file">Fichier PDF :</Label>
              <div className="error-t-negative position-relative">
                <AvField
                  name="file"
                  type="file"
                  onChange={this.upload}
                  accept="application/pdf,application/vnd.ms-excel"

                />
                {this.state.files == undefined && this.state.isSubmited &&
                  <>
                    <div className="av-invalid is-invalid form-control d-none"></div>
                    <div class="invalid-feedback">Fichier obligatoire </div>
                  </>
                }
              </div>
            </AvGroup>


            <br></br>
            <br></br>
            <br></br>

            <Button
              color="secondary"
              type="submit"
              id="ajouter"
            >
              Insérer
              </Button>
            <Button
              color="danger"
              onClick={toggleModal}
              id="annuler"
            >
              Annuler
              </Button>
          </AvForm>



        </ModalBody>

      </Modal>
    );
  }
}


export default AddNewModal;

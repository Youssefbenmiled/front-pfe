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

  handleChangeSem = (value) => {
    this.setState({ valueSem: value })
  }

  handleSubmit = (event, errors, values) => {
    event.preventDefault();
    const { valueSem, files } = this.state
    this.setState({ isSubmited: true })



    if (errors.length === 0 && valueSem && files) {
      NotificationManager.primary(
        "Requête en cours",
        "EMPLOI ENSEIGNANT",
        500,
        null,
        null,
      );



      let data = new FormData()
      data.append('file', this.state.files);
      data.append('idEleve', this.props.eleve.value);
      data.append('semestre', this.state.valueSem.value);
      this.props.toggleModal();

      try {
        axios({
          method: 'post',
          url: 'http://api.onyx.inedit-gd.tn/note/add',
          data: data,
          headers: { 'Content-Type': 'multipart/form-data' }
        })
          .then(res => {
            NotificationManager.success(
              "Carnet crée",
              "CARNET DE NOTE",
              3000,
              null,
              null,
            );
            return this.props.callback();

          },
            error => {
              console.log(error)

              NotificationManager.warning(
                "Vérifier le trimestre et la taille du fichier",
                "CARNET DE NOTE",
                5000,
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


  componentWillReceiveProps(nextProps) {
    this.setState({ valueSem: null, files: undefined, isSubmited: false })

  }

  upload = (event) => {
    let files = event.target.files[0]
    console.log(event.target.files[0], 'ffiless')
    this.setState({ files })

  }
  render() {
    const { modalOpen, toggleModal } = this.props;
    let defaultValues = {};
    const sem = [
      { label: 1, value: 1 },
      { label: 2, value: 2 },
      { label: 3, value: 3 }
    ];

    return (
      <Modal
        isOpen={modalOpen}
        toggle={toggleModal}
        wrapClassName="modal-left"
        backdrop="static"
      >

        <ModalBody>

          <ModalHeader toggle={toggleModal}>

          </ModalHeader>
          <br></br>
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
                  <div class="invalid-feedback">Veuillez saisir le trimestre</div>
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
                    <div class="invalid-feedback">Veuillez insérer un fichier</div>
                  </>
                }
              </div>
            </AvGroup>


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

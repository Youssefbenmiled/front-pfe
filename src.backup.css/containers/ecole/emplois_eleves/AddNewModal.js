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
      files: undefined
    };
  }




  handleSubmit = (event, errors, values) => {
    event.preventDefault();


    const { files } = this.state
    this.setState({ isSubmited: true })



    if (errors.length === 0 && files) {
      NotificationManager.primary(
        "Requête en cours",
        "EMPLOI CLASSE",
        500,
        null,
        null,
      );
      let data = new FormData()
      data.append('file', this.state.files);
      data.append('idClasse', this.props.classe.value)
      this.props.toggleModal();

      try {
        axios({
          method: 'post',
          url: 'http://api.onyx.inedit-gd.tn/emploi/add',
          data: data,
          headers: { 'Content-Type': 'multipart/form-data' }
        })
          .then(res => {
            NotificationManager.success(
              "Insertion avec succés",
              "EMPLOI CLASSE",
              3000,
              null,
              null,
            );

            this.props.callback();

          },
            error => {
              console.log(error)
              NotificationManager.warning(
                "Emploi existant",
                "EMPLOI CLASSE",
                5000,
                null,
                null,
              );
            }

          )


      }
      catch (error) {
        console.log("failed" + error);
      }

    }
  };


  componentWillReceiveProps(nextProps) {
    this.setState({ files: undefined, isSubmited: false })

  }


  upload = (event) => {
    let files = event.target.files[0]
    this.setState({ files })
  }

  render() {
    const { modalOpen, toggleModal } = this.props;
    let defaultValues = {}

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

          <AvForm
            className="av-tooltip tooltip-label-right"
            model={defaultValues}
            onSubmit={this.handleSubmit}>

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

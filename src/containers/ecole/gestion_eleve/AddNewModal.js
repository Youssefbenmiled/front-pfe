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
import axios from "axios"
import { NotificationManager } from "../../../components/common/react-notifications";
import { levels } from "../../../constants/defaultValues";
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
import moment from "moment";

class AddNewModal extends Component {
  constructor(props) {
    super(props);
    this.state = {

      valueNiveau: "",
      valueClasse: "",
      valueType: "",
      files: undefined,
      yahasra: (new Date().getUTCFullYear() - 15) + "-" + (1) + "-" + (1),
      isSubmitedCSV: false,

      isSubmited: false

    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps)
      this.setState({
        valueNiveau: "",
        valueClasse: "",
        valueType: "",
        files: undefined,
        isSubmitedCSV: false,
        isSubmited: false

      })
  }


  handleSubmit = (event, errors, values) => {
    event.preventDefault();
    if (!localStorage.getItem('user_id'))
      return this.props.handleLogout();
    this.setState({ isSubmited: true })
    const { idclasse } = this.props
    const { nom, prenom, sexe, dns } = values

    if (idclasse && errors.length === 0) {
      NotificationManager.primary(
        "Requête en cours",
        "ELEVE",
        500,
        null,
        null,
      );
      try {

        const data = {
          Nom: nom,
          prenom: prenom,
          dateNaissance: dns,
          sexe: sexe,
          classe: idclasse,
        }
        this.props.toggleModal();

        axios({
          method: 'post',
          url: 'http://api.onyx.inedit-gd.tn/eleve/add',
          data: data,
          headers: { 'Content-Type': 'multipart/form-data' }
        })
          .then(res => {
            NotificationManager.success(
              "Ajout avec succés",
              "ELEVE",
              3000,
              null,
              null,
            );

            return this.props.callback();

          },
            error => {
              NotificationManager.error(
                "Erreur d'ajout",
                "ELEVE",
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
  componentWillReceiveProps(nextProps) {
    if (nextProps)
      this.setState({
        valueNiveau: "",
        valueClasse: "",
        valueType: "",
        file: undefined,
        isSubmitedCSV: false
      })
  }



  handleSubmitCSV = (event, errors, values) => {
    event.preventDefault();
    this.setState({ isSubmitedCSV: true })

    const { files } = this.state;
    if (files && errors.length === 0) {
      NotificationManager.primary(
        "Requête en cours",
        "ELEVE",
        500,
        null,
        null,
      );
      this.props.toggleModal();
      try {

        let data = new FormData();
        data.append('file', files)

        axios({
          method: 'post',
          url: 'http://api.onyx.inedit-gd.tn/eleve/add',
          data: data,
          headers: { 'Content-Type': 'multipart/form-data' }

        })
          .then(res => {
            NotificationManager.success(
              "Insertion avec succés",
              "FICHIER DES ELEVES",
              3000,
              null,
              null,
            );
            return this.props.callback();

          },
            error => {
              NotificationManager.warning(
                "Vérifier le fichier",
                "FICHIER DES ELEVES",
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


  upload = (event) => {
    let files = event.target.files[0]
    this.setState({ files })

  }

  render() {

    const { modalOpen, toggleModal, idclasse } = this.props;

    var date = moment(new Date(), 'YYYY-MM-DD').format('YYYY-MM-DD');
    var date2 = moment(this.state.yahasra, 'YYYY-MM-DD').format('YYYY-MM-DD');

    const defaultValues = {
      nom: "",
      prenom: "",
      sexe: "",
      dns: "",
    };


    let df = {};

    return (


      <Modal
        isOpen={modalOpen}
        toggle={toggleModal}
        wrapClassName="modal-left"
        backdrop="static"
      >

        <ModalHeader toggle={toggleModal}>

        </ModalHeader>
        <ModalBody>
          <br></br>
          <br></br>

          {!idclasse &&

            <AvForm
              className="av-tooltip tooltip-label-right"
              model={df}
              onSubmit={this.handleSubmitCSV}>

              <AvGroup className="error-t-negative">
                <Label for="file">Fichier des éléves(CSV/EXCEL) : </Label>
                <div className="error-t-negative position-relative">
                  <AvField
                    name="file"
                    type="file"
                    onChange={this.upload}
                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"

                  />
                  {this.state.files === undefined && this.state.isSubmitedCSV &&
                    <>
                      <div className="av-invalid is-invalid form-control d-none"></div>
                      <div class="invalid-feedback">Veuillez insérer un fichier</div>
                    </>
                  }
                </div>
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
          }

          {idclasse &&

            <AvForm
              onSubmit={this.handleSubmit}
              model={defaultValues}
              className="av-tooltip tooltip-right-bottom"
            >



              <AvGroup className="error-t-negative">

                <Label for="nom">Nom :</Label>
                <AvField
                  name="nom"
                  id="nom"
                  required
                  validate={{
                    required: {
                      value: true,
                      errorMessage: "Veuillez saisir le nom"
                    },
                    pattern: {
                      value: "^[A-Za-z ]+$",
                      errorMessage: "le nom doit être composé uniquement de lettres"
                    },
                    minLength: {
                      value: 3,
                      errorMessage:
                        "3 caractéres minimum !"
                    },

                  }} />

              </AvGroup>

              <AvGroup className="error-t-negative">
                <Label for="prenom">Prénom :</Label>
                <AvField
                  name="prenom"
                  id="prenom"
                  required
                  validate={{
                    required: {
                      value: true,
                      errorMessage: "Veuillez saisir le prénom"
                    },
                    pattern: {
                      value: "^[A-Za-z ]+$",
                      errorMessage: "le prénom doit être composé uniquement de lettres"
                    },
                    minLength: {
                      value: 3,
                      errorMessage:
                        "3 caractéres minimum !"
                    },

                  }} />

              </AvGroup>
              <AvGroup className="error-t-negative">
                <Label for="dns">Date naissance :</Label>
                <AvField
                  name="dns"
                  type="date"
                  value={defaultValues.dns}
                  required
                  min={date2}
                  max={date}
                  validate={{
                    required: {
                      value: true,
                      errorMessage: "Veuillez saisir la date naissance"
                    },

                  }}
                />
              </AvGroup>
              <AvRadioGroup
                className="error-l-150"
                name="sexe"
                required
                validate={{
                  required: {
                    value: true,
                    errorMessage: "Veuillez saisir le genre"
                  },

                }}>
                <Label className="d-block">Genre :</Label>
                <AvRadio customInput label="Masculin" value="Masculin" />
                <AvRadio customInput label="Féminin" value="Féminin" />

              </AvRadioGroup>

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
          }

        </ModalBody>


      </Modal>




    );

  }
}

export default AddNewModal;

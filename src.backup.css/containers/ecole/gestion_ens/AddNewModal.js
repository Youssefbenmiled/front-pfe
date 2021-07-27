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
// import "./add.css";
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
class AddNewModal extends Component {
  constructor(props) {
    super(props);
    this.state = {

      valueNiveau: [],
      valueClasse: [],
      valueDomaine: [],
      files: undefined,
      valueType: null,
      classet: [],
      domainet: [],
      isSubmited: false,
      isSubmitedCSV: false,

    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      this.setState({
        valueNiveau: [],
        valueClasse: [],
        valueDomaine: [],
        isSubmited: false,
        isSubmitedCSV: false,
        classet: [],
        domainet: [],
        files: undefined,

      })
    }

  }

  handlechangeNiveau = (value) => {
    this.setState({ valueNiveau: value, valueClasse: [], classet: [], valueDomaine: [], domainet: [] },
      this.classes(value),
      this.domaines(value)
    )


  }
  handleChangeClasse = (value) => {
    this.setState({ valueClasse: value })
  }
  handleChangeDomaine = (value) => {
    this.setState({ valueDomaine: value })
  }

  handleChangeType = value => {
    this.setState({
      valueType: value
    });
  }
  handleSubmit = (event, errors, values) => {
    event.preventDefault();
    this.setState({ isSubmited: true })
    const { nom, prenom, email, adresse, tel } = values
    const { valueClasse, valueDomaine } = this.state;


    if (errors.length === 0 && valueClasse.length > 0 && valueDomaine.length > 0) {
      NotificationManager.primary(
        "Requête en cours",
        "ENSEIGNANT",
        500,
        null,
        null,
      );

      try {

        const data = {
          "nom": nom.trim(),
          "prenom": prenom.trim(),
          "email": email,
          "adresse": adresse.trim(),
          "numTel": tel,
          "password": "",
          "statut": "actif",
          "roles": "ENS",
          "classe": valueClasse.map(x => x.value),
          "domaine": valueDomaine.map(x => x.value)

        }
        this.props.toggleModal();

        axios({
          method: 'post',
          url: 'http://api.onyx.inedit-gd.tn/enseignant/add',
          data: data,
        })
          .then(res => {
            NotificationManager.success(
              "Enseignant ajouté",
              "ENSEIGNANT",
              3000,
              null,
              null,
            );
            return this.props.callback();

          },
            error => {
              NotificationManager.warning(
                "Vérifier l'email",
                "ENSEIGNANT",
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
    };
  }

  domaines(niveau) {

    niveau = niveau.map(n => n.value).join(',');
    try {
      axios
        .get(
          "http://api.onyx.inedit-gd.tn/domaine/niveau/" + niveau)
        .then(res => {
          return res.data;
        })
        .then(data => {

          this.setState({
            domainet: data,

          });
        }, error => {
          console.log(error)
        });
    }
    catch (error) {
      console.log("failed" + error)
    }
  }


  classes(niveau) {
    niveau = niveau.map(n => n.value).join(',');

    try {
      axios
        .get(
          "http://api.onyx.inedit-gd.tn/classe/classe/" + niveau)
        .then(res => {
          return res.data;
        })
        .then(data => {

          this.setState({
            classet: data,

          });
        }, error => {
          console.log(error)
        });
    }
    catch (error) {
      console.log("failed" + error)
    }
  }


  upload = (event) => {
    let files = event.target.files[0]
    this.setState({ files })
  }

  handleSubmitCSV = (event, errors, values) => {
    event.preventDefault();
    this.setState({ isSubmitedCSV: true })

    const { files } = this.state;
    if (files) {
      NotificationManager.primary(
        "Requête en cours",
        "ENSEIGNANT",
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
          url: 'http://api.onyx.inedit-gd.tn/enseignant/add',
          data: data,
          headers: { 'Content-Type': 'multipart/form-data' }

        })
          .then(res => {
            NotificationManager.success(
              "Insertion avec succés",
              "FICHIER DES ENSEIGNANTS",
              3000,
              null,
              null,
            );
            return this.props.callback();

          },
            error => {
              NotificationManager.warning(
                "Vérifier le fichier",
                "FICHIER DES ENSEIGNANTS",
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
    const { modalOpen, toggleModal, } = this.props;
    const { valueType, valueDomaine, valueNiveau, valueClasse } = this.state;

    let defaultValues = {
      nom: "",
      prenom: "",
      email: "",
      adresse: "",
      tel: "",
      classe: [],
      domaine: []

    };
    let df = {}



    const cs = this.state.classet.map((c, i) => {
      return { label: c.niveau + ")" + c.Nom, value: c.id };
    })
    const dm = this.state.domainet.map((d, i) => {
      return { label: d.niveau + ")" + d.nom, value: d.id };
    })
    const types = [
      { label: "Insertion par fichier", value: "fichier" },
      { label: "Insertion manuelle", value: "manuelle" },
    ];
    return (
      <>

        <Modal
          isOpen={modalOpen}
          toggle={toggleModal}
          wrapClassName="modal-left"
          backdrop="static"
        >
          <ModalHeader toggle={toggleModal}></ModalHeader>

          <ModalBody>
            <br></br>
            <Label>
              <h3>Type :</h3>
            </Label>
            <Select
              onChange={this.handleChangeType}
              value={valueType}
              options={types}
              className="react-select"
              placeholder="Sélectionner un type d'insertion..."
              classNamePrefix="react-select"
              name="form-field-name"
              required
            />
            <br></br>
            <br></br>
            {!valueType &&
              <Button
                color="danger"
                onClick={toggleModal}
                id="anntyp">
                Annuler
            </Button>
            }
            {valueType && valueType.value === "fichier" &&

              <AvForm
                className="av-tooltip tooltip-label-right"
                model={df}
                onSubmit={this.handleSubmitCSV}>

                <AvGroup className="error-t-negative">
                  <Label for="file">Fichier des enseignants(CSV/EXCEL) : </Label>
                  <div className="error-t-negative position-relative">
                    <AvField
                      name="file"
                      type="file"
                      onChange={this.upload}
                      accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"

                    />
                    {this.state.files == undefined && this.state.isSubmitedCSV &&
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
                  id="annulerCSV"
                >
                  Annuler
              </Button>
              </AvForm>



            }

            {valueType && valueType.value === "manuelle" &&
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
                        errorMessage: "le prenom doit être composé uniquement de lettres"
                      },
                      minLength: {
                        value: 3,
                        errorMessage:
                          "3 caractéres minimum !"
                      },

                    }} />

                </AvGroup>
                <AvGroup className="error-t-negative">
                  <Label for="email">Email :</Label>
                  <AvField
                    name="email"
                    type="email"
                    validate={{
                      required: {
                        value: true,
                        errorMessage: "Veuillez saisir l'adresse email"
                      },
                      email: {
                        value: true,
                        errorMessage: "Veuillez saisir une adresse email valide"
                      }
                    }}
                  />
                </AvGroup>

                <AvGroup className="error-t-negative">
                  <Label for="adresse">Adresse :</Label>
                  <AvField
                    name="adresse"
                    id="adresse"
                    validate={{
                      required: {
                        value: true,
                        errorMessage: "Veuillez saisir l'adresse"
                      },

                    }}
                  />
                </AvGroup>
                <AvGroup className="error-t-negative">
                  <Label for="tel">N° Téléphone :</Label>
                  <AvField
                    name="tel"
                    type="number"
                    min="1"
                    validate={{
                      required: {
                        value: true,
                        errorMessage: "Veuillez saisir le N° de téléphone"
                      },
                      pattern: {
                        value: "^[0-9]+$",
                        errorMessage: "le N° de Téléphone doit être composé de 8 chiffres"
                      },
                      minLength: {
                        value: 8,
                        errorMessage: "le N° de Téléphone doit être composé de 8 chiffres"
                      },
                      maxLength: {
                        value: 8,
                        errorMessage: "le N° de Téléphone doit être composé de 8 chiffres"
                      },
                    }}
                  />
                </AvGroup>
                <br></br>
                <center><h2>
                  Enseigne
                  </h2></center>
                <br></br>
                <Label>
                  Niveau (x):
                </Label>
                <div className="error-t-negative position-relative">

                  <Select
                    onChange={this.handlechangeNiveau}
                    value={valueNiveau}
                    options={levels}
                    className="react-select"
                    placeholder="Sélectionner un niveau..."
                    classNamePrefix="react-select"
                    name="niveau"
                    required
                    isMulti

                  />
                  <br></br>
                  {valueNiveau.length === 0 && this.state.isSubmited &&
                    <>
                      <div className="av-invalid is-invalid form-control d-none"></div>
                      <div class="invalid-feedback">Veuillez saisir au moins un niveau</div>
                    </>
                  }
                </div>
                <Label>
                  Classe (s):
                  </Label>
                <div className="error-t-negative position-relative">

                  <Select
                    onChange={this.handleChangeClasse}
                    value={valueClasse}
                    options={cs}
                    className="react-select"
                    placeholder="Sélectionner une classe ..."
                    classNamePrefix="react-select"
                    name="classe"
                    required
                    isMulti

                  />
                  <br></br>
                  {valueClasse.length === 0 && this.state.isSubmited &&
                    <>
                      <div className="av-invalid is-invalid form-control d-none"></div>
                      <div class="invalid-feedback"> Veuillez saisir au moins une classe</div>
                    </>
                  }
                </div>
                <Label>
                  Domaine (s):
                  </Label>
                <div className="error-t-negative position-relative">

                  <Select
                    onChange={this.handleChangeDomaine}
                    value={valueDomaine}
                    options={dm}
                    className="react-select"
                    placeholder="Sélectionner un domaine..."
                    classNamePrefix="react-select"
                    name="domaine"
                    required
                    isMulti

                  />
                  <br></br>
                  <br></br>
                  {valueDomaine.length === 0 && this.state.isSubmited &&
                    <>
                      <div className="av-invalid is-invalid form-control d-none"></div>
                      <div class="invalid-feedback"> Veuillez saisir au moins un domaine</div>
                    </>
                  }
                </div>
                <Button
                  color="secondary"
                  id="addaddens">
                  Ajouter{" "}
                </Button>
                <Button
                  color="danger"
                  onClick={toggleModal}
                  id="addannens">
                  Annuler{" "}
                </Button>


              </AvForm>
            }
          </ModalBody>


        </Modal>


      </>
    );
  }
}


export default AddNewModal;

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
import { levels } from "../../../constants/defaultValues";
import { NotificationManager } from "../../../components/common/react-notifications";
import moment from "moment";
class AddNewModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      img: undefined,
      files: undefined,
      isSubmited: false,
      valueClasse: [],
      valueNiveau: [],
      classet: [],
      checked: "Public",
      dmin: (new Date().getUTCFullYear() - 1) + "-" + (9) + "-" + (1),
      // lyoum: new Date().getUTCFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate(),
      ghodwa: (new Date().getUTCFullYear() + 1) + "-" + (9) + "-" + (1),

    };


  }

  componentWillReceiveProps(nextProps) {
    if (nextProps)
      this.setState({
        img: undefined,
        files: undefined,
        isSubmited: false,
        valueClasse: [],
        valueNiveau: [],
        classet: [],
        checked: "Public",

      }, this.classes(null)
      )
  }

  handlechangeNiveau = (value) => {
    this.setState({ valueNiveau: value, valueClasse: [], classet: [] }, this.classes(value))
  }
  handleChangeClasse = (value) => {
    this.setState({ valueClasse: value })
  }

  uploadimg = (event) => {
    let img = event.target.files[0]
    this.setState({ img })

  }
  uploadfile = (event) => {
    let files = event.target.files[0]
    this.setState({ files })

  }
  classes(niveau) {
    var query = ""
    if (niveau) {
      niveau = niveau.map(n => n.value).join(',');
      query = "http://api.onyx.inedit-gd.tn/classe/classe/" + niveau
    }
    else {
      query = "http://api.onyx.inedit-gd.tn/classe/getAll"

    }
    try {
      axios
        .get(query)
        .then(res => {
          return res.data;
        })
        .then(data => {
          if (niveau)
            this.setState({
              classet: data,

            });
          else
            this.setState({
              classet: data.list,

            });
        }, error => {
          console.log(error)
        });
    }
    catch (error) {
      console.log("failed" + error)
    }
  }
  oncv = event => {
    if (event.target)
      this.setState({
        checked: event.target.value, isSubmited: false
      },
        this.classes(null))
  }

  handleSubmit = (event, errors, values) => {
    event.preventDefault();
    const { titre, lieu, desc, type, date1, date2 } = values
    const { valueClasse, files, img, classet } = this.state;



    this.setState({ isSubmited: true })
    let csprive = valueClasse.map(classe => classe.value).join(',')
    let cspublic = classet.map(classe => classe.id).join(',')

    if (classet.length === 0 && type === "Public") {
      NotificationManager.warning(
        "Vous n'avez aucune classe",
        "EVENEMENT",
        5000,
        null,
        null,
      );

      return;
    }


    if (
      (errors.length === 0 && type === "Public" && files && img)
      ||
      (errors.length === 0 && type === "Privé" && valueClasse.length > 0 && files && img)
    ) {

      if (date1.localeCompare(date2) === 1) {
        NotificationManager.warning(
          "Vérifier les dates",
          "EVENEMENT",
          5000,
          null,
          null,
        );

        return;
      }
      NotificationManager.primary(
        "Requête en cours",
        "EVENEMENT",
        1000,
        null,
        null,
      );
      let data = new FormData()
      try {
        data.append('file', files);
        // if (img)
        data.append('image', img)
        // else
        //   data.append('image', null)

        data.append('titre', titre)
        data.append('dateDebut', date1)
        data.append('dateFin', date2)
        data.append('lieu', lieu)
        data.append('description', desc)
        data.append('type', type)
        if (type === "Public")
          data.append('idClasse', cspublic)

        else
          data.append('idClasse', csprive)

        this.props.toggleModal();
        axios({
          method: 'post',
          url: 'http://api.onyx.inedit-gd.tn/event/add',
          data: data,
          headers: { 'Content-Type': 'multipart/form-data' }

        })
          .then(res => {
            NotificationManager.success(
              "Evenement crée",
              "EVENEMENT",
              3000,
              null,
              null,
            );

            return this.props.callback();

          },
            error => {
              NotificationManager.warning(
                "Erreur évenement",
                "EVENEMENT",
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

  render() {
    const cs = this.state.classet.map((c, i) => {
      return { label: c.niveau + ")" + c.Nom, value: c.id };
    })
    const { valueNiveau, valueClasse, checked } = this.state
    const { modalOpen, toggleModal } = this.props;

    let defaultValues = {
      titre: "",
      lieu: "",
      desc: "",
      type: "",
      date1: "",
      date2: ""
    }

    return (
      <Modal
        isOpen={modalOpen}
        toggle={toggleModal}
        wrapClassName="modal-left"
        backdrop="static"
      >

        <ModalBody>
          <AvForm
            onSubmit={this.handleSubmit}
            model={defaultValues}
            className="av-tooltip tooltip-right-bottom"
          >
            <br></br>
            <AvGroup className="error-t-negative">
              <Label for="titre">Titre :</Label>
              <AvField
                name="titre"
                id="titre"
                required
                validate={{
                  required: {
                    value: true,
                    errorMessage: "Veuillez saisir le titre"
                  },

                  minLength: {
                    value: 5,
                    errorMessage:
                      "5 caractéres minimum !"
                  },

                }} />

            </AvGroup>
            <AvGroup className="error-t-negative">
              <div className="error-t-negative position-relative">

                <Label for="img">Image événement :</Label>
                <AvField
                  name="img"
                  type="file"
                  onChange={this.uploadimg}
                  accept="image/*"
                />
                {this.state.img == undefined && this.state.isSubmited &&
                  <>
                    <div className="av-invalid is-invalid form-control d-none"></div>
                    <div class="invalid-feedback position-absolute">Veuillez insérer une image</div>
                  </>
                }
              </div>
            </AvGroup>

            <AvGroup className="error-t-negative">

              <Label for="lieu">Lieu :</Label>
              <AvField
                name="lieu"
                id="lieu"
                required
                validate={{
                  required: {
                    value: true,
                    errorMessage: "Veuillez saisir le lieu"
                  },
                  // pattern: {
                  //   value: "^[A-Za-z-éàè ]+$",
                  //   errorMessage: "le lieu doit être composé uniquement de lettres"
                  // },
                  minLength: {
                    value: 3,
                    errorMessage:
                      "3 caractéres minimum !"
                  },
                }} />

            </AvGroup>
            <AvGroup className="error-t-negative">
              <Label for="date1">Date début :</Label>
              <AvField
                name="date1"
                type="date"
                value={defaultValues.date1}
                required
                min={moment(this.state.dmin, 'YYYY-MM-DD').format('YYYY-MM-DD')}
                max={moment(this.state.ghodwa, 'YYYY-MM-DD').format('YYYY-MM-DD')}
                validate={{
                  required: {
                    value: true,
                    errorMessage: "Veuillez saisir la date début"
                  },

                }}
              />
            </AvGroup>


            <AvGroup className="error-t-negative">
              <Label for="date2">Date fin :</Label>
              <AvField
                name="date2"
                type="date"
                value={defaultValues.date2}
                required
                min={moment(new Date(), 'YYYY-MM-DD').format('YYYY-MM-DD')}
                max={moment(this.state.ghodwa, 'YYYY-MM-DD').format('YYYY-MM-DD')}
                validate={{
                  required: {
                    value: true,
                    errorMessage: "Veuillez saisir la date fin"
                  },

                }}
              />
            </AvGroup>


            <AvGroup className="error-t-negative">
              <Label for="desc">Description :</Label>
              <AvField
                name="desc"
                type="textarea"
                value={defaultValues.desc}

              />
            </AvGroup>


            <AvGroup className="error-t-negative">
              <Label for="file">Fichier PDF :</Label>
              <div className="error-t-negative position-relative">
                <AvField
                  name="file"
                  type="file"
                  onChange={this.uploadfile}
                  accept="application/pdf,application/vnd.ms-excel"

                />
                {this.state.files == undefined && this.state.isSubmited &&
                  <>
                    <div className="av-invalid is-invalid form-control d-none"></div>
                    <div class="invalid-feedback position-absolute">Veuillez insérer un fichier</div>
                  </>
                }
              </div>
            </AvGroup>
            <AvRadioGroup
              className="error-l-150"
              name="type"
              required
              onChange={this.oncv}
              value={checked}
              validate={{
                required: {
                  value: true,
                  errorMessage: "Veuillez choisir le type d'évenement"
                },

              }}>
              <Label className="d-block">Type d'évenement :</Label>
              <AvRadio customInput label="Public" value="Public" />
              <AvRadio customInput label="Privé" value="Privé" />

            </AvRadioGroup>
            {checked === "Privé" &&
              <>
                <Label>
                  Niveau :
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
                  {this.state.valueNiveau.length === 0 && this.state.isSubmited &&
                    <>
                      <div className="av-invalid is-invalid form-control d-none"></div>
                      <div class="invalid-feedback">Veuillez saisir au moins un niveau</div>
                    </>
                  }
                </div>
                <Label>
                  Classe :
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
                  {this.state.valueClasse.length === 0 && this.state.isSubmited &&
                    <>
                      <div className="av-invalid is-invalid form-control d-none"></div>
                      <div class="invalid-feedback">Veuillez saisir au moins une classe</div>
                    </>
                  }
                </div>
              </>
            }

            <Button
              color="secondary"
              id="ajouter">
              Créer
            </Button>
            <Button
              color="danger"
              onClick={toggleModal}
              id="annuler">
              Annuler
            </Button>


          </AvForm>
        </ModalBody>



      </Modal>
    )
  }
}



export default AddNewModal;

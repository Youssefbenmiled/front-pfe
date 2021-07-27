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
import { levels } from "../../../constants/defaultValues";
import { NotificationManager } from "../../../components/common/react-notifications";
import moment from "moment";
import Select from "react-select";
import CustomSelectInput from "../../../components/common/CustomSelectInput";
import IntlMessages from "../../../helpers/IntlMessages";
// import "./update.css"
class UpdateModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      img: undefined,
      files: undefined,
      isSubmited: false,
      valueClasse: [],
      valueNiveau: [],
      classet: [],
      checked: "",
      ghodwa: (new Date().getUTCFullYear() + 1) + "-" + (9) + "-" + (1),


    };
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.evenement) {
      this.setState({
        img: undefined,
        files: undefined,
        isSubmited: false,
        // valueNiveau: this.getUnique(nextProps.evenement.niveauClasse.split(' ').map(niveau => ({ label: niveau, value: niveau }))),
        // valueClasse: nextProps.evenement.nomClasse.split(' ').map(classe => ({ label: classe + ")" + classe, value: classe })),
        classet: [],
        checked: nextProps.evenement.type
      }, this.classes(null))
    }
  }

  getUnique(array) {
    var uniqueArray = [];

    for (var i = 0; i < array.length; i++) {
      if (uniqueArray.indexOf(array[i].value) === -1) {
        uniqueArray.push(array[i].value);
      }
    }
    uniqueArray = uniqueArray.map(item => ({ label: item, value: item }))
    return uniqueArray;
  }


  handlechangeNiveau = (value) => {
    this.setState({ valueNiveau: value, valueClasse: [], classet: [] }, this.classes(value))

  }

  handleChangeClasse = (value) => {
    this.setState({ valueClasse: value })
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
          return error;
        });
    }
    catch (error) {
      return error;
    }
  }
  oncv = event => {
    if (event.target)
      this.setState({
        checked: event.target.value
      },
        this.classes(null))
  }

  handleSubmit = (event, errors, values) => {

    event.preventDefault();
    if (!localStorage.getItem('user_id'))
      return this.props.handleLogout();
    const { titre, lieu, desc, type, date1, date2 } = values
    const { valueClasse, checked, files, img, classet } = this.state;
    this.setState({ isSubmited: true })


    const csprive = valueClasse.map(classe => classe.value).join(',')
    const cspublic = classet.map(classe => classe.id).join(',')

    if (errors.length === 0) {
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
        if (files)
          data.append('file', files);
        else
          data.append('file', undefined);
        if (img)
          data.append('image', img)
        else
          data.append('image', undefined);

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
          url: 'http://api.onyx.inedit-gd.tn/event/update',
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
                3000,
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

  uploadimg = (event) => {
    let img = event.target.files[0]
    this.setState({ img })

  }
  uploadfile = (event) => {
    let files = event.target.files[0]
    this.setState({ files })

  }

  render() {
    const cs = this.state.classet.map((c, i) => {
      return { label: c.niveau + ")" + c.Nom, value: c.id };
    })
    const { valueNiveau, valueClasse, checked } = this.state

    const {
      modalOpen,
      toggleModal,
      evenement
    } = this.props;
    if (evenement) {
      var debut = moment(evenement.dateDebut, 'YYYY-MM-DD').format('YYYY-MM-DD');
      var fin = moment(evenement.dateFin, 'YYYY-MM-DD').format('YYYY-MM-DD')
    }

    let defaultValues = {}
    if (evenement)
      defaultValues = {
        titre: evenement.titre,
        lieu: evenement.lieu,
        desc: evenement.description,
        type: evenement.type,
        date1: debut,
        date2: fin
      }
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
              <Label for="img">Image événement:</Label>
              <AvField
                name="img"
                type="file"
                onChange={this.uploadimg}
                accept="image/*"
              />

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
                  //   value: "^[A-Za-z ]+$",
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
              <Label for="date1">Date Début :</Label>
              <AvField
                name="date1"
                type="date"
                value={defaultValues.debut}
                required
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
              <Label for="date2">Date Fin :</Label>
              <AvField
                name="date2"
                type="date"
                value={defaultValues.fin}
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

            {/* <AvGroup className="error-t-negative">
              <Label for="file">Fichier PDF :</Label>
              <AvField
                name="file"
                type="file"
                onChange={this.uploadfile}
                accept="application/pdf,application/vnd.ms-excel"

              />

            </AvGroup> */}

            <AvRadioGroup
              className="error-l-150"
              name="type"
              required
              onChange={this.oncv}
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
                <br></br>
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
export default UpdateModal;


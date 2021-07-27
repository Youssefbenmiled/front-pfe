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
import axios from "axios";
import { NotificationManager } from "../../../components/common/react-notifications";
import { levels } from "../../../constants/defaultValues";
import {
  AvForm,
  AvField,
  AvGroup,
} from "availity-reactstrap-validation";
class AddNewModal extends Component {
  constructor(props) {
    super(props);
    this.state = {

      valueNiveau: [],
      valueClasse: [],
      valueDomaine: [],
      files: undefined,
      classet: [],
      domainet: [],
      isSubmited: false,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      this.setState({
        valueNiveau: [],
        valueClasse: [],
        valueDomaine: [],
        isSubmited: false,
        classet: [],
        domainet: [],

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

  handleSubmit = (event, errors, values) => {
    event.preventDefault();
    if (!localStorage.getItem('user_id'))
      return this.props.handleLogout();


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
        return error;

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
          return error;
        });
    }
    catch (error) {
      return error;
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
          return error;
        });
    }
    catch (error) {
      return error;
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

    const cs = this.state.classet.map((c, i) => {
      return { label: c.niveau + ")" + c.Nom, value: c.id };
    })
    const dm = this.state.domainet.map((d, i) => {
      return { label: d.niveau + ")" + d.nom, value: d.id };
    })

    return (
      <Modal
        isOpen={modalOpen}
        toggle={toggleModal}
        wrapClassName="modal-left"
        backdrop="static"
      >
        <ModalHeader toggle={toggleModal}></ModalHeader>

        <ModalBody>

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
              Niveau(x):
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
              Classe(s):
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
              Domaine(s):
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
            <div className="row">
              <div className="col-12 col-md-6 mt-3">
                <Button className="w-100" color="secondary">
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

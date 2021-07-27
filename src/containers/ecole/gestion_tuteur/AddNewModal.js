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
import { levels } from "../../../constants/defaultValues";
import {
  AvForm,
  AvField,
  AvGroup,
} from "availity-reactstrap-validation";

import axios from "axios"
import { NotificationManager } from "../../../components/common/react-notifications";
class AddNewModal extends Component {
  constructor(props) {
    super(props);
    this.state = {

      valueLevel: [],
      valueClasse: [],
      valueEleve: [],
      classet: [],
      elevet: [],
      isSubmited: false,
    }
  }

  handleChangeLevel = value => {
    this.setState({
      valueLevel: value, valueClasse: [], valueEleve: [], classet: [], elevet: []
    },
      this.classes(value));

  };
  handleChangeClasse = value => {
    this.setState({
      valueClasse: value, valueEleve: [], elevet: []
    },
      this.eleves(value));

  };
  handleChangeEleve = value => {
    this.setState({
      valueEleve: value
    });
  };



  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      this.setState({
        valueLevel: [],
        valueClasse: [],
        valueEleve: [],
        classet: [],
        elevet: [],
        isSubmited: false,
      })
    }
  }


  handleSubmit = (event, errors, values) => {
    event.preventDefault();
    if (!localStorage.getItem('user_id'))
      return this.props.handleLogout();


    this.setState({ isSubmited: true })
    const { nom, prenom, email, adresse, tel } = values
    const { valueEleve } = this.state;
    if (errors.length === 0 && valueEleve.length > 0) {

      NotificationManager.primary(
        "Requête en cours",
        "TUTEUR",
        1000,
        null,
        null,
      );
      try {

        let data = {
          "nom": nom.trim(),
          "prenom": prenom.trim(),
          "email": email,
          "adresse": adresse.trim(),
          "numTel": tel,
          "statut": 'actif',
          "roles": 'TUTEUR',
          "eleves": valueEleve.map(x => x.value),
        }
        this.props.toggleModal();

        axios({
          method: 'post',
          url: 'http://api.onyx.inedit-gd.tn/tuteur/add',
          data: data,
          headers: { 'Content-Type': 'multipart/form-data' }

        })
          .then(res => {
            NotificationManager.success(
              "Tuteur ajouté",
              "TUTEUR",
              3000,
              null,
              null,
            );

            return this.props.callback();

          },
            error => {
              NotificationManager.warning(
                "Vérifier email tuteur",
                "TUTEUR",
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

  eleves(idclasse) {
    var idc = idclasse.map(c => c.value).join(',');

    try {
      axios
        .get("http://api.onyx.inedit-gd.tn/eleve/filtre/" + idc)
        .then(res => {
          return res.data;
        })
        .then(data => {

          this.setState({
            elevet: data,
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
    const { modalOpen, toggleModal } = this.props;
    const { valueLevel, valueClasse, valueEleve } = this.state
    let defaultValues = {
      nom: "",
      prenom: "",
      email: "",
      adresse: "",
      tel: "",
    };
    const cs = this.state.classet.map((c, i) => {
      return { label: c.niveau + ")" + c.Nom, value: c.id };
    })

    const elvs = this.state.elevet.map((e, i) => {
      return { label: e.niveau + "" + e.nomClasse + " ) " + e.Nom + " " + e.prenom, value: e.id };
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
              Enfant(s)
                  </h2></center>
            <br></br>
            <Label>
              Niveau(x) éléve(s) :
              </Label>
            <div className="error-t-negative position-relative">

              <Select
                onChange={this.handleChangeLevel}
                value={valueLevel}
                options={levels}
                isMulti
                className="react-select"
                placeholder="Sélectionner le(s) niveau(x).."
                classNamePrefix="react-select"
                name="form-field-name"
              />
              {this.state.valueLevel.length === 0 && this.state.isSubmited &&
                <>
                  <div className="av-invalid is-invalid form-control d-none"></div>
                  <div class="invalid-feedback">Veuillez saisir au moins un niveau</div>
                </>
              }
            </div>
            <br></br>
            <Label>
              Classe(s) éléve(s) :
              </Label>
            <div className="error-t-negative position-relative">

              <Select
                onChange={this.handleChangeClasse}
                value={valueClasse}
                options={cs}
                isMulti
                className="react-select"
                placeholder="Sélectionner le(s) classe(s).."
                classNamePrefix="react-select"
                name="form-field-name"
              />


              {this.state.valueClasse.length === 0 && this.state.isSubmited &&
                <>
                  <div className="av-invalid is-invalid form-control d-none"></div>
                  <div class="invalid-feedback">Veuillez saisir au moins une classe</div>
                </>
              }
            </div>
            <br></br>

            <Label>
              Eléve(s) :
              </Label>
            <div className="error-t-negative position-relative">

              <Select
                onChange={this.handleChangeEleve}
                value={valueEleve}
                options={elvs}
                isMulti
                className="react-select"
                placeholder="Sélectionner le(s) éléves.."
                classNamePrefix="react-select"
                name="form-field-name"
              />

              {this.state.valueEleve.length === 0 && this.state.isSubmited &&
                <>
                  <div className="av-invalid is-invalid form-control d-none"></div>
                  <div class="invalid-feedback">Veuillez saisir au moins un éléve</div>
                </>
              }
            </div>
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


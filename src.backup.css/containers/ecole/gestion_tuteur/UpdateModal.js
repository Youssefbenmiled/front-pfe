import React, { Component } from "react";
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
import { levels } from "../../../constants/defaultValues";

import Select from "react-select";
import IntlMessages from "../../../helpers/IntlMessages";
// import "./update.css"
import {
  AvForm,
  AvField,
  AvGroup,

} from "availity-reactstrap-validation";
import axios from "axios"
import { NotificationManager } from "../../../components/common/react-notifications";

class UpdateModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      copyNiveau: [],
      copyClasse: [],
      copyEleve: [],
      valueNiveau: [],
      valueClasse: [],
      valueEleve: [],
      classet: [],
      elevet: [],
      isSubmited: false,
      statut: null

    };
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.tuteur && nextProps.tuteur.eleves) {
      // nextProps.tuteur.eleves.map(eleve => console.log(eleve.classe, 'props'))
      this.setState({
        statut: { label: nextProps.tuteur.statut, value: nextProps.tuteur.statut },
        valueNiveau: this.getUnique(nextProps.tuteur.eleves.map(eleve => ({ label: eleve.classe.niveau, value: eleve.classe.niveau }))),
        valueClasse: this.getUnique(nextProps.tuteur.eleves.map(eleve => (eleve.classe.Nom ? ({ label: eleve.classe.niveau + ")" + eleve.classe.Nom, value: eleve.classe.id }) : ({ label: eleve.classe.niveau + ")" + eleve.classe.nom, value: eleve.classe.id })))),
        valueEleve: nextProps.tuteur.eleves.map(eleve => (eleve.classe.Nom ? ({ label: eleve.classe.niveau + "" + eleve.classe.Nom + " ) " + eleve.Nom + " " + eleve.prenom, value: eleve.id }) : ({ label: eleve.classe.niveau + "" + eleve.classe.nom + " ) " + eleve.Nom + " " + eleve.prenom, value: eleve.id }))),
        copyNiveau: this.getUnique(nextProps.tuteur.eleves.map(eleve => ({ label: eleve.classe.niveau, value: eleve.classe.niveau }))),
        copyClasse: this.getUnique(nextProps.tuteur.eleves.map(eleve => (eleve.classe.Nom ? ({ label: eleve.classe.niveau + ")" + eleve.classe.Nom, value: eleve.classe.id }) : ({ label: eleve.classe.niveau + ")" + eleve.classe.nom, value: eleve.classe.id })))),
        copyEleve: nextProps.tuteur.eleves.map(eleve => (eleve.classe.Nom ? ({ label: eleve.classe.niveau + "" + eleve.classe.Nom + " ) " + eleve.Nom + " " + eleve.prenom, value: eleve.id }) : ({ label: eleve.classe.niveau + "" + eleve.classe.Nom + " ) " + eleve.Nom + " " + eleve.prenom, value: eleve.id }))),
        isSubmited: false

      },

        this.classes(nextProps.tuteur.eleves.map(eleve =>
          ({ label: eleve.classe.niveau, value: eleve.classe.id })
        ),
          this.eleves(nextProps.tuteur.eleves.map(eleve =>
            (eleve.classe.Nom ?
              ({ label: eleve.classe.niveau + ")" + eleve.classe.Nom, value: eleve.classe.id })
              :
              ({ label: eleve.classe.niveau + ")" + eleve.classe.nom, value: eleve.classe.id })
            )
          ),
          )

        ))
    }
  }
  getUnique(array) {
    var uniqueArray = [];

    for (var i = 0; i < array.length; i++) {
      if (uniqueArray.map(x => parseInt(x.value)).indexOf(parseInt(array[i].value)) === -1)
        uniqueArray.push({ label: array[i].label, value: array[i].value });

    }
    uniqueArray = uniqueArray.map(item => ({ label: item.label, value: item.value }))

    return uniqueArray;
  }


  handleSubmit = (event, errors, values) => {
    event.preventDefault();
    this.setState({ isSubmited: true })
    const { nom, prenom, email, adresse, tel } = values
    const { valueNiveau, valueClasse, valueEleve, copyNiveau, copyClasse, copyEleve, statut } = this.state
    const { tuteur } = this.props

    let ch1 = ""
    let ch2 = ""
    let ch3 = ""
    let ch4 = ""
    let ch5 = ""
    let ch6 = ""

    {
      valueNiveau.map((niveau) => {
        ch1 = ch1.concat(niveau.value + "")
      })
    }
    {
      copyNiveau.map((niveau) => {
        ch2 = ch2.concat(niveau.value + "")
      })
    }
    {
      valueClasse.map((classe) => {
        ch3 = ch3.concat(classe.value + "")
      })
    }
    {
      copyClasse.map((classe) => {
        ch4 = ch4.concat(classe.value + "")
      })
    }
    {
      valueEleve.map((eleve) => {
        ch5 = ch5.concat(eleve.value + "")
      })
    }
    {
      copyEleve.map((eleve) => {
        ch6 = ch6.concat(eleve.value + "")
      })
    }


    if (tuteur &&
      tuteur.nom.localeCompare(nom.trim()) == 0 &&
      tuteur.prenom.localeCompare(prenom.trim()) == 0 &&
      tuteur.email.localeCompare(email) == 0 &&
      tuteur.adresse.localeCompare(adresse) == 0 &&
      tuteur.numTel.localeCompare(tel) == 0 &&
      tuteur.statut.localeCompare(this.state.statut) == 0 &&
      ch1.trim().localeCompare(ch2.trim()) == 0 &&
      ch3.trim().localeCompare(ch4.trim()) == 0 &&
      ch5.trim().localeCompare(ch6.trim()) == 0
    ) {
      NotificationManager.warning(
        "Aucune modification n'a été effectuée",
        "ENSEIGNANT",
        5000,
        null,
        null,
      );
      return;
    }



    if (errors.length === 0 && valueEleve.length > 0) {
      NotificationManager.primary(
        "Requête en cours",
        "TUTEUR",
        1000,
        null,
        null,
      );
      try {

        const data = {
          id: tuteur.id,
          nom: nom.trim(),
          prenom: prenom.trim(),
          email: email,
          adresse: adresse.trim(),
          numTel: tel,
          statut: statut.label,
          eleves: valueEleve.map(x => x.value),

        }
        this.props.toggleModal();

        axios({
          method: 'put',
          url: 'http://api.onyx.inedit-gd.tn/tuteur/update',
          data: data,
        })
          .then(res => {
            NotificationManager.success(
              "Modification avec succés",
              "TUTEUR",
              3000,
              null,
              null,
            );

            return this.props.callback();

          },
            error => {
              NotificationManager.warning(
                "Erreur de modification",
                "TUTEUR",
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

          return this.setState({
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



  handleChangeNiveau = value => {
    this.setState({
      valueNiveau: value, valueClasse: [], valueEleve: [], classet: [], elevet: []
    },
      this.classes(value)
    );
  };
  handleChangeClasse = value => {
    this.setState({
      valueClasse: value, valueEleve: [], elevet: []
    },
      this.eleves(value)
    );
  };
  handleChangeEleve = value => {
    this.setState({ valueEleve: value });
  };


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
          console.log(error)
        });
    }
    catch (error) {
      console.log("failed" + error)
    }
  }
  handleChangeStat = (value) => {
    this.setState({ statut: value })
  }


  annuler = () => {

    this.props.toggleModal();
    this.props.setST()

  }


  render() {

    const cs = this.state.classet.map((c, i) => {
      return { label: c.niveau + ")" + c.Nom, value: c.id };
    })

    const elvs = this.state.elevet.map((e, i) => {
      return { label: e.niveau + "" + e.nomClasse + " ) " + e.Nom + " " + e.prenom, value: e.id };
    })
    const {
      modalOpen,
      toggleModal,
      tuteur,
      levels
    } = this.props;
    const stats = [
      { label: "actif", value: "actif" },
      { label: "inactif", value: "inactif" }
    ];
    let defaultValues = {}
    if (tuteur) {
      defaultValues = {
        nom: tuteur.nom,
        prenom: tuteur.prenom,
        email: tuteur.email,
        adresse: tuteur.adresse,
        tel: tuteur.numTel,
      };
    }
    return (
      <>
        {tuteur &&
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
                <Label>
                  Statut :
                </Label>
                <Select
                  onChange={this.handleChangeStat}
                  value={this.state.statut}
                  options={stats}
                  className="react-select position-relative"
                  classNamePrefix="react-select"
                  name="form-field-name"
                  required
                />

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
                    onChange={this.handleChangeNiveau}
                    value={this.state.valueNiveau}
                    options={levels}
                    className="react-select"
                    placeholder="Sélectionner un niveau..."
                    classNamePrefix="react-select"
                    name="niveau"
                    required
                    isMulti


                  />
                  <br></br>
                  {this.state.valueNiveau.length === 0 &&
                    <>
                      <div className="av-invalid is-invalid form-control d-none"></div>
                      <div class="invalid-feedback">Veuillez saisir au moins un niveau</div>
                    </>
                  }
                </div>
                <Label>
                  Classe(s) éléve(s) :
                </Label>
                <div className="error-t-negative position-relative">

                  <Select
                    onChange={this.handleChangeClasse}
                    value={this.state.valueClasse}
                    options={cs}
                    className="react-select"
                    placeholder="Sélectionner une classe ..."
                    classNamePrefix="react-select"
                    name="classe"
                    required
                    isMulti


                  />
                  <br></br>
                  {this.state.valueClasse.length === 0 &&
                    <>
                      <div className="av-invalid is-invalid form-control d-none"></div>
                      <div class="invalid-feedback">Veuillez saisir au moins une classe</div>
                    </>
                  }
                </div>
                <Label>
                  Eléve(s) :
                </Label>
                <div className="error-t-negative position-relative">

                  <Select
                    onChange={this.handleChangeEleve}
                    value={this.state.valueEleve}
                    options={elvs}
                    className="react-select"
                    placeholder="Sélectionner l'éléve(s)..."
                    classNamePrefix="react-select"
                    name="eleve"
                    required
                    isMulti
                  />
                  <br></br>
                  <br></br>
                  {this.state.valueEleve.length === 0 &&
                    <>
                      <div className="av-invalid is-invalid form-control d-none"></div>
                      <div class="invalid-feedback">Veuillez saisir au moins un éléve</div>
                    </>
                  }
                </div>
                <Button
                  color="secondary"
                  id="modifier">
                  Modifier
                </Button>
                <Button
                  color="danger"
                  onClick={this.annuler}
                  id="annuler">
                  Annuler
                </Button>


              </AvForm>
            </ModalBody>

          </Modal>
        }
      </>
    );
  }
}
export default UpdateModal;

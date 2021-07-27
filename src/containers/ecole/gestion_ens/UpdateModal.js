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
import Select from "react-select";
import CustomSelectInput from "../../../components/common/CustomSelectInput";
import IntlMessages from "../../../helpers/IntlMessages";
// import "./update.css"
class UpdateModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      copyNiveau: [],
      copyClasse: [],
      copyDomaine: [],
      valueNiveau: [],
      valueClasse: [],
      valueDomaine: [],
      file: null,
      valueType: [],
      classet: [],
      domainet: [],
      isSubmited: false,
      statut: null

    };
  }

  handlechangeNiveau = (value) => {
    this.setState({ valueNiveau: value, valueClasse: [], classet: [], valueDomaine: [], domainet: [] })
    this.classes(value);
    this.domaines(value)

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

  componentWillReceiveProps(nextProps) {
    if (nextProps.ens && nextProps.ens.classe)
      this.setState({
        // statut: { label: nextProps.ens.statut, value: nextProps.ens.statut },
        statut: { label: nextProps.ens.statut, value: nextProps.ens.statut },

        isSubmited: false,
        copyNiveau: this.getUnique(nextProps.ens.classe.map(classe => ({ label: classe.niveau, value: classe.niveau }))),
        copyClasse: nextProps.ens.classe.map(classe => ({ label: classe.niveau + ")" + classe.Nom, value: classe.id })),
        copyDomaine: nextProps.ens.domaine.map(domaine => ({ label: domaine.niveau + ")" + domaine.nom, value: domaine.id })),

        valueNiveau: this.getUnique(nextProps.ens.classe.map(classe => ({ label: classe.niveau, value: classe.niveau }))),
        valueClasse: nextProps.ens.classe.map(classe => ({ label: classe.niveau + ")" + classe.Nom, value: classe.id })),
        valueDomaine: nextProps.ens.domaine.map(domaine => ({ label: domaine.niveau + ")" + domaine.nom, value: domaine.id }))
      },
        this.classes(nextProps.ens.classe.map(classe =>
          ({ label: classe.niveau, value: classe.niveau })
        )),
        this.domaines(nextProps.ens.classe.map(classe =>
          ({ label: classe.niveau, value: classe.niveau })),
        )

      )
  }

  handleSubmit = (event, errors, values) => {
    event.preventDefault();
    if (!localStorage.getItem('user_id'))
      return this.props.handleLogout();

    this.setState({ isSubmited: true })

    const { nom, prenom, email, adresse, tel } = values
    const { valueNiveau, valueClasse, valueDomaine, copyNiveau, copyClasse, copyDomaine } = this.state
    const { ens } = this.props
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
      valueDomaine.map((domaine) => {
        ch5 = ch5.concat(domaine.value + "")
      })
    }
    {
      copyDomaine.map((domaine) => {
        ch6 = ch6.concat(domaine.value + "")
      })
    }

    if (ens &&
      ens.nom.localeCompare(nom) == 0 &&
      ens.prenom.localeCompare(prenom) == 0 &&
      ens.email.localeCompare(email) == 0 &&
      ens.adresse.localeCompare(adresse) == 0 &&
      ens.numTel.toString().localeCompare(tel) == 0 &&
      ens.statut.localeCompare(this.state.statut) == 0 &&
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
          id: this.props.ens.id,
          nom: nom.trim(),
          prenom: prenom.trim(),
          email: email,
          adresse: adresse.trim(),
          numTel: parseInt(tel),
          password: "password",
          statut: this.state.statut.label,
          classe: valueClasse.map(x => x.value),
          domaine: valueDomaine.map(x => x.value)
        }
        this.props.toggleModal();

        axios({
          method: 'put',
          url: 'http://api.onyx.inedit-gd.tn/enseignant/update',
          data: data,
        })
          .then(res => {
            NotificationManager.success(
              "Modification effectuée",
              "ENSEIGNANT",
              3000,
              null,
              null,
            );

            return this.props.callback();

          },
            error => {
              NotificationManager.warning(
                "Email existant",
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
          // console.log(res)
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
          // console.log(res)
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
  annuler = () => {

    this.props.toggleModal();
    this.props.setST()
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
  handleChangeStat = (value) => {
    this.setState({ statut: value })
  }


  render() {
    const {
      modalOpen,
      toggleModal,
      ens
    } = this.props;
    const {
      valueNiveau,
      classet,
      domainet
    } = this.state;


    let defaultValues = {}
    if (ens)
      defaultValues = {
        nom: ens.nom,
        prenom: ens.prenom,
        email: ens.email,
        adresse: ens.adresse,
        tel: ens.numTel.toString(),

      };
    const stats = [
      { label: "actif", value: "actif" },
      { label: "inactif", value: "inactif" }
    ];
    const cs = classet.map((c, i) => {
      return { label: c.niveau + ")" + c.Nom, value: c.id };
    })
    const dm = domainet.map((d, i) => {
      return { label: d.niveau + ")" + d.nom, value: d.id };
    })
    return (
      <>
        {ens &&
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
                        errorMessage: "le N° de Téléphone doit être composé uniquement de chiffres"
                      },
                      minLength: {
                        value: 8,
                        errorMessage: "le N° de Téléphone doit être composé uniquement de 8 caractéres"

                      },
                      maxLength: {
                        value: 8,
                        errorMessage: "le N° de Téléphone doit être composé uniquement de 8 caractéres"
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
                  Enseigne
                  </h2></center>
                <br></br>
                <Label>
                  Niveau (x):
                </Label>
                <div className="error-t-negative position-relative">

                  <Select
                    onChange={this.handlechangeNiveau}
                    value={this.state.valueNiveau}
                    options={levels}
                    className="react-select position-relative"
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
                  Classe (s):
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
                    value={this.state.valueDomaine}
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
                  {this.state.valueDomaine.length === 0 &&
                    <>
                      <div className="av-invalid is-invalid form-control d-none"></div>
                      <div class="invalid-feedback"> Veuillez saisir au moins un domaine</div>
                    </>
                  }
                </div>

                <div className="row">
                  <div className="col-12 col-md-6 mt-3">
                    <Button type="submit" className="w-100" color="secondary">
                      Modifier
                    </Button>
                  </div>
                  <div className="col-12 col-md-6 mt-3">
                    <Button className="w-100"
                      color="danger"
                      onClick={this.annuler}>
                      Annuler
                    </Button>
                  </div>

                </div>


              </AvForm>
            </ModalBody>

          </Modal>
        }
      </>
    );
  }
}
export default UpdateModal;


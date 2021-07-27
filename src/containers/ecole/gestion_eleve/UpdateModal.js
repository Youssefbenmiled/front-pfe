import React, { Component } from "react";
import moment from 'moment'
import {
  CustomInput,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
  FormGroup
} from "reactstrap";
import axios from "axios"
import { NotificationManager } from "../../../components/common/react-notifications";
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
import { levels } from "../../../constants/defaultValues";
import Select from "react-select";
// import "./update.css"

class UpdateModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      classet: [],
      valueClasse: {},
      valueNiveau: {},
      // valueT: {},
      // lyoum: new Date().getUTCFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate(),
      yahasra: (new Date().getUTCFullYear() - 15) + "-" + (1) + "-" + (1),

    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.eleve) {
      this.setState({
        valueNiveau: { label: nextProps.eleve.niveau, value: nextProps.eleve.niveau },
        valueClasse: { label: nextProps.eleve.nomClasse, value: nextProps.eleve.nomClasse },

      })
    }
  }




  handleSubmit = (event, errors, values) => {
    event.preventDefault();
    if (!localStorage.getItem('user_id'))
      return this.props.handleLogout();

    const { valueNiveau, valueClasse } = this.state;
    const { eleve } = this.props;
    const { nom, prenom, sexe, dns } = values
    var dt = moment(eleve.dateNaissance, 'YYYY-MM-DD').format('YYYY-MM-DD');
    // dt.format();


    if (
      nom.localeCompare(eleve.nameEleve) == 0 &&
      prenom.localeCompare(eleve.prenom) == 0 &&
      dns.localeCompare(moment(dt).format("YYYY-MM-DD")) == 0 &&
      sexe.localeCompare(eleve.sexe) == 0 &&
      valueNiveau.label.localeCompare(eleve.niveau) == 0 &&
      valueClasse.label.localeCompare(eleve.nomClasse) == 0

    ) {
      NotificationManager.warning(
        "Aucune modification n'a été effectuée",
        "ELEVE",
        5000,
        null,
        null,
      );
      return;
    }

    if (errors.length === 0 && this.state.valueClasse) {
      NotificationManager.primary(
        "Requête en cours",
        "ELEVE",
        500,
        null,
        null,
      );

      try {

        const data = {
          id: this.props.eleve.id,
          Nom: nom,
          prenom: prenom,
          dateNaissance: dns,
          sexe: sexe,
          niveau: this.state.valueNiveau.value,
          classe: this.state.valueClasse.value,
          // tuteurs: this.state.valueT.value,
        }
        this.props.toggleModal();

        axios.put('http://api.onyx.inedit-gd.tn/eleve/update', data)



          .then(res => {
            NotificationManager.success(
              "Modification effectuée avec succés",
              "ELEVE",
              3000,
              null,
              null,
            );
            return this.props.callback();
          },
            error => {
              NotificationManager.warning(
                "Eleve existe",
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
    }


  };

  // handleChangeT = (value) => {
  //   this.setState({ valueT: value });
  // }
  handleChangeClasse = (value) => {
    this.setState({ valueClasse: value });
  }
  handlechangeNiveau = (value) => {
    this.setState({ valueNiveau: value, valueClasse: [], classet: [] }
      , this.classes(value.value)
    )


  }
  classes(niveau) {
    try {
      axios
        .get("http://api.onyx.inedit-gd.tn/classe/classe/" + niveau)
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
  annuler = () => {

    this.props.toggleModal();
    this.props.setST()

  }






  render() {
    const {
      modalOpen,
      toggleModal,
      eleve
    } = this.props;

    // const tuteurs = this.state.parents.map((t, i) => {
    //   return { label: t.nom + " " + t.prenom, value: t.id };
    // })

    const cs = this.state.classet.map((l, i) => {
      return { label: l.Nom, value: l.id };
    })

    var dt = moment(eleve.dateNaissance, 'YYYY-MM-DD').format('YYYY-MM-DD');
    var date = moment(new Date(), 'YYYY-MM-DD').format('YYYY-MM-DD');
    var date2 = moment(this.state.yahasra, 'YYYY-MM-DD').format('YYYY-MM-DD');

    const defaultValues = {
      nom: eleve.nameEleve,
      prenom: eleve.prenom,
      sexe: eleve.sexe,
      dns: dt
    };



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



            <AvGroup className="error-t-negative">
              <Label for="nom">Nom :</Label>
              <AvField
                name="nom" id="nom" required
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
                name="prenom" id="prenom" required
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






            <Label>
              Niveau :
              </Label>

            <Select
              onChange={this.handlechangeNiveau}
              value={this.state.valueNiveau}
              options={levels}
              className="react-select "
              classNamePrefix="react-select"
              name="form-field-name"
              required
            />

            <br></br>

            <Label>
              Classe :
            </Label>
            <div className="error-t-negative position-relative">

              <Select
                onChange={this.handleChangeClasse}
                value={this.state.valueClasse}
                options={cs}
                className="react-select position-relative"
                placeholder="Sélectionner une classe ..."
                classNamePrefix="react-select"
                name="form-field-name"
                required
              />
            </div>
            {!this.state.valueClasse.value > 0 &&
              <>
                <div className="av-invalid is-invalid form-control d-none"></div>
                <div class="invalid-feedback">Veuillez saisir la classe</div>
              </>
            }

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
                  onClick={this.annuler}>
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
































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
import Select from "react-select";

// import "./update.css"
class UpdateModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      img: undefined,
      chauf: undefined,
      files: undefined,
      isSubmited: false,
      valueClasse: [],
      valueNiveau: [],
      valueElv: [],
      classet: [],
      elevet: []
    };


  }

  componentWillReceiveProps(nextProps) {
    if (nextProps)
      this.setState({
        img: undefined,
        files: undefined,
        isSubmited: false,
        // valueNiveau: this.getUnique(nextProps.bus.classe.map(classe => ({ label: classe.niveau, value: classe.niveau }))),
        // valueClasse: nextProps.bus.classe.map(classe => ({ label: classe.niveau + ")" + classe.Nom, value: classe.id })),
        // valueElv: nextProps.bus.classe.map(classe => ({ label: classe.niveau + ")" + classe.Nom, value: classe.id })),
        chauf: undefined,

      })
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
    this.setState({ valueNiveau: value, valueClasse: [], valueElv: [], elevet: [], classet: [] }
      ,
      this.classes(value)
    )

  }

  classes(niveau) {
    var query = ""

    niveau = niveau.map(n => n.value).join(',');
    query = "http://api.onyx.inedit-gd.tn/classe/classe/" + niveau


    try {
      axios
        .get(query)
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

  handleChangeClasse = (value) => {
    this.setState({ valueClasse: value, valueElv: [], elevet: [] }
      ,
      this.eleves(value))
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
          console.log(error)
        });
    }
    catch (error) {
      console.log("failed" + error)
    }

  }

  handleChangeElv = (value) => {
    this.setState({ valueElv: value })
  }


  test(nbplac) {
    const { valueElv } = this.state;
    if (valueElv.length > nbplac)
      return false
    else
      return true

  }


  handleSubmit = (event, errors, values) => {
    event.preventDefault();
    this.setState({ isSubmited: true })

    const { bus } = this.props;

    const { mat, nbplac, nomch, telch, } = values
    const { valueClasse, files, img, valueElv, chauf } = this.state;
    // let cls = valueClasse.map(classe => classe.value).join(',')
    let elvs = valueElv.map(eleve => eleve.value).join(',')

    if (errors.length === 0 && valueElv.length > 0) {

      if (!this.test(nbplac)) {
        NotificationManager.warning(
          "Nombre des éléves dépasse le nombre des places",
          "TRANSPORT",
          5000,
          null,
          null,
        );
        return;
      }

      NotificationManager.primary(
        "Requête en cours",
        "TRANSPORT",
        1000,
        null,
        null,
      );


      let data = new FormData()
      try {
        data.append('id', bus.id)
        if (files)
          data.append('fileHorraire', files);
        else
          data.append('fileHorraire', "");

        if (img)
          data.append('photobus', img)
        else
          data.append('photobus', "")
        if (chauf)

          data.append('photoChauffeur', chauf)
        else
          data.append('photoChauffeur', "")

        data.append('matricule', mat.toString())
        data.append('nbplace', nbplac)
        data.append('nomchauffeur', nomch)
        data.append('numtelChauffeur', telch)
        data.append('idEleves', elvs)
        this.props.toggleModal();



        axios({
          method: 'put',
          url: 'http://api.onyx.inedit-gd.tn/transport/update',
          data: data,
          headers: { 'Content-Type': 'multipart/form-data' }

        })
          .then(res => {
            NotificationManager.success(
              "Bus modifié avec succés",
              "TRANSPORT",
              3000,
              null,
              null,
            );

            return this.props.callback();

          },
            error => {
              console.log(error)
              NotificationManager.warning(
                "Erreur modification bus",
                "TRANSPORT",
                5000,
                null,
                null,
              );
            }

          )


      } catch (error) {
        console.log("failed" + error);

      }
    };
  }

  uploadimg = (event) => {
    let img = event.target.files[0]
    this.setState({ img })

  }

  uploadchauf = (event) => {
    let chauf = event.target.files[0]
    this.setState({ chauf })

  }


  uploadfile = (event) => {
    let files = event.target.files[0]
    this.setState({ files })

  }

  annuler = () => {
    this.props.toggleModal()
    this.props.setST()
  }

  render() {
    const { valueNiveau, valueClasse, valueElv, elevet, classet } = this.state
    const { modalOpen, toggleModal, bus } = this.props;
    const cs = classet.map((c, i) => {
      return { label: c.niveau + ")" + c.Nom, value: c.id };
    })
    const elvs = elevet.map(e => {
      return { label: e.niveau + "" + e.nomClasse + " ) " + e.Nom + " " + e.prenom, value: e.id };
    })


    let defaultValues = {
      mat: bus.matricule,
      nbplac: bus.nbplace,
      nomch: bus.nomchauffeur,
      telch: bus.numtelChauffeur,
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
              <Label for="mat">Matricule :</Label>
              <AvField
                type="text"
                name="mat"
                id="mat"
                required
                validate={{
                  required: {
                    value: true,
                    errorMessage: "Veuillez saisir la matricule"
                  },

                  minLength: {
                    value: 3,
                    errorMessage:
                      "3 caractéres minimum !"
                  },

                }} />


            </AvGroup>
            <AvGroup className="error-t-negative">
              <Label for="img">Photo bus :</Label>

              <AvField
                name="img"
                type="file"
                onChange={this.uploadimg}
                accept="image/*"
              />

            </AvGroup>
            <AvGroup className="error-t-negative">
              <Label for="lieu">Nombre de places :</Label>
              <AvField
                type="number"
                name="nbplac"
                id="nbplac"
                min="1"
                required
                validate={{
                  required: {
                    value: true,
                    errorMessage: "Veuillez saisir le nombre de places"
                  },



                }} />
            </AvGroup>


            <AvGroup className="error-t-negative">
              <Label for="mat">Nom complet chauffeur :</Label>
              <AvField
                type="text"
                name="nomch"
                id="nomch"
                required
                validate={{
                  required: {
                    value: true,
                    errorMessage: "Veuillez saisir le nom chauffeur"
                  },

                  minLength: {
                    value: 3,
                    errorMessage:
                      "5 caractéres minimum !"
                  },

                }} />

            </AvGroup>

            <AvGroup className="error-t-negative">
              <Label for="img">Photo chauffeur :</Label>
              {/* <div className="error-t-negative position-relative"> */}

              <AvField
                name="chauf"
                type="file"
                onChange={this.uploadchauf}
                accept="image/*"
              />
              {/* {this.state.img == undefined && this.state.isSubmited &&
                  <>
                    <div className="av-invalid is-invalid form-control d-none"></div>
                    <div class="invalid-feedback position-absolute">Veuillez insérer une photo</div>
                  </>
                } */}
              {/* </div> */}
            </AvGroup>
            <AvGroup className="error-t-negative">
              <Label for="tel">N° Téléphone :</Label>
              <AvField
                name="telch"
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


            <AvGroup className="error-t-negative">
              <Label for="file">Fichier des horaires PDF :</Label>
              <AvField
                name="file"
                type="file"
                onChange={this.uploadfile}
                accept="application/pdf,application/vnd.ms-excel"

              />


            </AvGroup>


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
                placeholder="Sélectionner une classe..."
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
            <Label>
              Eleves :
            </Label>
            <div className="error-t-negative position-relative">

              <Select
                onChange={this.handleChangeElv}
                value={valueElv}
                options={elvs}
                className="react-select"
                placeholder="Sélectionner les éléves..."
                classNamePrefix="react-select"
                name="eleve"
                required
                isMulti

              />
              <br></br>
              {this.state.valueElv.length === 0 && this.state.isSubmited &&
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
    );
  }
}
export default UpdateModal;


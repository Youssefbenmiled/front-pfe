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
      valueElv: [],
      classet: [],
      elevet: [],
      chauf: undefined,


    };


  }

  componentWillReceiveProps(nextProps) {
    if (nextProps) {


      this.setState({
        img: undefined,
        files: undefined,
        chauf: undefined,
        isSubmited: false,
        valueClasse: [],
        valueNiveau: [],
        valueElv: [],
        classet: [],
        elevet: []

      })
    }
  }

  handlechangeNiveau = (value) => {
    this.setState({
      valueNiveau: value,
      valueClasse: [],
      valueElv: [],
      classet: [],
      elevet: []
    }, this.classes(value))


  }
  handleChangeClasse = (value) => {
    this.setState({ valueClasse: value, valueElv: [], elevet: [] },
      this.eleves(value))
  }

  handleChangeElv = (value) => {
    this.setState({ valueElv: value })
  }

  uploadimg = (event) => {
    let img = event.target.files[0]
    this.setState({ img })

  }

  uploadch = (event) => {
    let chauf = event.target.files[0]
    this.setState({ chauf })

  }
  uploadfile = (event) => {
    let files = event.target.files[0]
    this.setState({ files })

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

  test(nbplac) {
    const { valueElv } = this.state;

    // let nbelev = 0;
    // for (var i = 0; i < valueClasse.length; i++) {
    //   nbelev += parseInt(valueClasse[i].nb)
    // }

    if (valueElv.length > nbplac)
      return false
    else
      return true

  }

  handleSubmit = (event, errors, values) => {
    event.preventDefault();

    if (!localStorage.getItem('user_id'))
      return this.props.handleLogout();


    const { mat, nbplac, nomch, telch, } = values
    const { valueClasse, files, img, valueElv, chauf } = this.state;
    this.setState({ isSubmited: true })

    // let cls = valueClasse.map(classe => classe.value).join(',')
    let elvs = valueElv.map(eleve => eleve.value).join(',')



    if (errors.length === 0 && valueElv.length > 0 && files) {


      if (!this.test(nbplac)) {
        NotificationManager.warning(
          "Nombre des ??l??ves d??passe le nombre des places",
          "TRANSPORT",
          5000,
          null,
          null,
        );
        return;
      }



      NotificationManager.primary(
        "Requ??te en cours",
        "TRANSPORT",
        1000,
        null,
        null,
      );


      let data = new FormData()
      try {
        data.append('fileHorraire', files);
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
          method: 'post',
          url: 'http://api.onyx.inedit-gd.tn/transport/add',
          data: data,
          headers: { 'Content-Type': 'multipart/form-data' }

        })
          .then(res => {
            NotificationManager.success(
              "Bus ajout?? avec succ??s",
              "TRANSPORT",
              3000,
              null,
              null,
            );

            return this.props.callback();

          },
            error => {
              NotificationManager.warning(
                "Matricule existe",
                "TRANSPORT",
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

  render() {
    const { valueNiveau, valueClasse, valueElv, classet, elevet } = this.state


    const cs = classet.map((c, i) => {
      return { label: c.niveau + ")" + c.Nom, value: c.id, nb: c.nbEleves };
    })
    const elvs = elevet.map(e => {
      return { label: e.niveau + "" + e.nomClasse + " ) " + e.Nom + " " + e.prenom, value: e.id };
    })

    const { modalOpen, toggleModal } = this.props;

    let defaultValues = {
      mat: "",
      nbplac: "",
      nomch: "",
      telch: "",

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
                      "3 caract??res minimum !"
                  },

                }} />

            </AvGroup>
            <AvGroup className="error-t-negative">
              <Label for="img">Photo bus :</Label>
              {/* <div className="error-t-negative position-relative"> */}

              <AvField
                name="img"
                type="file"
                onChange={this.uploadimg}
                accept="image/*"
              />
              {/* {this.state.img == undefined && this.state.isSubmited &&
                  <>
                    <div className="av-invalid is-invalid form-control d-none"></div>
                    <div class="invalid-feedback position-absolute">Veuillez ins??rer une photo</div>
                  </>
                } */}
              {/* </div> */}
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
                    value: 5,
                    errorMessage:
                      "5 caract??res minimum !"
                  },

                }} />


            </AvGroup>
            <AvGroup className="error-t-negative">
              <Label for="img">Photo chauffeur :</Label>
              {/* <div className="error-t-negative position-relative"> */}

              <AvField
                name="chauf"
                type="file"
                onChange={this.uploadch}
                accept="image/*"
              />
              {/* {this.state.img == undefined && this.state.isSubmited &&
                  <>
                    <div className="av-invalid is-invalid form-control d-none"></div>
                    <div class="invalid-feedback position-absolute">Veuillez ins??rer une photo</div>
                  </>
                } */}
              {/* </div> */}
            </AvGroup>
            <AvGroup className="error-t-negative">
              <Label for="tel">N?? T??l??phone :</Label>
              <AvField
                name="telch"
                type="number"
                min="1"
                validate={{
                  required: {
                    value: true,
                    errorMessage: "Veuillez saisir le N?? de t??l??phone"
                  },
                  pattern: {
                    value: "^[0-9]+$",
                    errorMessage: "le N?? de T??l??phone doit ??tre compos?? de 8 chiffres"
                  },
                  minLength: {
                    value: 8,
                    errorMessage: "le N?? de T??l??phone doit ??tre compos?? de 8 chiffres"
                  },
                  maxLength: {
                    value: 8,
                    errorMessage: "le N?? de T??l??phone doit ??tre compos?? de 8 chiffres"
                  },
                }}
              />
            </AvGroup>


            <AvGroup className="error-t-negative">
              <Label for="file">Fichier des horaires PDF :</Label>
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
                    <div class="invalid-feedback position-absolute">Veuillez ins??rer un fichier</div>
                  </>
                }
              </div>
            </AvGroup>


            <Label>
              Niveau :
             </Label>
            <div className="error-t-negative position-relative">

              <Select
                onChange={this.handlechangeNiveau}
                value={valueNiveau}
                options={levels}
                className="react-select"
                placeholder="S??lectionner un niveau..."
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
                placeholder="S??lectionner une classe..."
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
                placeholder="S??lectionner les ??l??ves..."
                classNamePrefix="react-select"
                name="eleve"
                required
                isMulti

              />
              <br></br>
              {this.state.valueElv.length === 0 && this.state.isSubmited &&
                <>
                  <div className="av-invalid is-invalid form-control d-none"></div>
                  <div class="invalid-feedback">Veuillez saisir au moins un ??l??ve</div>
                </>
              }
            </div>

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
    )
  }
}



export default AddNewModal;

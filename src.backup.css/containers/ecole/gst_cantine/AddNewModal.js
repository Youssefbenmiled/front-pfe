import React, { Component, Fragment } from "react";
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
  AvInput
} from "availity-reactstrap-validation";
import axios from "axios"
import Select from "react-select";
// import "./add.css"
import { NotificationManager } from "../../../components/common/react-notifications";
import { Separator } from "../../../components/common/CustomBootstrap";
import moment from "moment";
import { levels } from "../../../constants/defaultValues";

class AddNewModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      files: undefined,
      isSubmited: false,
      mind: (new Date().getUTCFullYear() - 1) + "-" + (9) + "-" + (1),
      maxd: (new Date().getUTCFullYear() + 1) + "-" + (9) + "-" + (1),

    };
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps)
      this.setState({

        files: undefined,
        isSubmited: false,
        //   valueLevel: [],
        //   valueClasse: [],
        //   valueEleve: [],
        //   classet: [],
        //   elevet: [],
      })


  }



  handleSubmit = (event, errors, values) => {
    event.preventDefault();


    const { files } = this.state
    const { dat1, dat2, hdebut, hfin } = values
    this.setState({ isSubmited: true, })

    if (errors.length === 0 && files) {
      if (dat1.localeCompare(dat2) === 1) {
        NotificationManager.warning(
          "Vérifier les dates",
          "MENU",
          5000,
          null,
          null,
        );
        return;
      }
      if (hdebut.localeCompare(hfin) > -1) {
        NotificationManager.warning(
          "Vérifier les horaires",
          "MENU CANTINE",
          5000,
          null,
          null,
        );
        return;
      }
      NotificationManager.primary(
        "Requête en cours",
        "MENU CANTINE",
        1000,
        null,
        null,
      );

      try {
        let data = new FormData()
        data.append('file', files);
        data.append('delaisDebut', dat1);
        data.append('delaisFin', dat2);
        data.append('heureDebut', hdebut.toString());
        data.append('heureFin', hfin.toString());
        // data.append('idEleve', valueEleve.map(eleve => eleve.value));
        this.props.toggleModal();

        axios({
          method: 'post',
          url: 'http://api.onyx.inedit-gd.tn/cantine/add',
          data: data,
          headers: { 'Content-Type': 'multipart/form-data' }

        })
          .then(res => {
            NotificationManager.success(
              "Ajout et envoi avec succés",
              "MENU CANTINE",
              3000,
              null,
              null,
            );


            return this.props.callback();

          },
            error => {
              NotificationManager.warning(
                "Erreur d'ajout",
                "MENU CANTINE",
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


  upload = (event) => {
    let files = event.target.files[0]
    this.setState({ files })

  }



  render() {
    const { modalOpen, toggleModal } = this.props;
    let defaultValues = {
      dat1: "",
      dat2: "",
      hdebut: "",
      hfin: "",
    };
    // const cs = this.state.classet.map(c => {
    //   return { label: c.niveau + ")" + c.Nom, value: c.id };
    // })

    // const elvs = this.state.elevet.map(e => {
    //   return { label: e.niveau + "" + e.nomClasse + " ) " + e.Nom + " " + e.prenom, value: e.id };
    // })
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
            className="av-tooltip tooltip-label-right"
            model={defaultValues}
            onSubmit={this.handleSubmit}>


            <AvGroup className="error-t-negative">
              <Label for="dns">Période à partir de :</Label>
              <AvField
                name="dat1"
                type="date"
                value={defaultValues.dat1}
                min={moment(this.state.mind, 'YYYY-MM-DD').format('YYYY-MM-DD')}
                max={moment(this.state.maxd, 'YYYY-MM-DD').format('YYYY-MM-DD')}
                required
                validate={{
                  required: {
                    value: true,
                    errorMessage: "Veuillez saisir la date"
                  },

                }}
              />
            </AvGroup>


            <AvGroup className="error-t-negative">
              <Label for="dns">Jusqu'à :</Label>
              <AvField
                name="dat2"
                type="date"
                value={defaultValues.dat2}
                min={moment(new Date(), 'YYYY-MM-DD').format('YYYY-MM-DD')}
                max={moment(this.state.maxd, 'YYYY-MM-DD').format('YYYY-MM-DD')}
                required
                validate={{
                  required: {
                    value: true,
                    errorMessage: "Veuillez saisir la date"
                  },

                }}
              />
            </AvGroup>
            <AvGroup className="error-t-negative">
              <Label for="dns">Heure début :</Label>
              <AvField
                name="hdebut"
                type="time"
                value={defaultValues.hdebut}
                required
                validate={{
                  required: {
                    value: true,
                    errorMessage: "Veuillez vérifier l'heure de début"
                  },

                }}
              />
            </AvGroup>
            <AvGroup className="error-t-negative">
              <Label for="dns">Heure fin :</Label>
              <AvField
                name="hfin"
                type="time"
                value={defaultValues.hfin}
                required
                validate={{
                  required: {
                    value: true,
                    errorMessage: "Veuillez saisir l'heure de fermeture"
                  },

                }}
              />

            </AvGroup>
            <AvGroup className="error-t-negative">
              <Label for="file">Fichier menu PDF :</Label>
              <div className="error-t-negative position-relative">
                <AvInput
                  name="file"
                  type="file"
                  onChange={this.upload}
                  accept="application/pdf,application/vnd.ms-excel"

                />
                {this.state.files == undefined && this.state.isSubmited &&
                  <>
                    <div className="av-invalid is-invalid form-control d-none"></div>
                    <div class="invalid-feedback">Veuillez insérer un fichier</div>
                  </>
                }
              </div>
            </AvGroup>


            <br></br>
            <br></br>
            <Button
              color="secondary"
              id="add"
              type="submit"
            >
              Créer
              </Button>
            <Button
              color="danger"
              onClick={toggleModal}
              id="annuldat"
            >
              Annuler
              </Button>
          </AvForm>


        </ModalBody>





      </Modal>




    );
  }
}
export default AddNewModal;



{/* <br></br>
            <Separator className="mb-5" />
            <center><h2>Affecter l'éléve au menu</h2></center>
            <br></br>
            <Separator className="mb-5" />
            <Label>
              Niveau éléve :
            </Label>
            <div className="error-t-negative position-relative">

              <Select
                onChange={this.handleChangeLevel}
                value={this.state.valueLevel}
                options={levels}
                isMulti
                className="react-select"
                placeholder="Sélectionner le(s) niveau(x).."
                classNamePrefix="react-select"
                name="form-field-name"
              />
              <br></br>
              <br></br>
              {this.state.valueLevel.length === 0 && this.state.isSubmited &&
                <>
                  <div className="av-invalid is-invalid form-control d-none"></div>
                  <div class="invalid-feedback">Veuillez saisir au moins un niveau</div>
                </>
              }
            </div>
            <Label>
              Classe éléve :
              </Label>
            <div className="error-t-negative position-relative">

              <Select
                onChange={this.handleChangeClasse}
                value={this.state.valueClasse}
                options={cs}
                isMulti
                className="react-select"
                placeholder="Sélectionner le(s) classe(s).."
                classNamePrefix="react-select"
                name="form-field-name"
              />
              <br></br>
              <br></br>

              {this.state.valueClasse.length === 0 && this.state.isSubmited &&
                <>
                  <div className="av-invalid is-invalid form-control d-none"></div>
                  <div class="invalid-feedback">Veuillez saisir au moins une classe</div>
                </>
              }
            </div>

            <Label>
              Eléve :
              </Label>
            <div className="error-t-negative position-relative">

              <Select
                onChange={this.handleChangeEleve}
                value={this.state.valueEleve}
                options={elvs}
                isMulti
                className="react-select"
                placeholder="Sélectionner le(s) éléves.."
                classNamePrefix="react-select"
                name="form-field-name"
              />
              <br></br>
              <br></br>
              {this.state.valueEleve.length === 0 && this.state.isSubmited &&
                <>
                  <div className="av-invalid is-invalid form-control d-none"></div>
                  <div class="invalid-feedback">Veuillez saisir au moins un éléve</div>
                </>
              }
            </div> 
          // handleChangeLevel = value => {
  //   this.setState({
  //     valueLevel: value, valueClasse: [], valueEleve: [], classet: [], elevet: []
  //   },
  //     this.classes(value));

  // };
  // handleChangeClasse = value => {
  //   this.setState({
  //     valueClasse: value, valueEleve: [], elevet: []
  //   },
  //     this.eleves(value));

  // };
  // handleChangeEleve = value => {
  //   this.setState({
  //     valueEleve: value
  //   });
  // };

  // classes(niveau) {
  //   niveau = niveau.map(n => n.value).join(',');
  //   try {
  //     axios
  //       .get(
  //         "http://api.onyx.inedit-gd.tn/classe/classe/" + niveau)
  //       .then(res => {
  //         console.log(res)
  //         return res.data;
  //       })
  //       .then(data => {

  //         this.setState({
  //           classet: data,

  //         });
  //       }, error => {
  //         console.log(error)
  //       });
  //   }
  //   catch (error) {
  //     console.log("failed" + error)
  //   }
  // }

  // eleves(idclasse) {
  //   var idc = idclasse.map(c => c.value).join(',');

  //   try {
  //     axios
  //       .get("http://api.onyx.inedit-gd.tn/eleve/filtre/" + idc)
  //       .then(res => {
  //         console.log(res)
  //         return res.data;
  //       })
  //       .then(data => {

  //         this.setState({
  //           elevet: data,

  //         });
  //       }, error => {
  //         console.log(error)
  //       });
  //   }
  //   catch (error) {
  //     console.log("failed" + error)
  //   }

  // }

          
          
          */}
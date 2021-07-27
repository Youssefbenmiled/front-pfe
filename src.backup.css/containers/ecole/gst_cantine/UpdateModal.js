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
import moment from "moment"
import { levels } from "../../../constants/defaultValues";
import Select from "react-select";
import { Separator } from "../../../components/common/CustomBootstrap";

// import "./update.css"
class UpdateModal extends Component {

  constructor(props) {
    super(props);

    this.state = {
      files: undefined,
      isSubmited: false,
      // lyoum: new Date().getUTCFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate(),
      mind: (new Date().getUTCFullYear() - 1) + "-" + (9) + "-" + (1),
      maxd: (new Date().getUTCFullYear() + 1) + "-" + (9) + "-" + (1),
      // valueLevel: [],
      // valueClasse: [],
      // valueEleve: [],
      // classet: [],
      // elevet: [],

    };
  }




  componentWillReceiveProps(nextProps) {

    this.setState({
      // valueLevel: this.getUnique(nextProps.tuteur.eleves.map(eleve => ({ label: eleve.classe.niveau, value: eleve.classe.niveau }))),
      // valueClasse: nextProps.tuteur.eleves.map(eleve => ({ label: eleve.classe.niveau + ")" + eleve.classe.nom, value: eleve.classe.id })),
      // valueEleve: nextProps.tuteur.eleves.map(eleve => ({ label: eleve.classe.niveau + "" + eleve.classe.nom + " ) " + eleve.Nom + " " + eleve.prenom, value: eleve.id })),
      files: undefined,
      isSubmited: false,

    })


  }

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

  handleSubmit = (event, errors, values) => {
    event.preventDefault();

    this.setState({ isSubmited: true })
    const { cantine } = this.props
    const { files, valueEleve } = this.state
    const { dat1, dat2, hdebut, hfin } = values

    if (
      dat1.localeCompare(moment(cantine.delaiDebut, 'YYYY-MM-DD').format('YYYY-MM-DD')) == 0 &&
      dat2.localeCompare(moment(cantine.delaisFin, 'YYYY-MM-DD').format('YYYY-MM-DD')) == 0 &&
      hdebut.localeCompare(cantine.heureDebut) == 0 &&
      hfin.localeCompare(cantine.heureFin) == 0 &&
      files === undefined
    ) {
      NotificationManager.warning(
        "Aucune modification n'a été effectuée",
        "MENU CANTINE",
        5000,
        null,
        null,
      );
      return;
    }




    if (errors.length === 0) {
      if (hdebut.localeCompare(hfin) != -1) {
        NotificationManager.warning(
          "Vérifier les horaires",
          "MENU CANTINE",
          5000,
          null,
          null,
        );
        return;
      }

      if (dat1.localeCompare(dat2) === 1) {
        NotificationManager.warning(
          "Vérifier les dates",
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
        data.append('id', cantine.id);
        data.append('delaisDebut', dat1);
        data.append('delaisFin', dat2);
        data.append('heureDebut', hdebut.toString());
        data.append('heureFin', hfin.toString());
        if (this.state.files)
          data.append('file', files);
        else
          data.append('file', undefined);

        // data.append('idEleve', valueEleve.map(eleve => eleve.value));
        this.props.toggleModal();


        axios({
          method: 'put',
          url: 'http://api.onyx.inedit-gd.tn/cantine/update',
          data: data,
          headers: { 'Content-Type': 'multipart/form-data' }

        })
          .then(res => {
            NotificationManager.success(
              "Modification et envoi avec succés",
              "MENU CANTINE",
              3000,
              null,
              null,
            );


            this.props.callback();
            return;
          },
            error => {
              console.log(error)
              NotificationManager.warning(
                "Erreur de modification",
                "MENU CANTINE",
                5000,
                null,
                null,
              );
              return;
            }

          )


      } catch (error) {
        console.log("failed" + error);

      }
    }
  }
  annuler = () => {
    this.props.toggleModal()
    this.props.setST()
  }


  upload = (event) => {
    let files = event.target.files[0]
    this.setState({ files })

  }

  render() {

    const {
      modalOpen,
      toggleModal,
      cantine
    } = this.props;


    let defaultValues = {
      dat1: moment(cantine.delaiDebut, 'YYYY-MM-DD').format('YYYY-MM-DD'),
      dat2: moment(cantine.delaisFin, 'YYYY-MM-DD').format('YYYY-MM-DD'),
      hdebut: cantine.heureDebut,
      hfin: cantine.heureFin,
    };



    // const cs = this.state.classet.map((c, i) => {
    //   return { label: c.niveau + ")" + c.Nom, value: c.id };
    // })

    // const elvs = this.state.elevet.map((e, i) => {
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
              <Label for="dat1">Menu valable à partir de :</Label>
              <AvField
                name="dat1"
                type="date"
                min={moment(this.state.mind, 'YYYY-MM-DD').format('YYYY-MM-DD')}
                max={moment(this.state.maxd, 'YYYY-MM-DD').format('YYYY-MM-DD')}
                value={defaultValues.dat1}
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
              <Label for="dat2">Jusqu'à :</Label>
              <AvField
                name="dat2"
                type="date"
                min={moment(new Date(), 'YYYY-MM-DD').format('YYYY-MM-DD')}
                max={moment(this.state.maxd, 'YYYY-MM-DD').format('YYYY-MM-DD')}
                required
                value={defaultValues.dat2}
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
                    errorMessage: "Veuillez saisir l'heure de début"
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
              <AvField
                name="file"
                type="file"
                onChange={this.upload}
                accept="application/pdf,application/vnd.ms-excel"
              />

            </AvGroup>
            <br></br>



            {/* <Separator className="mb-5" />
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
            </div> */}

            <br></br>
            <br></br>
            <Button
              color="secondary"
              id="mup"
              type="submit"
            >
              Modifier
              </Button>
            <Button
              color="danger"
              onClick={this.annuler}
              id="anup">
              Annuler
              </Button>
          </AvForm>


        </ModalBody>



      </Modal>
    );
  }
}
export default UpdateModal;


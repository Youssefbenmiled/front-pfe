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



  handleSubmit = (event, errors, values) => {
    event.preventDefault();
    if (!localStorage.getItem('user_id'))
      return this.props.handleLogout();


    this.setState({ isSubmited: true })
    const { cantine } = this.props
    // const { files, valueEleve } = this.state
    const { dat1, dat2, hdebut, hfin } = values

    if (
      dat1.localeCompare(moment(cantine.delaiDebut, 'YYYY-MM-DD').format('YYYY-MM-DD')) == 0 &&
      dat2.localeCompare(moment(cantine.delaisFin, 'YYYY-MM-DD').format('YYYY-MM-DD')) == 0 &&
      hdebut.localeCompare(cantine.heureDebut) == 0 &&
      hfin.localeCompare(cantine.heureFin) == 0
      // files === undefined
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
        const data = {
          "id": cantine.id,
          "delaisDebut": dat1,
          "delaisFin": dat2,
          "heureDebut": hdebut.toString(),
          "heureFin": hfin.toString()
        }
        // let data = new FormData()
        // data.append('id', cantine.id);
        // data.append('delaisDebut', dat1);
        // data.append('delaisFin', dat2);
        // data.append('heureDebut', hdebut.toString());
        // data.append('heureFin', hfin.toString());
        // if (this.state.files)
        //   data.append('file', files);
        // else
        //   data.append('file', undefined);

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


            return this.props.callback();

          },
            error => {
              NotificationManager.warning(
                "Erreur de modification",
                "MENU CANTINE",
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
            {/* <AvGroup className="error-t-negative">
              <Label for="file">Fichier menu PDF :</Label>
              <AvField
                name="file"
                type="file"
                onChange={this.upload}
                accept="application/pdf,application/vnd.ms-excel"
              />

            </AvGroup> */}
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


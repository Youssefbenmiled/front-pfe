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
import moment from "moment"
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

// import "./update.css"
class UpdateModal extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isSubmited: false,
      valueT: null,
      // lyoum: new Date().getUTCFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate(),
      ghodwa: (new Date().getUTCFullYear() + 1) + "-" + (9) + "-" + (1),
      valueD: null,
      domainet: [],

    };
  }
  getDomaines() {
    const {
      niveau
    } = this.props;


    var query = "http://api.onyx.inedit-gd.tn/domaine/getAll?classe=" + niveau;

    try {
      axios
        .get(query)
        .then(res => {
          return res.data;
        })
        .then(data => {
          this.setState({
            domainet: data.list,
          });
        }, error => {
          console.log(error)
        });
    }
    catch (error) {
      console.log("failed" + error)
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      this.getDomaines()
      this.setState({
        isSubmited: false,
        valueT: { label: nextProps.exam.trimestre, value: nextProps.exam.trimestre },
        valueD: { label: nextProps.exam.domaine, value: nextProps.exam.domaine },

      })

    }
  }


  handleChangeT = (value) => {
    this.setState({ valueT: value })
  }
  handleChangeD = (value) => {
    this.setState({ valueD: value })
  }





  handleSubmit = (event, errors, values) => {
    // event.preventDefault();
    event.persist()
    let { dat, hdebut, hfin, desc } = values
    const { exam, idClasse } = this.props
    const { valueT, valueD } = this.state
    this.setState({ isSubmited: true })


    if (errors.length === 0 && valueT && valueD) {
      if (exam.trimestre == valueT.value &&
        exam.domaine.localeCompare(valueD.label) === 0 &&
        exam.description.trim().localeCompare(desc.trim()) === 0 &&
        moment(exam.date, 'YYYY-MM-DD').format('YYYY-MM-DD').localeCompare(dat) === 0 &&
        exam.HeureDebut.localeCompare(hdebut) === 0 &&
        exam.heureFin.localeCompare(hfin) === 0

      ) {
        NotificationManager.warning(
          "Aucune modification",
          "DATE EVALUATION",
          5000,
          null,
          null,
        );

        return;
      }
      if (hdebut.localeCompare(hfin) != -1) {
        NotificationManager.warning(
          "Vérifier les horaires",
          "DATE EVALUATION",
          5000,
          null,
          null,
        );
        return;
      }

      if (desc.trim().length === 0) {
        desc = "-1"
      }
      const data = {
        id: exam.id,
        trimestre: valueT.value,
        domaine: valueD.label,
        description: desc.trim().toString(),
        date: dat,
        HeureDebut: hdebut.toString(),
        heureFin: hfin.toString(),
        classe: idClasse,

      }
      try {
        this.props.toggleModal();

        axios({
          method: 'put',
          url: 'http://api.onyx.inedit-gd.tn/evaluation/update',
          data: data,
        })
          .then(res => {
            console.log(res);
            NotificationManager.success(
              "Modification avec succés",
              "DATE EVALUATION",
              3000,
              null,
              null,
            );
            return this.props.callback();


          }, error => {
            console.log(error)
            NotificationManager.warning(
              "Erreur de modification",
              "DATE EVALUATION",
              5000,
              null,
              null,
            );
            return error;

          })

      }
      catch (error) {
        console.log("failed" + error);

      }



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
      exam
    } = this.props;


    const sem = [
      { label: "1", value: 1 },
      { label: "2", value: 2 },
      { label: "3", value: 3 }
    ];
    const dms = this.state.domainet.map(dm => {
      return { label: dm.nom, value: dm.id }
    })
    if (exam.description && parseInt(exam.description) === -1) {
      exam.description = " "
    }
    let defaultValues = {
      dat: moment(exam.date, 'YYYY-MM-DD').format('YYYY-MM-DD'),
      hdebut: exam.HeureDebut,
      hfin: exam.heureFin,
      desc: exam.description
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
            <br></br>
            <br></br>

            <Label>Trimestre :</Label>

            <div className="error-t-negative position-relative">
              <Select
                onChange={this.handleChangeT}
                value={this.state.valueT}
                options={sem}
                className="react-select position-relative"
                placeholder="Sélectionner un trimestre..."
                classNamePrefix="react-select"
                name="form-field-name"
                required
              />
              {this.state.valueT == null && this.state.isSubmited &&
                <>
                  <div className="av-invalid is-invalid form-control d-none"></div>
                  <div class="invalid-feedback">Veuillez saisir le trimestre</div>
                </>
              }
            </div>
            <br></br>
            <Label>Domaine :</Label>

            <div className="error-t-negative position-relative">
              <Select
                onChange={this.handleChangeD}
                value={this.state.valueD}
                options={dms}
                className="react-select position-relative"
                placeholder="Sélectionner un domaine..."
                classNamePrefix="react-select"
                name="form-field-name"
                required
              />
              {this.state.valueD == null && this.state.isSubmited &&
                <>
                  <div className="av-invalid is-invalid form-control d-none"></div>
                  <div class="invalid-feedback">Veuillez saisir le domaine</div>
                </>
              }
            </div>
            <br></br>
            <AvGroup className="error-t-negative">
              <Label for="desc">Description :</Label>
              <AvField
                name="desc"
                type="textarea"
                value={defaultValues.desc}

              />
            </AvGroup>
            <AvGroup className="error-t-negative">
              <Label for="dns">Date évaluation :</Label>
              <AvField
                name="dat"
                type="date"
                value={defaultValues.dat}
                min={moment(new Date(), 'YYYY-MM-DD').format('YYYY-MM-DD')}
                max={moment(this.state.ghodwa, 'YYYY-MM-DD').format('YYYY-MM-DD')}
                required
                validate={{
                  required: {
                    value: true,
                    errorMessage: "Veuillez saisir la date d'échéance"
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
                    errorMessage: "Veuillez saisir l'heure début"
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
                    errorMessage: "Veuillez saisir l'heure fin"
                  },

                }}
              />
            </AvGroup>


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
              onClick={toggleModal}
              id="anup">
              Annuler
              </Button>
          </AvForm>


        </ModalBody>



      </Modal >
    );
  }
}
export default UpdateModal;


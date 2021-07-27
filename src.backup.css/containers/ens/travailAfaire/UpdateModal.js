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
import Select from "react-select";
import moment from "moment"

// import "./update.css"
class UpdateModal extends Component {

  constructor(props) {
    super(props);

    this.state = {
      files: undefined,
      isSubmited: false,
      valueT: null,
      valueD: null,
      domainet: [],
      // lyoum: new Date().getUTCFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate(),
      mind: (new Date().getUTCFullYear() - 1) + "-" + (9) + "-" + (1),
      maxd: (new Date().getUTCFullYear() + 1) + "-" + (9) + "-" + (1),
    };
  }

  handleChangeT = (value) => {
    this.setState({ valueT: value })
  }

  handleChangeD = (value) => {
    this.setState({ valueD: value })
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.devoir) {
      this.getDomaines();
      this.setState({
        isSubmited: false,
        valueT: { label: nextProps.devoir.trimestre, value: nextProps.devoir.trimestre },
        valueD: { label: nextProps.devoir.niveau + " " + nextProps.devoir.domaine, value: nextProps.devoir.domaine, attribut: nextProps.devoir.domaine },
        files: undefined,
      })
    }
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



  handleSubmit = (event, errors, values) => {
    event.preventDefault();
    const { desc, datech } = values
    const { devoir, idClasse } = this.props
    const { valueT, valueD, files } = this.state

    // moment(devoir.dateEnvoi, 'YYYY-MM-DD').format('YYYY-MM-DD')

    if (errors.length === 0 && valueT && valueD) {

      if (devoir.trimestre === valueT.value &&
        devoir.domaine.localeCompare(valueD.attribut) === 0 &&
        devoir.description.localeCompare(desc.trim()) === 0 &&
        files === undefined &&
        // moment(devoir.dateEnvoi, 'YYYY-MM-DD').format('YYYY-MM-DD').localeCompare(datenv) === 0 &&
        moment(devoir.dateEcheance, 'YYYY-MM-DD').format('YYYY-MM-DD').localeCompare(datech) === 0
      ) {
        NotificationManager.warning(
          "Aucune modification",
          "DEVOIR",
          5000,
          null,
          null,
        );

        return;
      }

      // if (datenv.localeCompare(datech) === 1) {
      //   NotificationManager.warning(
      //     "Vérifier les dates",
      //     "DEVOIR",
      //     5000,
      //     null,
      //     null,
      //   );

      //   return;
      // }

      let data = new FormData()
      data.append('id', devoir.id);
      if (files)
        data.append('file', files);
      else
        data.append('file', undefined);

      data.append('trimestre', valueT.value);
      data.append('domaine', valueD.value);
      data.append('description', desc.trim());
      // data.append('dateEnvoi', datenv);
      data.append('dateEcheance', datech);
      data.append('idClasse', idClasse);

      try {
        this.props.toggleModal();
        axios
          .put(
            "http://api.onyx.inedit-gd.tn/travail/update", data)
          .then(res => {
            console.log(res);

            NotificationManager.success(
              "Modification avec succés",
              "DEVOIR",
              3000,
              null,
              null,
            );
            return this.props.callback();


          }, error => {
            console.log(error)
            NotificationManager.warning(
              "Erreur de modification",
              "DEVOIR",
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

  upload = (event) => {
    let files = event.target.files[0]
    this.setState({ files })

  }

  render() {

    const {
      modalOpen,
      toggleModal,
      devoir
    } = this.props;



    const sem = [
      { label: 1, value: 1 },
      { label: 2, value: 2 },
      { label: 3, value: 3 }
    ];
    const dms = this.state.domainet.map(dm => {
      return { label: dm.nom, value: dm.id, attribut: dm.nom }
    })

    let defaultValues = {
      desc: devoir.description,
      // datenv: moment(devoir.dateEnvoi, 'YYYY-MM-DD').format('YYYY-MM-DD'),
      datech: moment(devoir.dateEcheance, 'YYYY-MM-DD').format('YYYY-MM-DD'),
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
            className="av-tooltip tooltip-label-right"
            model={defaultValues}
            onSubmit={this.handleSubmit}>
            <br></br>
            <br></br>

            <Label>Trimestre :</Label>

            <Select
              onChange={this.handleChangeT}
              value={this.state.valueT}
              options={sem}
              className="react-select position-relative"
              classNamePrefix="react-select"
              name="form-field-name"
              required
            />

            <br></br>

            <Label>Domaine :</Label>

            <Select
              onChange={this.handleChangeD}
              value={this.state.valueD}
              options={dms}
              className="react-select position-relative"
              classNamePrefix="react-select"
              name="form-field-name"
              required
            />

            <br></br>
            <AvGroup className="error-t-negative">
              <Label for="dns">Description :</Label>
              <AvField
                name="desc"
                type="textarea"
                value={defaultValues.desc}

              />
            </AvGroup>
            <Label for="dns">Document à réviser :</Label>
            <Input
              type="file"
              name="file"
              accept="application/pdf,application/vnd.ms-excel"
              onChange={this.upload}
            />
            <br></br>
            {/* <AvGroup className="error-t-negative">
              <Label for="dns">Date d'envoi :</Label>
              <AvField
                name="datenv"
                type="date"
                value={defaultValues.datenv}
                min={moment(this.state.mind, 'YYYY-MM-DD').format('YYYY-MM-DD')}
                max={moment(this.state.maxd, 'YYYY-MM-DD').format('YYYY-MM-DD')}
                required
                validate={{
                  required: {
                    value: true,
                    errorMessage: "Veuillez saisir la date d'envoi"
                  },

                }}
              />
            </AvGroup> */}

            <AvGroup className="error-t-negative">
              <Label for="dns">Date d'échéance :</Label>
              <AvField
                name="datech"
                type="date"
                value={defaultValues.datech}
                min={moment(new Date(), 'YYYY-MM-DD').format('YYYY-MM-DD')}
                max={moment(this.state.maxd, 'YYYY-MM-DD').format('YYYY-MM-DD')}
                required
                validate={{
                  required: {
                    value: true,
                    errorMessage: "Veuillez saisir la date d'échéance"
                  },

                }}
              />
            </AvGroup>


            <br></br>
            <br></br>
            <Button
              color="secondary"
              id="mupdev"
              type="submit"
            >
              Modifier
            </Button>
            <Button
              color="danger"
              onClick={this.annuler}
              id="anupdev"
            >
              Annuler
              </Button>
          </AvForm>


        </ModalBody>



      </Modal>
    );
  }
}
export default UpdateModal;


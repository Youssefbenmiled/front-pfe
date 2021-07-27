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
} from "availity-reactstrap-validation";
import axios from "axios"
import Select from "react-select";
import moment from "moment"
// import "./add.css"
import { NotificationManager } from "../../../components/common/react-notifications";
import { Separator } from "../../../components/common/CustomBootstrap";

class AddNewModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      domainet: [],
      valueT: null,
      valueD: null,
      isSubmited: false,
      ghodwa: (new Date().getUTCFullYear() + 1) + "-" + (9) + "-" + (1),

    };
  }

  getDomaines() {

    var query = "http://api.onyx.inedit-gd.tn/domaine/getAll?classe=" + this.props.niveau;

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
          return error;
        });
    }
    catch (error) {
      return error;
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps) {


      this.getDomaines();
      this.setState({
        isSubmited: false,
        valueT: null,
        valueD: null,
        domainet: []

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
    event.preventDefault();
    if (!localStorage.getItem('user_id'))
      return this.props.handleLogout();
    const { valueT, valueD } = this.state
    let { dat, hdebut, hfin, desc } = values
    this.setState({ isSubmited: true })


    if (errors.length === 0 && valueT && valueD) {
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
      NotificationManager.primary(
        "Requête en cours",
        "DATE EVALUATION",
        500,
        null,
        null,
      );


      try {

        if (desc.length === 0) {
          desc = "-1"
        }


        const data = {
          trimestre: valueT.value,
          domaine: valueD.label,
          description: desc.trim(),
          date: dat,
          HeureDebut: hdebut.toString(),
          heureFin: hfin.toString(),
          idClasse: this.props.idClasse,

        }

        this.props.toggleModal();

        axios({
          method: 'post',
          url: 'http://api.onyx.inedit-gd.tn/evaluation/add',
          data: data,
        })
          .then(res => {
            NotificationManager.success(
              "Ajout avec succés",
              "DATE EVALUATION",
              3000,
              null,
              null,
            );


            return this.props.callback();

          },
            error => {
              NotificationManager.warning(
                "Erreur d'ajout",
                "DATE EVALUATION",
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


  render() {



    const { modalOpen, toggleModal } = this.props;

    let defaultValues = {
      dat: "",
      hdebut: "",
      hfin: "",
      desc: ""
    };

    const sem = [
      { label: "1", value: 1 },
      { label: "2", value: 2 },
      { label: "3", value: 3 }
    ];
    const dms = this.state.domainet.map(dm => {
      return { label: dm.nom, value: dm.id, attribut: dm.nom }
    })

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
              <Label for="dns">Date d'évaluation :</Label>
              <AvField
                name="dat"
                type="date"
                min={moment(new Date(), 'YYYY-MM-DD').format('YYYY-MM-DD')}
                max={moment(this.state.ghodwa, 'YYYY-MM-DD').format('YYYY-MM-DD')}
                value={defaultValues.dat}
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




    );
  }
}
export default AddNewModal;


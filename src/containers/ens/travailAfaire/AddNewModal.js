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
  AvInput,
  AvFeedback,
  AvRadioGroup,
  AvRadio,
  AvCheckboxGroup,
  AvCheckbox
} from "availity-reactstrap-validation";
import axios from "axios"
import Select from "react-select";
import CustomSelectInput from "../../../components/common/CustomSelectInput";
import IntlMessages from "../../../helpers/IntlMessages";
// import "./add.css"
import { NotificationManager } from "../../../components/common/react-notifications";
import { Separator } from "../../../components/common/CustomBootstrap";
import moment from "moment"

class AddNewModal extends Component {

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

      this.getDomaines()
      this.setState({
        isSubmited: false,
        valueT: null,
        valueD: null,
        files: undefined,

      })
    }
  }


  handleChangeT = (value) => {
    this.setState({ valueT: value })
  }

  handleChangeD = (value) => {
    this.setState({ valueD: value }, this.dataListRender)
  }


  handleSubmit = (event, errors, values) => {
    event.preventDefault();
    if (!localStorage.getItem('user_id'))
      return this.props.handleLogout();
    this.setState({ isSubmited: true })
    const { valueT, valueD, files } = this.state
    const { desc, datech, datenv } = values

    if (errors.length === 0 && valueT && valueD) {
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
      NotificationManager.primary(
        "Requête en cours",
        "TRAVAIL A FAIRE",
        500,
        null,
        null,
      );
      let data = new FormData();
      try {



        data.append('trimestre', valueT.value)
        data.append('domaine', valueD.label)
        data.append('description', desc.trim())
        if (files)
          data.append('file', files)

        else
          data.append('file', null)

        data.append('dateEnvoi', moment(new Date(), 'YYYY-MM-DD').format('DD-MM-YYYY'))
        data.append('dateEcheance', datech)
        data.append('idClasse', this.props.idClasse)



        this.props.toggleModal();

        axios({
          method: 'post',
          url: 'http://api.onyx.inedit-gd.tn/travail/add',
          data: data,
        })
          .then(res => {
            NotificationManager.success(
              "Ajout avec succés",
              "TRAVAIL A FAIRE",
              3000,
              null,
              null,
            );


            return this.props.callback();

          },
            error => {
              NotificationManager.warning(
                "Travail à faire non ajouté",
                "TRAVAIL A FAIRE",
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

  upload = (event) => {
    let files = event.target.files[0]
    this.setState({ files })

  }

  render() {

    const sem = [
      { label: 1, value: 1 },
      { label: 2, value: 2 },
      { label: 3, value: 3 }
    ];
    const dms = this.state.domainet.map(dm => {
      return { label: dm.nom, value: dm.id }
    })

    const { modalOpen, toggleModal } = this.props;
    let defaultValues = {
      desc: "",
      datech: "",
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
                  <div class="invalid-feedback">Veuillez saisir le trimestre </div>
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
                  <div class="invalid-feedback">Veuillez saisir un domaine </div>
                </>
              }
            </div>
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


        // let data = {
        //   // file: data.append("file", files),
        //   trimestre: valueT.value,
        //   domaine: valueD.attribut,
        //   description: desc,
        //   dateEnvoi: datenv,
        //   dateEcheance: datech,
        //   idClasse: this.props.idClasse
        // }
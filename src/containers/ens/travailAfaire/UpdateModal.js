import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
} from "reactstrap";
import axios from "axios"
import { NotificationManager } from "../../../components/common/react-notifications";
import {
  AvForm,
  AvField,
  AvGroup,
} from "availity-reactstrap-validation";
import Select from "react-select";
import moment from "moment"

class UpdateModal extends Component {

  constructor(props) {
    super(props);

    this.state = {
      // files: undefined,
      isSubmited: false,
      valueT: null,
      valueD: null,
      domainet: [],
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

      this.getDomaines(nextProps.niveau);
      this.setState({
        isSubmited: false,
        valueT: { label: nextProps.devoir.trimestre, value: nextProps.devoir.trimestre },
        valueD: { label: nextProps.devoir.domaine, value: 0 },
        // files: undefined,
      })
    }
  }

  getDomaines(niveau) {

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
          return error;
        });
    }
    catch (error) {
      return error;
    }
  }



  handleSubmit = (event, errors, values) => {
    event.preventDefault();
    if (!localStorage.getItem('user_id'))
      return this.props.handleLogout();
    const { desc, datech } = values
    const { devoir, idClasse } = this.props
    const { valueT, valueD } = this.state


    if (errors.length === 0 && valueT && valueD) {

      if (devoir.trimestre === valueT.value &&
        devoir.domaine.localeCompare(valueD.label) === 0 &&
        devoir.description.localeCompare(desc.trim()) === 0 &&
        moment(devoir.dateEcheance, 'YYYY-MM-DD').format('YYYY-MM-DD').localeCompare(datech) === 0
      ) {
        NotificationManager.warning(
          "Aucune modification",
          "TRAVAIL A FAIRE",
          5000,
          null,
          null,
        );

        return;
      }


      const data = {
        "id": parseInt(devoir.id),
        "trimestre": parseInt(valueT.value),
        "domaine": valueD.label,
        "description": desc.trim(),
        "dateEcheance": datech,
        "idClasse": idClasse
      }


      this.props.toggleModal();
      try {
        axios
          .put(
            "http://api.onyx.inedit-gd.tn/travail/update", data)
          .then(res => {
            NotificationManager.success(
              "Modification avec succés",
              "TRAVAIL A FAIRE",
              3000,
              null,
              null,
            );

            return this.props.callback();


          }, error => {
            NotificationManager.warning(
              "Erreur de modification",
              "TRAVAIL A FAIRE",
              5000,
              null,
              null,
            );
            return error;

          })

      }
      catch (error) {
        return error;
      }



    }
  }
  annuler = () => {

    this.props.toggleModal();
    this.props.setST()

  }

  // upload = (event) => {
  //   let files = event.target.files[0]
  //   this.setState({ files })

  // }

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
      return { label: dm.nom, value: dm.id }
    })

    let defaultValues = {
      desc: devoir.description,
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
            {/* <Label for="dns">Document à réviser :</Label>
            <Input
              type="file"
              name="file"
              accept="application/pdf,application/vnd.ms-excel"
              onChange={this.upload}
            />
            <br></br> */}


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


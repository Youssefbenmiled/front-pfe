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
  Table
} from "reactstrap";
import Switch from "rc-switch";
import "rc-switch/assets/index.css";
import {
  AvForm,
  AvField,
  AvGroup,
} from "availity-reactstrap-validation";
import { Colxx } from "../../../components/common/CustomBootstrap";
import axios from "axios"
import Select from "react-select";
import moment from "moment"
// import "./add.css"
import { NotificationManager } from "../../../components/common/react-notifications";
import { Separator } from "../../../components/common/CustomBootstrap";
import List from "./List";

class AddNewModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      domainet: [],
      valueT: null,
      valueD: null,
      isSubmited: false,
      eleves: [],
      selectedItems: []

    };


  }



  onCheckItem = (id) => {


    let selectedItems = this.state.selectedItems;
    if (selectedItems.includes(id)) {
      selectedItems = selectedItems.filter(x => x !== id);
    } else {
      selectedItems.push(id);
    }
    this.setState({
      selectedItems
    });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      this.getDomaines();
      this.getEleves(nextProps.idClasse);
      this.setState({
        valueT: null,
        valueD: null,
        isSubmited: false,
        selectedItems: []

      })

    }
  }


  getEleves(idClasse) {


    var query = "http://api.onyx.inedit-gd.tn/eleve/getAll?classe=" + idClasse;

    try {
      axios
        .get(query)
        .then(res => {
          return res.data;
        })
        .then(data => {
          this.setState({
            eleves: data.list,
          });
        }, error => {
          console.log(error)
        });
    }
    catch (error) {
      console.log("failed" + error)
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
  handleChangeT = (value) => {
    this.setState({ valueT: value })
  }
  handleChangeD = (value) => {
    this.setState({ valueD: value })
  }

  handleSubmit = (event, errors, values) => {
    event.preventDefault();
    const { hdebut, hfin } = values
    const { valueT, valueD } = this.state
    this.setState({ isSubmited: true })

    var lyoum = moment(new Date(), 'YYYY-MM-DD HH:mm').format('DD-MM-YYYY HH:mm')
    console.log(lyoum)
    if (errors.length === 0 && valueT && valueD) {
      if (hdebut.localeCompare(hfin) != -1) {
        NotificationManager.warning(
          "Vérifier les horaires",
          "FEUILLE D'APPELS",
          5000,
          null,
          null,
        );
        return;
      }
      try {
        const data = {}
        this.props.toggleModal();

        axios({
          method: 'post',
          url: 'http://api.onyx.inedit-gd.tn/date/add',
          data: data,
        })
          .then(res => {
            NotificationManager.success(
              "Feuille Envoyé avec succés",
              "FEUILLE D'APPELS",
              3000,
              null,
              null,
            );


            return this.props.callback();

          },
            error => {
              NotificationManager.warning(
                "Erreur d'ajout",
                "FEUILLE D'APPELS",
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


  render() {

    const { modalOpen, toggleModal } = this.props;
    const { } = this.state;


    let defaultValues = {
      hdebut: "",
      hfin: "",
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
        size="lg"
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
              <Label for="dns">Début séance :</Label>
              <AvField
                name="hdebut"
                type="time"
                value={defaultValues.hdebut}
                required
                validate={{
                  required: {
                    value: true,
                    errorMessage: "Veuillez saisir l'heure début de séance"
                  },

                }}
              />
            </AvGroup>
            <AvGroup className="error-t-negative">
              <Label for="dns">Fin séance :</Label>
              <AvField
                name="hfin"
                type="time"
                value={defaultValues.hfin}
                required
                validate={{
                  required: {
                    value: true,
                    errorMessage: "Veuillez saisir l'heure fin de séance"
                  },

                }}
              />
            </AvGroup>
            <br></br>
            <Colxx xxs="12" className="mb-3">


              <Table responsive hover bordered>
                <thead>
                  <th>Nom</th>
                  <th>Prénom</th>
                  <th>Absent</th>

                </thead>
                <tbody>
                  {this.state.eleves.map((eleve, i) => {
                    return (
                      <List
                        key={eleve.id}
                        eleve={eleve}
                        isSelect={this.state.selectedItems.includes(eleve.id)}
                        onCheckItem={this.onCheckItem}
                        edit={true}
                      />
                    )
                  })
                  }


                </tbody>


              </Table>
            </Colxx>




            <br></br>
            <br></br>
            <Button
              color="secondary"
              id="addabs"
              type="submit"
            >
              Créer
              </Button>
            <Button
              color="danger"
              onClick={toggleModal}
              id="annulabs"
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

{/* <tr>
                        <td>{eleve.nameEleve}</td>
                        <td>{eleve.prenom}</td>
                        <td>
                          <Switch
                            tabIndex={eleve.id}
                            className="custom-switch custom-switch-primary custom-switch-small"
                            checked={this.state.switchChecked}
                            onChange={(event) => this.ChangeSwitch(event, eleve.id)}
                          />
                        </td>
                      </tr> */}
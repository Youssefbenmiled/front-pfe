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
  FormGroup,
  Table
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
import { Colxx } from "../../../components/common/CustomBootstrap";
import List from "./List";

// import "./update.css"
class UpdateModal extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isSubmited: false,
      valueT: null,
      domainet: [],
      valueT: null,
      valueD: null,
      eleves: [],
      selectedItems: []

    };
  }



  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      this.getDomaines();
      this.getEleves(nextProps.idClasse);
      this.setState({
        isSubmited: false,
        valueT: null,
        valued: null,
        selectedItems: [68, 60, 66]

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

      const data = {


      }
      try {
        axios
          .put(
            "http://api.onyx.inedit-gd.tn/date/update", data)
          .then(res => {
            console.log(res);

            this.props.callback();
            this.props.toggleModal();
            NotificationManager.success(
              "Modification avec succés",
              "FEUILLE D'APPELS",
              3000,
              null,
              null,
            );
            return;

          }, error => {
            console.log(error)
            NotificationManager.warning(
              "Erreur de modification",
              "FEUILLE D'APPELS",
              5000,
              null,
              null,
            );
            return;

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
  render() {

    const {
      modalOpen,
      toggleModal,
      feuille
    } = this.props;





    let defaultValues = {
      hdebut: '',
      hfin: '',
      // hdebut: feuille.debut,
      // hfin: feuille.fin,
    };
    const sem = [
      { label: "1", value: 1 },
      { label: "2", value: 2 },
      { label: "3", value: 3 }
    ];

    const dms = this.state.domainet.map(dm => {
      return { label: dm.niveau + " " + dm.nom, value: dm.id, attribut: dm.nom }
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
            <br></br>

            <Label>Trimestre :</Label>

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

            <br></br>
            <Label>Domaine :</Label>

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
                    errorMessage: "Veuillez saisir l'heure début"
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
                    errorMessage: "Veuillez saisir l'heure fin"
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



      </Modal>
    );
  }
}
export default UpdateModal;


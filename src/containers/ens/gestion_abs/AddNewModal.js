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
import { NotificationManager } from "../../../components/common/react-notifications";

import List from "./List";

class AddNewModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      domainet: [],
      valueD: null,
      isSubmited: false,
      eleves: [],
      selectedItems: [],
      classet: [],
      valueC: null,

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
      this.setState({
        valueD: null,
        isSubmited: false,
        selectedItems: [],
        valueC: null,
        eleves: [],
        classet: nextProps.classes,
        domainet: []

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
          return error;
        });
    }
    catch (error) {
      return error;
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

  handleChangeD = (value) => {
    this.setState({ valueD: value })
  }
  handleChangeC = (value) => {
    this.setState({ valueC: value, valueD: null, eleves: [], domainet: [] },
      this.getDomaines(value.niveau),
      this.getEleves(value.value))
  }

  handleSubmit = (event, errors, values) => {
    event.preventDefault();
    if (!localStorage.getItem('user_id'))
      return this.props.handleLogout();
    const { valueD, selectedItems, valueC } = this.state
    let HH = new Date().getHours() < 10 ? "0" + new Date().getHours() : new Date().getHours();
    let MM = new Date().getMinutes() < 10 ? "0" + new Date().getMinutes() : new Date().getMinutes();

    this.setState({ isSubmited: true })

    if (errors.length === 0 && valueC && valueD) {
      this.props.toggleModal();

      try {
        const data = {
          "seance": valueD.label,
          "date": moment(new Date(), 'YYYY-MM-DD').format('DD-MM-YYYY'),
          "heure": (HH + ":" + MM).toString(),
          "enseignant": parseInt(localStorage.getItem('user_id')),
          "eleves": selectedItems.map(item => item)
        }

        axios({
          method: 'post',
          url: 'http://api.onyx.inedit-gd.tn/feuille/presence/add',
          data: data,
        })
          .then(res => {
            NotificationManager.success(
              "Feuille d'appel envoyée avec succés",
              "FEUILLE D'APPEL",
              3000,
              null,
              null,
            );


            return this.props.callback();

          },
            error => {
              NotificationManager.warning(
                "Erreur d'ajout",
                "FEUILLE D'APPEL",
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

  handleLogout = () => {
    this.props.logoutUser(this.props.history);
  };
  render() {
    const { modalOpen, toggleModal } = this.props;

    const { valueC, valueD, } = this.state;

    let defaultValues = {};


    const cls = this.state.classet.map(classe => {
      return { label: classe.niveau + " " + classe.Nom, value: classe.id, niveau: parseInt(classe.niveau) }
    })


    const dms = this.state.domainet.map(dm => {
      return { label: dm.nom, value: dm.id }
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
            <Label>Classe :</Label>

            <div className="error-t-negative position-relative">
              <Select
                onChange={this.handleChangeC}
                value={this.state.valueC}
                options={cls}
                className="react-select position-relative"
                placeholder="Sélectionner une classe..."
                classNamePrefix="react-select"
                name="form-field-name"
                required
              />
              {this.state.valueC == null && this.state.isSubmited &&
                <>
                  <div className="av-invalid is-invalid form-control d-none"></div>
                  <div class="invalid-feedback">Veuillez saisir la classe</div>
                </>
              }
            </div>
            <br></br>
            <Label>Séance :</Label>

            <div className="error-t-negative position-relative">
              <Select
                onChange={this.handleChangeD}
                value={this.state.valueD}
                options={dms}
                className="react-select position-relative"
                placeholder={!valueC ? "Sélectionner une classe..." : "Sélectionner un domaine..."}
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
            <br></br>
            <Colxx xxs="12" className="mb-3">


              <Table responsive hover bordered>
                <thead>
                  <th>Nom</th>
                  <th>Prénom</th>
                  <th>Absent</th>

                </thead>
                <tbody>
                  {this.state.eleves && this.state.eleves.map((eleve, i) => {
                    return (
                      <List
                        key={eleve.id}
                        eleve={eleve}
                        isSelect={this.state.selectedItems.includes(eleve.id)}
                        onCheckItem={this.onCheckItem}
                        edit={true}
                        handleLogout={this.handleLogout}

                      />
                    )
                  })
                  }


                </tbody>


              </Table>
            </Colxx>


            <br></br>
            <br></br>

            <div className="row">
              <div className="col-12 col-md-6 mt-3">
                <Button className="w-100" color="secondary" type="submit" >
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

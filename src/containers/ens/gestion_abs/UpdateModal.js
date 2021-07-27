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
} from "availity-reactstrap-validation";
import Select from "react-select";
import { Colxx } from "../../../components/common/CustomBootstrap";
import List from "./List";

class UpdateModal extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isSubmited: false,
      domainet: [],
      valueC: null,
      valueD: null,
      eleves: [],
      selectedItems: [],
      classet: []

    };
  }

  handleChangeC = (value) => {
    this.setState({ valueC: value, valueD: null },
      this.getDomaines(value.niveau),
      this.getEleves(value.value))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps) {


      this.getEleves(nextProps.feuille.idClasse)
      this.getDomaines(parseInt(nextProps.feuille.niveauClasse))
      this.setState({
        isSubmited: false,
        valueC: { label: nextProps.feuille.niveauClasse + " " + nextProps.feuille.nomClasse, value: nextProps.feuille.idClasse, niveau: parseInt(nextProps.feuille.niveauClasse) },
        valueD: { label: nextProps.feuille.seance, value: 0 },
        selectedItems: [nextProps.feuille.idEleve],
        classet: nextProps.classes,
        domainet: nextProps.domaines

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

  handleSubmit = (event, errors, values) => {
    event.preventDefault();
    if (!localStorage.getItem('user_id'))
      return this.props.handleLogout();
    const { valueD, selectedItems } = this.state

    this.setState({ isSubmited: true })

    if (errors.length === 0 && valueD) {
      const data = {
        "seance": valueD.label,
        "enseignant": parseInt(localStorage.getItem('user_id')),
        "eleves": selectedItems.map(item => item)
      }

      this.props.toggleModal();

      try {
        axios
          .put(
            "http://api.onyx.inedit-gd.tn/feuille/presence/update", data)
          .then(res => {

            NotificationManager.success(
              "Modification avec succés",
              "FEUILLE D'APPEL",
              3000,
              null,
              null,
            );
            return this.props.callback();


          }, error => {
            NotificationManager.warning(
              "Erreur de modification",
              "FEUILLE D'APPEL",
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
  handleLogout = () => {
    this.props.logoutUser(this.props.history);
  };
  render() {

    const {
      modalOpen,
      toggleModal,
      feuille
    } = this.props;


    const cls = this.state.classet.map(classe => {
      return { label: classe.niveau + " " + classe.Nom, value: classe.id, niveau: parseInt(classe.niveau) }
    })

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
            model={{}}
            onSubmit={this.handleSubmit}>

            <Label>Classe :</Label>

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
export default UpdateModal;


import React, { Component, Fragment } from "react";
import {
  CustomInput,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label
} from "reactstrap";
import Select from "react-select";
import CustomSelectInput from "../../../components/common/CustomSelectInput";
import IntlMessages from "../../../helpers/IntlMessages";
import { Separator } from "../../../components/common/CustomBootstrap";

class AddNewModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mat: "",
      nbr: "",
      nomc: "",
      telc: "",
      valueType: "",
      valueLevel: [],
      valueClasse: [],
      valueEleve: [],

    };
  }

  handleSubmit = event => {
    event.preventDefault();
  };
  handleChangeMat = event => {

    this.setState({ mat: event.target.value })
  }
  handleChangeNbr = event => {

    this.setState({ nbr: event.target.value })
  }
  handleChangeNomc = event => {

    this.setState({ nomc: event.target.value })
  }
  handleChangeTelc = event => {

    this.setState({ telc: event.target.value })
  }
  // handleChangeType = value => {
  //   this.setState({
  //     valueType: value,

  //   });
  // }
  handleChangeLevel = value => {
    this.setState({ valueLevel: value, valueClasse: [], valueEleve: [] });
  };
  handleChangeClasse = value => {
    this.setState({ valueClasse: value, valueEleve: [] });
  };
  handleChangeEleve = value => {
    this.setState({ valueEleve: value });
  };
  render() {
    const { modalOpen, toggleModal } = this.props;
    const types = [
      { label: "Insertion par fichier", value: "fichier" },
      { label: "Insertion manuelle", value: "manuelle" },

    ];
    const levels = [
      { label: 1, value: 1 },
      { label: 2, value: 2 },
      { label: 3, value: 3 },
      { label: 4, value: 4 },
      { label: 5, value: 5 },
      { label: 6, value: 6 }
    ]
    const classes = [
      { label: "c1", value: "c1" },
      { label: "c2", value: "c2" },
      { label: "c3", value: "c3" },
      { label: "c4", value: "c4" },

    ]
    const eleves = [
      { label: "eleve1", value: "eleve1" },
      { label: "eleve2", value: "eleve2" },
      { label: "eleve3", value: "eleve3" },
      { label: "eleve4", value: "eleve4" },

    ];
    return (
      <Modal
        isOpen={modalOpen}
        toggle={toggleModal}
        wrapClassName="modal-left"
        backdrop="static"
      >
        <form onSubmit={this.handleSubmit}>
          {/* <ModalHeader toggle={toggleModal}>
            <p>Ajouter un bus </p>
          </ModalHeader> */}
          <ModalBody>
            <center><h2>Informations bus</h2></center>
            <br></br>
            <Separator className="mb-5" />

            <Label className="mt-4">
              <IntlMessages id="Matricule :" />
            </Label>
            <Input
              type="number"
              value={this.state.mat}
              onChange={this.handleChangeMat}
              placeholder={"Matricule.."}
            />
            <br></br>
            <br></br>

            <Label>Nombre de places : </Label>
            <Input
              type="number"
              value={this.state.nbr}
              placeholder={"Nombre de places.."}
              onChange={this.handleChangeNbr}
            />
            <br></br>
            <br></br>
            <Label>
              <IntlMessages id="Photo bus :" />
            </Label>
            <Input
              type="file"
              value={this.state.dns}

            />
            <br></br>
            <br></br>
            <Label>
              <IntlMessages id="Nom chauffeur :" />
            </Label>
            <Input
              value={this.state.prenom}
              onChange={this.handleChangePrenom}
              placeholder={"Nom chauffeur.."}
            />
            <br></br>
            <br></br>
            <Label>
              <IntlMessages id="Numéro téléphone chauffeur :" />
            </Label>
            <Input
              type="number"
              value={this.state.prenom}
              onChange={this.handleChangePrenom}
              placeholder={"N° Téléphone chauffeur.."}
            />
            <br></br>
            <br></br>
            <Label>
              <IntlMessages id="Fichier des horaires(pdf) :" />
            </Label>
            <Input
              type="file"
              value={this.state.prenom}
            />

            <br></br>
            <br></br>
            <Separator className="mb-5" />

            <center><h2>Affectation des éléves au  bus</h2></center>
            <br></br>
            <Separator className="mb-5" />

            <Label>
              <IntlMessages id="Séléctionner les éléves par niveau :" />
            </Label>
            <Select
              onChange={this.handleChangeLevel}
              value={this.state.valueLevel}
              options={levels}
              isMulti
              className="react-select"
              placeholder="Sélectionner le(s) niveau(x).."
              classNamePrefix="react-select"
              name="form-field-name"
            />
            <br></br>
            <br></br>
            {this.state.valueLevel.length > 0 ? (<div>
              <Label>
                <IntlMessages id="Séléctionner les classes des éléves :" />
              </Label>
              <Select
                onChange={this.handleChangeClasse}
                value={this.state.valueClasse}
                options={classes}
                isMulti
                className="react-select"
                placeholder="Sélectionner le(s) classe(s).."
                classNamePrefix="react-select"
                name="form-field-name"
              />
            </div>) : null}
            <br></br>
            <br></br>
            {this.state.valueClasse.length > 0 ? (<div>

              <Label>
                <IntlMessages id="Selectionnez les éléves :" />
              </Label>
              <Select
                onChange={this.handleChangeEleve}
                value={this.state.valueEleve}
                options={eleves}
                isMulti
                className="react-select"
                placeholder="Sélectionner le(s) éléves.."
                classNamePrefix="react-select"
                name="form-field-name"
              />
            </div>) : null}

          </ModalBody>

          <ModalFooter>
            <Button
              color="secondary"
              type="submit"
              id="ajouter"
              onClick={toggleModal}
            >
              Ajouter{" "}
            </Button>{" "}
            <Button
              color="danger"
              onClick={toggleModal}
              id="annuler"
            >
              Annuler{" "}
            </Button>
          </ModalFooter>

        </form >
      </Modal >
    );
  }
}


export default AddNewModal;

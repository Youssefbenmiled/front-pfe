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
} from "reactstrap";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  FormikReactSelect,
  FormikCheckboxGroup,
  FormikCheckbox,
  FormikRadioButtonGroup,
  FormikCustomCheckbox,
  FormikCustomCheckboxGroup,
  FormikCustomRadioGroup,
  FormikTagsInput,
  FormikSwitch,
  FormikDatePicker
} from "./FormikFields";
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
import CustomSelectInput from "../../../components/common/CustomSelectInput";
import IntlMessages from "../../../helpers/IntlMessages";
import "./update.css"
class UpdateModal extends Component {
  constructor(props) {
    super(props);

    this.state = {

      mat: "",
      nbr: "",
      nomc: "",
      telc: "",


    };
  }
  componentWillUnmount() {
    this.setState({ classe: null });
    this.setState({ nombre: null });
    this.setState({ niveau: null });
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

  Modifier = event => {
    event.preventDefault();

    // if (
    //   this.state.niveau == "" &&
    //   this.state.classe == "" &&
    //   this.state.nombre == ""
    // ) {
    //   //panel rak mabadalet chay
    //   alert("matbdel chay");
    // }
    // if (this.state.niveau == "") {
    //   this.setState({ niveau: this.props.niveau });
    //   console.log(this.state.niveau);
    // }
    // if (this.state.cls == "") {
    //   this.setState({ cls: this.props.cls });
    //   console.log(this.state.cls);
    // }
    // if (this.state.nombre == "") {
    //   this.setState({ nombre: this.props.nombre });
    //   console.log(this.state.nombre);
    // }
    // this.setState({
    //   tab: [
    //     ...this.state.tab,
    //     { niveau: this.state.niveau },
    //     { classe: this.state.cls },
    //     { nombre: this.state.nombre }
    //   ]
    // });
    this.setState({ niveau: "" });
    this.setState({ nombre: "" });

    this.setState({ classe: "" });
    console.log(this.state.niveau);
  };

  render() {

    const {
      modalOpen,
      toggleModal,

    } = this.props;

    return (
      <Modal
        isOpen={modalOpen}
        toggle={toggleModal}
        wrapClassName="modal-left"
        backdrop="static"
      >
        <ModalHeader toggle={toggleModal}>
          Modification d'un bus
        </ModalHeader>
        <ModalBody>
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

        </ModalBody>
        <ModalFooter>
          <form onSubmit={this.Modifier}>
            <Button type="submit" color="secondary" onClick={toggleModal} id="modifier">
              Modifier{" "}
            </Button>
            <Button type="reset" color="danger" onClick={toggleModal} id="annuler">
              Annuler{" "}
            </Button>
          </form>
        </ModalFooter>
      </Modal>
    );
  }
}
export default UpdateModal;


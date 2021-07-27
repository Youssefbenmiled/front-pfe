import React, { Component } from "react";
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
import "./delete.css"
class DeleteModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      classe: "",
      nombre: "",
      niveau: "",
      tab: []
    };
  }


  Supprimer = event => {
    event.preventDefault();

    // if (
    //   this.state.niveau == "" &&
    //   this.state.classe == "" &&
    //   this.state.nombre == ""
    // ) {
    //   //panel rak mabadalet chay
    //   alert("matbdel chay");
    // }

    // this.setState({
    //   tab: [
    //     ...this.state.tab,
    //     { niveau: this.state.niveau },
    //     { classe: this.state.cls },
    //     { nombre: this.state.nombre }
    //   ]
    // });
    // this.setState({ niveau: "" });
    // this.setState({ nombre: "" });

    // this.setState({ classe: "" });
    // console.log(this.state.niveau);
  };

  render() {
    const {
      modalOpen,
      toggleModal,
      niveaux,
      titre,
      niveau,
      date,
      classe
    } = this.props;
    return (
      <>
        {
          this.props.selectedItems &&
          <Modal
            isOpen={modalOpen}
            toggle={toggleModal}
            wrapClassName="modal-left"
            backdrop="static"
          >
            <ModalHeader toggle={toggleModal}>
              <center>
                <IntlMessages id="Suppression  d'un éléve " />
              </center>
            </ModalHeader>
            <ModalBody>
              <Label className="mt-4">
                <IntlMessages id="Nom :" />
              </Label>

              <Input value={titre} disabled={true} />


              <br></br>
              <br></br>
              <Label>
                <IntlMessages id="Prénom :" />
              </Label>
              <Input value={titre} disabled={true} />
              <br></br>
              <br></br>
              <Label>Date de Naissance : </Label>
              <Input disabled={true} value={date} />
              <br></br>
              <br></br>
              <Label>Sexe : </Label>
              <Input disabled={true} value={niveau} />
              <Label className="mt-4">Niveau de la classe : </Label>

              <Input
                type="text"
                value={niveau}
                disabled={true}
              />


              <Label className="mt-4">la classe : </Label>

              <Input
                type="text"
                disabled={true}
                value={classe}
              />


              <br></br>
              <Label>
                <IntlMessages id="Pére :" />
              </Label>
              <Input
                type="text"
                value={titre}
                disabled={true}
              />
              <br></br>
              <br></br>
              <Label>
                <IntlMessages id="Mére :" />
              </Label>
              <Input
                type="text"
                value={titre}
                disabled={true}
              />
            </ModalBody>
            <ModalFooter>
              <form onSubmit={this.Supprimer}>
                <Button type="submit" color="secondary" onClick={toggleModal} id="modifier">
                  Supprimer {this.props.nombre}
                </Button>

                <Button type="reset" color="danger" onClick={toggleModal} id="annuler">
                  Annuler{" "}
                </Button>
              </form>


            </ModalFooter>
          </Modal>
        }
        {
          !this.props.selectedItems &&
          <Modal
            isOpen={modalOpen}
            toggle={toggleModal}
            wrapClassName="modal-left"
            backdrop="static"
          >
            <ModalHeader toggle={toggleModal}>
              <center>
                <IntlMessages id="Suppression des éléves" />
              </center>
            </ModalHeader>
            <ModalBody>
              <h1>Voulez vous supprimer ?</h1>
            </ModalBody>
            <ModalFooter>
              <form onSubmit={this.Supprimer}>
                <Button type="submit" color="secondary" onClick={toggleModal} id="supprimer">
                  Supprimer
                  </Button>

                <Button type="reset" color="danger" onClick={toggleModal} id="annuler">
                  Annuler{" "}
                </Button>
              </form>
            </ModalFooter>
          </Modal>
        }

      </>
    );
  }
}
export default DeleteModal;

import React, { Component, Fragment } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
} from "reactstrap";
import { NotificationManager } from "../../../components/common/react-notifications";
import {
  AvForm,
} from "availity-reactstrap-validation";


class AddNewModal extends Component {
  constructor(props) {
    super(props);
    this.state = {

      isSubmited: false,
      // date: new Date().getDate() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getUTCFullYear(),
    };
  }


  componentWillReceiveProps(nextProps) {
    this.setState({
      isSubmited: false,
    })
  }



  handleSubmit = (event, errors, values) => {
    event.preventDefault();

    const { } = values

    this.setState({
      isSubmited: true
    })
    if (errors.length === 0) {
      NotificationManager.primary(
        "Requête en cours",
        "ADMINISTRATEUR",
        1000,
        null,
        null,
      );

      try {
        return;

      } catch (error) {
        return error;

      }
    };
  }



  render() {

    const { modalOpen, toggleModal } = this.props;


    const defaultValues = {
    };


    return (


      <Modal
        isOpen={modalOpen}
        toggle={toggleModal}
        wrapClassName="modal-left"
        backdrop="static"
      >

        <ModalHeader toggle={toggleModal}>


        </ModalHeader>
        <ModalBody>

          <AvForm
            onSubmit={this.handleSubmit}
            model={defaultValues}
            className="av-tooltip tooltip-right-bottom"
          >



            <Label for="nomc">Bonjour et bienvenue , Vouz venez de lancer la nouvelle année scolaire 2020/2021 </Label>
            <br></br>


            <Button
              color="secondary"
              id="modifier">
              Confirmer
            </Button>


          </AvForm>



        </ModalBody>


      </Modal>


    );

  }
}

export default AddNewModal;

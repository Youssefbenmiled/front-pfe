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

class EtatModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isSubmited: false,
      moy: null
    };
  }
  componentWillReceiveProps() {

    this.setState({

      isSubmited: false,
      moy: null
    })

  }

  changeMoy = event => {
    this.setState({ moy: parseFloat(event.target.value) })
   


  }


  handleSubmit = (event, errors, values) => {
    event.preventDefault();
    this.setState({ isSubmited: true })
    if (errors.length === 0) {
      //   NotificationManager.primary(
      //     "Requête en cours",
      //     "CLASSE",
      //     500,
      //     null,
      //     null,
      //   );
      this.props.toggleModalEtat();
      try {
        const data = {}


        // axios({
        //   method: 'post',
        //   url: 'http://api.onyx.inedit-gd.tn/classe/add',
        //   data: data,
        // })
        //   .then(res => {
        //     NotificationManager.success(
        //       "Classe ajoutée avec succés",
        //       "CLASSE",
        //       3000,
        //       null,
        //       null,
        //     );


        //     this.props.callback();
        //     return;
        //   },
        //     error => {
        //       console.log(error)
        //       NotificationManager.warning(
        //         "Classe exsite",
        //         "CLASSE",
        //         5000,
        //         null,
        //         null,
        //       );
        //       return;
        //     }

        //   )


      } catch (error) {
        console.log("failed" + error);

      }
    }
  }



  render() {
    const { modalOpen, toggleModalEtat } = this.props;


    const defaultValues = {
      moy: "",
      decision:""
    };
    return (
      <>


        <Modal
          isOpen={modalOpen}
          toggle={toggleModalEtat}
          wrapClassName="modal-left"
          backdrop="static"
        >
          <ModalHeader toggle={toggleModalEtat}
          ></ModalHeader>



          <ModalBody>


            <AvForm
              className="av-tooltip tooltip-label-right"
              model={defaultValues}
              onSubmit={this.handleSubmit}>
              <br></br>
              <br></br>

              <AvGroup className="error-t-negative">
                <Label for="moy">Moyenne générale :</Label>
                <AvField
                  name="moy"
                  id="moy"
                  type='text'
                  // step="0.1"
                  min='0'
                  max='20'
                  required
                  validate={{
                    required: {
                      value: true,
                      errorMessage: "Veuillez saisir la moyenne générale"
                    },
                    // pattern: {
                    //   value: "[ 0-9]",
                    //   errorMessage: "La moyenne générale doit être composé uniquement des chiffres"
                    // },

                  }}
                />
              </AvGroup>


             <AvRadioGroup
                className="error-l-150"
                name="decision"
                required
                validate={{
                  required: {
                    value: true,
                    errorMessage: "Veuillez saisir la décision"
                  },

                }}>
                <Label className="d-block">Décision :</Label>
                <AvRadio customInput label="Admis" value="Admis" />
                <AvRadio customInput label="Redouble" value="Redouble" />

              </AvRadioGroup>




              <br></br>
              <br></br>
              <Button
                color="secondary"
                id="add"
              >
                Confirmer{" "}
              </Button>{" "}
              <Button
                color="danger"
                onClick={toggleModalEtat}
                id="annuler">
                Annuler{" "}
              </Button>
            </AvForm>





          </ModalBody>





        </Modal>




      </>


    );
  }
}
export default EtatModal;


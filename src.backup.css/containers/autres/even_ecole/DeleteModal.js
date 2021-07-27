// import React, { Component } from "react";
// import {
//   CustomInput,
//   Button,
//   Modal,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
//   Input,
//   Label,
//   FormGroup
// } from "reactstrap";
// import Select from "react-select";
// import CustomSelectInput from "../../../components/common/CustomSelectInput";
// import IntlMessages from "../../../helpers/IntlMessages";
// import axios from "axios"
// import { NotificationManager } from "../../../components/common/react-notifications";
// import "./delete.css"
// import { Separator } from "../../../components/common/CustomBootstrap";
// import moment from 'moment'

// class DeleteModal extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       error: null
//     };
//   }

//   // handleSubmit = event => {
//   //   event.preventDefault();


//   //   try {
//   //     axios
//   //       .delete(
//   //         "http://api.onyx.inedit-gd.tn/eleve/delete/" + this.props.eleve.id)
//   //       .then(res => {
//   //         console.log(res)


//   //         this.props.callback();

//   //         NotificationManager.success(
//   //           "SUPPRESSION EFFECTUEE ",
//   //           "ELEVE",
//   //           3000,
//   //           null,
//   //           null,
//   //         );

//   //         return res.data;
//   //       })
//   //       .then(data => {
//   //       }, error => {
//   //         NotificationManager.error(
//   //           "ERREUR DE SUPPRESSION",
//   //           "ELEVE",
//   //           3000,
//   //           null,
//   //           null,

//   //         );
//   //       });

//   //   }
//   //   catch (error) {
//   //     console.log("failed" + error);
//   //   }


//   // }

//   handleSubmit = event => {
//     event.preventDefault();
//     NotificationManager.primary(
//       "Requête en cours",
//       "ELEVE",
//       500,
//       null,
//       null,
//     );

//     for (var i = 0; i < this.props.selectedItems.length; i++) {

//       try {
//         axios
//           .delete(
//             "http://api.onyx.inedit-gd.tn/eleve/delete/" + this.props.selectedItems[i])
//           .then(res => {
//             this.props.callback();

//           })
//           .then(data => {
//             NotificationManager.success(
//               "Suppression effectuée",
//               "ELEVE",
//               3000,
//               null,
//               null,
//             );
//           }
//             , error => {
//               NotificationManager.warning(
//                 "Vérifier les carnets des éléves non supprimés",
//                 "ELEVES",
//                 5000,
//                 null,
//                 null,
//               );
//               return error;
//             });

//       }
//       catch (error) {
//         console.log("failed" + error);
//         return error;
//       }
//     }

//   }



//   annuler = () => {

//     this.props.toggleModal();
//     this.props.setST()

//   }

//   render() {
//     const {
//       modalOpen,
//       toggleModal,
//       eleve,
//       selectedItems
//     } = this.props;
//     var dt = moment(eleve.dateNaissance, 'YYYY-MM-DD').format('DD-MM-YYYY');
//     return (
//       <>
//         {
//           selectedItems.length == 1 &&
//           <Modal
//             isOpen={modalOpen}
//             toggle={toggleModal}
//             wrapClassName="modal-left"
//             backdrop="static"
//           >
//             <ModalHeader toggle={toggleModal}>

//             </ModalHeader>


//             <ModalBody>
//               <form onSubmit={this.handleSubmit}>
//                 <br></br>
//                 <center>
//                   <h2>Êtes-vous sûr de vouloir supprimer ?</h2>

//                 </center>
//                 <br></br>


//                 <Label for="nomc">Nom :</Label>
//                 <Input
//                   name="nomc"
//                   id="nomc"
//                   value={eleve.nameEleve}
//                 />

//                 <br></br>

//                 <Label for="pren">Prénom :</Label>
//                 <Input
//                   name="pren"
//                   id="pren"
//                   value={eleve.prenom}
//                 />
//                 <br></br>
//                 <Label for="genre">Genre :</Label>
//                 <Input
//                   name="sexe"
//                   value={eleve.sexe}
//                 />
//                 <br></br>

//                 <Label for="dns">Date de naissance :</Label>
//                 <Input
//                   name="dns"
//                   value={dt}
//                 />


//                 <br></br>
//                 <Label for="niveau">Niveau :</Label>
//                 <Input
//                   name="niveau"
//                   value={eleve.niveau}
//                 />
//                 <br></br>
//                 <Label for="classe">Classe :</Label>
//                 <Input
//                   name="classe"
//                   value={eleve.nomClasse}

//                 />
//                 <br></br>
//                 <br></br>
//                 <FormGroup className="mb-0">
//                   <Button
//                     type="submit"
//                     onClick={toggleModal}
//                     color="secondary"
//                     id="modifier">
//                     Supprimer
//                   </Button>
//                   <Button

//                     color="danger"
//                     onClick={this.annuler}
//                     id="annuler">
//                     Annuler
//                   </Button>

//                 </FormGroup>
//               </form>

//             </ModalBody>

//           </Modal>
//         }
//         {selectedItems.length > 1 &&
//           <Modal
//             isOpen={modalOpen}
//             toggle={toggleModal}
//             wrapClassName="modal-left"
//             backdrop="static"
//           >
//             <ModalHeader toggle={toggleModal}>

//             </ModalHeader>
//             <ModalBody>
//               <form onSubmit={this.handleSubmit}>
//                 <br></br>
//                 <center>
//                   <h2>Êtes-vous sûr de vouloir supprimer les {selectedItems.length} éléves ?</h2>

//                 </center>
//                 <br></br>
//                 <br></br>
//                 <Button type="submit" color="secondary" onClick={toggleModal} id="modifier">
//                   Supprimer
//                   </Button>

//                 <Button type="reset" color="danger" onClick={this.annuler} id="annuler">
//                   Annuler{" "}
//                 </Button>

//               </form>

//             </ModalBody>
//           </Modal>
//         }

//       </>
//     );
//   }
// }
// export default DeleteModal;
import React, { Component } from 'react'

export default class DeleteModal extends Component {
  render() {
    return (
      <div>
        delte
      </div>
    )
  }
}


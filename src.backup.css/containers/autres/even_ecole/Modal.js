// import React, { Component, Fragment } from "react";
// import {

//     Modal,
//     ModalHeader,
//     ModalBody,
//     Table
// } from "reactstrap";
// import { Colxx } from "../../../components/common/CustomBootstrap";

// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";
// import "jspdf-autotable";
// import moment from 'moment';

// class Modalvoir extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//         };
//     }


//     imprimer = event => {
//         const ch = this.props.produit.title
//         event.preventDefault();


//         window.html2canvas = html2canvas;

//         var doc = new jsPDF({
//             orientation: "landscape",
//             unit: "px",
//             format: "a3"
//         });

//         var content = document.getElementById("impression");

//         doc.html(content, {
//             callback: function (doc) {
//                 doc.save(ch);
//             }
//         });
//     }
//     render() {
//         const { modalOpenVoir, toggleModal, eleve } = this.props;
//         var dt = moment(eleve.dateNaissance, 'YYYY-MM-DD').format('DD-MM-YYYY');
//         return (
//             <Modal
//                 isOpen={modalOpenVoir}
//                 toggle={toggleModal}
//                 size="lg"
//                 wrapClassName="modal-left"
//                 backdrop="static"
//             >
//                 <ModalHeader toggle={toggleModal}></ModalHeader>

//                 <ModalBody>
//                     <Colxx xxs="12" className="mb-3">


//                         <Table responsive hover bordered>
//                             <tr>
//                                 <th>Nom</th>
//                                 <th>{eleve.nameEleve}</th>

//                             </tr>
//                             <tr>
//                                 <th>Prénom</th>
//                                 <th>{eleve.prenom}{" "}</th>

//                             </tr>
//                             <tr>
//                                 <th>Genre</th>
//                                 <th>{eleve.sexe}</th>
//                             </tr>
//                             <tr>
//                                 <th>Date de naissance</th>
//                                 <th>{dt}</th>
//                             </tr>
//                             <tr>
//                                 <th>Niveau</th>
//                                 <th>{eleve.niveau}{' '}</th>
//                             </tr>
//                             <tr>
//                                 <th>Classe</th>
//                                 <th>{eleve.nomClasse}</th>
//                             </tr>

//                         </Table>
//                     </Colxx>
//                     {/* {eleve.idTuteur != "" &&
//                         <Colxx xxs="12" className="mb-3">


//                             <Table responsive hover bordered>
//                                 <thead>
//                                     <th>Nom tuteur</th>
//                                     <th>Prénom</th>

//                                 </thead>
//                                 <tbody>

//                                     <td>{eleve.nomTuteur}</td>
//                                     <td>{eleve.prenomTuteur}</td>

//                                 </tbody>


//                             </Table>
//                         </Colxx>
//                     } */}
//                 </ModalBody>



//             </Modal>
//         );
//     }
// }
// export default Modalvoir;

import React, { Component } from 'react'

export default class Modal extends Component {
    render() {
        return (
            <div>
                modal
            </div>
        )
    }
}

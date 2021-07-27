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
    Card, Badge, Table
} from "reactstrap";
import { Colxx } from "../../../components/common/CustomBootstrap";
import { ContextMenuTrigger } from "react-contextmenu";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";
// import "jspdf-autotable";

class Modalvoir extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }


    componentWillReceiveProps(nextProps) {
        if (!localStorage.getItem('user_id'))
            return this.props.handleLogout();

    }
    render() {
        const { modalOpenVoir, toggleModalVoir, tuteur } = this.props;

        return (
            <Modal
                isOpen={modalOpenVoir}
                toggle={toggleModalVoir}
                size="lg"
                wrapClassName="modal-left"
                backdrop="static"
            >
                <ModalHeader toggle={toggleModalVoir}>

                </ModalHeader>
                <ModalBody>
                    {tuteur &&
                        <Colxx xxs="12" className="mb-3">
                            <center><h2>
                                Informations tuteur
                    </h2></center>
                            <br></br>
                            <Table responsive hover bordered>
                                <tr>
                                    <th>Nom</th>
                                    <th>{tuteur.nom && tuteur.nom}</th>
                                </tr>
                                <tr>
                                    <th>Prénom</th>
                                    <th>{tuteur.prenom && tuteur.prenom}</th>
                                </tr>
                                <tr>
                                    <th>Adresse</th>
                                    <th>{tuteur.adresse && tuteur.adresse}</th>
                                </tr>
                                <tr>
                                    <th>Email</th>
                                    <th>{tuteur.email && tuteur.email}</th>
                                </tr>
                                <tr>
                                    <th>N° de Téléphone</th>
                                    <th>{tuteur.numTel && tuteur.numTel}</th>
                                </tr>
                                <tr>
                                    <th>Nombre d'enfants</th>
                                    <th>{tuteur.eleves && tuteur.eleves.length}</th>
                                </tr>
                                <tr>
                                    <th>Statut</th>
                                    <th>{tuteur.statut && tuteur.statut}</th>
                                </tr>




                            </Table>
                            <br></br>
                            <center>
                                <h2>
                                    {tuteur && tuteur.eleves && tuteur.eleves.length > 1 ? <h2>Enfants</h2> : <h2>Enfant</h2>}
                                </h2>
                            </center>
                            <br></br>


                            <Table responsive hover bordered>
                                <thead>
                                    <th>Nom</th>
                                    <th>Prénom</th>
                                    <th>Classe</th>

                                </thead>
                                {tuteur && tuteur.eleves &&

                                    tuteur.eleves.map(eleve =>


                                        <tr>
                                            <td>{eleve.Nom}</td>
                                            <td>{eleve.prenom}</td>
                                            <td>
                                                {eleve.classe.niveau}{' '}{eleve.classe.nom ? eleve.classe.nom : eleve.classe.Nom}
                                            </td>
                                        </tr>


                                    )}





                            </Table>
                        </Colxx>
                    }


                </ModalBody>

            </Modal>
        );
    }
}
export default Modalvoir;

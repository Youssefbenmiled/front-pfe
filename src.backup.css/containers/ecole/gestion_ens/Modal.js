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
import Select from "react-select";
import CustomSelectInput from "../../../components/common/CustomSelectInput";
import IntlMessages from "../../../helpers/IntlMessages";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";
// import "jspdf-autotable";

class Modalvoir extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    // imprimer = event => {
    //     const ch = this.props.produit.title
    //     event.preventDefault();


    //     window.html2canvas = html2canvas;

    //     var doc = new jsPDF({
    //         orientation: "landscape",
    //         unit: "px",
    //         format: "a3"
    //     });

    //     var content = document.getElementById("impression");

    //     doc.html(content, {
    //         callback: function (doc) {
    //             doc.save(ch);
    //         }
    //     });
    // }


    getUnique(array) {
        var uniqueArray = [];

        for (var i = 0; i < array.length; i++) {
            if (uniqueArray.indexOf(array[i]) === -1) {
                uniqueArray.push(array[i]);
            }
        }
        return uniqueArray;
    }

    render() {
        const { modalOpenVoir, toggleModalVoir, ens } = this.props;
        let levels, classes, domaines;
        if (ens) {
            levels = this.getUnique(ens.classe.map(classe => classe.niveau)).join(' ,')
            classes = ens.classe.map(classe => classe.niveau + ")" + classe.Nom).join(' ,')
            domaines = ens.domaine.map(domaine => domaine.niveau + ")" + domaine.nom).join(' ,')
        }
        return (
            <>
                {ens &&
                    <Modal
                        isOpen={modalOpenVoir}
                        toggle={toggleModalVoir}
                        size="lg"
                        wrapClassName="modal-left"
                        backdrop="static"
                    >
                        <ModalHeader toggle={toggleModalVoir}></ModalHeader>
                        <ModalBody>
                            <Colxx xxs="12" className="mb-3">

                                <br></br>
                                <Table responsive hover bordered>
                                    <tr>
                                        <th>Nom</th>
                                        <th>{ens.prenom}</th>
                                    </tr>
                                    <tr>
                                        <th>Prénom</th>
                                        <th>{ens.nom}</th>
                                    </tr>
                                    <tr>
                                        <th>Email</th>
                                        <th>{ens.email}</th>
                                    </tr>
                                    <tr>
                                        <th>Adresse</th>
                                        <th>{ens.adresse}</th>

                                    </tr>
                                    <tr>
                                        <th>N° Téléphone</th>
                                        <th>{ens.numTel}</th>

                                    </tr>

                                    <tr>
                                        <th>{ens && levels.trim().length > 1 ? 'Niveaux' : 'Niveau'}</th>
                                        <th>{levels}</th>
                                    </tr>
                                    <tr>
                                        <th>{ens && ens.classe.length > 1 ? 'Classes' : 'Classe'}</th>
                                        <th>{classes}</th>

                                    </tr>
                                    <tr>
                                        <th>{ens && ens.domaine.length > 1 ? 'Domaines' : 'Domaine'}</th>
                                        <th>{domaines}</th>

                                    </tr>
                                    <tr>
                                        <th>Statut</th>
                                        <th>{"actif"}</th>

                                    </tr>


                                </Table>

                            </Colxx>

                        </ModalBody>

                    </Modal>
                }
            </>
        );
    }
}
export default Modalvoir;


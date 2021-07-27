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
import { Separator } from "../../../components/common/CustomBootstrap";
import moment from "moment"
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
    render() {
        const { modalOpenVoir, toggleModal, devoir } = this.props;
        var d1 = moment(devoir.dateEnvoi && devoir.dateEnvoi, 'YYYY-MM-DD').format();
        var d2 = moment(devoir.dateEcheance && devoir.dateEcheance, 'YYYY-MM-DD').format();
        return (
            <Modal
                isOpen={modalOpenVoir}
                toggle={toggleModal}
                size="lg"
                wrapClassName="modal-left"
                backdrop="static"
            >
                <ModalHeader toggle={toggleModal}></ModalHeader>
                <ModalBody>
                    <Colxx xxs="12" className="mb-3">



                        <Table responsive hover bordered>
                            <tr>
                                <th>Classe</th>
                                <td>
                                    {/* {devoir.niveau}{' '}{devoir.classe} */}
                                1 A</td>
                            </tr>
                            <tr>
                                <th>Trimestre</th>
                                <td>{devoir.trimestre && devoir.trimestre}1</td>

                            </tr>
                            <tr>
                                <th>Domaine</th>
                                <td>{devoir.domaine && devoir.domaine}anglais</td>
                            </tr>

                            <tr>
                                <th>Envoyé le</th>
                                <td>
                                    {/* {d1} */}
                                22-09-2020</td>
                            </tr>
                            <tr>
                                <th>Date d'échéance</th>
                                <td>
                                    {/* {d2} */}
                                29-09-2020</td>
                            </tr>
                            {devoir.description && devoir.description.trim().length > 0 &&
                                <tr>
                                    <th>Description</th>
                                    <td>{devoir.description && devoir.description}</td>
                                </tr>
                            }

                            {devoir.url &&
                                <tr>
                                    <th>Fichier</th>
                                    <td>
                                        <a href={devoir.url} target="_blank" >
                                            Voir fichier
                                        </a>
                                    </td>
                                </tr>
                            }
                        </Table>
                    </Colxx>

                </ModalBody>

            </Modal>
        );
    }
}
export default Modalvoir;


{/* <th>Description</th>

                                <th colSpan="2">Période</th>

                                {devoir.url &&
                                    <th>Fichier</th>
                                }
                           

                                <td>{devoir.description}</td>

                                {devoir.dateEnvoi !== undefined &&
                                    <td>
                                        envoyé le : {moment(d1).format("DD-MM-YYYY")}

                                    </td>
                                }

                                {devoir.dateEcheance !== undefined &&

                                    <td>
                                        jusqu'a  : {moment(d2).format("DD-MM-YYYY")}
                                    </td>
                                }
                                {devoir.url &&

                                    <td>
                                        <a href={devoir.url} target="_blank" >
                                            Voir fichier
                                 </a>
                                    </td>
                                } */}


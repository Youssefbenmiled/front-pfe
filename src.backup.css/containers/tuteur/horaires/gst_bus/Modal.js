import React, { Component, Fragment } from "react";
import {

    Modal,
    ModalHeader,
    ModalBody,
    Table
} from "reactstrap";
import { Colxx } from "../../../components/common/CustomBootstrap";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from 'moment';

class Modalvoir extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    imprimer = event => {
        const ch = this.props.produit.title
        event.preventDefault();


        window.html2canvas = html2canvas;

        var doc = new jsPDF({
            orientation: "landscape",
            unit: "px",
            format: "a3"
        });

        var content = document.getElementById("impression");

        doc.html(content, {
            callback: function (doc) {
                doc.save(ch);
            }
        });
    }
    render() {
        const { modalOpenVoir, toggleModal, bus } = this.props;
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
                            <thead>
                                <th>Photo bus</th>
                                <th>Nom chauffeur</th>
                                <th>Photo chauffeur</th>
                                <th>N°Téléphone</th>

                            </thead>
                            <tbody>
                                <td><img src={bus.photobus} alt="Photo bus" className="w-33 w-sm-100 m-0 text-left" /> </td>
                                <td>{bus.nomchauffeur}</td>
                                <td><img src={bus.photoChauffeur} alt={"Photo " + bus.nomchauffeur} className="w-33 w-sm-100 m-0 text-left" /> </td>
                                <td>{bus.numtelChauffeur}</td>


                            </tbody>


                        </Table>
                    </Colxx>

                </ModalBody>



            </Modal>
        );
    }
}
export default Modalvoir;



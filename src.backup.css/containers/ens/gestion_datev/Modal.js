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
import moment from 'moment';

class Modalvoir extends Component {
    constructor(props) {
        super(props);
        this.state = {


        };
    }
    // handleChange = event => {
    //     this.setState({ nbr: event.target.value });
    // };
    // handleSubmit = event => {
    //     event.preventDefault();
    // };
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
        const { modalOpenVoir, exam, toggleModal } = this.props;

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
                                <th>{exam.niveauClasse && exam.niveauClasse}{' '}{exam.nomClasse && exam.nomClasse}</th>

                            </tr>
                            <tr>
                                <th>Trimestre</th>
                                <th>{exam.trimestre && exam.trimestre}</th>

                            </tr>
                            <tr>
                                <th>Date évaluation</th>
                                <th>
                                    {moment(exam.date && exam.date, 'YYYY-MM-DD').format("DD-MM-YYYY")}
                                </th>
                            </tr>
                            <tr>
                                <th>Domaine</th>
                                <th>{exam.domaine && exam.domaine}</th>
                            </tr>
                            {exam.description && exam.description.trim().length > 0 &&
                                <tr>
                                    <th>Description</th>
                                    <th>{exam.description}</th>
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


{/* <Modal
                isOpen={modalOpenVoir}
                toggle={toggleModalVoir}
                size="lg"
                wrapClassName="modal-left"
                backdrop="static"
            >
                <ModalHeader toggle={toggleModalVoir}>

                </ModalHeader>
                <ModalBody>
                    <Colxx xxs="12" className="mb-3">

                        <br></br>
                        <br></br>
                        <Table responsive hover bordered>
                            <thead>
                                <th>Description</th>
                            </thead>
                            <tbody>
                                <td>{exam.description}</td>

                            </tbody>


                        </Table>

                    </Colxx>

                </ModalBody>
            </Modal>
*/}
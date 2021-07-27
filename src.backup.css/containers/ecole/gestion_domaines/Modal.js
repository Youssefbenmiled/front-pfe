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
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "jspdf-autotable";

class Modalvoir extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nbr: "",

        };
    }
    handleChange = event => {
        this.setState({ nbr: event.target.value });
        // console.log(this.state.nbr);
    };
    // handleSubmit = event => {
    //     event.preventDefault();
    // };
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
        const { modalOpenVoir, toggleModalVoir, domaine } = this.props;

        return (
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

                        <Table responsive hover bordered>
                            <thead>
                                <th>Niveau</th>
                                <th>Nom domaine</th>

                            </thead>
                            <tbody>
                                <td>{domaine.niveau}</td>
                                <td>{domaine.Nom}</td>
                            </tbody>


                        </Table>
                    </Colxx>

                </ModalBody>

            </Modal >
        );
    }
}
export default Modalvoir;

{/* <Card>

                            <div className="pl-2 d-flex flex-grow-1 min-width-zero" id="impression" >
                                <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">

                                    <p className="w-40 w-sm-100 list-item-heading mb-1 truncate"
                                        onClick={() => toggleModalVoir()}
                                    >
                                        {domaine.title}{" "}{domaine.title}

                                    </p>


                                    <p className="mb-1 text-muted text-small w-15 w-sm-100">
                                        {domaine.category}
                                    </p>
                                    <p className="mb-1 text-muted text-small w-15 w-sm-100">
                                        {domaine.date}
                                    </p>

                                    <p className="mb-1 text-muted text-small w-15 w-sm-100">
                                        {domaine.description}
                                    </p>

                                </div>

                            </div>

                        </Card> */}
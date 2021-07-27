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
    Card, Badge,
    Row, CardBody, FormGroup
} from "reactstrap";
import { Formik, Form, Field } from "formik";

import { Colxx } from "../../../components/common/CustomBootstrap";
import { ContextMenuTrigger } from "react-contextmenu";
import Select from "react-select";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "jspdf-autotable";




class ModifModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nbr: "",

        };
    }

    telecharger = event => {
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
                doc.save();
            }
        });
    };

    render() {
        const { modalOpen, toggleImp, event } = this.props;

        return (
            <Modal
                isOpen={modalOpen}
                toggle={toggleImp}
                size="lg"
                wrapClassName="modal-left"
                backdrop="static"
            >
                <ModalHeader toggle={toggleImp} >

                    <p>Téléchargement de l'évenement {event.title}</p>

                </ModalHeader>
                <ModalBody id="impression">
                    <Row className="mb-4">
                        <Colxx xxs="12">
                            <Card>
                                <CardBody>
                                    <center><h1>Evenement {event.title}</h1></center>


                                    <Row>
                                        <Colxx xxs="12" xl="8" className="mb-4">
                                            <Card id="Card">
                                                <CardBody id="CB">
                                                    <label>

                                                        <h2>DU :</h2>


                                                    </label>
                                                    <Row className="mb-5">
                                                        <Colxx xxs="6">
                                                            <h3>{event.date}</h3>

                                                        </Colxx>

                                                    </Row>
                                                </CardBody>
                                            </Card>
                                        </Colxx>
                                    </Row> <Row>
                                        <Colxx xxs="12" xl="8" className="mb-4">
                                            <Card id="Card">
                                                <CardBody id="CB">
                                                    <label>

                                                        <h2>AU :</h2>


                                                    </label>
                                                    <Row className="mb-5">
                                                        <Colxx xxs="6">
                                                            <h3>{event.date}</h3>

                                                        </Colxx>

                                                    </Row>
                                                </CardBody>
                                            </Card>
                                        </Colxx>
                                    </Row>
                                    <Row>
                                        <Colxx xxs="12" xl="8" className="mb-4">
                                            <Card id="Card">
                                                <CardBody id="CB">
                                                    <label>

                                                        <h2>Titre :</h2>


                                                    </label>
                                                    <Row className="mb-5">
                                                        <Colxx xxs="6">
                                                            <h3>{event.title}</h3>

                                                        </Colxx>

                                                    </Row>
                                                </CardBody>
                                            </Card>
                                        </Colxx>
                                    </Row>
                                    <Row>
                                        <Colxx xxs="12" xl="8" className="mb-4">
                                            <Card id="Card">
                                                <CardBody id="CB">
                                                    <label>

                                                        <h2>Lieu :</h2>


                                                    </label>
                                                    <Row className="mb-5">
                                                        <Colxx xxs="6">
                                                            <h3>{event.category}</h3>

                                                        </Colxx>

                                                    </Row>
                                                </CardBody>
                                            </Card>
                                        </Colxx>
                                    </Row>
                                    <Row>
                                        <Colxx xxs="12" xl="8" className="mb-4">
                                            <Card id="Card">
                                                <CardBody id="CB">
                                                    <label>

                                                        <h2>Description :</h2>

                                                    </label>
                                                    <Row className="mb-5">
                                                        <Colxx xxs="6">
                                                            <h3>{event.description}</h3>

                                                        </Colxx>

                                                    </Row>
                                                </CardBody>
                                            </Card>
                                        </Colxx>
                                    </Row>







                                </CardBody>
                            </Card>
                        </Colxx>

                    </Row>


                </ModalBody>
                <ModalFooter>
                    <form onSubmit={this.telecharger}>

                        <Button
                            color="secondary"
                            type="submit"
                            onClick={() => toggleImp()}
                            id="tele"

                        >
                            Télécharger{" "}
                        </Button>{" "}
                    </form>

                </ModalFooter >
            </Modal >
        );
    }
}
export default ModifModal;


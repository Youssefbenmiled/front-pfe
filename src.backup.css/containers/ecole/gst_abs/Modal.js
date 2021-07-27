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
import List from "./List";
import axios from "axios"


class Modalvoir extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }




    render() {
        const { modalOpenVoir, toggleModalVoir, abs, eleves } = this.props;
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
                            <tr>
                                <th>Enseignant</th>
                                <th>Mohamed salah</th>

                            </tr>
                            <tr>
                                <th>Trimestre</th>
                                <th>1</th>

                            </tr>
                            <tr>
                                <th>Domaine</th>
                                <th>anglais</th>
                            </tr>
                            <tr>
                                <th>Envoyé le </th>
                                <th>10-10-2020</th>

                            </tr>

                            <tr>
                                <th>Début séance</th>
                                <th>09:00</th>
                            </tr>
                            <tr>
                                <th>Fin séance</th>
                                <th>10:00</th>
                            </tr>


                        </Table>
                        <br></br>
                        <br></br>

                        <Table responsive hover bordered>

                            <th>Nom </th>
                            <th>Prénom </th>
                            <th>Absent</th>


                            <tbody>
                                {eleves.map((eleve, i) => {
                                    return (
                                        <List
                                            key={eleve.id}
                                            eleve={eleve}
                                        // isSelect={this.state.selectedItems.includes(eleve.id)}
                                        // onCheckItem={this.onCheckItem}
                                        />
                                    )
                                })
                                }


                            </tbody>


                        </Table>

                    </Colxx>


                </ModalBody>

            </Modal>
        );
    }
}
export default Modalvoir;



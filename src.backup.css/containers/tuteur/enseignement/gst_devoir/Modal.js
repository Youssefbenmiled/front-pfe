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
import { Colxx } from "../../../../components/common/CustomBootstrap";
import moment from "moment"
class Modalvoir extends Component {
    constructor(props) {
        super(props);
        this.state = {


        };
    }


    render() {
        const { modalOpenVoir, toggleModal, devoir } = this.props;
        var d1 = moment(devoir.dateEnvoi, 'YYYY-MM-DD').format();
        var d2 = moment(devoir.dateEcheance, 'YYYY-MM-DD').format();
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


                        {/* <Table responsive hover bordered>
                            <thead>
                                <th>Classe</th>
                                <th>Trimestre</th>
                                <th>Domaine</th>


                            </thead>
                            <tbody>
                                <td>{devoir.niveau}{" "}{devoir.nomClasse}</td>
                                <td>{devoir.trimestre}</td>
                                <td>{devoir.domaine}</td>
                            </tbody>
                        </Table> */}
                        <Table responsive hover bordered>
                            <thead>

                                <th>Description</th>

                                <th colSpan="2">Période</th>

                                {devoir.url &&
                                    <th>Fichier</th>
                                }
                            </thead>
                            <tbody>

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



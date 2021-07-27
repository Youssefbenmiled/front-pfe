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
    componentWillReceiveProps(nextProps) {
        if (!localStorage.getItem('user_id'))
            return this.props.handleLogout();

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



                        <Table responsive hover bordered>
                            <tr>
                                <th>Classe</th>
                                <td>
                                    {devoir.niveau && devoir.niveau}{' '}{devoir.nomClasse && devoir.nomClasse}
                                </td>
                            </tr>
                            <tr>
                                <th>Trimestre</th>
                                <td>{devoir.trimestre && devoir.trimestre}</td>

                            </tr>
                            <tr>
                                <th>Domaine</th>
                                <td>{devoir.domaine && devoir.domaine}</td>
                            </tr>

                            <tr>
                                <th>Envoyé le</th>

                                <td>
                                    {moment(devoir.dateEnvoi && devoir.dateEnvoi, 'YYYY-MM-DD').format("DD-MM-YYYY")}
                                </td>
                            </tr>
                            <tr>
                                <th>Date d'échéance</th>
                                <td>
                                    {moment(devoir.dateEcheance && devoir.dateEcheance, 'YYYY-MM-DD').format("DD-MM-YYYY")}
                                </td>
                            </tr>


                            {devoir.url &&
                                <tr>
                                    <th>Document à réviser</th>
                                    <td>
                                        <a href={devoir.url} target="_blank" >
                                            Voir document
                                        </a>
                                    </td>
                                </tr>
                            }

                            {devoir.description && devoir.description.trim().length > 0 &&
                                <tr>
                                    <th>Description</th>
                                    <td>{devoir.description && devoir.description}</td>
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



import React, { Component, Fragment } from "react";
import {

    Modal,
    ModalHeader,
    ModalBody,
    Table
} from "reactstrap";
import { Colxx } from "../../../components/common/CustomBootstrap";


import moment from 'moment';

class Modalvoir extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }




    render() {
        const { modalOpenVoir, toggleModal, eleve } = this.props;

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
                                <th>Nom</th>
                                <th>{eleve.Nom}</th>

                            </tr>
                            <tr>
                                <th>Prénom</th>
                                <th>{eleve.prenom}</th>

                            </tr>
                            <tr>
                                <th>Genre</th>
                                <th>{eleve.sexe}</th>
                            </tr>
                            <tr>
                                <th>Date de naissance</th>
                                <th>{moment(eleve.dateNaissance, 'YYYY-MM-DD').format('DD-MM-YYYY')}</th>
                            </tr>
                            <tr>
                                <th>Niveau</th>
                                <th>{eleve.classe.niveau}</th>
                            </tr>
                            <tr>
                                <th>Classe</th>
                                <th>{eleve.classe.nom}</th>
                            </tr>

                        </Table>
                    </Colxx>
                </ModalBody>



            </Modal>
        );
    }
}
export default Modalvoir;


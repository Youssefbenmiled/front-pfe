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
import moment from 'moment';



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
                            {exam.trimestre &&
                                <tr>
                                    <th>Trimestre</th>
                                    <th>{exam.trimestre}</th>

                                </tr>
                            }
                            {exam.domaine &&
                                <tr>
                                    <th>Domaine</th>
                                    <th>{exam.domaine}</th>
                                </tr>
                            }

                            {exam.date &&
                                <tr>
                                    <th>Date évaluation</th>
                                    <th>
                                        {moment(exam.date, 'YYYY-MM-DD').format("DD-MM-YYYY")}
                                    </th>
                                </tr>
                            }


                            {exam.HeureDebut &&
                                <tr>
                                    <th>Heure Début</th>
                                    <th>{exam.HeureDebut}</th>
                                </tr>
                            }
                            {exam.heureFin &&
                                <tr>
                                    <th>Heure Fin</th>
                                    <th>{exam.heureFin}</th>
                                </tr>
                            }
                            {exam.description && exam.description.trim().length > 0 &&
                                <tr>
                                    <th>Description</th>
                                    <th>{exam.description}</th>
                                </tr>
                            }
                            {/* {exam.description && exam.description.trim().length > 0 &&
                                <tr>
                                    <th>Enseignant</th>
                                    <th>{exam.description}</th>
                                </tr>
                            } */}

                        </Table>
                    </Colxx>

                </ModalBody>



            </Modal>

        );
    }
}
export default Modalvoir;



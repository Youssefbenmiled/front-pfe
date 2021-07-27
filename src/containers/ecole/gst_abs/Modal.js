import React, { Component, Fragment } from "react";
import {
    CustomInput,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Table
} from "reactstrap";
import { Colxx } from "../../../components/common/CustomBootstrap";
import List from "./List";
import moment from "moment";

class Modalvoir extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillReceiveProps(nextProps) {
        if (!localStorage.getItem('user_id'))
            return this.props.handleLogout();

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
                                <th>{abs.nomEnseignant + " " + abs.prenomEnseignant}</th>

                            </tr>
                            <tr>
                                <th>Classe</th>
                                <th>{abs.niveauClasse + " " + abs.nomClasse}</th>
                            </tr>

                            <tr>
                                <th>Séance</th>
                                <th>{abs.seance}</th>
                            </tr>
                            <tr>
                                <th>Envoyé le </th>
                                <th>
                                    {moment(abs.date, 'YYYY-MM-DD').format("DD-MM-YYYY") + "  " + abs.heure}
                                </th>

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
                                            edit={false}
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



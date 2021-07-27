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
import moment from "moment";


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
        const { modalOpenVoir, toggleModalVoir, evenement } = this.props;

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
                        {evenement &&
                            <Table responsive hover bordered>
                                <tr>

                                    <th>Titre</th>
                                    <th>{evenement.titre && evenement.titre}</th>
                                </tr>
                                <tr>
                                    <th>Lieu</th>
                                    <th>{evenement.lieu && evenement.lieu}</th>

                                </tr>
                                <tr>
                                    <th>Date début</th>
                                    <th>{moment(evenement.dateDebut && evenement.dateDebut, 'YYYY-MM-DD').format('DD-MM-YYYY')}</th>

                                </tr>
                                <tr>
                                    <th>Date fin</th>
                                    <th>{moment(evenement.dateFin && evenement.dateFin, 'YYYY-MM-DD').format('DD-MM-YYYY')}</th>

                                </tr>
                                <tr>
                                    <th>Description</th>
                                    <th>{evenement.description && evenement.description}</th>

                                </tr>
                                <tr>
                                    <th>Type</th>
                                    <th>{evenement.type && evenement.type}</th>

                                </tr>
                                <tr>
                                    <th>Classes</th>
                                    {evenement.type === "Privé" ?
                                        <th>{evenement.niveauClasse}{' '}{evenement.nomClasse}</th>
                                        :
                                        <th>Toutes les classes</th>
                                    }

                                </tr>
                                {/* <tr>
                                    <th>Photo événement</th>
                                    <th
                                    >
                                        <img src={evenement.image && evenement.image}
                                            alt={evenement.titre}
                                            className="w-33 w-sm-100 m-0 text-left" />
                                    </th>

                                </tr> */}
                                <tr>
                                    <th>Fichier Détaillé</th>
                                    <th>

                                        <a href={evenement.url && evenement.url} target="_blank" >Ouvrir</a>
                                    </th>

                                </tr>



                            </Table>
                        }
                    </Colxx>


                </ModalBody>

            </Modal>
        );
    }
}
export default Modalvoir;



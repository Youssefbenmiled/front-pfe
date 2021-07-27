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


    render() {
        const { modalOpenVoir, toggleModalVoir, evenement } = this.props;
        if (evenement) {
            var debut = moment(evenement.dateDebut && evenement.dateDebut, 'YYYY-MM-DD').format('DD-MM-YYYY');
            var fin = moment(evenement.dateFin && evenement.dateFin, 'YYYY-MM-DD').format('DD-MM-YYYY');

        }
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
                                    <th>{debut}</th>

                                </tr>
                                <tr>
                                    <th>Date fin</th>
                                    <th>{fin}</th>

                                </tr>
                                {evenement.description && evenement.description.trim().length > 0 &&
                                    <tr>
                                        <th>Description</th>
                                        <th>{evenement.description}</th>

                                    </tr>
                                }
                                <tr>
                                    <th>Type</th>
                                    <th>{evenement.type && evenement.type}</th>

                                </tr>
                                {/* <tr>
                                    <th>Photo événement</th>
                                    <th><img
                                        src={evenement.image && evenement.image}
                                        alt={evenement.titre && evenement.titre}
                                        className="w-33 w-sm-100 m-0 text-left" /></th>

                                </tr> */}
                                {evenement.url &&
                                    <tr>
                                        <th>Fichier détaillé</th>
                                        <th>

                                            <a href={evenement.url && evenement.url} target="_blank" >Ouvrir</a>
                                        </th>

                                    </tr>
                                }

                                {/* <tr>
                                    <th>Classes</th>
                                    {evenement.type === "Privé" ?
                                        <th>{evenement.niveauClasse}{' '}{event.nomClasse}</th>
                                        :
                                        <th>Toutes les classes</th>
                                    }

                                </tr> */}

                            </Table>
                        }
                    </Colxx>


                </ModalBody>

            </Modal>
        );
    }
}
export default Modalvoir;



import React, { Component, Fragment } from "react";
import {

    Modal,
    ModalHeader,
    ModalBody,
    Table
} from "reactstrap";
import { Colxx } from "../../../components/common/CustomBootstrap";

import moment from 'moment'

class Modalvoir extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    // imprimer = event => {
    //     const ch = this.props.admin.title
    //     event.preventDefault();


    //     window.html2canvas = html2canvas;

    //     var doc = new jsPDF({
    //         orientation: "landscape",
    //         unit: "px",
    //         format: "a3"
    //     });

    //     var content = document.getElementById("impression");

    //     doc.html(content, {
    //         callback: function (doc) {
    //             doc.save(ch);
    //         }
    //     });
    // }


    render() {
        const { modalOpenVoir, toggleModalVoir, admin } = this.props;
        var dt = moment(admin.dateCreation, 'YYYY-MM-DD').format('DD-MM-YYYY');
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
                                <th>Nom complet</th>
                                <th>{admin.nomPrenom}</th>
                            </tr>
                            <tr>
                                <th>Email</th>
                                <th>{admin.email}</th>
                            </tr>
                            <tr>
                                <th>Roles</th>
                                <th>
                                    {admin.roles && admin.roles.trim().split(' ').filter(x => x.localeCompare('ROLE_GESTION_ADMINISTRATEUR') != 0).length === 5 &&
                                        'Super Administrateur'
                                    }

                                    {admin.roles &&
                                        admin.roles.trim().split(" ").length < 5 &&
                                        admin.roles.trim().split(" ").map(role =>
                                            role
                                        ).join(' ,')
                                    }
                                </th>
                            </tr>


                            <tr>
                                <th>Statut</th>
                                <th>{admin.statut}</th>
                            </tr>
                            <tr>
                                <th>Date de création</th>
                                <th>{dt}</th>
                            </tr>




                        </Table>
                    </Colxx>

                </ModalBody>

            </Modal>
        );
    }
}
export default Modalvoir;



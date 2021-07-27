import React, { Component, Fragment } from "react";
import {

    Modal,
    ModalHeader,
    ModalBody,
    Table
} from "reactstrap";
import { Colxx } from "../../../components/common/CustomBootstrap";

import moment from 'moment';

class Affect extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const { modalOpen, toggleModal, eleve } = this.props;
        return (
            <Modal
                isOpen={modalOpen}
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
                                <th>{eleve.nameEleve}</th>

                            </tr>


                        </Table>
                    </Colxx>

                </ModalBody>



            </Modal>
        );
    }
}
export default Affect;


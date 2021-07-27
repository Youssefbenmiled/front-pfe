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
import { ContextMenuTrigger } from "react-contextmenu";
import Select from "react-select";
import CustomSelectInput from "../../../../components/common/CustomSelectInput";
import IntlMessages from "../../../../helpers/IntlMessages";

import { Separator } from "../../../../components/common/CustomBootstrap";

class Modalvoir extends Component {
    constructor(props) {
        super(props);
        this.state = {


        };
    }

    render() {
        const { modalOpenVoir, toggleModalVoir, feuille } = this.props;

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
                                <th>Trimestre</th>
                                <th>{1}</th>
                            </tr>
                            <tr>
                                <th>Séance</th>
                                <th>{'08:00__09:00'}</th>
                            </tr>
                            <tr>
                                <th>Domaine</th>
                                <th>{'arabe'}</th>
                            </tr>
                            <tr>
                                <th>Enseignant</th>
                                <th>{'enss abgsd'}</th>

                            </tr>
                            <tr>
                                <th>Date d'envoi</th>
                                <th>{}</th>

                            </tr>

                        </Table>
                    </Colxx>
                </ModalBody>
            </Modal>
        );
    }
}
export default Modalvoir;



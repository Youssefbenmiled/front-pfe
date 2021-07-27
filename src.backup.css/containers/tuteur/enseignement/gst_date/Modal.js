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



class Modalvoir extends Component {
    constructor(props) {
        super(props);
        this.state = {


        };
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
                            <thead>
                                <th>Description</th>

                            </thead>
                            <tbody>
                                <td>
                                    {exam.description}{" "}
                                </td>


                            </tbody>


                        </Table>
                    </Colxx>

                </ModalBody>



            </Modal>

        );
    }
}
export default Modalvoir;



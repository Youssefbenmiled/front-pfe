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
import { Colxx } from "../../../components/common/CustomBootstrap";
import { ContextMenuTrigger } from "react-contextmenu";
import Select from "react-select";
import CustomSelectInput from "../../../components/common/CustomSelectInput";
import IntlMessages from "../../../helpers/IntlMessages";
// import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "jspdf-autotable";

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
        const { modalOpenVoir, toggleModalVoir, mat } = this.props;

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
                        {/* <ContextMenuTrigger id="menu_id" data={mat.id} > */}
                        {/* <Card> */}
                        {/* <Table responsive hover bordered>
                            <thead>
                                <th>Niveau</th>
                                <th>Classe</th>
                                <th>Nombre d'éléves</th>

                            </thead>
                            <tbody>
                                <td>{mat.niveau}</td>
                                <td>{mat.Nom}</td>
                                <td>{mat.nbEleves}</td>
                            </tbody>


                        </Table> */}
                        {/* <div className="pl-2 d-flex flex-grow-1 min-width-zero" id="impression" >
                                    <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">

                                        <p className="w-40 w-sm-100 list-item-heading mb-1 truncate"
                                            onClick={() => toggleModalVoir()}
                                        >
                                            {produit.title}{" "}{produit.title}

                                        </p>


                                        <p className="mb-1 text-muted text-small w-15 w-sm-100">
                                            {produit.category}
                                        </p>
                                        <p className="mb-1 text-muted text-small w-15 w-sm-100">
                                            {produit.date}
                                        </p>

                                        <p className="mb-1 text-muted text-small w-15 w-sm-100">
                                            {produit.description}
                                        </p>

                                    </div>

                                </div>

                            </Card>
                        </ContextMenuTrigger> */}
                    </Colxx>

                </ModalBody>
                <ModalFooter>



                </ModalFooter >
            </Modal >
        );
    }
}
export default Modalvoir;


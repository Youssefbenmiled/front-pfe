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
// import jsPDF from "jspdf";
// import "jspdf-autotable";
import { Separator } from "../../../components/common/CustomBootstrap";
import moment from 'moment';
import List from "./List";
import axios from "axios"

class Modalvoir extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eleves: [],
            selectedItems: []

        };
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps) {
            if (!localStorage.getItem('user_id'))
                return this.props.handleLogout();

            this.getEleves(nextProps.feuille.idClasse);
            this.setState({ selectedItems: [nextProps.feuille.idEleve] })
        }

    }
    handleLogout = () => {
        this.props.logoutUser(this.props.history);
    };

    getEleves(idClasse) {


        var query = "http://api.onyx.inedit-gd.tn/eleve/getAll?classe=" + idClasse;

        try {
            axios
                .get(query)
                .then(res => {
                    return res.data;
                })
                .then(data => {
                    this.setState({
                        eleves: data.list,
                    });
                }, error => {
                    return error;
                });
        }
        catch (error) {
            return error;
        }
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

                        <br></br>
                        <br></br>
                        <Table responsive hover bordered>

                            <tr>
                                <th>Classe</th>
                                <td>{feuille.niveauClasse + " " + feuille.nomClasse}</td>
                            </tr>

                            <tr>
                                <th>Séance</th>
                                <td>{feuille.seance}</td>
                            </tr>
                            <tr>
                                <th>Envoyé le</th>
                                <td>{moment(feuille.date, 'YYYY-MM-DD').format("DD-MM-YYYY") + " " + feuille.heure}</td>
                            </tr>




                        </Table>
                        <br></br>
                        <br></br>

                        <Table responsive hover bordered>

                            <th>Nom </th>
                            <th>Prénom </th>
                            <th>Absent</th>


                            <tbody>
                                {this.state.eleves.map((eleve, i) => {
                                    return (
                                        <List
                                            isSelect={this.state.selectedItems.includes(eleve.id)}
                                            key={eleve.id}
                                            eleve={eleve}
                                            edit={false}
                                            handleLogout={this.handleLogout}

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



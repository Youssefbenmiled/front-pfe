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
            eleves: []

        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps)
            this.getEleves(nextProps.idc);

    }

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
                    console.log(error)
                });
        }
        catch (error) {
            console.log("failed" + error)
        }
    }

    render() {
        const { modalOpenVoir, toggleModalVoir, feuille } = this.props;
        var d2 = moment(feuille.date, 'YYYY-MM-DD').format("DD-MM-YYYY");

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
                                <th>Trimestre</th>
                                <td>1</td>

                            </tr>
                            <tr>
                                <th>Domaine</th>
                                <td>anglais</td>
                            </tr>
                            <tr>
                                <th>Séance</th>
                                <td>08:00__10:00</td>
                            </tr>
                            <tr>
                                <th>Envoyé le</th>
                                <td>
                                    {/* {d2} */}
                                22-09-2020</td>
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
                                            key={eleve.id}
                                            eleve={eleve}
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



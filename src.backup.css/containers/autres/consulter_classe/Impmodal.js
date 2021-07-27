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
    , NavLink
} from "reactstrap";
import { Colxx } from "../../../components/common/CustomBootstrap";
import { ContextMenuTrigger } from "react-contextmenu";
import Select from "react-select";
import CustomSelectInput from "../../../components/common/CustomSelectInput";
import IntlMessages from "../../../helpers/IntlMessages";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "jspdf-autotable";

class Impmodal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nbr: "",

        };
    }
    handleChange = event => {
        this.setState({ nbr: event.target.value });
        // console.log(this.state.nbr);
    };
    // handleSubmit = event => {
    //     event.preventDefault();
    // };
    imprimer = event => {
        const ch = this.props.classe.Nom
        event.preventDefault();


        window.html2canvas = html2canvas;

        var doc = new jsPDF({
            orientation: "landscape",
            unit: "px",
            format: "a3"
        });

        var content = document.getElementById("impression");

        doc.html(content, {
            callback: function (doc) {
                doc.save(ch);
            }
        });
    }
    render() {
        const { modalOpen, toggleModalImp, classe } = this.props;

        return (
            <Modal
                isOpen={modalOpen}
                toggle={toggleModalImp}
                size="lg"
                wrapClassName="modal-left"
                backdrop="static"
            >
                <ModalHeader toggle={toggleModalImp}></ModalHeader>
                <ModalBody>
                    <Colxx xxs="12" className="mb-3">
                        <ContextMenuTrigger id="menu_id" data={classe.id} >
                            {/* <Card> */}



                            <div className="pl-2 d-flex flex-grow-1 min-width-zero" id="impression" >
                                <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">

                                    <p
                                        className="list-item-heading mb-1 truncate w-40 w-sm-100"
                                        // id={"Tooltip-" + classe.id}
                                        onClick={() => toggleModalImp()}
                                    >
                                        Niveau : {classe.niveau}{" "}

                                    </p>


                                    <p
                                        className="list-item-heading mb-1 truncate w-40 w-sm-100"
                                        // id={"Tooltip-" + classe.id}
                                        onClick={() => toggleModalImp()}

                                    >
                                        Classe : {classe.Nom}{" "}

                                    </p>
                                    <p
                                        className="list-item-heading mb-1 truncate w-40 w-sm-100"
                                        // id={"Tooltip-" + classe.id}
                                        onClick={() => toggleModalImp()}

                                    >
                                        {classe.nbEleves} éléve

                                    </p>

                                    {/* <h2 className="list-item-heading mb-1 truncate w-40 w-sm-100"
                                    >
                                        {classe.nbEleves === 1 ?


                                            (<p
                                                //className="list-item-heading mb-1 truncate w-40 w-sm-100"
                                                // id={"Tooltip-" + classe.id}
                                                onClick={() => toggleModalImp()}

                                            >
                                                {classe.nbEleves} éléve
                                            </p>)
                                            :

                                            (<p
                                                //className="list-item-heading mb-1 truncate w-40 w-sm-100"
                                                // id={"Tooltip-" + classe.id}
                                                onClick={() => toggleModalImp()}

                                            >
                                                {classe.nbEleves} éléves
                                            </p>)
                                        }
                                    </h2> */}




                                </div>

                            </div>

                            {/* </Card> */}
                        </ContextMenuTrigger>
                    </Colxx>

                </ModalBody>
                <ModalFooter>
                    <form onSubmit={this.imprimer}>

                        <Button
                            color="secondary"
                            type="submit"
                            onClick={() => toggleModalImp()}

                        >
                            Télécharger{" "}
                        </Button>{" "}
                    </form>

                </ModalFooter >
            </Modal >
        );
    }
}
export default Impmodal;


{/* <Button
                            color="secondary"
                            type="submit"
                            onClick={toggleModalImp}
                        >
                            Ajouter{" "}
                        </Button>{" "}
                        <Button color="danger" onClick={toggleModalImp} id="annuler">
                            Annuler{" "}
                        </Button> */}
import React, { Component, Fragment } from "react";
import { Row, Card, CardBody, CardTitle, Table, Label } from "reactstrap";
// import "./table.css";
import axios from "axios";
import DataListViewBus from "../../../../containers/tuteur/horaires/gst_bus/DataListViewBus";
import ListPageHeading from "../../../../containers/tuteur/horaires/gst_bus/ListPageHeading";
import DataListViewChauff from "../../../../containers/tuteur/horaires/gst_bus/DataListViewChauff";
import ViewFile from "../../../../containers/tuteur/horaires/gst_bus/ViewFile";


class gst_bus extends Component {
    constructor(props) {
        super(props);
        // this.mouseTrap = require("mousetrap");

        this.state = {
            displayMode: "list",






            selectedOrderOption: { column: "nbplace", label: "Nombre de places" },

            isLoading: true,

            bus: [],

            items: [],

        };
    }
    componentWillMount() {
        this.dataListRender();

    }




    changeDisplayMode = mode => {
        this.setState({
            displayMode: mode
        });
        return false;
    };







    dataListRender() {



        var query = "http://api.onyx.inedit-gd.tn/transport/getAll?";

        try {
            axios
                .get(query)
                .then(res => res.data)
                .then(data => {
                    this.setState({
                        items: data.list,
                        isLoading: false
                    });
                });
        } catch (error) {
            console.log("failed" + error)
        }
    }




    setBus = bus => {
        this.setState({ bus });
    };







    render() {

        return this.state.isLoading ? (
            <div className="loading" />
        ) : (
                <Fragment>

                    <div className="disable-text-selection">
                        <ListPageHeading
                            heading="Informations bus"
                        />



                        <Row>



                            {this.state.items.map((bus, i) => {
                                return (

                                    <DataListViewBus
                                        key={bus.id}
                                        bus={bus}
                                    // setBus={this.setBus}

                                    />
                                );
                            })

                            }






                        </Row>


                        <ListPageHeading
                            heading="Informations chauffeur"
                        />
                        <Row>



                            {this.state.items.map((bus, i) => {
                                return (

                                    <DataListViewChauff
                                        key={bus.id}
                                        bus={bus}


                                    />
                                );
                            })

                            }
                        </Row>
                        <ListPageHeading
                            heading="Fichier des horaires"
                        />
                        <Row>



                            {this.state.items.map((bus, i) => {
                                return (

                                    <ViewFile
                                        key={bus.id}
                                        bus={bus}


                                    />
                                );
                            })

                            }
                        </Row>


                    </div>


                </Fragment>
            );
    }
}
export default gst_bus;

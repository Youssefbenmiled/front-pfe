import React, { Component, Fragment } from "react";
import { Row, Card, CardBody, CardTitle, Table, Label } from "reactstrap";
import axios from "axios";
import DataListViewBus from "../../../../containers/tuteur/horaires/gst_bus/DataListViewBus";
import ListPageHeading from "../../../../containers/tuteur/ListPageHeading";
import DataListViewChauff from "../../../../containers/tuteur/horaires/gst_bus/DataListViewChauff";
import ViewFile from "../../../../containers/tuteur/horaires/gst_bus/ViewFile";
import {
    logoutUser,
} from "../../../../redux/actions";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

class gst_bus extends Component {
    constructor(props) {
        super(props);

        this.state = {



            selectedOrderOption: { column: "nbplace", label: "Nombre de places" },

            isLoading: true,

            bus: [],

            items: [],

        };
    }
    componentWillMount() {

        try {
            axios
                .get("http://api.onyx.inedit-gd.tn/tuteur/get/" + parseInt(localStorage.getItem('user_id')))
                .then(res => res.data)
                .then(data => {
                    this.setState({ eleve: data.eleves.find(eleve => parseInt(eleve.id) === parseInt(localStorage.getItem('id_eleve'))) })

                    // this.state.eleve = data.eleves.find(eleve => parseInt(eleve.id) === parseInt(localStorage.getItem('id_eleve')))
                    this.dataListRender();

                }, error => {

                })
        } catch (error) {

        }
    }









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
            this.setState({
                isLoading: false
            });
            return error;
        }
    }




    setBus = bus => {
        this.setState({ bus });
    };


    handleLogout = () => {
        this.props.logoutUser(this.props.history);
    };





    render() {
        const { items } = this.state

        return this.state.isLoading ? (
            <div className="loading" />
        ) : (
                <Fragment>

                    <div className="disable-text-selection">
                        <ListPageHeading
                            heading={items.length > 0 ? "Informations bus" : "Aucun bus"}
                        />



                        <Row>



                            {this.state.items.map((bus, i) => {
                                return (

                                    <DataListViewBus
                                        key={bus.id}
                                        bus={bus}
                                        handleLogout={this.handleLogout}

                                    />
                                );
                            })

                            }






                        </Row>


                        <ListPageHeading
                            heading={items.length > 0 ? "Informations chauffeur" : "Aucun chauffeur"}
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
                            heading={items.length > 0 ? "Fichier des horaires" : "Aucun fichier des horaires"}
                        />
                        <Row>



                            {this.state.items.map((bus, i) => {
                                return (

                                    <ViewFile
                                        key={bus.id}
                                        bus={bus}
                                        handleLogout={this.handleLogout}


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
const mapStateToProps = ({ menu }) => {
    const { containerClassnames } = menu;
    return { containerClassnames };
};

export default withRouter(connect(mapStateToProps, { logoutUser })(gst_bus));
// export default gst_bus;

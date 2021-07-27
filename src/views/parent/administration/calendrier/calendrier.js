import React, { Component, Fragment } from "react";
import { Row, Card, CardBody, CardTitle, Table, Label, Button } from "reactstrap";
import axios from "axios";
import DataListView from "../../../../containers/tuteur/administration/calendrier/DataListView";
import ListPageHeading from "../../../../containers/tuteur/ListPageHeading";
import {
    logoutUser,
} from "../../../../redux/actions";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
class calendrier extends Component {
    constructor(props) {
        super(props);

        this.state = {

            isLoading: true,
            calendrier: [],
            items: [],
            eleve: []
        };
    }
    componentWillMount() {

        try {
            axios
                .get("http://api.onyx.inedit-gd.tn/tuteur/get/" + parseInt(localStorage.getItem('user_id')))
                .then(res => res.data)
                .then(data => {
                    this.setState({ eleve: data.eleves.find(eleve => parseInt(eleve.id) === parseInt(localStorage.getItem('id_eleve'))) })

                    this.dataListRender(this.state.eleve)

                }, error => {

                })
        } catch (error) {
        }

    }





    dataListRender(eleve) {


        let query = "";
        query = "http://api.onyx.inedit-gd.tn/exam/getAll?classe=" + eleve.classe.id
        query += "&order=semestre"


        try {
            axios
                .get(query)
                .then(res => res.data)
                .then(data => {

                    this.setState({
                        items: data.list,
                        isLoading: false,

                    });


                });
        } catch (error) {
            this.setState({
                isLoading: false,

            });
            return error;
        }


    }

    handleLogout = () => {
        this.props.logoutUser(this.props.history);
    };

    render() {


        const {
            eleve,
            items,
        } = this.state;


        return this.state.isLoading ? (
            <div className="loading" />
        ) : (
                <Fragment>
                    <div className="disable-text-selection">
                        <ListPageHeading
                            heading={items.length > 0 && eleve ? "Calendriers des examens de la classe " + eleve.classe.niveau + " " + eleve.classe.nom : "Aucun calendrier d'examen"}
                        />
                        <Row>


                            {this.state.items.map((calendrier, i) => {
                                return (

                                    <DataListView
                                        key={calendrier.id}
                                        calendrier={calendrier}
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

export default withRouter(connect(mapStateToProps, { logoutUser })(calendrier));
// export default calendrier;

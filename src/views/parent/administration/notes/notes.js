import React, { Component, Fragment } from "react";
import { Row } from "reactstrap";
import axios from "axios";
import DataListView from "../../../../containers/tuteur/administration/carnets/DataListView";
import ListPageHeading from "../../../../containers/tuteur/ListPageHeading";
import {
    logoutUser,
} from "../../../../redux/actions";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
class carnet extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            items: [],
            eleve: [],

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
                    this.dataListRender(this.state.eleve);

                }, error => {

                })
        } catch (error) {
        }

    }





    dataListRender(eleve) {



        var query = "http://api.onyx.inedit-gd.tn/note/getAll?";
        query += "eleve=" + eleve.id
        query += "&order=semestre"


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
    handleLogout = () => {
        this.props.logoutUser(this.props.history);
    };

    render() {





        const {
            eleve,
            items
        } = this.state;

        return this.state.isLoading ? (
            <div className="loading" />
        ) : (
                <Fragment>

                    <div className="disable-text-selection">
                        <br></br>
                        <ListPageHeading
                            heading={items.length > 0 && eleve ? "Carnets de notes de l'éléve " + eleve.prenom + " " + eleve.Nom : "Aucun carnet de note"}
                        />

                        <Row>


                            {this.state.items.map((carnet, i) => {
                                return (

                                    <DataListView
                                        key={carnet.id}
                                        carnet={carnet}
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

export default withRouter(connect(mapStateToProps, { logoutUser })(carnet));
// export default carnet;

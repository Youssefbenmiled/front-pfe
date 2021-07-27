import React, { Component, Fragment } from "react";
import { Row } from "reactstrap";

import axios from "axios";

import DataListView from "../../../../containers/ens/emploi/DataListView";
import ListPageHeading from "../../../../containers/ens/emploi/ListPageHeading";
import {
    logoutUser,
} from "../../../../redux/actions";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";


class emploi extends Component {
    constructor(props) {
        super(props);

        this.state = {



            isLoading: true,
            ens: null,
            items: [],

        };
    }
    componentWillMount() {
        try {
            axios
                .get("http://api.onyx.inedit-gd.tn/enseignant/get/" + parseInt(localStorage.getItem('user_id')))
                .then(res => res.data)
                .then(data => {
                    // this.state.ens = data
                    this.setState({ ens: data })

                    this.dataListRender(data.id);

                }, error => {

                })
        } catch (error) {
        }

    }



    dataListRender(id) {


        var query = "http://api.onyx.inedit-gd.tn/emploiEns/getAll?enseignant=" + parseInt(id)



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
        }
    }
    handleLogout = () => {
        this.props.logoutUser(this.props.history);
    };


    render() {






        const { items, ens } = this.state
        return this.state.isLoading ? (
            <div className="loading" />
        ) : (
                <Fragment>

                    <div className="disable-text-selection">
                        <ListPageHeading
                            heading={items.length > 0 ? "Emploi de l'enseignant " + ens.nom + " " + ens.prenom : "Aucun emploi"}
                        />



                        <Row>


                            {this.state.items.map((emploi, i) => {
                                return (

                                    <DataListView
                                        key={emploi.id}
                                        emploi={emploi}
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

export default withRouter(connect(mapStateToProps, { logoutUser })(emploi));
// export default emploi;

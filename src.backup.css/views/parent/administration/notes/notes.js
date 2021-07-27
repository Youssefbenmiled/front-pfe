import React, { Component, Fragment } from "react";
import { Row } from "reactstrap";
// import "./table.css";
import axios from "axios";
import DataListView from "../../../../containers/tuteur/administration/carnets/DataListView";
import ListPageHeading from "../../../../containers/tuteur/administration/carnets/ListPageHeading";

class carnet extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            items: [],

        };
    }
    componentWillMount() {
        this.dataListRender();

    }






    dataListRender() {
        const {


        } = this.state;




        var query = "http://api.onyx.inedit-gd.tn/note/getAll?";
        query += "eleve=" + 59
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
            console.log("failed" + error)
        }
    }

    render() {



        const {

        } = this.state;


        return this.state.isLoading ? (
            <div className="loading" />
        ) : (
                <Fragment>

                    <div className="disable-text-selection">
                        <br></br>
                        <ListPageHeading
                            heading={"Carnets de notes de l'éléve Ben salah Ali"}
                        />

                        <Row>


                            {this.state.items.map((carnet, i) => {
                                return (

                                    <DataListView
                                        key={carnet.id}
                                        carnet={carnet}
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
export default carnet;

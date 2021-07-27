import React, { Component, Fragment } from "react";
import { Row, Card, CardBody, CardTitle, Table, Label } from "reactstrap";
// import "./table.css";
import axios from "axios";
import DataListView from "../../../../containers/tuteur/administration/calendrier/DataListView";
import ListPageHeading from "../../../../containers/tuteur/administration/calendrier/ListPageHeading";




class calendrier extends Component {
    constructor(props) {
        super(props);

        this.state = {

            isLoading: true,
            calendrier: [],
            items: [],

        };
    }
    componentWillMount() {
        this.dataListRender();

    }



    dataListRender() {


        const {


        } = this.state;
        let query = "";
        query = "http://api.onyx.inedit-gd.tn/exam/getAll?classe=" + 33
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
                        <ListPageHeading
                            heading={"Calendriers des examens de la classe 1 A"}
                        />
                        <Row>


                            {this.state.items.map((calendrier, i) => {
                                return (

                                    <DataListView
                                        key={calendrier.id}
                                        calendrier={calendrier}

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
export default calendrier;

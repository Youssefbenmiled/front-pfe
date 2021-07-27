import React, { Component, Fragment } from "react";
import { Row } from "reactstrap";

// import "./table.css";
import axios from "axios";

import DataListView from "../../../../containers/ens/emploi/DataListView";
import ListPageHeading from "../../../../containers/ens/emploi/ListPageHeading";



class emploi extends Component {
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


        var query = "http://api.onyx.inedit-gd.tn/emploiEns/getAll?enseignant=" + 20



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








        return this.state.isLoading ? (
            <div className="loading" />
        ) : (
                <Fragment>

                    <div className="disable-text-selection">
                        <ListPageHeading
                            heading={"Emploi Sallemi fethi"}


                        />



                        <Row>


                            {this.state.items.map((emploi, i) => {
                                return (

                                    <DataListView
                                        key={emploi.id}
                                        emploi={emploi}


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
export default emploi;

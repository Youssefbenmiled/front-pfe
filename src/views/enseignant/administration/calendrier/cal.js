import React, { Component, Fragment } from "react";
import { Row, Card, CardBody, CardTitle, Table, Label } from "reactstrap";
import axios from "axios";
import Select from "react-select";
import DataListView from "../../../../containers/ens/calendrier/DataListView";
// import Pagination from "../../../../containers/Pagination";
import ListPageHeading from "../../../../containers/ens/calendrier/ListPageHeading";
import {
    logoutUser,
} from "../../../../redux/actions";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

class calendrier extends Component {
    constructor(props) {
        super(props);

        this.state = {

            classet: [],
            // displayMode: "list",

            // selectedPageSize: 10,

            orderOptions2: [
                { column: "semestre", label: "Trimestre" },
            ],

            // pageSizes: [1, 2, 1, 10, 20, 30, 50, 100],

            selectedOrderOption2: { column: "semestre", label: "Trimestre" },


            // currentPage: 1,
            // totalItemCount: 0,
            // totalPage: 1,

            isLoading: true,

            calendrier: [],
            valueNiveau: {},
            items: [],

        };
    }
    componentWillMount() {
        try {
            axios
                .get("http://api.onyx.inedit-gd.tn/enseignant/get/" + parseInt(localStorage.getItem('user_id')))
                .then(res => res.data)
                .then(data => {
                    this.setState({ classet: data.classe })
                    this.dataListRender(data.classe);

                }, error => {

                })
        } catch (error) {
        }

    }




    changeOrderBy = column => {

        this.setState(
            {
                selectedOrderOption2: this.state.orderOptions2.find(
                    x => x.column === column
                )
            },
            () => this.dataListRender()
        );

    };






    dataListRender(param) {


        const {


            selectedOrderOption2,
            valueNiveau
        } = this.state;
        let query = "";


        if (param) {
            this.setState({
                valueNiveau: { label: param[0].niveau + " " + param[0].Nom, value: param[0].id, niveau: parseInt(param[0].niveau) },
            })
        }


        query = "http://api.onyx.inedit-gd.tn/exam/getAll?classe=" + valueNiveau.value
        // query += "count=" + selectedPageSize
        // query += "&page=" + currentPage
        query += "&order=" + selectedOrderOption2.column
        if (param)
            query += "&classe=" + param[0].id
        else
            query += "&classe=" + valueNiveau.value


        try {
            axios
                .get(query)
                .then(res => res.data)
                .then(data => {

                    this.setState({
                        // totalItemCount: data.count,
                        // totalPage: Math.ceil(data.count / selectedPageSize),
                        items: data.list,
                        isLoading: false,
                    });


                });
        } catch (error) {
            this.setState({
                isLoading: false
            });
        }

    }




    handleChangeNiveau = value => {
        this.setState({
            valueNiveau: value,
        }, this.dataListRender);
    };
    handleLogout = () => {
        this.props.logoutUser(this.props.history);
    };


    render() {

        const cls = this.state.classet.map((classe, i) => {
            return { label: classe.niveau + " " + classe.Nom, value: classe.id };
        })


        const {
            currentPage,
            items,
            displayMode,
            selectedPageSize,
            totalItemCount,
            //selectedOrderOption,
            selectedOrderOption2,
            //orderOptions,
            orderOptions2,
            pageSizes,
            valueNiveau,
        } = this.state;

        const { match } = this.props;
        const startIndex = (currentPage - 1) * selectedPageSize;
        const endIndex = currentPage * selectedPageSize;

        return this.state.isLoading ? (
            <div className="loading" />
        ) : (
                <Fragment>

                    <Label>
                        <h3>Classe : </h3>
                    </Label>
                    <Select
                        onChange={this.handleChangeNiveau}
                        value={valueNiveau}
                        options={cls}
                        className="react-select"
                        classNamePrefix="react-select"
                        name="form-field-name"

                    />



                    <div className="disable-text-selection">
                        <ListPageHeading
                            heading={items.length > 0 ? "Calendriers des examens de la classe " + valueNiveau.label : "Aucune calendrier d'examen"}
                            // displayMode={displayMode}
                            // changeDisplayMode={this.changeDisplayMode}
                            changeOrderBy={this.changeOrderBy}
                            // changePageSize={this.changePageSize}
                            // selectedPageSize={selectedPageSize}
                            // totalItemCount={totalItemCount}
                            selectedOrderOption={selectedOrderOption2}
                            // match={match}
                            // startIndex={startIndex}
                            // endIndex={endIndex}
                            orderOptions={orderOptions2}
                        // pageSizes={pageSizes}


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

import React, { Component, Fragment } from "react";
import { Row, Card, CardBody, CardTitle, Table, Label } from "reactstrap";
// import "./table.css";
import axios from "axios";
import Select from "react-select";
import DataListView from "../../../../containers/ens/calendrier/DataListView";
import Pagination from "../../../../containers/ens/calendrier/Pagination";
import ListPageHeading from "../../../../containers/ens/calendrier/ListPageHeading";


class calendrier extends Component {
    constructor(props) {
        super(props);

        this.state = {

            classet: [],

            displayMode: "list",

            selectedPageSize: 10,
            orderOptions: [
                { column: "id", label: "Identifiant" },
                { column: "niveau", label: "Niveau" },
                { column: "semestre", label: "Trimestre" },

            ],
            orderOptions2: [
                { column: "id", label: "Identifiant" },
                { column: "semestre", label: "Trimestre" },

            ],

            pageSizes: [1, 2, 5, 10, 20, 30, 50, 100],




            selectedOrderOption: { column: "niveau", label: "Niveau" },
            selectedOrderOption2: { column: "semestre", label: "Trimestre" },

            dropdownSplitOpen: false,
            currentPage: 1,
            totalItemCount: 0,
            totalPage: 1,
            search: "",
            isLoading: true,

            calendrier: [],
            valueNiveau: { label: "Tous les calendriers des examens", value: "*" },
            items: [],

        };
    }
    componentWillMount() {
        this.dataListRender();
        this.classes()

    }




    changeOrderBy = column => {
        if (this.state.valueNiveau.value === "*") {
            this.setState(
                {
                    selectedOrderOption: this.state.orderOptions.find(
                        x => x.column === column
                    )
                },
                () => this.dataListRender()
            );
        }
        else {
            this.setState(
                {
                    selectedOrderOption2: this.state.orderOptions2.find(
                        x => x.column === column
                    )
                },
                () => this.dataListRender()
            );
        }
    };

    changePageSize = size => {
        this.setState(
            {
                selectedPageSize: size,
                currentPage: 1
            },
            () => this.dataListRender()
        );
    };
    changeDisplayMode = mode => {
        this.setState({
            displayMode: mode
        });
        return false;
    };

    onChangePage = page => {
        this.setState(
            {
                currentPage: page
            },
            () => this.dataListRender()
        );
    };

    classes() {
        this.setState({
            classet: [{ id: "*", Nom: "Tous les calendriers des examens", niveau: "", nbEleves: "" }],
        })
        var query = "http://api.onyx.inedit-gd.tn/classe/getAll";

        try {
            axios
                .get(query)
                .then(res => res.data)
                .then(data => {
                    this.setState({
                        classet: this.state.classet.concat(data.list)
                    });
                });
        } catch (error) {
            console.log("failed" + error)
        }
    }

    dataListRender() {


        const {
            selectedPageSize,
            currentPage,
            selectedOrderOption,
            selectedOrderOption2,
            valueNiveau
        } = this.state;
        let query = "";


        if (valueNiveau.value === "*") {
            query += "http://api.onyx.inedit-gd.tn/exam/getAll?";
            query += "count=" + selectedPageSize
            query += "&page=" + currentPage
            query += "&order=" + selectedOrderOption.column

        }

        else {
            query = "http://api.onyx.inedit-gd.tn/exam/getAll?classe=" + valueNiveau.value
            query += "count=" + selectedPageSize
            query += "&page=" + currentPage
            query += "&order=" + selectedOrderOption2.column
        }

        try {
            axios
                .get(query)
                .then(res => res.data)
                .then(data => {

                    this.setState({
                        totalItemCount: data.count,
                        totalPage: Math.ceil(data.count / selectedPageSize),
                        items: data.list,
                        isLoading: false
                    });


                });
        } catch (error) {
            console.log("failed" + error)
        }

    }



    // setCal = calendrier => {
    //     this.setState({ calendrier });
    // };

    handleChangeNiveau = value => {
        this.setState({
            valueNiveau: value,
        }, this.dataListRender);
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
            selectedOrderOption,
            selectedOrderOption2,
            orderOptions,
            orderOptions2,
            pageSizes,
            valueNiveau,
            valueClasse
        } = this.state;
        const { match } = this.props;
        const startIndex = (currentPage - 1) * selectedPageSize;
        const endIndex = currentPage * selectedPageSize;

        return this.state.isLoading ? (
            <div className="loading" />
        ) : (
                <Fragment>

                    <Label>
                        <h3>Affichage : </h3>
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
                            heading={valueNiveau.value == "*" ? "Tous les calendriers des examens" : "Calendriers des examens de la classe " + valueNiveau.label}
                            displayMode={displayMode}
                            changeDisplayMode={this.changeDisplayMode}
                            changeOrderBy={this.changeOrderBy}
                            changePageSize={this.changePageSize}
                            selectedPageSize={selectedPageSize}
                            totalItemCount={totalItemCount}
                            selectedOrderOption={valueClasse ? selectedOrderOption2 : selectedOrderOption}
                            match={match}
                            startIndex={startIndex}
                            endIndex={endIndex}
                            orderOptions={valueClasse ? orderOptions2 : orderOptions}
                            pageSizes={pageSizes}


                        />
                        <Row>


                            {this.state.items.map((calendrier, i) => {
                                return (

                                    <DataListView
                                        key={calendrier.id}
                                        calendrier={calendrier}
                                        setCal={this.setCal}
                                        niveau={valueNiveau ? valueNiveau : null}

                                    />
                                );
                            })

                            }

                            <Pagination
                                currentPage={this.state.currentPage}
                                totalPage={this.state.totalPage}
                                onChangePage={i => this.onChangePage(i)}
                            />

                        </Row>
                    </div>


                </Fragment>
            );
    }
}
export default calendrier;

import React, { Component, Fragment } from "react";
import { Row, Card, CardBody, CardTitle, Table, Label } from "reactstrap";
// import "./table.css";
import axios from "axios";
import { levelscal } from "../../../constants/defaultValues";
import Select from "react-select";
import DataListView from "../../../containers/ecole/calendrier_exams/DataListView";
import Pagination from "../../../containers/ecole/calendrier_exams/Pagination";
import ListPageHeading from "../../../containers/ecole/calendrier_exams/ListPageHeading";
import AddNewModal from "../../../containers/ecole/calendrier_exams/AddNewModal";
import DeleteModal from "../../../containers/ecole/calendrier_exams/DeleteModal";




class calendrier_exams extends Component {
    constructor(props) {
        super(props);
        this.mouseTrap = require("mousetrap");

        this.state = {
            chercher: "",
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
            modalOpen: false,
            modalOpenDelete: false,
            currentPage: 1,
            totalItemCount: 0,
            totalPage: 1,
            search: "",
            selectedItems: [],
            lastChecked: null,
            isLoading: true,
            calendrier: [],
            valueNiveau: { label: "Tous les calendriers des examens", value: "*" },
            valueClasse: null,
            items: [],

        };
    }
    componentDidMount() {
        this.dataListRender();

    }



    toggleModal = () => {
        this.setState({
            modalOpen: !this.state.modalOpen
        }, this.setST);
    };

    toggleModalDelete = () => {
        this.setState({
            modalOpenDelete: !this.state.modalOpenDelete
        });
    };

    changeOrderBy = column => {
        if (!this.state.valueClasse) {
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

    onSearchKey = e => {
        if (e.key === "Enter") {
            this.setState(
                {
                    search: e.target.value.toLowerCase()
                },
                () => this.dataListRender()
            );
        }
    };

    onCheckItem = (event, id) => {
        if (this.state.valueClasse) {
            if (
                event.target.tagName === "A" ||
                (event.target.parentElement && event.target.parentElement.tagName === "A")
            ) {
                return true;
            }
            if (this.state.lastChecked === null) {
                this.setState({
                    lastChecked: id
                });
            }

            let selectedItems = this.state.selectedItems;
            if (selectedItems.includes(id)) {
                selectedItems = selectedItems.filter(x => x !== id);
            }
            else {
                selectedItems.push(id);
            }
            this.setState({
                selectedItems
            });

            if (event.shiftKey) {
                var items = this.state.items;
                var start = this.getIndex(id, items, "id");
                var end = this.getIndex(this.state.lastChecked, items, "id");
                items = items.slice(Math.min(start, end), Math.max(start, end) + 1);
                selectedItems.push(
                    ...items.map(item => {
                        return item.id;
                    })
                );
                selectedItems = Array.from(new Set(selectedItems));
                this.setState({
                    selectedItems
                });
            }
            document.activeElement.blur();
        }
    };


    classes(niveau) {
        try {
            axios
                .get(
                    "http://api.onyx.inedit-gd.tn/classe/classe/" + niveau)
                .then(res => {
                    console.log(res)
                    return res.data;
                })
                .then(data => {
                    this.setState({
                        classet: data,

                    });
                }, error => {
                    console.log(error)
                });
        }
        catch (error) {
            console.log("failed" + error)
        }
    }

    dataListRender() {


        const {
            selectedPageSize,
            currentPage,
            selectedOrderOption,
            selectedOrderOption2,
            valueClasse,
            search,
            valueNiveau
        } = this.state;
        let query = "";

        if (valueNiveau.value !== "*" && !valueClasse) {
            this.classes(valueNiveau.value)
            this.setState({ items: [] })
            return;
        }
        if (valueNiveau.value === "*") {
            query += "http://api.onyx.inedit-gd.tn/exam/getAll?";
            query += "count=" + selectedPageSize
            query += "&page=" + currentPage
            query += "&order=" + selectedOrderOption.column
            // query += "&search=" + search;

        }

        if (valueClasse && valueClasse.value) {
            query = "http://api.onyx.inedit-gd.tn/exam/getAll?classe=" + valueClasse.value
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
                        selectedItems: [],
                        isLoading: false
                    });


                });
        } catch (error) {
            console.log("failed" + error)
        }

    }
    onContextMenuClick = (e, data, target) => {

    };

    onContextMenu = (e, data) => {
        const clickedProductId = data.data;
        if (!this.state.selectedItems.includes(clickedProductId)) {
            this.setState({
                selectedItems: [clickedProductId]
            });
        }

        return true;
    };


    setCal = calendrier => {
        this.setState({ calendrier });
    };

    handleChangeNiveau = value => {
        this.setState({
            valueNiveau: value,
            valueClasse: null,
            selectedItems: []
        }, this.dataListRender);
    };
    handleChangeClasse = value => {
        this.setState({
            valueClasse: value,
            selectedItems: []
        }, this.dataListRender);
    };



    chercher = (event) => {
        this.setState({ chercher: event.target.value })
    }


    setST = () => {
        this.setState({ selectedItems: [] })
    }
    render() {
        const cls = this.state.classet.map((classe, i) => {
            return { label: classe.Nom, value: classe.id };
        })


        const {
            currentPage,
            items,
            displayMode,
            selectedPageSize,
            totalItemCount,
            selectedOrderOption,
            selectedOrderOption2,
            selectedItems,
            orderOptions,
            orderOptions2,
            pageSizes,
            modalOpen,
            modalOpenDelete,
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
                        <h3>Affichage et création :</h3>
                    </Label>
                    <Select
                        onChange={this.handleChangeNiveau}
                        value={valueNiveau}
                        options={levelscal}
                        className="react-select"
                        classNamePrefix="react-select"
                        name="form-field-name"

                    />

                    {valueNiveau && valueNiveau.value !== "*" &&
                        <>
                            <br></br>
                            <Label>
                                <h3>Classe :</h3>
                            </Label>
                            <Select
                                onChange={this.handleChangeClasse}
                                value={valueClasse}
                                options={cls}
                                className="react-select"
                                placeholder="Sélectionnez une classe..."
                                classNamePrefix="react-select"
                                name="form-field-name"

                            />
                        </>
                    }

                    <div className="disable-text-selection">
                        {valueClasse || valueNiveau.value == "*" ?
                            <ListPageHeading
                                heading={valueNiveau.value == "*" ? "Tous les calendriers des examens" : "Calendriers des examens de la classe " + valueNiveau.label + " " + valueClasse.label}
                                changeOrderBy={this.changeOrderBy}
                                changePageSize={this.changePageSize}
                                selectedPageSize={selectedPageSize}
                                totalItemCount={totalItemCount}
                                selectedOrderOption={valueClasse ? selectedOrderOption2 : selectedOrderOption}
                                startIndex={startIndex}
                                endIndex={endIndex}
                                selectedItemsLength={selectedItems ? selectedItems.length : 0}
                                orderOptions={valueClasse ? orderOptions2 : orderOptions}
                                pageSizes={pageSizes}
                                toggleModal={this.toggleModal}
                                toggleModalDelete={this.toggleModalDelete}
                                classe={this.state.valueClasse ? this.state.valueClasse : null}
                                items={items && items}

                            />
                            : null}



                        <DeleteModal
                            modalOpen={modalOpenDelete}
                            toggleModal={this.toggleModalDelete}
                            selectedItems={this.state.selectedItems}
                            setSt={this.setST}
                            callback={() => this.dataListRender()}
                            classe={valueClasse ? valueClasse : null}


                        />

                        <AddNewModal
                            modalOpen={modalOpen}
                            toggleModal={this.toggleModal}
                            callback={() => this.dataListRender()}
                            classe={valueClasse ? valueClasse : null}
                        />

                        <Row>


                            {this.state.items.map((calendrier, i) => {
                                return (

                                    <DataListView
                                        key={calendrier.id}
                                        calendrier={calendrier}
                                        isSelect={this.state.selectedItems.includes(calendrier.id)}
                                        onCheckItem={this.onCheckItem}
                                        classe={valueClasse ? valueClasse : null}
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
export default calendrier_exams;

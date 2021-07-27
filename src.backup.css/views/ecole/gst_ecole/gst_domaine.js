import React, { Component, Fragment } from "react";
import { Row, Card, CardBody, CardTitle, Table } from "reactstrap";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
// import "./table.css";
import axios from "axios";
import { levelsdm } from "../../../constants/defaultValues";
import Select from "react-select";

import DataListView from "../../../containers/ecole/gestion_domaines/DataListView";
import Pagination from "../../../containers/ecole/gestion_domaines/Pagination";
import ContextMenuContainer from "../../../containers/ecole/gestion_domaines/ContextMenuContainer";
import ListPageHeading from "../../../containers/ecole/gestion_domaines/ListPageHeading";
import AddNewModal from "../../../containers/ecole/gestion_domaines/AddNewModal";
import UpdateModal from "../../../containers/ecole/gestion_domaines/UpdateModal";
import DeleteModal from "../../../containers/ecole/gestion_domaines/DeleteModal";

function collect(props) {
    return { data: props.data };
}

class gst_domaine extends Component {
    constructor(props) {
        super(props);

        this.state = {
            chercher: "",
            displayMode: "list",

            selectedPageSize: 10,
            orderOptions: [
                { column: "id", label: "Identifiant" },
                { column: "niveau", label: "Niveau" },
                { column: "nom", label: "Domaine" },
            ],

            orderOptions2: [
                { column: "id", label: "Identifiant" },
                { column: "nom", label: "Domaine" },
            ],

            selectedOrderOption: { column: "niveau", label: "Niveau" },
            selectedOrderOption2: { column: "nom", label: "Domaine" },


            pageSizes: [1, 2, 5, 10, 20, 30, 50, 100],
            dropdownSplitOpen: false,
            modalOpen: false,
            modalOpenUpdate: false,
            modalOpenDelete: false,
            modalOpenUpdateList: false,
            modalOpenDeleteList: false,
            currentPage: 1,
            totalItemCount: 0,
            totalPage: 1,
            search: "",
            selectedItems: [],
            lastChecked: null,
            isLoading: true,
            items: [],
            domaine: {},
            valueNiveau: { label: "Tous les domaines", value: "*" },
            modalOpenVoir: false,


        };
    }
    componentWillMount() {
        this.dataListRender()


    }



    toggleModal = () => {
        this.setState({
            modalOpen: !this.state.modalOpen
        });
        console.log(this.state.selectedItems)

    };
    toggleModalUpdate = () => {
        this.setState({
            modalOpenUpdate: !this.state.modalOpenUpdate
        });
    };

    toggleModalDelete = () => {
        this.setState({
            modalOpenDelete: !this.state.modalOpenDelete
        });
    };
    changeOrderBy = column => {
        if (this.state.valueNiveau.value == "*") {
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

        if (this.state.valueNiveau.value != '*') {
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
            } else {
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

    getIndex(value, arr, prop) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i][prop] === value) {
                return i;
            }
        }
        return -1;
    }

    dataListRender() {
        const {
            selectedPageSize,
            currentPage,
            selectedOrderOption,
            selectedOrderOption2,
            search,
            valueNiveau
        } = this.state;


        var query = "http://api.onyx.inedit-gd.tn/domaine/getAll?";
        query += "count=" + selectedPageSize
        query += "&page=" + currentPage
        query += "&search=" + search;
        if (valueNiveau && valueNiveau.value != "*") {
            query += "&classe=" + parseInt(valueNiveau.value);
            query += "&order=" + selectedOrderOption2.column

        }
        else {
            query += "&order=" + selectedOrderOption.column

        }

        try {
            axios
                .get(query)
                .then(res => {
                    console.log(res.data)
                    return res.data;
                })
                .then(data => {
                    this.setState({
                        totalItemCount: data.count,
                        totalPage: Math.ceil(data.count / selectedPageSize),
                        items: data.list,
                        selectedItems: [],
                        isLoading: true
                    });
                }, error => {
                    console.log(error)
                });
        }
        catch (error) {
            console.log("failed" + error)
        }
    }




    onContextMenuClick = (e, data, target) => {
        console.log(
            "onContextMenuClick - selected items",
            this.state.selectedItems
        );
        console.log("onContextMenuClick - action : ", data.action);
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

    setDomaine = domaine => {
        this.setState({ domaine });
    };

    handleChangeNiveau = value => {
        this.setState({
            valueNiveau: value,
        },
            this.dataListRender
        );
    };

    chercher = (event) => {
        this.setState({ search: event.target.value }, this.dataListRender)
    }

    setST = () => {
        this.setState({ selectedItems: [] })
    }
    render() {



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
            modalOpenUpdate,
            modalOpenDelete,
            search,
            valueNiveau,
            domaine
        } = this.state;
        const { match } = this.props;
        const startIndex = (currentPage - 1) * selectedPageSize;
        const endIndex = currentPage * selectedPageSize;


        return !this.state.isLoading ? (
            <div className="loading" />
        ) : (
                <Fragment>


                    <label>
                        <h3>Niveau :</h3>
                    </label>
                    <Select
                        onChange={this.handleChangeNiveau}
                        value={valueNiveau}
                        options={levelsdm}
                        className="react-select"
                        placeholder="Sélectionner un niveau ..."
                        classNamePrefix="react-select"
                        name="form-field-name"
                        required
                    />



                    <div className="disable-text-selection">
                        <br></br>
                        {valueNiveau &&

                            <ListPageHeading
                                heading={valueNiveau.value != "*" ? "Liste des domaines de niveau " + valueNiveau.label : "Tous les domaines"}
                                displayMode={displayMode}
                                changeDisplayMode={this.changeDisplayMode}
                                changeOrderBy={this.changeOrderBy}
                                changePageSize={this.changePageSize}
                                selectedPageSize={selectedPageSize}
                                totalItemCount={totalItemCount}
                                selectedOrderOption={valueNiveau.value == "*" ? selectedOrderOption : selectedOrderOption2}
                                match={match}
                                startIndex={startIndex}
                                endIndex={endIndex}
                                itemsLength={selectedItems ? selectedItems.length : 0}
                                onSearchKey={this.onSearchKey}
                                orderOptions={valueNiveau.value == "*" ? orderOptions : orderOptions2}
                                pageSizes={pageSizes}
                                toggleModal={this.toggleModal}
                                toggleModalUpdate={this.toggleModalUpdate}
                                toggleModalDelete={this.toggleModalDelete}
                                niveau={valueNiveau && valueNiveau}
                            />

                        }
                        <AddNewModal
                            modalOpen={modalOpen}
                            toggleModal={this.toggleModal}
                            callback={() => this.dataListRender()}
                            niveau={valueNiveau.value != "*" && valueNiveau}

                        />
                        <UpdateModal
                            modalOpen={modalOpenUpdate}
                            toggleModal={this.toggleModalUpdate}
                            callback={() => this.dataListRender()}
                            domaine={domaine}
                            setST={this.setST}
                            niveau={valueNiveau.value}

                        />
                        <DeleteModal
                            modalOpen={modalOpenDelete}
                            toggleModal={this.toggleModalDelete}
                            callback={() => this.dataListRender()}
                            domaine={domaine}
                            selectedItems={this.state.selectedItems}
                            setST={this.setST}

                        />
                        <Row>
                            {valueNiveau &&
                                <div className="search-sm d-inline-block float-md-left mr-1 mb-1 align-top">
                                    <input
                                        type="text"
                                        name="keyword"
                                        id="search"
                                        placeholder="Rechercher"
                                        value={search}
                                        onChange={this.chercher}
                                    />
                                </div>
                            }
                            {this.state.items.map((domaine, i) => {
                                return (


                                    <DataListView
                                        key={domaine.id}
                                        domaine={domaine}
                                        isSelect={this.state.selectedItems.includes(domaine.id)}
                                        onCheckItem={this.onCheckItem}
                                        setDomaine={this.setDomaine}
                                        collect={collect}
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
                            {valueNiveau.value != "*" &&
                                <ContextMenuContainer
                                    onContextMenuClick={this.onContextMenuClick}
                                    onContextMenu={this.onContextMenu}
                                    selectedItems={this.state.selectedItems.length}
                                    toggleModalUpdate={this.toggleModalUpdate}
                                    toggleModalDelete={this.toggleModalDelete}

                                />
                            }
                        </Row>
                    </div>

                </Fragment>
            );
    }
}
export default gst_domaine;
{/* {
                                    chercher != "" ? (
                                        filteredItems.map((product, i) => {
                                            return (


                                                <DataListView
                                                    key={product.id}
                                                    product={product}
                                                    isSelect={this.state.selectedItems.includes(product.id)}
                                                    onCheckItem={this.onCheckItem}
                                                    collect={collect}
                                                    setProduct={this.setProduct}
                                                    toggleModalVoir={this.toggleModalVoir}

                                                />

                                            );
                                        })
                                    ) :

                                        this.state.items.map((product, i) => {
                                            return (


                                                <DataListView
                                                    key={product.id}
                                                    product={product}
                                                    isSelect={this.state.selectedItems.includes(product.id)}
                                                    onCheckItem={this.onCheckItem}
                                                    collect={collect}
                                                    setProduct={this.setProduct}
                                                    toggleModalVoir={this.toggleModalVoir}

                                                />
                                            );
                                        })

                                }{" "} */}
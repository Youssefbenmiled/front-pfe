
import React, { Component, Fragment } from "react";
import { Row, Card, CardBody, CardTitle, Table } from "reactstrap";
// import "./table.css";
import axios from "axios";
import Select from "react-select";
import DataListView from "../../../../containers/ecole/gst_cantine/DataListView";
import Pagination from "../../../../containers/ecole/gst_cantine/Pagination";
import ContextMenuContainer from "../../../../containers/ecole/gst_cantine/ContextMenuContainer";
import ListPageHeading from "../../../../containers/ecole/gst_cantine/ListPageHeading";
import AddNewModal from "../../../../containers/ecole/gst_cantine/AddNewModal";
import UpdateModal from "../../../../containers/ecole/gst_cantine/UpdateModal";
import DeleteModal from "../../../../containers/ecole/gst_cantine/DeleteModal";

function collect(props) {
    return { data: props.data };
}

class gst_cantine extends Component {
    constructor(props) {
        super(props);

        this.state = {
            displayMode: "list",
            exam: [],
            selectedPageSize: 10,
            tab: [],

            orderOptions: [
                { column: "id", label: "Identifiant" },
                { column: "delaisDebut", label: "Date début" },
                { column: "delaisFin", label: "Date fin" },


            ],

            pageSizes: [1, 2, 5, 10, 20, 30, 50, 100],

            selectedOrderOption: { column: "delaisDebut", label: "Date début" },


            dropdownSplitOpen: false,
            modalOpen: false,
            modalOpenUpdate: false,
            modalOpenDelete: false,
            currentPage: 1,
            totalItemCount: 0,
            totalPage: 1,
            search: "",
            selectedItems: [],
            lastChecked: null,
            isLoading: true,
            items: [],
            cantine: [],




        };
    }


    componentWillMount() {
        this.dataListRender();


    }



    toggleModal = () => {
        this.setState({
            modalOpen: !this.state.modalOpen
        }, this.setST);

    };

    toggleModalUpdate = () => {
        this.setState({
            modalOpenUpdate: !this.state.modalOpenUpdate
        });

    };
    setST = () => {
        this.setState({ selectedItems: [] })
    }

    toggleModalDelete = () => {
        this.setState({

            modalOpenDelete: !this.state.modalOpenDelete
        });

    };

    changeOrderBy = column => {
        this.setState(
            {
                selectedOrderOption: this.state.orderOptions.find(
                    x => x.column === column
                )
            },
            () => this.dataListRender()
        );

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


        let selectedItems = this.state.selectedItems;
        if (selectedItems.includes(id)) {
            selectedItems = selectedItems.filter(x => x !== id);
        } else {
            selectedItems.push(id);
        }
        this.setState({
            selectedItems
        });


    };



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

    setCa = cantine => {
        this.setState({ cantine });
    };




    dataListRender() {
        const {
            selectedPageSize,
            currentPage,
            selectedOrderOption,
        } = this.state;


        var query = "http://api.onyx.inedit-gd.tn/cantine/getAll?";
        query += "count=" + selectedPageSize
        query += "&page=" + currentPage
        query += "&order=" + selectedOrderOption.column



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


    render() {

        const {
            currentPage,
            items,
            displayMode,
            selectedPageSize,
            totalItemCount,
            selectedOrderOption,
            selectedItems,
            orderOptions,
            pageSizes,
            modalOpen,
            modalOpenUpdate,
            modalOpenDelete,
        } = this.state;
        const { match } = this.props;
        const startIndex = (currentPage - 1) * selectedPageSize;
        const endIndex = currentPage * selectedPageSize;

        return this.state.isLoading ? (
            <div className="loading" />
        ) : (
                <Fragment>





                    <div className="disable-text-selection">


                        <ListPageHeading
                            heading={"Tous les menus"}
                            displayMode={displayMode}
                            changeDisplayMode={this.changeDisplayMode}
                            changeOrderBy={this.changeOrderBy}
                            changePageSize={this.changePageSize}
                            selectedPageSize={selectedPageSize}
                            totalItemCount={totalItemCount}
                            selectedOrderOption={selectedOrderOption}
                            match={match}
                            startIndex={startIndex}
                            endIndex={endIndex}
                            selectedItemsLength={selectedItems ? selectedItems.length : 0}
                            onSearchKey={this.onSearchKey}
                            orderOptions={orderOptions}
                            pageSizes={pageSizes}
                            toggleModal={this.toggleModal}
                            toggleModalUpdate={this.toggleModalUpdate}
                            toggleModalDelete={this.toggleModalDelete}
                            setST={this.setST}

                        />


                        <AddNewModal
                            modalOpen={modalOpen}
                            toggleModal={this.toggleModal}
                            callback={() => this.dataListRender()}
                            setST={this.setST}

                        />


                        <UpdateModal
                            modalOpen={modalOpenUpdate}
                            toggleModal={this.toggleModalUpdate}
                            callback={() => this.dataListRender()}
                            setST={this.setST}
                            cantine={this.state.cantine}

                        />

                        <DeleteModal
                            modalOpen={modalOpenDelete}
                            toggleModal={this.toggleModalDelete}
                            callback={() => this.dataListRender()}
                            selectedItems={this.state.selectedItems}
                            setST={this.setST}
                            cantine={this.state.cantine}

                        />
                        <Row>



                            {this.state.items.map((cantine, i) => {

                                return (


                                    <DataListView
                                        key={cantine.id}
                                        cantine={cantine}
                                        isSelect={this.state.selectedItems.includes(cantine.id)}
                                        onCheckItem={this.onCheckItem}
                                        setCa={this.setCa}
                                        collect={collect}
                                    />
                                );
                            })
                            }

                            <Pagination
                                currentPage={this.state.currentPage}
                                totalPage={this.state.totalPage}
                                onChangePage={i => this.onChangePage(i)}
                            />

                            <ContextMenuContainer
                                onContextMenuClick={this.onContextMenuClick}
                                onContextMenu={this.onContextMenu}
                                selectedItems={this.state.selectedItems}
                                toggleModalUpdate={this.toggleModalUpdate}
                                toggleModalDelete={this.toggleModalDelete}
                            />



                        </Row>
                    </div>






                </Fragment>
            );
    }
}
export default gst_cantine;
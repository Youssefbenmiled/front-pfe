import React, { Component, Fragment } from "react";
import { Row, Card, CardBody, CardTitle, Table } from "reactstrap";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
// import "./table.css";
import axios from "axios";
import { levelsdm } from "../../../constants/defaultValues";
import Select from "react-select";

import DataListView from "../../../containers/ecole/gestion_domaines/DataListView";
import Pagination from "../../../containers/Pagination";
import ContextMenuContainer from "../../../containers/ecole/gestion_domaines/ContextMenuContainer";
import ListPageHeading from "../../../containers/ecole/gestion_domaines/ListPageHeading";
import AddNewModal from "../../../containers/ecole/gestion_domaines/AddNewModal";
import UpdateModal from "../../../containers/ecole/gestion_domaines/UpdateModal";
import DeleteModal from "../../../containers/ecole/gestion_domaines/DeleteModal";
import {
    logoutUser,
} from "../../../redux/actions";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
function collect(props) {
    return { data: props.data };
}

class gst_domaine extends Component {
    constructor(props) {
        super(props);

        this.state = {

            displayMode: "list",

            selectedPageSize: 10,
            orderOptions: [
                // { column: "id", label: "Identifiant" },
                { column: "niveau", label: "Niveau" },
                { column: "nom", label: "Domaine" },
            ],

            orderOptions2: [
                // { column: "id", label: "Identifiant" },
                { column: "nom", label: "Domaine" },
            ],

            selectedOrderOption: { column: "niveau", label: "Niveau" },
            selectedOrderOption2: { column: "nom", label: "Domaine" },


            pageSizes: [1, 2, 5, 10, 20, 30, 50, 100],

            modalOpen: false,
            modalOpenUpdate: false,
            modalOpenDelete: false,


            currentPage: 1,
            totalItemCount: 0,
            totalPage: 1,
            search: "",
            selectedItems: [],

            isLoading: true,
            items: [],
            domaine: {},
            valueNiveau: { label: "Tous les domaines", value: "*" },


        };
    }
    componentWillMount() {
        try {
            axios
                .get("http://api.onyx.inedit-gd.tn/admins/get/" + parseInt(localStorage.getItem('user_id')))
                .then(res => res.data)
                .then(data => {
                    if (data.roles.includes('ROLE_GESTION_ECOLE'))
                        this.dataListRender();
                    else
                        this.props.history.push('/ecole/accueil');
                });
        } catch (error) {
            return error;
        }


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
        this.setState(
            {
                search: e.target.value.toLowerCase()
            },
            () => this.dataListRender()
        );

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
                    return res.data;
                })
                .then(data => {
                    this.setState({
                        totalItemCount: data.count,
                        totalPage: Math.ceil(data.count / selectedPageSize),
                        items: data.list,
                        selectedItems: [],
                        isLoading: false
                    });
                }, error => {
                    return error;

                });
        }
        catch (error) {
            return error;
        }
    }




    onContextMenuClick = (e, data, target) => {
        if (data.action === "edit") {
            this.toggleModalUpdate()
        } else if (data.action === "delete") {
            this.toggleModalDelete();
        }
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




    setST = () => {
        this.setState({ selectedItems: [] })
    }

    handleLogout = () => {
        this.props.logoutUser(this.props.history);
    };

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


        return this.state.isLoading ? (
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
                                heading={valueNiveau.value != "*" && items.length > 0 ? "Liste des domaines de niveau " + valueNiveau.label : valueNiveau.value === "*" && items.length > 0 ? "Tous les domaines" : "Aucun domaine"}
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
                            handleLogout={this.handleLogout}

                        />
                        <UpdateModal
                            modalOpen={modalOpenUpdate}
                            toggleModal={this.toggleModalUpdate}
                            callback={() => this.dataListRender()}
                            domaine={domaine}
                            setST={this.setST}
                            niveau={valueNiveau.value}
                            handleLogout={this.handleLogout}

                        />
                        <DeleteModal
                            modalOpen={modalOpenDelete}
                            toggleModal={this.toggleModalDelete}
                            callback={() => this.dataListRender()}
                            domaine={domaine}
                            selectedItems={this.state.selectedItems}
                            setST={this.setST}
                            handleLogout={this.handleLogout}

                        />
                        <Row>


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
                                        handleLogout={this.handleLogout}


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
                                    selectedItems={this.state.selectedItems}
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

const mapStateToProps = ({ menu }) => {
    const { containerClassnames } = menu;
    return { containerClassnames };
};

export default withRouter(connect(mapStateToProps, { logoutUser })(gst_domaine));

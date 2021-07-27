import React, { Component, Fragment } from "react";
import { Row, Card, CardBody, CardTitle, Table } from "reactstrap";
import axios from "axios";
import Select from "react-select";
import DataListView from "../../../containers/ecole/gestion_admins/DataListView";
import Pagination from "../../../containers/Pagination";
import ContextMenuContainer from "../../../containers/ContextMenuContainer";
import ListPageHeading from "../../../containers/ecole/gestion_admins/ListPageHeading";
import AddNewModal from "../../../containers/ecole/gestion_admins/AddNewModal";
import UpdateModal from "../../../containers/ecole/gestion_admins/UpdateModal";
import DeleteModal from "../../../containers/ecole/gestion_admins/DeleteModal";
import Modal from "../../../containers/ecole/gestion_admins/Modal";
import { roles, options } from "../../../constants/defaultValues"
import {
    logoutUser,
} from "../../../redux/actions";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
function collect(props) {
    return { data: props.data };
}

class gst_admins extends Component {
    constructor(props) {
        super(props);

        this.state = {


            displayMode: "list",

            selectedPageSize: 10,
            orderOptions: [
                { column: "id", label: "Identifiant" },
                { column: "nomPrenom", label: "Nom complet" },
                { column: "dateCreation", label: "Date de création" }
            ],
            pageSizes: [1, 2, 5, 10, 20, 30, 50, 100],



            selectedOrderOption: { column: "nomPrenom", label: "Nom complet" },

            modalOpen: false,
            modalOpenUpdate: false,
            modalOpenDelete: false,
            currentPage: 1,
            totalItemCount: 0,
            totalPage: 1,
            search: "",
            selectedItems: [],

            isLoading: true,
            admin: [],
            valueRole: { label: "Tous les administrateurs", value: "*" },
            items: [],
            modalOpenVoir: false

        };
    }
    componentWillMount() {


        try {
            axios
                .get("http://api.onyx.inedit-gd.tn/admins/get/" + parseInt(localStorage.getItem('user_id')))
                .then(res => res.data)
                .then(data => {
                    if (data.roles.includes('ROLE_GESTION_ADMINISTRATEUR'))
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
    };
    toggleModalUpdate = (admin) => {
        if (admin)
            this.setState({
                modalOpenUpdate: !this.state.modalOpenUpdate,
                admin
            });
        else
            this.setState({
                modalOpenUpdate: !this.state.modalOpenUpdate,

            });
    };
    toggleModalDelete = (admin) => {
        if (admin)
            this.setState({
                modalOpenDelete: !this.state.modalOpenDelete,
                admin
            });
        else
            this.setState({
                modalOpenDelete: !this.state.modalOpenDelete,

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

    onCheckItem = (id) => {



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
            search
        } = this.state;


        var query = "http://api.onyx.inedit-gd.tn/admins/getAll?";
        query += "count=" + selectedPageSize
        query += "&page=" + currentPage
        query += "&order=" + selectedOrderOption.column
        query += "&search=" + search



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
            return error;
        }
    }



    onContextMenuClick = (e, data, target) => {
        if (data.action === "details") {
            this.toggleModalVoir()
        } else if (data.action === "edit") {
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


    setAdmin = admin => {
        this.setState({ admin });
    };


    onSearchKey = e => {
        this.setState(
            {
                search: e.target.value.toLowerCase()
            },
            () => this.dataListRender()
        );

    };

    handleChangeRole = value => {

        this.setState({
            valueRole: value,
            selectedItems: []
        });
    };


    toggleModalVoir = () => {
        // if (admin)
        this.setState({
            modalOpenVoir: !this.state.modalOpenVoir,
            selectedItems: [],

        });


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
            selectedItems,
            orderOptions,
            pageSizes,
            modalOpen,
            modalOpenUpdate,
            modalOpenDelete,
            admin,
            modalOpenVoir,
            valueRole,
        } = this.state;
        const { match } = this.props;
        const startIndex = (currentPage - 1) * selectedPageSize;
        const endIndex = currentPage * selectedPageSize;


        return this.state.isLoading ? (
            <div className="loading" />
        ) : (
                <Fragment>

                    <label>
                        <h3>Rôle administrateur : </h3>
                    </label>
                    <Select
                        onChange={this.handleChangeRole}
                        value={valueRole}
                        options={options}
                        className="react-select"
                        placeholder="Sélectionner un rôle..."
                        classNamePrefix="react-select"
                        name="form-field-name"
                        required

                    />


                    <div className="disable-text-selection">
                        <br></br>
                        <br></br>

                        <ListPageHeading
                            heading={items.length > 0 && valueRole.value === "*" ? "Tous les administrateurs" : items.length > 0 && valueRole.value != "*" ? "Liste des administrateurs qui ont le" + valueRole.label : "Aucun administrateur"}
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
                            itemsLength={items ? items.length : 0}
                            onSearchKey={this.onSearchKey}
                            orderOptions={orderOptions}
                            pageSizes={pageSizes}
                            toggleModal={this.toggleModal}
                            toggleModalUpdate={this.toggleModalUpdate}
                            toggleModalDelete={this.toggleModalDelete}
                            toggleModalVoir={this.toggleModalVoir}
                            role={valueRole.value}
                            admin={this.state.admin}

                        />

                        <UpdateModal
                            modalOpen={modalOpenUpdate}
                            toggleModal={this.toggleModalUpdate}
                            admin={this.state.admin}
                            roles={roles}
                            callback={() => this.dataListRender()}
                            setST={this.setST}
                            handleLogout={this.handleLogout}

                        />


                        <DeleteModal
                            modalOpen={modalOpenDelete}
                            toggleModal={this.toggleModalDelete}
                            callback={() => this.dataListRender()}
                            setST={this.setST}
                            admin={this.state.admin}
                            selectedItems={this.state.selectedItems}
                            handleLogout={this.handleLogout}

                        />

                        <AddNewModal
                            modalOpen={modalOpen}
                            toggleModal={this.toggleModal}
                            callback={() => this.dataListRender()}
                            handleLogout={this.handleLogout}

                        />

                        <Row>


                            {this.state.items.map((admin, i) => {
                                return (

                                    <DataListView
                                        key={admin.id}
                                        admin={admin}
                                        isSelect={this.state.selectedItems.includes(admin.id)}
                                        onCheckItem={this.onCheckItem}
                                        collect={collect}
                                        setAdmin={this.setAdmin}
                                        toggleModalVoir={this.toggleModalVoir}
                                        selectedItems={this.state.selectedItems}
                                        role={this.state.valueRole && this.state.valueRole.value}
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
                            {valueRole.value === '*' &&
                                this.state.admin.roles &&
                                this.state.admin.roles.trim().split(' ').filter(x => x.localeCompare('ROLE_GESTION_ADMINISTRATEUR') != 0).length < 5 &&
                                <ContextMenuContainer
                                    onContextMenuClick={this.onContextMenuClick}
                                    onContextMenu={this.onContextMenu}
                                    toggleModalUpdate={this.toggleModalUpdate}
                                    toggleModalDelete={this.toggleModalDelete}
                                    toggleModalVoir={this.toggleModalVoir}
                                    selectedItems={this.state.selectedItems}
                                    admin={this.state.admin}


                                />

                            }
                            <Modal
                                modalOpenVoir={modalOpenVoir}
                                toggleModalVoir={this.toggleModalVoir}
                                admin={this.state.admin}

                            />
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

export default withRouter(connect(mapStateToProps, { logoutUser })(gst_admins));
// export default gst_admins;

import React, { Component, Fragment } from "react";
import { Row, Card, CardBody, CardTitle, Table } from "reactstrap";
// import "./table.css"
import axios from "axios";
import Select from "react-select";
import DataListView from "../../../containers/ecole/gestion_admins/DataListView";
import Pagination from "../../../containers/ecole/gestion_admins/Pagination";
import ContextMenuContainer from "../../../containers/ecole/gestion_admins/ContextMenuContainer";
import ListPageHeading from "../../../containers/ecole/gestion_admins/ListPageHeading";
import AddNewModal from "../../../containers/ecole/gestion_admins/AddNewModal";
import UpdateModal from "../../../containers/ecole/gestion_admins/UpdateModal";
import DeleteModal from "../../../containers/ecole/gestion_admins/DeleteModal";
import Modal from "../../../containers/ecole/gestion_admins/Modal";
import { roles, options } from "../../../constants/defaultValues"

function collect(props) {
    return { data: props.data };
}

class gst_admins extends Component {
    constructor(props) {
        super(props);

        this.state = {
            chercher: "",

            displayMode: "list",

            selectedPageSize: 10,
            orderOptions: [
                { column: "id", label: "Identifiant" },
                { column: "nomPrenom", label: "Nom complet" },
                { column: "dateCreation", label: "Date de création" }
            ],
            pageSizes: [1, 2, 5, 10, 20, 30, 50, 100],



            selectedOrderOption: { column: "nomPrenom", label: "Nom complet" },
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
            admin: [],
            valueRole: { label: "TOUS LES ADMINISTRATEURS", value: "*" },
            items: [],
            modalOpenVoir: false

        };
    }
    componentWillMount() {
        this.dataListRender();

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


    setAdmin = admin => {
        this.setState({ admin });
    };


    handleChangeRole = value => {

        this.setState({
            valueRole: value,
            selectedItems: []
        });
    };

    chercher = (event) => {
        this.setState({ search: event.target.value }, this.dataListRender)
    }
    toggleModalVoir = (admin) => {
        // if (admin)
        this.setState({
            modalOpenVoir: !this.state.modalOpenVoir,
            selectedItems: [],
            admin
        });
        // else
        //     this.setState({
        //         modalOpenVoir: !this.state.modalOpenVoir,
        //         selectedItems: [],
        //     });

    };
    setST = (value) => {
        this.setState({ selectedItems: value })
    }
    render() {

        console.log(this.state.admin, ' adddd')

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
            search,
            modalOpenVoir,
            valueRole,
        } = this.state;
        const { match } = this.props;
        const startIndex = (currentPage - 1) * selectedPageSize;
        const endIndex = currentPage * selectedPageSize;
        const id = localStorage.getItem('user_id');


        return this.state.isLoading ? (
            <div className="loading" />
        ) : (
                <Fragment>

                    <label>
                        <h3>Affichage : </h3>
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
                            heading={valueRole.value === "*" ? <>Tous les administrateurs</> : <>Liste des administrateurs qui ont le {valueRole.label}</>}
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
                        />


                        <DeleteModal
                            modalOpen={modalOpenDelete}
                            toggleModal={this.toggleModalDelete}
                            callback={() => this.dataListRender()}
                            setST={this.setST}
                            admin={this.state.admin}
                            selectedItems={this.state.selectedItems}
                        />

                        <AddNewModal
                            modalOpen={modalOpen}
                            toggleModal={this.toggleModal}
                            callback={() => this.dataListRender()}
                            setST={this.setST}
                        />

                        <Row>
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
                                    selectedItems={this.state.selectedItems.length == 1}
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
export default gst_admins;

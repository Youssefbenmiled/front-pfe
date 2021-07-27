import React, { Component, Fragment } from "react";
import { Row, Label } from "reactstrap";

import axios from "axios";
import Select from "react-select";
import DataListView from "../../../../containers/ecole/evenements/DataListView";
import Pagination from "../../../../containers/Pagination";
import ContextMenuContainer from "../../../../containers/ContextMenuContainer";
import ListPageHeading from "../../../../containers/ecole/evenements/ListPageHeading";
import AddNewModal from "../../../../containers/ecole/evenements/AddNewModal";
import UpdateModal from "../../../../containers/ecole/evenements/UpdateModal";
import DeleteModal from "../../../../containers/ecole/evenements/DeleteModal";
import Modal from "../../../../containers/ecole/evenements/Modal";
import {
    logoutUser,
} from "../../../../redux/actions";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

function collect(props) {
    return { data: props.data };
}
class event extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            evenement: [],


            displayMode: "list",

            selectedPageSize: 10,
            orderOptions: [
                { column: "id", label: "Identifiant" },
                { column: "dateDebut", label: "Date début" },
                { column: "dateFin", label: "Date fin" },
                { column: "type", label: "Type" },

            ],
            orderOptions2: [
                { column: "id", label: "Identifiant" },
                { column: "dateDebut", label: "Date début" },
                { column: "dateFin", label: "Date fin" },

            ],
            pageSizes: [1, 2, 5, 10, 20, 30, 50, 100],



            selectedOrderOption: { column: "dateFin", label: "Date fin" },
            dropdownSplitOpen: false,
            modalOpen: false,
            currentPage: 1,
            totalItemCount: 0,
            totalPage: 3,
            search: "",
            selectedItems: [],

            isLoading: true,
            modalOpen: false,
            modalOpenUpdate: false,
            modalOpenDelete: false,
            valueType: { label: 'Tous les événements', value: '*' },
            modalOpenVoir: false,

        };
    }
    componentWillMount() {
        try {
            axios
                .get("http://api.onyx.inedit-gd.tn/admins/get/" + parseInt(localStorage.getItem('user_id')))
                .then(res => res.data)
                .then(data => {
                    if (data.roles.includes('ROLE_ORGANISATION'))
                        this.dataListRender();
                    else
                        this.props.history.push('/ecole/accueil')
                });
        } catch (error) {
            return error;
        }

    }



    changeOrderBy = column => {
        if (this.state.valueType.value === '*')
            this.setState(
                {
                    selectedOrderOption: this.state.orderOptions.find(
                        x => x.column === column
                    )
                },
                () => this.dataListRender()
            );
        else
            this.setState(
                {
                    selectedOrderOption: this.state.orderOptions2.find(
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
    dataListRender() {
        const {
            selectedPageSize,
            currentPage,
            selectedOrderOption,
            search,
            valueType
        } = this.state;


        var query = "http://api.onyx.inedit-gd.tn/event/getAll?";
        query += "count=" + selectedPageSize
        query += "&page=" + currentPage
        query += "&order=" + selectedOrderOption.column
        query += "&search=" + search;

        if (valueType && valueType.value != "*") {
            query += "&type=" + valueType.value
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
    toggleModal = () => {
        this.setState({
            modalOpen: !this.state.modalOpen
        });
    };

    setEvent = evenement => {
        this.setState({ evenement });
    };

    handleChangeType = value => {
        this.setState({
            valueType: value,
            selectedItems: [],

        }, this.dataListRender);
    };





    toggleModalVoir = () => {
        this.setState({
            modalOpenVoir: !this.state.modalOpenVoir
        });

    };

    setST = () => {
        this.setState({ selectedItems: [] })
    }
    onSearchKey = e => {
        this.setState(
            {
                search: e.target.value.toLowerCase()
            },
            () => this.dataListRender()
        );

    };
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
            orderOptions2,
            pageSizes,
            modalOpen,
            modalOpenUpdate,
            modalOpenDelete,
            modalOpenVoir,
            valueType,
            search,
            evenement,
        } = this.state;
        const types = [
            { label: 'Tous les événements', value: '*' },
            { label: 'événements publics', value: 'public' },
            { label: 'événements privés', value: 'prive' }

        ];

        const { match } = this.props;
        const startIndex = (currentPage - 1) * selectedPageSize;
        const endIndex = currentPage * selectedPageSize;

        return this.state.isLoading ? (
            <div className="loading" />
        ) : (
                <Fragment>
                    <label>
                        <h3>Type événement :</h3>
                    </label>
                    <Select
                        onChange={this.handleChangeType}
                        value={valueType}
                        options={types}
                        className="react-select"
                        classNamePrefix="react-select"
                        name="form-field-name"
                        required
                    />

                    <div className="disable-text-selection">
                        <br></br>
                        <ListPageHeading
                            heading={valueType.value === '*' && items.length > 0 ? "Tous les événements" : items.length > 0 && valueType.value != "*" ? "Tous les " + valueType.label : "Aucun événement"}
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
                            orderOptions={valueType.value === '*' ? orderOptions : orderOptions2}
                            pageSizes={pageSizes}
                            toggleModal={this.toggleModal}
                            toggleModalVoir={this.toggleModalVoir}
                            toggleModalUpdate={this.toggleModalUpdate}
                            toggleModalDelete={this.toggleModalDelete}
                            type={valueType && valueType.value}
                        />


                        <UpdateModal
                            modalOpen={modalOpenUpdate}
                            toggleModal={this.toggleModalUpdate}
                            selectedItems={this.state.selectedItems}
                            evenement={evenement}
                            setST={this.setST}
                            callback={() => this.dataListRender()}
                            handleLogout={this.handleLogout}

                        />


                        <DeleteModal
                            modalOpen={modalOpenDelete}
                            toggleModal={this.toggleModalDelete}
                            evenement={evenement}
                            setST={this.setST}
                            selectedItems={this.state.selectedItems}
                            callback={() => this.dataListRender()}
                            handleLogout={this.handleLogout}

                        />
                        <AddNewModal
                            modalOpen={modalOpen}
                            toggleModal={this.toggleModal}
                            callback={() => this.dataListRender()}
                            handleLogout={this.handleLogout}

                        />
                        <Row>



                            {this.state.items.map((evenement, i) => {
                                return (
                                    <DataListView
                                        key={evenement.id}
                                        evenement={evenement}
                                        isSelect={this.state.selectedItems.includes(evenement.id)}
                                        onCheckItem={this.onCheckItem}
                                        setEvent={this.setEvent}
                                        collect={collect}
                                        toggleModalVoir={this.toggleModalVoir}
                                        type={valueType && valueType.value}
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
                            {valueType.value === "*" &&
                                <ContextMenuContainer
                                    onContextMenuClick={this.onContextMenuClick}
                                    onContextMenu={this.onContextMenu}
                                    toggleModalUpdate={this.toggleModalUpdate}
                                    toggleModalDelete={this.toggleModalDelete}
                                    toggleModalVoir={this.toggleModalVoir}
                                    selectedItems={this.state.selectedItems}
                                />
                            }

                            <Modal
                                modalOpenVoir={modalOpenVoir}
                                toggleModalVoir={this.toggleModalVoir}
                                evenement={evenement}
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

export default withRouter(connect(mapStateToProps, { logoutUser })(event));
// export default event;

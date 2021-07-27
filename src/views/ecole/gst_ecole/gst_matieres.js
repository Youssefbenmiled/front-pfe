import React, { Component, Fragment } from "react";
import { Row, Card, CardBody, CardTitle, Table } from "reactstrap";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
// import "./table.css";
import axios from "axios";
import { levelsmat } from "../../../constants/defaultValues";
import Select from "react-select";

import DataListView from "../../../containers/ecole/gestion_matieres/DataListView";
import Pagination from "../../../containers/Pagination";
import ContextMenuContainer from "../../../containers/ecole/gestion_matieres/ContextMenuContainer";
import ListPageHeading from "../../../containers/ecole/gestion_matieres/ListPageHeading";
import AddNewModal from "../../../containers/ecole/gestion_matieres/AddNewModal";
import UpdateModal from "../../../containers/ecole/gestion_matieres/UpdateModal";
import DeleteModal from "../../../containers/ecole/gestion_matieres/DeleteModal";
import {
    logoutUser,
} from "../../../redux/actions";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
function collect(props) {
    return { data: props.data };
}
class gst_matiere extends Component {
    constructor(props) {
        super(props);

        this.state = {

            displayMode: "list",

            selectedPageSize: 10,

            orderOptions: [
                { column: "id", label: "Identifiant" },
                { column: "niveau", label: "Niveau" },
                { column: "nomD", label: "Domaine" },
                { column: "nomM", label: "Matiére" },
                { column: "coeficient", label: "Coefficient" }
            ],

            orderOptions2: [
                { column: "id", label: "Identifiant" },
                { column: "nomM", label: "Matiére" },
                { column: "coeficient", label: "Coefficient" }
            ],


            pageSizes: [1, 2, 5, 10, 20, 30, 50, 100],
            selectedOrderOption: { column: "niveau", label: "Niveau" },
            selectedOrderOption2: { column: "nomM", label: "Matiére" },


            modalOpen: false,
            modalOpenUpdate: false,
            modalOpenDelete: false,


            currentPage: 1,
            totalItemCount: 0,
            totalPage: 1,
            search: "",
            selectedItems: [],

            isLoading: false,
            items: [],
            valueNiveau: { label: "Toutes les matiéres (Tous les domaines)", value: "*" },

            valueD: null,
            items: [],
            Mat: [],
            matieret: [],
            domainet: []


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
    setMat = Mat => {
        this.setState({ Mat });
    };
    setST = () => {
        this.setState({ selectedItems: [] })
    }
    dataListRender() {
        const {
            selectedPageSize,
            currentPage,
            selectedOrderOption,
            selectedOrderOption2,
            search,
            valueNiveau,
            valueD
        } = this.state;

        if (!valueD && valueNiveau.value != "*") {
            this.setState({ items: [] })
            return;
        }



        var query = "http://api.onyx.inedit-gd.tn/matiere/getAll?";
        query += "count=" + selectedPageSize
        query += "&page=" + currentPage
        query += "&order=" + selectedOrderOption.column
        query += "&search=" + search;

        if (valueD && valueNiveau.value != "*") {
            query = "http://api.onyx.inedit-gd.tn/matiere/getM/" + valueD.label + "/" + parseInt(valueNiveau.value);
            query += "?count=" + selectedPageSize
            query += "&order=" + selectedOrderOption2.column
            query += "&page=" + currentPage

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
                        isLoading: true
                    });
                }, error => {
                    return error;
                });
        }
        catch (error) {
            return error;
        }
    }

    getDomaineParNiveau(niveau) {
        try {
            axios
                .get("http://api.onyx.inedit-gd.tn/domaine/niveau/" + niveau)
                .then(res => {
                    return res.data;
                })
                .then(data => {
                    this.setState({

                        domainet: data,
                        selectedItems: [],
                        isLoading: true

                    });
                }, error => {

                    return error;
                });
        }
        catch (error) {
            return error;
        }

    }

    handleChangeNiveau = value => {
        if (value.value != "*") {
            this.getDomaineParNiveau(value.value)
        }
        this.setState({
            valueNiveau: value,
            valueD: null,
            matieret: []
        }, this.dataListRender);

    };


    handleChangeD = value => {
        this.setState({
            valueD: value,
        }, this.dataListRender);

    };

    handleLogout = () => {
        this.props.logoutUser(this.props.history);
    };




    render() {

        const domainet = this.state.domainet.map((d, i) => {
            return { label: d.nom, value: d.id };
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
            modalOpenUpdate,
            modalOpenDelete,
            search,
            valueNiveau,
            valueD
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
                        options={levelsmat}
                        className="react-select"
                        placeholder="Sélectionner le niveau ..."
                        classNamePrefix="react-select"
                        name="form-field-name"
                        required
                    />

                    {valueNiveau.value != "*" &&
                        <>
                            <br></br>
                            <label>
                                <h3>Domaine :</h3>
                            </label>
                            <Select
                                onChange={this.handleChangeD}
                                value={valueD}
                                options={domainet}
                                className="react-select"
                                placeholder="Sélectionner le domaine..."
                                classNamePrefix="react-select"
                                name="form-field-name"
                                required
                            />
                        </>
                    }
                    <div className="disable-text-selection">

                        {valueD || valueNiveau.value == "*" ?

                            <ListPageHeading
                                heading={valueNiveau.value == "*" && items.length > 0 ? "Toutes les matiéres " : valueNiveau.value != "*" && items.length > 0 ? "Les matiéres de niveau " + valueNiveau.value + " et domaine " + valueD.label + " " : "Aucune matiére"}
                                displayMode={displayMode}
                                changeDisplayMode={this.changeDisplayMode}
                                changeOrderBy={this.changeOrderBy}
                                changePageSize={this.changePageSize}
                                selectedPageSize={selectedPageSize}
                                totalItemCount={totalItemCount}
                                selectedOrderOption={valueNiveau.value != "*" ? selectedOrderOption2 : selectedOrderOption}
                                match={match}
                                startIndex={startIndex}
                                endIndex={endIndex}
                                selectedItemsLength={selectedItems ? selectedItems.length : 0}
                                itemsLength={items ? items.length : 0}
                                onSearchKey={this.onSearchKey}
                                orderOptions={valueNiveau.value == "*" ? orderOptions : orderOptions2}
                                pageSizes={pageSizes}
                                toggleModal={this.toggleModal}
                                toggleModalUpdate={this.toggleModalUpdate}
                                toggleModalDelete={this.toggleModalDelete}
                                domaine={this.state.valueD ? this.state.valueD : null}
                                niveau={valueNiveau.value == "*" && valueNiveau.value}
                            />
                            : null
                        }

                        <AddNewModal
                            modalOpen={modalOpen}
                            toggleModal={this.toggleModal}
                            domaine={this.state.valueD && this.state.valueD}
                            niveau={this.state.valueNiveau.niveau != "*" && this.state.valueNiveau}
                            callback={() => this.dataListRender()}
                            handleLogout={this.handleLogout}



                        />
                        <UpdateModal
                            modalOpen={modalOpenUpdate}
                            toggleModal={this.toggleModalUpdate}
                            callback={() => this.dataListRender()}
                            mat={this.state.Mat}
                            setST={this.setST}
                            domaine={this.state.valueD && this.state.valueD}
                            handleLogout={this.handleLogout}

                        />
                        <DeleteModal
                            modalOpen={modalOpenDelete}
                            toggleModal={this.toggleModalDelete}
                            callback={() => this.dataListRender()}
                            mat={this.state.Mat}
                            selectedItems={this.state.selectedItems}
                            domaine={this.state.valueD && this.state.valueD}
                            niveau={this.state.valueNiveau && this.state.valueNiveau}
                            setST={this.setST}
                            handleLogout={this.handleLogout}

                        />
                        <Row>


                            {this.state.items.map((mat, i) => {
                                return (


                                    <DataListView
                                        key={mat.id}
                                        mat={mat}
                                        isSelect={this.state.selectedItems.includes(mat.id)}
                                        onCheckItem={this.onCheckItem}
                                        setMat={this.setMat}
                                        collect={collect}
                                        domaine={valueD ? valueD : null}
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

                            {valueD &&
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

export default withRouter(connect(mapStateToProps, { logoutUser })(gst_matiere));
// export default gst_matiere;

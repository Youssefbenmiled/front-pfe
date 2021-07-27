import React, { Component, Fragment } from "react";
import { Row } from "reactstrap";
import axios from "axios";
import Select from "react-select";
import DataListView from "../../../containers/ecole/annee/DataListView";
import Pagination from "../../../containers/Pagination";
import ListPageHeading from "../../../containers/ecole/annee/ListPageHeading";
import AddNewModal from "../../../containers/ecole/annee/AddNewModal";
import {
    logoutUser,
} from "../../../redux/actions";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";




class annee extends Component {
    constructor(props) {
        super(props);

        this.state = {
            displayMode: "list",

            selectedPageSize: 10,
            orderOptions: [
                { column: "id", label: "Identifiant" },
                { column: "desc", label: "descendant" },
                { column: "asc", label: "ascendant " }
            ],
            pageSizes: [1, 2, 5, 10, 20, 30, 50, 100],



            selectedOrderOption: { column: "desc", label: "descendant" },

            modalOpen: false,

            currentPage: 1,
            totalItemCount: 0,
            totalPage: 1,
            selectedItems: [],

            isLoading: true,
            items: [],
            year: []

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


        if (selectedItems.length > 0) {
            selectedItems = selectedItems.filter(x => x < 0);
            this.setState({
                selectedItems
            });
            return;
        }

        selectedItems.push(id);



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

    setYear = (year) => {
        this.setState({ year })
    }


    setST = (value) => {
        this.setState({ selectedItems: value })
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

        } = this.state;
        const { match } = this.props;
        const startIndex = (currentPage - 1) * selectedPageSize;
        const endIndex = currentPage * selectedPageSize;
        const id = localStorage.getItem('user_id');


        return this.state.isLoading ? (
            <div className="loading" />
        ) : (
                <Fragment>




                    <div className="disable-text-selection">
                        <br></br>
                        <br></br>

                        <ListPageHeading
                            heading={"Année scolaire"}
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
                            selectedItems={this.state.selectedItems.length}
                            admin={this.state.admin}

                        />



                        <AddNewModal
                            modalOpen={modalOpen}
                            toggleModal={this.toggleModal}
                            callback={() => this.dataListRender()}
                            handleLogout={this.handleLogout}

                        />

                        <Row>


                            {this.state.items.map((year, i) => {
                                return (

                                    <DataListView
                                        key={year.id}
                                        year={year}
                                        isSelect={this.state.selectedItems.includes(year.id)}
                                        onCheckItem={this.onCheckItem}
                                        setYear={this.setYear}
                                        toggleModalVoir={this.toggleModalVoir}
                                        selectedItems={this.state.selectedItems}
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

export default withRouter(connect(mapStateToProps, { logoutUser })(annee));

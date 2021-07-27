import React, { Component, Fragment } from "react";
import { Row, Label } from "reactstrap";
import axios from "axios";
import Select from "react-select";
import DataListView from "../../../containers/ecole/gst_abs/DataListView";
import Pagination from "../../../containers/Pagination";
import ListPageHeading from "../../../containers/ecole/gst_abs/ListPageHeading";
import Modal from "../../../containers/ecole/gst_abs/Modal";
// let nb = (new Date().getMonth());
// let ochhra = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
// let chhar = ochhra[nb];

import {
    logoutUser,
} from "../../../redux/actions";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

class gst_absence extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            // valueNiveau: { label: "Toutes les classes", value: '*' },
            // valueClasse: null,
            // valueEns: null,
            // profet: [],
            displayMode: "list",
            // classet: [],
            // valueM: null,
            selectedPageSize: 10,
            orderOptions: [
                { column: "dateB", label: "Dates proches" },
                { column: "dateA", label: "Dates anciennes" },
            ],

            pageSizes: [1, 2, 5, 10, 20, 30, 50, 100],


            eleves: [],

            selectedOrderOption: { column: "dateB", label: "Dates proches" },

            currentPage: 1,
            totalItemCount: 0,
            totalPage: 3,

            isLoading: true,
            abs: [],
            modalOpenVoir: false,

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




    setAbs = abs => {
        this.setState({ abs })
    }

    dataListRender() {
        const {
            selectedPageSize,
            currentPage,
            selectedOrderOption,

        } = this.state;


        var query = "http://api.onyx.inedit-gd.tn/feuille/presence/getAll?";
        query += "count=" + selectedPageSize
        query += "&page=" + currentPage
        query += "&order=" + selectedOrderOption.column



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






    toggleModalVoir = (idc) => {
        if (idc)
            this.getEleves(idc)
        this.setState({
            modalOpenVoir: !this.state.modalOpenVoir
        });
    };

    getEleves(idClasse) {


        var query = "http://api.onyx.inedit-gd.tn/eleve/getAll?classe=" + idClasse;

        try {
            axios
                .get(query)
                .then(res => {
                    return res.data;
                })
                .then(data => {
                    this.setState({
                        eleves: data.list,
                    });
                }, error => {
                    return error;
                });
        }
        catch (error) {
            return error;
        }
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
            orderOptions,
            pageSizes,
            modalOpenVoir,
        } = this.state;
        // const ens =
        //     this.state.profet.map((ens, i) => {
        //         return { label: ens.nom + " " + ens.prenom, value: ens.id };
        //     })
        // const cs = classet.map(classe => {
        //     return { label: classe.niveau + " " + classe.Nom, value: classe.id }
        // })

        const { match } = this.props;
        const startIndex = (currentPage - 1) * selectedPageSize;
        const endIndex = currentPage * selectedPageSize;

        return this.state.isLoading ? (
            <div className="loading" />
        ) : (
                <Fragment>


                    <div className="disable-text-selection">
                        <br></br>
                        <ListPageHeading
                            heading={items.length > 0 ? "Toutes les feuilles d'appel" : "Aucune feuille d'appel"}
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
                            itemsLength={items ? items.length : 0}
                            orderOptions={orderOptions}
                            pageSizes={pageSizes}

                        />





                        <Row>

                            {this.state.items.map((abs, i) => {
                                return (
                                    <DataListView
                                        key={abs.id}
                                        abs={abs}
                                        setAbs={this.setAbs}
                                        toggleModalVoir={this.toggleModalVoir}
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
                            <Modal
                                modalOpenVoir={modalOpenVoir}
                                toggleModalVoir={this.toggleModalVoir}
                                abs={this.state.abs}
                                eleves={this.state.eleves && this.state.eleves}
                                handleLogout={this.handleLogout}

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

export default withRouter(connect(mapStateToProps, { logoutUser })(gst_absence));
// export default gst_absence;

// profet() {

//     var query = "http://api.onyx.inedit-gd.tn/enseignant/getAll";


//     try {
//         axios
//             .get(query)
//             .then(res => {
//                 return res.data;
//             })
//             .then(data => {

//                 this.setState({
//                     profet: data.list,
//                 });
//             }, error => {
//                 return error;
//             });
//     }
//     catch (error) {
//         return error;
//     }
// }

// getClasses(idc) {
//     var query = "http://api.onyx.inedit-gd.tn/classe/getAll?ids=" + idc;
//     try {
//         axios
//             .get(query)
//             .then(res => res.data)
//             .then(data => {
//                 this.setState({
//                     classet: data.list,
//                 });
//             });
//     } catch (error) {
//         return error;
//     }
// }
// handleChangeNiveau = value => {
//     this.setState({
//         valueNiveau: value,
//         valueEns: null,
//         valueClasse: null,
//         selectedItems: [],
//         profet: [],
//         classet: []
//     },
//         //, ()=>this.dataListRender(), 
//         () => this.getClasses(value.value));

// };
// handleChangeClasse = value => {
//     this.setState(
//         {
//             valueClasse: value,
//             valueEns: null,
//             profet: [],

//         },
//         () => this.profet(),
//         this.getEleves(value.value),


//     );

// };

// getEleves(idClasse) {

//     var query = "http://api.onyx.inedit-gd.tn/eleve/getAll?classe=" + idClasse;

//     try {
//         axios
//             .get(query)
//             .then(res => {
//                 return res.data;
//             })
//             .then(data => {
//                 this.setState({
//                     eleves: data.list,
//                 });
//             }, error => {
//                 return error;
//             });
//     }
//     catch (error) {
//         return error;
//     }
// }


// handleChangeEns = value => {
//     this.setState({
//         valueEns: value,
//         profet: [],
//     },
//         () => this.dataListRender()
//     );

// };

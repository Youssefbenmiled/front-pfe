import React, { Component, Fragment } from "react";
import { Row, Label } from "reactstrap";
import axios from "axios";
import Select from "react-select";
// import "./table.css"
import DataListView from "../../../containers/ecole/gst_abs/DataListView";
import Pagination from "../../../containers/ecole/gst_abs/Pagination";
import ListPageHeading from "../../../containers/ecole/gst_abs/ListPageHeading";
import Modal from "../../../containers/ecole/gst_abs/Modal";
import { levelscls } from "../../../constants/defaultValues";
let nb = (new Date().getMonth());
let ochhra = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
let chhar = ochhra[nb];

class gst_absence extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            valueNiveau: { label: "Toutes les classes", value: '*' },
            valueClasse: null,
            valueEns: null,
            profet: [],
            displayMode: "list",
            classet: [],
            valueM: null,
            selectedPageSize: 10,
            orderOptions: [
                { column: "id", label: "Identifiant" },
                { column: "dateEnvoi", label: "Date d'envoi" },
            ],
            pageSizes: [1, 2, 5, 10, 20, 30, 50, 100],

            orderMois: [
                { column: "semestre", label: "Trimestre" },
                { column: "dateEnvoi", label: "Date d'envoi" },
                { column: "1", label: "Janvier" },
                { column: "2", label: "Février" },
                { column: "3", label: "Mars" },
                { column: "4", label: "Avril" },
                { column: "5", label: "Mai" },
                { column: "6", label: "Juin" },
                { column: "7", label: "Juillet" },
                { column: "8", label: "Août" },
                { column: "9", label: "Septembre" },
                { column: "10", label: "Octobre" },
                { column: "11", label: "Novembre" },
                { column: "12", label: "Décembre" },

            ],
            eleves: [],
            selectedOrderMois: { column: "", label: chhar },

            selectedOrderOption: { column: "dateEnvoi", label: "Date d'envoi" },
            dropdownSplitOpen: false,
            currentPage: 1,
            totalItemCount: 0,
            totalPage: 3,
            search: "",
            isLoading: true,
            abs: [],
            modalOpenVoir: false,

        };
    }
    componentWillMount() {
        this.dataListRender();
        this.profet();
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
    changeOrderMois = column => {
        this.setState(
            {
                selectedOrderMois: this.state.orderMois.find(
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

    getIndex(value, arr, prop) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i][prop] === value) {
                return i;
            }
        }
        return -1;
    }


    setAbs = abs => {
        this.setState({ abs })
    }

    dataListRender() {
        const {
            selectedPageSize,
            currentPage,
            selectedOrderOption,
            search,

        } = this.state;


        var query = "http://api.onyx.inedit-gd.tn/classe/getAll?";
        query += "count=" + selectedPageSize
        query += "&page=" + currentPage
        query += "&order=" + selectedOrderOption.column
        query += "&search=" + search;



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
                    console.log(error)
                });
        }
        catch (error) {
            console.log("failed" + error)
        }
    }




    chercher = (event) => {
        this.setState({ search: event.target.value }, this.dataListRender)
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
                    console.log(error)
                });
        }
        catch (error) {
            console.log("failed" + error)
        }
    }


    profet() {

        var query = "http://api.onyx.inedit-gd.tn/enseignant/getAll";


        try {
            axios
                .get(query)
                .then(res => {
                    return res.data;
                })
                .then(data => {

                    this.setState({
                        profet: data.list,
                    });
                }, error => {
                    console.log(error)
                });
        }
        catch (error) {
            console.log("failed" + error)
        }
    }

    getClasses(idc) {
        var query = "http://api.onyx.inedit-gd.tn/classe/getAll?ids=" + idc;
        try {
            axios
                .get(query)
                .then(res => res.data)
                .then(data => {
                    this.setState({
                        classet: data.list,
                    });
                });
        } catch (error) {
            console.log("failed" + error)
        }
    }
    handleChangeNiveau = value => {
        this.setState({
            valueNiveau: value,
            valueEns: null,
            valueClasse: null,
            selectedItems: [],
            profet: [],
            classet: []
        },
            //, ()=>this.dataListRender(), 
            () => this.getClasses(value.value));

    };
    handleChangeClasse = value => {
        this.setState(
            {
                valueClasse: value,
                valueEns: null,
                profet: [],

            },
            () => this.profet(),
            this.getEleves(value.value),


        );

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
                    console.log(error)
                });
        }
        catch (error) {
            console.log("failed" + error)
        }
    }


    handleChangeEns = value => {
        this.setState({
            valueEns: value,
            profet: [],
        },
            () => this.dataListRender()
        );

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
            valueEns,
            valueNiveau,
            valueClasse,
            classet,
            orderMois,
            selectedOrderMois
        } = this.state;
        const ens =
            this.state.profet.map((ens, i) => {
                return { label: ens.nom + " " + ens.prenom, value: ens.id };
            })
        const cs = classet.map(classe => {
            return { label: classe.niveau + " " + classe.Nom, value: classe.id }
        })

        const { match } = this.props;
        const startIndex = (currentPage - 1) * selectedPageSize;
        const endIndex = currentPage * selectedPageSize;

        return this.state.isLoading ? (
            <div className="loading" />
        ) : (
                <Fragment>
                    <Label>
                        <h3>Niveau :</h3>
                    </Label>
                    <Select
                        onChange={this.handleChangeNiveau}
                        value={valueNiveau}
                        options={levelscls}
                        className="react-select"
                        classNamePrefix="react-select"
                        name="form-field-name"

                    />
                    <br></br>
                    {valueNiveau.value != '*' &&
                        <>
                            <label>
                                <h3>Classe :</h3>
                            </label>

                            <Select
                                onChange={this.handleChangeClasse}
                                value={valueClasse}
                                options={cs}
                                className="react-select"
                                placeholder="Sélectionner une classe..."
                                classNamePrefix="react-select"
                                name="form-field-name"
                                required
                            />
                            <br></br>
                        </>
                    }
                    {valueClasse &&
                        <>
                            <Label>
                                <h3>Enseignant :</h3>
                            </Label>
                            <Select
                                onChange={this.handleChangeEns}
                                value={valueEns}
                                options={ens}
                                className="react-select"
                                classNamePrefix="react-select"
                                name="form-field-name"
                                placeholder="Sélectionner un enseignant..."

                            />
                            <br></br>
                        </>
                    }

                    <div className="disable-text-selection">
                        <br></br>
                        <ListPageHeading
                            heading={valueNiveau.value === '*' ? "Toutes les feuilles d'appels" : valueEns ? "Feuilles d'appels de " + valueEns.label : " "}
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
                            orderMois={orderMois}
                            selectedOrderMois={selectedOrderMois}
                            changeOrderMois={this.changeOrderMois}

                        />





                        <Row>

                            {this.state.items.map((abs, i) => {
                                return (
                                    <DataListView
                                        key={abs.id}
                                        abs={abs}
                                        setAbs={this.setAbs}
                                        toggleModalVoir={this.toggleModalVoir}
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
                            />

                        </Row>
                    </div>

                </Fragment>
            );
    }
}
export default gst_absence;


{/* <UpdateModal
                            modalOpen={modalOpenUpdate}
                            toggleModal={this.toggleModalUpdate}
                            selectedItems={this.state.selectedItems}
                            event={event}
                            setST={this.setST}
                            callback={() => this.dataListRender()}

                        />


                        <DeleteModal
                            modalOpen={modalOpenDelete}
                            toggleModal={this.toggleModalDelete}
                            event={event}
                            setST={this.setST}
                            selectedItems={this.state.selectedItems}
                            callback={() => this.dataListRender()}

                        />
                        <AddNewModal
                            modalOpen={modalOpen}
                            toggleModal={this.toggleModal}
                            callback={() => this.dataListRender()}

                        /> */} {/* <ContextMenuContainer
                                onContextMenuClick={this.onContextMenuClick}
                                onContextMenu={this.onContextMenu}
                                toggleModalUpdate={this.toggleModalUpdate}
                                toggleModalDelete={this.toggleModalDelete}
                                selectedItems={this.state.selectedItems.length == 1}
                                toggleModalVoir={this.toggleModalVoir}
                            /> */} 

import React, { Component, Fragment } from "react";
import { Row, Card, CardBody, CardTitle, Table } from "reactstrap";
// import "./table.css";
import axios from "axios";
import Select from "react-select";
import DataListView from "../../../../containers/ens/gestion_abs/DataListView";
import Pagination from "../../../../containers/ens/gestion_abs/Pagination";
import ContextMenuContainer from "../../../../containers/ens/gestion_abs/ContextMenuContainer";
import ListPageHeading from "../../../../containers/ens/gestion_abs/ListPageHeading";
import AddNewModal from "../../../../containers/ens/gestion_abs/AddNewModal";
import UpdateModal from "../../../../containers/ens/gestion_abs/UpdateModal";
import DeleteModal from "../../../../containers/ens/gestion_abs/DeleteModal";
import Modal from "../../../../containers/ens/gestion_abs/Modal";

function collect(props) {
  return { data: props.data };
}




class gst_abs extends Component {
  constructor(props) {
    super(props);
    let nb = (new Date().getMonth());
    let ochhra = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
    let chhar = ochhra[nb];
    this.state = {
      displayMode: "list",
      feuille: [],
      selectedPageSize: 10,
      orderOptions: [
        { column: "id", label: "Identifiant" },
        { column: "trimestre", label: "Trimestre" },
        { column: "dateEnvoi", label: "Date d'envoi" },
        { column: "niveau", label: "Niveau" }

      ],
      orderOptions2: [
        { column: "id", label: "Identifiant" },
        { column: "trimestre", label: "Trimestre" },
        { column: "date", label: "Date d'envoi" },

      ],
      selectedOrderMois: { column: 6, label: chhar },
      orderMois: [
        { column: "trimestre", label: "Trimestre" },
        { column: 1, label: "Janvier" },
        { column: 2, label: "Février" },
        { column: 3, label: "Mars" },
        { column: 4, label: "Avril" },
        { column: 5, label: "Mai" },
        { column: 6, label: "Juin" },
        { column: 7, label: "Juillet" },
        { column: 8, label: "Août" },
        { column: 9, label: "Septembre" },
        { column: 10, label: "Octobre" },
        { column: 11, label: "Novembre" },
        { column: 12, label: "Décembre" },

      ],

      pageSizes: [1, 2, 5, 10, 20, 30, 50, 100],

      selectedOrderOption: { column: "dateEnvoi", label: "Date" },
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
      classe: [],
      valueNiveau: { label: "Toutes les feuilles d'appels", value: -1, niveau: -1 },
      classet: [],
      modalOpenVoir: false,
      idClasse: -1




    };
  }


  componentWillMount() {
    this.dataListRender();
    this.getClasses();


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
  setFeuille = (feuille) => {
    this.setState({ feuille })
  }
  toggleModalDelete = () => {
    this.setState({

      modalOpenDelete: !this.state.modalOpenDelete
    });
  };

  changeOrderBy = column => {
    if (this.state.valueNiveau.value === -1)
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
  toggleModalVoir = (idClasse) => {
    if (Number.isInteger(idClasse))
      this.setState({
        idClasse,
      });
    this.setState({
      modalOpenVoir: !this.state.modalOpenVoir
    });

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

  setClasse = classe => {
    this.setState({ classe });
  };
  getClasses() {

    var query = "http://api.onyx.inedit-gd.tn/classe/getAll";

    try {
      axios
        .get(query)
        .then(res => res.data)
        .then(data => {
          this.setState({
            classet: [{ id: -1, Nom: "Toutes les feuilles d'appels", niveau: "" }].concat(data.list),
          });
        });
    } catch (error) {
      console.log("failed" + error)
    }
  }
  handleChangeNiveau = value => {
    this.setState({
      valueNiveau: value,
      selectedItems: []

    }, this.dataListRender);

  };
  dataListRender() {
    const {
      selectedPageSize,
      currentPage,
      selectedOrderOption,
      valueNiveau,
      selectedOrderMois
    } = this.state;


    var query = "http://api.onyx.inedit-gd.tn/classe/getAll?";
    query += "count=" + selectedPageSize
    query += "&page=" + currentPage
    query += "&order=" + selectedOrderOption.column

    // if (valueNiveau && valueNiveau.value > -1) {
    //   query += "&ids=" + valueNiveau.value
    // }
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
  chercher = (event) => {
    this.setState({ search: event.target.value }, this.dataListRender)
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
      orderOptions2,
      pageSizes,
      modalOpen,
      modalOpenUpdate,
      modalOpenDelete,
      valueNiveau,
      classet,
      modalOpenVoir,
      search,
      orderMois,
      selectedOrderMois,
      idClasse
    } = this.state;
    const { match } = this.props;
    const startIndex = (currentPage - 1) * selectedPageSize;
    const endIndex = currentPage * selectedPageSize;

    const cs = classet.map(classe => {
      return { label: classe.niveau + " " + classe.Nom, value: classe.id, niveau: parseInt(classe.niveau) }
    })

    return this.state.isLoading ? (
      <div className="loading" />
    ) : (
        <Fragment>

          <label>
            <h3>Affichage :</h3>
          </label>

          <Select
            onChange={this.handleChangeNiveau}
            value={valueNiveau}
            options={cs}
            className="react-select"
            placeholder="Sélectionner une classe..."
            classNamePrefix="react-select"
            name="form-field-name"
            required
          />



          <div className="disable-text-selection">

            {valueNiveau &&
              <ListPageHeading
                heading={valueNiveau.value === -1 ? "Toutes les feuilles d'appels" : "Les feuilles d'appels de " + valueNiveau.label}
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
                orderOptions={valueNiveau.value === -1 ? orderOptions : orderOptions2}
                pageSizes={pageSizes}
                toggleModal={this.toggleModal}
                toggleModalVoir={this.toggleModalVoir}
                toggleModalUpdate={this.toggleModalUpdate}
                toggleModalDelete={this.toggleModalDelete}
                niveau={valueNiveau && valueNiveau.value}
                setST={this.setST}
                orderMois={orderMois}
                selectedOrderMois={selectedOrderMois}
                changeOrderMois={this.changeOrderMois}

              />
            }

            <AddNewModal
              modalOpen={modalOpen}
              toggleModal={this.toggleModal}
              callback={() => this.dataListRender()}
              niveau={valueNiveau.value > -1 && valueNiveau.niveau}
              setST={this.setST}
              idClasse={valueNiveau && valueNiveau.value}

            />


            <UpdateModal
              modalOpen={modalOpenUpdate}
              toggleModal={this.toggleModalUpdate}
              callback={() => this.dataListRender()}
              setST={this.setST}
              niveau={valueNiveau.value > -1 && valueNiveau.niveau}
              idClasse={valueNiveau && valueNiveau.value}
              feuille={this.state.feuille}

            />

            <DeleteModal
              modalOpen={modalOpenDelete}
              toggleModal={this.toggleModalDelete}
              callback={() => this.dataListRender()}
              selectedItems={this.state.selectedItems}
              setST={this.setST}
              idClasse={valueNiveau && valueNiveau.value}
              feuille={this.state.feuille}

            />
            <Row>
              {/* <div className="search-sm d-inline-block float-md-left mr-1 mb-1 align-top">
                <input
                  type="text"
                  name="keyword"
                  id="search"
                  placeholder="Rechercher JJ-MM-AAAA"
                  value={search}
                  onChange={this.chercher}
                />
              </div> */}


              {this.state.items.map((feuille, i) => {

                return (


                  <DataListView
                    key={feuille.id}
                    feuille={feuille}
                    isSelect={this.state.selectedItems.includes(feuille.id)}
                    onCheckItem={this.onCheckItem}
                    setFeuille={this.setFeuille}
                    collect={collect}
                    idClasse={valueNiveau && valueNiveau.value}
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

              {valueNiveau && valueNiveau.value > -1 &&
                <ContextMenuContainer
                  onContextMenuClick={this.onContextMenuClick}
                  onContextMenu={this.onContextMenu}
                  selectedItems={this.state.selectedItems}
                  toggleModalUpdate={this.toggleModalUpdate}
                  toggleModalDelete={this.toggleModalDelete}
                  toggleModalVoir={this.toggleModalVoir}

                />
              }

              <Modal
                modalOpenVoir={modalOpenVoir}
                toggleModalVoir={this.toggleModalVoir}
                feuille={this.state.feuille}
                idc={valueNiveau.value === -1 ? idClasse : valueNiveau.value}

              />
            </Row>
          </div>






        </Fragment>
      );
  }
}
export default gst_abs;
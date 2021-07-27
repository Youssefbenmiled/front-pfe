
import React, { Component, Fragment } from "react";
import { Row } from "reactstrap";
// import "./table.css";
import axios from "axios";
import Select from "react-select";
import DataListView from "../../../containers/ecole/gestion_classe/DataListView";
import Pagination from "../../../containers/ecole/gestion_classe/Pagination";
import ContextMenuContainer from "../../../containers/ecole/gestion_classe/ContextMenuContainer";
import ListPageHeading from "../../../containers/ecole/gestion_classe/ListPageHeading";
import AddNewModal from "../../../containers/ecole/gestion_classe/AddNewModal";
import UpdateModal from "../../../containers/ecole/gestion_classe/UpdateModal";
import DeleteModal from "../../../containers/ecole/gestion_classe/DeleteModal";
import { levelscls } from "../../../constants/defaultValues";

function collect(props) {
  return { data: props.data };
}

class gst_classe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chercher: "",
      displayMode: "list",

      selectedPageSize: 10,

      orderOptions: [
        { column: "id", label: "Identifiant" },
        { column: "niveau", label: "Niveau" },
        { column: "nbEleves", label: "Nombre d'éléves" }
      ],
      orderOptions2: [
        { column: "id", label: "Identifiant" },
        { column: "nbEleves", label: "Nombre d'éléves" }
      ],
      pageSizes: [1, 2, 5, 10, 20, 30, 50, 100],

      tab: [],
      selectedOrderOption: { column: "niveau", label: "Niveau" },
      selectedOrderOption2: { column: "nbEleves", label: "Nombre d'éléves" },

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
      valueNiveau: { label: "Toutes les classes", value: "*" },




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
    if (this.state.valueNiveau.value === "*")
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
          selectedOrderOption2: this.state.orderOptions2.find(
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
  // changeDisplayMode = mode => {
  //   this.setState({
  //     displayMode: mode
  //   });
  //   return false;
  // };
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
    if (this.state.valueNiveau.value != '*') {
      let selectedItems = this.state.selectedItems;
      if (selectedItems.includes(id)) {
        selectedItems = selectedItems.filter(x => x !== id);
      } else {
        selectedItems.push(id);
      }
      this.setState({
        selectedItems
      });


    }
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
    this.setState({ classe: classe });
  };

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
      selectedOrderOption2,
      valueNiveau
    } = this.state;


    var query = "http://api.onyx.inedit-gd.tn/classe/getAll?";
    query += "count=" + selectedPageSize
    query += "&page=" + currentPage


    if (valueNiveau.value !== "*") {
      query += "&order=" + selectedOrderOption2.column
      query += "&ids=" + valueNiveau.value

    }
    else {
      query += "&order=" + selectedOrderOption.column

    }
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
      selectedOrderOption2,
      selectedItems,
      orderOptions,
      orderOptions2,
      pageSizes,
      modalOpen,
      modalOpenUpdate,
      modalOpenDelete,
      chercher,
      valueNiveau,

    } = this.state;
    const { match } = this.props;
    const startIndex = (currentPage - 1) * selectedPageSize;
    const endIndex = currentPage * selectedPageSize;


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
            options={levelscls}
            className="react-select"
            placeholder="Sélectionner un niveau..."
            classNamePrefix="react-select"
            name="form-field-name"
            required
          />



          <div className="disable-text-selection">

            {/* <Separator className="mb-5" /> */}

            <ListPageHeading
              heading={valueNiveau.value === "*" ? "Toutes les classes" : "Liste des classes " + valueNiveau.label}
              displayMode={displayMode}
              // changeDisplayMode={this.changeDisplayMode}
              changeOrderBy={this.changeOrderBy}
              changePageSize={this.changePageSize}
              selectedPageSize={selectedPageSize}
              totalItemCount={totalItemCount}
              selectedOrderOption={valueNiveau.value === "*" ? selectedOrderOption : selectedOrderOption2}
              match={match}
              startIndex={startIndex}
              endIndex={endIndex}
              selectedItemsLength={selectedItems ? selectedItems.length : 0}
              itemsLength={items ? items.length : 0}
              onSearchKey={this.onSearchKey}
              orderOptions={valueNiveau.value === "*" ? orderOptions : orderOptions2}
              pageSizes={pageSizes}
              toggleModal={this.toggleModal}
              toggleModalUpdate={this.toggleModalUpdate}
              toggleModalDelete={this.toggleModalDelete}
              selectedItemsUpdate={this.state.selectedItems.length == 1}
              selectedItemsDelete={this.state.selectedItems.length > 0}
              niveau={valueNiveau && valueNiveau.value}
              setST={this.setST}

            />

            <AddNewModal
              modalOpen={modalOpen}
              toggleModal={this.toggleModal}
              callback={() => this.dataListRender()}
              niveau={valueNiveau ? valueNiveau.value : null}
              setST={this.setST}

            />
            <UpdateModal
              modalOpen={modalOpenUpdate}
              toggleModal={this.toggleModalUpdate}
              classe={this.state.classe}
              callback={() => this.dataListRender()}
              setST={this.setST}

            />

            <DeleteModal
              modalOpen={modalOpenDelete}
              toggleModal={this.toggleModalDelete}
              callback={() => this.dataListRender()}
              classe={this.state.classe}
              selectedItems={this.state.selectedItems}
              setST={this.setST}

            />
            <Row>



              {this.state.items.map((classe, i) => {
                return (

                  <DataListView
                    key={classe.id}
                    classe={classe}
                    isSelect={this.state.selectedItems.includes(classe.id)}
                    onCheckItem={this.onCheckItem}
                    setClasse={this.setClasse}
                    collect={collect}
                    niveau={valueNiveau && valueNiveau.value}

                  />
                );
              })
              }



              <Pagination
                currentPage={this.state.currentPage}
                totalPage={this.state.totalPage}
                onChangePage={i => this.onChangePage(i)}
              />
              {valueNiveau.value !== "*" &&
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
export default gst_classe;
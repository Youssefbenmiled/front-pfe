import React, { Component, Fragment } from "react";
import { Row, Card, CardBody, CardTitle, Table, Label } from "reactstrap";
import "./table.css";
import axios from "axios";
import Select from "react-select";
import DataListView from "../../../containers/ecole/taux/DataListView";
import Pagination from "../../../containers/ecole/taux/Pagination";
import ContextMenuContainer from "../../../containers/ecole/taux/ContextMenuContainer";
import ListPageHeading from "../../../containers/ecole/taux/ListPageHeading";
import AddNewModal from "../../../containers/ecole/taux/AddNewModal";
import UpdateModal from "../../../containers/ecole/taux/UpdateModal";
import DeleteModal from "../../../containers/ecole/taux/DeleteModal";
import { levels } from "../../../constants/defaultValues";


function collect(props) {
  return { data: props.data };
}

class taux extends Component {
  constructor(props) {
    super(props);
    this.mouseTrap = require("mousetrap");

    this.state = {
      chercher: "",
      classet: [],
      elevet: [],
      displayMode: "list",

      selectedPageSize: 10,
      orderOptions: [
        { column: "title", label: "Product Name" },
        { column: "category", label: "Category" },
        { column: "status", label: "Status" }
      ],
      pageSizes: [10, 20, 30, 50, 100],




      selectedOrderOption: { column: "title", label: "Product Name" },
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
      isLoading: false,

      emploi: [],
      valueType: { label: "TAUX MOYEN DES CLASSES", value: "*" },
      valueNiveau: {},
      valueClasse: {},
      items: [],
      modalOpenVoir: false

    };
  }
  componentDidMount() {
    this.dataListRender();
    this.mouseTrap.bind(["ctrl+a", "command+a"], () =>
      this.handleChangeSelectAll(false)
    );
    this.mouseTrap.bind(["ctrl+d", "command+d"], () => {
      this.setState({
        selectedItems: []
      });
      return false;
    });
  }

  componentWillUnmount() {
    this.mouseTrap.unbind("ctrl+a");
    this.mouseTrap.unbind("command+a");
    this.mouseTrap.unbind("ctrl+d");
    this.mouseTrap.unbind("command+d");
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
    if (
      event.target.tagName === "A" ||
      (event.target.parentElement && event.target.parentElement.tagName === "A")
    ) {
      return true;
    }
    if (this.state.lastChecked === null) {
      this.setState({
        lastChecked: id
      });
    }

    let selectedItems = this.state.selectedItems;
    if (selectedItems.includes(id)) {
      selectedItems = selectedItems.filter(x => x !== id);
    } else {
      selectedItems.push(id);
    }
    this.setState({
      selectedItems
    });

    if (event.shiftKey) {
      var items = this.state.items;
      var start = this.getIndex(id, items, "id");
      var end = this.getIndex(this.state.lastChecked, items, "id");
      items = items.slice(Math.min(start, end), Math.max(start, end) + 1);
      selectedItems.push(
        ...items.map(item => {
          return item.id;
        })
      );
      selectedItems = Array.from(new Set(selectedItems));
      this.setState({
        selectedItems
      });
    }
    document.activeElement.blur();
  };

  getIndex(value, arr, prop) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i][prop] === value) {
        return i;
      }
    }
    return -1;
  }
  handleChangeSelectAll = isToggle => {
    if (this.state.selectedItems.length >= this.state.items.length) {
      if (isToggle) {
        this.setState({
          selectedItems: []
        });
      }
    } else {
      this.setState({
        selectedItems: this.state.items.map(x => x.id)
      });
    }
    document.activeElement.blur();
    return false;
  };
  classes(niveau) {
    try {
      axios
        .get(
          "http://api.onyx.inedit-gd.tn/classe/classe/" + niveau)
        .then(res => {
          console.log(res)
          return res.data;
        })
        .then(data => {
          this.setState({
            classet: data,

          });
        }, error => {
          console.log(error)
        });
    }
    catch (error) {
      console.log("failed" + error)
    }
  }
  dataListRender() {

    axios
      .get("http://api.onyx.inedit-gd.tn/matiere/getAll")

      .then(res => {
        console.log(res)
        return res.data;
      })
      .then(data => {
        this.setState({
          items: data,
          selectedItems: [],
          isLoading: true
        });
      });
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

  setEmploi = emploi => {
    this.setState({ emploi });
  };
  handleChangeType = value => {
    this.setState({
      valueType: value,
      valueNiveau: {},
      valueClasse: {},
      selectedItems: []

    });
    switch (value.value) {
      case "*":
        this.dataListRender();
        break;

    }

  };
  handleChangeNiveau = value => {
    this.setState({
      valueNiveau: value,
      valueClasse: {},
      selectedItems: []
    });
    this.classes(value.value)

  };
  handleChangeClasse = value => {
    this.setState({
      valueClasse: value,
      selectedItems: []
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
  chercher = (event) => {
    this.setState({ chercher: event.target.value })
  }


  setST = (selectedItems) => {
    this.setState({ selectedItems })
  }
  render() {
    const cls = this.state.classet.map((classe, i) => {
      return { label: classe.Nom, value: classe.id };
    })

    const types = [
      { label: "TAUX MOYEN DES CLASSES", value: "*" },
      { label: " PAR CLASSE", value: "classe" }
    ];
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
      chercher,
    } = this.state;
    const { match } = this.props;
    const startIndex = (currentPage - 1) * selectedPageSize;
    const endIndex = currentPage * selectedPageSize;
    // let filteredItems = items.filter((event) => {
    //   return event.title.toLowerCase().indexOf(chercher.toLowerCase()) !== -1

    // })
    return !this.state.isLoading ? (
      <div className="loading" />
    ) : (
        <Fragment>
          <Label>
            <h3>Affichage et insértion :</h3>
          </Label>
          <Select
            onChange={this.handleChangeType}
            value={this.state.valueType}
            options={types}
            className="react-select"
            classNamePrefix="react-select"
            name="form-field-name"

          />
          <br></br>

          {this.state.valueType.value == "*" ? (
            <div className="disable-text-selection">
              <ListPageHeading
                heading="Historique des taux de moyennes"
                displayMode={displayMode}
                changeDisplayMode={this.changeDisplayMode}
                handleChangeSelectAll={this.handleChangeSelectAll}
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
                selectedItemsUpdate={this.state.selectedItems.length == 1}
                selectedItemsDelete={this.state.selectedItems.length > 0}
                type={"*"}
              />


              <UpdateModal
                modalOpen={modalOpenUpdate}
                toggleModal={this.toggleModalUpdate}
                selectedItems={this.state.selectedItems.length == 1}
                setSt={this.setST}
              />


              <DeleteModal
                modalOpen={modalOpenDelete}
                toggleModal={this.toggleModalDelete}
                selectedItems={this.state.selectedItems.length == 1}
                setSt={this.setST}
              />

              <AddNewModal
                modalOpen={modalOpen}
                toggleModal={this.toggleModal}


              />
              <Row>
                <div className="search-sm d-inline-block float-md-left mr-1 mb-1 align-top">
                  <input
                    type="text"
                    name="keyword"
                    id="search"
                    placeholder="Rechercher"
                    value={chercher}
                    onChange={this.chercher}
                  />
                </div>


                {this.state.items.map((emploi, i) => {
                  return (

                    <DataListView
                      key={emploi.id}
                      emploi={emploi}
                      isSelect={this.state.selectedItems.includes(emploi.id)}
                      onCheckItem={this.onCheckItem}
                      setEmploi={this.setEmploi}
                      toggleModalVoir={this.toggleModalVoir}
                      collect={collect}

                    />
                  );
                })

                }

                {chercher == "" ? (

                  <Pagination
                    currentPage={this.state.currentPage}
                    totalPage={this.state.totalPage}
                    onChangePage={i => this.onChangePage(i)}
                  />
                ) : null}
                <ContextMenuContainer
                  onContextMenuClick={this.onContextMenuClick}
                  onContextMenu={this.onContextMenu}
                  toggleModalUpdate={this.toggleModalUpdate}
                  toggleModalDelete={this.toggleModalDelete}
                  selectedItems={this.state.selectedItems.length == 1}

                />

              </Row>
            </div>
          ) : null}
          {this.state.valueType.value == "classe" &&
            <>
              <Label>
                <h3>Niveau :</h3>
              </Label>
              <Select
                onChange={this.handleChangeNiveau}
                value={this.state.valueNiveau}
                options={levels}
                className="react-select"
                placeholder="Sélectionnez le niveau..."
                classNamePrefix="react-select"
                name="form-field-name"

              />
            </>
          }
          <br></br>
          {this.state.valueNiveau.value != null &&
            <>
              <Label>
                <h3>Classe :</h3>
              </Label>
              <Select
                onChange={this.handleChangeClasse}
                value={this.state.valueClasse}
                options={cls}
                className="react-select"
                placeholder="Sélectionner une classe..."
                classNamePrefix="react-select"
                name="form-field-name"

              />
            </>
          }
          <br></br>

          <br></br>
          <br></br>
          {this.state.valueClasse.value != null &&
            <div className="disable-text-selection">
              <ListPageHeading
                heading={"Taux de moyenne de la classe : " + this.state.valueNiveau.label + "" + this.state.valueClasse.label}
                displayMode={displayMode}
                changeDisplayMode={this.changeDisplayMode}
                handleChangeSelectAll={this.handleChangeSelectAll}
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
                selectedItemsUpdate={this.state.selectedItems.length == 1}
                selectedItemsDelete={this.state.selectedItems.length > 0}
                type={"classe"}
              />
              <UpdateModal
                modalOpen={modalOpenUpdate}
                toggleModal={this.toggleModalUpdate}
                setSt={this.setST}

              />
              <DeleteModal
                modalOpen={modalOpenDelete}
                toggleModal={this.toggleModalDelete}
                setSt={this.setST}
                selectedItems={this.state.selectedItems.length == 1}

              />
              <AddNewModal
                modalOpen={modalOpen}
                toggleModal={this.toggleModal}

              />
              <Row>
                <div className="search-sm d-inline-block float-md-left mr-1 mb-1 align-top">
                  <input
                    type="text"
                    name="keyword"
                    id="search"
                    placeholder="Rechercher"
                    value={chercher}
                    onChange={this.chercher}
                  />
                </div>

                {this.state.items.map((emploi, i) => {
                  return (

                    <DataListView
                      key={emploi.id}
                      emploi={emploi}
                      isSelect={this.state.selectedItems.includes(emploi.id)}
                      onCheckItem={this.onCheckItem}
                      setEmploi={this.setEmploi}
                      toggleModalVoir={this.toggleModalVoir}
                      collect={collect}

                    />
                  );
                })

                }
                {chercher == "" ? (

                  <Pagination
                    currentPage={this.state.currentPage}
                    totalPage={this.state.totalPage}
                    onChangePage={i => this.onChangePage(i)}
                  />
                ) : null}
                <ContextMenuContainer
                  onContextMenuClick={this.onContextMenuClick}
                  onContextMenu={this.onContextMenu}
                  selectedItems={this.state.selectedItems.length == 1}
                  toggleModalUpdate={this.toggleModalUpdate}
                  toggleModalDelete={this.toggleModalDelete}

                />
              </Row>

            </div>

          }


        </Fragment>
      );
  }
}
export default taux;

//template
import React, { Component, Fragment } from "react";
import { Row, Card, CardBody, CardTitle, Table } from "reactstrap";
import IntlMessages from "../../../../helpers/IntlMessages";
import { Colxx, Separator } from "../../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../../containers/navs/elem_parent/Breadcrumb";
import axios from "axios";
import { servicePath } from "../../../../constants/defaultValues";
import Select from "react-select";
import "./table.css"
import DataListView from "../../../../containers/ecole/gestion_bus/DataListView";
import Pagination from "../../../../containers/ecole/gestion_bus/Pagination";
import ContextMenuContainer from "../../../../containers/ecole/gestion_bus/ContextMenuContainer";
import ListPageHeading from "../../../../containers/ecole/gestion_bus/ListPageHeading";
import AddNewModal from "../../../../containers/ecole/gestion_bus/AddNewModal";
import UpdateModal from "../../../../containers/ecole/gestion_bus/UpdateModal";
import DeleteModal from "../../../../containers/ecole/gestion_bus/DeleteModal";
import Modal from "../../../../containers/ecole/gestion_bus/Modal";

function collect(props) {
  return { data: props.data };
}
const apiUrl = servicePath + "/cakes/paging";

class gst_enseignant extends Component {
  constructor(props) {
    super(props);
    this.mouseTrap = require("mousetrap");

    this.state = {
      chercher: "",
      items: [],

      displayMode: "list",

      selectedPageSize: 10,
      orderOptions: [
        { column: "title", label: "Product Name" },
        { column: "category", label: "Category" },
        { column: "status", label: "Status" }
      ],
      pageSizes: [10, 20, 30, 50, 100],

      categories: [
        { label: "Cakes", value: "Cakes", key: 0 },
        { label: "Cupcakes", value: "Cupcakes", key: 1 },
        { label: "Desserts", value: "Desserts", key: 2 }
      ],


      selectedOrderOption: { column: "title", label: "Product Name" },
      dropdownSplitOpen: false,
      modalOpen: false,
      currentPage: 1,
      totalItemCount: 0,
      totalPage: 1,
      search: "",
      selectedItems: [],
      lastChecked: null,
      isLoading: false,
      modalOpen: false,
      modalOpenUpdate: false,
      modalOpenDelete: false,
      classe: "",
      niveau: "",
      nbr: "",
      produit: [],
      valueType: { label: "Tous les bus", value: "*" },
      valueNiveau: "",
      valueClasse: "",
      modalOpenVoir: false,

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

  dataListRender() {
    const {
      selectedPageSize,
      currentPage,
      selectedOrderOption,
      search
    } = this.state;
    axios
      .get(
        `${apiUrl}?pageSize=${selectedPageSize}&currentPage=${currentPage}&orderBy=${selectedOrderOption.column}&search=${search}`
      )
      .then(res => {
        return res.data;
      })
      .then(data => {
        this.setState({
          totalPage: data.totalPage,
          items: data.data,
          products: data.data,
          selectedItems: [],
          totalItemCount: data.totalItem,
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
  setClasse = classe => {
    this.setState({ classe });
  };
  setNiveau = niveau => {
    this.setState({ niveau });
  };
  setNbr = nbr => {
    this.setState({ nbr });
  };
  setProduct = produit => {
    this.setState({ produit });
  };
  // handleChangeType = value => {
  //   this.setState({
  //     valueType: value,
  //     valueNiveau: "",
  //     valueClasse: "",
  //     selectedItems: []

  //   });
  // };
  // handleChangeNiveau = value => {
  //   this.setState({
  //     valueNiveau: value,
  //     valueClasse: "",
  //     selectedItems: []

  //   });
  // };
  // handleChangeClasse = value => {
  //   this.setState({
  //     valueClasse: value,
  //     selectedItems: []


  //   });
  // };
  chercher = (event) => {
    this.setState({ chercher: event.target.value })
  }
  toggleModalVoir = () => {
    this.setState({
      modalOpenVoir: !this.state.modalOpenVoir
    });

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
      chercher,
      categories,
      modalOpenVoir
    } = this.state;
    const classes = [
      { label: "classe 1", value: "1" },
      { label: "classe 2", value: "2" },
      { label: "classe 3", value: "3" },
      { label: "classe 4", value: "4" },
      { label: "classe 5", value: "5" },
    ]
    const levels = [
      { label: " 1", value: "1" },
      { label: " 2", value: "2" },
      { label: " 3", value: "3" },
      { label: " 4", value: "4" },
      { label: " 5", value: "5" },
      { label: " 6", value: "6" },

    ];
    const niveaux = [
      { label: " 1", value: "1" },
      { label: " 2", value: "2" },
      { label: " 3", value: "3" },
      { label: " 4", value: "4" },
      { label: " 5", value: "5" },
      { label: " 6", value: "6" },
      { label: "annuler", value: "annuler" }

    ];

    const types = [
      { label: "Tous les bus", value: "*" },

    ];
    const matieres = [
      { label: "math", value: "math" },
      { label: "physique", value: "physique" },
      { label: "science", value: "science" },
      { label: "sport", value: "sport" },
      { label: "anglais", value: "anglais" }
    ];

    const { match } = this.props;
    const startIndex = (currentPage - 1) * selectedPageSize;
    const endIndex = currentPage * selectedPageSize;
    let filteredItems = items.filter((event) => {
      return event.title.toLowerCase().indexOf(chercher.toLowerCase()) !== -1

    })
    return !this.state.isLoading ? (
      <div className="loading" />
    ) : (
        <Fragment>
          <Select
            // onChange={this.handleChangeType}
            value={this.state.valueType}
            options={types}
            className="react-select"
            placeholder="Sélectionnez le type d'affichage ..."
            classNamePrefix="react-select"
            name="form-field-name"
            required
          />
          <br></br>

          {this.state.valueType.value == "*" ? (
            <div className="disable-text-selection">
              <ListPageHeading
                heading="Liste des bus"
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
              />
              <UpdateModal
                modalOpen={modalOpenUpdate}
                toggleModal={this.toggleModalUpdate}
                niveaux={levels}
                classes={classes}
                matieres={matieres}
                titre={this.state.produit.title}
                niveau={this.state.valueNiveau.value}
                date={this.state.produit.date}
                selectedItems={this.state.selectedItems.length == 1}

              />
              <DeleteModal
                modalOpen={modalOpenDelete}
                toggleModal={this.toggleModalDelete}
                niveaux={levels}
                classes={classes}
                matieres={matieres}
                titre={this.state.produit.title}
                niveau={this.state.valueNiveau.value}
                date={this.state.produit.date}
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
                {
                  chercher != "" ? (
                    filteredItems.map((product, i) => {
                      return (


                        <DataListView
                          key={product.id}
                          product={product}
                          isSelect={this.state.selectedItems.includes(product.id)}
                          onCheckItem={this.onCheckItem}
                          collect={collect}
                          setProduct={this.setProduct}
                          toggleModalVoir={this.toggleModalVoir}

                        />

                      );
                    })
                  ) :

                    this.state.items.map((product, i) => {
                      return (


                        <DataListView
                          key={product.id}
                          product={product}
                          isSelect={this.state.selectedItems.includes(product.id)}
                          onCheckItem={this.onCheckItem}
                          collect={collect}
                          setProduct={this.setProduct}
                          toggleModalVoir={this.toggleModalVoir}

                        />
                      );
                    })

                }{" "}
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
                  setClasse={this.setClasse}
                  setNiveau={this.setNiveau}
                  setNbr={this.setNbr}
                  classe={this.state.classe}
                />
                <Modal
                  modalOpenVoir={modalOpenVoir}
                  toggleModalVoir={this.toggleModalVoir}
                  produit={this.state.produit}
                />
              </Row>
            </div>
          ) : null}
          {this.state.valueType.value == "niveau" ? (
            <Select
              onChange={this.handleChangeNiveau}
              value={this.state.valueNiveau}
              options={levels}
              className="react-select"
              placeholder="Sélectionnez le niveau de la classe..."
              classNamePrefix="react-select"
              name="form-field-name"
              errorMessage="Vous devez sélectionner un niveau"
              required
            />

          ) : null}
          <br></br>
          {this.state.valueNiveau.value != null ? (
            <Select
              onChange={this.handleChangeClasse}
              value={this.state.valueClasse}
              options={classes}
              className="react-select"
              placeholder="Sélectionnez une classe..."
              classNamePrefix="react-select"
              name="form-field-name"
              errorMessage="Vous devez sélectionner une classe"
              required
            />

          ) : null}
          <br></br>
          {this.state.valueClasse.value != null ? (
            <div className="disable-text-selection">
              <ListPageHeading
                heading={"Liste des enseignants de la classe : " + this.state.valueNiveau.label + " " + this.state.valueClasse.label}
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
              />
              <UpdateModal
                modalOpen={modalOpenUpdate}
                toggleModal={this.toggleModalUpdate}
                niveaux={niveaux}
                matieres={matieres}
                classes={classes}
                titre={this.state.produit.title}
                niveau={this.state.valueNiveau.value}
                date={this.state.produit.date}
              />
              <DeleteModal
                modalOpen={modalOpenDelete}
                toggleModal={this.toggleModalDelete}
                niveaux={levels}
                classes={classes}
                matieres={matieres}
                titre={this.state.produit.title}
                niveau={this.state.valueNiveau.value}
                date={this.state.produit.date}
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
                {
                  chercher != "" ? (
                    filteredItems.map((product, i) => {
                      return (


                        <DataListView
                          key={product.id}
                          product={product}
                          isSelect={this.state.selectedItems.includes(product.id)}
                          onCheckItem={this.onCheckItem}
                          collect={collect}
                          setProduct={this.setProduct}
                          toggleModalVoir={this.toggleModalVoir}

                        />

                      );
                    })
                  ) :

                    this.state.items.map((product, i) => {
                      return (


                        <DataListView
                          key={product.id}
                          product={product}
                          isSelect={this.state.selectedItems.includes(product.id)}
                          onCheckItem={this.onCheckItem}
                          collect={collect}
                          setProduct={this.setProduct}
                          toggleModalVoir={this.toggleModalVoir}

                        />
                      );
                    })

                }{" "}
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
                  setClasse={this.setClasse}
                  setNiveau={this.setNiveau}
                  setNbr={this.setNbr}
                  classe={this.state.classe}
                />
                <Modal
                  modalOpenVoir={modalOpenVoir}
                  toggleModalVoir={this.toggleModalVoir}
                  produit={this.state.produit}
                />
              </Row>
            </div>

          ) : null}


        </Fragment>
      );
  }
}
export default gst_enseignant;

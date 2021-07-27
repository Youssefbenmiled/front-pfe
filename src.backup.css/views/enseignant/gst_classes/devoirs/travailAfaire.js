
import React, { Component, Fragment } from "react";
import { Row, Card, CardBody, CardTitle, Table } from "reactstrap";
import { Colxx, Separator } from "../../../../components/common/CustomBootstrap";
// import "./table.css";
import axios from "axios";
import Select from "react-select";
import DataListView from "../../../../containers/ens/travailAfaire/DataListView";
import Pagination from "../../../../containers/ens/travailAfaire/Pagination";
import ContextMenuContainer from "../../../../containers/ens/travailAfaire/ContextMenuContainer";
import ListPageHeading from "../../../../containers/ens/travailAfaire/ListPageHeading";
import AddNewModal from "../../../../containers/ens/travailAfaire/AddNewModal";
import UpdateModal from "../../../../containers/ens/travailAfaire/UpdateModal";
import DeleteModal from "../../../../containers/ens/travailAfaire/DeleteModal";
import Modal from "../../../../containers/ens/travailAfaire/Modal";

function collect(props) {
  return { data: props.data };
}

class gst_devoir extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayMode: "list",

      selectedPageSize: 10,
      tab: [],

      orderOptions: [
        // { column: "id", label: "Identifiant" },
        { column: "niveau", label: "Niveau" },
        { column: "trimestre", label: "Trimestre" },
        { column: "dateEcheance", label: "Date d'échéance" },
        { column: "dateEnvoi", label: "Date d'envoi" },

      ],

      orderOptions2: [
        // { column: "id", label: "Identifiant" },
        { column: "dateEnvoi", label: "Date d'envoi" },
        { column: "dateEcheance", label: "Date d'échéance" },
        { column: "trimestre", label: "Trimestre" },

      ],
      pageSizes: [1, 2, 5, 10, 20, 30, 50, 100],

      selectedOrderOption: { column: "dateEcheance", label: "Date d'échéance" },
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
      devoir: [],
      valueNiveau: { label: "Tous les travaux à faire", value: -1, niveau: -1 },
      classet: [],

      modalOpenVoir: false,



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

  toggleModalDelete = () => {
    this.setState({

      modalOpenDelete: !this.state.modalOpenDelete
    });
  };
  toggleModalVoir = () => {
    this.setState({
      modalOpenVoir: !this.state.modalOpenVoir
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
    // if (
    //   event.target.tagName === "A" ||
    //   (event.target.parentElement && event.target.parentElement.tagName === "A")
    // ) {
    //   return true;
    // }
    // if (this.state.lastChecked === null) {
    //   this.setState({
    //     lastChecked: id
    //   });
    // }

    let selectedItems = this.state.selectedItems;
    if (selectedItems.includes(id)) {
      selectedItems = selectedItems.filter(x => x !== id);
    } else {
      selectedItems.push(id);
    }
    this.setState({
      selectedItems
    });

    // if (event.shiftKey) {
    //   var items = this.state.items;
    //   var start = this.getIndex(id, items, "id");
    //   var end = this.getIndex(this.state.lastChecked, items, "id");
    //   items = items.slice(Math.min(start, end), Math.max(start, end) + 1);
    //   selectedItems.push(
    //     ...items.map(item => {
    //       return item.id;
    //     })
    //   );
    //   selectedItems = Array.from(new Set(selectedItems));
    //   this.setState({
    //     selectedItems
    //   });
    // }
    // document.activeElement.blur();
  };

  // getIndex(value, arr, prop) {
  //   for (var i = 0; i < arr.length; i++) {
  //     if (arr[i][prop] === value) {
  //       return i;
  //     }
  //   }
  //   return -1;
  // }
  // handleChangeSelectAll = isToggle => {
  //   if (this.state.selectedItems.length >= this.state.items.length) {
  //     if (isToggle) {
  //       this.setState({
  //         selectedItems: []
  //       });
  //     }
  //   } else {
  //     this.setState({
  //       selectedItems: this.state.items.map(x => x.id)
  //     });
  //   }
  //   document.activeElement.blur();
  //   return false;
  // };


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

  handleChangeNiveau = value => {
    this.setState({
      valueNiveau: value,
      selectedItems: [],
      // isLoading: true

    }, this.dataListRender);

  };
  getClasses() {
    this.setState({
      classet: [],
    })
    var query = "http://api.onyx.inedit-gd.tn/classe/getAll";

    try {
      axios
        .get(query)
        .then(res => res.data)
        .then(data => {
          this.setState({
            classet: [{ id: -1, Nom: "Tous les travaux à faire", niveau: "", nbEleves: "" }].concat(data.list),
          });
        });
    } catch (error) {
      console.log("failed" + error)
    }
  }

  dataListRender() {
    const {
      selectedPageSize,
      currentPage,
      selectedOrderOption,
      valueNiveau,
      search
    } = this.state;
    this.setState({ items: [] })

    var query = "http://api.onyx.inedit-gd.tn/classe/getAll?";
    query += "count=" + selectedPageSize
    query += "&page=" + currentPage
    query += "&order=" + selectedOrderOption.column
    query += "&search=" + search

    if (valueNiveau.value > -1) {
      query += "&travail=" + valueNiveau.value
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

  setDevoir = (devoir) => {
    this.setState({ devoir })
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
      search,
      modalOpenVoir
    } = this.state;
    const { match } = this.props;
    const startIndex = (currentPage - 1) * selectedPageSize;
    const endIndex = currentPage * selectedPageSize;

    const devs = classet.map((classe, i) => {
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
            options={devs}
            className="react-select"
            classNamePrefix="react-select"
            name="form-field-name"
            required
          />



          <div className="disable-text-selection">

            {valueNiveau &&
              <ListPageHeading
                heading={valueNiveau.value === -1 ? "Tous les travaux à faire" : "Les travaux à faire de la classe " + valueNiveau.label}
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
                onSearchKey={this.onSearchKey}
                orderOptions={valueNiveau.value === -1 ? orderOptions : orderOptions2}
                pageSizes={pageSizes}
                toggleModal={this.toggleModal}
                toggleModalUpdate={this.toggleModalUpdate}
                toggleModalDelete={this.toggleModalDelete}
                idClasse={valueNiveau && valueNiveau.value}
                setST={this.setST}
                toggleModalVoir={this.toggleModalVoir}

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
              devoir={this.state.devoir}
              idClasse={valueNiveau && valueNiveau.value}

            />

            <DeleteModal
              modalOpen={modalOpenDelete}
              toggleModal={this.toggleModalDelete}
              callback={() => this.dataListRender()}
              selectedItems={this.state.selectedItems}
              setST={this.setST}
              idClasse={valueNiveau && valueNiveau.value}
              devoir={this.state.devoir}

            />
            <Row>

              <div className="search-sm d-inline-block float-md-left mr-1 mb-1 align-top">
                <input
                  type="text"
                  name="keyword"
                  id="search"
                  placeholder="Rechercher domaine"
                  value={search}
                  onChange={this.chercher}
                />
              </div>



              {this.state.items.map((devoir, i) => {

                return (


                  <DataListView
                    key={devoir.id}
                    devoir={devoir}
                    isSelect={this.state.selectedItems.includes(devoir.id)}
                    onCheckItem={this.onCheckItem}
                    setDevoir={this.setDevoir}
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
                toggleModal={this.toggleModalVoir}
                devoir={this.state.devoir}

              />

            </Row>
          </div>






        </Fragment>
      );
  }
}
export default gst_devoir;
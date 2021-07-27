import React, { Component, Fragment } from "react";
import { Row, Label } from "reactstrap";

import axios from "axios";
import { levelsens } from "../../../constants/defaultValues";
import Select from "react-select";
// import "./table.css"
import DataListView from "../../../containers/ecole/gestion_ens/DataListView";
import Pagination from "../../../containers/ecole/gestion_ens/Pagination";
import ContextMenuContainer from "../../../containers/ecole/gestion_ens/ContextMenuContainer";
import ListPageHeading from "../../../containers/ecole/gestion_ens/ListPageHeading";
import AddNewModal from "../../../containers/ecole/gestion_ens/AddNewModal";
import UpdateModal from "../../../containers/ecole/gestion_ens/UpdateModal";
import DeleteModal from "../../../containers/ecole/gestion_ens/DeleteModal";
import Modal from "../../../containers/ecole/gestion_ens/Modal";


function collect(props) {
  return { data: props.data };
}
class gst_enseignant extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chercher: "",
      items: [],
      classet: [],
      domainet: [],

      displayMode: "list",

      selectedPageSize: 10,
      orderOptions: [
        { column: "id", label: "Identifiant" },
        { column: "nom", label: "Nom" },
        { column: "prenom", label: "Prénom" },

      ],
      pageSizes: [1, 2, 5, 10, 20, 30, 50, 100],



      selectedOrderOption: { column: "nom", label: "Nom" },
      dropdownSplitOpen: false,
      modalOpen: false,
      currentPage: 1,
      totalItemCount: 0,
      totalPage: 3,
      search: "",
      selectedItems: [],
      lastChecked: null,
      isLoading: true,
      modalOpen: false,
      modalOpenUpdate: false,
      modalOpenDelete: false,
      ens: null,
      valueType: { label: "Tous les enseignants", value: -1 },
      // valueNiveau: null,
      // valueClasse: null,
      // valueDomaine: null,
      modalOpenVoir: false,

    };
  }
  componentWillMount() {
    this.dataListRender();

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



  dataListRender() {
    const {
      selectedPageSize,
      currentPage,
      selectedOrderOption,
      search,
      valueClasse,
      valueType,
      valueNiveau
    } = this.state;


    var query = "http://api.onyx.inedit-gd.tn/enseignant/getAll?";
    query += "count=" + selectedPageSize
    query += "&page=" + currentPage
    query += "&order=" + selectedOrderOption.column
    query += "&search=" + search;

    if (valueType && valueType.value > -1) {
      query += "&niveau=" + valueType.value
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
          console.log(error)
        });
    }
    catch (error) {
      console.log("failed" + error)
    }
  }


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

  setEns = ens => {
    this.setState({ ens });
  };

  handleChangeType = value => {
    this.setState({
      valueType: value,
      selectedItems: [],

    }, this.dataListRender);
  };



  chercher = (event) => {
    this.setState({ search: event.target.value }, this.dataListRender)
  }
  toggleModalVoir = () => {
    this.setState({
      modalOpenVoir: !this.state.modalOpenVoir
    });

  };
  // classes(niveau) {

  //   try {
  //     axios
  //       .get(
  //         "http://api.onyx.inedit-gd.tn/classe/classe/" + niveau)
  //       .then(res => {
  //         console.log(res)
  //         return res.data;
  //       })
  //       .then(data => {

  //         this.setState({
  //           classet: data,

  //         });
  //       }, error => {
  //         console.log(error)
  //       });
  //   }
  //   catch (error) {
  //     console.log("failed" + error)
  //   }
  // }
  // domaines(niveau) {

  //   try {
  //     axios
  //       .get(
  //         "http://api.onyx.inedit-gd.tn/domaine/niveau/" + niveau)
  //       .then(res => {
  //         console.log(res)
  //         return res.data;
  //       })
  //       .then(data => {

  //         this.setState({
  //           domainet: data,

  //         });
  //       }, error => {
  //         console.log(error)
  //       });
  //   }
  //   catch (error) {
  //     console.log("failed" + error)
  //   }
  // }
  setST = () => {
    this.setState({ selectedItems: [] })
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
      pageSizes,
      modalOpen,
      modalOpenUpdate,
      modalOpenDelete,
      chercher,
      modalOpenVoir,
      valueType,
      // valueNiveau,
      // valueDomaine,
      // valueClasse,
      classet,
      domainet,
      search,
      ens
    } = this.state;

    const { match } = this.props;
    const startIndex = (currentPage - 1) * selectedPageSize;
    const endIndex = currentPage * selectedPageSize;

    return this.state.isLoading ? (
      <div className="loading" />
    ) : (
        <Fragment>
          <Label>
            <h3>Affichage :</h3>
          </Label>
          <Select
            onChange={this.handleChangeType}
            value={valueType}
            options={levelsens}
            className="react-select"
            classNamePrefix="react-select"
            name="form-field-name"
            required
          />

          <div className="disable-text-selection">
            <br></br>
            <ListPageHeading
              heading={valueType.value === -1 ? "Tous les enseignants" : "Enseignants " + valueType.label}
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
              toggleModalUpdate={this.toggleModalUpdate}
              toggleModalDelete={this.toggleModalDelete}
              toggleModalVoir={this.toggleModalVoir}
              selectedItems={this.state.selectedItems}
              type={valueType && valueType.value}


            />


            <UpdateModal
              modalOpen={modalOpenUpdate}
              toggleModal={this.toggleModalUpdate}
              selectedItems={this.state.selectedItems.length == 1}
              ens={this.state.ens}
              setST={this.setST}
              callback={() => this.dataListRender()}

            />


            <DeleteModal
              modalOpen={modalOpenDelete}
              toggleModal={this.toggleModalDelete}
              ens={this.state.ens}
              setST={this.setST}
              selectedItems={this.state.selectedItems}
              callback={() => this.dataListRender()}

            />
            <AddNewModal
              modalOpen={modalOpen}
              toggleModal={this.toggleModal}
              callback={() => this.dataListRender()}
              ens={this.state.ens}

            />
            <Row>
              {/* 
              <div className="search-sm d-inline-block float-md-left mr-1 mb-1 align-top">
                <input
                  type="text"
                  name="keyword"
                  id="search"
                  placeholder="Rechercher"
                  value={search}
                  onChange={this.chercher}
                />
              </div> */}




              {this.state.items.map((ens, i) => {
                return (
                  <DataListView
                    key={ens[0].id}
                    ens={ens[0]}
                    isSelect={this.state.selectedItems.includes(ens[0].id)}
                    onCheckItem={this.onCheckItem}
                    setEns={this.setEns}
                    collect={collect}
                    toggleModalVoir={this.toggleModalVoir}
                    type={valueType && valueType.value}

                  />
                );
              })


              }


              <Pagination
                currentPage={this.state.currentPage}
                totalPage={this.state.totalPage}
                onChangePage={i => this.onChangePage(i)}
              />
              {valueType.value === -1 &&
                <ContextMenuContainer
                  onContextMenuClick={this.onContextMenuClick}
                  onContextMenu={this.onContextMenu}
                  selectedItems={this.state.selectedItems}
                />
              }
              <Modal
                modalOpenVoir={modalOpenVoir}
                toggleModalVoir={this.toggleModalVoir}
                ens={this.state.ens}
              />

            </Row>
          </div>

        </Fragment>
      );
  }
}
export default gst_enseignant;

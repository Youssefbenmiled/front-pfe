import React, { Component, Fragment } from "react";
import { Row, Card, CardBody, CardTitle, Table, Label } from "reactstrap";
import IntlMessages from "../../../helpers/IntlMessages";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../containers/navs/elem_parent/Breadcrumb";
// import "./table.css";
import axios from "axios";
import { levelselv } from "../../../constants/defaultValues";
import Select from "react-select";
import DataListView from "../../../containers/ecole/gestion_eleve/DataListView";
import Pagination from "../../../containers/ecole/gestion_eleve/Pagination";
import ContextMenuContainer from "../../../containers/ecole/gestion_eleve/ContextMenuContainer";
import ListPageHeading from "../../../containers/ecole/gestion_eleve/ListPageHeading";
import AddNewModal from "../../../containers/ecole/gestion_eleve/AddNewModal";
import UpdateModal from "../../../containers/ecole/gestion_eleve/UpdateModal";
import DeleteModal from "../../../containers/ecole/gestion_eleve/DeleteModal";
import Modal from "../../../containers/ecole/gestion_eleve/Modal";

function collect(props) {
  return { data: props.data };
}

class gst_eleve extends Component {
  constructor(props) {
    super(props);
    this.mouseTrap = require("mousetrap");

    this.state = {
      displayMode: "list",

      selectedPageSize: 10,
      orderOptions: [
        { column: "id", label: "Identifiant" },
        { column: "nom", label: "Nom" },
        { column: "prenom", label: "Prénom" },
        { column: "niveau", label: "Niveau" },
      ],
      orderOptions2: [
        { column: "id", label: "Identifiant" },
        { column: "nom", label: "Nom" },
        { column: "prenom", label: "Prénom" },
      ],
      pageSizes: [1, 2, 5, 10, 20, 30, 50, 100],




      selectedOrderOption: { column: "niveau", label: "Niveau" },
      selectedOrderOption2: { column: "nom", label: "Nom" },

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
      elevet: [],
      eleve: [],
      valueNiveau: { label: "Tous les éléves", value: "*" },
      valueClasse: null,
      items: [],
      modalOpenVoir: false,
      classet: []

    };
  }
  componentWillMount() {
    this.dataListRender();
    // this.mouseTrap.bind(["ctrl+a", "command+a"], () =>
    //   this.handleChangeSelectAll(false)
    // );
    // this.mouseTrap.bind(["ctrl+d", "command+d"], () => {
    //   this.setState({
    //     selectedItems: []
    //   });
    //   return false;
    // });
  }

  // componentWillUnmount() {
  //   this.mouseTrap.unbind("ctrl+a");
  //   this.mouseTrap.unbind("command+a");
  //   this.mouseTrap.unbind("ctrl+d");
  //   this.mouseTrap.unbind("command+d");
  // }


  changeOrderBy = column => {
    if (this.state.classe) {
      this.setState(
        {
          selectedOrderOption2: this.state.orderOptions2.find(
            x => x.column === column
          )
        },
        () => this.dataListRender()
      );
    }
    else {
      this.setState(
        {
          selectedOrderOption: this.state.orderOptions.find(
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


  setEleve = eleve => {
    this.setState({ eleve });
  };
  // handleChangeType = value => {
  //   this.setState({
  //     valueType: value,
  //     valueNiveau: null,
  //     valueClasse: null,
  //     items: [],
  //     selectedItems: []

  //   }, this.dataListRender);
  // };

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
  handleChangeNiveau = value => {
    this.setState({
      valueNiveau: value,
      valueClasse: null,
      items: [],
      selectedItems: []
    }, this.dataListRender);

  };
  handleChangeClasse = value => {
    this.setState({
      valueClasse: value,
      selectedItems: []
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




  dataListRender() {
    const {
      selectedPageSize,
      currentPage,
      selectedOrderOption,
      selectedOrderOption2,
      search,
      valueClasse,
      valueNiveau
    } = this.state;

    if (valueNiveau.value !== "*" && !valueClasse && valueNiveau.value !== "!") {
      this.classes(valueNiveau.value)
      this.setState({ items: [] });
      return;
    }
    var query = "http://api.onyx.inedit-gd.tn/eleve/getAll?";
    query += "count=" + selectedPageSize
    query += "&page=" + currentPage
    query += "&search=" + search;

    if (valueClasse && valueClasse.value) {
      query += "&classe=" + valueClasse.value
      query += "&order=" + selectedOrderOption2.column

    }
    else {
      query += "&order=" + selectedOrderOption.column

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
          console.log(error)
        });
    }
    catch (error) {
      console.log("failed" + error)
    }
  }
  setST = () => {
    this.setState({ selectedItems: [] })
  }
  render() {


    const classet = this.state.classet.map((classe, i) => {
      return { label: classe.Nom, value: classe.id };
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
      chercher,
      modalOpenVoir,
      search,
      valueNiveau,
      valueClasse
    } = this.state;
    const { match } = this.props;
    const startIndex = (currentPage - 1) * selectedPageSize;
    const endIndex = currentPage * selectedPageSize;

    return !this.state.isLoading ? (
      <div className="loading" />
    ) : (
        <Fragment>

          <Label>
            <h3>Affichage :</h3>
          </Label>
          <Select
            onChange={this.handleChangeNiveau}
            value={valueNiveau}
            options={levelselv}
            className="react-select"
            placeholder="Sélectionner le niveau..."
            classNamePrefix="react-select"
            name="form-field-name"
            required
          />

          {valueNiveau.value !== "*" && valueNiveau.value !== "!" &&
            <>
              <br></br>
              <Label>
                <h3>Classe :</h3>
              </Label>
              <Select
                onChange={this.handleChangeClasse}
                value={valueClasse}
                options={classet}
                className="react-select"
                placeholder="Sélectionner une classe..."
                classNamePrefix="react-select"
                name="form-field-name"
                errorMessage="Vous devez sélectionner une classe"
                required
              />
              <br></br>
            </>
          }

          <div className="disable-text-selection">
            <br></br>
            {(valueNiveau.value === "*") || (valueClasse) || (valueNiveau.value === "!") ?
              <ListPageHeading
                heading={valueNiveau.value === "!" ? "Liste des éléves non affectés" : valueClasse ? "Liste des éléves de la classe " + valueNiveau.value + "" + valueClasse.label : valueNiveau.value === "*" ? "Tous les éléves" : null}
                displayMode={displayMode}
                changeDisplayMode={this.changeDisplayMode}
                changeOrderBy={this.changeOrderBy}
                changePageSize={this.changePageSize}
                selectedPageSize={selectedPageSize}
                totalItemCount={totalItemCount}
                selectedOrderOption={valueClasse ? selectedOrderOption2 : selectedOrderOption}
                match={match}
                startIndex={startIndex}
                endIndex={endIndex}
                selectedItemsLength={selectedItems ? selectedItems.length : 0}
                itemsLength={items ? items.length : 0}
                onSearchKey={this.onSearchKey}
                orderOptions={valueClasse ? orderOptions2 : orderOptions}
                pageSizes={pageSizes}
                toggleModal={this.toggleModal}
                toggleModalVoir={this.toggleModalVoir}
                toggleModalUpdate={this.toggleModalUpdate}
                toggleModalDelete={this.toggleModalDelete}
                classe={valueClasse ? valueClasse : null}
                niveau={valueNiveau.value === "*" && valueNiveau.value}



              />
              : null}
            <UpdateModal
              modalOpen={modalOpenUpdate}
              toggleModal={this.toggleModalUpdate}
              selectedItems={this.state.selectedItems.length == 1}
              eleve={this.state.eleve}
              setST={this.setST}
              idclasse={valueClasse ? valueClasse.value : null}
              callback={() => this.dataListRender()}

            />
            <DeleteModal
              modalOpen={modalOpenDelete}
              toggleModal={this.toggleModalDelete}
              selectedItems={this.state.selectedItems}
              eleve={this.state.eleve}
              setST={this.setST}
              callback={() => this.dataListRender()}
              idclasse={this.state.valueClasse ? this.state.valueClasse.value : null}
            />

            <AddNewModal
              modalOpen={modalOpen}
              toggleModal={this.toggleModal}
              setST={this.setST}
              callback={() => this.dataListRender()}
              idclasse={this.state.valueClasse ? this.state.valueClasse.value : null}
            />
            <Row>
              {(valueNiveau.value === "*") || (valueClasse) ?

                <div className="search-sm d-inline-block float-md-left mr-1 mb-1 align-top">
                  <input
                    type="text"
                    name="keyword"
                    id="search"
                    placeholder="Rechercher"
                    value={search}
                    onChange={this.chercher}
                  />
                </div>
                : null}

              {this.state.items.map((eleve, i) => {
                return (

                  <DataListView
                    key={eleve.id}
                    eleve={eleve}
                    isSelect={this.state.selectedItems.includes(eleve.id)}
                    onCheckItem={this.onCheckItem}
                    setEleve={this.setEleve}
                    collect={collect}
                    classe={valueClasse ? valueClasse : null}
                    niveau={valueNiveau.value === "*" && valueNiveau.value}
                    toggleModal={this.toggleModalVoir}

                  />
                );
              })
              }

              <Pagination
                currentPage={this.state.currentPage}
                totalPage={this.state.totalPage}
                onChangePage={i => this.onChangePage(i)}
              />
              {valueClasse &&
                <ContextMenuContainer
                  onContextMenuClick={this.onContextMenuClick}
                  onContextMenu={this.onContextMenu}
                  toggleModalUpdate={this.toggleModalUpdate}
                  toggleModalDelete={this.toggleModalDelete}
                  selectedItems={this.state.selectedItems}
                  toggleModalVoir={this.toggleModalVoir}

                />
              }
              <Modal
                modalOpenVoir={modalOpenVoir}
                toggleModal={this.toggleModalVoir}
                eleve={this.state.eleve}

              />
            </Row>
          </div>
        </Fragment>
      );
  }
}
export default gst_eleve;

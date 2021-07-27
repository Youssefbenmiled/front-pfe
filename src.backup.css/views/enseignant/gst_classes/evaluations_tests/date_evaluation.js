
import React, { Component, Fragment } from "react";
import { Row, Card, CardBody, CardTitle, Table } from "reactstrap";
// import "./table.css";
import axios from "axios";
import Select from "react-select";
import DataListView from "../../../../containers/ens/gestion_datev/DataListView";
import Pagination from "../../../../containers/ens/gestion_datev/Pagination";
import ContextMenuContainer from "../../../../containers/ens/gestion_datev/ContextMenuContainer";
import ListPageHeading from "../../../../containers/ens/gestion_datev/ListPageHeading";
import AddNewModal from "../../../../containers/ens/gestion_datev/AddNewModal";
import UpdateModal from "../../../../containers/ens/gestion_datev/UpdateModal";
import DeleteModal from "../../../../containers/ens/gestion_datev/DeleteModal";
import Modal from "../../../../containers/ens/gestion_datev/Modal";

function collect(props) {
  return { data: props.data };
}

class gst_evaluation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayMode: "list",
      exam: [],
      selectedPageSize: 10,

      orderOptions: [
        // { column: "id", label: "Identifiant" },
        { column: "trimestre", label: "Trimestre" },
        { column: "date", label: "Date" },
        { column: "niveau", label: "Niveau" }

      ],
      orderOptions2: [
        // { column: "id", label: "Identifiant" },
        { column: "trimestre", label: "Trimestre" },
        { column: "date", label: "Date" },

      ],
      pageSizes: [1, 2, 5, 10, 20, 30, 50, 100],

      selectedOrderOption: { column: "date", label: "Date" },

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
      valueNiveau: { label: "Toutes les dates d'évaluation", value: -1, niveau: -1 },
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



  chercher = (event) => {
    this.setState({ search: event.target.value }, this.dataListRender);
  };

  toggleModalUpdate = () => {
    this.setState({
      modalOpenUpdate: !this.state.modalOpenUpdate
    });

  };
  setST = () => {
    this.setState({ selectedItems: [] })
  }
  setExam = (exam) => {
    this.setState({ exam })
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
  changePageSize = size => {
    this.setState(
      {
        selectedPageSize: size,
        currentPage: 1
      },
      () => this.dataListRender()
    );
  };
  toggleModalVoir = () => {
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
    // if (this.state.valueNiveau.value != -1) {
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


  getClasses() {
    this.setState({
      classet: [{ id: -1, Nom: "Toutes les dates d'évaluation", niveau: "", nbEleves: -1 }],
    })
    //mochkla concat
    var query = "http://api.onyx.inedit-gd.tn/classe/getAll";

    try {
      axios
        .get(query)
        .then(res => res.data)
        .then(data => {
          this.setState({
            classet: this.state.classet.concat(data.list)
            // classet: [{ id: -1, Nom: "Toutes les évaluations", niveau: "", nbEleves: "" }].concat(data.list),
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
      search
    } = this.state;



    var query = "http://api.onyx.inedit-gd.tn/evaluation/getAll?";
    query += "count=" + selectedPageSize
    query += "&page=" + currentPage
    query += "&order=" + selectedOrderOption.column
    query += "&search=" + search


    if (valueNiveau && valueNiveau.value > -1) {
      query += "&classe=" + valueNiveau.value
    }
    this.setState({ items: [] })

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
      search
    } = this.state;
    const { match } = this.props;
    const startIndex = (currentPage - 1) * selectedPageSize;
    const endIndex = currentPage * selectedPageSize;

    const devs = classet.map(classe => {
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
            placeholder="Sélectionner un niveau..."
            classNamePrefix="react-select"
            name="form-field-name"
            required
          />



          <div className="disable-text-selection">

            <ListPageHeading
              heading={valueNiveau.value === -1 ? "Toutes les dates d'évaluation" : "Les dates d'évaluation de la classe " + valueNiveau.label}
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
              // itemsLength={items ? items.length : 0}
              onSearchKey={this.onSearchKey}
              orderOptions={valueNiveau.value === -1 ? orderOptions : orderOptions2}
              pageSizes={pageSizes}
              toggleModal={this.toggleModal}
              toggleModalUpdate={this.toggleModalUpdate}
              toggleModalDelete={this.toggleModalDelete}
              selectedItems={this.state.selectedItems}
              toggleModalVoir={this.toggleModalVoir}
              niveau={valueNiveau && valueNiveau.value}
              setST={this.setST}
              exam={this.state.exam}

            />


            <AddNewModal
              modalOpen={modalOpen}
              toggleModal={this.toggleModal}
              callback={() => this.dataListRender()}
              niveau={valueNiveau.value > -1 && valueNiveau.niveau}
              idClasse={valueNiveau && valueNiveau.value}

            />


            <UpdateModal
              modalOpen={modalOpenUpdate}
              toggleModal={this.toggleModalUpdate}
              callback={() => this.dataListRender()}
              setST={this.setST}
              niveau={valueNiveau.value > -1 && valueNiveau.niveau}
              idClasse={valueNiveau && valueNiveau.value}
              exam={this.state.exam}

            />

            <DeleteModal
              modalOpen={modalOpenDelete}
              toggleModal={this.toggleModalDelete}
              callback={() => this.dataListRender()}
              selectedItems={this.state.selectedItems}
              setST={this.setST}
              idClasse={valueNiveau && valueNiveau.value}
              exam={this.state.exam}

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

              {this.state.items.map((exam, i) => {

                return (


                  <DataListView
                    key={exam.id}
                    exam={exam}
                    isSelect={this.state.selectedItems.includes(exam.id)}
                    onCheckItem={this.onCheckItem}
                    setExam={this.setExam}
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
                  exam={this.state.exam}

                />
              }

              <Modal
                modalOpenVoir={modalOpenVoir}
                toggleModal={this.toggleModalVoir}
                exam={this.state.exam}

              />
            </Row>
          </div>






        </Fragment>
      );
  }
}
export default gst_evaluation;